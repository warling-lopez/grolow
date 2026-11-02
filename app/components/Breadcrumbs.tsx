import Link from "next/link";
import { ancestorsFor, pathFor, type Lang, type RouteId } from "@/app/lib/i18n";
import { NAV_LABEL } from "@/app/lib/content/labels";

/**
 * Migas de pan visibles. El `BreadcrumbList` en JSON-LD lo emite la plantilla
 * de página desde la misma cadena de ancestros, así que lo que ve el usuario y
 * lo que lee el buscador no pueden divergir.
 */
export default function Breadcrumbs({
  routeId,
  lang,
}: {
  routeId: RouteId;
  lang: Lang;
}) {
  // Se omite cualquier ancestro que no exista en este idioma, para no emitir
  // un enlace roto en la miga.
  const trail = ancestorsFor(routeId).flatMap((id) => {
    const href = pathFor(id, lang);
    return href === null ? [] : [{ id, href }];
  });

  return (
    <nav
      aria-label={lang === "es" ? "Migas de pan" : "Breadcrumb"}
      className="max-w-7xl mx-auto w-full px-4 md:px-8 pt-6 md:pt-8">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-500">
        <li>
          <Link
            href={pathFor("home", lang)!}
            className="inline-flex min-h-11 items-center hover:text-grolow-cream transition-colors">
            {NAV_LABEL.home[lang]}
          </Link>
        </li>
        {trail.map(({ id, href }) => (
          <li key={id} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            <Link
              href={href}
              className="inline-flex min-h-11 items-center hover:text-grolow-cream transition-colors">
              {NAV_LABEL[id][lang]}
            </Link>
          </li>
        ))}
        <li className="flex items-center gap-2">
          <span aria-hidden="true">/</span>
          {/* La página actual no se enlaza a sí misma. */}
          <span aria-current="page" className="text-neutral-800">
            {NAV_LABEL[routeId][lang]}
          </span>
        </li>
      </ol>
    </nav>
  );
}
