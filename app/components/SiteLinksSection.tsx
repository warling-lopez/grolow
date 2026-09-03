"use client";

import Link from "next/link";
import { useLang } from "@/app/components/hooks/useLang";
import { pathFor, type Lang, type RouteId } from "@/app/lib/i18n";

/**
 * Enlaces de la portada hacia las páginas de servicio y de segmento.
 *
 * El anchor text describe el destino en lugar de decir «ver más»: es lo que
 * usan los buscadores para entender de qué trata la página enlazada, y es la
 * única señal interna que tenemos para repartir autoridad desde la portada.
 */
type Entry = { to: RouteId; label: Record<Lang, string>; blurb: Record<Lang, string> };

const SERVICES: Entry[] = [
  {
    to: "desarrolloWeb",
    label: { es: "Desarrollo web a medida", en: "Custom web development" },
    blurb: {
      es: "Sitios programados desde cero, sin plantillas ni constructores.",
      en: "Sites written from scratch, no templates and no builders.",
    },
  },
  {
    to: "disenoWeb",
    label: { es: "Diseño web en Santo Domingo", en: "Web design in Santo Domingo" },
    blurb: {
      es: "Diseño y código en el mismo equipo, pensado para móvil primero.",
      en: "Design and code in the same hands, built mobile-first.",
    },
  },
  {
    to: "software",
    label: {
      es: "Desarrollo de software a medida",
      en: "Custom software development",
    },
    blurb: {
      es: "Paneles internos, reservas, inventario e integraciones.",
      en: "Internal dashboards, bookings, inventory and integrations.",
    },
  },
  {
    to: "tiendaWhatsapp",
    label: {
      es: "Tienda en línea con pedidos por WhatsApp",
      en: "Online store with WhatsApp ordering",
    },
    blurb: {
      es: "Tu catálogo en un enlace y los pedidos armados en tu WhatsApp.",
      en: "Your catalog in one link and orders assembled on your WhatsApp.",
    },
  },
  {
    to: "apps",
    label: { es: "Aplicaciones móviles", en: "Mobile apps" },
    blurb: {
      es: "Android e iPhone desde una sola base de código.",
      en: "Android and iPhone from a single codebase.",
    },
  },
];

const SEGMENTS: Entry[] = [
  {
    to: "empresas",
    label: { es: "Sitios web para empresas", en: "Websites for companies" },
    blurb: {
      es: "Para empresas con operación y equipo cuyo sitio se quedó atrás.",
      en: "For companies with a real operation whose site fell behind.",
    },
  },
  {
    to: "consultores",
    label: {
      es: "Sitios web para consultoras",
      en: "Websites for consultancies",
    },
    blurb: {
      es: "Para quien vende criterio y necesita que lo tomen en serio antes de la llamada.",
      en: "For people selling judgment who need credibility before the call.",
    },
  },
  {
    to: "creadores",
    label: { es: "Sitios web para creadores", en: "Websites for creators" },
    blurb: {
      es: "Para creadores que ya venden cursos, membresías o productos digitales.",
      en: "For creators already selling courses, memberships or digital products.",
    },
  },
];

const COPY = {
  es: {
    servicesTitle: "Lo que construimos",
    segmentsTitle: "Para quién lo construimos",
    prices: "Cuánto cuesta una página web en República Dominicana",
    cases: "Casos de éxito con proyectos que puedes abrir y revisar",
    blog: "Artículos sobre precios y tecnología en el mercado dominicano",
  },
  en: {
    servicesTitle: "What we build",
    segmentsTitle: "Who we build it for",
    prices: "What a website costs in the Dominican Republic",
    cases: "Case studies you can open and inspect yourself",
    blog: "Artículos sobre precios y tecnología (en español)",
  },
} as const;

function LinkGrid({ entries, lang }: { entries: Entry[]; lang: Lang }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2">
      {entries.map((entry) => (
        <li key={entry.to}>
          <Link
            href={pathFor(entry.to, lang)!}
            className="block border-l-2 border-grolow-cream/40 pl-4 hover:border-grolow-cream transition-colors group">
            <span className="font-bold text-grolow-light group-hover:text-grolow-cream transition-colors">
              {entry.label[lang]}
            </span>
            <span className="block text-sm text-grolow-light/75 mt-1 leading-relaxed">
              {entry.blurb[lang]}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function SiteLinksSection() {
  const lang = useLang();
  const c = COPY[lang];

  return (
    <section className="max-w-5xl mx-auto w-full px-4 md:px-8 py-16 md:py-24">
      <h2 className="text-2xl md:text-4xl font-black uppercase text-grolow-light tracking-tight mb-8">
        {c.servicesTitle}
      </h2>
      <LinkGrid entries={SERVICES} lang={lang} />

      <h2 className="text-2xl md:text-4xl font-black uppercase text-grolow-light tracking-tight mt-16 mb-8">
        {c.segmentsTitle}
      </h2>
      <LinkGrid entries={SEGMENTS} lang={lang} />

      <div className="mt-12 flex flex-col gap-3">
        <Link
          href={pathFor("precios", lang)!}
          className="text-grolow-cream font-semibold underline underline-offset-4 hover:text-grolow-accent transition-colors">
          {c.prices}
        </Link>
        <Link
          href={pathFor("casos", lang)!}
          className="text-grolow-cream font-semibold underline underline-offset-4 hover:text-grolow-accent transition-colors">
          {c.cases}
        </Link>
        {/* El blog solo existe en español: se enlaza a /es/blog desde ambos
            idiomas en vez de generar una variante inglesa vacía. */}
        <Link
          href={pathFor("blog", "es")!}
          className="text-grolow-cream font-semibold underline underline-offset-4 hover:text-grolow-accent transition-colors">
          {c.blog}
        </Link>
      </div>
    </section>
  );
}
