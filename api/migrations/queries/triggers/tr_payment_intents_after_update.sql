
CREATE TRIGGER tr_payment_intents_after_update 
AFTER UPDATE ON payment_intents 
FOR EACH ROW 
BEGIN 
	IF NEW.status = 'completed' THEN 
	UPDATE subscriptions AS s
	SET s.status= 'active' AND s.updated_at = current_timestamp
	WHERE s.id =NEW.subscription_id; 
	END IF; 
END;
