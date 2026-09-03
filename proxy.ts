import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { DEFAULT_LOCALE } from "@/app/lib/i18n";

/**
 * En Next 16 el convenio `middleware` pasó a llamarse `proxy`.
 *
 * Única responsabilidad: mandar la raíz al idioma por defecto. Se usa **307 y
 * no 301** a propósito: el 301 se cachea de forma permanente en el navegador,
 * y eso impediría activar más adelante la negociación por `Accept-Language`
 * sin que los visitantes recurrentes se quedaran clavados en `/es`.
 *
 * Las redirecciones de rutas antiguas (`/catalogos`, `/servicios`…) sí son
 * permanentes y viven en `next.config.ts`, porque ahí sí queremos que se
 * cacheen y que traspasen la autoridad acumulada.
 */
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();

  // PENDIENTE (fase posterior): elegir el idioma leyendo `Accept-Language`
  // en lugar de asumir el idioma por defecto. El 307 de arriba es lo que deja
  // esa puerta abierta.
  url.pathname = `/${DEFAULT_LOCALE}`;

  return NextResponse.redirect(url, 307);
}

export const config = {
  // Solo la raíz. Todo lo demás lo resuelven las rutas o `next.config.ts`.
  matcher: "/",
};
