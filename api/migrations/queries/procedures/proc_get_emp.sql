CREATE PROCEDURE  proc_get_employee( p_tenant_id INT, employee_id INT )
BEGIN

    SELECT e.id as id, u.given_name, u.familly_name, 
    JSON_OBJECT( 
    'id', c.id,
    'name', c.name,
    'activeSubscription', EXISTS(SELECT 1 FROM subscriptions WHERE  status ='active' AND  tenant_id = 1)
    ) as company
    FROM employees AS e
    INNER JOIN people AS u ON e.person_id = u.id
    INNER JOIN tenants AS c ON e.tenant_id = c.id
    WHERE c.id =p_tenant_id AND e.id=employee_id ;

END;