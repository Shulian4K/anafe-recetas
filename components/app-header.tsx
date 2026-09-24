"use client"

import { Flame, Search, X } from "lucide-react"

interface AppHeaderProps {
  onLogoClick: () => void
  busqueda: string
  onBusquedaChange: (v: string) => void
}

export function AppHeader({ onLogoClick, busqueda, onBusquedaChange }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md supports-[backdrop-filter]:bg-card/80 border-b border-border shadow-sm">
      <div className="max-w-2xl mx-auto px-3 py-2 flex items-center gap-3">
        {/* Logo */}
        <button
          onClick={onLogoClick}
          className="flex items-center gap-2 shrink-0 hover:opacity-80 transition-opacity active:scale-[0.98]"
        >
          <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Flame className="h-4 w-4" />
          </div>
          <span className="text-base font-black tracking-tight text-foreground leading-none">ANAFE</span>
        </button>

        {/* Buscador */}
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar..."
            value={busqueda}
            onChange={(e) => onBusquedaChange(e.target.value)}
            className="w-full pl-8 pr-7 py-1.5 text-sm rounded-lg border border-border bg-muted/50 focus:outline-none focus:ring-1 focus:ring-primary/30 placeholder:text-muted-foreground/60"
          />
          {busqueda && (
            <button
              onClick={() => onBusquedaChange("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
