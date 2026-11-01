import Link from "next/link";
import WhatsAppLink from "@/app/components/WhatsAppLink";
import AdSlot from "@/app/components/blog/AdSlot";
import { pathFor, slugFor, type RouteId } from "@/app/lib/i18n";
import {
  CATEGORY_LABEL,
  formatDate,
  type BlogPost,
} from "@/app/lib/content/blog-posts";

/**
 * Piezas compartidas por la plantilla de artículo y la portada del blog:
 * miniatura, tarjeta, barra lateral y bloque de recomendaciones.
 */

/** Imagen de cada artículo: la misma que genera la ruta Open Graph. */
export function coverFor(id: RouteId): string {
  return `/og/es/${slugFor(id, "es")}`;
}

export function PostCover({
  id,
  alt,
  priority = false,
  className = "",
}: {
  id: RouteId;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    // La imagen la genera nuestra propia ruta `/og`, ya a 1200×630: no hace
    // falta pasarla por el optimizador.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={coverFor(id)}
      alt={alt}
      width={1200}
      height={630}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      className={`w-full aspect-[1200/630] object-cover bg-neutral-100 ${className}`}
    />
  );
}

export function PostCard({ post }: { post: BlogPost }) {
  const href = pathFor(post.id, "es")!;
  return (
    <article className="group flex flex-col rounded-2xl border border-neutral-200 bg-white overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all">
      <Link href={href} tabIndex={-1} aria-hidden="true">
        <PostCover id={post.id} alt="" />
      </Link>
      <div className="flex flex-col flex-1 p-5">
        <p className="text-[11px] font-bold uppercase tracking-widest text-grolow-cream">
          {CATEGORY_LABEL[post.category]}
        </p>
        <h3 className="mt-2 text-lg font-bold leading-snug text-neutral-900">
          <Link href={href} className="group-hover:text-grolow-cream transition-colors">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-neutral-600 leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>
        <time dateTime={post.date} className="mt-auto pt-4 text-xs text-neutral-500">
          {formatDate(post.date)}
        </time>
      </div>
    </article>
  );
}

/** Barra lateral: relacionados, anuncios y la llamada a Grolow. */
export function BlogSidebar({ related }: { related: BlogPost[] }) {
  return (
    <div className="space-y-6">
      {related.length > 0 && (
        <section className="rounded-xl border border-neutral-200 overflow-hidden bg-white">
          <h2 className="bg-grolow-cream text-white px-5 py-3 text-base font-bold">
            Artículos relacionados
          </h2>
          <ul className="divide-y divide-neutral-200">
            {related.map((p) => (
              <li key={p.id}>
                <Link
                  href={pathFor(p.id, "es")!}
                  className="block px-5 py-4 text-[15px] font-semibold leading-snug text-neutral-800 hover:text-grolow-cream hover:bg-neutral-50 transition-colors">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <AdSlot id="sidebar-1" size="rect" />

      {/* Lo que hacemos: el equivalente al «únete al canal» de la referencia. */}
      <section className="rounded-xl border border-grolow-cream/30 overflow-hidden bg-white">
        <h2 className="bg-grolow-cream text-white px-5 py-3 text-base font-bold">
          ¿Tu negocio necesita una web?
        </h2>
        <div className="p-5">
          <p className="text-[15px] text-neutral-600 leading-relaxed">
            Hacemos páginas web, tiendas online y automatizaciones en código
            propio, sin plantillas. Te decimos cuánto costaría sin compromiso.
          </p>
          <WhatsAppLink
            message="Hola, vengo del blog y quiero cotizar una web o una automatización."
            placement="blog-sidebar"
            className="mt-4 flex w-full items-center justify-center rounded-lg bg-grolow-cream text-white font-bold py-3 hover:bg-grolow-accent transition-colors">
            Cotizar por WhatsApp
          </WhatsAppLink>
        </div>
      </section>

      {/* El anuncio alto se queda pegado mientras se lee. */}
      <div className="lg:sticky lg:top-32">
        <AdSlot id="sidebar-2" size="tall" />
      </div>
    </div>
  );
}

/** «Recomendaciones»: va al final de la página, justo antes del footer. */
export function BlogRecommendations({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;
  return (
    <section aria-labelledby="recomendaciones" className="bg-neutral-50 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-20">
        <div className="flex items-end justify-between gap-4 mb-8">
          <h2 id="recomendaciones" className="text-2xl md:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Recomendaciones para ti
          </h2>
          <Link
            href={pathFor("blog", "es")!}
            className="shrink-0 text-sm font-bold text-grolow-cream underline underline-offset-4 hover:text-grolow-brand">
            Ver todo el blog
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
