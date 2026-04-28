"use client"

import { useState, useRef } from "react"
import { AppHeader } from "@/components/app-header"
import { BottomNav } from "@/components/bottom-nav"
import { RecipeList } from "@/components/recipe-list"
import { LaPizarra } from "@/components/la-pizarra"

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
        <div className="px-2 py-4 pb-6 max-w-2xl mx-auto">
          {activeTab === "recetas" && <RecipeList key={resetKey} scrollRef={mainRef} />}
          {activeTab === "pizarra" && <LaPizarra />}
        </div>
      </div>

      <BottomNav
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab)
          if (tab === "recetas") {
            setResetKey(k => k + 1)
            scrollToTop()
          }
        }}
      />
    </div>
  )
}
