-- Model simplificat: Admin conecteaza Meta o data, atribuie ad accounts la clienti
-- Fara OAuth per client, fara onboarding complex
-- Created: 2026-05-20

-- 1. Master platform accounts (doar adminul conecteaza)
CREATE TABLE IF NOT EXISTS master_platform_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT CHECK (platform IN ('meta', 'google', 'tiktok')),
  account_id TEXT,
  account_name TEXT,
  access_token_encrypted TEXT,
  refresh_token_encrypted TEXT,
  token_expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT TRUE,
  connected_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(platform, account_id)
);

-- 2. Client ad account assignments (admin atribuie ad accounts la clienti)
CREATE TABLE IF NOT EXISTS client_ad_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  platform TEXT CHECK (platform IN ('meta', 'google', 'tiktok')),
  master_account_id TEXT NOT NULL, -- ID-ul contului din master_platform_accounts
  ad_account_id TEXT NOT NULL,     -- ID-ul specific din platforma (ex: act_123456)
  ad_account_name TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(client_id, platform, ad_account_id)
);

-- 3. RLS
ALTER TABLE master_platform_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_ad_assignments ENABLE ROW LEVEL SECURITY;

-- Master accounts: doar adminii pot vedea/modifica
CREATE POLICY "Admins manage master accounts" ON master_platform_accounts
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM clients WHERE role = 'admin')
  );

-- Client assignments: adminii pot gestiona, clientii pot vedea doar ale lor
CREATE POLICY "Admins manage assignments" ON client_ad_assignments
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM clients WHERE role = 'admin')
  );

CREATE POLICY "Clients view own assignments" ON client_ad_assignments
  FOR SELECT USING (auth.uid() = client_id);

-- 4. Indexuri
CREATE INDEX IF NOT EXISTS idx_client_ad_assignments_client ON client_ad_assignments(client_id);
CREATE INDEX IF NOT EXISTS idx_client_ad_assignments_platform ON client_ad_assignments(platform, ad_account_id);
CREATE INDEX IF NOT EXISTS idx_master_platform_accounts_platform ON master_platform_accounts(platform, is_active);

-- 5. Trigger updated_at pentru master_platform_accounts
CREATE TRIGGER update_master_platform_updated_at
  BEFORE UPDATE ON master_platform_accounts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
