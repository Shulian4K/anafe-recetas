"use client"

import { Flame } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

interface AppHeaderProps {
  activeTab: string
  onLogoClick: () => void
}

export function AppHeader({ activeTab, onLogoClick }: AppHeaderProps) {
  const subtitle = activeTab === "pizarra" ? "La Pizarra" : "Recetas"

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md supports-[backdrop-filter]:bg-card/80 border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-center relative">
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
              {subtitle}
            </p>
          </div>
        </button>
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
