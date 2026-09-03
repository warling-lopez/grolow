import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  LOCALES,
  OG_LOCALE,
  ROUTES,
  ROUTE_IDS,
  alternatesFor,
  isLang,
  ogImageUrl,
  resolveRoute,
  slugFor,
  urlFor,
  type Lang,
  type RouteId,
} from "@/app/lib/i18n";
import { seoFor } from "@/app/lib/seo-content";
import { contentFor } from "@/app/lib/content";
import { pageSchema } from "@/app/lib/schema";

import ContentPage from "@/app/components/pages/ContentPage";
import HomePage from "@/app/components/pages/HomePage";
import ServiciosPage from "@/app/components/pages/ServiciosPage";
import ClinicasPage from "@/app/components/pages/ClinicasPage";
import GraciasPage from "@/app/components/pages/GraciasPage";
import ContactoPage from "@/app/components/pages/ContactoPage";

/**
 * Una sola ruta dinámica sirve todo el sitio. El slug de cada página cambia
 * por idioma (`/es/servicios` vs `/en/services`), y resolverlo contra el
 * registro de `i18n.ts` evita mantener dos árboles de carpetas en paralelo.
 *
 * Las rutas que no aparecen aquí las renderiza `ContentPage` a partir del
 * contenido declarado en `app/lib/content`.
 */
const CUSTOM_PAGES: Partial<Record<RouteId, React.ComponentType>> = {
  home: HomePage,
  servicios: ServiciosPage,
  clinicas: ClinicasPage,
  gracias: GraciasPage,
  contacto: ContactoPage,
};

type RouteParams = { lang: string; slug?: string[] };

/** Prerenderiza cada par (idioma, ruta) que existe. Nada se resuelve en runtime. */
export function generateStaticParams(): RouteParams[] {
  const params: RouteParams[] = [];
  for (const lang of LOCALES) {
    for (const id of ROUTE_IDS) {
      const slug = slugFor(id, lang);
      if (slug === null) continue;
      params.push({ lang, slug: slug === "" ? [] : slug.split("/") });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLang(lang)) return {};

  const id = resolveRoute(lang, slug);
  if (id === null) return {};

  const seo = seoFor(id, lang);
  if (seo === null) return {};

  const indexable = ROUTES[id].index;

  return {
    title: seo.title,
    description: seo.description,
    // Canonical autorreferencial absoluta + hreflang recíprocos, ambos
    // derivados del registro para que no puedan desincronizarse.
    alternates: alternatesFor(id, lang),
    robots: indexable
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      // Imagen propia de cada ruta, con su h1. Se declara a mano porque el
      // fichero vive fuera del catch-all (ver app/og/.../route.tsx).
      images: [
        {
          url: ogImageUrl(id, lang),
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
      type: "website",
      siteName: "Grolow",
      locale: OG_LOCALE[lang as Lang],
      title: seo.title,
      description: seo.description,
      url: urlFor(id, lang as Lang)!,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [ogImageUrl(id, lang)],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { lang, slug } = await params;
  if (!isLang(lang)) notFound();

  const id = resolveRoute(lang, slug);
  if (id === null) notFound();

  const seo = seoFor(id, lang);
  const content = contentFor(id, lang);
  const Custom = CUSTOM_PAGES[id];

  // Una ruta declarada en el registro que no tiene ni componente propio ni
  // contenido en ese idioma no existe: mejor 404 que una página vacía.
  if (!Custom && !content) notFound();

  const schema = seo ? pageSchema(id, lang, seo, content) : null;

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      {Custom ? (
        <Custom />
      ) : (
        <ContentPage content={content!} routeId={id} lang={lang} />
      )}
    </>
  );
}
