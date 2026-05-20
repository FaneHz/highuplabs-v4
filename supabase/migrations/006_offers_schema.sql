-- Schema pentru sistemul de oferte HighUpLabs
-- Adăugat: 2026-05-19

-- 1. Oferte generate (vizitatori site)
CREATE TABLE IF NOT EXISTS offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  full_name TEXT,
  company_name TEXT,
  phone TEXT,
  
  -- Date calculator
  monthly_revenue NUMERIC,
  margin_percent NUMERIC,
  current_ad_spend NUMERIC,
  target_roas NUMERIC DEFAULT 4.0,
  
  -- Rezultate calcul
  recommended_budget NUMERIC,
  estimated_profit NUMERIC,
  commission_percent NUMERIC DEFAULT 5,
  commission_value NUMERIC,
  poas_estimate NUMERIC,
  
  -- Status ofertă
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'contract_requested', 'converted')),
  
  -- Date contract (când status = contract_requested)
  contract_company_name TEXT,
  contract_cui TEXT,
  contract_address TEXT,
  contract_legal_rep TEXT,
  
  -- Metadata
  ip_address TEXT,
  user_agent TEXT,
  source TEXT DEFAULT 'website',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. RLS pentru oferte
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;

-- Admini pot vedea și gestiona toate ofertele
CREATE POLICY "Admins can manage all offers" ON offers
  FOR ALL USING (auth.uid() IN (SELECT id FROM clients WHERE role = 'admin'));

-- Utilizatorii autentificați pot vedea doar ofertele lor (după email)
CREATE POLICY "Users can view own offers" ON offers
  FOR SELECT USING (
    auth.uid() IN (
      SELECT id FROM clients WHERE email = offers.email
    )
  );

-- 3. Index pentru performanță
CREATE INDEX IF NOT EXISTS idx_offers_email ON offers(email);
CREATE INDEX IF NOT EXISTS idx_offers_status ON offers(status);
CREATE INDEX IF NOT EXISTS idx_offers_created_at ON offers(created_at DESC);

-- 4. Trigger pentru updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_offers_updated_at
  BEFORE UPDATE ON offers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 5. Adăugare coloană la clients pentru onboarding
ALTER TABLE clients ADD COLUMN IF NOT EXISTS plan_type TEXT DEFAULT 'performance' CHECK (plan_type IN ('performance', 'scaling', 'enterprise'));

-- 6. Edge function pentru notificare email la ofertă nouă
-- (Va fi implementată în Edge Function separat)
