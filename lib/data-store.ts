import type { Receta, ConfiguracionHorno, NotaGeneral } from './types'

// Store de recetas - aquí irás agregando las recetas
export const recetas: Receta[] = [
  {
    id: "1",
    nombre: "Vinagreta de Limón",
    categoria: "Salsas",
    ingredientes: [
      // Grupo A - Base ácida
      { nombre: "Jugo de limón", cantidad: 200, unidad: "ml", grupo: "Base ácida" },
      { nombre: "Vinagre de alcohol", cantidad: 100, unidad: "ml", grupo: "Base ácida" },
      // Grupo B - Aceites
      { nombre: "Aceite de girasol", cantidad: 250, unidad: "ml", grupo: "Aceites" },
      { nombre: "Aceite de oliva", cantidad: 250, unidad: "ml", grupo: "Aceites" },
    ],
    instrucciones: [
      "Colocar los ingredientes del Grupo A (jugo de limón y vinagre) en una licuadora",
      "Encender la licuadora e incorporar el Grupo B (aceites) en forma de hilo hasta lograr una emulsión estable"
    ],
    notas: "Emulsión estándar",
    rendimiento: "800 ml aprox."
  },
  {
    id: "2",
    nombre: "Mermelada de Cebolla",
    categoria: "Salsas",
    ingredientes: [
      // Grupo A
      { nombre: "Cebolla blanca", cantidad: 1000, unidad: "g", grupo: "Grupo A" },
      { nombre: "Azúcar", cantidad: 400, unidad: "g", grupo: "Grupo A" },
      // Grupo B - Líquidos y Condimentos
      { nombre: "Jerez", cantidad: 150, unidad: "ml", grupo: "Líquidos y Condimentos" },
      { nombre: "Vinagre de alcohol", cantidad: 20, unidad: "ml", grupo: "Líquidos y Condimentos" },
      { nombre: "Sal fina", cantidad: 8, unidad: "g", grupo: "Líquidos y Condimentos" },
      { nombre: "Pimienta molida", cantidad: 0, unidad: "a gusto", grupo: "Líquidos y Condimentos" },
    ],
    instrucciones: [
      "Cortar la cebolla en juliana con mandolina para asegurar uniformidad",
      "En una olla a fuego medio-alto, colocar la cebolla, el azúcar, el jerez, el vinagre, la sal y la pimienta",
      "Cocinar revolviendo periódicamente",
      "Una vez que el líquido se evapore por completo, procesar hasta obtener la textura de mermelada"
    ],
    notas: "La proporción de azúcar es del 40% sobre el peso de la cebolla limpia"
  },
  {
    id: "3",
    nombre: "Masa de Arepas",
    categoria: "Masas",
    ingredientes: [
      // Grupo A
      { nombre: "Agua", cantidad: 1400, unidad: "ml", grupo: "Grupo A" },
      { nombre: "Sal fina", cantidad: 45, unidad: "g", grupo: "Grupo A" },
      // Grupo B
      { nombre: "Harina de maíz", cantidad: 1000, unidad: "g", grupo: "Grupo B" },
      // Grupo C
      { nombre: "Manteca pomada", cantidad: 240, unidad: "g", grupo: "Grupo C" },
      { nombre: "Queso reggianito rallado", cantidad: 270, unidad: "g", grupo: "Grupo C" },
    ],
    instrucciones: [
      "Disolver la sal en el agua",
      "Agregar la harina de maíz, integrar y dejar hidratar por 10 minutos",
      "Incorporar la manteca pomada y el queso. Amasar enérgicamente hasta que no queden grumos",
      "Porcionar en bollos de 80 g, dar forma y cocinar en plancha (Darto)"
    ],
    notas: "1 paquete estándar de harina de maíz = 1 kg",
    rendimiento: "~3.4 kg de masa (aprox. 42-43 unidades de 80 g)"
  },
  {
    id: "4",
    nombre: "Mezcla de Cachapas",
    categoria: "Masas",
    ingredientes: [
      // Grupo A
      { nombre: "Choclo desgranado (peso neto)", cantidad: 600, unidad: "g", grupo: "Grupo A" },
      // Grupo B - Secos
      { nombre: "Azúcar", cantidad: 120, unidad: "g", grupo: "Secos" },
      { nombre: "Harina de maíz", cantidad: 125, unidad: "g", grupo: "Secos" },
      { nombre: "Fécula de mandioca", cantidad: 50, unidad: "g", grupo: "Secos" },
      { nombre: "Ají molido", cantidad: 5, unidad: "g", grupo: "Secos" },
      { nombre: "Sal fina", cantidad: 10, unidad: "g", grupo: "Secos" },
      // Grupo C - Líquidos
      { nombre: "Huevo", cantidad: 2, unidad: "un", grupo: "Líquidos" },
    ],
    instrucciones: [
      "Desgranar el choclo y limpiar de restos de pelos",
      "Mezclar el choclo con todos los ingredientes del Grupo B (secos)",
      "Procesar en dos tandas: una tanda procesada apenas (para mantener textura de grano) y la otra tanda procesada a fondo",
      "Unificar ambas tandas en un bowl y agregar los huevos",
      "Cocinar en sartén con aceite y manteca usando aro de 12 cm. Medida: 1 bochero y medio (bochero azul). Cocción de un solo lado"
    ],
    rendimiento: "~1.2 kg de mezcla (aprox. 14-15 porciones de 80 g)"
  },
  {
    id: "5",
    nombre: "Salsa Tahini Ahumado",
    categoria: "Salsas",
    ingredientes: [
      { nombre: "Tahini ahumado", cantidad: 250, unidad: "g" },
      { nombre: "Ajo (rallado fino con Microplane)", cantidad: 10, unidad: "g" },
      { nombre: "Sal fina", cantidad: 10, unidad: "g" },
      { nombre: "Agua fría filtrada", cantidad: 80, unidad: "ml" },
      { nombre: "Jugo de limón", cantidad: 75, unidad: "ml" },
    ],
    instrucciones: [
      "En un bowl, colocar el tahini, la sal y el ajo rallado",
      "Incorporar el agua fría y el jugo de limón",
      "Batir enérgicamente con batidor de alambre hasta que la salsa cambie de color, quede lisa y espese",
      "Probar y rectificar el equilibrio entre sal y acidez"
    ],
    notas: "Textura final: lisa y emulsionada"
  },
  {
    id: "6",
    nombre: "Puré de Coliflor Caramelizado",
    categoria: "Purés",
    ingredientes: [
      { nombre: "Chocolate blanco Callebaut", cantidad: 1000, unidad: "g", grupo: "Chocolate Blanco Caramelizado" },
      { nombre: "Coliflor entero", cantidad: 1000, unidad: "g", grupo: "Grupo A" },
      { nombre: "Aceite de girasol", cantidad: 40, unidad: "cc", grupo: "Grupo A" },
      { nombre: "Sal fina", cantidad: 10, unidad: "g", grupo: "Grupo A" },
      { nombre: "Ajo écrasé", cantidad: 5, unidad: "u", grupo: "Grupo A" },
      { nombre: "Manteca", cantidad: 120, unidad: "g", grupo: "Grupo B" },
      { nombre: "Agua", cantidad: 100, unidad: "ml", grupo: "Grupo C" },
      { nombre: "Chocolate blanco caramelizado (picado)", cantidad: 100, unidad: "g", grupo: "Grupo C" },
      { nombre: "Manteca fría en cubos", cantidad: 80, unidad: "g", grupo: "Grupo C" },
    ],
    instrucciones: [
      "CHOCOLATE BLANCO CARAMELIZADO: Prender horno a 120°C. En una placa con silpat, volcar el chocolate blanco. Llevar al horno y con un timer cada 5 minutos remover el chocolate para que se caramelice uniformemente. Una vez dorado, volcar en moldes de silicona y dejar enfriar de un día para el otro.",
      "Picar el coliflor. En una olla ancha y baja poner el Grupo A más una cucharada de manteca (Grupo B).",
      "Cocinar/confitar a fuego bajo agregando más manteca de a poco a cucharadas. Si es necesario agregar un poco de agua para despegar o evitar que se quemen. El coliflor debe quedar bien caramelizado.",
      "Separar los sólidos de los líquidos. Licuar los sólidos agregando los líquidos más el agua del Grupo C en hilo para emulsionar.",
      "Terminar montando con el chocolate blanco caramelizado picado y la manteca fría en cubos del Grupo C.",
    ],
    notas: "El Grupo A rinde para x3. Si el coliflor está frío al licuar, el chocolate debe estar derretido y la manteca no necesariamente fría. El agua del Grupo C puede ajustarse entre 50 y 150 ml según la textura deseada.",
  },
  {
    id: "8",
    nombre: "Pickles de Jalapeño",
    categoria: "Conservas",
    ingredientes: [
      { nombre: "Jalapeño en juliana", cantidad: 500, unidad: "g", grupo: "Grupo A" },
      { nombre: "Vinagre de alcohol", cantidad: 800, unidad: "g", grupo: "Grupo B" },
      { nombre: "Agua", cantidad: 300, unidad: "g", grupo: "Grupo B" },
      { nombre: "Azúcar", cantidad: 250, unidad: "g", grupo: "Grupo C" },
      { nombre: "Sal", cantidad: 50, unidad: "g", grupo: "Grupo C" },
      { nombre: "Hojas de orégano", cantidad: 0, unidad: "a gusto", grupo: "Grupo C" },
    ],
    instrucciones: [
      "Blanquear el jalapeño (Grupo A) en agua hirviendo durante 2 minutos.",
      "Cocinar 10 minutos en el Grupo B junto con el Grupo C.",
    ],
  },
  {
    id: "9",
    nombre: "Pickles de Cebolla",
    categoria: "Conservas",
    ingredientes: [
      { nombre: "Cebolla morada en pluma", cantidad: 1000, unidad: "g", grupo: "Grupo A" },
      { nombre: "Vinagre", cantidad: 900, unidad: "g", grupo: "Grupo B" },
      { nombre: "Agua", cantidad: 300, unidad: "g", grupo: "Grupo B" },
      { nombre: "Azúcar", cantidad: 350, unidad: "g", grupo: "Grupo B" },
      { nombre: "Sal", cantidad: 100, unidad: "g", grupo: "Grupo B" },
      { nombre: "Semillas de mostaza", cantidad: 0, unidad: "a gusto", grupo: "Grupo C" },
      { nombre: "Hojas de laurel", cantidad: 0, unidad: "a gusto", grupo: "Grupo C" },
      { nombre: "Semillas de pimienta", cantidad: 0, unidad: "a gusto", grupo: "Grupo C" },
      { nombre: "Eneldo", cantidad: 0, unidad: "a gusto", grupo: "Grupo C" },
    ],
    instrucciones: [
      "Infusionar el Grupo B junto con el Grupo C hasta hervir.",
      "Agregar el Grupo A (cebolla morada) una vez que esté hirviendo. Cocinar 8 minutos.",
    ],
  },
  {
    id: "7",
    nombre: "Puré de Flores de Coliflor",
    categoria: "Purés",
    ingredientes: [
      { nombre: "Coliflor (flores)", cantidad: 1000, unidad: "g", grupo: "Grupo A" },
      { nombre: "Leche", cantidad: 550, unidad: "ml", grupo: "Grupo A" },
      { nombre: "Agua", cantidad: 550, unidad: "ml", grupo: "Grupo A" },
      { nombre: "Ajo aplastado", cantidad: 3, unidad: "u", grupo: "Grupo A" },
      { nombre: "Sal", cantidad: 0, unidad: "c/n", grupo: "Grupo A" },
      { nombre: "Pimienta blanca", cantidad: 0, unidad: "c/n", grupo: "Grupo A" },
      { nombre: "Nuez moscada", cantidad: 0, unidad: "c/n", grupo: "Grupo A" },
      { nombre: "Manteca en cubos congelados", cantidad: 0, unidad: "a gusto", grupo: "Grupo B" },
    ],
    instrucciones: [
      "Cocinar las flores de coliflor partiendo desde frío en iguales cantidades de agua y leche, con los ajos aplastados, sal, pimienta blanca y nuez moscada.",
      "Llevar a hervor, bajar el fuego y retirar cuando estén cocidos pero aún con diente.",
      "Enfriar y reservar. El líquido de cocción se puede reciclar hasta dos veces.",
      "Procesar el Grupo A en licuadora y agregar el Grupo B (manteca en cubos congelados) para que emulsione. Rectificar la sal y guardar.",
    ],
    rendimiento: "900 g aprox.",
    notas: "El líquido de cocción puede reutilizarse hasta dos veces.",
  },
  {
    id: "10",
    nombre: "Pipil de Cerdo",
    categoria: "Otros",
    ingredientes: [
      // Proteína
      { nombre: "Bondiola de cerdo sin hueso", cantidad: 2000, unidad: "g", grupo: "Proteína" },
      // Recado (Marinada)
      { nombre: "Pasta de achiote", cantidad: 150, unidad: "g", grupo: "Recado" },
      { nombre: "Jugo de naranja", cantidad: 200, unidad: "ml", grupo: "Recado" },
      { nombre: "Jugo de limón", cantidad: 100, unidad: "ml", grupo: "Recado" },
      { nombre: "Vinagre blanco", cantidad: 40, unidad: "ml", grupo: "Recado" },
      { nombre: "Ajo", cantidad: 6, unidad: "un", grupo: "Recado" },
      { nombre: "Comino molido", cantidad: 5, unidad: "g", grupo: "Recado" },
      { nombre: "Orégano seco", cantidad: 3, unidad: "g", grupo: "Recado" },
      { nombre: "Canela molida", cantidad: 2, unidad: "g", grupo: "Recado" },
      { nombre: "Clavo de olor molido", cantidad: 1, unidad: "g", grupo: "Recado" },
      { nombre: "Pimienta negra molida", cantidad: 3, unidad: "g", grupo: "Recado" },
      { nombre: "Sal fina", cantidad: 20, unidad: "g", grupo: "Recado" },
      // Cocción
      { nombre: "Hojas de banana", cantidad: 0, unidad: "c/n", grupo: "Cocción" },
      { nombre: "Aceite de girasol", cantidad: 20, unidad: "ml", grupo: "Cocción" },
    ],
    instrucciones: [
      "RECADO: Procesar todos los ingredientes del grupo Recado (pasta de achiote, jugos, vinagre, ajo y especias) hasta obtener una marinada homogénea y fluida.",
      "MARINADO: Cortar la bondiola en trozos grandes de aprox. 400 g. Cubrir completamente con el recado y marinar en frío mínimo 12 horas (ideal 24 hs).",
      "PREPARACIÓN HOJAS: Pasar las hojas de banana brevemente por llama directa o plancha caliente hasta que cambien de color y se tornen flexibles. Esto evita roturas y activa sus aromas.",
      "ARMADO: Pincelar las hojas con aceite. Distribuir los trozos de cerdo con toda la marinada en el centro y envolver formando un paquete hermético. Asegurar con hilo de cocina o tiras de la misma hoja.",
      "COCCIÓN: Llevar al horno a 150°C durante 3.5 a 4 horas. El cerdo debe estar completamente tierno y separarse sin esfuerzo.",
      "DESCANSO: Retirar del horno y dejar reposar 20 minutos antes de abrir el paquete. Deshilachar la carne (pullear) y mezclar con todos los jugos del paquete.",
      "REDUCCIÓN (opcional): Filtrar los jugos de cocción y reducir al 50% a fuego medio para obtener una salsa de terminación concentrada.",
    ],
    notas: "Corte recomendado: bondiola por su grasa intramuscular, que garantiza jugosidad tras la cocción prolongada. La combinación naranja + limón reemplaza la naranja agria tradicional (difícil de conseguir). La temperatura de 150°C es clave: por encima se reseca, por debajo no se funde el colágeno. El recado puede prepararse en cantidad y congelarse hasta 3 meses.",
    tiempoPreparacion: "12-24 hs marinado + 4 hs cocción",
    rendimiento: "~1.4 kg de carne lista (aprox. 7-8 porciones de 180 g)",
  },
]

// Configuraciones de horno
export const configuracionesHorno: ConfiguracionHorno[] = [
  // Ejemplo:
  // {
  //   id: "1",
  //   titulo: "Croissants",
  //   descripcion: "Configuración óptima para croissants",
  //   temperatura: "200°C",
  //   tiempo: "18-20 min"
  // }
]

// Notas generales y tips
export const notasGenerales: NotaGeneral[] = [
  // Ejemplo:
  // {
  //   id: "1",
  //   titulo: "Conversión de levadura",
  //   contenido: "Levadura fresca a seca: dividir entre 3",
  //   categoria: "Conversiones"
  // }
]

// Categorías de recetas disponibles
export const categoriasRecetas = [
  "Panadería",
  "Pastelería",
  "Masas",
  "Purés",
  "Salsas",
  "Conservas",
  "Otros"
]

// Categorías de notas
export const categoriasNotas = [
  "Conversiones",
  "Tips",
  "Técnicas",
  "Temperaturas",
  "Otros"
]
