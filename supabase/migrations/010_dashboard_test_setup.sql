-- Migration: Fix RLS infinite recursion + create test user profile
-- Created: 2026-05-20

-- ============================================
-- 1. Fix is_admin function to bypass RLS
-- ============================================
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Use raw query to bypass RLS
  RETURN EXISTS (
    SELECT 1 FROM clients 
    WHERE id = user_id AND role = 'admin'
  );
END;
$$;

-- Grant execute to authenticated users
GRANT EXECUTE ON FUNCTION is_admin(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION is_admin(UUID) TO anon;

-- ============================================
-- 2. Fix clients RLS - remove recursive admin policy
-- ============================================
ALTER TABLE IF EXISTS clients ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own data" ON clients;
DROP POLICY IF EXISTS "Users can update own data" ON clients;
DROP POLICY IF EXISTS "Users can insert own data" ON clients;
DROP POLICY IF EXISTS "Admins can manage all clients" ON clients;

-- Basic policies that don't recurse
CREATE POLICY "Users can read own data" ON clients
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON clients
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own data" ON clients
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Admin policy using the security definer function
CREATE POLICY "Admins can manage all clients" ON clients
  FOR ALL USING (is_admin(auth.uid()));

-- ============================================
-- 3. Create test user profile if missing
-- ============================================
DO $$
DECLARE
  test_user_id UUID := '6d76e819-2e6c-409c-9ead-74bd9b4254b6';
BEGIN
  -- Check if user exists in auth.users
  IF EXISTS (SELECT 1 FROM auth.users WHERE id = test_user_id) THEN
    -- Insert or update client profile
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
      email = EXCLUDED.email,
      updated_at = NOW();
    
    RAISE NOTICE 'Test user profile created/updated: %', test_user_id;
  ELSE
    RAISE NOTICE 'Test user not found in auth.users';
  END IF;
END $$;

-- ============================================
-- 4. Add test platform account for Meta
-- ============================================
DO $$
DECLARE
  test_user_id UUID := '6d76e819-2e6c-409c-9ead-74bd9b4254b6';
BEGIN
  INSERT INTO client_platform_accounts (client_id, platform, account_id, account_name, is_active)
  VALUES (
    test_user_id,
    'meta',
    'test-account-123',
    'Test Meta Account',
    false
  )
  ON CONFLICT (client_id, platform, account_id) DO NOTHING;
END $$;

-- ============================================
-- 5. Create sample campaign snapshots for test user
-- ============================================
DO $$
DECLARE
  test_user_id UUID := '6d76e819-2e6c-409c-9ead-74bd9b4254b6';
BEGIN
  -- Insert sample data for last 30 days
  INSERT INTO campaign_snapshots (
    client_id, platform, account_id, campaign_id, campaign_name, status, date,
    spend, conversions, conversion_value, ctr, cpc, roas, impressions, clicks
  )
  SELECT
    test_user_id,
    'meta',
    'test-account-123',
    'camp-' || gs::text,
    'Campaign ' || gs::text,
    CASE WHEN gs % 3 = 0 THEN 'PAUSED' ELSE 'ACTIVE' END,
    CURRENT_DATE - gs,
    ROUND((random() * 500 + 100)::numeric, 2),
    ROUND((random() * 50 + 10)::numeric, 0),
    ROUND((random() * 5000 + 1000)::numeric, 2),
    ROUND((random() * 3 + 0.5)::numeric, 2),
    ROUND((random() * 10 + 2)::numeric, 2),
    ROUND((random() * 5 + 1)::numeric, 2),
    (random() * 10000 + 1000)::bigint,
    (random() * 1000 + 100)::bigint
  FROM generate_series(1, 30) AS gs
  ON CONFLICT (client_id, platform, campaign_id, date) DO NOTHING;
END $$;

-- ============================================
-- 6. Add test alert rules
-- ============================================
DO $$
DECLARE
  test_user_id UUID := '6d76e819-2e6c-409c-9ead-74bd9b4254b6';
BEGIN
  INSERT INTO alert_rules (client_id, metric, operator, threshold, is_active)
  VALUES
    (test_user_id, 'roas', '<', 2.0, true),
    (test_user_id, 'spend', '>', 500, true)
  ON CONFLICT DO NOTHING;
END $$;

-- ============================================
-- 7. Create app_config table for environment variables
-- ============================================
CREATE TABLE IF NOT EXISTS app_config (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  description TEXT,
  is_secret BOOLEAN DEFAULT false,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE app_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read non-secret" ON app_config
  FOR SELECT USING (NOT is_secret);

CREATE POLICY "Allow admin manage" ON app_config
  FOR ALL USING (is_admin(auth.uid()));

-- Insert essential configs (values to be set manually in Supabase Dashboard)
INSERT INTO app_config (key, value, description, is_secret) VALUES
  ('OPENROUTER_API_KEY', '', 'OpenRouter API Key for AI features', true),
  ('RESEND_API_KEY', '', 'Resend API Key for emails', true),
  ('META_APP_ID', '1971463060127276', 'Meta App ID', false),
  ('NEXT_PUBLIC_APP_URL', 'https://highuplabs-v4.vercel.app', 'Application URL', false),
  ('NEXT_PUBLIC_META_PIXEL_ID', '358583203608980', 'Meta Pixel ID', false)
ON CONFLICT (key) DO NOTHING;
