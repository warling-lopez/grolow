import Link from "next/link";
import WhatsAppLink from "@/app/components/WhatsAppLink";
import { withBrand } from "@/app/components/Brand";
import ArticleActions from "@/app/components/blog/ArticleActions";
import AdSlot from "@/app/components/blog/AdSlot";
import {
  BlogRecommendations,
  BlogSidebar,
  PostCover,
} from "@/app/components/blog/BlogParts";
import { pathFor, urlFor, type Lang, type RouteId } from "@/app/lib/i18n";
import type { PageContent } from "@/app/lib/content/types";
import {
  CATEGORY_LABEL,
  blogPost,
  formatDate,
  recommendedPosts,
  relatedPosts,
} from "@/app/lib/content/blog-posts";

/**
 * Plantilla de los artículos del blog.
 *
 * Estructura de periódico digital, en blanco: migas, fecha, titular,
 * botones de escuchar/compartir, imagen, cuerpo y, a la derecha, una barra
 * lateral con relacionados y espacios para anuncios. Al final,
 * recomendaciones y luego el footer normal del sitio.
 *
 * Componente de servidor: todo el texto sale en el HTML inicial.
 */

const SIDEBAR_COUNT = 4;

function readingMinutes(content: PageContent): number {
  const parts: string[] = [content.h1, ...content.lead];
  for (const s of content.sections) {
    parts.push(s.h2, ...(s.body ?? []));
    for (const b of s.bullets ?? []) parts.push(b.title, b.text);
    for (const sub of s.subsections ?? []) parts.push(sub.h3, ...sub.body);
  }
  for (const f of content.faq ?? []) parts.push(f.q, f.a);
  const words = parts.join(" ").split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

const P = "text-[17px] md:text-lg text-neutral-800 leading-[1.75]";

export default function BlogArticlePage({
  content,
  routeId,
  lang,
}: {
  content: PageContent;
  routeId: RouteId;
  lang: Lang;
}) {
  const { h1, lead, sections, faq, related, cta } = content;
  const post = blogPost(routeId);
  const url = urlFor(routeId, lang)!;
  const minutes = readingMinutes(content);

  const sidebar = relatedPosts(routeId, SIDEBAR_COUNT);
  const recommended = recommendedPosts(routeId, SIDEBAR_COUNT, 4);

  const relatedLinks = (related ?? []).flatMap((link) => {
    const href = pathFor(link.to, lang);
    return href === null ? [] : [{ link, href }];
  });

  return (
    <main className="w-full bg-white text-neutral-900">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-16 md:pb-24">
        {/* ── Migas ── */}
        <nav aria-label="Migas de pan" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-neutral-500 min-w-0">
            <li className="shrink-0">
              <Link href={pathFor("home", lang)!} className="inline-flex min-h-11 items-center text-grolow-cream underline underline-offset-4 hover:text-grolow-brand">
                Inicio
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="shrink-0">
              <Link href={pathFor("blog", lang)!} className="inline-flex min-h-11 items-center text-grolow-cream underline underline-offset-4 hover:text-grolow-brand">
                Blog
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="truncate">
              {post?.title ?? h1}
            </li>
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12">
          {/* ── Columna principal ── */}
          <article className="min-w-0">
            <header>
              <div className="flex flex-wrap items-center gap-2 text-sm">
                {post && (
                  <time
                    dateTime={post.date}
                    className="rounded-md bg-grolow-cream text-white font-bold px-3 py-1">
                    {formatDate(post.date)}
                  </time>
                )}
                {post && (
                  <span className="rounded-md bg-neutral-100 text-neutral-700 font-semibold px-3 py-1">
                    {CATEGORY_LABEL[post.category]}
                  </span>
                )}
                <span className="text-neutral-500">{minutes} min de lectura</span>
              </div>

              {/* Único h1 de la página. */}
              <h1 className="mt-5 font-serif font-black text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.08] tracking-tight text-neutral-900">
                {withBrand(h1)}
              </h1>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-neutral-200 py-4">
                <p className="text-sm text-neutral-600">
                  Por <span className="font-semibold text-neutral-900">Equipo Grolow</span>
                </p>
                <ArticleActions url={url} title={h1} />
              </div>
            </header>

            <figure className="mt-8">
              <PostCover id={routeId} alt={h1} priority className="rounded-xl" />
            </figure>

            <div data-article-body className="mt-10 max-w-3xl">
              <div className="space-y-5">
                {lead.map((paragraph, i) => (
                  <p key={i} className={i === 0 ? "text-xl text-neutral-900 leading-[1.7]" : P}>
                    {withBrand(paragraph)}
                  </p>
                ))}
              </div>

              {sections.map((section, i) => (
                <section key={i} className="mt-12">
                  <h2 className="text-2xl md:text-[1.75rem] font-extrabold tracking-tight text-neutral-900 mb-4">
                    {withBrand(section.h2)}
                  </h2>

                  {section.body && (
                    <div className="space-y-5">
                      {section.body.map((paragraph, j) => (
                        <p key={j} className={P}>
                          {withBrand(paragraph)}
                        </p>
                      ))}
                    </div>
                  )}

                  {section.bullets && (
                    <ul className="mt-5 space-y-4 list-disc pl-6 marker:text-grolow-cream">
                      {section.bullets.map((bullet, j) => {
                        const href = bullet.to ? pathFor(bullet.to, lang) : null;
                        return (
                          <li key={j} className={P}>
                            {href ? (
                              <Link href={href} className="font-bold text-grolow-cream underline underline-offset-4 hover:text-grolow-brand">
                                {withBrand(bullet.title)}
                              </Link>
                            ) : (
                              <strong className="text-neutral-900">{withBrand(bullet.title)}</strong>
                            )}
                            {": "}
                            {withBrand(bullet.text)}
                          </li>
                        );
                      })}
                    </ul>
                  )}

                  {section.subsections && (
                    <div className="mt-6 space-y-8">
                      {section.subsections.map((sub, j) => (
                        <div key={j}>
                          <h3 className="text-xl font-bold text-neutral-900 mb-3">
                            {withBrand(sub.h3)}
                          </h3>
                          <div className="space-y-5">
                            {sub.body.map((paragraph, k) => (
                              <p key={k} className={P}>
                                {withBrand(paragraph)}
                              </p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Un anuncio a mitad del artículo, solo en móvil: ahí la
                      barra lateral queda al final y nadie llega a verla. */}
                  {i === 1 && (
                    <div className="mt-10 lg:hidden max-w-sm mx-auto">
                      <AdSlot id="inline-mobile" size="rect" />
                    </div>
                  )}
                </section>
              ))}

              {faq && faq.length > 0 && (
                <section className="mt-12">
                  <h2 className="text-2xl md:text-[1.75rem] font-extrabold tracking-tight text-neutral-900 mb-4">
                    Preguntas frecuentes
                  </h2>
                  <dl className="divide-y divide-neutral-200 border-y border-neutral-200">
                    {faq.map((item, i) => (
                      <div key={i} className="py-5">
                        <dt className="font-bold text-neutral-900">{withBrand(item.q)}</dt>
                        <dd className="mt-2 text-neutral-700 leading-relaxed">{withBrand(item.a)}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}
            </div>

            {relatedLinks.length > 0 && (
              <section className="mt-12 max-w-3xl rounded-xl bg-neutral-50 border border-neutral-200 p-6">
                <h2 className="text-lg font-extrabold text-neutral-900 mb-3">Seguir leyendo</h2>
                <ul className="space-y-1">
                  {relatedLinks.map(({ link, href }) => (
                    <li key={link.to}>
                      <Link href={href} className="inline-flex min-h-11 items-center font-semibold text-grolow-cream underline underline-offset-4 hover:text-grolow-brand">
                        {withBrand(link.label)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="mt-12 max-w-3xl rounded-2xl bg-grolow-cream text-white p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                {withBrand(cta.heading)}
              </h2>
              <p className="mt-3 text-white/85 leading-relaxed">{withBrand(cta.text)}</p>
              <WhatsAppLink
                message={cta.message}
                placement="blog-cta"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white text-grolow-cream font-bold px-6 py-3 text-sm hover:bg-neutral-100 transition-colors">
                {withBrand(cta.label)}
              </WhatsAppLink>
            </section>
          </article>

          {/* ── Barra lateral ── */}
          <aside aria-label="Barra lateral" className="min-w-0">
            <BlogSidebar related={sidebar} />
          </aside>
        </div>
      </div>

      <BlogRecommendations posts={recommended} />
    </main>
  );
}
