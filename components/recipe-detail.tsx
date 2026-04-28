"use client"

import { useState } from "react"
import type { Receta } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Clock, Scale, Minus, Plus, RotateCcw } from "lucide-react"

interface RecipeDetailProps {
  receta: Receta
  onBack: () => void
}

export function RecipeDetail({ receta, onBack }: RecipeDetailProps) {
  const [multiplicador, setMultiplicador] = useState(1)

  const ajustarMultiplicador = (delta: number) => {
    const nuevo = Math.max(0.25, Math.round((multiplicador + delta) * 4) / 4)
    setMultiplicador(nuevo)
  }

  const formatearCantidad = (cantidad: number) => {
    const resultado = cantidad * multiplicador
    return Number(resultado.toFixed(2)).toString()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="shrink-0">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1 min-w-0">
          <h1 className="text-[26px] font-extrabold tracking-tight text-foreground leading-tight">{receta.nombre}</h1>
          <div className="flex items-center gap-3 mt-1 flex-wrap">
            <Badge variant="secondary">{receta.categoria}</Badge>
            {receta.tiempoPreparacion && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>{receta.tiempoPreparacion}</span>
              </div>
            )}
            {receta.rendimiento && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Scale className="h-3.5 w-3.5" />
                <span>{receta.rendimiento}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Multiplicador */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <span className="font-semibold text-foreground">Multiplicar receta</span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-9 w-9 shrink-0"
                onClick={() => ajustarMultiplicador(-0.25)} disabled={multiplicador <= 0.25}>
                <Minus className="h-4 w-4" />
              </Button>
              <Input type="number" value={multiplicador}
                onChange={(e) => setMultiplicador(Math.max(0.25, parseFloat(e.target.value) || 1))}
                className="w-20 text-center font-mono font-semibold shrink-0" step={0.25} min={0.25} />
              <Button variant="outline" size="icon" className="h-9 w-9 shrink-0"
                onClick={() => ajustarMultiplicador(0.25)}>
                <Plus className="h-4 w-4" />
              </Button>
              <button onClick={() => setMultiplicador(1)}
                className={`h-9 w-9 shrink-0 flex items-center justify-center rounded-md transition-opacity ${multiplicador !== 1 ? "opacity-40 hover:opacity-70" : "opacity-0 pointer-events-none"}`}
                tabIndex={multiplicador !== 1 ? 0 : -1}>
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ingredientes */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground">Ingredientes</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            {(() => {
              const grupos = receta.ingredientes.reduce((acc, ing) => {
                const grupo = ing.grupo || "General"
                if (!acc[grupo]) acc[grupo] = []
                acc[grupo].push(ing)
                return acc
              }, {} as Record<string, typeof receta.ingredientes>)
              const gruposKeys = Object.keys(grupos)
              const tieneGrupos = gruposKeys.length > 1 || gruposKeys[0] !== "General"
              return gruposKeys.map((grupoNombre, grupoIndex) => (
                <div key={grupoNombre}>
                  {tieneGrupos && (
                    <div className={`text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70 ${grupoIndex > 0 ? "mt-4" : ""} mb-2`}>
                      {grupoNombre}
                    </div>
                  )}
                  {grupos[grupoNombre].map((ing, index) => (
                    <div key={index} className="flex items-baseline justify-between gap-4 py-2 border-b border-border/50 last:border-0">
                      <span className="text-[15px] font-medium text-foreground">{ing.nombre}</span>
                      <span className="font-mono font-semibold text-primary tabular-nums whitespace-nowrap shrink-0">
                        {formatearCantidad(ing.cantidad)} {ing.unidad}
                      </span>
                    </div>
                  ))}
                </div>
              ))
            })()}
          </div>
        </CardContent>
      </Card>

      {/* Instrucciones */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground">Instrucciones</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ol className="space-y-4">
            {receta.instrucciones.map((instruccion, index) => (
              <li key={index} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary mt-0.5">
                  {index + 1}
                </span>
                <span className="text-[15px] font-medium leading-7 text-foreground">{instruccion}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {/* Notas */}
      {receta.notas && (
        <Card className="bg-accent/30 border-accent/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground">Notas</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-[15px] font-medium leading-relaxed text-foreground">{receta.notas}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
