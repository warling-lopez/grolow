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
  clinicas: "app/components/pages/ClinicasPage.tsx",
  gracias: "app/components/pages/GraciasPage.tsx",
};

const cache = new Map<string, Date>();

/** Fecha del último commit que modificó el fichero, o la de build si falla. */
function gitLastModified(file: string): Date {
  const cached = cache.get(file);
  if (cached) return cached;

  let result = new Date();
  try {
    const iso = execFileSync("git", ["log", "-1", "--format=%cI", "--", file], {
      cwd: process.cwd(),
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    // Fichero sin commits todavía (recién creado): sale cadena vacía.
    if (iso) result = new Date(iso);
  } catch {
    // Sin git disponible en el entorno de build: se cae a la fecha de build.
  }

  cache.set(file, result);
  return result;
}

export function lastModifiedFor(id: RouteId): Date {
  return gitLastModified(path.posix.normalize(SOURCE[id]));
}
