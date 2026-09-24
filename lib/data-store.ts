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
    nombre: "Pil Pil de Pescado",
    categoria: "Salsas",
    ingredientes: [
      { nombre: "Gelatina de colágeno", cantidad: 100, unidad: "g", grupo: "Base" },
      { nombre: "Manteca derretida", cantidad: 300, unidad: "g", grupo: "Grasas" },
      { nombre: "Beurre noisette", cantidad: 100, unidad: "g", grupo: "Grasas" },
      { nombre: "Chardonnay reducido", cantidad: 30, unidad: "ml", grupo: "Terminación" },
    ],
    instrucciones: [
      "Procesar la gelatina en Thermomix a 40°C, velocidad 4.5 durante 5 minutos hasta que emulsione y tome cuerpo.",
      "Agregar el Chardonnay reducido en cuanto la gelatina ligue.",
      "Sin interrumpir, incorporar ambas mantecas mezcladas en hilo fino por el bocal (~2 min) hasta obtener una emulsión homogénea y brillante.",
      "Mantener a 35–40°C para el servicio.",
    ],
    notas: "No usar velocidad alta ni trabajar la gelatina semi gelificada: rompe la emulsión. Servir siempre en caliente.",
    rendimiento: "~530 ml",
  },
  {
    id: "11",
    nombre: "Puré de Calabaza Noisette",
    categoria: "Purés",
    ingredientes: [
      { nombre: "Zapallo anco", cantidad: 2, unidad: "u", grupo: "Grupo A" },
      { nombre: "Ajo", cantidad: 20, unidad: "g", grupo: "Grupo B" },
      { nombre: "Aceite de oliva", cantidad: 50, unidad: "ml", grupo: "Grupo B" },
      { nombre: "Sal fina", cantidad: 10, unidad: "g", grupo: "Grupo B" },
      { nombre: "Pimienta molida", cantidad: 5, unidad: "g", grupo: "Grupo B" },
      { nombre: "Manteca noisette", cantidad: 300, unidad: "g", grupo: "Grupo C" },
    ],
    instrucciones: [
      "Lavar, pelar y retirar semillas de la calabaza.",
      "Precalentar horno a 180 grados.",
      "Llevar a una placa con el Grupo B y tapar muy bien con aluminio.",
      "Llevar a horno por 30 minutos hasta que esté cocida la calabaza.",
      "Retirar el aluminio de la placa, subir a 190 grados y dejar que se caramelice un poco.",
      "Una vez caramelizadas, retirar el ajo y procesar en thermomix con la manteca noisette hasta que quede bien liso y sedoso. Si no están calientes, ponerle temperatura a la thermo.",
    ],
    notas: "2 unidades de zapallo anco ≈ 2.5 kg.",
  },
  {
    id: "12",
    nombre: "Gelatina de Pescado",
    categoria: "Salsas",
    ingredientes: [
      { nombre: "Espinazo, cabeza y pieles de pesca blanca (alta en colágeno)", cantidad: 2, unidad: "kg" },
    ],
    instrucciones: [
      "Limpiar bien todo en agua con hielo para sacar impurezas y sangre.",
      "Una vez limpios, llevar a una olla, cubrir con agua fría nueva y llevar a hervor violento limpiando y espumando todas las impurezas que floten en la superficie.",
      "Cocinar fuerte hasta que haya reducido a la mitad, los huesos empiecen a romperse, el líquido haya tomado un color blancuzco-amarillento y el caldo esté más espeso. En ese punto, colar primero en un chino fino y después por un trapo de queso o cofia.",
      "Transferir el líquido a un cambro y dejar enfriar. Va a quedar duro como una gelatina.",
    ],
    notas: "Base de la emulsión del Pil Pil de Pescado.",
  },
  {
    id: "13",
    nombre: "Puré de Cajú",
    categoria: "Purés",
    ingredientes: [
      { nombre: "Castañas de cajú", cantidad: 1, unidad: "kg", grupo: "Grupo A" },
      { nombre: "Agua fría", cantidad: 300, unidad: "ml", grupo: "Grupo B" },
      { nombre: "Vinagre de alcohol", cantidad: 175, unidad: "ml", grupo: "Grupo B" },
      { nombre: "Diente de ajo sin germen", cantidad: 1, unidad: "u", grupo: "Grupo B" },
      { nombre: "Sal fina", cantidad: 0, unidad: "c/n", grupo: "Grupo B" },
    ],
    instrucciones: [
      "Remojar las castañas de cajú en agua por lo menos 12 horas para activarlas.",
      "Una vez pasado ese tiempo escurrir el agua y poner las castañas en un vaso de licuadora.",
      "Agregar el vinagre de alcohol y el agua bien fría. Procesar a velocidad máxima 2 o 3 minutos.",
      "Agregar un diente de ajo hasta que quede textura bien lisa. No tiene que tener grumos; si tiene, hay que agregar más agua fría y seguir procesando hasta que quede bien.",
      "Salar a gusto y rectificar de ajo y/o de vinagre si hace falta.",
    ],
    rendimiento: "2,095 kg",
  },
  {
    id: "14",
    nombre: "Pesto de Pasas y Nueces",
    categoria: "Salsas",
    ingredientes: [
      { nombre: "Nueces pecan tostadas", cantidad: 375, unidad: "g" },
      { nombre: "Pasas de uva hidratadas", cantidad: 125, unidad: "g" },
      { nombre: "Perejil plano", cantidad: 0.25, unidad: "atado" },
      { nombre: "Ajo (diente pequeño, rallado)", cantidad: 1, unidad: "u" },
      { nombre: "Ralladura de limón", cantidad: 3, unidad: "u" },
      { nombre: "Vinagre blanco de alcohol", cantidad: 45, unidad: "ml" },
      { nombre: "Aceto Millán (reducción)", cantidad: 40, unidad: "ml" },
      { nombre: "Aceite de oliva", cantidad: 60, unidad: "ml" },
      { nombre: "Aceite de girasol", cantidad: 70, unidad: "ml" },
      { nombre: "Sal", cantidad: 0, unidad: "c/n" },
    ],
    instrucciones: [
      "Si no tenés pasas de uva hidratadas: hidratar las pasas de uva y separar 125 gr de las ya hidratadas.",
      "Picar las pecans, picar las pasas, picar el perejil y condimentar todo.",
    ],
  },
  {
    id: "15",
    nombre: "Pickle de Shiitake",
    categoria: "Conservas",
    ingredientes: [
      { nombre: "Shiitake fresco cortado en juliana", cantidad: 1, unidad: "kg", grupo: "Grupo A" },
      { nombre: "Miel", cantidad: 500, unidad: "g", grupo: "Grupo B" },
      { nombre: "Salsa de soja", cantidad: 500, unidad: "g", grupo: "Grupo B" },
      { nombre: "Vinagre de alcohol", cantidad: 500, unidad: "g", grupo: "Grupo B" },
    ],
    instrucciones: [
      "Llevar el Grupo B a una olla a que rompa hervor, apagar y verter sobre los shiitakes frescos.",
    ],
  },
  {
    id: "16",
    nombre: "Reducción de Oporto",
    categoria: "Salsas",
    ingredientes: [
      { nombre: "Vino tinto", cantidad: 200, unidad: "ml" },
      { nombre: "Oporto", cantidad: 200, unidad: "ml" },
      { nombre: "Azúcar", cantidad: 200, unidad: "g" },
    ],
    instrucciones: [
      "Poner en olla y reducir hasta jalea.",
    ],
  },
  {
    id: "17",
    nombre: "Provenzal de Limón de Anafe",
    categoria: "Salsas",
    ingredientes: [
      { nombre: "Perejil", cantidad: 0.5, unidad: "atado", grupo: "Grupo A" },
      { nombre: "Ajo", cantidad: 8, unidad: "g", grupo: "Grupo A" },
      { nombre: "Ralladura de limón", cantidad: 4, unidad: "u", grupo: "Grupo A" },
      { nombre: "Aceite de oliva", cantidad: 70, unidad: "g", grupo: "Grupo B" },
      { nombre: "Aceite de girasol", cantidad: 30, unidad: "g", grupo: "Grupo B" },
      { nombre: "Jugo de limón", cantidad: 0, unidad: "c/n", grupo: "Grupo B" },
      { nombre: "Sal", cantidad: 0, unidad: "pizca", grupo: "Grupo B" },
    ],
    instrucciones: [
      "Deshojar y lavar las hojas de perejil. Picar bien. Tiene que llenar más o menos ½ cambro de 1/9.",
      "Agregar el ajo rallado con microplane y la piel de 4 limones en microplane también.",
      "Condimentar con los aceites, sal, vinagre y jugo de limón hasta que esté rica.",
    ],
    notas: "El paso 3 menciona vinagre para condimentar, aunque no figura en el mise en place.",
  },
  {
    id: "18",
    nombre: "Ricotta de Anafe",
    categoria: "Otros",
    ingredientes: [
      { nombre: "Leche entera", cantidad: 20, unidad: "l", grupo: "Grupo A" },
      { nombre: "Crema de leche de sachet", cantidad: 2.5, unidad: "l", grupo: "Grupo A" },
      { nombre: "Vinagre blanco de alcohol", cantidad: 1, unidad: "l", grupo: "Grupo A" },
      { nombre: "Crema de leche de sachet", cantidad: 1.6, unidad: "l", grupo: "Grupo B" },
      { nombre: "Sal fina marina", cantidad: 30, unidad: "g", grupo: "Grupo B" },
    ],
    instrucciones: [
      "Colocar la leche entera y la crema de leche de sachet en una olla grande y llevar a fuego medio hasta 95 grados.",
      "Agregar el vinagre de alcohol y apagar el fuego. Poner una tapa y reposar 10 minutos para que se formen los curds.",
      "Filtrar la ricota con una araña en un chino con una tela de quesos. Dejar filtrando en frío por lo menos 12 horas.",
      "Una vez pasado ese tiempo colocar la ricota en un bowl y agregar la crema de leche de sachet del punto B) y la sal. Probar y rectificar si hace falta.",
      "Reservar en cambro para el servicio.",
    ],
    rendimiento: "5 kg",
    notas: "La ficha trae cantidades reducidas entre paréntesis: 2 lt leche, 250 crema, 65 ml vinagre, 160 gr crema (punto B), 5 gr sal.",
  },
  {
    id: "19",
    nombre: "Repollo Braseado",
    categoria: "Otros",
    ingredientes: [
      { nombre: "Repollos blancos", cantidad: 3, unidad: "u" },
      { nombre: "Aceite de oliva", cantidad: 0, unidad: "c/n" },
      { nombre: "Ajo picado", cantidad: 6, unidad: "dientes" },
      { nombre: "Sal", cantidad: 0, unidad: "c/n" },
      { nombre: "Pimienta", cantidad: 0, unidad: "a gusto" },
      { nombre: "Agua", cantidad: 1, unidad: "taza" },
    ],
    instrucciones: [
      "Cortar los repollos en cuartos, manteniendo el nudo. Estibarlos en la placa y condimentar con oliva, ajo picado, sal, pimienta y 1 taza de agua.",
      "Cubrir con metálico y hornear a 160°C hasta blando. Dar vuelta a mitad de cocción y chekear que nunca se queden sin líquido.",
    ],
    rendimiento: "12 porciones",
  },
  {
    id: "20",
    nombre: "Salsa de Levadura 2.0",
    categoria: "Salsas",
    ingredientes: [
      { nombre: "Manteca", cantidad: 450, unidad: "g", grupo: "Manteca de levadura y cerveza" },
      { nombre: "Levadura nutricional", cantidad: 100, unidad: "g", grupo: "Manteca de levadura y cerveza" },
      { nombre: "Cerveza rubia o de trigo", cantidad: 225, unidad: "ml", grupo: "Manteca de levadura y cerveza" },
      { nombre: "Cerveza rubia o de trigo", cantidad: 0, unidad: "c/n", grupo: "Salsa (en servicio, por repollo)" },
      { nombre: "Manteca de levadura y cerveza", cantidad: 0, unidad: "c/n", grupo: "Salsa (en servicio, por repollo)" },
      { nombre: "Jugo de limón", cantidad: 0, unidad: "c/n", grupo: "Salsa (en servicio, por repollo)" },
      { nombre: "Sal", cantidad: 0, unidad: "c/n", grupo: "Salsa (en servicio, por repollo)" },
    ],
    instrucciones: [
      "Hacer manteca noisette. Apagar el fuego y dejar asentar 5 min.",
      "Agregar la levadura nutricional cuando la manteca está todavía caliente así se tuesta. Enfriar completamente.",
      "Cuando la manteca está completamente fría, reducir la cerveza hasta la mitad.",
      "Llevar la reducción de cerveza caliente a la thermomix y mixear mientras le agregás la manteca con levadura fría para generar una emulsión.",
      "En servicio (por cada repollo): poner en una sartén 2 cucharadas de cerveza (usar cucharada medidora) y emulsionar con la manteca de levadura y cerveza. Condimentar con jugo de limón y sal.",
    ],
    notas: "Proporción de referencia: 113 ml de reducción de cerveza x 550 gr de manteca de levadura tostada.",
  },
  {
    id: "21",
    nombre: "Ali Oli Tonatto",
    categoria: "Salsas",
    ingredientes: [
      { nombre: "Pescado confitado en recortes", cantidad: 300, unidad: "g", grupo: "Grupo A" },
      { nombre: "Anchoas", cantidad: 4, unidad: "u", grupo: "Grupo A" },
      { nombre: "Alcaparras lavadas", cantidad: 50, unidad: "g", grupo: "Grupo A" },
      { nombre: "Caldo de pollo", cantidad: 100, unidad: "ml", grupo: "Grupo A" },
      { nombre: "Yemas", cantidad: 4, unidad: "u", grupo: "Grupo A" },
      { nombre: "Mostaza de Dijon", cantidad: 1, unidad: "cda", grupo: "Grupo A" },
      { nombre: "Aceite de girasol", cantidad: 800, unidad: "ml", grupo: "Grupo B" },
      { nombre: "Aceite de oliva", cantidad: 200, unidad: "ml", grupo: "Grupo B" },
      { nombre: "Jugo de limón", cantidad: 0.5, unidad: "u", grupo: "Grupo C" },
      { nombre: "Vinagre blanco", cantidad: 0, unidad: "c/n", grupo: "Grupo C" },
      { nombre: "Pimienta blanca", cantidad: 0, unidad: "a gusto", grupo: "Grupo C" },
    ],
    instrucciones: [
      "Hacer una pasta con el Grupo A lo más lisa posible.",
      "Emulsionar con el Grupo B.",
      "Condimentar con el Grupo C.",
    ],
    notas: "El pescado va confitado y levemente ahumado, sin que se seque. Anchoas: Herman Viva.",
  },
  {
    id: "22",
    nombre: "Arroz Marcado",
    categoria: "Otros",
    ingredientes: [
      { nombre: "Arroz", cantidad: 200, unidad: "g", grupo: "Por porción" },
      { nombre: "Sofrito", cantidad: 150, unidad: "g", grupo: "Por porción" },
      { nombre: "Fondo de pescado", cantidad: 230, unidad: "g", grupo: "Por porción" },
      { nombre: "Demi glace", cantidad: 50, unidad: "g", grupo: "Por porción" },
      { nombre: "Provenzal", cantidad: 10, unidad: "g", grupo: "Por porción" },
      { nombre: "Alioli", cantidad: 30, unidad: "g", grupo: "Por porción" },
      { nombre: "Morcilla", cantidad: 100, unidad: "g", grupo: "Por porción" },
      { nombre: "Limón (1 cuña)", cantidad: 20, unidad: "g", grupo: "Por porción" },
      { nombre: "Ciboulette", cantidad: 10, unidad: "g", grupo: "Por porción" },
      { nombre: "Cebollas medianas", cantidad: 3, unidad: "u", grupo: "Grupo A" },
      { nombre: "Arroz carnaroli", cantidad: 3, unidad: "kg", grupo: "Grupo B" },
      { nombre: "Vino blanco", cantidad: 500, unidad: "ml", grupo: "Grupo B" },
      { nombre: "Aceite de oliva", cantidad: 0, unidad: "c/n", grupo: "Grupo B" },
      { nombre: "Agua", cantidad: 3, unidad: "l", grupo: "Grupo B" },
      { nombre: "Sal marina", cantidad: 0, unidad: "c/n", grupo: "Grupo B" },
    ],
    instrucciones: [
      "Cortar la cebolla en brunoise bien prolija.",
      "Calentar en una olla los 3 litros de agua hasta hervor. Poner dos o tres bandejas de horno planas en el freezer para que estén bien frías.",
      "Llevar a una olla a fuego bajo el aceite y agregar las cebollas en brunoise. Sofreír solo hasta que estén transparentes. No tienen que tomar color.",
      "Agregar el arroz y nacarar un minuto.",
      "Subir el fuego al máximo y agregar el vino blanco. Tiene que evaporar y reducir bien rápido.",
      "Cuando esté casi seco agregar el agua de una sola vez y una pizca de sal.",
      "Cocinar a fuego medio/fuerte con cuidado de que no se pegue. No hay que estar revolviendo todo el tiempo porque el arroz larga almidón (no es lo que queremos) pero sí de vez en cuando para despegar y que se cocine parejo.",
      "Cuando casi no quede líquido sacar del fuego y pasar rápidamente a las placas previamente enfriadas. Estirar bien fino y hacer cortes en cuadrícula con una espátula. Llevar a freezer inmediatamente y dejar enfriar unos 10 minutos. Después se puede llevar a cámara o heladera.",
      "Porcionar en bolsas de 200 gr para el servicio.",
    ],
    rendimiento: "33 porciones",
  },
  {
    id: "23",
    nombre: "Vinagreta de Curry",
    categoria: "Salsas",
    ingredientes: [
      { nombre: "Aceite de girasol", cantidad: 300, unidad: "ml", grupo: "Grupo A" },
      { nombre: "Garam masala", cantidad: 250, unidad: "g", grupo: "Grupo A" },
      { nombre: "Aceto balsámico (reducción)", cantidad: 200, unidad: "ml", grupo: "Grupo B" },
      { nombre: "Vinagre de alcohol", cantidad: 40, unidad: "ml", grupo: "Grupo B" },
      { nombre: "Aceite de oliva", cantidad: 300, unidad: "ml", grupo: "Grupo B" },
    ],
    instrucciones: [
      "Infusionar el garam masala en el aceite de girasol a fuego mínimo durante unos minutos. Colar.",
      "Dejar enfriar hasta temperatura ambiente y después emulsionar en licuadora el aceite infusionado, el aceite de oliva y los vinagres.",
      "Poner en biberón y reservar para el servicio.",
    ],
  },
  {
    id: "24",
    nombre: "Garam Masala",
    categoria: "Otros",
    ingredientes: [
      { nombre: "Coriandro", cantidad: 0.5, unidad: "taza" },
      { nombre: "Semillas de comino", cantidad: 0.25, unidad: "taza" },
      { nombre: "Canela", cantidad: 4, unidad: "ramas" },
      { nombre: "Laurel", cantidad: 4, unidad: "hojas" },
      { nombre: "Cardamomo (abierto con la vaina)", cantidad: 8, unidad: "u" },
      { nombre: "Clavo de olor", cantidad: 15, unidad: "u" },
      { nombre: "Anís estrellado", cantidad: 2, unidad: "u" },
      { nombre: "Sichuan", cantidad: 1, unidad: "cta" },
      { nombre: "Nuez moscada", cantidad: 1, unidad: "u" },
      { nombre: "Pimienta negra", cantidad: 20, unidad: "granos" },
      { nombre: "Hinojo", cantidad: 1, unidad: "tbsp" },
      { nombre: "Fenogreco", cantidad: 0.5, unidad: "tbsp" },
    ],
    instrucciones: [
      "Tostar todo junto en horno bajo y hacer polvo en licuadora o procesadora. Reservar en tupper.",
    ],
    notas: "Se usa en la Vinagreta de Curry.",
  },
  {
    id: "25",
    nombre: "Fumet de Pescado",
    categoria: "Otros",
    ingredientes: [
      { nombre: "Espinas y cabezas de pescado blanco (sin branquias)", cantidad: 0, unidad: "c/n", grupo: "Grupo A" },
      { nombre: "Cebolla", cantidad: 0, unidad: "c/n", grupo: "Grupo B" },
      { nombre: "Apio", cantidad: 0, unidad: "c/n", grupo: "Grupo B" },
      { nombre: "Puerro", cantidad: 0, unidad: "c/n", grupo: "Grupo B" },
      { nombre: "Zanahoria", cantidad: 0, unidad: "c/n", grupo: "Grupo B" },
      { nombre: "Laurel", cantidad: 0, unidad: "c/n", grupo: "Grupo C" },
      { nombre: "Perejil", cantidad: 0, unidad: "c/n", grupo: "Grupo C" },
      { nombre: "Agua fría", cantidad: 0, unidad: "c/n", grupo: "Grupo C" },
    ],
    instrucciones: [
      "Lavar muy bien el Grupo A.",
      "Rehogar el Grupo B sin que tomen color.",
      "Agregar las espinas, cabezas y agua.",
      "Llevar a hervor suave y espumar.",
      "Agregar perejil y laurel.",
      "Cocinar 20/25 minutos.",
      "Colar por chino fino y enfriar.",
    ],
  },
  {
    id: "26",
    nombre: "Manteca de Ajo",
    categoria: "Salsas",
    ingredientes: [
      { nombre: "Manteca", cantidad: 400, unidad: "g" },
      { nombre: "Ajo", cantidad: 25, unidad: "g" },
    ],
    instrucciones: [
      "Emulsionar en thermomix.",
      "Derretir para usar en servicio pintando en cocción los langostinos.",
    ],
  },
  {
    id: "27",
    nombre: "Sofrito de Azafrán",
    categoria: "Salsas",
    ingredientes: [
      { nombre: "Cebolla", cantidad: 2.5, unidad: "kg", grupo: "Grupo A" },
      { nombre: "Zanahoria", cantidad: 2, unidad: "kg", grupo: "Grupo A" },
      { nombre: "Morrón verde", cantidad: 4, unidad: "kg", grupo: "Grupo A" },
      { nombre: "Verdeo entero", cantidad: 700, unidad: "g", grupo: "Grupo A" },
      { nombre: "Aceite de girasol", cantidad: 0, unidad: "c/n", grupo: "Grupo A" },
      { nombre: "Tomate triturado", cantidad: 2, unidad: "kg", grupo: "Grupo B" },
      { nombre: "Caldo de pollo", cantidad: 2, unidad: "l", grupo: "Grupo C" },
      { nombre: "Azafrán", cantidad: 2, unidad: "g", grupo: "Grupo C" },
      { nombre: "Cabezas de ajo asado", cantidad: 12, unidad: "u", grupo: "Grupo D" },
    ],
    instrucciones: [
      "Cortar el Grupo A en brunoise y poner a sofreír a fuego medio hasta bien cocido casi pasta.",
      "Agregar el tomate triturado y cocinar hasta casi seco.",
      "Ir mojando con el caldo de pollo y azafrán como si fuera un risotto.",
      "Cuando haya absorbido todo el caldo agregar la pulpa de ajo y el coral de langostinos. Apagar el fuego. Enfriar, envasar al vacío y congelar.",
    ],
    notas: "La ficha tiene anotaciones manuscritas: en el Grupo C figura 'caldo de langostinos c/n' y en el Grupo D el coral de langostinos aparece tachado ('ver cantidad').",
  },
  {
    id: "28",
    nombre: "Caldo de Pollo Dorado",
    categoria: "Otros",
    ingredientes: [
      { nombre: "Huesos de pollo dorados", cantidad: 3, unidad: "kg", grupo: "Grupo A" },
      { nombre: "Alitas de pollo doradas", cantidad: 1, unidad: "kg", grupo: "Grupo A" },
      { nombre: "Cebolla en juliana", cantidad: 300, unidad: "g", grupo: "Grupo B" },
      { nombre: "Zanahorias en mirepoix", cantidad: 450, unidad: "g", grupo: "Grupo B" },
      { nombre: "Apio en mirepoix (ramas)", cantidad: 190, unidad: "g", grupo: "Grupo B" },
      { nombre: "Puerro en mirepoix", cantidad: 50, unidad: "g", grupo: "Grupo B" },
      { nombre: "Aceite neutro", cantidad: 10, unidad: "ml", grupo: "Grupo C" },
      { nombre: "Agua fría", cantidad: 10, unidad: "l", grupo: "Grupo C" },
      { nombre: "Laurel", cantidad: 2, unidad: "hojas", grupo: "Grupo D" },
      { nombre: "Tomillo", cantidad: 10, unidad: "ramitas", grupo: "Grupo D" },
      { nombre: "Romero", cantidad: 5, unidad: "g", grupo: "Grupo D" },
      { nombre: "Perejil", cantidad: 7, unidad: "g", grupo: "Grupo D" },
      { nombre: "Pimienta", cantidad: 7, unidad: "g", grupo: "Grupo D" },
    ],
    instrucciones: [
      "Dorar las carcasas por un lado, por otro lado las alitas. Horno 190°C x 40 minutos aproximadamente.",
      "En una olla alta (la de la pasta) sofreír la cebolla hasta que empiece a dorar. Después agregar la zanahoria, apio, puerro y dejar que tome un poco de color.",
      "Una vez dorado, agregar las carcasas, alitas y aromáticas (menos el perejil). Agregar el agua. Una vez que rompe hervor bajar el fuego a mínimo y cocinar por 2/3 hs.",
      "Antes de apagar agregar el perejil y dejar un rato para que se termine de infusionar.",
      "Filtrar, enfriar y envasar al vacío.",
    ],
  },
  {
    id: "29",
    nombre: "Manzanas Prensadas",
    categoria: "Otros",
    ingredientes: [
      { nombre: "Azúcar", cantidad: 200, unidad: "g", grupo: "Almíbar" },
      { nombre: "Agua", cantidad: 400, unidad: "ml", grupo: "Almíbar" },
      { nombre: "Sal", cantidad: 1, unidad: "cdta", grupo: "Almíbar" },
      { nombre: "Cáscaras de las 4 manzanas", cantidad: 0, unidad: "c/n", grupo: "Almíbar" },
      { nombre: "Hojas tiernas de apio", cantidad: 10, unidad: "g", grupo: "Almíbar" },
      { nombre: "Manzanas", cantidad: 4, unidad: "u", grupo: "Manzanas" },
      { nombre: "Almíbar (filtrado)", cantidad: 260, unidad: "ml", grupo: "Manzanas" },
    ],
    instrucciones: [
      "Almíbar: llevar todo junto hasta hervor y apagar. Solo tiene que hervir; si reduce está mal.",
      "Pelar y cortar las manzanas en cubos de 1cm x 1cm.",
      "Poner en un cambro con 260 ml de almíbar o la cantidad necesaria para cubrir, no más no menos.",
      "Comprimir. Llevar el cambro abierto a la máquina de vacío seteada: temp vaccum high, Vacuum 30, sealling 2.0.",
    ],
    notas: "El almíbar para las manzanas va filtrado. Las hojas de apio son las de adentro, blandas y amarillitas.",
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

// Recetas de cocina
export const recetasCocina: Receta[] = [
  {
    id: "c1",
    nombre: "Masa de Pasta",
    categoria: "Masas",
    ingredientes: [
      { nombre: "Harina 0000", cantidad: 3000, unidad: "g", grupo: "Grupo A" },
      { nombre: "Yemas egg höns", cantidad: 900, unidad: "g", grupo: "Grupo B" },
      { nombre: "Agua", cantidad: 600, unidad: "ml", grupo: "Grupo B" },
    ],
    instrucciones: [
      "Disponer la harina (A) en la planetaria. En un bowl aparte, batir las yemas con el agua hasta romperlas.",
      "Hacer una corona con la harina y agregar el Grupo B. Integrar con el gancho hasta que la masa tome cuerpo.",
      "Retirar de la planetaria, llevar a la mesada y dividir en dos. Amasar cada bollo hasta obtener una superficie lisa y uniforme.",
      "Porcionar: spaguetti 110 g | garganelli, sopresinni, barchette 120 g.",
    ],
    rendimiento: "4,2 kg de masa",
  },
  {
    id: "c2",
    nombre: "BBQ Coreana",
    categoria: "Salsas",
    ingredientes: [
      { nombre: "Salsa de soja light", cantidad: 440, unidad: "g", grupo: "Grupo A" },
      { nombre: "Agua", cantidad: 440, unidad: "g", grupo: "Grupo A" },
      { nombre: "Azúcar rubia", cantidad: 292, unidad: "g", grupo: "Grupo A" },
      { nombre: "Vinagre de arroz", cantidad: 84, unidad: "g", grupo: "Grupo A" },
      { nombre: "Chipotles", cantidad: 80, unidad: "g", grupo: "Grupo A" },
      { nombre: "Pimienta blanca", cantidad: 10, unidad: "g", grupo: "Grupo A" },
      { nombre: "Ajo rallado", cantidad: 8, unidad: "dientes", grupo: "Grupo A" },
      { nombre: "Jengibre rallado", cantidad: 60, unidad: "g", grupo: "Grupo A" },
      { nombre: "Maizena", cantidad: 30, unidad: "g", grupo: "Grupo B" },
      { nombre: "Agua", cantidad: 30, unidad: "g", grupo: "Grupo B" },
    ],
    instrucciones: [
      "Poner el Grupo A en olla y cocinar a fuego bajo hasta que se disuelva el azúcar.",
      "Retirar del fuego, licuar y tamizar.",
      "Desligar la maizena con el agua (Grupo B) y agregar a la preparación. Volver a llevar a hervor.",
    ],
  },
]

export const categoriasCocina = [
  "Masas",
  "Salsas",
  "Otros",
]

// Categorías de notas
export const categoriasNotas = [
  "Conversiones",
  "Tips",
  "Técnicas",
  "Temperaturas",
  "Otros"
]
