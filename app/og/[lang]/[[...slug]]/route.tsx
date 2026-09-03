import { ImageResponse } from "next/og";

import {
  LOCALES,
  ROUTE_IDS,
  isLang,
  resolveRoute,
  slugFor,
  type Lang,
} from "@/app/lib/i18n";
import { seoFor } from "@/app/lib/seo-content";
import { contentFor } from "@/app/lib/content";

/**
 * Imagen Open Graph por ruta.
 *
 * Vive en su propia rama del árbol y no como `opengraph-image.tsx` junto a la
 * página porque un catch-all opcional no admite ficheros de metadata por
 * debajo: `/[lang]/[[...slug]]/opengraph-image` rompe el build. Aquí el
 * catch-all sí es el último segmento de la URL, así que es válido.
 *
 * El titular NO viaja en la URL: se resuelve desde el registro de rutas. Si se
 * pasara como parámetro, cualquiera podría generar imágenes con texto
 * arbitrario servidas desde nuestro dominio.
 */

const CREAM = "#F6F1E2";
const INK = "#0E1512";
const GREEN = "#004643";

const TAGLINE: Record<Lang, string> = {
  es: "Código propio, no plantillas · Santo Domingo, RD",
  en: "Real code, not templates · Santo Domingo, DR",
};

const FALLBACK: Record<Lang, string> = {
  es: "Desarrollo web a medida",
  en: "Custom web development",
};

export const size = { width: 1200, height: 630 };

/** Una imagen por página, prerenderizada en build. */
export function generateStaticParams() {
  const params: { lang: string; slug?: string[] }[] = [];
  for (const lang of LOCALES) {
    for (const id of ROUTE_IDS) {
      const slug = slugFor(id, lang);
      if (slug === null) continue;
      params.push({ lang, slug: slug === "" ? [] : slug.split("/") });
    }
  }
  return params;
}

/** Ajusta el cuerpo al largo del titular para que nunca se desborde. */
function fontSizeFor(headline: string): number {
  if (headline.length > 62) return 54;
  if (headline.length > 44) return 66;
  if (headline.length > 30) return 78;
  return 92;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ lang: string; slug?: string[] }> },
) {
  const { lang: rawLang, slug } = await params;
  const lang: Lang = isLang(rawLang) ? rawLang : "es";

  const id = resolveRoute(lang, slug);

  // El h1 real de la página; si la ruta no lo declara como dato, se usa el
  // title sin el sufijo de marca, que es la frase más cercana.
  let headline = FALLBACK[lang];
  if (id) {
    const content = contentFor(id, lang);
    if (content) {
      headline = content.h1;
    } else {
      const seo = seoFor(id, lang);
      if (seo) headline = seo.title.split("|")[0].trim();
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: CREAM,
          padding: "68px 80px",
        }}>
        <div
          style={{
            display: "flex",
            fontSize: 42,
            fontWeight: 800,
            fontStyle: "italic",
            color: INK,
            letterSpacing: "-0.03em",
          }}>
          grolow
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: fontSizeFor(headline),
              fontWeight: 800,
              color: INK,
              lineHeight: 1.05,
              letterSpacing: "-0.035em",
              maxWidth: 1000,
            }}>
            {headline}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 28,
              fontWeight: 500,
              color: GREEN,
            }}>
            {TAGLINE[lang]}
          </div>
        </div>

        <div
          style={{ display: "flex", height: 10, background: GREEN, width: 220 }}
        />
      </div>
    ),
    size,
  );
}
