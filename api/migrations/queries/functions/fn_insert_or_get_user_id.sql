
CREATE FUNCTION fn_insert_or_get_user_id(user_json JSON, tenant_id INT)
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE user_id INT DEFAULT NULL;
    DECLARE given_name VARCHAR(255);
    DECLARE familly_name VARCHAR(255);
    DECLARE user_email VARCHAR(255);
    -- DECLARE user_age INT;
    
    -- Extract values from JSON
    SET user_email = JSON_UNQUOTE(JSON_EXTRACT(user_json, '$.email'));
    SET given_name = JSON_UNQUOTE(JSON_EXTRACT(user_json, '$.given_name'));
    SET familly_name = JSON_UNQUOTE(JSON_EXTRACT(user_json, '$.familly_name'));
    
    
    -- Check if the user already exists
    IF user_email IS NOT NULL THEN
      SELECT id INTO user_id FROM people WHERE email = user_email;
    END IF;
    
    -- If user doesn't exist, insert it
    IF user_id IS NULL THEN
        IF user_email IS NULL THEN
            INSERT INTO people ( tenant_id, given_name, familly_name, created_at, updated_at) 
            VALUES (tenant_id, given_name, familly_name, current_timestamp, current_timestamp);
            SET user_id = LAST_INSERT_ID();
        ELSE
            INSERT INTO people ( tenant_id, given_name, familly_name, email,created_at, updated_at) 
            VALUES (tenant_id, given_name, familly_name, user_email, current_timestamp, current_timestamp);
            SET user_id = LAST_INSERT_ID();
        END IF;
    END IF;
    
    -- Return the user ID
    RETURN user_id;
END ;

