import type { Lang, RouteId } from "@/app/lib/i18n";

/**
 * Title y description por ruta e idioma.
 *
 * Reglas que verifica `npm run seo:check` contra el HTML servido:
 *  - title entre 50 y 60 caracteres
 *  - description entre 140 y 160 caracteres
 *  - ambos únicos en todo el sitio
 *
 * Sin `keywords`: Google la ignora desde 2009 y Bing la trata como señal de
 * spam. La etiqueta se eliminó del sitio por completo.
 */
export type SeoEntry = { title: string; description: string };

type SeoTable = Partial<Record<Lang, SeoEntry>>;

export const SEO: Record<RouteId, SeoTable> = {
  home: {
    es: {
      title: "Estudio de diseño y desarrollo web a medida | Grolow",
      description:
        "Estudio de desarrollo web en Santo Domingo. Programamos en código propio, sin WordPress ni plantillas, para empresas, consultoras y creadores.",
    },
    en: {
      title: "Custom Web Design and Development in the DR | Grolow",
      description:
        "Web development studio in Santo Domingo, Dominican Republic. We write custom code, no WordPress and no templates, for companies and consultants.",
    },
  },

  servicios: {
    es: {
      title: "Servicios de diseño y desarrollo web a medida | Grolow",
      description:
        "Sitios a medida, tiendas con pedidos por WhatsApp, landings de conversión y sistemas internos. Programados desde cero, no montados sobre plantillas.",
    },
    en: {
      title: "Web Development and Design Services in the DR | Grolow",
      description:
        "Custom sites, WhatsApp ordering stores, conversion landing pages and internal systems. Written from scratch, not assembled on top of a template.",
    },
  },

  desarrolloWeb: {
    es: {
      title: "Desarrollo web a medida en República Dominicana | Grolow",
      description:
        "Escribimos el código de tu sitio en vez de montarlo sobre una plantilla. Más rápido, más seguro y sin los límites de lo que un tema comprado permita.",
    },
    en: {
      title: "Custom Web Development in the Dominican Republic | Grolow",
      description:
        "We write your site's code instead of assembling it on a template. Faster, safer, and without the limits of whatever a purchased theme happens to allow.",
    },
  },

  disenoWeb: {
    es: {
      title: "Diseño web en Santo Domingo — Estudio a medida | Grolow",
      description:
        "Estudio de diseño web en Santo Domingo. Diseñamos y programamos nosotros mismos, así que lo que apruebas es exactamente lo que termina publicado.",
    },
    en: {
      title: "Web Design in Santo Domingo — Custom Studio | Grolow",
      description:
        "Web design studio in Santo Domingo. We design and code it ourselves, so what you approve is exactly what gets published, with nothing trimmed to fit.",
    },
  },

  software: {
    es: {
      title: "Software a medida y sistemas internos en RD | Grolow",
      description:
        "Paneles internos, reservas, inventario e integraciones para negocios que ya crecieron por encima de lo que aguanta una hoja de cálculo compartida.",
    },
    en: {
      title: "Custom Software and Internal Systems in the DR | Grolow",
      description:
        "Internal dashboards, bookings, inventory and integrations for businesses that have outgrown what a shared spreadsheet can reasonably hold together.",
    },
  },

  tiendaWhatsapp: {
    es: {
      title: "Tienda en línea con pedidos directo a WhatsApp | Grolow",
      description:
        "Tu catálogo completo en un enlace para la bio de Instagram. El cliente elige y el pedido llega armado a tu WhatsApp. Sin comisiones por venta.",
    },
    en: {
      title: "Online Store with WhatsApp Ordering in the DR | Grolow",
      description:
        "Your full catalog in one link for your Instagram bio. Customers pick, and the order arrives on your WhatsApp already assembled. No sales commission.",
    },
  },

  apps: {
    es: {
      title: "Desarrollo de aplicaciones móviles a medida | Grolow",
      description:
        "Apps para Android y iPhone desde una sola base de código. Antes de cotizarla te decimos si de verdad la necesitas o si una web te resuelve lo mismo.",
    },
    en: {
      title: "Mobile App Development in the Dominican Republic | Grolow",
      description:
        "Apps for Android and iPhone from a single codebase. Before quoting we tell you whether you really need one, or whether mobile web solves the same thing.",
    },
  },

  empresas: {
    es: {
      title: "Páginas web para empresas en República Dominicana | Grolow",
      description:
        "Sitios para empresas con operación y equipo, cuyo sitio actual se quedó atrás. Una página por línea de negocio y contacto que llega a quien debe.",
    },
    en: {
      title: "Websites for Mid-Sized Companies in the DR | Grolow",
      description:
        "Sites for companies with a real operation whose current site has fallen behind. One page per line of business, and contact that reaches the right person.",
    },
  },

  consultores: {
    es: {
      title: "Páginas web para consultores y consultoras | Grolow",
      description:
        "Sitios para quien vende criterio: abogados, contadores, coaches y asesores. Una página por problema que resuelves, no por servicio que ofreces.",
    },
    en: {
      title: "Websites for Consultants and Professionals | Grolow",
      description:
        "Sites for people who sell judgment: lawyers, accountants, coaches and advisors. One page per problem you solve, not per service you happen to offer.",
    },
  },

  creadores: {
    es: {
      title: "Páginas web para creadores que ya monetizan | Grolow",
      description:
        "Para creadores con cursos, membresías o productos digitales. Cuando el dinero ya pasa por tu enlace en bio, esa herramienta se te queda corta.",
    },
    en: {
      title: "Websites for Content Creators Who Monetize | Grolow",
      description:
        "For creators with courses, memberships or digital products. Once money flows through your link in bio, that tool starts costing you more than it saves.",
    },
  },

  precios: {
    es: {
      title: "Cuánto cuesta una página web en RD | Precios Grolow",
      description:
        "Los rangos reales del mercado dominicano y lo que cobramos nosotros, con las señales de alerta que conviene mirar antes de comparar cotizaciones.",
    },
    en: {
      title: "What a Website Costs in the Dominican Republic | Grolow",
      description:
        "The real ranges in the Dominican market and what we charge, plus the warning signs worth checking before you compare quotes from anyone else.",
    },
  },

  casos: {
    es: {
      title: "Casos de éxito — Proyectos web reales en RD | Grolow",
      description:
        "Tres proyectos en línea que puedes abrir y revisar. Con qué llegó el cliente, qué construimos y qué cambió. Sin porcentajes que nadie ha medido.",
    },
    en: {
      title: "Case Studies — Real Web Projects in the DR | Grolow",
      description:
        "Three live projects you can open and inspect. What the client arrived with, what we built and what changed. No percentages nobody actually measured.",
    },
  },

  casoLaperfum: {
    es: {
      title: "La Perfurm RD — Tienda en línea con WhatsApp | Grolow",
      description:
        "Cómo pasó de un catálogo de perfumes repartido entre publicaciones y conversaciones a un solo enlace con los pedidos llegando ya armados a WhatsApp.",
    },
    en: {
      title: "La Perfurm RD — Online Store with WhatsApp | Grolow",
      description:
        "How a perfume catalog scattered across posts and conversations became a single link, with orders arriving on WhatsApp already put together and priced.",
    },
  },

  casoHellens: {
    es: {
      title: "Hellen's Cute Kids — Landing de conversión | Grolow",
      description:
        "Una red de distribuidoras de ropa infantil sin forma de repartir clientes. Hoy cada visitante llega solo a la distribuidora que le toca por zona.",
    },
    en: {
      title: "Hellen's Cute Kids — Zone-Based Landing Page | Grolow",
      description:
        "A children's clothing distributor network with no way to route customers. Today every visitor reaches the distributor for their zone automatically.",
    },
  },

  casoWarling: {
    es: {
      title: "Warling Dev — Sitio profesional de servicios | Grolow",
      description:
        "Un sitio que carga en menos de dos segundos y explica servicios y proceso, para dejar de repetir lo mismo en cada conversación con un cliente nuevo.",
    },
    en: {
      title: "Warling Dev — A Professional Services Site | Grolow",
      description:
        "A site that loads in under two seconds and explains services and process, so the same things stop being repeated in every conversation with a client.",
    },
  },

  contacto: {
    es: {
      title: "Contacto — Solicita tu propuesta sin costo | Grolow",
      description:
        "Cuéntanos qué necesitas y te devolvemos alcance, inversión y fecha en menos de 24 horas. Si no somos la opción correcta, también te lo decimos.",
    },
    en: {
      title: "Contact — Request a Free Project Proposal | Grolow",
      description:
        "Tell us what you need and we'll send back scope, investment and a date within 24 hours. If we're not the right fit, we'll tell you that as well.",
    },
  },

  blog: {
    es: {
      title: "Blog sobre desarrollo web en Rep. Dominicana | Grolow",
      description:
        "Artículos sobre las decisiones previas a contratar: cuánto cuesta un sitio de verdad, qué tecnología conviene y cómo leer una cotización sin dudas.",
    },
  },

  blogPrecios: {
    es: {
      title: "¿Cuánto cuesta una página web en RD en 2026? | Grolow",
      description:
        "Los rangos reales del mercado dominicano, qué compra cada uno, los costos que no salen en la cotización y las señales de alerta al comparar propuestas.",
    },
  },

  blogWordpress: {
    es: {
      title: "WordPress o código a medida: cuál te conviene | Grolow",
      description:
        "Comparación honesta, con declaración de interés incluida: cuándo WordPress es la decisión correcta y cuándo el desarrollo a medida se justifica de verdad.",
    },
  },

  // ── Sin indexar: no las revisa el verificador de longitudes ────────────
  privacidad: {
    es: {
      title: "Política de privacidad | Grolow",
      description:
        "Qué datos recogemos en grolow.com, para qué los usamos, con qué proveedores se comparten y cómo ejercer tus derechos sobre ellos.",
    },
    en: {
      title: "Privacy policy | Grolow",
      description:
        "What data we collect on grolow.com, what we use it for, which providers process it and how to exercise your rights over it.",
    },
  },

  cookies: {
    es: {
      title: "Política de cookies | Grolow",
      description:
        "Qué cookies usa grolow.com, para qué sirven y cómo desactivarlas. Sin cookies publicitarias ni de remarketing.",
    },
    en: {
      title: "Cookie policy | Grolow",
      description:
        "Which cookies grolow.com uses, what they do and how to turn them off. No advertising or remarketing cookies.",
    },
  },

  terminos: {
    es: {
      title: "Términos y condiciones | Grolow",
      description:
        "Condiciones de uso del sitio y de contratación: cotizaciones, pagos, plazos, propiedad del trabajo entregado y ley aplicable.",
    },
    en: {
      title: "Terms and conditions | Grolow",
      description:
        "Terms for using the site and contracting our services: quotes, payment, timelines, ownership of delivered work and governing law.",
    },
  },

  clinicas: {
    es: {
      title: "Webs para clínicas con citas en línea | Grolow",
      description:
        "Tus pacientes agendan solos, a cualquier hora, sin ocupar a tu recepcionista. Recordatorios automáticos para que no falten a la cita.",
    },
  },

  gracias: {
    es: {
      title: "Solicitud recibida | Grolow",
      description:
        "Recibimos tu solicitud. Te contactamos en menos de 24 horas con una propuesta clara: alcance, inversión y tiempos de entrega.",
    },
    en: {
      title: "Request received | Grolow",
      description:
        "We got your request. We will reach out within 24 hours with a clear proposal: scope, investment and delivery timeline.",
    },
  },
};

export function seoFor(id: RouteId, lang: Lang): SeoEntry | null {
  return SEO[id][lang] ?? null;
}
