import { Fraunces, Plus_Jakarta_Sans } from "next/font/google"
import { recetas } from "@/lib/data-store"

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" })
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" })

const receta = recetas.find(r => r.id === "10")!

function GrupoIngredientes({ r }: { r: typeof receta }) {
  const grupos = r.ingredientes.reduce((acc, ing) => {
    const g = ing.grupo || "General"
    if (!acc[g]) acc[g] = []
    acc[g].push(ing)
    return acc
  }, {} as Record<string, typeof r.ingredientes>)
  const keys = Object.keys(grupos)
  const tieneGrupos = keys.length > 1 || keys[0] !== "General"
  return (
    <>
      {keys.map((g, gi) => (
        <div key={g}>
          {tieneGrupos && (
            <div className={`text-xs font-semibold uppercase tracking-widest text-muted-foreground ${gi > 0 ? "mt-4" : ""} mb-2`}>{g}</div>
          )}
          {grupos[g].map((ing, i) => (
            <div key={i} className="flex justify-between py-2 border-b border-border/50 last:border-0">
              <span>{ing.nombre}</span>
              <span className="font-mono text-primary tabular-nums">{ing.cantidad} {ing.unidad}</span>
            </div>
          ))}
        </div>
      ))}
    </>
  )
}

export default function DemoPage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-16">
      <div className="text-center space-y-1">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Página temporal · Demo</p>
        <h1 className="text-2xl font-bold">Comparación tipográfica</h1>
      </div>

      {/* ─── OPCIÓN A: Fraunces + DM Sans ─── */}
      <section className={fraunces.variable}>
        <div className="mb-6 flex items-center gap-3">
          <span className="bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full">Opción A</span>
          <span className="text-sm text-muted-foreground">Fraunces (titular) + DM Sans (cuerpo)</span>
        </div>

        <div className="space-y-6 border rounded-2xl p-6">
          {/* Título */}
          <div>
            <h2 className="font-[family-name:var(--font-fraunces)] text-3xl font-medium text-foreground leading-tight">
              {receta.nombre}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">{receta.categoria} · {receta.rendimiento}</p>
          </div>

          {/* Ingredientes */}
          <div>
            <h3 className="font-[family-name:var(--font-fraunces)] text-xl font-medium mb-3">Ingredientes</h3>
            <div className="text-[15px]">
              <GrupoIngredientes r={receta} />
            </div>
          </div>

          {/* Instrucciones */}
          <div>
            <h3 className="font-[family-name:var(--font-fraunces)] text-xl font-medium mb-3">Instrucciones</h3>
            <ol className="space-y-4">
              {receta.instrucciones.map((paso, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary mt-0.5">{i + 1}</span>
                  <span className="text-[15px] leading-7 text-foreground">{paso}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Notas */}
          {receta.notas && (
            <div className="bg-accent/30 rounded-xl p-4">
              <h3 className="font-[family-name:var(--font-fraunces)] text-base font-medium mb-1">Notas</h3>
              <p className="text-[14px] leading-relaxed text-foreground italic">{receta.notas}</p>
            </div>
          )}
        </div>
      </section>

      {/* ─── OPCIÓN B: Plus Jakarta Sans ─── */}
      <section className={plusJakarta.variable}>
        <div className="mb-6 flex items-center gap-3">
          <span className="bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full">Opción B</span>
          <span className="text-sm text-muted-foreground">Plus Jakarta Sans (todo)</span>
        </div>

        <div className="space-y-6 border rounded-2xl p-6 font-[family-name:var(--font-jakarta)]">
          {/* Título */}
          <div>
            <h2 className="text-[28px] font-extrabold tracking-tight text-foreground leading-tight">
              {receta.nombre}
            </h2>
            <p className="text-sm text-muted-foreground mt-1 font-medium">{receta.categoria} · {receta.rendimiento}</p>
          </div>

          {/* Ingredientes */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-3">Ingredientes</h3>
            <div className="text-[15px] font-medium">
              <GrupoIngredientes r={receta} />
            </div>
          </div>

          {/* Instrucciones */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-3">Instrucciones</h3>
            <ol className="space-y-4">
              {receta.instrucciones.map((paso, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary mt-0.5">{i + 1}</span>
                  <span className="text-[15px] leading-7 font-medium text-foreground">{paso}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Notas */}
          {receta.notas && (
            <div className="bg-accent/30 rounded-xl p-4">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-2">Notas</h3>
              <p className="text-[14px] leading-relaxed font-medium text-foreground">{receta.notas}</p>
            </div>
          )}
        </div>
      </section>

      <p className="text-center text-xs text-muted-foreground pb-8">Esta página se elimina una vez que elijas la opción.</p>
    </div>
  )
}
