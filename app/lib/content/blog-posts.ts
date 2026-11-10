import type { Lang, RouteId } from "@/app/lib/i18n";

/**
 * Ficha de cada artículo del blog: lo que hace falta para pintarlo en
 * tarjetas (barra lateral, recomendaciones, portada del blog).
 *
 * `date` es la fecha de publicación (el commit que añadió el fichero).
 * Para publicar un artículo nuevo: añadir su ruta en `i18n.ts`, su contenido
 * en `content/index.ts` y una entrada aquí.
 */
export type BlogCategory = "grolow" | "seguridad" | "rd" | "guias";

/**
 * Foto de portada. Todas son de Unsplash (licencia libre, uso comercial
 * permitido) y viven en `public/blog/`. El crédito se muestra bajo la foto.
 */
export type BlogImage = {
  src: string;
  alt: string;
  credit: string;
  /** Página de la foto en Unsplash. */
  source: string;
};

export type BlogPost = {
  id: RouteId;
  image: BlogImage;
  /** Título, resumen y alt en español. */
  title: string;
  excerpt: string;
  category: BlogCategory;
  /** ISO, YYYY-MM-DD. */
  date: string;
  /** Los mismos textos en inglés. */
  en: { title: string; excerpt: string; alt: string };
};

/** La ficha con los textos del idioma pedido (título, resumen y alt). */
export function localizePost(post: BlogPost, lang: Lang): BlogPost {
  if (lang === "es") return post;
  return {
    ...post,
    title: post.en.title,
    excerpt: post.en.excerpt,
    image: { ...post.image, alt: post.en.alt },
  };
}

export const CATEGORY_LABELS: Record<Lang, Record<BlogCategory, string>> = {
  es: { grolow: "Sobre Grolow", seguridad: "Seguridad web", rd: "República Dominicana", guias: "Guías" },
  en: { grolow: "About Grolow", seguridad: "Web security", rd: "Dominican Republic", guias: "Guides" },
};

/** Nombre de la categoría en el idioma pedido. */
export function categoryLabel(category: BlogCategory, lang: Lang): string {
  return CATEGORY_LABELS[lang][category];
}

/** Compatibilidad: etiquetas en español. */
export const CATEGORY_LABEL = CATEGORY_LABELS.es;

/** Más reciente primero dentro de cada fecha, en el orden de lectura sugerido. */
export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blogQueEsGrolow",
    image: {
      src: "/blog/que-es-grolow.jpg",
      alt: "Vista aérea de los edificios de Santo Domingo durante el día",
      credit: "Venero Encarnación Martínez",
      source: "https://unsplash.com/photos/WTF0QbzEXpA",
    },
    title: "Qué es Grolow: la empresa de software que construye y mantiene",
    excerpt:
      "Qué hace, qué no hace, cómo trabaja, quién está detrás y cómo contactarla, sin rodeos.",
    category: "grolow",
    date: "2026-11-08",
    en: {
      title: "What Grolow is: the software company that builds and maintains",
      excerpt: "What it does, what it doesn't, how it works, who is behind it and how to reach it, plainly.",
      alt: "Aerial view of Santo Domingo's buildings during the day",
    },
  },
  {
    id: "blogQuienEsGrolow",
    image: {
      src: "/blog/quien-es-grolow.jpg",
      alt: "Persona escribiendo código en un portátil junto a una planta y una taza",
      credit: "Nubelson Fernandes",
      source: "https://unsplash.com/photos/UcYBL5V0xWQ",
    },
    title: "Quién está detrás de Grolow y cómo se reparte el trabajo",
    excerpt:
      "El fundador, quién programa, quién contesta cuando algo falla y qué pasa con tu proyecto si una persona cambia.",
    category: "grolow",
    date: "2026-11-08",
    en: {
      title: "Who is behind Grolow and how the work is split",
      excerpt: "The founder, who writes the code, who answers when something breaks and what happens to your project if a person changes.",
      alt: "Person writing code on a laptop next to a plant and a mug",
    },
  },
  {
    id: "blogMensualidad",
    image: {
      src: "/blog/mensualidad.jpg",
      alt: "Gráficos de rendimiento en la pantalla de un portátil",
      credit: "Luke Chesser",
      source: "https://unsplash.com/photos/JKUTrJ4vK00",
    },
    title: "Qué cubre la mensualidad de Grolow, punto por punto",
    excerpt:
      "Qué incluye, qué no, cuánto cuesta, cómo se cancela y por qué se paga aunque no pase nada.",
    category: "grolow",
    date: "2026-11-08",
    en: {
      title: "What Grolow's monthly fee covers, point by point",
      excerpt: "What's included, what isn't, what it costs, how to cancel and why it's worth paying even when nothing happens.",
      alt: "Performance charts on a laptop screen",
    },
  },
  {
    id: "blogPropiedad",
    image: {
      src: "/blog/propiedad.jpg",
      alt: "Mano sosteniendo unas llaves sobre casas en miniatura",
      credit: "Jakub Żerdzicki",
      source: "https://unsplash.com/photos/t0CRdNl_mTg",
    },
    title: "De quién es tu dominio, tu código y tus datos con Grolow",
    excerpt:
      "Activo por activo, qué es tuyo, qué opera Grolow y qué te llevas sin costo el día que decidas irte.",
    category: "grolow",
    date: "2026-11-08",
    en: {
      title: "Who owns your domain, your code and your data with Grolow",
      excerpt: "Asset by asset, what's yours, what Grolow operates and what you take with you at no cost the day you leave.",
      alt: "Hand holding keys over miniature houses",
    },
  },
  {
    id: "blogLoQueNoHace",
    image: {
      src: "/blog/lo-que-no-hace.jpg",
      alt: "Un lápiz sobre una pila de papel",
      credit: "Onkar Mehta",
      source: "https://unsplash.com/photos/eVpZxkNY3bw",
    },
    title: "Lo que Grolow no hace, y a quién conviene buscar en cada caso",
    excerpt:
      "Branding, marketing, redes y tiendas en WooCommerce o Shopify: por qué Grolow no los hace y qué proveedor sí te conviene.",
    category: "grolow",
    date: "2026-11-08",
    en: {
      title: "What Grolow doesn't do, and who to look for in each case",
      excerpt: "Branding, marketing, social media and WooCommerce or Shopify stores: why Grolow doesn't do them and who does.",
      alt: "A pencil on top of a stack of paper",
    },
  },
  {
    id: "blogCatalogoTienda",
    image: {
      src: "/blog/catalogo-tienda.jpg",
      alt: "Mesa de cristal con frascos de perfume",
      credit: "W eibo",
      source: "https://unsplash.com/photos/xVH2CB-0gtQ",
    },
    title: "Catálogo digital o tienda online: qué necesita tu negocio en RD",
    excerpt:
      "Cuándo te basta una herramienta gratis, cuándo un catálogo propio y cuándo una tienda con pago en línea.",
    category: "guias",
    date: "2026-11-08",
    en: {
      title: "Digital catalogue or online store: what your business in the DR needs",
      excerpt: "When a free tool is enough, when your own catalogue makes sense and when you need a store with online payment.",
      alt: "Glass table covered with perfume bottles",
    },
  },
  {
    id: "blogPagosRd",
    image: {
      src: "/blog/pagos-rd.jpg",
      alt: "Persona con una tarjeta de crédito usando un portátil",
      credit: "rupixen",
      source: "https://unsplash.com/photos/Q59HmzK38eQ",
    },
    title: "Cómo cobrar con tarjeta en tu web en República Dominicana",
    excerpt:
      "Azul, CardNet, enlaces de pago y PayPal: qué te piden, qué no te dicen y cómo elegir.",
    category: "rd",
    date: "2026-11-08",
    en: {
      title: "How to accept card payments on your website in the Dominican Republic",
      excerpt: "Azul, CardNet, payment links and PayPal: what they ask for, what they don't tell you and how to choose.",
      alt: "Person holding a credit card while using a laptop",
    },
  },
  {
    id: "blogSistemaMedida",
    image: {
      src: "/blog/sistema-medida.jpg",
      alt: "Manos tecleando en un portátil con una hoja de cálculo",
      credit: "Gorilla ROI Data Connector",
      source: "https://unsplash.com/photos/9fZuqBYlV1w",
    },
    title: "Excel, software listo o sistema a medida: cómo decidir",
    excerpt:
      "Cuándo la hoja de cálculo todavía sirve, cuándo conviene algo listo y cuándo un sistema a medida, y cuánto cuesta.",
    category: "guias",
    date: "2026-11-08",
    en: {
      title: "Spreadsheet, off-the-shelf software or a custom system: how to decide",
      excerpt: "When the spreadsheet still works, when ready-made software fits and when a custom system pays off, and what it costs.",
      alt: "Hands typing on a laptop showing a spreadsheet",
    },
  },
  {
    id: "blogAntesDeContratar",
    image: {
      src: "/blog/antes-de-contratar.jpg",
      alt: "Dos personas revisando documentos en una mesa",
      credit: "Olena Kholina",
      source: "https://unsplash.com/photos/MhqUBTxQ3Hw",
    },
    title: "Qué preguntar antes de contratar una página web o un sistema en RD",
    excerpt:
      "Las preguntas que separan a un buen proveedor de uno problemático, con las respuestas de Grolow a cada una.",
    category: "guias",
    date: "2026-11-08",
    en: {
      title: "What to ask before hiring someone for a website or a system in the DR",
      excerpt: "The questions that separate a good provider from a problematic one, with Grolow's answer to each.",
      alt: "Two people reviewing documents at a table",
    },
  },
  {
    id: "blogNoApareceGoogle",
    image: {
      src: "/blog/no-aparece-google.jpg",
      alt: "Mano sosteniendo un teléfono con el buscador de Google abierto",
      credit: "Solen Feyissa",
      source: "https://unsplash.com/photos/UWVJaDvXW_c",
    },
    title: "Por qué tu negocio no aparece en Google y cómo comprobarlo",
    excerpt:
      "El mapa y los resultados son dos sistemas distintos: las causas más comunes y cómo revisarlas en una tarde.",
    category: "guias",
    date: "2026-11-08",
    en: {
      title: "Why your business doesn't show up on Google and how to check",
      excerpt: "The map and the results are two different systems: the most common causes and how to check them in an afternoon.",
      alt: "Hand holding a phone with Google search open",
    },
  },
  {
    id: "blogPhp2shell",
    image: {
      src: "/blog/php2shell.jpg",
      alt: "Código PHP en una pantalla oscura",
      credit: "Steve Barker",
      source: "https://unsplash.com/photos/r82ZdRBObV8",
    },
    title: "PHP2Shell: qué pasó con PHP en octubre de 2026",
    excerpt:
      "Los fallos explicados sin jerga, la cronología del descubrimiento y lo que todavía no está claro.",
    category: "seguridad",
    date: "2026-10-24",
    en: {
      title: "PHP2Shell: what happened to PHP in October 2026",
      excerpt: "The flaws explained without jargon, the timeline of the discovery and what is still unclear.",
      alt: "PHP code on a dark screen",
    },
  },
  {
    id: "blogPhpRevisar",
    image: {
      src: "/blog/php-revisar.jpg",
      alt: "Archivo de configuración de un sitio PHP abierto en un editor",
      credit: "Jaffer Nizami",
      source: "https://unsplash.com/photos/ytZ2SJvNAxs",
    },
    title: "Cómo saber si tu sitio PHP es vulnerable y qué hacer hoy",
    excerpt:
      "La guía práctica: revisar la versión, actualizar, mitigar si no puedes y comprobar si alguien entró.",
    category: "seguridad",
    date: "2026-10-24",
    en: {
      title: "How to tell if your PHP site is vulnerable and what to do today",
      excerpt: "The practical guide: check the version, update, mitigate if you can't, and check whether anyone got in.",
      alt: "Configuration file of a PHP site open in an editor",
    },
  },
  {
    id: "blogPhpObsoleto",
    image: {
      src: "/blog/php-obsoleto.jpg",
      alt: "Primer plano de código en un monitor",
      credit: "Dominik Malinowski",
      source: "https://unsplash.com/photos/33BNdaQHH9Q",
    },
    title: "Tu sitio sigue en PHP 7.4, 8.0 u 8.1: qué hacer ahora",
    excerpt:
      "Las opciones para versiones sin soporte, de mejor a peor, y cómo migrar sin romper el sitio.",
    category: "seguridad",
    date: "2026-10-24",
    en: {
      title: "Your site is still on PHP 7.4, 8.0 or 8.1: what to do now",
      excerpt: "The options for unsupported versions, from best to worst, and how to migrate without breaking the site.",
      alt: "Close-up of code on a monitor",
    },
  },
  {
    id: "blogNginx",
    image: {
      src: "/blog/nginx.jpg",
      alt: "Rack de servidores con cables de red en un centro de datos",
      credit: "Kevin Ache",
      source: "https://unsplash.com/photos/2JJ3wBHu4_0",
    },
    title: "Los cinco fallos de Nginx de octubre de 2026",
    excerpt:
      "Qué configuración activa cada uno, cómo auditar la tuya y por qué las cifras de gravedad no coinciden.",
    category: "seguridad",
    date: "2026-10-24",
    en: {
      title: "The five Nginx flaws of October 2026",
      excerpt: "Which configuration triggers each one, how to audit yours and why the severity scores don't match.",
      alt: "Server rack with network cables in a data center",
    },
  },
  {
    id: "blogEmudhra",
    image: {
      src: "/blog/emudhra.jpg",
      alt: "Candado de combinación sobre un teclado",
      credit: "Sasun Bughdaryan",
      source: "https://unsplash.com/photos/WUJmdr8pNwk",
    },
    title: "eMudhra: la certificadora cuyas claves cabían en un número",
    excerpt:
      "Cómo funcionan las autoridades de certificación, qué falló y cómo respondieron los navegadores.",
    category: "seguridad",
    date: "2026-10-24",
    en: {
      title: "eMudhra: the certificate authority whose keys fit in a number",
      excerpt: "How certificate authorities work, what went wrong and how browsers responded.",
      alt: "Combination padlock on a keyboard",
    },
  },
  {
    id: "blogCertificados",
    image: {
      src: "/blog/certificados.jpg",
      alt: "Candado envuelto en cadenas",
      credit: "FLY:D",
      source: "https://unsplash.com/photos/F_KCIRbsxAY",
    },
    title: "Qué revisar en tus servidores después del caso eMudhra",
    excerpt:
      "Los almacenes de certificados que hay que actualizar fuera del navegador y cómo comprobarlo.",
    category: "seguridad",
    date: "2026-10-24",
    en: {
      title: "What to check on your servers after the eMudhra case",
      excerpt: "The certificate stores you need to update outside the browser and how to verify them.",
      alt: "Padlock wrapped in chains",
    },
  },
  {
    id: "blogSemanaNegra",
    image: {
      src: "/blog/semana-negra.jpg",
      alt: "Persona con capucha usando una laptop en la oscuridad",
      credit: "Bermix Studio",
      source: "https://unsplash.com/photos/bCrM2e1M0a4",
    },
    title: "La semana negra de los servidores web: qué aprender de ella",
    excerpt:
      "Lo que tienen en común los tres casos, el papel de la inteligencia artificial y cinco decisiones para la próxima vez.",
    category: "seguridad",
    date: "2026-10-24",
    en: {
      title: "Web servers' black week: what to learn from it",
      excerpt: "What the three cases have in common, the role of artificial intelligence and five decisions for next time.",
      alt: "Hooded person using a laptop in the dark",
    },
  },
  {
    id: "blogPhpRd",
    image: {
      src: "/blog/php-rd.jpg",
      alt: "Vista aérea de la Zona Colonial de Santo Domingo y el Alcázar de Colón",
      credit: "Venero Encarnación Martínez",
      source: "https://unsplash.com/photos/WTF0QbzEXpA",
    },
    title: "Cómo afectó PHP2Shell a República Dominicana",
    excerpt:
      "Lo que se sabe y lo que no del impacto en el país, el contexto del CNCS y por qué el mercado local está expuesto.",
    category: "rd",
    date: "2026-10-24",
    en: {
      title: "How PHP2Shell affected the Dominican Republic",
      excerpt: "What is and isn't known about the impact in the country, the CNCS context and why the local market is exposed.",
      alt: "Aerial view of Santo Domingo's Colonial Zone and the Alcázar de Colón",
    },
  },
  {
    id: "blogCertificadosRd",
    image: {
      src: "/blog/certificados-rd.jpg",
      alt: "Persona firmando en una tableta junto a una laptop",
      credit: "Jakub Żerdzicki",
      source: "https://unsplash.com/photos/fgNgbnMdgBM",
    },
    title: "Certificados digitales en República Dominicana tras eMudhra",
    excerpt:
      "La diferencia entre el certificado de tu sitio y tu firma digital, quién los emite aquí y cómo cuidar el de facturación.",
    category: "rd",
    date: "2026-10-24",
    en: {
      title: "Digital certificates in the Dominican Republic after eMudhra",
      excerpt: "The difference between your site's certificate and your digital signature, who issues them here and how to protect your e-invoicing one.",
      alt: "Person signing on a tablet next to a laptop",
    },
  },
  {
    id: "blogLeyRd",
    image: {
      src: "/blog/ley-rd.jpg",
      alt: "Mazo de juez junto a un libro",
      credit: "Sasun Bughdaryan",
      source: "https://unsplash.com/photos/FaTLrG5-ViE",
    },
    title: "Qué dice la ley dominicana si hackean tu sitio web",
    excerpt:
      "Las normas vigentes, qué obliga a cada tipo de empresa, a quién reportar y qué hacer en las primeras horas.",
    category: "rd",
    date: "2026-10-24",
    en: {
      title: "What Dominican law says if your website gets hacked",
      excerpt: "The rules in force, what each type of company must do, whom to report to and what to do in the first hours.",
      alt: "Judge's gavel next to a book",
    },
  },
  {
    id: "blogPrecios",
    image: {
      src: "/blog/precios.jpg",
      alt: "Calculadora sobre un escritorio con gráficos y una laptop",
      credit: "Jakub Żerdzicki",
      source: "https://unsplash.com/photos/8wLZi9OhsWU",
    },
    title: "¿Cuánto cuesta una página web en República Dominicana en 2026?",
    excerpt:
      "Los rangos reales del mercado local, qué compra cada uno y las señales de alerta al comparar propuestas.",
    category: "guias",
    date: "2026-09-03",
    en: {
      title: "How much does a website cost in the Dominican Republic in 2026?",
      excerpt: "The real ranges in the local market, what each one buys and the warning signs when comparing proposals.",
      alt: "Calculator on a desk with charts and a laptop",
    },
  },
  {
    id: "blogWordpress",
    image: {
      src: "/blog/wordpress.jpg",
      alt: "Laptop mostrando el logo de WordPress",
      credit: "Deng Xiang",
      source: "https://unsplash.com/photos/YBtAJPcvc4Y",
    },
    title: "WordPress o código a medida: cuál le conviene a tu negocio",
    excerpt:
      "Una comparación honesta que reconoce los casos en los que WordPress es la decisión correcta.",
    category: "guias",
    date: "2026-09-03",
    en: {
      title: "WordPress or custom code: which one suits your business",
      excerpt: "An honest comparison that acknowledges the cases where WordPress is the right decision.",
      alt: "Laptop showing the WordPress logo",
    },
  },
];

export function blogPost(id: RouteId): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.id === id);
}

/** Primero los de la misma categoría, luego el resto. Nunca el propio. */
export function relatedPosts(id: RouteId, count: number): BlogPost[] {
  const current = blogPost(id);
  const others = BLOG_POSTS.filter((p) => p.id !== id);
  const same = others.filter((p) => p.category === current?.category);
  const rest = others.filter((p) => p.category !== current?.category);
  return [...same, ...rest].slice(0, count);
}

/** Lo que no salió en la barra lateral, para no repetir las mismas tarjetas. */
export function recommendedPosts(id: RouteId, skip: number, count: number): BlogPost[] {
  const related = relatedPosts(id, BLOG_POSTS.length);
  const tail = related.slice(skip);
  // Si no quedan suficientes, se rellena con los primeros.
  return [...tail, ...related.slice(0, skip)].slice(0, count);
}

const MONTHS: Record<Lang, string[]> = {
  es: [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
  ],
  en: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ],
};

/** «24 de octubre de 2026» / «October 24, 2026». Sin `Intl` para que
 *  servidor y cliente coincidan. */
export function formatDate(iso: string, lang: Lang = "es"): string {
  const [y, m, d] = iso.split("-").map(Number);
  return lang === "en"
    ? `${MONTHS.en[m - 1]} ${d}, ${y}`
    : `${d} de ${MONTHS.es[m - 1]} de ${y}`;
}

/** Ancla de un encabezado: «¿Media o crítica?» → «media-o-critica». */
export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

/** Artículo anterior y siguiente en el orden de `BLOG_POSTS`. */
export function neighbours(id: RouteId): { prev?: BlogPost; next?: BlogPost } {
  const i = BLOG_POSTS.findIndex((p) => p.id === id);
  if (i === -1) return {};
  return { prev: BLOG_POSTS[i - 1], next: BLOG_POSTS[i + 1] };
}
