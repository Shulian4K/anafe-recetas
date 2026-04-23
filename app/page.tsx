"use client"

import { useState } from "react"
import { AppHeader } from "@/components/app-header"
import { BottomNav } from "@/components/bottom-nav"
import { RecipeList } from "@/components/recipe-list"
import { OvenSettings } from "@/components/oven-settings"

export default function Home() {
  const [activeTab, setActiveTab] = useState("recetas")
  const [resetKey, setResetKey] = useState(0)

  const handleLogoClick = () => {
    setActiveTab("recetas")
    setResetKey(k => k + 1)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader activeTab={activeTab} onLogoClick={handleLogoClick} />

      <main className="px-2 py-4 pb-24 max-w-2xl mx-auto">
        {activeTab === "recetas" && <RecipeList key={resetKey} />}
        {activeTab === "configuracion" && <OvenSettings />}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
