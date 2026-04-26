-- Ejecutar en el SQL Editor de Supabase
create table if not exists recetas_pizarra (
  id               uuid        default gen_random_uuid() primary key,
  nombre           text        not null,
  categoria        text        not null,
  ingredientes     jsonb       not null default '[]',
  instrucciones    text[]      not null default '{}',
  notas            text,
  tiempo_preparacion text,
  rendimiento      text,
  created_at       timestamptz default timezone('utc', now())
);

alter table recetas_pizarra enable row level security;

create policy "Lectura pública"
  on recetas_pizarra for select using (true);

create policy "Escritura pública"
  on recetas_pizarra for insert with check (true);
