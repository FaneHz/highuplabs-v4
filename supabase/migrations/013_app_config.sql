-- Tabel de configurare centralizată pentru HighUpLabs v4
-- Toate variabilele hardcodate din cod se mută aici

CREATE TABLE IF NOT EXISTS app_config (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  description TEXT,
  is_secret BOOLEAN DEFAULT false,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE app_config ENABLE ROW LEVEL SECURITY;

-- Allow public read ONLY for non-secret configs
CREATE POLICY "Allow public read non-secret" ON app_config
  FOR SELECT USING (NOT is_secret);

-- Allow admin insert/update
CREATE POLICY "Allow admin write" ON app_config
  FOR ALL USING (auth.uid() IN (SELECT id FROM clients WHERE role = 'admin'));

-- Seed default values
INSERT INTO app_config (key, value, description) VALUES
  ('email_from', 'High-Up Labs <noreply@highuplabs.ro>', 'Default sender email'),
  ('email_to', 'business@highuplabs.ro', 'Default recipient email for notifications'),
  ('meta_pixel_id', '358583203608980', 'Meta Pixel ID for tracking'),
  ('ga_id', 'G-XXXXXXXXXX', 'Google Analytics ID'),
  ('rate_limit_window_ms', '3600000', 'Rate limit window in milliseconds (1h)'),
  ('rate_limit_max', '5', 'Max requests per window per IP'),
  ('commission_percent', '5', 'Default commission percentage'),
  ('qualify_min_revenue', '10000', 'Minimum monthly revenue to qualify'),
  ('qualify_min_margin', '15', 'Minimum margin percentage to qualify'),
  ('qualify_min_adspend', '1000', 'Minimum ad spend to qualify'),
  ('default_monthly_revenue', '15000', 'Default monthly revenue for calculator'),
  ('default_margin_percent', '25', 'Default margin percent for calculator'),
  ('default_ad_spend', '2000', 'Default ad spend for calculator'),
  ('default_target_roas', '4', 'Default target ROAS for calculator'),
  ('offer_valid_days', '30', 'Number of days offer is valid'),
  ('supabase_functions_url', 'https://qpuswbcxegxvgjbwinrq.supabase.co/functions/v1', 'Supabase Edge Functions base URL')
ON CONFLICT (key) DO NOTHING;
