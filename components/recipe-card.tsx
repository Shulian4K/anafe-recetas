"use client"

import type { Receta } from "@/lib/types"

const categoryAccent: Record<string, string> = {
  "Salsas":     "bg-emerald-400",
  "Masas":      "bg-amber-400",
  "Purés":      "bg-violet-400",
  "Panadería":  "bg-yellow-400",
  "Pastelería": "bg-rose-400",
  "Conservas":  "bg-teal-400",
  "Otros":      "bg-slate-400",
}

interface RecipeCardProps {
  receta: Receta
  onClick: () => void
}

export function RecipeCard({ receta, onClick }: RecipeCardProps) {
  const accent = categoryAccent[receta.categoria] ?? "bg-slate-400"

  return (
    <div
      className="cursor-pointer rounded-lg border border-border bg-card hover:border-primary/30 hover:shadow-sm transition-all active:scale-[0.98] overflow-hidden flex flex-col"
      onClick={onClick}
    >
      <div className={`h-1.5 w-full ${accent}`} />
      <div className="p-3 flex flex-col gap-1">
        <p className="font-semibold text-sm leading-snug text-foreground line-clamp-2">
          {receta.nombre}
        </p>
      </div>
    </div>
  )
}
