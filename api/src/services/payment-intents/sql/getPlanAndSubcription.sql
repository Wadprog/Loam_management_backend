SELECT s.id as subscriptionId, IF(s.period='yearly',  p.yearly_price,  p.monthly_price) AS planPrice
FROM subscriptions AS s
INNER JOIN plans AS p ON s.plan_id = p.id
WHERE s.tenant_id = ? AND s.status='unpaid'
ORDER BY s.created_at DESC
LIMIT 1;
