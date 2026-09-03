import type { MetadataRoute } from "next";
import {
  HREFLANG,
  ROUTES,
  ROUTE_IDS,
  localesFor,
  urlFor,
} from "@/app/lib/i18n";
import { lastModifiedFor } from "@/app/lib/lastmod";

/**
 * Una entrada por par (ruta, idioma), con sus alternates.
 *
 * Solo entran las rutas marcadas `index: true`: incluir una página `noindex`
 * en el sitemap es una contradicción que Bing reporta como error. Tampoco
 * entran las landings de cliente, que viven fuera del árbol de idiomas.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const id of ROUTE_IDS) {
    const route = ROUTES[id];
    if (!route.index) continue;

    const locales = localesFor(id);
    const languages = Object.fromEntries(
      locales.map((lang) => [HREFLANG[lang], urlFor(id, lang)!]),
    );

    for (const lang of locales) {
      entries.push({
        url: urlFor(id, lang)!,
        lastModified: lastModifiedFor(id),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: { languages },
      });
    }
  }

  return entries;
}
