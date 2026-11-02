import type { Lang, RouteId } from "@/app/lib/i18n";

/**
 * Ficha de cada artículo del blog: lo que hace falta para pintarlo en
 * tarjetas (barra lateral, recomendaciones, portada del blog).
 *
 * `date` es la fecha de publicación (el commit que añadió el fichero).
 * Para publicar un artículo nuevo: añadir su ruta en `i18n.ts`, su contenido
 * en `content/index.ts` y una entrada aquí.
 */
export type BlogCategory = "seguridad" | "rd" | "guias";

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
  es: { seguridad: "Seguridad web", rd: "República Dominicana", guias: "Guías" },
  en: { seguridad: "Web security", rd: "Dominican Republic", guias: "Guides" },
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
