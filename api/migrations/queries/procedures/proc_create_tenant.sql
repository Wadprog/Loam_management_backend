CREATE PROCEDURE  proc_create_tenants(IN data JSON)
BEGIN
  DECLARE i INT DEFAULT 0;
  DECLARE p_tenant_id INT;
  DECLARE user_id INT;

  -- RETRIEVE VALUES FROM JSON
    SET @plan = JSON_EXTRACT(data, '$.plan');
    SET @admin = JSON_EXTRACT(data, '$.employee');
    SET @tenant = JSON_EXTRACT(data, '$.company');
    SET @settings = JSON_EXTRACT(data, '$.settings');
    SET @company_name = JSON_UNQUOTE(JSON_EXTRACT(@tenant, '$.name'));

    START TRANSACTION; 
    
             INSERT INTO tenants (name, created_at, updated_at)
			 VALUES (@company_name, current_timestamp, current_timestamp);
			 SET p_tenant_id = LAST_INSERT_ID();
             
            SET @plan_id = JSON_EXTRACT(@plan, '$.id');
            IF EXISTS(SELECT id FROM plans WHERE id = @plan_id) THEN
             
				SET @plan_period = JSON_UNQUOTE(JSON_EXTRACT(@plan, '$.period'));
				INSERT INTO subscriptions (tenant_id, plan_id, status,created_at, updated_at, period)
				VALUES(p_tenant_id, @plan_id, 'unpaid', current_timestamp, current_timestamp,@plan_period);
			
            ELSE 
                ROLLBACK;
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid plan id';
            END IF;
            
            
            INSERT INTO roles_tenant(name , role_id, description, tenant_id, created_at, updated_at )
            SELECT title , id, "empty", p_tenant_id, current_timestamp, current_timestamp FROM roles WHERE custom =false;
            
            CALL proc_create_employee(@admin, p_tenant_id, true);
            
            

            -- Associate setting to tenant ADD
            SET @settings_length = JSON_LENGTH(@settings);
            WHILE i < @settings_length DO
                SET @setting_id = JSON_EXTRACT(@settings, CONCAT('$[', i, ']'));
                
                INSERT INTO settings_tenant (tenant_id, setting_id)
                VALUES (p_tenant_id, @setting_id);
                
                
                SET i = i + 1;
            END WHILE;
    COMMIT;    
    -- add plan period to tenant 
END;