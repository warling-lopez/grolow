import type { Metadata } from "next";
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
import "../globals.css";

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
    "@id": `${SITE_URL}/#organization`,
    name: "Grolow",
    url: SITE_URL,
    description,
    email: "grolow.web@gmail.com",
    telephone: "+1-829-994-6354",
    founder: {
      "@type": "Person",
      name: "Warling López",
      jobTitle: "Full-Stack Developer & Founder",
      url: `${SITE_URL}/ceo-warling`,
    },
    sameAs: [
      "https://www.facebook.com/share/1KWFa6vDno/?mibextid=wwXIfr",
      "https://www.instagram.com/grolow.studio/",
    ],
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
    areaServed: { "@type": "Country", name: "República Dominicana" },
    // Rango real publicado en la página de planes: US$150 de setup y desde
    // US$550 el pago único.
    priceRange: "US$150–US$550",
    currenciesAccepted: "USD",
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
    "@graph": [organization, localBusiness, website],
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
    <html lang={HTML_LANG[lang]} className="bg-grolow-dark">
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
