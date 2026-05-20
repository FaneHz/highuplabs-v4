-- Migration: AI Advisor Chat table
-- Created: 2026-05-20

-- ============================================
-- 1. Create ai_advisor_chats table
-- ============================================
CREATE TABLE IF NOT EXISTS ai_advisor_chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  context JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for fast retrieval by client
CREATE INDEX IF NOT EXISTS idx_ai_advisor_chats_client_id ON ai_advisor_chats(client_id);
CREATE INDEX IF NOT EXISTS idx_ai_advisor_chats_created_at ON ai_advisor_chats(created_at);

-- ============================================
-- 2. Enable RLS
-- ============================================
ALTER TABLE ai_advisor_chats ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 3. RLS Policies
-- ============================================

-- Users can read their own chat messages
DROP POLICY IF EXISTS "Users can read own advisor chats" ON ai_advisor_chats;
CREATE POLICY "Users can read own advisor chats" ON ai_advisor_chats
  FOR SELECT USING (auth.uid() = client_id);

-- Users can insert their own chat messages
DROP POLICY IF EXISTS "Users can insert own advisor chats" ON ai_advisor_chats;
CREATE POLICY "Users can insert own advisor chats" ON ai_advisor_chats
  FOR INSERT WITH CHECK (auth.uid() = client_id);

-- Admin can manage all advisor chats
DROP POLICY IF EXISTS "Admins can manage all advisor chats" ON ai_advisor_chats;
CREATE POLICY "Admins can manage all advisor chats" ON ai_advisor_chats
  FOR ALL USING (is_admin(auth.uid()));

-- ============================================
-- 4. Grant permissions
-- ============================================
GRANT SELECT, INSERT ON ai_advisor_chats TO authenticated;
-- NEVER grant to anon - RLS protects data but grants bypass RLS for table existence
