"use client"

import { useState, useRef, useEffect, useMemo, useCallback } from "react"
import { ScanLine } from "lucide-react"
import { AppHeader } from "@/components/app-header"
import { RecipeList } from "@/components/recipe-list"
import { PinGate, isEdicionDesbloqueada } from "@/components/pin-gate"
import { EscanearRecetaSheet } from "@/components/escanear-receta-sheet"
import { recetas, categoriasRecetas } from "@/lib/data-store"
import { fetchRecetasUsuario } from "@/lib/supabase-recetas"
import type { Receta } from "@/lib/types"

export default function Home() {
  const [resetKey, setResetKey] = useState(0)
  const [busqueda, setBusqueda] = useState("")
  const [recetasUsuario, setRecetasUsuario] = useState<Receta[]>([])
  const [showPin, setShowPin] = useState(false)
  const [showScan, setShowScan] = useState(false)
  const mainRef = useRef<HTMLDivElement>(null)

  const cargarUsuario = useCallback(async () => {
    try {
      setRecetasUsuario(await fetchRecetasUsuario())
    } catch {
      // Sin conexión a Supabase: la app sigue funcionando con el recetario base
    }
  }, [])

  useEffect(() => { cargarUsuario() }, [cargarUsuario])

  const recetasTotales = useMemo(() => [...recetas, ...recetasUsuario], [recetasUsuario])

  const scrollToTop = (smooth = false) =>
    mainRef.current?.scrollTo({ top: 0, behavior: smooth ? "smooth" : "instant" })

  const handleLogoClick = () => {
    setBusqueda("")
    setResetKey(k => k + 1)
    scrollToTop(true)
  }

  const handleEscanear = () => {
    if (isEdicionDesbloqueada()) setShowScan(true)
    else setShowPin(true)
  }

  const handleScanSuccess = () => {
    setShowScan(false)
    cargarUsuario()
    setResetKey(k => k + 1)
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      <AppHeader
        onLogoClick={handleLogoClick}
        busqueda={busqueda}
        onBusquedaChange={setBusqueda}
      />

      <div ref={mainRef} className="flex-1 overflow-y-auto">
        <div className="px-2 py-4 pb-24 max-w-2xl mx-auto">
          <RecipeList
            key={`recetas-${resetKey}`}
            scrollRef={mainRef}
            recetasData={recetasTotales}
            categoriasData={categoriasRecetas}
            busqueda={busqueda}
            onBusquedaChange={setBusqueda}
          />
        </div>
      </div>

      <button
        onClick={handleEscanear}
        aria-label="Escanear receta"
        className="fixed bottom-6 right-4 z-40 flex items-center gap-2 rounded-full bg-primary text-primary-foreground pl-4 pr-5 py-3 shadow-lg active:scale-95 transition-transform"
      >
        <ScanLine className="h-5 w-5" />
        <span className="text-sm font-semibold">Escanear</span>
      </button>

      <PinGate
        open={showPin}
        onUnlock={() => { setShowPin(false); setShowScan(true) }}
        onClose={() => setShowPin(false)}
      />
      <EscanearRecetaSheet
        open={showScan}
        onClose={() => setShowScan(false)}
        onSuccess={handleScanSuccess}
      />
    </div>
  )
}
