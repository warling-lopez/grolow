import { execFileSync } from "node:child_process";
import path from "node:path";
import type { RouteId } from "@/app/lib/i18n";

/**
 * Fichero que determina el contenido de cada ruta. La fecha del último commit
 * que lo tocó es el `lastmod` del sitemap y el `dateModified` de los casos.
 *
 * Usar `new Date()` sería más cómodo, pero marcaría todas las páginas como
 * modificadas en cada despliegue. Google descarta los `lastmod` que detecta
 * inflados y deja de usarlos como señal, así que el valor tiene que ser real
 * para servir de algo.
 */
const SOURCE: Record<RouteId, string> = {
  home: "app/components/pages/HomePage.tsx",
  servicios: "app/components/pages/ServiciosPage.tsx",
  desarrolloWeb: "app/lib/content/desarrollo-web.ts",
  disenoWeb: "app/lib/content/diseno-web.ts",
  software: "app/lib/content/software.ts",
  tiendaWhatsapp: "app/lib/content/tienda-whatsapp.ts",
  apps: "app/lib/content/apps.ts",
  empresas: "app/lib/content/empresas.ts",
  consultores: "app/lib/content/consultores.ts",
  creadores: "app/lib/content/creadores.ts",
  precios: "app/lib/content/precios.ts",
  casos: "app/lib/content/casos.ts",
  casoLaperfum: "app/lib/content/case-studies.ts",
  casoHellens: "app/lib/content/case-studies.ts",
  casoWarling: "app/lib/content/case-studies.ts",
  contacto: "app/components/pages/ContactoPage.tsx",
  blog: "app/lib/content/blog.ts",
  blogPrecios: "app/lib/content/blog-precios.ts",
  blogWordpress: "app/lib/content/blog-wordpress.ts",
  privacidad: "app/lib/content/legal.ts",
  cookies: "app/lib/content/legal.ts",
  terminos: "app/lib/content/legal.ts",
  clinicas: "app/components/pages/ClinicasPage.tsx",
  gracias: "app/components/pages/GraciasPage.tsx",
};

/** `null` = ya se consultó y no hay fecha real; se cachea para no repetir. */
const cache = new Map<string, Date | null>();

/**
 * Fecha del último commit que modificó el fichero, o `null` si no se puede
 * saber: sin git en el entorno de build, o fichero sin commits dentro del
 * historial disponible (Vercel clona en superficial, así que un fichero que
 * lleve tiempo sin tocarse puede quedar fuera).
 *
 * Antes se caía a `new Date()`. Eso no es "no lo sé", es una fecha falsa: si
 * git fallara en el despliegue, las 35 URLs saldrían con el mismo `lastmod` de
 * build en cada deploy, Google lo detecta como inflado y deja de usar la señal
 * en todo el dominio. No declararlo es una pérdida pequeña; declararlo mal
 * cuesta la credibilidad del sitemap entero.
 */
function gitLastModified(file: string): Date | null {
  const cached = cache.get(file);
  if (cached !== undefined) return cached;

  let result: Date | null = null;
  try {
    const iso = execFileSync("git", ["log", "-1", "--format=%cI", "--", file], {
      cwd: process.cwd(),
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    if (iso) {
      const parsed = new Date(iso);
      if (!Number.isNaN(parsed.getTime())) result = parsed;
    }
  } catch {
    // git no disponible: se queda en `null`.
  }

  cache.set(file, result);
  return result;
}

/** Fecha real del último cambio de la ruta, o `null` si no se puede saber. */
export function lastModifiedFor(id: RouteId): Date | null {
  return gitLastModified(path.posix.normalize(SOURCE[id]));
}
