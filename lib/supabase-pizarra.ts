import { createClient } from "./supabase/client"
import type { Receta, Ingrediente } from "./types"

interface RecetaPizarraRow {
  id: string
  nombre: string
  categoria: string
  ingredientes: Ingrediente[]
  instrucciones: string[]
  notas: string | null
  tiempo_preparacion: string | null
  rendimiento: string | null
}

export async function fetchRecetasPizarra(): Promise<Receta[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("recetas_pizarra")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error

  return ((data ?? []) as RecetaPizarraRow[]).map(row => ({
    id: row.id,
    nombre: row.nombre,
    categoria: row.categoria,
    ingredientes: row.ingredientes,
    instrucciones: row.instrucciones,
    notas: row.notas ?? undefined,
    tiempoPreparacion: row.tiempo_preparacion ?? undefined,
    rendimiento: row.rendimiento ?? undefined,
  }))
}

export async function insertRecetaPizarra(receta: Omit<Receta, "id">): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase.from("recetas_pizarra").insert({
    nombre: receta.nombre,
    categoria: receta.categoria,
    ingredientes: receta.ingredientes,
    instrucciones: receta.instrucciones,
    notas: receta.notas ?? null,
    tiempo_preparacion: receta.tiempoPreparacion ?? null,
    rendimiento: receta.rendimiento ?? null,
  })
  if (error) throw error
}
