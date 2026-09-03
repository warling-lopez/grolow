/**
 * Fuente única de verdad del enrutado por idioma.
 *
 * Todo lo que dependa del par (ruta, idioma) — el árbol de rutas, el canonical,
 * los hreflang, el sitemap, las migas de pan y el toggle del header — se deriva
 * de `ROUTES`. Añadir una página es añadir una entrada aquí: no hay que tocar
 * el sitemap ni los alternates a mano, que es justo donde se cuelan las
 * incoherencias que Bing penaliza.
 */

export type Lang = "es" | "en";

/** Español primero: es el mercado principal y el `x-default`. */
export const LOCALES = ["es", "en"] as const satisfies readonly Lang[];
export const DEFAULT_LOCALE: Lang = "es";

/** Dominio canónico, con www. Sin barra final. */
export const SITE_URL = "https://www.grolow.com";

/** WhatsApp de Grolow. El de Hermon Dental es otro y no se usa aquí. */
export const WHATSAPP_NUMBER = "18299946354";

/**
 * Valor del atributo `hreflang`. El español se marca `es-DO` porque el negocio
 * es dominicano; el inglés queda sin región para no excluir mercados.
 */
export const HREFLANG: Record<Lang, string> = { es: "es-DO", en: "en" };

/** Valor de `<html lang>` y de `og:locale`. */
export const HTML_LANG: Record<Lang, string> = { es: "es-DO", en: "en" };
export const OG_LOCALE: Record<Lang, string> = { es: "es_DO", en: "en_US" };

type ChangeFrequency = "daily" | "weekly" | "monthly" | "yearly";

/** Determina qué datos estructurados emite la página. */
export type SchemaKind =
  | "home"
  | "service"
  | "offer"
  | "article"
  | "collection"
  | "contact"
  | "plain";

type RouteDef = {
  /**
   * Slug por idioma, sin barras iniciales. Cadena vacía = portada del idioma
   * (`/es`). Si falta un idioma, la ruta no existe en ese idioma: no se genera,
   * no entra al sitemap y no se declara hreflang hacia ella. Declarar un
   * alternate a una URL inexistente es peor que no declararlo.
   */
  slug: Partial<Record<Lang, string>>;
  /** `false` => `noindex, nofollow` y fuera del sitemap. */
  index: boolean;
  /** Ruta padre, para migas de pan y `BreadcrumbList`. */
  parent?: RouteId;
  schema?: SchemaKind;
  priority?: number;
  changeFrequency?: ChangeFrequency;
};

const ROUTE_TABLE = {
  home: {
    slug: { es: "", en: "" },
    index: true,
    schema: "home",
    priority: 1,
    changeFrequency: "weekly",
  },

  // ── Índice de servicios ────────────────────────────────────────────────
  servicios: {
    slug: { es: "servicios", en: "services" },
    index: true,
    parent: "home",
    schema: "collection",
    priority: 0.9,
    changeFrequency: "monthly",
  },

  // ── Páginas de servicio ────────────────────────────────────────────────
  desarrolloWeb: {
    slug: { es: "desarrollo-web-a-medida", en: "custom-web-development" },
    index: true,
    parent: "servicios",
    schema: "service",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  disenoWeb: {
    slug: { es: "diseno-web-santo-domingo", en: "web-design-santo-domingo" },
    index: true,
    parent: "servicios",
    schema: "service",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  software: {
    slug: {
      es: "desarrollo-de-software-a-medida",
      en: "custom-software-development",
    },
    index: true,
    parent: "servicios",
    schema: "service",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  tiendaWhatsapp: {
    slug: { es: "tienda-online-whatsapp", en: "whatsapp-online-store" },
    index: true,
    parent: "servicios",
    schema: "service",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  apps: {
    slug: { es: "aplicaciones-moviles", en: "mobile-app-development" },
    index: true,
    parent: "servicios",
    schema: "service",
    priority: 0.7,
    changeFrequency: "monthly",
  },

  // ── Páginas por segmento ───────────────────────────────────────────────
  empresas: {
    slug: { es: "sitios-web-para-empresas", en: "websites-for-companies" },
    index: true,
    parent: "home",
    schema: "service",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  consultores: {
    slug: { es: "sitios-web-para-consultores", en: "websites-for-consultants" },
    index: true,
    parent: "home",
    schema: "service",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  creadores: {
    slug: { es: "sitios-web-para-creadores", en: "websites-for-creators" },
    index: true,
    parent: "home",
    schema: "service",
    priority: 0.8,
    changeFrequency: "monthly",
  },

  // ── Utilidad y prueba ──────────────────────────────────────────────────
  precios: {
    slug: { es: "precios", en: "pricing" },
    index: true,
    parent: "home",
    schema: "offer",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  casos: {
    slug: { es: "casos", en: "case-studies" },
    index: true,
    parent: "home",
    schema: "collection",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  casoLaperfum: {
    slug: { es: "casos/laperfum1", en: "case-studies/laperfum1" },
    index: true,
    parent: "casos",
    schema: "article",
    priority: 0.7,
    changeFrequency: "yearly",
  },
  casoHellens: {
    slug: { es: "casos/hellens-cute", en: "case-studies/hellens-cute" },
    index: true,
    parent: "casos",
    schema: "article",
    priority: 0.7,
    changeFrequency: "yearly",
  },
  casoWarling: {
    slug: { es: "casos/warling-dev", en: "case-studies/warling-dev" },
    index: true,
    parent: "casos",
    schema: "article",
    priority: 0.7,
    changeFrequency: "yearly",
  },
  contacto: {
    slug: { es: "contacto", en: "contact" },
    index: true,
    parent: "home",
    schema: "contact",
    priority: 0.8,
    changeFrequency: "yearly",
  },

  // ── Sin publicar / sin indexar ─────────────────────────────────────────
  // A la espera del primer caso real de clínica.
  clinicas: {
    slug: { es: "clinicas" },
    index: false,
    parent: "servicios",
  },
  gracias: {
    slug: { es: "gracias", en: "thank-you" },
    index: false,
    parent: "home",
  },
} as const;

export type RouteId = keyof typeof ROUTE_TABLE;

/**
 * Se expone con el tipo ancho para poder leer `priority`/`parent` de forma
 * uniforme; `ROUTE_TABLE` conserva las claves literales.
 */
export const ROUTES: Record<RouteId, RouteDef> = ROUTE_TABLE;

export const ROUTE_IDS = Object.keys(ROUTE_TABLE) as RouteId[];

export function isLang(value: string | undefined): value is Lang {
  return value === "es" || value === "en";
}

/** Slug de una ruta en un idioma, o `null` si no existe en ese idioma. */
export function slugFor(id: RouteId, lang: Lang): string | null {
  const slug = ROUTES[id].slug[lang];
  return slug === undefined ? null : slug;
}

/** Ruta absoluta desde la raíz del sitio, p. ej. `/es/servicios`. */
export function pathFor(id: RouteId, lang: Lang): string | null {
  const slug = slugFor(id, lang);
  if (slug === null) return null;
  return slug === "" ? `/${lang}` : `/${lang}/${slug}`;
}

/** URL absoluta. Canonical, hreflang y sitemap la exigen. */
export function urlFor(id: RouteId, lang: Lang): string | null {
  const path = pathFor(id, lang);
  return path === null ? null : `${SITE_URL}${path}`;
}

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Idiomas en los que existe la ruta. */
export function localesFor(id: RouteId): Lang[] {
  return LOCALES.filter((lang) => slugFor(id, lang) !== null);
}

/**
 * Cadena de ancestros, de la raíz a la propia página, para las migas de pan.
 * `home` queda fuera: lo aporta la miga como enlace de inicio.
 */
export function ancestorsFor(id: RouteId): RouteId[] {
  const chain: RouteId[] = [];
  let current: RouteId | undefined = ROUTES[id].parent;
  while (current && current !== "home") {
    chain.unshift(current);
    current = ROUTES[current].parent;
  }
  return chain;
}

/**
 * Resuelve los segmentos de URL a una ruta del registro.
 * `/es` llega como `undefined` o `[]` (catch-all opcional) y resuelve a `home`.
 */
export function resolveRoute(lang: Lang, segments?: string[]): RouteId | null {
  const slug = (segments ?? []).join("/");
  for (const id of ROUTE_IDS) {
    if (slugFor(id, lang) === slug) return id;
  }
  return null;
}

/**
 * `alternates` para la Metadata API: canonical autorreferencial más un
 * hreflang por idioma disponible, incluido el propio, más `x-default` al
 * español. Recíproco por construcción, porque ambos lados leen este mismo mapa.
 */
export function alternatesFor(id: RouteId, lang: Lang) {
  const languages: Record<string, string> = {};
  for (const other of localesFor(id)) {
    languages[HREFLANG[other]] = urlFor(id, other)!;
  }

  // x-default apunta al español, que es el idioma por defecto del sitio.
  const fallback = urlFor(id, DEFAULT_LOCALE) ?? urlFor(id, lang)!;
  languages["x-default"] = fallback;

  return { canonical: urlFor(id, lang)!, languages };
}

/**
 * URL equivalente en el otro idioma, para el toggle del header. Si la página
 * no existe en el idioma destino, se cae a la portada de ese idioma en vez de
 * llevar al usuario a un 404.
 */
export function switchLocale(pathname: string, target: Lang): string {
  const segments = pathname.split("/").filter(Boolean);
  const current = segments[0];
  if (!isLang(current)) return `/${target}`;

  const id = resolveRoute(current, segments.slice(1));
  if (id === null) return `/${target}`;

  return pathFor(id, target) ?? `/${target}`;
}

/** Idioma activo según la URL. Es la única fuente de idioma del sitio. */
export function langFromPathname(pathname: string | null | undefined): Lang {
  const first = (pathname ?? "").split("/").filter(Boolean)[0];
  return isLang(first) ? first : DEFAULT_LOCALE;
}

/**
 * URL absoluta de la imagen Open Graph de una ruta. Se sirve desde `/og/...`
 * porque un catch-all opcional no admite `opengraph-image.tsx` por debajo.
 */
export function ogImageUrl(id: RouteId, lang: Lang): string {
  const slug = slugFor(id, lang);
  const suffix = slug === null || slug === "" ? "" : `/${slug}`;
  return `${SITE_URL}/og/${lang}${suffix}`;
}

/** Enlace de WhatsApp con mensaje precargado propio de cada página. */
export function whatsappHref(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
