-- Schema completă pentru HighUpLabs v5
-- Proiect: qpuswbcxegxvgjbwinrq

-- 1. Extindere auth.users cu date client
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  company_name TEXT,
  phone TEXT,
  email TEXT,
  plan_type TEXT DEFAULT 'performance' CHECK (plan_type IN ('performance', 'scaling', 'enterprise')),
  role TEXT DEFAULT 'client' CHECK (role IN ('client', 'admin')),
  alert_notifications BOOLEAN DEFAULT TRUE,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  currency_preference TEXT DEFAULT 'RON' CHECK (currency_preference IN ('RON', 'EUR')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Platform accounts (Meta, Google, TikTok)
CREATE TABLE IF NOT EXISTS client_platform_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  platform TEXT CHECK (platform IN ('meta', 'google', 'tiktok')),
  account_id TEXT,
  account_name TEXT,
  access_token_encrypted TEXT,
  refresh_token_encrypted TEXT,
  token_expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(client_id, platform, account_id)
);

-- 3. Campaign snapshots (daily)
CREATE TABLE IF NOT EXISTS campaign_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  platform TEXT CHECK (platform IN ('meta', 'google')),
  account_id TEXT,
  campaign_id TEXT,
  campaign_name TEXT,
  status TEXT CHECK (status IN ('ACTIVE', 'PAUSED', 'ARCHIVED', 'ENABLED')),
  date DATE,
  spend NUMERIC,
  conversions NUMERIC,
  conversion_value NUMERIC,
  ctr NUMERIC,
  cpc NUMERIC,
  roas NUMERIC,
  impressions BIGINT,
  clicks BIGINT,
  UNIQUE(client_id, platform, campaign_id, date)
);

-- 4. Ad snapshots (daily)
CREATE TABLE IF NOT EXISTS ad_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  platform TEXT CHECK (platform IN ('meta', 'google')),
  account_id TEXT,
  campaign_id TEXT,
  adset_id TEXT,
  ad_id TEXT,
  ad_name TEXT,
  creative_url TEXT,
  status TEXT CHECK (status IN ('ACTIVE', 'PAUSED', 'ARCHIVED', 'ENABLED')),
  date DATE,
  spend NUMERIC,
  conversions NUMERIC,
  conversion_value NUMERIC,
  ctr NUMERIC,
  cpc NUMERIC,
  impressions BIGINT,
  clicks BIGINT,
  UNIQUE(client_id, platform, ad_id, date)
);

-- 5. Reports
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  title TEXT,
  date_from DATE,
  date_to DATE,
  metrics JSONB,
  pdf_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Alert rules
CREATE TABLE IF NOT EXISTS alert_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  metric TEXT CHECK (metric IN ('roas', 'poas', 'ctr', 'spend', 'conversions')),
  operator TEXT CHECK (operator IN ('<', '>')),
  threshold NUMERIC,
  is_active BOOLEAN DEFAULT TRUE
);

-- 7. Audit logs
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  action TEXT,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Exchange rates
CREATE TABLE IF NOT EXISTS exchange_rates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE,
  from_currency TEXT,
  to_currency TEXT,
  rate NUMERIC,
  UNIQUE(date, from_currency, to_currency)
);

-- 9. CMS Articles
CREATE TABLE IF NOT EXISTS cms_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  tag TEXT CHECK (tag IN ('fundamente', 'protectie', 'practic')),
  published_at DATE,
  read_time_ro TEXT,
  read_time_en TEXT,
  title_ro TEXT NOT NULL,
  hook_ro TEXT NOT NULL,
  meta_title_ro TEXT,
  meta_description_ro TEXT,
  blocks_ro JSONB DEFAULT '[]'::jsonb,
  title_en TEXT,
  hook_en TEXT,
  meta_title_en TEXT,
  meta_description_en TEXT,
  blocks_en JSONB DEFAULT '[]'::jsonb,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. CMS Case Studies
CREATE TABLE IF NOT EXISTS cms_cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  published_at DATE,
  read_time_ro TEXT,
  read_time_en TEXT,
  industry_ro TEXT,
  industry_en TEXT,
  title_ro TEXT NOT NULL,
  subtitle_ro TEXT,
  hook_ro TEXT,
  meta_title_ro TEXT,
  meta_description_ro TEXT,
  hero_stats JSONB DEFAULT '[]'::jsonb,
  sections_ro JSONB DEFAULT '[]'::jsonb,
  title_en TEXT,
  subtitle_en TEXT,
  hook_en TEXT,
  meta_title_en TEXT,
  meta_description_en TEXT,
  sections_en JSONB DEFAULT '[]'::jsonb,
  screenshots TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_platform_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE ad_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE alert_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE exchange_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_cases ENABLE ROW LEVEL SECURITY;

-- Clients: users can only see their own data
CREATE POLICY "Users can read own client data" ON clients
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own client data" ON clients
  FOR UPDATE USING (auth.uid() = id);

-- Admins can manage all
CREATE POLICY "Admins can manage all clients" ON clients
  FOR ALL USING (auth.uid() IN (SELECT id FROM clients WHERE role = 'admin'));

-- Platform accounts
CREATE POLICY "Users can manage own platforms" ON client_platform_accounts
  FOR ALL USING (auth.uid() = client_id);

-- Campaign snapshots
CREATE POLICY "Users can read own campaigns" ON campaign_snapshots
  FOR SELECT USING (auth.uid() = client_id);

-- Ad snapshots
CREATE POLICY "Users can read own ads" ON ad_snapshots
  FOR SELECT USING (auth.uid() = client_id);

-- Reports
CREATE POLICY "Users can manage own reports" ON reports
  FOR ALL USING (auth.uid() = client_id);

-- Alert rules
CREATE POLICY "Users can manage own alerts" ON alert_rules
  FOR ALL USING (auth.uid() = client_id);

-- Audit logs
CREATE POLICY "Users can read own audit logs" ON audit_logs
  FOR SELECT USING (auth.uid() = client_id);

-- Exchange rates: public read
CREATE POLICY "Public can read exchange rates" ON exchange_rates
  FOR SELECT USING (true);

-- CMS: public can read published
CREATE POLICY "Public can read published articles" ON cms_articles
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public can read published cases" ON cms_cases
  FOR SELECT USING (status = 'published');

-- CMS: admins can manage all
CREATE POLICY "Admins can manage articles" ON cms_articles
  FOR ALL USING (auth.uid() IN (SELECT id FROM clients WHERE role = 'admin'));

CREATE POLICY "Admins can manage cases" ON cms_cases
  FOR ALL USING (auth.uid() IN (SELECT id FROM clients WHERE role = 'admin'));

-- Indexes
CREATE INDEX IF NOT EXISTS idx_campaign_snapshots_client_date ON campaign_snapshots(client_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_ad_snapshots_client_date ON ad_snapshots(client_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_reports_client ON reports(client_id);
CREATE INDEX IF NOT EXISTS idx_cms_articles_slug ON cms_articles(slug);
CREATE INDEX IF NOT EXISTS idx_cms_cases_slug ON cms_cases(slug);
