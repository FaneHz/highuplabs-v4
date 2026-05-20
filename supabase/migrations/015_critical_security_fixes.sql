-- Migration: CRITICAL Security Fixes for Dashboard Rebuild
-- Apply this IMMEDIATELY in Supabase SQL Editor
-- https://supabase.com/dashboard/project/qpuswbcxegxvgjbwinrq/sql

-- ============================================
-- FIX 1: Remove anon grants from new tables (CRITICAL)
-- ============================================
-- Anon should NEVER have access to these tables
-- Use DO blocks to handle missing tables gracefully
DO $$
BEGIN
  EXECUTE 'REVOKE ALL ON ai_advisor_chats FROM anon';
EXCEPTION WHEN undefined_table THEN
  RAISE NOTICE 'ai_advisor_chats does not exist yet';
END $$;

DO $$
BEGIN
  EXECUTE 'REVOKE ALL ON video_scripts FROM anon';
EXCEPTION WHEN undefined_table THEN
  RAISE NOTICE 'video_scripts does not exist yet';
END $$;

DO $$
BEGIN
  EXECUTE 'REVOKE ALL ON social_strategies FROM anon';
EXCEPTION WHEN undefined_table THEN
  RAISE NOTICE 'social_strategies does not exist yet';
END $$;

-- ============================================
-- FIX 2: Fix app_config RLS (CRITICAL)
-- ============================================
-- Add is_secret column if missing
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'app_config' AND column_name = 'is_secret'
  ) THEN
    ALTER TABLE app_config ADD COLUMN is_secret BOOLEAN DEFAULT false;
  END IF;
END $$;

-- Drop dangerous policy
DROP POLICY IF EXISTS "Allow public read" ON app_config;
DROP POLICY IF EXISTS "Allow public read non-secret" ON app_config;

-- Create safe policy - only non-secret configs readable by public
CREATE POLICY "Allow public read non-secret" ON app_config
  FOR SELECT USING (NOT is_secret);

-- Update existing secrets
UPDATE app_config SET is_secret = true WHERE key IN ('OPENROUTER_API_KEY', 'RESEND_API_KEY');

-- ============================================
-- FIX 3: Remove anon access to is_admin function (MEDIUM)
-- ============================================
REVOKE EXECUTE ON FUNCTION is_admin(UUID) FROM anon;

-- ============================================
-- FIX 4: Add missing UPDATE policies (MEDIUM)
-- ============================================
-- Users need to update their own video scripts and social strategies
DO $$
BEGIN
  DROP POLICY IF EXISTS "Users can update own video scripts" ON video_scripts;
  CREATE POLICY "Users can update own video scripts" ON video_scripts
    FOR UPDATE USING (auth.uid() = client_id);
EXCEPTION WHEN undefined_table THEN
  RAISE NOTICE 'video_scripts does not exist yet';
END $$;

DO $$
BEGIN
  DROP POLICY IF EXISTS "Users can update own social strategies" ON social_strategies;
  CREATE POLICY "Users can update own social strategies" ON social_strategies
    FOR UPDATE USING (auth.uid() = client_id);
EXCEPTION WHEN undefined_table THEN
  RAISE NOTICE 'social_strategies does not exist yet';
END $$;

-- ============================================
-- FIX 5: Verify all tables have RLS enabled
-- ============================================
DO $$
DECLARE
  tbl RECORD;
BEGIN
  FOR tbl IN 
    SELECT tablename 
    FROM pg_tables 
    WHERE schemaname = 'public' 
    AND tablename IN ('ai_advisor_chats', 'video_scripts', 'social_strategies', 'app_config', 'calculator_scenarios')
  LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', tbl.tablename);
  END LOOP;
END $$;

-- ============================================
-- FIX 6: Add rate limiting table (RECOMMENDED)
-- ============================================
CREATE TABLE IF NOT EXISTS rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  count INTEGER DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, action, window_start)
);

ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own rate limits" ON rate_limits
  FOR SELECT USING (auth.uid() = user_id);

-- ============================================
-- VERIFICATION: Show current grants
-- ============================================
SELECT 
  grantee,
  table_name,
  privilege_type
FROM information_schema.table_privileges
WHERE table_schema = 'public'
AND table_name IN ('ai_advisor_chats', 'video_scripts', 'social_strategies', 'app_config')
AND grantee = 'anon'
ORDER BY table_name, privilege_type;
