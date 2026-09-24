"use client"

import { useState, useRef } from "react"
import { Camera, Loader2, Plus, Trash2, RotateCcw, ScanLine } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { categoriasRecetas } from "@/lib/data-store"
import { insertRecetaUsuario } from "@/lib/supabase-recetas"

const UNIDADES = ["g", "kg", "ml", "l", "cc", "u", "c/n", "a gusto", "cucharada", "cucharadita", "taza", "tbsp", "dientes", "hojas", "ramas"]

interface FormIngrediente {
  _key: number
  nombre: string
  cantidad: number
  unidad: string
  grupo: string
}

let _key = 0
const newIng = (init?: Partial<FormIngrediente>): FormIngrediente => ({
  _key: _key++,
  nombre: "",
  cantidad: 0,
  unidad: "g",
  grupo: "",
  ...init,
})

type Paso = "foto" | "transcribiendo" | "revisar"

interface Props {
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

async function downscaleImage(file: File): Promise<string> {
  try {
    const bitmap = await createImageBitmap(file)
    const maxDim = 1600
    const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height))
    const w = Math.max(1, Math.round(bitmap.width * scale))
    const h = Math.max(1, Math.round(bitmap.height * scale))
    const canvas = document.createElement("canvas")
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext("2d")
    if (!ctx) throw new Error("no ctx")
    ctx.drawImage(bitmap, 0, 0, w, h)
    bitmap.close()
    return canvas.toDataURL("image/jpeg", 0.85)
  } catch {
    // Fallback: mandar el archivo tal cual
    return await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }
}

export function EscanearRecetaSheet({ open, onClose, onSuccess }: Props) {
  const [paso, setPaso] = useState<Paso>("foto")
  const [foto, setFoto] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [categoria, setCategoria] = useState("")
  const [nombre, setNombre] = useState("")
  const [ingredientes, setIngredientes] = useState<FormIngrediente[]>([newIng()])
  const [instrucciones, setInstrucciones] = useState<string[]>([""])
  const [notas, setNotas] = useState("")
  const [rendimiento, setRendimiento] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const reset = () => {
    setPaso("foto")
    setFoto(null)
    setPreviewUrl(null)
    setCategoria("")
    setNombre("")
    setIngredientes([newIng()])
    setInstrucciones([""])
    setNotas("")
    setRendimiento("")
    setError(null)
    setSaving(false)
  }

  const handleClose = () => { reset(); onClose() }

  const handleFile = async (file: File | undefined) => {
    if (!file) return
    const dataUrl = await downscaleImage(file)
    setFoto(dataUrl)
    setPreviewUrl(dataUrl)
    setError(null)
  }

  const handleTranscribir = async () => {
    if (!foto) { setError("Sacá o elegí una foto de la ficha."); return }
    if (!categoria) { setError("Elegí la categoría."); return }
    setPaso("transcribiendo")
    setError(null)
    try {
      const resp = await fetch("/api/escanear-receta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: foto }),
      })
      const data = await resp.json()
      if (!resp.ok) throw new Error(data.error || "Error al transcribir.")
      setNombre(data.nombre ?? "")
      setIngredientes((data.ingredientes ?? []).map((i: { nombre: string; cantidad: number; unidad: string; grupo?: string }) =>
        newIng({ nombre: i.nombre, cantidad: i.cantidad, unidad: i.unidad, grupo: i.grupo ?? "" })
      ))
      setInstrucciones(data.instrucciones?.length ? data.instrucciones : [""])
      setNotas(data.notas ?? "")
      setRendimiento(data.rendimiento ?? "")
      setPaso("revisar")
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al transcribir.")
      setPaso("foto")
    }
  }

  const updateIng = (key: number, field: keyof FormIngrediente, val: string | number) =>
    setIngredientes(prev => prev.map(i => i._key === key ? { ...i, [field]: val } : i))

  const handleGuardar = async () => {
    if (!nombre.trim()) { setError("El nombre es obligatorio."); return }
    if (!categoria) { setError("La categoría es obligatoria."); return }
    const ingsValidos = ingredientes.filter(i => i.nombre.trim())
    if (!ingsValidos.length) { setError("Agregá al menos un ingrediente."); return }
    const pasosValidos = instrucciones.filter(s => s.trim())
    if (!pasosValidos.length) { setError("Agregá al menos un paso."); return }

    setSaving(true)
    setError(null)
    try {
      await insertRecetaUsuario({
        nombre: nombre.trim(),
        categoria,
        ingredientes: ingsValidos.map(({ nombre, cantidad, unidad, grupo }) => ({
          nombre: nombre.trim(),
          cantidad,
          unidad,
          ...(grupo.trim() ? { grupo: grupo.trim() } : {}),
        })),
        instrucciones: pasosValidos,
        notas: notas.trim() || undefined,
        rendimiento: rendimiento.trim() || undefined,
      })
      handleClose()
      onSuccess()
    } catch {
      setError("No se pudo guardar. Verificá la conexión.")
      setSaving(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={v => !v && handleClose()}>
      <SheetContent side="bottom" className="h-[93vh] flex flex-col rounded-t-2xl p-0">
        <SheetHeader className="px-4 pt-5 pb-2">
          <SheetTitle className="flex items-center gap-2">
            <ScanLine className="h-5 w-5" /> Escanear receta
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 space-y-6 pb-4">
          {error && (
            <div className="bg-destructive/10 text-destructive text-sm rounded-lg p-3">
              <p>{error}</p>
            </div>
          )}

          {paso === "foto" || paso === "transcribiendo" ? (
            <>
              {/* Foto */}
              <div className="space-y-1.5">
                <Label>Foto de la ficha</Label>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => handleFile(e.target.files?.[0])}
                />
                {previewUrl ? (
                  <div className="relative rounded-xl overflow-hidden border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={previewUrl} alt="Ficha de receta" className="w-full max-h-72 object-contain bg-muted" />
                    <Button
                      variant="secondary" size="sm"
                      className="absolute bottom-2 right-2 gap-1.5"
                      onClick={() => fileRef.current?.click()}
                      disabled={paso === "transcribiendo"}
                    >
                      <RotateCcw className="h-3.5 w-3.5" /> Cambiar foto
                    </Button>
                  </div>
                ) : (
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="w-full rounded-xl border-2 border-dashed border-border py-10 flex flex-col items-center gap-2 text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors"
                  >
                    <Camera className="h-8 w-8" />
                    <span className="text-sm font-medium">Sacá una foto o elegí una de la galería</span>
                  </button>
                )}
              </div>

              {/* Categoría */}
              <div className="space-y-1.5">
                <Label>Categoría</Label>
                <Select value={categoria} onValueChange={setCategoria} disabled={paso === "transcribiendo"}>
                  <SelectTrigger><SelectValue placeholder="Seleccioná una categoría" /></SelectTrigger>
                  <SelectContent>
                    {categoriasRecetas.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleTranscribir} disabled={paso === "transcribiendo" || !foto} className="w-full gap-2">
                {paso === "transcribiendo" && <Loader2 className="h-4 w-4 animate-spin" />}
                {paso === "transcribiendo" ? "Leyendo la ficha..." : "Transcribir receta"}
              </Button>
              <p className="text-xs text-muted-foreground text-center -mt-3">
                La IA lee la foto y completa los datos. Después los revisás antes de guardar.
              </p>
            </>
          ) : (
            <>
              {/* Revisión / edición */}
              <div className="bg-primary/10 text-primary text-sm rounded-lg p-3">
                Revisá los datos leídos de la foto y corregí lo que haga falta.
              </div>

              <div className="space-y-1.5">
                <Label>Nombre</Label>
                <Input value={nombre} onChange={e => setNombre(e.target.value)} />
              </div>

              <div className="space-y-1.5">
                <Label>Categoría</Label>
                <Select value={categoria} onValueChange={setCategoria}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {categoriasRecetas.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Ingredientes</Label>
                {ingredientes.map((ing) => (
                  <div key={ing._key} className="rounded-lg border p-3 space-y-2">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Nombre del ingrediente"
                        value={ing.nombre}
                        onChange={e => updateIng(ing._key, "nombre", e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        variant="ghost" size="icon"
                        onClick={() => setIngredientes(prev => prev.filter(i => i._key !== ing._key))}
                        disabled={ingredientes.length === 1}
                        className="text-muted-foreground shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        type="number" placeholder="Cant." className="w-24"
                        value={ing.cantidad || ""}
                        onChange={e => updateIng(ing._key, "cantidad", parseFloat(e.target.value) || 0)}
                      />
                      <Select value={ing.unidad} onValueChange={v => updateIng(ing._key, "unidad", v)}>
                        <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {UNIDADES.map(u => <SelectItem key={u} value={u}>{u}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Grupo (opcional)" className="flex-1"
                        value={ing.grupo}
                        onChange={e => updateIng(ing._key, "grupo", e.target.value)}
                      />
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full gap-2" onClick={() => setIngredientes(p => [...p, newIng()])}>
                  <Plus className="h-4 w-4" /> Agregar ingrediente
                </Button>
              </div>

              <div className="space-y-3">
                <Label>Pasos</Label>
                {instrucciones.map((pasoTxt, idx) => (
                  <div key={idx} className="flex gap-2 items-start">
                    <span className="text-muted-foreground text-sm font-medium min-w-[1.25rem] pt-2.5">{idx + 1}.</span>
                    <Textarea
                      placeholder={`Paso ${idx + 1}`} value={pasoTxt}
                      onChange={e => setInstrucciones(prev => prev.map((s, i) => i === idx ? e.target.value : s))}
                      className="flex-1 min-h-[76px] resize-none"
                    />
                    <Button
                      variant="ghost" size="icon"
                      onClick={() => setInstrucciones(prev => prev.filter((_, i) => i !== idx))}
                      disabled={instrucciones.length === 1}
                      className="text-muted-foreground mt-1 shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full gap-2" onClick={() => setInstrucciones(p => [...p, ""])}>
                  <Plus className="h-4 w-4" /> Agregar paso
                </Button>
              </div>

              <div className="space-y-1.5">
                <Label>Notas <span className="text-muted-foreground font-normal text-xs">(opcional)</span></Label>
                <Textarea value={notas} onChange={e => setNotas(e.target.value)} className="resize-none" />
              </div>

              <div className="space-y-1.5">
                <Label>Rendimiento <span className="text-muted-foreground font-normal text-xs">(opcional)</span></Label>
                <Input placeholder="Ej: ~800 ml, 12 porciones" value={rendimiento} onChange={e => setRendimiento(e.target.value)} />
              </div>
            </>
          )}
        </div>

        <SheetFooter className="px-4 py-4 border-t flex-row gap-2">
          <Button variant="outline" onClick={handleClose} className="flex-1">Cancelar</Button>
          {paso === "revisar" && (
            <Button onClick={handleGuardar} disabled={saving} className="flex-1 gap-2">
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              {saving ? "Guardando..." : "Guardar receta"}
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
