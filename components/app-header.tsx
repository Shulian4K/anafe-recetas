"use client"

import { Flame } from "lucide-react"

interface AppHeaderProps {
  activeTab: string
  onLogoClick: () => void
}

export function AppHeader({ activeTab, onLogoClick }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md supports-[backdrop-filter]:bg-card/80 border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-center">
        <button
          onClick={onLogoClick}
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity active:scale-[0.98]"
        >
          <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-primary text-primary-foreground shadow-md">
            <Flame className="h-5 w-5" />
          </div>
          <div className="text-left">
            <h1 className="text-xl font-black tracking-tight text-foreground leading-none">ANAFE</h1>
            <p className="text-[10px] text-muted-foreground font-medium tracking-widest uppercase mt-0.5">
              {activeTab === "configuracion" ? "Configuración" : "Recetas"}
            </p>
          </div>
        </button>
      </div>
    </header>
  )
}
