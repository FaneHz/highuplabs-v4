-- Migration: Social Media Tables
-- Created: 2026-05-20

-- ============================================
-- 1. Create video_scripts table
-- ============================================
CREATE TABLE IF NOT EXISTS video_scripts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  title TEXT,
  platform TEXT,
  duration TEXT,
  script JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for video_scripts
CREATE INDEX IF NOT EXISTS idx_video_scripts_client_id ON video_scripts(client_id);
CREATE INDEX IF NOT EXISTS idx_video_scripts_created_at ON video_scripts(created_at);

-- ============================================
-- 2. Create social_strategies table
-- ============================================
CREATE TABLE IF NOT EXISTS social_strategies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  business_type TEXT,
  platforms TEXT[],
  strategy JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for social_strategies
CREATE INDEX IF NOT EXISTS idx_social_strategies_client_id ON social_strategies(client_id);
CREATE INDEX IF NOT EXISTS idx_social_strategies_created_at ON social_strategies(created_at);

-- ============================================
-- 3. Enable RLS
-- ============================================
ALTER TABLE video_scripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_strategies ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 4. RLS Policies for video_scripts
-- ============================================

-- Users can read their own video scripts
DROP POLICY IF EXISTS "Users can read own video scripts" ON video_scripts;
CREATE POLICY "Users can read own video scripts" ON video_scripts
  FOR SELECT USING (auth.uid() = client_id);

-- Users can insert their own video scripts
DROP POLICY IF EXISTS "Users can insert own video scripts" ON video_scripts;
CREATE POLICY "Users can insert own video scripts" ON video_scripts
  FOR INSERT WITH CHECK (auth.uid() = client_id);

-- Users can delete their own video scripts
DROP POLICY IF EXISTS "Users can delete own video scripts" ON video_scripts;
CREATE POLICY "Users can delete own video scripts" ON video_scripts
  FOR DELETE USING (auth.uid() = client_id);

-- Admin can manage all video scripts
DROP POLICY IF EXISTS "Admins can manage all video scripts" ON video_scripts;
CREATE POLICY "Admins can manage all video scripts" ON video_scripts
  FOR ALL USING (is_admin(auth.uid()));

-- ============================================
-- 5. RLS Policies for social_strategies
-- ============================================

-- Users can read their own social strategies
DROP POLICY IF EXISTS "Users can read own social strategies" ON social_strategies;
CREATE POLICY "Users can read own social strategies" ON social_strategies
  FOR SELECT USING (auth.uid() = client_id);

-- Users can insert their own social strategies
DROP POLICY IF EXISTS "Users can insert own social strategies" ON social_strategies;
CREATE POLICY "Users can insert own social strategies" ON social_strategies
  FOR INSERT WITH CHECK (auth.uid() = client_id);

-- Users can delete their own social strategies
DROP POLICY IF EXISTS "Users can delete own social strategies" ON social_strategies;
CREATE POLICY "Users can delete own social strategies" ON social_strategies
  FOR DELETE USING (auth.uid() = client_id);

-- Admin can manage all social strategies
DROP POLICY IF EXISTS "Admins can manage all social strategies" ON social_strategies;
CREATE POLICY "Admins can manage all social strategies" ON social_strategies
  FOR ALL USING (is_admin(auth.uid()));

-- ============================================
-- 6. Grant permissions
-- ============================================
GRANT SELECT, INSERT, DELETE ON video_scripts TO authenticated;
GRANT SELECT, INSERT, DELETE ON social_strategies TO authenticated;
-- NEVER grant to anon - RLS protects data but anon should have zero access
