import type { Lang, RouteId } from "@/app/lib/i18n";

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
  /** De qué depende el precio final. */
  depends: Record<Lang, string>;
  /** Precio de entrada del proyecto, en dólares. Ausente si se cotiza. */
  min?: number;
  /** Tope del rango, solo si hay uno publicado. */
  max?: number;
  /** Mensualidad de entrada en dólares: cubre la operación. */
  monthly?: number;
  /** `true` cuando el proyecto se cotiza por alcance y no hay número publicado. */
  perProject?: boolean;
};

/**
 * Precios vigentes según el baúl de Grolow (`01_estrategia/identidad-y-reglas`):
 * Catálogo Digital US$450 + US$45/mes y Ecommerce Completo US$850 + desde
 * US$80/mes. La página web empresarial y los sistemas a medida se cotizan; sus
 * mensualidades salen de la misma fuente. Los precios viejos (landing US$250,
 * tienda US$800–1,500, US$25/hora) están descartados allí y no deben volver.
 */
export const TIERS: Tier[] = [
  {
    id: "catalogo",
    name: { es: "Catálogo Digital", en: "Digital Catalogue" },
    what: {
      es: "Productos administrables desde un panel, con buscador y pedidos que llegan a WhatsApp ya armados. Sin pasarela de pago.",
      en: "Products managed from a dashboard, with search and orders that reach WhatsApp ready to fulfil. No payment gateway.",
    },
    depends: {
      es: "El precio es de entrada: sube si el catálogo necesita funciones fuera de lo habitual. La mensualidad cubre servidores, base de datos, dominio, respaldos, seguridad y un cambio de contenido al mes.",
      en: "This is the entry price: it rises if the catalogue needs features beyond the usual. The monthly fee covers servers, database, domain, backups, security and one content change a month.",
    },
    min: 450,
    monthly: 45,
  },
  {
    id: "ecommerce",
    name: { es: "Ecommerce Completo", en: "Full Ecommerce" },
    what: {
      es: "Todo lo del catálogo, más pasarela de pago para cobrar con tarjeta, aprobación de pedidos y analítica de ventas.",
      en: "Everything in the catalogue, plus a payment gateway to take card payments, order approval and sales analytics.",
    },
    depends: {
      es: "La mensualidad va de US$80 a US$100 según el volumen y las integraciones, e incluye tres cambios de contenido al mes y un reporte mensual.",
      en: "The monthly fee runs from US$80 to US$100 depending on volume and integrations, and includes three content changes a month and a monthly report.",
    },
    min: 850,
    monthly: 80,
  },
  {
    id: "web",
    name: { es: "Página web empresarial", en: "Business website" },
    what: {
      es: "Inicio, servicios, quiénes somos, contacto con formulario, WhatsApp y mapa, preguntas frecuentes y políticas legales, con dominio, HTTPS, diseño adaptable al móvil, SEO básico y analítica.",
      en: "Home, services, about, contact with a form, WhatsApp and a map, FAQ and legal policies, with a domain, HTTPS, mobile-friendly design, basic SEO and analytics.",
    },
    depends: {
      es: "El proyecto se cotiza por alcance. La mensualidad es de US$45, o RD$2,500 en moneda local, e incluye hosting, dominio y mantenimiento.",
      en: "The project is quoted by scope. The monthly fee is US$45, or RD$2,500 in local currency, and includes hosting, domain and maintenance.",
    },
    perProject: true,
    monthly: 45,
  },
  {
    id: "medida",
    name: { es: "Sistemas a medida", en: "Custom systems" },
    what: {
      es: "Inventario, citas, facturación, paneles internos, aplicaciones y automatizaciones: el software que tu negocio necesita cuando ya no le alcanza la hoja de cálculo.",
      en: "Inventory, appointments, invoicing, internal dashboards, apps and automations: the software your business needs once the spreadsheet is no longer enough.",
    },
    depends: {
      es: "Se estima por alcance y se entrega un precio cerrado por escrito. La mensualidad depende de la infraestructura que use el sistema y va en la propuesta.",
      en: "It's estimated by scope and you get a fixed price in writing. The monthly fee depends on the infrastructure the system uses and is stated in the proposal.",
    },
    perProject: true,
  },
];

/**
 * Qué tramos de la tabla cubre cada página de servicio.
 *
 * Solo sirve para los `offers` del JSON-LD: las páginas de servicio no
 * publican números —cierran con «propuesta cerrada en 24 horas», a propósito—,
 * así que el precio se declara aquí apuntando a `/precios`, que es la página
 * que sí lo enseña. Los importes salen de `TIERS`, el mismo sitio del que salen
 * la página de precios y la sección de planes de la portada, así que el schema
 * no puede decir un número distinto del que ve el visitante.
 *
 * Una página sin entrada aquí no declara ofertas. Es preferible a asignarle un
 * tramo por aproximación.
 */
const SERVICE_TIERS: Partial<Record<RouteId, readonly string[]>> = {
  // El sitio de la empresa, para cualquier público.
  desarrolloWeb: ["web"],
  disenoWeb: ["web"],
  empresas: ["web"],
  consultores: ["web"],
  creadores: ["web"],
  // Catálogo con pedidos por WhatsApp, o tienda que además cobra.
  tiendaWhatsapp: ["catalogo", "ecommerce"],
  // Se cotizan por alcance, así que el `Offer` va sin importe.
  apps: ["medida"],
  software: ["medida"],
};

/** Tramos aplicables a una ruta, en el orden de la tabla de precios. */
export function tiersFor(id: RouteId): Tier[] {
  const ids = SERVICE_TIERS[id];
  if (!ids) return [];
  return TIERS.filter((tier) => ids.includes(tier.id));
}

/** Precio formateado para mostrar, p. ej. `Desde US$450 + US$45/mes`. */
export function priceLabel(tier: Tier, lang: Lang): string {
  const es = lang === "es";
  const monthly =
    tier.monthly === undefined
      ? ""
      : es
        ? ` + US$${tier.monthly}/mes`
        : ` + US$${tier.monthly}/month`;
  if (tier.perProject || tier.min === undefined) {
    return (es ? "Cotización por escrito" : "Written quote") + monthly;
  }
  if (tier.max !== undefined) return `US$${tier.min} – US$${tier.max}${monthly}`;
  return (es ? `Desde US$${tier.min}` : `From US$${tier.min}`) + monthly;
}

/** Rango de precios de entrada, para `priceRange` del schema local. */
export function businessPriceRange(): string {
  const priced = TIERS.filter((t) => t.min !== undefined);
  const low = Math.min(...priced.map((t) => t.min!));
  const high = Math.max(...priced.map((t) => t.max ?? t.min!));
  return `US$${low}–US$${high}`;
}
