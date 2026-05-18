-- Adaugă coloană role în tabela clients
ALTER TABLE clients ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'client' CHECK (role IN ('client', 'admin'));

-- Update utilizatorii existenți (opțional)
-- UPDATE clients SET role = 'admin' WHERE email = 'business@highuplabs.ro';

-- Tabel pentru articole CMS
CREATE TABLE IF NOT EXISTS cms_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  tag TEXT CHECK (tag IN ('fundamente', 'protectie', 'practic')),
  published_at DATE,
  read_time_ro TEXT,
  read_time_en TEXT,
  
  -- Romanian content
  title_ro TEXT NOT NULL,
  hook_ro TEXT NOT NULL,
  meta_title_ro TEXT,
  meta_description_ro TEXT,
  blocks_ro JSONB DEFAULT '[]'::jsonb,
  
  -- English content
  title_en TEXT,
  hook_en TEXT,
  meta_title_en TEXT,
  meta_description_en TEXT,
  blocks_en JSONB DEFAULT '[]'::jsonb,
  
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel pentru case studies CMS
CREATE TABLE IF NOT EXISTS cms_cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  published_at DATE,
  read_time_ro TEXT,
  read_time_en TEXT,
  industry_ro TEXT,
  industry_en TEXT,
  
  -- Romanian content
  title_ro TEXT NOT NULL,
  subtitle_ro TEXT,
  hook_ro TEXT,
  meta_title_ro TEXT,
  meta_description_ro TEXT,
  hero_stats JSONB DEFAULT '[]'::jsonb,
  sections_ro JSONB DEFAULT '[]'::jsonb,
  
  -- English content
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

-- RLS pentru CMS
ALTER TABLE cms_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_cases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published articles" ON cms_articles
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public can read published cases" ON cms_cases
  FOR SELECT USING (status = 'published');

CREATE POLICY "Admins can manage articles" ON cms_articles
  FOR ALL USING (auth.uid() IN (SELECT id FROM clients WHERE role = 'admin'));

CREATE POLICY "Admins can manage cases" ON cms_cases
  FOR ALL USING (auth.uid() IN (SELECT id FROM clients WHERE role = 'admin'));

-- Indexuri
CREATE INDEX IF NOT EXISTS idx_cms_articles_slug ON cms_articles(slug);
CREATE INDEX IF NOT EXISTS idx_cms_articles_status ON cms_articles(status);
CREATE INDEX IF NOT EXISTS idx_cms_cases_slug ON cms_cases(slug);
CREATE INDEX IF NOT EXISTS idx_cms_cases_status ON cms_cases(status);
