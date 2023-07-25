CREATE PROCEDURE proc_manage_setting_tenant(p_tenant_id INT , p_setting_id INT ,action VARCHAR(10), employee_id INT )  
BEGIN
    START TRANSACTION;
       
        IF EXISTS
        (SELECT 1 FROM employees WHERE user_id = employee_id AND active=true)
        THEN
            IF action = 'ADD' THEN
                INSERT INTO settings_tenant (tenant_id, setting_id)
                VALUES (p_tenant_id, p_setting_id);

            ELSEIF action = 'REMOVE' THEN
                DELETE FROM settings_tenant WHERE tenant_id = p_tenant_id AND setting_id = p_setting_id;

            ELSE
                ROLLBACK;
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid action';
            END IF;
        ELSE
            INSERT INTO fraud_log (tenant_id, employee_id, action,  created_at, updated_at, message)
            VALUES (p_tenant_id, employee_id, action, current_timestamp, current_timestamp, CONCAT(employee_id, 'attempted to ', action, 'setting ', p_setting_id, ' for tenant ', p_tenant_id, ' but is not an active or existing employee'));
            ROLLBACK;
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid employee';
        END IF;

     COMMIT;
 END;