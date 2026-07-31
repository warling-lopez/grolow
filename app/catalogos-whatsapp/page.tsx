import NicheLanding, {
  type NicheLandingConfig,
} from "@/app/components/landing/NicheLanding";

/** Mensaje precargado: el cliente sustituye [producto] y ya está escribiendo. */
const WHATSAPP_HREF =
  "https://wa.me/18299946354?text=" +
  encodeURIComponent(
    "Hola, vendo [producto] y quiero mi catálogo con pedidos por WhatsApp"
  );

const config: NicheLandingConfig = {
  hero: {
    eyebrow: "PEDIDOS ORDENADOS, NO CHATS PERDIDOS",
    title: (
      <>
        Tu catálogo completo{" "}
        <span className="text-transparent bg-clip-text bg-linear-to-r from-grolow-cream to-grolow-accent italic">
          en un enlace.
        </span>{" "}
        Los pedidos, directo a tu WhatsApp.
      </>
    ),
    subtitle: (
      <>
        Deja de mandar fotos sueltas y de perder pedidos entre conversaciones.{" "}
        <span className="text-grolow-light font-medium">
          Tus clientes ven todo tu inventario, eligen y te escriben con el
          pedido ya armado
        </span>
        . Sin comisiones por venta. Listo en 72 horas.
      </>
    ),
    // El botón nombra lo que la persona quiere, no lo que yo hago.
    ctas: [
      { label: "Quiero mi catálogo", href: "#contacto", variant: "solid" },
      {
        label: "Ver catálogos que ya funcionan",
        href: "#casos",
        variant: "outline",
      },
    ],
  },

  pains: [
    {
      title: "Mandas fotos una por una",
      body: "Cada cliente que pregunta “¿qué tienes?” te cuesta diez minutos de fotos y precios repetidos. Multiplícalo por los que preguntan al día.",
    },
    {
      title: "Los pedidos se pierden en el chat",
      body: "El pedido se arma a lo largo de una conversación: un producto arriba, la cantidad más abajo, la dirección en otro mensaje. Algo siempre se escapa.",
    },
    {
      title: "Tu feed entierra los productos",
      body: "En Instagram lo que publicaste hace dos semanas ya no existe. Un catálogo no baja: está siempre completo y en el mismo enlace.",
    },
  ],

  steps: [
    {
      num: "01",
      title: "Hablamos 20 minutos",
      body: "Me dices qué vendes, cómo te llegan hoy los pedidos y dónde se te va el tiempo. Salgo de ahí con una propuesta clara y un precio cerrado. Gratis.",
    },
    {
      num: "02",
      title: "Monto tu catálogo",
      body: "Subo tus productos con fotos, precios y categorías, con la identidad de tu marca. Te muestro cómo va antes de publicar nada.",
    },
    {
      num: "03",
      title: "Lo pones en tu bio",
      body: "Queda un enlace que va en tu bio de Instagram y en tu estado de WhatsApp. El cliente elige y el pedido te llega armado.",
    },
  ],

  projects: {
    only: ["laperfum", "aromacaribenio", "deliscias-marijo", "hellenscute"],
    eyebrow: "Catálogos en funcionamiento",
    heading: (
      <>
        Catálogos que ya
        <br />
        <span className="text-grolow-light/30">reciben pedidos.</span>
      </>
    ),
  },

  midCta: {
    text: "Tu inventario completo en un enlace, listo en 72 horas. Desde $190 y $40 al mes, con dominio y hosting incluidos.",
    label: "Pedir mi propuesta gratis",
    href: "#contacto",
  },

  pricing: {
    headline: "Cuánto cuesta",
    setup: "Setup US$190 + US$40 al mes",
    note: "La mayoría elige el plan mensual porque nunca tiene que preocuparse por subir un producto nuevo ni por renovar nada.",
    bullets: [
      "Tu catálogo completo, hecho a medida y con tu marca",
      "Dominio y hosting incluidos, no pagas nada aparte",
      "Cambios ilimitados de productos, precios y fotos: me escribes por WhatsApp y yo lo hago",
      "Pedidos directos a tu WhatsApp, sin comisiones por venta",
      "Respaldos y monitoreo",
      "Permanencia mínima de 12 meses",
    ],
  },

  faqs: [
    {
      q: "¿Y si mi negocio es pequeño?",
      a: "La mayoría de mis clientes lo son. US$40 al mes es menos de lo que muchos gastan en un solo día de anuncios, y esto trabaja los 30 días.",
    },
    {
      q: "¿Me cobran comisión por cada venta?",
      a: "No. El pedido va directo de tu catálogo a tu WhatsApp: no hay pasarela en medio ni nadie que se quede un porcentaje. Cobras como cobras hoy.",
    },
    {
      q: "¿Qué necesito para poder empezar?",
      a: "Fotos de tus productos y saber qué quieres lograr. Si no tienes logo ni colores definidos, no es un problema — lo resolvemos en la primera llamada.",
    },
    {
      q: "¿Quién sube los productos nuevos?",
      a: "Yo. Me escribes por WhatsApp con la foto y el precio, y lo subo. Eso va incluido en el plan mensual, sin límite de cambios.",
    },
    {
      q: "¿Cuánto tarda?",
      a: "72 horas desde que tengo tus fotos y tus precios. Si tu catálogo es muy grande te lo digo en la primera llamada, antes de que pagues nada.",
    },
    {
      q: "¿El catálogo es mío?",
      a: "El contenido y tu marca son tuyos siempre. En el plan mensual yo mantengo el dominio y el hosting mientras el plan esté activo; si algún día quieres llevártelo todo, se puede coordinar el traspaso.",
    },
  ],

  finalCta: {
    text: "Escríbeme y dime qué vendes. Te digo en menos de 24 horas cómo quedaría tu catálogo y cuánto cuesta. Sin compromiso.",
    label: "Escribirme por WhatsApp",
    href: WHATSAPP_HREF,
  },
};

export default function CatalogosWhatsappPage() {
  return <NicheLanding config={config} />;
}
