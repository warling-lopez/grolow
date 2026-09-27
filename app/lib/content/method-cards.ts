import type { Lang } from "@/app/lib/i18n";

/**
 * Contenido de la constelación «sistema de trabajo» (antes «estándares de
 * ingeniería», que mostraba scores de Lighthouse, schema y stack — ese
 * contenido sigue existiendo en `engineering.ts` y `lighthouse.json`, solo
 * que ya no se pinta en ningún sitio del sitio; se puede volver a enseñar en
 * otra sección si hace falta).
 *
 * Cinco tarjetas con la misma forma (título, frase, cuatro puntos, cita):
 * consultoría, estrategia, diseño y entrega alrededor de un núcleo —
 * «pensamiento sistémico»— que es la idea que las conecta. El inglés es el
 * texto exacto que pidió el cliente; el español es su traducción directa.
 */

export type MethodCard = {
  title: Record<Lang, string>;
  tagline: Record<Lang, string>;
  bullets: Record<Lang, string[]>;
  quote: Record<Lang, string>;
};

export const METHOD_CARDS: MethodCard[] = [
  {
    title: { es: "Consultoría", en: "Consulting" },
    tagline: {
      es: "Claridad antes de actuar.",
      en: "Clarity before action.",
    },
    bullets: {
      es: [
        "Objetivos de negocio y crecimiento",
        "Alineación con clientes y partes interesadas",
        "Definición del problema y de la oportunidad",
        "Apoyo a la decisión en inversiones digitales",
      ],
      en: [
        "Business goals & growth objectives",
        "Customer and stakeholder alignment",
        "Problem definition & opportunity framing",
        "Decision support for digital investments",
      ],
    },
    quote: {
      es: "“No empieza con ‘qué deberíamos hacer’, sino con ‘qué deberíamos evitar’.”",
      en: "“It starts not with ‘what should we do’ but ‘what should we avoid.’”",
    },
  },
  {
    title: { es: "Estrategia", en: "Strategy" },
    tagline: {
      es: "Convertir el conocimiento en dirección.",
      en: "Turning insight into direction.",
    },
    bullets: {
      es: [
        "Estrategia de experiencia y recorrido del cliente",
        "Arquitectura de la información y lógica de contenido",
        "Estrategia de producto digital y plataforma",
        "Marcos de medición y de éxito",
      ],
      en: [
        "Customer journey & experience strategy",
        "Information architecture & content logic",
        "Digital product & platform strategy",
        "Measurement & success frameworks",
      ],
    },
    quote: {
      es: "“La estrategia no es un documento previo al diseño: es el punto de referencia de cada decisión.”",
      en: "“Strategy is not a document placed before design; it's the reference point for all decisions.”",
    },
  },
  {
    title: { es: "Diseño", en: "Design" },
    tagline: {
      es: "Diseñar experiencias con intención.",
      en: "Designing experiences with intent.",
    },
    bullets: {
      es: [
        "Diseño de UI/UX centrado en la experiencia",
        "Sistemas de diseño y lenguaje visual",
        "Principios de movimiento e interacción",
        "Prototipado y validación de usabilidad",
      ],
      en: [
        "Experience-led UI/UX design",
        "Design systems & visual language",
        "Motion & interaction principles",
        "Prototyping & usability validation",
      ],
    },
    quote: {
      es: "“El diseño visual es el resultado; el trabajo real es diseñar la experiencia.”",
      en: "“Visual design is the result here; the real work is designing the experience.”",
    },
  },
  {
    title: { es: "Entrega", en: "Delivery" },
    tagline: {
      es: "Construir sistemas que duran.",
      en: "Building systems that last.",
    },
    bullets: {
      es: [
        "Ingeniería front-end y stacks modernos",
        "Arquitectura escalable basada en componentes",
        "Rendimiento, accesibilidad y control de calidad",
        "Lanzamiento, optimización y soporte continuo",
      ],
      en: [
        "Front-end engineering & modern stacks",
        "Scalable component-based architecture",
        "Performance, accessibility & QA",
        "Launch, optimisation & continuous support",
      ],
    },
    quote: {
      es: "“No es solo publicarlo: es entregar un sistema sostenible.”",
      en: "“Not just going live, but delivering a sustainable system.”",
    },
  },
];

/** El núcleo: misma forma que las cuatro tarjetas (título, frase, puntos,
 *  cita), no un resumen aparte. */
export const HUB_CARD: MethodCard = {
  title: { es: "Pensamiento sistémico", en: "System thinking" },
  tagline: {
    es: "Todo funciona mejor conectado.",
    en: "Everything works better when connected.",
  },
  bullets: {
    es: [
      "Alineación entre estrategia, diseño y entrega",
      "Colaboración entre equipos",
      "Visión sistémica a largo plazo",
      "Mentalidad de mejora continua",
    ],
    en: [
      "Strategy, design and delivery alignment",
      "Cross-team collaboration",
      "Long-term system thinking",
      "Continuous improvement mindset",
    ],
  },
  quote: {
    es: "“No somos un proveedor de servicios: somos un socio organizacional.”",
    en: "“Not a service provider, but an organizational partner.”",
  },
};

export const METHOD_COPY = {
  es: {
    label: "Cómo trabajamos",
    title: "Sistema de trabajo",
    dragHint: "Arrastra para explorar",
  },
  en: {
    label: "How we work",
    title: "Working system",
    dragHint: "Drag to explore",
  },
} as const;
