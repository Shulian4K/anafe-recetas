"use client"

import type { Receta } from "@/lib/types"
import { Droplets, Layers, Leaf, FlaskConical, Wheat, Star, Utensils } from "lucide-react"

const categoryStyle: Record<string, { bg: string; text: string; Icon: React.ElementType }> = {
  "Salsas":     { bg: "bg-emerald-200", text: "text-emerald-700", Icon: Droplets },
  "Masas":      { bg: "bg-amber-200",   text: "text-amber-700",   Icon: Layers },
  "Purés":      { bg: "bg-violet-200",  text: "text-violet-700",  Icon: Leaf },
  "Panadería":  { bg: "bg-yellow-200",  text: "text-yellow-700",  Icon: Wheat },
  "Pastelería": { bg: "bg-rose-200",    text: "text-rose-700",    Icon: Star },
  "Conservas":  { bg: "bg-teal-200",    text: "text-teal-700",    Icon: FlaskConical },
  "Otros":      { bg: "bg-slate-200",   text: "text-slate-600",   Icon: Utensils },
}

interface RecipeCardProps {
  receta: Receta
  onClick: () => void
}

export function RecipeCard({ receta, onClick }: RecipeCardProps) {
  const { bg, text, Icon } = categoryStyle[receta.categoria] ?? { bg: "bg-slate-400", text: "text-white", Icon: Utensils }

  return (
    <div
      className="cursor-pointer rounded-xl border border-border bg-card hover:shadow-md transition-all active:scale-[0.98] overflow-hidden flex flex-col aspect-square"
      onClick={onClick}
    >
      <div className={`${bg} flex-1 flex items-center justify-center`}>
        <Icon className={`h-12 w-12 ${text} opacity-90`} />
      </div>
      <div className="px-2.5 border-t border-border/50 h-11 flex items-center justify-center">
        <p className="font-semibold text-sm leading-snug text-foreground line-clamp-2 text-center">
          {receta.nombre}
        </p>
      </div>
    </div>
  )
}
