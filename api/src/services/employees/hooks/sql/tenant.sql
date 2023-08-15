SELECT 
    JSON_OBJECT(
        'id', tenants.id,
        'name', tenants.name, 
        'hasActiveSuscription', (
            IF(EXISTS (
                SELECT 1
                FROM subscriptions
                WHERE subscriptions.tenant_id = tenants.id AND subscriptions.status="active"), TRUE, FALSE
              )
      )
    )
    FROM tenants
    WHERE tenants.id = Employees.tenant_id
    