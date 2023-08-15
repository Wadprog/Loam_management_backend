CREATE PROCEDURE proc_get_payment_intents (p_tenant_id INT, p_requester_id INT) 
BEGIN 
    IF(NOT EXISTS( SELECT 1 FROM employees WHERE tenant_id = p_tenant_id AND id = p_requester_id) )THEN 
        SIGNAL SQLSTATE '42501' SET MESSAGE_TEXT = 'Unauthorized to see the following paymentIntents';
    ELSE 
        SELECT p.* 
        FROM subscriptions AS s
        INNER JOIN payment_intents AS p ON p.subscription_id = s.id
        WHERE s.tenant_id = p_tenant_id;
    END IF;
END ;
