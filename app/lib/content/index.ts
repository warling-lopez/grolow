import type { Lang, RouteId } from "@/app/lib/i18n";
import type { ContentTable, PageContent } from "./types";

import { desarrolloWebContent } from "./desarrollo-web";
import { disenoWebContent } from "./diseno-web";
import { softwareContent } from "./software";
import { tiendaWhatsappContent } from "./tienda-whatsapp";
import { appsContent } from "./apps";
import { empresasContent } from "./empresas";
import { consultoresContent } from "./consultores";
import { creadoresContent } from "./creadores";
import { preciosContent } from "./precios";
import { casosContent } from "./casos";
import { blogContent } from "./blog";
import { privacidadContent, cookiesContent, terminosContent } from "./legal";
import { blogPreciosContent } from "./blog-precios";
import { blogWordpressContent } from "./blog-wordpress";
import {
  casoLaperfumContent,
  casoHellensContent,
  casoWarlingContent,
} from "./case-studies";

/**
 * Rutas cuyo contenido renderiza la plantilla `ContentPage`. Las que no están
 * aquí (portada, contacto, gracias…) tienen componente propio porque incluyen
 * piezas interactivas.
 */
const CONTENT: Partial<Record<RouteId, ContentTable>> = {
  desarrolloWeb: desarrolloWebContent,
  disenoWeb: disenoWebContent,
  software: softwareContent,
  tiendaWhatsapp: tiendaWhatsappContent,
  apps: appsContent,
  empresas: empresasContent,
  consultores: consultoresContent,
  creadores: creadoresContent,
  precios: preciosContent,
  casos: casosContent,
  casoLaperfum: casoLaperfumContent,
  casoHellens: casoHellensContent,
  casoWarling: casoWarlingContent,
  blog: blogContent,
  blogPrecios: blogPreciosContent,
  blogWordpress: blogWordpressContent,
  privacidad: privacidadContent,
  cookies: cookiesContent,
  terminos: terminosContent,
};

export function contentFor(id: RouteId, lang: Lang): PageContent | null {
  return CONTENT[id]?.[lang] ?? null;
}

export function hasContent(id: RouteId): boolean {
  return id in CONTENT;
}
