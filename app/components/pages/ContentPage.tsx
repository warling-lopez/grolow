import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import WhatsAppLink from "@/app/components/WhatsAppLink";
import { pathFor, type Lang, type RouteId } from "@/app/lib/i18n";
import type { PageContent } from "@/app/lib/content/types";
import { withBrand } from "@/app/components/Brand";

/**
 * Plantilla única de las páginas de servicio, segmento y utilidad.
 *
 * Mismo lenguaje que el blog: fondo blanco, titular serif, secciones con una
 * línea de marca debajo del h2 y, en escritorio, una columna lateral fija con
 * la llamada a cotizar.
 *
 * Es un componente de servidor: todo el texto sale ya en el HTML inicial, que
 * es la condición que Bing impone para poder clasificar la página.
 */

const ASIDE = {
  es: {
    title: "¿Hablamos de tu proyecto?",
    text: "Te devolvemos una propuesta con alcance, precio cerrado y fecha de entrega en menos de 24 horas.",
    whatsapp: "Escribir por WhatsApp",
    message: "Hola, vi la web de Grolow y quiero cotizar un proyecto.",
    form: "Solicitar propuesta",
    faq: "Preguntas frecuentes",
    related: "Seguir leyendo",
  },
  en: {
    title: "Shall we talk about your project?",
    text: "We send back a proposal with scope, fixed price and delivery date in under 24 hours.",
    whatsapp: "Message us on WhatsApp",
    message: "Hi, I saw the Grolow website and I'd like a quote for a project.",
    form: "Request a proposal",
    faq: "Frequently asked questions",
    related: "Keep reading",
  },
} as const;

/** h2 de sección: el mismo que usa el blog para cada bloque. */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl md:text-[1.75rem] font-extrabold tracking-tight text-neutral-900 border-b-2 border-grolow-cream pb-3 mb-6">
      {children}
    </h2>
  );
}

export default function ContentPage({
  content,
  routeId,
  lang,
}: {
  content: PageContent;
  routeId: RouteId;
  lang: Lang;
}) {
  const { eyebrow, h1, lead, sections, faq, related, cta } = content;
  const a = ASIDE[lang];
  const contacto = pathFor("contacto", lang);

  // Un enlace relacionado puede apuntar a una ruta que no existe en este
  // idioma (el blog, por ejemplo, solo está en español). Se descarta en vez de
  // renderizar un href vacío.
  const relatedLinks = (related ?? []).flatMap((link) => {
    const href = pathFor(link.to, lang);
    return href === null ? [] : [{ link, href }];
  });

  return (
    <main className="w-full bg-white text-neutral-900 pb-20 md:pb-28">
      <Breadcrumbs routeId={routeId} lang={lang} />

      <div className="max-w-7xl mx-auto w-full px-4 md:px-8">
        <header className="max-w-3xl pt-4 md:pt-6">
          {eyebrow && (
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-grolow-cream">
              {eyebrow}
            </p>
          )}
          {/* Único h1 de la página. */}
          <h1 className="mt-3 font-serif font-black text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.08] tracking-tight text-neutral-900">
            {withBrand(h1)}
          </h1>
          <div className="mt-5 space-y-3">
            {lead.map((paragraph, i) => (
              <p key={i} className="text-lg text-neutral-700 leading-relaxed">
                {withBrand(paragraph)}
              </p>
            ))}
          </div>
        </header>

        <div className="mt-12 md:mt-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
          <div className="min-w-0 max-w-3xl space-y-14 md:space-y-16">
            {sections.map((section, i) => (
              <section key={i}>
                <SectionTitle>{withBrand(section.h2)}</SectionTitle>

                {section.body && (
                  <div className="space-y-4">
                    {section.body.map((paragraph, j) => (
                      <p key={j} className="text-[1.0625rem] text-neutral-700 leading-relaxed">
                        {withBrand(paragraph)}
                      </p>
                    ))}
                  </div>
                )}

                {section.bullets && (
                  <ul className="mt-6 grid gap-4">
                    {section.bullets.map((bullet, j) => {
                      const href = bullet.to ? pathFor(bullet.to, lang) : null;
                      return (
                        <li
                          key={j}
                          className="rounded-xl border border-neutral-200 bg-neutral-50 px-5 py-4">
                          {/* Si el bullet describe otra página, el enlace va en
                              el nombre: es mejor anchor text que un «ver más». */}
                          {href ? (
                            <Link
                              href={href}
                              className="font-bold text-grolow-cream underline underline-offset-4 hover:text-grolow-brand transition-colors">
                              {withBrand(bullet.title)}
                            </Link>
                          ) : (
                            <p className="font-bold text-neutral-900">{withBrand(bullet.title)}</p>
                          )}
                          <p className="text-neutral-600 leading-relaxed mt-1">
                            {withBrand(bullet.text)}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                )}

                {section.subsections && (
                  <div className="mt-8 space-y-8">
                    {section.subsections.map((sub, j) => (
                      <div key={j}>
                        <h3 className="text-lg md:text-xl font-bold text-neutral-900 mb-3">
                          {withBrand(sub.h3)}
                        </h3>
                        <div className="space-y-4">
                          {sub.body.map((paragraph, k) => (
                            <p key={k} className="text-[1.0625rem] text-neutral-700 leading-relaxed">
                              {withBrand(paragraph)}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}

            {faq && faq.length > 0 && (
              <section>
                <SectionTitle>{a.faq}</SectionTitle>
                <dl className="divide-y divide-neutral-200 border-y border-neutral-200">
                  {faq.map((item, i) => (
                    <div key={i} className="py-5">
                      <dt className="font-bold text-neutral-900">{withBrand(item.q)}</dt>
                      <dd className="text-neutral-600 leading-relaxed mt-2">{withBrand(item.a)}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            {relatedLinks.length > 0 && (
              <section>
                <SectionTitle>{a.related}</SectionTitle>
                <ul className="grid gap-2">
                  {relatedLinks.map(({ link, href }) => (
                    <li key={link.to}>
                      {/* Anchor text descriptivo: dice a dónde lleva. */}
                      <Link
                        href={href}
                        className="group inline-flex min-h-11 items-center gap-2 font-semibold text-grolow-cream hover:text-grolow-brand transition-colors">
                        <span className="underline underline-offset-4">{withBrand(link.label)}</span>
                        <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Llamada final: franja de marca, como el cierre de un artículo. */}
            <section className="rounded-2xl bg-grolow-cream text-white px-6 py-8 md:px-10 md:py-10">
              <h2 className="font-serif font-black text-2xl md:text-3xl leading-tight">
                {withBrand(cta.heading)}
              </h2>
              <p className="mt-3 text-white/85 leading-relaxed">{withBrand(cta.text)}</p>
              <WhatsAppLink
                message={cta.message}
                placement="page-cta"
                className="inline-flex items-center gap-2 mt-6 rounded-full bg-white text-neutral-900 font-bold px-6 py-3 text-sm hover:bg-neutral-100 transition-colors">
                {withBrand(cta.label)}
              </WhatsAppLink>
            </section>
          </div>

          {/* Columna lateral: la cotización siempre a mano mientras se lee. */}
          <aside className="hidden lg:block">
            <div className="sticky top-32 rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-grolow-cream">Grolow</p>
              <p className="mt-3 font-serif font-black text-2xl leading-tight text-neutral-900">{a.title}</p>
              <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{a.text}</p>
              <WhatsAppLink
                message={a.message}
                placement="page-aside"
                className="mt-5 flex w-full items-center justify-center rounded-full bg-neutral-900 text-white text-sm font-bold px-5 py-3 hover:bg-grolow-cream transition-colors">
                {a.whatsapp}
              </WhatsAppLink>
              {contacto && (
                <Link
                  href={contacto}
                  className="mt-3 flex w-full items-center justify-center rounded-full border border-neutral-300 text-neutral-900 text-sm font-bold px-5 py-3 hover:border-neutral-900 transition-colors">
                  {a.form}
                </Link>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
