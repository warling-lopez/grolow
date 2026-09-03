import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { pathFor, whatsappHref, type Lang, type RouteId } from "@/app/lib/i18n";
import type { PageContent } from "@/app/lib/content/types";

/**
 * Plantilla única de las páginas de servicio, segmento y utilidad.
 *
 * Es un componente de servidor: todo el texto sale ya en el HTML inicial, que
 * es la condición que Bing impone para poder clasificar la página.
 */
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

  return (
    <main className="w-full pb-24">
      <Breadcrumbs routeId={routeId} lang={lang} />

      <header className="max-w-5xl mx-auto w-full px-4 md:px-8 pt-8 md:pt-10">
        {eyebrow && (
          <p className="text-xs font-mono uppercase tracking-widest text-grolow-light/40 mb-3">
            {eyebrow}
          </p>
        )}
        {/* Único h1 de la página. */}
        <h1 className="text-[clamp(2rem,5.5vw,4rem)] font-black uppercase text-grolow-light leading-[1.02] tracking-tight">
          {h1}
        </h1>
        <div className="mt-6 space-y-4 max-w-3xl">
          {lead.map((paragraph, i) => (
            <p
              key={i}
              className="text-base md:text-lg text-grolow-light/80 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </header>

      <div className="max-w-5xl mx-auto w-full px-4 md:px-8 mt-14 md:mt-20 space-y-14 md:space-y-20">
        {sections.map((section, i) => (
          <section key={i} className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-extrabold text-grolow-light tracking-tight mb-5">
              {section.h2}
            </h2>

            {section.body && (
              <div className="space-y-4">
                {section.body.map((paragraph, j) => (
                  <p
                    key={j}
                    className="text-base text-grolow-light/75 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            {section.bullets && (
              <ul className="mt-6 space-y-5">
                {section.bullets.map((bullet, j) => (
                  <li
                    key={j}
                    className="border-l-2 border-grolow-cream/40 pl-4">
                    <p className="font-bold text-grolow-light">{bullet.title}</p>
                    <p className="text-grolow-light/70 leading-relaxed mt-1">
                      {bullet.text}
                    </p>
                  </li>
                ))}
              </ul>
            )}

            {section.subsections && (
              <div className="mt-8 space-y-8">
                {section.subsections.map((sub, j) => (
                  <div key={j}>
                    <h3 className="text-lg md:text-xl font-bold text-grolow-light mb-3">
                      {sub.h3}
                    </h3>
                    <div className="space-y-4">
                      {sub.body.map((paragraph, k) => (
                        <p
                          key={k}
                          className="text-base text-grolow-light/75 leading-relaxed">
                          {paragraph}
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
          <section className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-extrabold text-grolow-light tracking-tight mb-6">
              {lang === "es" ? "Preguntas frecuentes" : "Frequently asked questions"}
            </h2>
            <dl className="space-y-6">
              {faq.map((item, i) => (
                <div key={i} className="border-t border-grolow-light/10 pt-5">
                  <dt className="font-bold text-grolow-light">{item.q}</dt>
                  <dd className="text-grolow-light/70 leading-relaxed mt-2">
                    {item.a}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {related && related.length > 0 && (
          <section className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-extrabold text-grolow-light tracking-tight mb-5">
              {lang === "es" ? "Seguir leyendo" : "Keep reading"}
            </h2>
            <ul className="space-y-3">
              {related.map((link) => (
                <li key={link.to}>
                  {/* Anchor text descriptivo: dice a dónde lleva. */}
                  <Link
                    href={pathFor(link.to, lang)!}
                    className="text-grolow-cream font-semibold underline underline-offset-4 hover:text-grolow-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="max-w-3xl border-t border-grolow-light/10 pt-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-grolow-light tracking-tight">
            {cta.heading}
          </h2>
          <p className="text-grolow-light/75 leading-relaxed mt-4">{cta.text}</p>
          <a
            href={whatsappHref(cta.message)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 rounded-full bg-grolow-light text-grolow-dark font-bold px-6 py-3 text-sm hover:bg-grolow-cream hover:text-white transition-colors">
            {cta.label}
          </a>
        </section>
      </div>
    </main>
  );
}
