-- Creare tabel aplicații în Supabase
-- Rulează asta în SQL Editor din Supabase Dashboard

CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  website TEXT,
  monthly_sales TEXT NOT NULL,
  ad_budget TEXT NOT NULL,
  message TEXT,
  ip_address TEXT,
  source TEXT DEFAULT 'website',
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pentru căutare rapidă
CREATE INDEX IF NOT EXISTS idx_applications_email ON applications(email);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON applications(created_at DESC);

-- Row Level Security (RLS) — doar adminii pot citi
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all insert" ON applications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow admin select" ON applications
  FOR SELECT USING (auth.uid() IN (SELECT id FROM clients WHERE role = 'admin'));
