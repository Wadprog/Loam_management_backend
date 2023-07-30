CREATE PROCEDURE proc_create_employee(p_employe_data JSON , p_tenant_id INT , p_is_primary BOOLEAN)  
BEGIN
    DECLARE person_id INT DEFAULT NULL;
    START TRANSACTION;
        SELECT fn_insert_or_get_user_id(p_employe_data, p_tenant_id) INTO person_id;
    
        SET @email = JSON_UNQUOTE(JSON_EXTRACT(p_employe_data, '$.email'));
        SET @userName = JSON_UNQUOTE(JSON_EXTRACT(p_employe_data, '$.username'));
        SET @password = JSON_UNQUOTE(JSON_EXTRACT(p_employe_data, '$.password'));
        SET @role_id = JSON_EXTRACT(p_employe_data, '$.role_id');
        SET @salary = JSON_EXTRACT(p_employe_data, '$.salary');
        
        IF p_is_primary THEN 
			SELECT id from roles_tenant WHERE tenant_id = p_tenant_id and name = 'admin' into @role_id;
			ELSE
				set p_is_primary = false;
        END IF;
        
        IF @salary IS NULL THEN SET @salary =0.0; END IF;

        INSERT INTO employees ( tenant_id, person_id,  role_id, username, password, is_primary, salary,created_at, updated_at) 
        VALUES (p_tenant_id, person_id, @role_id, @username, @password, p_is_primary, @salary, current_timestamp, current_timestamp);
     COMMIT;
 END$$
 