"use client"

import { useState, useRef } from "react"
import { AppHeader } from "@/components/app-header"
import { BottomNav } from "@/components/bottom-nav"
import { RecipeList } from "@/components/recipe-list"
import { LaPizarra } from "@/components/la-pizarra"
import { recetas, categoriasRecetas, recetasCocina, categoriasCocina } from "@/lib/data-store"

export default function Home() {
  const [activeTab, setActiveTab] = useState("recetas")
  const [resetKey, setResetKey] = useState(0)
  const mainRef = useRef<HTMLDivElement>(null)

  const scrollToTop = (smooth = false) =>
    mainRef.current?.scrollTo({ top: 0, behavior: smooth ? "smooth" : "instant" })

  const handleLogoClick = () => {
    setActiveTab("recetas")
    setResetKey(k => k + 1)
    scrollToTop(true)
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      <AppHeader activeTab={activeTab} onLogoClick={handleLogoClick} />

      <div ref={mainRef} className="flex-1 overflow-y-auto">
        <div className="px-2 py-4 pb-24 max-w-2xl mx-auto">
          {activeTab === "recetas" && (
            <RecipeList key={`recetas-${resetKey}`} scrollRef={mainRef} recetasData={recetas} categoriasData={categoriasRecetas} />
          )}
          {activeTab === "cocina" && (
            <RecipeList key={`cocina-${resetKey}`} scrollRef={mainRef} recetasData={recetasCocina} categoriasData={categoriasCocina} />
          )}
          {activeTab === "pizarra" && <LaPizarra />}
        </div>
      </div>

      <BottomNav
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab)
          setResetKey(k => k + 1)
          scrollToTop()
        }}
      />
    </div>
  )
}
