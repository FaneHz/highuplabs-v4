-- Șterge tabelele CMS (dacă nu mai sunt folosite)
DROP TABLE IF EXISTS cms_articles CASCADE;
DROP TABLE IF EXISTS cms_cases CASCADE;

-- Șterge coloana role din clients (sau setează default 'client')
ALTER TABLE clients DROP COLUMN IF EXISTS role;

-- Șterge tabela invite_tokens
DROP TABLE IF EXISTS invite_tokens CASCADE;

-- Curăță eventuale funcții sau triggere legate de tabelele șterse
-- (adaugă aici dacă există dependențe specifice)
