"use client"

import { useState } from "react"
import { Plus, Trash2, Loader2 } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { categoriasRecetas } from "@/lib/data-store"
import { insertRecetaPizarra } from "@/lib/supabase-pizarra"

const UNIDADES = ["g", "kg", "ml", "L", "cc", "un", "c/n", "a gusto", "cucharada", "cucharadita", "taza"]

interface FormIngrediente {
  _key: number
  nombre: string
  cantidad: number
  unidad: string
  grupo: string
}

let _key = 0
const newIng = (): FormIngrediente => ({ _key: _key++, nombre: "", cantidad: 0, unidad: "g", grupo: "" })

interface Props {
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

export function AgregarRecetaForm({ open, onClose, onSuccess }: Props) {
  const [nombre, setNombre] = useState("")
  const [categoria, setCategoria] = useState("")
  const [ingredientes, setIngredientes] = useState<FormIngrediente[]>([newIng()])
  const [instrucciones, setInstrucciones] = useState<string[]>([""])
  const [notas, setNotas] = useState("")
  const [rendimiento, setRendimiento] = useState("")
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const reset = () => {
    setNombre("")
    setCategoria("")
    setIngredientes([newIng()])
    setInstrucciones([""])
    setNotas("")
    setRendimiento("")
    setSaving(false)
    setErrors([])
  }

  const handleClose = () => { reset(); onClose() }

  const updateIng = (key: number, field: keyof FormIngrediente, val: string | number) =>
    setIngredientes(prev => prev.map(i => i._key === key ? { ...i, [field]: val } : i))

  const handleSubmit = async () => {
    const errs: string[] = []
    if (!nombre.trim()) errs.push("El nombre es obligatorio")
    if (!categoria) errs.push("La categoría es obligatoria")
    const ingsValidos = ingredientes.filter(i => i.nombre.trim())
    if (!ingsValidos.length) errs.push("Agregá al menos un ingrediente")
    const pasosValidos = instrucciones.filter(s => s.trim())
    if (!pasosValidos.length) errs.push("Agregá al menos un paso")
    if (errs.length) { setErrors(errs); return }

    setSaving(true)
    try {
      await insertRecetaPizarra({
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
      reset()
      onSuccess()
    } catch {
      setErrors(["Error al guardar. Verificá la conexión con Supabase."])
      setSaving(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={v => !v && handleClose()}>
      <SheetContent side="bottom" className="h-[93vh] flex flex-col rounded-t-2xl p-0">
        <SheetHeader className="px-4 pt-5 pb-2">
          <SheetTitle>Nueva receta</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 space-y-6 pb-4">
          {errors.length > 0 && (
            <div className="bg-destructive/10 text-destructive text-sm rounded-lg p-3 space-y-0.5">
              {errors.map((e, i) => <p key={i}>{e}</p>)}
            </div>
          )}

          {/* Nombre */}
          <div className="space-y-1.5">
            <Label>Nombre</Label>
            <Input placeholder="Ej: Salsa de tomate asado" value={nombre} onChange={e => setNombre(e.target.value)} />
          </div>

          {/* Categoría */}
          <div className="space-y-1.5">
            <Label>Categoría</Label>
            <Select value={categoria} onValueChange={setCategoria}>
              <SelectTrigger><SelectValue placeholder="Seleccioná una categoría" /></SelectTrigger>
              <SelectContent>
                {categoriasRecetas.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {/* Ingredientes */}
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

          {/* Pasos */}
          <div className="space-y-3">
            <Label>Pasos</Label>
            {instrucciones.map((paso, idx) => (
              <div key={idx} className="flex gap-2 items-start">
                <span className="text-muted-foreground text-sm font-medium min-w-[1.25rem] pt-2.5">{idx + 1}.</span>
                <Textarea
                  placeholder={`Paso ${idx + 1}`} value={paso}
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

          {/* Notas */}
          <div className="space-y-1.5">
            <Label>Notas <span className="text-muted-foreground font-normal text-xs">(opcional)</span></Label>
            <Textarea placeholder="Tips, variaciones, observaciones..." value={notas} onChange={e => setNotas(e.target.value)} className="resize-none" />
          </div>

          {/* Rendimiento */}
          <div className="space-y-1.5">
            <Label>Rendimiento <span className="text-muted-foreground font-normal text-xs">(opcional)</span></Label>
            <Input placeholder="Ej: ~800 ml, 12 porciones" value={rendimiento} onChange={e => setRendimiento(e.target.value)} />
          </div>
        </div>

        <SheetFooter className="px-4 py-4 border-t flex-row gap-2">
          <Button variant="outline" onClick={handleClose} className="flex-1">Cancelar</Button>
          <Button onClick={handleSubmit} disabled={saving} className="flex-1 gap-2">
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            {saving ? "Guardando..." : "Guardar receta"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
