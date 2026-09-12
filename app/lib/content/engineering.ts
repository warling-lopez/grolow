import type { Lang } from "@/app/lib/i18n";

/**
 * Contenido del panel de estándares de ingeniería.
 *
 * Todo lo que se afirma aquí tiene que ser comprobable por el visitante sin
 * fiarse de nosotros: los scores salen de `lighthouse.json`, que genera
 * `npm run perf:measure` con fecha y URL; los tipos de schema son los que el
 * sitio emite de verdad (se pueden ver en el HTML o en el Rich Results Test);
 * y el stack es el del `package.json`.
 *
 * Lo que NO va aquí: números redondos sin fecha, «99.9% uptime» sin panel
 * público y cualquier logo de tecnología que no se use en producción.
 */

export type Chip = { label: string; note?: Record<Lang, string> };

/** Tipos de datos estructurados que el sitio emite hoy en JSON-LD. */
export const SCHEMA_TYPES: string[] = [
  "Organization",
  "ProfessionalService",
  "WebSite",
  "Service",
  "Offer",
  "FAQPage",
  "BreadcrumbList",
];

/** Stack real, agrupado por capa. Sale de package.json. */
export const STACK: {
  layer: Record<Lang, string>;
  items: string[];
}[] = [
  {
    layer: { es: "Lenguajes", en: "Languages" },
    items: ["TypeScript", "JavaScript", "SQL", "HTML", "CSS"],
  },
  {
    layer: { es: "Frontend", en: "Frontend" },
    items: ["React 19", "Next.js 16", "Tailwind CSS v4", "Framer Motion"],
  },
  {
    layer: { es: "Backend y datos", en: "Backend and data" },
    items: ["Node.js", "Route Handlers", "PostgreSQL", "Nodemailer"],
  },
  {
    layer: { es: "Infraestructura", en: "Infrastructure" },
    items: ["Vercel", "CDN global", "HTTPS", "Turbopack", "Git"],
  },
];

/** Herramientas con las que se verifica cada entrega. Con enlace real. */
export const TOOLS: { name: string; url: string }[] = [
  { name: "PageSpeed Insights", url: "https://pagespeed.web.dev/analyze?url=https%3A%2F%2Fwww.grolow.com%2Fes" },
  { name: "Lighthouse", url: "https://developer.chrome.com/docs/lighthouse/overview" },
  { name: "Rich Results Test", url: "https://search.google.com/test/rich-results?url=https%3A%2F%2Fwww.grolow.com%2Fes" },
  { name: "Schema Validator", url: "https://validator.schema.org/#url=https%3A%2F%2Fwww.grolow.com%2Fes" },
  { name: "Search Console", url: "https://search.google.com/search-console/about" },
];

export const AUDIT_URL =
  "https://pagespeed.web.dev/analyze?url=https%3A%2F%2Fwww.grolow.com%2Fes";

export const COPY = {
  es: {
    label: "Cómo lo construimos",
    title: "Estándares de ingeniería",
    intro:
      "Todo lo de abajo lo puedes comprobar tú mismo, ahora, sin pedirnos nada.",
    scores: "Medición Lighthouse",
    scoresNote: "Medido el",
    audit: "Auditar el sitio en vivo",
    perf: "Rendimiento",
    a11y: "Accesibilidad",
    bp: "Buenas prácticas",
    seo: "SEO técnico",
    dataTitle: "Datos estructurados",
    dataBody:
      "El sitio emite JSON-LD en cada página. Estos son los tipos que declara, y salen del mismo contenido que ves: si el acordeón de preguntas cambia, el FAQPage cambia con él.",
    stackTitle: "Lenguajes y herramientas",
    stackBody:
      "Sin WordPress, sin constructores y sin plugins de terceros en la ruta crítica.",
    toolsLabel: "Con qué lo verificamos",
    metrics: "Métricas de la misma medición",
    localBuild: "build de producción, pendiente de re-medir en el sitio publicado",
  },
  en: {
    label: "How we build it",
    title: "Engineering standards",
    intro: "Everything below you can verify yourself, right now, without asking us.",
    scores: "Lighthouse measurement",
    scoresNote: "Measured on",
    audit: "Audit the live site",
    perf: "Performance",
    a11y: "Accessibility",
    bp: "Best practices",
    seo: "Technical SEO",
    dataTitle: "Structured data",
    dataBody:
      "The site emits JSON-LD on every page. These are the types it declares, and they come from the same content you see: if the FAQ accordion changes, the FAQPage changes with it.",
    stackTitle: "Languages and tools",
    stackBody:
      "No WordPress, no builders, and no third-party plugins in the critical path.",
    toolsLabel: "What we verify it with",
    metrics: "Metrics from the same run",
    localBuild: "production build, pending re-measurement on the live site",
  },
} as const;
