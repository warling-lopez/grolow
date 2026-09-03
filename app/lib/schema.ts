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
import { TIERS } from "@/app/lib/pricing";
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
  // Se omite cualquier eslabón que no exista en este idioma: una entrada con
  // `item` nulo invalida el BreadcrumbList entero en los validadores.
  const trail = (["home", ...ancestorsFor(id), id] as RouteId[]).flatMap(
    (routeId) => {
      const url = urlFor(routeId, lang);
      return url === null ? [] : [{ routeId, url }];
    },
  );

  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map(({ routeId, url }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: NAV_LABEL[routeId][lang],
      item: url,
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
 * Ofertas derivadas de la tabla de precios. Los números son exactamente los
 * mismos que ve el visitante en la página: si cambian en `pricing.ts`, cambian
 * aquí solos.
 */
function offerNodes(lang: Lang) {
  return TIERS.map((tier) => {
    const base = {
      "@type": "Offer",
      name: tier.name[lang],
      description: tier.what[lang],
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    };

    if (tier.hourly !== undefined) {
      return {
        ...base,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: tier.hourly,
          priceCurrency: "USD",
          // Código UN/CEFACT de "hora": lo que espera schema.org.
          unitCode: "HUR",
        },
      };
    }

    // Los proyectos por fases no llevan precio: declarar uno inventado sería
    // peor que no declararlo.
    if (tier.min === undefined) return base;

    return {
      ...base,
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: tier.min,
        maxPrice: tier.max,
        priceCurrency: "USD",
      },
    };
  });
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
