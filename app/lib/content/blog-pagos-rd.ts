import type { ContentTable } from "./types";

export const blogPagosRdContent: ContentTable = {
  es: {
    eyebrow: "Guía · República Dominicana",
    h1: "Cómo cobrar con tarjeta en tu web en República Dominicana",
    lead: [
      "Cobrar con tarjeta en tu página web en República Dominicana es posible, pero no es tan inmediato como en otros países. Hay que abrir una cuenta con una pasarela de pago, cumplir sus requisitos y esperar la aprobación, y no todos los negocios la necesitan.",
      "Esta guía repasa las opciones reales — pasarelas locales, enlaces de pago y PayPal —, qué te van a pedir y cómo elegir. Las comisiones y los plazos cambian, así que donde no hay una cifra confirmada, el artículo lo dice y te indica a quién preguntar.",
    ],
    sections: [
      {
        h2: "Primero: ¿de verdad necesitas cobrar en línea?",
        body: [
          "Muchos negocios en el país venden muy bien con pedidos por WhatsApp y pago por transferencia. Si tus clientes ya te conocen, compran de forma recurrente o prefieren hablar antes de pagar, la pasarela puede ser un costo que no se recupera.",
          "Necesitas cobro en línea cuando pierdes ventas por no poder cobrar en el momento: clientes que compran de noche, gente de otra provincia que no te va a transferir sin conocerte, o volumen suficiente para que confirmar pagos a mano se vuelva un trabajo. Si no estás seguro, empieza con un catálogo y pedidos por WhatsApp, y añade el cobro después.",
        ],
      },
      {
        h2: "Opción 1: una pasarela de pago integrada",
        body: [
          "Es lo que hace que el cliente ponga su tarjeta en tu página y el pago se apruebe ahí mismo. En el país, las dos grandes son Azul, operada por Servicios Digitales Popular, filial del Banco Popular, y CardNet, que trabaja con varios bancos afiliados. Hay otras opciones más recientes, como PixelPay.",
          "Las guías publicadas por empresas del sector coinciden en lo que suelen pedir:",
        ],
        bullets: [
          {
            title: "RNC activo",
            text: "Tu negocio tiene que estar registrado en la DGII. Es el requisito que más frena a negocios pequeños que venden de manera informal.",
          },
          {
            title: "Cuenta bancaria a nombre del negocio",
            text: "Es donde se liquida el dinero de las ventas. Azul suele preferir una cuenta en Banco Popular; CardNet trabaja con sus bancos afiliados.",
          },
          {
            title: "Documentos del negocio",
            text: "Para empresas, el registro mercantil vigente y los documentos de la sociedad. Para personas físicas, cédula y constancia de actividad comercial.",
          },
          {
            title: "Una página funcionando",
            text: "Con tus productos, tus datos de contacto y políticas publicadas de privacidad, devoluciones y envíos.",
          },
        ],
      },
      {
        h2: "Lo que no te van a decir en la primera página",
        bullets: [
          {
            title: "La aprobación no es inmediata",
            text: "Las guías del sector hablan de plazos que van desde unos días hábiles hasta varias semanas. Planifícalo antes de anunciar que ya cobras en línea.",
          },
          {
            title: "Las comisiones varían",
            text: "Distintas fuentes publican porcentajes distintos por transacción. Pide la tarifa por escrito a la pasarela, con todos los cargos: por transacción, mensuales y de instalación si los hay.",
          },
          {
            title: "La cuenta es tuya, no de tu desarrollador",
            text: "La cuenta con la pasarela tiene que estar a nombre de tu negocio. El dinero va directo a tu banco. Si alguien te propone cobrar a través de su cuenta, no lo aceptes.",
          },
        ],
      },
      {
        h2: "Opción 2: enlaces de pago",
        body: [
          "Si no necesitas una tienda completa, puedes cobrar con un enlace: generas un enlace por el monto, lo mandas por WhatsApp y el cliente paga con su tarjeta. Varios bancos dominicanos y las propias pasarelas ofrecen enlaces de pago, y Visa promociona en el país Clink, un servicio de cobro por enlace con tarjetas nacionales e internacionales.",
          "Es la forma más sencilla de empezar a cobrar con tarjeta sin cambiar tu página. La contra es que sigue siendo manual: alguien tiene que generar el enlace para cada pedido.",
        ],
      },
      {
        h2: "Opción 3: PayPal",
        body: [
          "PayPal funciona bien para cobrar a clientes del exterior, que ya lo tienen y confían en él. Desde 2022, según Diario Libre, los usuarios dominicanos pueden retirar el saldo a bancos del país.",
          "Para clientes locales es menos habitual: mucha gente no tiene cuenta y prefiere pagar con su tarjeta directamente. Revisa las comisiones vigentes en la página de PayPal para República Dominicana, que cambian con el tipo de pago y la moneda.",
        ],
      },
      {
        h2: "Cómo elegir",
        bullets: [
          {
            title: "Vendes poco o por encargo",
            text: "Enlaces de pago por WhatsApp. No necesitas pasarela integrada.",
          },
          {
            title: "Vendes con frecuencia dentro del país",
            text: "Pasarela local integrada en una tienda online.",
          },
          {
            title: "Vendes a clientes del exterior",
            text: "PayPal, solo o junto a la pasarela local.",
          },
          {
            title: "No tienes RNC",
            text: "Formaliza primero. Sin RNC, las pasarelas locales no son una opción, y es mejor resolverlo antes que montar una tienda que no puede cobrar.",
          },
        ],
      },
      {
        h2: "Qué hace Grolow en esta parte",
        body: [
          "En el Ecommerce Completo, Grolow conecta la tienda con la pasarela de pago y se encarga de que siga funcionando cuando la pasarela cambia algo. La cuenta con la pasarela la abres tú, a nombre de tu negocio, y Grolow te dice qué te van a pedir para que no pierdas tiempo.",
          "Si todavía no necesitas cobro en línea, el Catálogo Digital te deja recibir pedidos armados por WhatsApp y cobrar como ya lo haces. Es más barato y se puede ampliar después.",
        ],
      },
      {
        h2: "Fuentes consultadas",
        bullets: [
          {
            title: "Takum y Vendabo",
            text: "Guías publicadas en 2026 sobre requisitos, plazos y comparativas de Azul, CardNet y PixelPay.",
          },
          {
            title: "Diario Libre, 20 de octubre de 2022",
            text: "Retiros de PayPal a bancos dominicanos.",
          },
          {
            title: "Visa República Dominicana",
            text: "Servicio Clink de cobro por enlace para pequeñas y medianas empresas.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "¿Puedo cobrar con tarjeta sin tener RNC?",
        a: "Con las pasarelas locales, no: el RNC activo es uno de sus requisitos. Algunos servicios de enlaces de pago tienen requisitos distintos; consúltalos directamente.",
      },
      {
        q: "¿Cuánto cobran Azul o CardNet por transacción?",
        a: "Las cifras publicadas varían según la fuente y el tipo de negocio. Pide la tarifa completa por escrito a la pasarela antes de decidir.",
      },
      {
        q: "¿Grolow puede abrir la cuenta de la pasarela por mí?",
        a: "No, y no debería: la cuenta tiene que estar a nombre de tu negocio. Grolow te guía con los requisitos y conecta tu tienda cuando la cuenta está aprobada.",
      },
    ],
    related: [
      { to: "blogCatalogoTienda", label: "Catálogo digital o tienda online: qué necesita tu negocio" },
      { to: "blogPropiedad", label: "De quién es tu dominio, tu código y tus datos" },
      { to: "blogCertificadosRd", label: "Certificados digitales en República Dominicana" },
    ],
    cta: {
      heading: "¿Quieres saber si te conviene cobrar en línea?",
      text: "Cuéntale a Grolow cómo vendes hoy y cuánto. Te responde si te conviene una pasarela, un enlace de pago o seguir como estás.",
      label: "Escribir por WhatsApp",
      message: "Hola, leí la guía de pagos con tarjeta en RD y quiero saber qué me conviene:",
    },
  },
};
