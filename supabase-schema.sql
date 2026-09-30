-- Создание таблицы для пользователей (админов)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Создание таблицы для головных уборов
CREATE TABLE IF NOT EXISTS hats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category TEXT NOT NULL,
  material TEXT NOT NULL,
  image_url TEXT NOT NULL,
  additional_images TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_hats_category ON hats(category);
CREATE INDEX IF NOT EXISTS idx_hats_created_at ON hats(created_at DESC);

-- Row Level Security (RLS)
ALTER TABLE hats ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Политики доступа
-- Все могут читать головные уборы
CREATE POLICY "Все могут просматривать головные уборы"
  ON hats FOR SELECT
  USING (true);

-- Только админы могут создавать, обновлять и удалять
CREATE POLICY "Только админы могут управлять головными уборами"
  ON hats FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Storage bucket для изображений (создается через UI Supabase)
-- Название bucket: 'hats-images'
-- Public: true
-- File size limit: 5MB
-- Allowed MIME types: image/jpeg, image/png, image/webp
