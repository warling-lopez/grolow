import type { MetadataRoute } from "next";
import { SITE_URL } from "@/app/lib/i18n";

/**
 * Sin reglas por user-agent: `bingbot` y `Slurp` (Yahoo, que consume el índice
 * de Bing) quedan explícitamente permitidos al no existir ningún `Disallow`
 * que los alcance. Solo se excluye `/api`, que no tiene nada que indexar.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
