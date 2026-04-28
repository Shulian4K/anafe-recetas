"use client"

import { useState, useMemo, useRef } from "react"
import { recetas, categoriasRecetas } from "@/lib/data-store"
import type { Receta } from "@/lib/types"
import { RecipeCard } from "./recipe-card"
import { RecipeDetail } from "./recipe-detail"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, ChefHat, X } from "lucide-react"

interface RecipeListProps {
  scrollRef?: React.RefObject<HTMLDivElement | null>
}

export function RecipeList({ scrollRef }: RecipeListProps) {
  const [busqueda, setBusqueda] = useState("")
  const [categoriaActiva, setCategoriaActiva] = useState<string | null>(null)
  const [recetaSeleccionada, setRecetaSeleccionada] = useState<Receta | null>(null)

  const recetasFiltradas = useMemo(() => {
    return recetas
      .filter((receta) => {
        const coincideBusqueda = busqueda === "" ||
          receta.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
          receta.ingredientes.some(ing =>
            ing.nombre.toLowerCase().includes(busqueda.toLowerCase())
          )
        const coincideCategoria = categoriaActiva === null ||
          receta.categoria === categoriaActiva
        return coincideBusqueda && coincideCategoria
      })
      .sort((a, b) => categoriasRecetas.indexOf(a.categoria) - categoriasRecetas.indexOf(b.categoria))
  }, [busqueda, categoriaActiva])

  const categoriasConRecetas = useMemo(() => {
    const conteo = recetas.reduce((acc, r) => {
      acc[r.categoria] = (acc[r.categoria] ?? 0) + 1
      return acc
    }, {} as Record<string, number>)
    return categoriasRecetas
      .filter(cat => conteo[cat])
      .map(cat => ({ nombre: cat, total: conteo[cat] }))
  }, [])

  if (recetaSeleccionada) {
    return (
      <RecipeDetail
        receta={recetaSeleccionada}
        scrollRef={scrollRef}
        onBack={() => {
          setRecetaSeleccionada(null)
          scrollRef?.current?.scrollTo({ top: 0 })
        }}
      />
    )
  }

  const hayRecetas = recetas.length > 0

  return (
    <div className="space-y-6">
      {/* Barra de búsqueda */}
      {hayRecetas && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar receta o ingrediente..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="pl-10 pr-10"
          />
          {busqueda && (
            <button
              onClick={() => setBusqueda("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      )}

      {/* Filtros de categoría */}
      {categoriasConRecetas.length > 1 && (
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={categoriaActiva === null ? "default" : "outline"}
            size="sm"
            onClick={() => setCategoriaActiva(null)}
            className="gap-1.5"
          >
            Todas
            <span className={`text-xs rounded-full px-1.5 py-0 leading-5 ${categoriaActiva === null ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              {recetas.length}
            </span>
          </Button>
          {categoriasConRecetas.map(({ nombre, total }) => (
            <Button
              key={nombre}
              variant={categoriaActiva === nombre ? "default" : "outline"}
              size="sm"
              onClick={() => setCategoriaActiva(nombre)}
              className="gap-1.5"
            >
              {nombre}
              <span className={`text-xs rounded-full px-1.5 py-0 leading-5 ${categoriaActiva === nombre ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                {total}
              </span>
            </Button>
          ))}
        </div>
      )}

      {/* Lista de recetas */}
      {hayRecetas ? (
        recetasFiltradas.length > 0 ? (
          <div className="grid gap-3 grid-cols-2 lg:grid-cols-3">
            {recetasFiltradas.map((receta) => (
              <RecipeCard
                key={receta.id}
                receta={receta}
                onClick={() => {
                  scrollRef?.current?.scrollTo({ top: 0 })
                  setRecetaSeleccionada(receta)
                }}
              />
            ))}
          </div>
        ) : (
          <Card className="border-dashed">
            <CardContent className="py-12 text-center">
              <Search className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground">
                No se encontraron recetas con esos criterios.
              </p>
              <Button
                variant="link"
                className="mt-2"
                onClick={() => {
                  setBusqueda("")
                  setCategoriaActiva(null)
                }}
              >
                Limpiar filtros
              </Button>
            </CardContent>
          </Card>
        )
      ) : (
        <Card className="border-dashed">
          <CardContent className="py-16 text-center">
            <ChefHat className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              Aún no hay recetas
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Esta es tu app de recetas de trabajo. Pásame las recetas y las iré cargando aquí para que las tengas siempre a mano.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
