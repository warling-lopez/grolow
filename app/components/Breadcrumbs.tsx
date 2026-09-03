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
  const trail = ancestorsFor(routeId);

  return (
    <nav
      aria-label={lang === "es" ? "Migas de pan" : "Breadcrumb"}
      className="max-w-5xl mx-auto w-full px-4 md:px-8 pt-28 md:pt-32">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-grolow-light/50">
        <li>
          <Link
            href={pathFor("home", lang)!}
            className="hover:text-grolow-light transition-colors">
            {NAV_LABEL.home[lang]}
          </Link>
        </li>
        {trail.map((id) => (
          <li key={id} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            <Link
              href={pathFor(id, lang)!}
              className="hover:text-grolow-light transition-colors">
              {NAV_LABEL[id][lang]}
            </Link>
          </li>
        ))}
        <li className="flex items-center gap-2">
          <span aria-hidden="true">/</span>
          {/* La página actual no se enlaza a sí misma. */}
          <span aria-current="page" className="text-grolow-light/80">
            {NAV_LABEL[routeId][lang]}
          </span>
        </li>
      </ol>
    </nav>
  );
}
