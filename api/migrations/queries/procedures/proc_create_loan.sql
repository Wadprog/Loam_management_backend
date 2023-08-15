CREATE PROCEDURE proc_create_loan(IN p_creator_id INT, IN p_accepted_loan_review_id INT,IN p_issue_date DATE)
BEGIN
    DECLARE v_score INT DEFAULT 0;
    DECLARE v_debt_balance DOUBLE;
    DECLARE v_interest_balance DOUBLE;
    DECLARE v_next_payment DATE;
    DECLARE v_maturity_date DATE DEFAULT DATE_ADD(NOW(), INTERVAL 1 YEAR);
	DECLARE v_payment_interval INT;
    DECLARE v_loan_term INT;
    DECLARE v_payment_frequency ENUM('daily', 'weekly', 'monthly', 'yearly');


    -- Handlers for specific errors
    DECLARE EXIT HANDLER FOR 1002
    BEGIN
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Loan review not found';
    END;

    DECLARE EXIT HANDLER FOR 1003
    BEGIN
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Loan plan not found for the given loan review';
    END;

    DECLARE EXIT HANDLER FOR 1004
    BEGIN
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid creator ID';
    END;
    
    DECLARE EXIT HANDLER FOR 1005
    BEGIN
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid Loan Plan ID';
    END;

  DECLARE EXIT HANDLER FOR SQLEXCEPTION
     BEGIN
       ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'A generic error occurred';
  END;
    
     DECLARE EXIT HANDLER FOR 1009
    BEGIN
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'shit';
    END;

    START TRANSACTION;

    -- Retrieve proposed amount
    SELECT proposed_amount 
    INTO v_debt_balance 
    FROM loan_reviews 
    WHERE id = p_accepted_loan_review_id;

    IF v_debt_balance IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO=1002;
    END IF;
    
     -- Retrieve loan plan details
    SELECT interest_percentage, payment_interval, payment_frequency,loan_term
    INTO v_interest_balance, v_payment_interval, v_payment_frequency, v_loan_term
    FROM loan_plans AS lp
    JOIN loan_reviews AS lr ON lr.loan_plan_id = lp.id
    WHERE lr.id = p_accepted_loan_review_id;
    
    IF v_interest_balance IS NULL OR v_payment_interval IS NULL OR v_payment_frequency IS NULL THEN	
		SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO=1005;
	END IF;
    
	SET v_next_payment = CASE v_payment_frequency
        WHEN 'daily' THEN DATE_ADD(NOW(), INTERVAL v_payment_interval DAY)
        WHEN 'weekly' THEN DATE_ADD(NOW(), INTERVAL v_payment_interval WEEK)
        WHEN 'monthly' THEN DATE_ADD(NOW(), INTERVAL v_payment_interval MONTH)
        WHEN 'yearly' THEN DATE_ADD(NOW(), INTERVAL v_payment_interval YEAR)
    END;
    
    IF v_next_payment IS NULL THEN
		SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO=1009;
	END IF;
    
    -- Calculate maturity date based on loan_term, payment_interval and payment_frequency
    IF p_issue_date IS NOT NULL THEN 
		SET v_maturity_date = CASE v_payment_frequency
			WHEN 'daily' THEN DATE_ADD(p_issue_date, INTERVAL v_payment_interval * v_loan_term DAY)
			WHEN 'weekly' THEN DATE_ADD(p_issue_date, INTERVAL v_payment_interval * v_loan_term WEEK)
			WHEN 'monthly' THEN DATE_ADD(p_issue_date, INTERVAL v_payment_interval * v_loan_term MONTH)
			WHEN 'yearly' THEN DATE_ADD(p_issue_date, INTERVAL v_payment_interval * v_loan_term YEAR)
		END;
        IF v_maturity_date IS NULL THEN
			SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO=1009;
		END IF;
	ELSE 
		SET v_maturity_date=NULL;
    END IF;
    
	

    -- Retrieve interest balance based on loan plan
    SELECT lp.interest_percentage * v_debt_balance
    INTO v_interest_balance
    FROM loan_reviews AS lr
    INNER JOIN loan_plans AS lp ON lr.loan_plan_id = lp.id
    WHERE lr.id = p_accepted_loan_review_id;

    IF v_interest_balance IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO=1003;
    END IF;

    -- Check for valid creator_id
    IF NOT EXISTS (SELECT 1 FROM employees WHERE id = p_creator_id) THEN
        SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO=1004;
    END IF;


    INSERT INTO loans(
        score,
        debt_balance,
        interest_balance,
        next_payment,
        issue_date,
        maturity_date,
        creator_id,
        accepted_loan_review_id,
        created_at, 
        updated_at
    ) VALUES (
        v_score,
        v_debt_balance,
        v_interest_balance,
        v_next_payment,
        p_issue_date,
        v_maturity_date,
        p_creator_id,
        p_accepted_loan_review_id,
        current_timestamp(),
        current_timestamp()
        
    );

    COMMIT;
END;