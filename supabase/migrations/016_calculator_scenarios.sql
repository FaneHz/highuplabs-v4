-- Migration: Calculator scenarios table
-- Created: 2026-05-20

CREATE TABLE IF NOT EXISTS calculator_scenarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  inputs JSONB NOT NULL,
  results JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS
ALTER TABLE calculator_scenarios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own scenarios" ON calculator_scenarios
  FOR ALL USING (auth.uid() = client_id);

-- Index
CREATE INDEX IF NOT EXISTS idx_calculator_scenarios_client ON calculator_scenarios(client_id, created_at DESC);