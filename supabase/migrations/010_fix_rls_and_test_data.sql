-- Migration: Fix critical RLS infinite recursion + test data
-- WARNING: Apply this IMMEDIATELY in Supabase SQL Editor
-- https://supabase.com/dashboard/project/qpuswbcxegxvgjbwinrq/sql

-- ============================================
-- 1. Disable RLS temporarily to fix the issue
-- ============================================
ALTER TABLE clients DISABLE ROW LEVEL SECURITY;

-- ============================================
-- 2. Drop ALL policies on clients
-- ============================================
DO $$
DECLARE
  pol RECORD;
BEGIN
  FOR pol IN 
    SELECT policyname 
    FROM pg_policies 
    WHERE tablename = 'clients'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON clients', pol.policyname);
  END LOOP;
END $$;

-- ============================================
-- 3. Recreate is_admin function (security definer bypasses RLS)
-- ============================================
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM clients 
    WHERE id = user_id AND role = 'admin'
  );
END;
$$;

GRANT EXECUTE ON FUNCTION is_admin(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION is_admin(UUID) TO anon;

-- ============================================
-- 4. Re-enable RLS with NON-RECURSIVE policies
-- ============================================
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Policy 1: Users see their own data
CREATE POLICY "users_select_own" ON clients
  FOR SELECT USING (auth.uid() = id);

-- Policy 2: Users update their own data  
CREATE POLICY "users_update_own" ON clients
  FOR UPDATE USING (auth.uid() = id);

-- Policy 3: Users insert their own data (on signup)
CREATE POLICY "users_insert_own" ON clients
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Policy 4: Admin access - uses SECURITY DEFINER function
-- The function runs with owner privileges, bypassing RLS
CREATE POLICY "admin_all" ON clients
  FOR ALL USING (is_admin(auth.uid()));

-- ============================================
-- 5. Fix other tables that reference clients
-- ============================================

-- campaign_snapshots
ALTER TABLE campaign_snapshots ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "users_select_own_snapshots" ON campaign_snapshots;
CREATE POLICY "users_select_own_snapshots" ON campaign_snapshots
  FOR ALL USING (auth.uid() = client_id);

-- ad_snapshots
ALTER TABLE ad_snapshots ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "users_select_own_ads" ON ad_snapshots;
CREATE POLICY "users_select_own_ads" ON ad_snapshots
  FOR ALL USING (auth.uid() = client_id);

-- reports
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "users_select_own_reports" ON reports;
CREATE POLICY "users_select_own_reports" ON reports
  FOR ALL USING (auth.uid() = client_id);

-- alert_rules
ALTER TABLE alert_rules ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "users_select_own_alerts" ON alert_rules;
CREATE POLICY "users_select_own_alerts" ON alert_rules
  FOR ALL USING (auth.uid() = client_id);

-- client_platform_accounts
ALTER TABLE client_platform_accounts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "users_select_own_accounts" ON client_platform_accounts;
CREATE POLICY "users_select_own_accounts" ON client_platform_accounts
  FOR ALL USING (auth.uid() = client_id);

-- ============================================
-- 6. Create test user profile
-- ============================================
INSERT INTO clients (id, full_name, company_name, phone, email, plan_type, role, onboarding_completed)
VALUES (
  '6d76e819-2e6c-409c-9ead-74bd9b4254b6',
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
  email = EXCLUDED.email,
  updated_at = NOW();

-- ============================================
-- 7. Create test campaign snapshots (30 days x 5 campaigns)
-- ============================================
DO $$
DECLARE
  test_user_id UUID := '6d76e819-2e6c-409c-9ead-74bd9b4254b6';
BEGIN
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
  FROM generate_series(1, 5) AS c
  CROSS JOIN generate_series(0, 29) AS d
  ON CONFLICT (client_id, platform, campaign_id, date) DO NOTHING;
END $$;

-- ============================================
-- 8. Create test alert rules
-- ============================================
INSERT INTO alert_rules (client_id, metric, operator, threshold, is_active)
VALUES
  ('6d76e819-2e6c-409c-9ead-74bd9b4254b6', 'roas', '<', 2.0, true),
  ('6d76e819-2e6c-409c-9ead-74bd9b4254b6', 'spend', '>', 500, true)
ON CONFLICT DO NOTHING;

-- ============================================
-- 9. Create app_config table for env vars
-- ============================================
CREATE TABLE IF NOT EXISTS app_config (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  description TEXT,
  is_secret BOOLEAN DEFAULT false,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE app_config ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_non_secret" ON app_config;
CREATE POLICY "public_read_non_secret" ON app_config
  FOR SELECT USING (NOT is_secret);

-- Insert default configs
INSERT INTO app_config (key, value, description, is_secret) VALUES
  ('OPENROUTER_API_KEY', '', 'OpenRouter API Key for AI', true),
  ('RESEND_API_KEY', '', 'Resend API Key for emails', true),
  ('META_APP_ID', '1971463060127276', 'Meta App ID', false),
  ('NEXT_PUBLIC_APP_URL', 'https://highuplabs-v4.vercel.app', 'App URL', false)
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- 10. Verify
-- ============================================
SELECT 'Test user' as check_type, COUNT(*) as count FROM clients WHERE id = '6d76e819-2e6c-409c-9ead-74bd9b4254b6'
UNION ALL
SELECT 'Campaign snapshots', COUNT(*) FROM campaign_snapshots WHERE client_id = '6d76e819-2e6c-409c-9ead-74bd9b4254b6'
UNION ALL
SELECT 'Alert rules', COUNT(*) FROM alert_rules WHERE client_id = '6d76e819-2e6c-409c-9ead-74bd9b4254b6';
