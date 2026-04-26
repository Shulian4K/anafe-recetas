"use client"

import type { Receta } from "@/lib/types"
import { Citrus, Target, Waves, Wheat, Flame, Sparkles, Leaf, Zap, Feather, Fish, Layers, LucideIcon } from "lucide-react"

const categoryStyle: Record<string, { bg: string; text: string }> = {
  "Salsas":     { bg: "bg-emerald-300", text: "text-emerald-900" },
  "Masas":      { bg: "bg-amber-300",   text: "text-amber-900"   },
  "Purés":      { bg: "bg-violet-300",  text: "text-violet-900"  },
  "Panadería":  { bg: "bg-yellow-300",  text: "text-yellow-900"  },
  "Pastelería": { bg: "bg-rose-300",    text: "text-rose-900"    },
  "Conservas":  { bg: "bg-teal-300",    text: "text-teal-900"    },
  "Otros":      { bg: "bg-slate-300",   text: "text-slate-900"   },
}

const recipeIcon: Record<string, LucideIcon> = {
  "1": Citrus,    // Vinagreta de Limón
  "2": Target,    // Mermelada de Cebolla
  "3": Waves,     // Masa de Arepas
  "4": Wheat,     // Mezcla de Cachapas
  "5": Flame,     // Salsa Tahini Ahumado
  "6": Sparkles,  // Puré de Coliflor Caramelizado
  "7": Leaf,      // Puré de Flores de Coliflor
  "8": Zap,       // Pickles de Jalapeño
  "9": Feather,   // Pickles de Cebolla
  "10": Fish,     // Pil Pil de Pescado
}

interface RecipeCardProps {
  receta: Receta
  onClick: () => void
}

export function RecipeCard({ receta, onClick }: RecipeCardProps) {
  const { bg, text } = categoryStyle[receta.categoria] ?? { bg: "bg-slate-300", text: "text-slate-900" }
  const Icon = recipeIcon[receta.id] ?? Layers

  return (
    <div
      className={`cursor-pointer rounded-xl ${bg} hover:brightness-95 transition-all active:scale-[0.98] aspect-square flex flex-col items-center justify-center gap-3 p-4`}
      onClick={onClick}
    >
      <Icon className={`h-10 w-10 ${text} opacity-70`} />
      <p className={`font-bold text-base leading-snug ${text} text-center line-clamp-3`}>
        {receta.nombre}
      </p>
    </div>
  )
}
