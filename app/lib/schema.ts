import {
  HTML_LANG,
  ROUTES,
  SITE_URL,
  ancestorsFor,
  urlFor,
  type Lang,
  type RouteId,
} from "@/app/lib/i18n";
import { NAV_LABEL } from "@/app/lib/content/labels";
import { HOME_FAQ_EN, HOME_FAQ_ES, type Faq } from "@/app/lib/content/home-faq";
import { lastModifiedFor } from "@/app/lib/lastmod";
import type { PageContent } from "@/app/lib/content/types";
import type { SeoEntry } from "@/app/lib/seo-content";

/**
 * Datos estructurados por tipo de página.
 *
 * Todo se deriva del registro de rutas y del contenido ya escrito: el schema no
 * puede afirmar algo que la página no diga, que es el error que hace que
 * Google marque los datos como engañosos.
 */

const ORGANIZATION_ID = `${SITE_URL}/#organization`;

function breadcrumbList(id: RouteId, lang: Lang) {
  const trail: RouteId[] = ["home", ...ancestorsFor(id), id];

  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((routeId, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: NAV_LABEL[routeId][lang],
      item: urlFor(routeId, lang),
    })),
  };
}

function faqPage(items: Faq[] | undefined) {
  if (!items || items.length === 0) return null;
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

function serviceNode(id: RouteId, lang: Lang, seo: SeoEntry, content: PageContent) {
  return {
    "@type": "Service",
    "@id": `${urlFor(id, lang)}#service`,
    name: content.h1,
    description: seo.description,
    serviceType: NAV_LABEL[id][lang],
    provider: { "@id": ORGANIZATION_ID },
    areaServed: { "@type": "Country", name: "República Dominicana" },
    url: urlFor(id, lang),
  };
}

/**
 * Los dos planes publicados en la página de precios. Son los mismos números
 * que aparecen en el texto: si cambian ahí, tienen que cambiar aquí.
 */
function offerNodes(lang: Lang) {
  return [
    {
      "@type": "Offer",
      name: lang === "es" ? "Plan mensual" : "Monthly plan",
      description:
        lang === "es"
          ? "Sitio a medida con dominio, alojamiento y mantenimiento incluidos. US$150 de setup y US$45 al mes."
          : "Custom site with domain, hosting and maintenance included. US$150 setup and US$45 per month.",
      price: "45.00",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    {
      "@type": "Offer",
      name: lang === "es" ? "Pago único" : "One-time payment",
      description:
        lang === "es"
          ? "El mismo sistema pagado de una vez. El código queda contigo."
          : "The same system paid at once. The code stays with you.",
      price: "550.00",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  ];
}

function articleNode(id: RouteId, lang: Lang, seo: SeoEntry, content: PageContent) {
  const modified = lastModifiedFor(id).toISOString();
  return {
    "@type": "Article",
    "@id": `${urlFor(id, lang)}#article`,
    headline: content.h1,
    description: seo.description,
    inLanguage: HTML_LANG[lang],
    // Sin fecha de publicación inventada: se usa la del último cambio real
    // registrado en el repositorio para ambos campos.
    datePublished: modified,
    dateModified: modified,
    author: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
    mainEntityOfPage: urlFor(id, lang),
  };
}

/** Grafo JSON-LD de una página. `null` si no hay nada que declarar. */
export function pageSchema(
  id: RouteId,
  lang: Lang,
  seo: SeoEntry,
  content: PageContent | null,
): object | null {
  const nodes: object[] = [];

  // Las migas van en todas las internas.
  if (id !== "home") nodes.push(breadcrumbList(id, lang));

  const kind = ROUTES[id].schema;

  // La portada ya trae 10 preguntas escritas; marcarlas es lo que puede
  // generar resultados expandidos sin escribir contenido nuevo.
  if (kind === "home") {
    const faq = faqPage(lang === "en" ? HOME_FAQ_EN : HOME_FAQ_ES);
    if (faq) nodes.push(faq);
  }

  if (content) {
    if (kind === "service") {
      nodes.push(serviceNode(id, lang, seo, content));
    }

    if (kind === "offer") {
      nodes.push({
        "@type": "Service",
        "@id": `${urlFor(id, lang)}#service`,
        name: content.h1,
        description: seo.description,
        provider: { "@id": ORGANIZATION_ID },
        areaServed: { "@type": "Country", name: "República Dominicana" },
        offers: offerNodes(lang),
      });
    }

    if (kind === "article") {
      nodes.push(articleNode(id, lang, seo, content));
    }

    if (kind === "collection") {
      nodes.push({
        "@type": "CollectionPage",
        "@id": `${urlFor(id, lang)}#collection`,
        name: content.h1,
        description: seo.description,
        inLanguage: HTML_LANG[lang],
        isPartOf: { "@id": `${SITE_URL}/#website` },
      });
    }

    const faq = faqPage(content.faq);
    if (faq) nodes.push(faq);
  }

  if (nodes.length === 0) return null;
  return { "@context": "https://schema.org", "@graph": nodes };
}
