import type { Metadata } from "next";
import { Noto_Sans_Sundanese } from "next/font/google";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import ClientLayout from "@/app/components/ClientLayout";
import Analytics from "@/app/components/Analytics";
import {
  HTML_LANG,
  LOCALES,
  SITE_URL,
  isLang,
  type Lang,
} from "@/app/lib/i18n";
import { businessPriceRange } from "@/app/lib/pricing";
import {
  AREA_SERVED,
  EMAIL,
  KNOWS_ABOUT,
  ORGANIZATION_ID,
  ORG_SAME_AS,
  PERSON_ID,
  PHONE,
  personNode,
} from "@/app/lib/content/entity";
import "../globals.css";

/**
 * Tipografía del sitio.
 *
 * `Noto Sans Sundanese` es la familia de todo: cuerpo y titulares. Pese al
 * nombre, su versión de Google trae los subsets `latin` y `latin-ext`, así que
 * cubre el español completo (ñ y acentos incluidos); sin `latin-ext` esos
 * caracteres saldrían de la fuente de reserva y el texto se vería con dos
 * tipografías mezcladas.
 *
 * `Sergio Trendy` queda reservada para el rótulo de marca. Va subseteada al
 * latín que puede aparecer en un rótulo: 100 KB de .ttf → 16 KB de .woff2.
 *
 * ⚠️ LICENCIA: el fichero que hay en `public/fonts/sergio_trendy` es la versión
 * demo, y su readme dice «FREE for PERSONAL USE ONLY — NO COMMERCIAL USE
 * ALLOWED». grolow.com es un sitio comercial, así que antes de publicar hay que
 * comprar la licencia en kulokale.com/product/sergio-trendy o cambiar de fuente.
 */
const noto = Noto_Sans_Sundanese({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto",
  display: "swap",
});

const brand = localFont({
  src: "../fonts/sergio-trendy-latin.woff2",
  variable: "--font-brand-face",
  display: "swap",
  // `adjustFontFallback` genera un @font-face de reserva con `size-adjust` y
  // overrides de métricas, para que el texto ocupe lo mismo antes y después de
  // que llegue la fuente real. Estaba en `false`, que es justo lo contrario: el
  // rótulo cambiaba de tamaño al intercambiar y el navegador registraba un
  // candidato de LCP nuevo y mayor en ese instante.
  adjustFontFallback: "Arial",
  fallback: ["Impact", "Haettenschweiler", "sans-serif"],
});

/** Las dos variantes de idioma se generan en build: nada de render dinámico. */
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  // Base para resolver a absoluto cualquier URL relativa de la metadata.
  metadataBase: new URL(SITE_URL),

  // ── Verificación de propiedad ──────────────────────────────────────────
  // Google Search Console y Bing Webmaster Tools son herramientas distintas y
  // hacen falta las dos. Pega aquí el token de cada una y descomenta la línea:
  //
  //   Google  → Search Console › Añadir propiedad › Etiqueta HTML
  //   Bing    → Webmaster Tools › Añadir sitio › Opción 2: etiqueta meta
  //
  // Si ya verificaste Google, Bing permite importar la propiedad desde Search
  // Console y te ahorra el segundo token.
  verification: {
    // google: "PEGA_AQUI_EL_TOKEN_DE_GOOGLE_SEARCH_CONSOLE",
    // other: { "msvalidate.01": "PEGA_AQUI_EL_TOKEN_DE_BING_WEBMASTER_TOOLS" },
  },
};

/**
 * Datos del negocio en JSON-LD. Solo hechos verificables: cualquier campo del
 * que no tengamos dato real se queda fuera en vez de inventarse.
 *
 * Pendientes de dato (ver reporte): `logo` e `image` — `logo.png` devuelve 404;
 * `streetAddress`, `openingHours` y `geo` — sin dirección física publicada.
 */
function businessSchema(lang: Lang) {
  const description =
    lang === "es"
      ? "Estudio de diseño y desarrollo web en Santo Domingo. Sitios y sistemas programados en código propio, sin WordPress ni plantillas."
      : "Web design and development studio in Santo Domingo. Sites and systems written in custom code, no WordPress or templates.";

  const organization = {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "Grolow",
    // Desambigua la marca de sus homónimos en inglés (un cultivar de arbusto y
    // una marca de vino). Sin esto, seis letras sueltas no le dicen nada a un
    // buscador sobre qué clase de entidad es.
    alternateName: [
      "Grolow Studio",
      "Grolow — Estudio de desarrollo web",
      "Grolow Santo Domingo",
    ],
    url: SITE_URL,
    description,
    email: EMAIL,
    telephone: PHONE,
    // Referencia por `@id`, no anidado: el fundador es una entidad con nodo
    // propio en este mismo grafo, así que los artículos pueden firmarlo y los
    // perfiles de `sameAs` quedan atados a él.
    founder: { "@id": PERSON_ID },
    knowsAbout: KNOWS_ABOUT,
    sameAs: ORG_SAME_AS,
  };

  const localBusiness = {
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#localbusiness`,
    name: "Grolow",
    url: SITE_URL,
    description,
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    email: "grolow.web@gmail.com",
    telephone: "+1-829-994-6354",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Santo Domingo",
      addressCountry: "DO",
    },
    // Con grano de ciudad además de país: una consulta con intención local
    // («…en Santiago») no tiene a qué agarrarse si solo se declara el país.
    areaServed: AREA_SERVED,
    // Se calcula desde la tabla de precios, así que no puede quedarse
    // desfasado respecto a lo que dice la página.
    priceRange: businessPriceRange(),
    currenciesAccepted: "USD",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: lang === "es" ? "ventas" : "sales",
        telephone: PHONE,
        email: EMAIL,
        availableLanguage: ["Spanish", "English"],
        areaServed: "DO",
      },
    ],
    sameAs: organization.sameAs,
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Grolow",
    inLanguage: HTML_LANG[lang],
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, personNode(lang), localBusiness, website],
  };
}

export default async function LangRootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <html
      lang={HTML_LANG[lang]}
      className={`${noto.variable} ${brand.variable} bg-grolow-dark`}>
      <body className="antialiased text-grolow-light relative">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(businessSchema(lang)),
          }}
        />
        <ClientLayout>{children}</ClientLayout>
        <Analytics />
      </body>
    </html>
  );
}
