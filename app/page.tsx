"use client"

import { useState } from "react"
import { AppHeader } from "@/components/app-header"
import { RecipeList } from "@/components/recipe-list"

export default function Home() {
  const [resetKey, setResetKey] = useState(0)
  const [busqueda, setBusqueda] = useState("")

  const handleLogoClick = () => {
    setResetKey(k => k + 1)
    setBusqueda("")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader
        onLogoClick={handleLogoClick}
        busqueda={busqueda}
        onBusquedaChange={setBusqueda}
      />
      <main className="px-2 py-4 pb-6 max-w-2xl mx-auto">
        <RecipeList key={resetKey} busqueda={busqueda} />
      </main>
    </div>
  )
}
