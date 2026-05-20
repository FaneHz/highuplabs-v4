-- Test Data Setup for Dashboard Testing
-- Run this after creating the test user in auth

DO $$
DECLARE
  test_user_id UUID := '6d76e819-2e6c-409c-9ead-74bd9b4254b6';
BEGIN
  -- Create client profile (bypasses RLS with SECURITY DEFINER)
  INSERT INTO clients (id, full_name, company_name, phone, email, plan_type, role, onboarding_completed)
  VALUES (
    test_user_id,
    'Test User',
    'Test Company SRL',
    '0712345678',
    'test@highuplabs.ro',
    'performance',
    'client',
    false
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    company_name = EXCLUDED.company_name,
    phone = EXCLUDED.phone,
    updated_at = NOW();

  -- Create test campaign snapshots (30 days x 3 campaigns)
  INSERT INTO campaign_snapshots (
    client_id, platform, account_id, campaign_id, campaign_name, status, date,
    spend, conversions, conversion_value, ctr, cpc, roas, impressions, clicks
  )
  SELECT
    test_user_id,
    'meta',
    'test-account-123',
    'camp-' || c::text,
    'Test Campaign ' || c::text,
    CASE WHEN c % 3 = 0 THEN 'PAUSED' ELSE 'ACTIVE' END,
    CURRENT_DATE - d,
    ROUND((random() * 500 + 100)::numeric, 2),
    ROUND((random() * 50 + 10)::numeric, 0),
    ROUND((random() * 5000 + 1000)::numeric, 2),
    ROUND((random() * 3 + 0.5)::numeric, 2),
    ROUND((random() * 10 + 2)::numeric, 2),
    ROUND((random() * 5 + 1)::numeric, 2),
    (random() * 10000 + 1000)::bigint,
    (random() * 1000 + 100)::bigint
  FROM generate_series(1, 3) AS c
  CROSS JOIN generate_series(0, 29) AS d
  ON CONFLICT (client_id, platform, campaign_id, date) DO NOTHING;

  -- Create alert rules
  INSERT INTO alert_rules (client_id, metric, operator, threshold, is_active)
  VALUES
    (test_user_id, 'roas', '<', 2.0, true),
    (test_user_id, 'spend', '>', 500, true)
  ON CONFLICT DO NOTHING;

  RAISE NOTICE 'Test data created successfully!';
END $$;

-- Verify
SELECT 'Client profile' as check_type, COUNT(*) as count FROM clients WHERE id = '6d76e819-2e6c-409c-9ead-74bd9b4254b6'
UNION ALL
SELECT 'Campaign snapshots', COUNT(*) FROM campaign_snapshots WHERE client_id = '6d76e819-2e6c-409c-9ead-74bd9b4254b6'
UNION ALL
SELECT 'Alert rules', COUNT(*) FROM alert_rules WHERE client_id = '6d76e819-2e6c-409c-9ead-74bd9b4254b6';
