export interface Ingrediente {
  nombre: string
  cantidad: number
  unidad: string
  grupo?: string // Para agrupar ingredientes (ej: "Base ácida", "Aceites", etc.)
}

export interface Receta {
  id: string
  nombre: string
  categoria: string
  ingredientes: Ingrediente[]
  instrucciones: string[]
  notas?: string
  tiempoPreparacion?: string
  rendimiento?: string
}

export interface ConfiguracionHorno {
  id: string
  titulo: string
  descripcion: string
  temperatura?: string
  tiempo?: string
}

export interface NotaGeneral {
  id: string
  titulo: string
  contenido: string
  categoria: string
}
