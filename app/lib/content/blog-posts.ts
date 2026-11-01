import type { RouteId } from "@/app/lib/i18n";

/**
 * Ficha de cada artículo del blog: lo que hace falta para pintarlo en
 * tarjetas (barra lateral, recomendaciones, portada del blog).
 *
 * `date` es la fecha de publicación (el commit que añadió el fichero).
 * Para publicar un artículo nuevo: añadir su ruta en `i18n.ts`, su contenido
 * en `content/index.ts` y una entrada aquí.
 */
export type BlogCategory = "seguridad" | "rd" | "guias";

export type BlogPost = {
  id: RouteId;
  title: string;
  excerpt: string;
  category: BlogCategory;
  /** ISO, YYYY-MM-DD. */
  date: string;
};

export const CATEGORY_LABEL: Record<BlogCategory, string> = {
  seguridad: "Seguridad web",
  rd: "República Dominicana",
  guias: "Guías",
};

/** Más reciente primero dentro de cada fecha, en el orden de lectura sugerido. */
export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blogPhp2shell",
    title: "PHP2Shell: qué pasó con PHP en octubre de 2026",
    excerpt:
      "Los fallos explicados sin jerga, la cronología del descubrimiento y lo que todavía no está claro.",
    category: "seguridad",
    date: "2026-10-24",
  },
  {
    id: "blogPhpRevisar",
    title: "Cómo saber si tu sitio PHP es vulnerable y qué hacer hoy",
    excerpt:
      "La guía práctica: revisar la versión, actualizar, mitigar si no puedes y comprobar si alguien entró.",
    category: "seguridad",
    date: "2026-10-24",
  },
  {
    id: "blogPhpObsoleto",
    title: "Tu sitio sigue en PHP 7.4, 8.0 u 8.1: qué hacer ahora",
    excerpt:
      "Las opciones para versiones sin soporte, de mejor a peor, y cómo migrar sin romper el sitio.",
    category: "seguridad",
    date: "2026-10-24",
  },
  {
    id: "blogNginx",
    title: "Los cinco fallos de Nginx de octubre de 2026",
    excerpt:
      "Qué configuración activa cada uno, cómo auditar la tuya y por qué las cifras de gravedad no coinciden.",
    category: "seguridad",
    date: "2026-10-24",
  },
  {
    id: "blogEmudhra",
    title: "eMudhra: la certificadora cuyas claves cabían en un número",
    excerpt:
      "Cómo funcionan las autoridades de certificación, qué falló y cómo respondieron los navegadores.",
    category: "seguridad",
    date: "2026-10-24",
  },
  {
    id: "blogCertificados",
    title: "Qué revisar en tus servidores después del caso eMudhra",
    excerpt:
      "Los almacenes de certificados que hay que actualizar fuera del navegador y cómo comprobarlo.",
    category: "seguridad",
    date: "2026-10-24",
  },
  {
    id: "blogSemanaNegra",
    title: "La semana negra de los servidores web: qué aprender de ella",
    excerpt:
      "Lo que tienen en común los tres casos, el papel de la inteligencia artificial y cinco decisiones para la próxima vez.",
    category: "seguridad",
    date: "2026-10-24",
  },
  {
    id: "blogPhpRd",
    title: "Cómo afectó PHP2Shell a República Dominicana",
    excerpt:
      "Lo que se sabe y lo que no del impacto en el país, el contexto del CNCS y por qué el mercado local está expuesto.",
    category: "rd",
    date: "2026-10-24",
  },
  {
    id: "blogCertificadosRd",
    title: "Certificados digitales en República Dominicana tras eMudhra",
    excerpt:
      "La diferencia entre el certificado de tu sitio y tu firma digital, quién los emite aquí y cómo cuidar el de facturación.",
    category: "rd",
    date: "2026-10-24",
  },
  {
    id: "blogLeyRd",
    title: "Qué dice la ley dominicana si hackean tu sitio web",
    excerpt:
      "Las normas vigentes, qué obliga a cada tipo de empresa, a quién reportar y qué hacer en las primeras horas.",
    category: "rd",
    date: "2026-10-24",
  },
  {
    id: "blogPrecios",
    title: "¿Cuánto cuesta una página web en República Dominicana en 2026?",
    excerpt:
      "Los rangos reales del mercado local, qué compra cada uno y las señales de alerta al comparar propuestas.",
    category: "guias",
    date: "2026-09-03",
  },
  {
    id: "blogWordpress",
    title: "WordPress o código a medida: cuál le conviene a tu negocio",
    excerpt:
      "Una comparación honesta que reconoce los casos en los que WordPress es la decisión correcta.",
    category: "guias",
    date: "2026-09-03",
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

const MONTHS = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

/** «24 de octubre de 2026». Sin `Intl` para que servidor y cliente coincidan. */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} de ${MONTHS[m - 1]} de ${y}`;
}
