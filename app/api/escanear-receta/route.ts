import { NextRequest, NextResponse } from "next/server"
import { categoriasRecetas } from "@/lib/data-store"

export const maxDuration = 60

const SYSTEM_PROMPT = `Sos el transcriptor de fichas de cocina del restaurante Anafe.
Recibís la foto de una ficha de receta y la transcribís a JSON con este formato EXACTO:

{
  "nombre": "Nombre de la receta en mayúsculas como figura en la ficha",
  "categoria": "una de las categorías de la lista",
  "ingredientes": [
    { "nombre": "nombre del ingrediente", "cantidad": 500, "unidad": "g", "grupo": "Grupo A" }
  ],
  "instrucciones": ["paso 1", "paso 2"],
  "notas": "notas opcionales",
  "rendimiento": "rinde opcional"
}

Categorías disponibles (elegí la que mejor corresponda):
- Masas: masas, panes, pastas
- Purés: purés de verduras, de frutos secos
- Salsas: salsas, vinagretas, emulsiones, aliolis, aderezos
- Conservas: pickles, curados, chutneys
- Fondos: caldos, fumets, demi glace, fondos
- Elaboraciones: preparaciones principales (proteínas, patés, ricota, ragú)
- Guarniciones: acompañamientos (vegetales, arroz, frutas)
- Condimentos: especias, mezclas secas, toppings crocantes

Reglas:
- Transcribí FIELMENTE: nombres, cantidades y unidades tal como figuran (g, kg, ml, l, u, c/n, tazas, cucharadas, tbsp).
- "cantidad" siempre número. Si dice "c/n" o "a gusto", cantidad 0 y unidad "c/n" o "a gusto".
- Conservá los grupos (A, B, C, D) en el campo "grupo" como "Grupo A", "Grupo B", etc. Si la ficha usa otros nombres de grupo, usalos tal cual.
- Los pasos en "instrucciones" como lista de strings, en orden.
- Si hay correcciones manuscritas sobre el texto impreso, vale lo manuscrito.
- Si la foto contiene varias recetas, transcribí SOLO la primera/principal.
- "notas" y "rendimiento" solo si figuran en la ficha; si no, omitilos.
- Respondé ÚNICAMENTE con el JSON, sin explicaciones ni markdown.`

interface IngredienteAI {
  nombre?: unknown
  cantidad?: unknown
  unidad?: unknown
  grupo?: unknown
}

function toNumber(v: unknown): number {
  if (typeof v === "number" && Number.isFinite(v)) return v
  if (typeof v === "string") {
    const n = parseFloat(v.replace(",", "."))
    if (Number.isFinite(n)) return n
  }
  return 0
}

function cleanStr(v: unknown): string {
  return typeof v === "string" ? v.trim() : ""
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: "Falta configurar la clave de IA en el servidor (GEMINI_API_KEY)." },
      { status: 503 }
    )
  }

  let image: unknown
  try {
    image = (await req.json()).image
  } catch {
    return NextResponse.json({ error: "Pedido inválido." }, { status: 400 })
  }
  if (typeof image !== "string" || !image.startsWith("data:image/")) {
    return NextResponse.json({ error: "Falta la imagen." }, { status: 400 })
  }

  // Modelos en orden de preferencia: cada uno tiene su propio cupo diario gratuito
  const MODELOS = [
    "gemini-3.8-flash",
    "gemini-3.7-flash",
    "gemini-3.6-flash",
    "gemini-3.5-flash-lite",
    "gemini-3.1-flash-lite",
  ]

  async function llamarGemini(modelo: string): Promise<Response> {
    return fetch("https://generativelanguage.googleapis.com/v1beta/openai/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: modelo,
        temperature: 0.1,
        max_tokens: 2500,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: [
              { type: "text", text: "Transcribí la receta de esta foto al JSON pedido." },
              { type: "image_url", image_url: { url: image, detail: "high" } },
            ],
          },
        ],
      }),
    })
  }

  let resp: Response | null = null
  let lastStatus = 0
  let lastDetail = ""
  let saturado = false
  // Por cada modelo: hasta 2 intentos (el plan gratuito suele devolver 503 por picos de demanda)
  for (const modelo of MODELOS) {
    let modeloDescartado = false
    for (let intento = 0; intento < 2; intento++) {
      if (intento > 0) {
        await new Promise((r) => setTimeout(r, 4000))
      }
      try {
        resp = await llamarGemini(modelo)
      } catch {
        resp = null
      }
      if (!resp) {
        lastStatus = 0
        lastDetail = "sin respuesta"
        continue
      }
      if (resp.ok) break
      lastStatus = resp.status
      try {
        lastDetail = (await resp.text()).slice(0, 300)
      } catch {
        lastDetail = ""
      }
      // 404 = modelo no disponible: pasar al siguiente sin reintentar
      if (resp.status === 404) {
        modeloDescartado = true
        break
      }
      // Saturación o límite de ritmo: reintentar, y si persiste, probar el siguiente modelo
      if (resp.status !== 503 && resp.status !== 429 && resp.status !== 529) break
      saturado = true
    }
    if (resp?.ok || modeloDescartado) {
      if (resp?.ok) break
      continue
    }
    // Si el modelo respondió con un error definitivo, no seguir probando
    if (lastStatus !== 503 && lastStatus !== 429 && lastStatus !== 529) break
  }

  if (!resp) {
    return NextResponse.json({ error: "No se pudo contactar al servicio de IA." }, { status: 502 })
  }

  if (!resp.ok) {
    if (lastStatus === 503 || lastStatus === 429 || lastStatus === 529) {
      return NextResponse.json(
        { error: "El servicio de IA está saturado en este momento. Probá de nuevo en unos minutos." },
        { status: 502 }
      )
    }
    return NextResponse.json(
      { error: `El servicio de IA devolvió un error (${lastStatus}). ${lastDetail}` },
      { status: 502 }
    )
  }

  let parsed: {
    nombre?: unknown
    categoria?: unknown
    ingredientes?: unknown
    instrucciones?: unknown
    notas?: unknown
    rendimiento?: unknown
  }
  try {
    const data = await resp.json()
    parsed = JSON.parse(data.choices[0].message.content)
  } catch {
    return NextResponse.json({ error: "No se pudo interpretar la respuesta de la IA." }, { status: 502 })
  }

  const ingredientes = (Array.isArray(parsed.ingredientes) ? parsed.ingredientes : [])
    .map((i) => {
      const ing = i as IngredienteAI
      return {
        nombre: cleanStr(ing.nombre),
        cantidad: toNumber(ing.cantidad),
        unidad: cleanStr(ing.unidad) || "g",
        ...(cleanStr(ing.grupo) ? { grupo: cleanStr(ing.grupo) } : {}),
      }
    })
    .filter((i) => i.nombre)

  const instrucciones = (Array.isArray(parsed.instrucciones) ? parsed.instrucciones : [])
    .map(cleanStr)
    .filter(Boolean)

  const nombre = cleanStr(parsed.nombre)
  if (!nombre || ingredientes.length === 0 || instrucciones.length === 0) {
    return NextResponse.json(
      { error: "La IA no pudo leer una receta completa en la foto. Probá con una foto más nítida." },
      { status: 422 }
    )
  }

  const categoriaAI = cleanStr(parsed.categoria)
  const categoria = categoriasRecetas.includes(categoriaAI) ? categoriaAI : undefined

  return NextResponse.json({
    nombre,
    ...(categoria ? { categoria } : {}),
    ingredientes,
    instrucciones,
    ...(cleanStr(parsed.notas) ? { notas: cleanStr(parsed.notas) } : {}),
    ...(cleanStr(parsed.rendimiento) ? { rendimiento: cleanStr(parsed.rendimiento) } : {}),
  })
}
