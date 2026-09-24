import { NextRequest, NextResponse } from "next/server"

export const maxDuration = 60

const SYSTEM_PROMPT = `Sos el transcriptor de fichas de cocina del restaurante Anafe.
Recibís la foto de una ficha de receta y la transcribís a JSON con este formato EXACTO:

{
  "nombre": "Nombre de la receta en mayúsculas como figura en la ficha",
  "ingredientes": [
    { "nombre": "nombre del ingrediente", "cantidad": 500, "unidad": "g", "grupo": "Grupo A" }
  ],
  "instrucciones": ["paso 1", "paso 2"],
  "notas": "notas opcionales",
  "rendimiento": "rinde opcional"
}

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

  let resp: Response
  try {
    // Gemini (plan gratuito) vía endpoint compatible con OpenAI
    resp = await fetch("https://generativelanguage.googleapis.com/v1beta/openai/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gemini-2.5-flash",
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
  } catch {
    return NextResponse.json({ error: "No se pudo contactar al servicio de IA." }, { status: 502 })
  }

  if (!resp.ok) {
    return NextResponse.json({ error: "El servicio de IA devolvió un error." }, { status: 502 })
  }

  let parsed: {
    nombre?: unknown
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

  return NextResponse.json({
    nombre,
    ingredientes,
    instrucciones,
    ...(cleanStr(parsed.notas) ? { notas: cleanStr(parsed.notas) } : {}),
    ...(cleanStr(parsed.rendimiento) ? { rendimiento: cleanStr(parsed.rendimiento) } : {}),
  })
}
