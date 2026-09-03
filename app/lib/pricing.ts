import type { Lang } from "@/app/lib/i18n";

/**
 * Tabla de precios: fuente única.
 *
 * De aquí salen la página de precios, la sección de planes de la portada, las
 * opciones de presupuesto del formulario, el `priceRange` del negocio y los
 * `Offer` de los datos estructurados. Tenerlo en un solo sitio es lo que evita
 * que la web diga un número y el schema otro — que es el fallo que Google marca
 * como datos estructurados engañosos.
 *
 * El precio se cotiza por tipo de proyecto, no por plan de suscripción: lo que
 * mueve el número es el alcance, no la forma de pago.
 */

export type Tier = {
  id: string;
  name: Record<Lang, string>;
  /** Qué es, en una frase. */
  what: Record<Lang, string>;
  /** De qué depende que caiga en la parte baja o alta del rango. */
  depends: Record<Lang, string>;
  /** Rango en dólares. Ausente en lo que se cotiza por proyecto. */
  min?: number;
  max?: number;
  /** Tarifa por hora, para el trabajo que se mide en tiempo. */
  hourly?: number;
  /** `true` cuando no hay número publicable y se cotiza por fases. */
  perProject?: boolean;
};

export const TIERS: Tier[] = [
  {
    id: "landing",
    name: { es: "Landing page", en: "Landing page" },
    what: {
      es: "Una sola página construida para que el visitante haga una acción concreta.",
      en: "A single page built so the visitor takes one concrete action.",
    },
    depends: {
      es: "Sube según lo que lleve integrado: WhatsApp, chatbot, formularios y automatismos de contacto.",
      en: "It rises with what's integrated: WhatsApp, chatbot, forms and contact automations.",
    },
    min: 250,
    max: 450,
  },
  {
    id: "corporativo",
    name: { es: "Sitio web corporativo", en: "Corporate website" },
    what: {
      es: "Varias páginas con tus servicios, tu equipo y tus vías de contacto.",
      en: "Several pages covering your services, your team and your contact routes.",
    },
    depends: {
      es: "Sube según la cantidad de páginas y las integraciones que necesite con lo que ya usas.",
      en: "It rises with the number of pages and the integrations it needs with what you already use.",
    },
    min: 450,
    max: 800,
  },
  {
    id: "tienda",
    name: { es: "Tienda en línea", en: "Online store" },
    what: {
      es: "Catálogo navegable con pedidos, sea por WhatsApp o con cobro en línea.",
      en: "A browsable catalog with ordering, whether over WhatsApp or with online payment.",
    },
    depends: {
      es: "Sube según la cantidad de páginas y el tamaño del inventario: no es lo mismo de 20 a 50 productos que de 50 a 150, o más de 500.",
      en: "It rises with the number of pages and inventory size: 20–50 products is not the same as 50–150, or more than 500.",
    },
    min: 800,
    max: 1500,
  },
  {
    id: "automatizacion",
    name: {
      es: "Automatizaciones, IA y canales de comunicación",
      en: "Automations, AI and communication channels",
    },
    what: {
      es: "Procesos que hoy haces a mano, asistentes con IA, email marketing y conexión entre las herramientas que ya usas.",
      en: "Processes you run by hand today, AI assistants, email marketing and connecting the tools you already use.",
    },
    depends: {
      es: "Se cobra por hora porque el alcance real solo se conoce al abrir el proceso: se estima antes de empezar y se factura lo trabajado.",
      en: "Billed hourly because the real scope only shows once the process is opened: estimated up front, invoiced for time worked.",
    },
    hourly: 25,
  },
  {
    id: "producto",
    name: {
      es: "Aplicación móvil, web app, SaaS y sistemas a medida",
      en: "Mobile apps, web apps, SaaS and custom systems",
    },
    what: {
      es: "Producto propio: varios roles, base de datos, sesiones y una operación completa por detrás.",
      en: "A product of your own: several roles, a database, sessions and a full operation behind it.",
    },
    depends: {
      es: "Son proyectos largos, así que se dividen en fases y cada fase se cotiza y se cobra por separado, con su alcance cerrado.",
      en: "These are long projects, so they're split into phases; each phase is quoted and invoiced separately with its own closed scope.",
    },
    perProject: true,
  },
];

/** Precio formateado para mostrar, p. ej. `US$250 – US$450` o `US$25/hora`. */
export function priceLabel(tier: Tier, lang: Lang): string {
  if (tier.hourly) {
    return lang === "es" ? `US$${tier.hourly}/hora` : `US$${tier.hourly}/hour`;
  }
  if (tier.perProject) {
    return lang === "es" ? "Por proyecto, en fases" : "Per project, in phases";
  }
  return `US$${tier.min} – US$${tier.max}`;
}

/** Rango del negocio completo, para `priceRange` del schema local. */
export function businessPriceRange(): string {
  const withRange = TIERS.filter((t) => t.min !== undefined);
  const low = Math.min(...withRange.map((t) => t.min!));
  const high = Math.max(...withRange.map((t) => t.max!));
  return `US$${low}–US$${high}`;
}
