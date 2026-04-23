-- Tabla de recetas
CREATE TABLE IF NOT EXISTS recetas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  categoria TEXT NOT NULL,
  ingredientes JSONB NOT NULL DEFAULT '[]',
  instrucciones JSONB NOT NULL DEFAULT '[]',
  notas TEXT,
  tiempo_preparacion TEXT,
  rendimiento TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS pero permitir acceso público (app personal sin auth)
ALTER TABLE recetas ENABLE ROW LEVEL SECURITY;

-- Políticas públicas para CRUD sin autenticación
CREATE POLICY "Permitir lectura pública" ON recetas FOR SELECT USING (true);
CREATE POLICY "Permitir inserción pública" ON recetas FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir actualización pública" ON recetas FOR UPDATE USING (true);
CREATE POLICY "Permitir eliminación pública" ON recetas FOR DELETE USING (true);
