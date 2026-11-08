import type { ContentTable } from "./types";

export const blogSistemaMedidaContent: ContentTable = {
  es: {
    eyebrow: "Guía",
    h1: "Excel, software listo o sistema a medida: cómo decidir",
    lead: [
      "Todo negocio que crece llega al mismo punto: la hoja de cálculo que funcionaba con 50 productos o 20 clientes empieza a fallar. Los números no cuadran, dos personas editan el mismo archivo y nadie sabe cuál es la versión buena.",
      "En ese momento hay tres caminos: arreglar la hoja de cálculo, contratar un software ya hecho o construir un sistema a medida. Grolow construye sistemas a medida, y aun así este artículo empieza explicando cuándo no lo necesitas.",
    ],
    sections: [
      {
        h2: "Cuándo la hoja de cálculo todavía sirve",
        body: [
          "Si una sola persona la usa, los datos cambian poco y un error no te cuesta dinero, Excel o Google Sheets siguen siendo una buena herramienta. Son gratis o casi, todo el mundo sabe usarlas y se adaptan a cualquier cosa.",
          "Antes de cambiar de herramienta, a veces basta con ordenarla: una pestaña por tipo de dato, validaciones para que nadie escriba texto donde va un número y una sola copia compartida en lugar de archivos que viajan por WhatsApp.",
        ],
      },
      {
        h2: "Las señales de que ya no alcanza",
        bullets: [
          {
            title: "Varias personas necesitan los mismos datos a la vez",
            text: "Y cada una termina con su propia versión.",
          },
          {
            title: "Los errores ya cuestan dinero",
            text: "Vendes algo que no tienes, cobras un precio viejo o pierdes la cita de un cliente.",
          },
          {
            title: "Repites el mismo trabajo cada día",
            text: "Copiar pedidos de WhatsApp a la hoja, de la hoja a la factura y de la factura al reporte.",
          },
          {
            title: "Solo una persona entiende el archivo",
            text: "Y si esa persona falta, el negocio se detiene.",
          },
        ],
      },
      {
        h2: "Cuándo te conviene un software listo",
        body: [
          "Si tu necesidad es la de muchos negocios — facturar, llevar inventario, la contabilidad —, ya existen programas que lo resuelven por una suscripción mensual. En República Dominicana hay opciones locales e internacionales, como Alegra, y varias incluyen la integración con la DGII para la facturación electrónica.",
          "Para facturación en particular, esa integración es una razón de peso para usar algo listo: mantenerla al día con las reglas fiscales es un trabajo continuo que el proveedor ya hace por ti.",
          "Las ventajas: empiezas en días, el costo es predecible y el proveedor se encarga de las actualizaciones. La contra: te adaptas tú al programa. Si tu negocio funciona como el de la mayoría, no es un problema.",
        ],
      },
      {
        h2: "Cuándo te conviene un sistema a medida",
        body: [
          "Cuando lo que te hace diferente es justamente cómo trabajas, y el software listo te obliga a dejar de hacerlo así. Algunos ejemplos típicos:",
        ],
        bullets: [
          {
            title: "Tu proceso no existe en los programas comunes",
            text: "Una red de distribuidoras que se reparte por zonas, cotizaciones por medidas, reservas con reglas propias, una liga o una academia con su propia forma de inscribir y cobrar.",
          },
          {
            title: "Necesitas juntar varias herramientas en una",
            text: "Pagas tres suscripciones que no se hablan entre sí y alguien copia datos de una a otra a mano.",
          },
          {
            title: "Tus clientes tienen que usarlo",
            text: "Un portal donde el cliente hace su pedido, ve su historial o reserva, con tu marca y tu dominio.",
          },
          {
            title: "Quieres que el sistema sea tuyo",
            text: "El código y los datos a tu nombre, sin depender de que un proveedor de software suba el precio o cierre.",
          },
        ],
      },
      {
        h2: "Cuánto cuesta un sistema a medida",
        body: [
          "Es una de las preguntas que más se le hacen a Google, y la respuesta honesta es que depende del alcance. Lo que sí puede explicarse es cómo se calcula, para que puedas comparar presupuestos.",
          "Grolow estima las horas de trabajo que lleva el sistema, les suma el costo de la infraestructura de los primeros meses y el de los colaboradores que intervienen, y no baja nunca de una tarifa mínima. El resultado es un precio cerrado, por escrito, con lo que incluye y lo que no. Después, una mensualidad cubre servidores, base de datos, respaldos, seguridad y cambios.",
          "Al comparar con un software listo, compara a dos o tres años, no al primer mes: la suscripción se paga siempre, y el sistema a medida tiene un costo inicial más alto y una mensualidad de mantenimiento.",
        ],
      },
      {
        h2: "Las preguntas que te ahorran un mal proyecto",
        bullets: [
          {
            title: "¿Qué tiene que hacer el sistema, en una lista?",
            text: "Si no lo puedes escribir en diez líneas, todavía no estás listo para cotizar. Grolow te ayuda a llegar a esa lista por mensaje.",
          },
          {
            title: "¿Ya probaste un software listo?",
            text: "Si no lo has intentado, pruébalo primero. Lo que no te funcione de él es la mejor especificación para un sistema a medida.",
          },
          {
            title: "¿Quién lo va a mantener?",
            text: "Un sistema a medida sin nadie que lo mantenga envejece mal. Con Grolow, el mantenimiento está incluido en la mensualidad.",
          },
          {
            title: "¿De quién van a ser el código y los datos?",
            text: "Pídelo por escrito. Con Grolow son tuyos desde el pago final.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "¿Grolow puede integrar mi sistema con el software de facturación que ya uso?",
        a: "Depende de si ese software permite conectarse desde fuera. Se revisa caso por caso y se dice por escrito en la propuesta.",
      },
      {
        q: "¿Cuánto tarda un sistema a medida?",
        a: "Depende del alcance. Grolow da el plazo por escrito en la propuesta, junto con el precio cerrado.",
      },
      {
        q: "¿Y si después necesito cambiar algo del sistema?",
        a: "Los ajustes de los primeros 90 días están incluidos. Después, la corrección de errores de Grolow y los cambios de contenido incluidos entran en la mensualidad, y las funciones nuevas se cotizan aparte, siempre antes de hacerlas.",
      },
    ],
    related: [
      { to: "blogMensualidad", label: "Qué cubre la mensualidad de Grolow" },
      { to: "blogCatalogoTienda", label: "Catálogo digital o tienda online" },
      { to: "casoHellens", label: "Caso Hellen's Cute Kids: distribuidoras por zona" },
    ],
    cta: {
      heading: "¿Tu hoja de cálculo ya no da más?",
      text: "Cuéntale a Grolow qué haces hoy a mano. Te responde si te conviene un software listo o un sistema a medida, y por qué.",
      label: "Escribir por WhatsApp",
      message: "Hola, leí sobre Excel, software listo o a medida. Hoy manejo mi negocio así:",
    },
  },
};
