import Link from "next/link";
import WhatsAppLink from "@/app/components/WhatsAppLink";
import { withBrand } from "@/app/components/Brand";
import AdSlot from "@/app/components/blog/AdSlot";
import { PostCard, PostCover } from "@/app/components/blog/BlogParts";
import { pathFor, type Lang } from "@/app/lib/i18n";
import type { PageContent } from "@/app/lib/content/types";
import {
  BLOG_POSTS,
  CATEGORY_LABEL,
  blogPost,
  formatDate,
  type BlogPost,
} from "@/app/lib/content/blog-posts";

/**
 * Portada del blog, con el mismo lenguaje que los artículos: fondo blanco,
 * artículo destacado arriba, las secciones de `blog.ts` como rejillas de
 * tarjetas y anuncios en la columna derecha.
 */
export default function BlogIndexPage({
  content,
  lang,
}: {
  content: PageContent;
  lang: Lang;
}) {
  const { h1, lead, sections, cta } = content;
  const featured = BLOG_POSTS[0];

  return (
    <main className="w-full bg-white text-neutral-900">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-10 pb-16 md:pb-24">
        <header className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-grolow-cream">Blog</p>
          <h1 className="mt-3 font-serif font-black text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.08] tracking-tight">
            {withBrand(h1)}
          </h1>
          <div className="mt-5 space-y-3">
            {lead.map((p, i) => (
              <p key={i} className="text-lg text-neutral-700 leading-relaxed">
                {withBrand(p)}
              </p>
            ))}
          </div>
        </header>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
          <div className="min-w-0 space-y-16">
            {featured && (
              <article className="group grid gap-6 md:grid-cols-2 md:items-center">
                <Link href={pathFor(featured.id, lang)!} tabIndex={-1} aria-hidden="true" className="block overflow-hidden rounded-xl">
                  <PostCover image={featured.image} decorative priority sizes="(min-width: 1024px) 420px, 100vw" />
                </Link>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-grolow-cream">
                    Destacado · {CATEGORY_LABEL[featured.category]}
                  </p>
                  <h2 className="mt-2 text-2xl md:text-3xl font-extrabold leading-tight">
                    <Link href={pathFor(featured.id, lang)!} className="group-hover:text-grolow-cream transition-colors">
                      {featured.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-neutral-600 leading-relaxed">{featured.excerpt}</p>
                  <time dateTime={featured.date} className="mt-4 block text-sm text-neutral-500">
                    {formatDate(featured.date)}
                  </time>
                </div>
              </article>
            )}

            {sections.map((section, i) => {
              const posts = (section.bullets ?? [])
                .map((b) => (b.to ? blogPost(b.to) : undefined))
                .filter((p): p is BlogPost => !!p);
              return (
                <section key={i}>
                  <h2 className="text-2xl font-extrabold tracking-tight border-b-2 border-grolow-cream pb-3 mb-6">
                    {withBrand(section.h2)}
                  </h2>
                  {section.body?.map((p, j) => (
                    <p key={j} className="mb-4 text-neutral-700 leading-relaxed max-w-3xl">
                      {withBrand(p)}
                    </p>
                  ))}
                  {posts.length > 0 && (
                    <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                      {posts.map((p) => (
                        <PostCard key={p.id} post={p} />
                      ))}
                    </div>
                  )}
                </section>
              );
            })}

            <section className="rounded-2xl bg-grolow-cream text-white p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">{withBrand(cta.heading)}</h2>
              <p className="mt-3 text-white/85 leading-relaxed max-w-2xl">{withBrand(cta.text)}</p>
              <WhatsAppLink
                message={cta.message}
                placement="blog-cta"
                className="mt-6 inline-flex items-center rounded-full bg-white text-grolow-cream font-bold px-6 py-3 text-sm hover:bg-neutral-100 transition-colors">
                {withBrand(cta.label)}
              </WhatsAppLink>
            </section>
          </div>

          <aside aria-label="Barra lateral" className="min-w-0 space-y-6">
            <AdSlot id="blog-home-1" size="rect" />
            <div className="lg:sticky lg:top-32">
              <AdSlot id="blog-home-2" size="tall" />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
