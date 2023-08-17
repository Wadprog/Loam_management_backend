SELECT 
CONCAT(lp.interest_percentage, " % Every ", 
IF(lp.payment_interval>1,lp.payment_interval,"") ,  (CASE payment_frequency
        WHEN 'daily' THEN " day(s)"
        WHEN 'weekly' THEN " week(s)"
        WHEN 'monthly' THEN " month(s)"
        WHEN 'yearly' THEN  " year(s)"
    END) )
 FROM loans AS l
 INNER JOIN loan_reviews AS lrw on  lrw.id = l.accepted_loan_review_id
 INNER JOIN loan_plans AS lp ON lp.id = lrw.loan_plan_id
 WHERE l.id = Loans.id