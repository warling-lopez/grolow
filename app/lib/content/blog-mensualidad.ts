import type { ContentTable } from "./types";

export const blogMensualidadContent: ContentTable = {
  es: {
    eyebrow: "Sobre Grolow",
    h1: "Qué cubre la mensualidad de Grolow, punto por punto",
    lead: [
      "Todo proyecto de Grolow termina en una mensualidad. No es un cargo escondido: es la mitad del servicio. Grolow construye el software y después lo mantiene funcionando, y la mensualidad es lo que paga esa segunda parte.",
      "Este artículo explica qué entra, qué no entra, cuánto cuesta y por qué se paga aunque parezca que «no pasa nada». Es la misma información que Grolow entrega por escrito antes de que firmes.",
    ],
    sections: [
      {
        h2: "La respuesta corta",
        body: [
          "La mensualidad cubre todo lo técnico para que el sistema siga en línea, seguro y al día: servidores, base de datos, dominio, certificados de seguridad, copias de respaldo, monitoreo, actualizaciones y una cantidad fija de cambios de contenido al mes. Empieza en US$45 al mes, y en páginas web empresariales también se puede pagar en pesos, RD$2,500 al mes.",
          "Lo que no cubre son funciones nuevas, rediseños, contenido, redes sociales ni publicidad. Eso se cotiza aparte, y se dice antes, no cuando ya lo pediste.",
        ],
      },
      {
        h2: "Qué incluye",
        bullets: [
          {
            title: "Infraestructura",
            text: "El hosting donde vive el sistema y la base de datos donde están tus productos, clientes o pedidos. Grolow los contrata, los paga y los administra.",
          },
          {
            title: "Renovación del dominio",
            text: "Tu dominio, registrado a tu nombre, se renueva cada año sin que tengas que acordarte. Es una de las causas más comunes de sitios que «desaparecen» en el país.",
          },
          {
            title: "Copias de respaldo diarias",
            text: "Automáticas, todos los días, y con pruebas de restauración periódicas. Un respaldo que nunca se probó no sirve el día que hace falta.",
          },
          {
            title: "Monitoreo de caídas",
            text: "Si el sistema deja de responder, Grolow se entera, en lugar de enterarse por un cliente tuyo.",
          },
          {
            title: "Seguridad y certificados",
            text: "Actualizaciones de seguridad, el certificado HTTPS que pone el candado en el navegador y las correcciones que hagan falta cuando aparece una vulnerabilidad.",
          },
          {
            title: "Cambios de los proveedores",
            text: "Las plataformas de las que depende tu sistema cambian versiones y reglas. Adaptarse a esos cambios para que el sistema siga funcionando entra en la mensualidad.",
          },
          {
            title: "Cambios de contenido",
            text: "Textos, imágenes, horarios o datos de contacto que no puedas cambiar tú desde tu panel: uno al mes en el Catálogo Digital y tres en el Ecommerce. Los productos y los precios los administras tú desde el panel, cuando quieras.",
          },
          {
            title: "Corrección de errores",
            text: "Si algo falla por un error de Grolow, se corrige sin costo mientras la mensualidad esté activa.",
          },
        ],
      },
      {
        h2: "Qué no incluye",
        body: [
          "Funciones nuevas, rediseños, creación de textos o fotografía, manejo de redes sociales, campañas publicitarias, soporte a programas de terceros que Grolow no instaló y la recuperación de datos que se perdieron por algo que hizo el cliente.",
          "Todo eso se cotiza aparte, por hora o por proyecto. Lo importante es que la lista existe y la tienes antes de firmar: no te enteras de que algo «no entraba» cuando ya lo pediste.",
        ],
      },
      {
        h2: "Cuánto cuesta",
        bullets: [
          {
            title: "Página web empresarial",
            text: "US$45 al mes, o RD$2,500 al mes en moneda local. Incluye hosting, dominio y mantenimiento.",
          },
          {
            title: "Catálogo Digital",
            text: "US$45 al mes.",
          },
          {
            title: "Ecommerce Completo",
            text: "Desde US$80 al mes, según el volumen y las integraciones. Incluye además un reporte mensual.",
          },
          {
            title: "Sistemas a medida",
            text: "Se calcula según la infraestructura que use el sistema y va escrita en la propuesta.",
          },
        ],
      },
      {
        h2: "Cómo se cobra y cómo se cancela",
        body: [
          "Se cobra el día 1 de cada mes, por adelantado, desde la entrega del proyecto, por transferencia local, PayPal o Stripe.",
          "No hay contrato de permanencia. Puedes cancelar cuando quieras con 30 días de aviso por escrito, sin penalidad. Al cancelar, Grolow te entrega todo lo tuyo — base de datos, código, credenciales y el dominio — sin costo.",
          "Si la mensualidad se atrasa más de 30 días, Grolow avisa por escrito. A los 45 días te entrega todos los activos y deja de cubrir la infraestructura. Pero nunca borra tus datos sin haberte entregado antes la exportación completa.",
        ],
      },
      {
        h2: "Por qué se paga aunque no pase nada",
        body: [
          "Es la objeción más razonable, y merece una respuesta honesta. Los primeros dos o tres meses después de publicar concentran casi todos los problemas; esos ajustes ya están incluidos en el precio del proyecto. Después el sistema se estabiliza y el trabajo se vuelve preventivo.",
          "Que no pase nada es el resultado de ese trabajo. En octubre de 2026, por ejemplo, una vulnerabilidad crítica en PHP obligó a miles de sitios en el mundo a actualizarse de urgencia, y una certificadora tuvo que retirar certificados de los que dependían servidores en todas partes. Los sitios que tenían a alguien ocupándose de eso no se enteraron. Los que no, sí.",
          "Pagar la mensualidad es pagar para no tener que enterarte.",
        ],
      },
      {
        h2: "Cómo comparar con otras ofertas de mantenimiento",
        body: [
          "En República Dominicana hay mantenimiento de todo tipo: desde «primer año gratis» hasta planes mensuales que solo actualizan plugins de WordPress. Para comparar de verdad, haz estas cuatro preguntas a cualquiera, incluida Grolow:",
        ],
        bullets: [
          {
            title: "¿Qué incluye exactamente, por escrito?",
            text: "Si la respuesta es «todo lo que necesites», no incluye nada concreto.",
          },
          {
            title: "¿El dominio está a mi nombre?",
            text: "Si está a nombre del proveedor, el mantenimiento es también una forma de retenerte.",
          },
          {
            title: "¿Qué pasa si dejo de pagar?",
            text: "¿Se apaga el sitio y se pierde todo, o te entregan tus datos?",
          },
          {
            title: "¿Quién responde si algo falla y en cuánto tiempo?",
            text: "Pide el tiempo de respuesta por escrito, no un «te atendemos rápido».",
          },
        ],
      },
    ],
    faq: [
      {
        q: "¿Puedo contratar un proyecto con Grolow sin mensualidad?",
        a: "La forma de trabajar de Grolow es construir y operar, así que los proyectos terminan en mensualidad. Si prefieres administrarlo tú, conviene decirlo al principio para ver si encaja.",
      },
      {
        q: "¿La mensualidad sube con el tiempo?",
        a: "No sin aviso. Si el uso de un sistema supera lo normal en tráfico o volumen de datos, Grolow avisa antes y la mensualidad se ajusta de común acuerdo.",
      },
      {
        q: "¿Puedo pagar en pesos dominicanos?",
        a: "Sí. Los clientes locales pagan en pesos; la página web empresarial tiene además una mensualidad fija en pesos, de RD$2,500.",
      },
    ],
    related: [
      { to: "blogPropiedad", label: "De quién es tu dominio, tu código y tus datos" },
      { to: "blogSemanaNegra", label: "La semana negra de los servidores web de octubre de 2026" },
      { to: "blogQueEsGrolow", label: "Qué es Grolow y qué hace" },
    ],
    cta: {
      heading: "¿Quieres ver la lista completa para tu caso?",
      text: "Escríbele a Grolow qué necesitas y recibes por escrito qué cubriría tu mensualidad y cuánto costaría.",
      label: "Escribir por WhatsApp",
      message: "Hola, leí qué cubre la mensualidad de Grolow y quiero saber cómo sería en mi caso:",
    },
  },
};
