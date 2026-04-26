"use client"

import { useState, useEffect, useCallback } from "react"
import { Plus, RefreshCw, PenLine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RecipeCard } from "./recipe-card"
import { RecipeDetail } from "./recipe-detail"
import { PinGate, isPizarraUnlocked } from "./pin-gate"
import { AgregarRecetaForm } from "./agregar-receta-form"
import { fetchRecetasPizarra } from "@/lib/supabase-pizarra"
import type { Receta } from "@/lib/types"

export function LaPizarra() {
  const [recetas, setRecetas] = useState<Receta[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [recetaSeleccionada, setRecetaSeleccionada] = useState<Receta | null>(null)
  const [showPin, setShowPin] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const cargar = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setRecetas(await fetchRecetasPizarra())
    } catch {
      setError("No se pudo conectar con Supabase.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { cargar() }, [cargar])

  const handleAgregar = () => {
    if (isPizarraUnlocked()) setShowForm(true)
    else setShowPin(true)
  }

  if (recetaSeleccionada) {
    return <RecipeDetail receta={recetaSeleccionada} onBack={() => setRecetaSeleccionada(null)} />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PenLine className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">La Pizarra</h2>
          {!loading && recetas.length > 0 && (
            <span className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5">
              {recetas.length}
            </span>
          )}
        </div>
        <Button size="sm" onClick={handleAgregar} className="gap-1.5">
          <Plus className="h-4 w-4" /> Nueva receta
        </Button>
      </div>

      {loading ? (
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center space-y-3">
            <p className="text-muted-foreground text-sm">{error}</p>
            <Button variant="outline" size="sm" onClick={cargar} className="gap-2">
              <RefreshCw className="h-4 w-4" /> Reintentar
            </Button>
          </CardContent>
        </Card>
      ) : recetas.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-16 text-center">
            <PenLine className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">La pizarra está vacía</h3>
            <p className="text-muted-foreground text-sm max-w-xs mx-auto mb-4">
              Cargá tus propias recetas y van a quedar guardadas para todo el equipo.
            </p>
            <Button onClick={handleAgregar} className="gap-2">
              <Plus className="h-4 w-4" /> Agregar primera receta
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-3">
          {recetas.map(receta => (
            <RecipeCard key={receta.id} receta={receta} onClick={() => setRecetaSeleccionada(receta)} />
          ))}
        </div>
      )}

      <PinGate
        open={showPin}
        onUnlock={() => { setShowPin(false); setShowForm(true) }}
        onClose={() => setShowPin(false)}
      />
      <AgregarRecetaForm
        open={showForm}
        onClose={() => setShowForm(false)}
        onSuccess={() => { setShowForm(false); cargar() }}
      />
    </div>
  )
}
