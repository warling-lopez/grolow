import Image from "next/image";
import Link from "next/link";
import Brand from "@/app/components/Brand";
import { pathFor, type Lang } from "@/app/lib/i18n";

/**
 * Hero de portada: rótulo a la izquierda, mosaico de trabajo real a la derecha.
 *
 * Server Component a propósito. Llevaba `'use client'` sin usar una sola API
 * de cliente —ni estado, ni efectos, ni manejadores— y eso metía todo el
 * bloque, sus datos y sus dependencias en el bundle que el navegador tiene que
 * descargar, parsear e hidratar ANTES de poder pintar. El elemento LCP de la
 * página vive aquí, así que era el peor sitio posible para pagar ese coste.
 *
 * Sustituye a `Hero2`, cuyo mosaico ocupaba el fondo entero detrás de un velo
 * al 97% de opacidad: se pagaban seis imágenes para que casi no se vieran. Aquí
 * las capturas son el argumento —son el portafolio— así que van al frente, sin
 * velo, y el texto vive en su propia columna.
 *
 * Sobre la prueba social: la referencia que inspira este bloque enseña ahí un
 * «5.0 · Top Rated en Google». Grolow no tiene todavía perfil de Google
 * Business, así que ese hueco lo ocupa un dato que sí se puede comprobar —los
 * proyectos que están en producción— enlazado a los casos. En cuanto exista el
 * perfil con reseñas reales, este es el sitio donde va el rating.
 */

type Project = { src: string; name: string; kind: Record<Lang, string> };

const PROJECTS: Project[] = [
  { src: "/projects/laperfum.webp", name: "La Perfurm RD", kind: { es: "Pedidos por WhatsApp", en: "WhatsApp ordering" } },
  { src: "/projects/hellenscute.webp", name: "Hellen's Cute Kids", kind: { es: "Ruteo de leads por zona", en: "Lead routing by area" } },
  { src: "/projects/aromacaribenio.webp", name: "Aroma Caribeño", kind: { es: "Catálogo", en: "Catalogue" } },
  { src: "/projects/warling.webp", name: "Warling Dev", kind: { es: "Sitio profesional", en: "Professional site" } },
  { src: "/projects/deliscias-marijo.webp", name: "Delicias Marijo", kind: { es: "Tienda", en: "Store" } },
  { src: "/projects/wai.webp", name: "WAI", kind: { es: "Corporativo", en: "Corporate" } },
];

const COPY = {
  es: {
    brandAccent: "Sistemas",
    tagline: "Construimos sistemas de operación a medida.",
    services: "Paneles internos • Inventario y reservas • Portales de cliente",
    proof: "proyectos en producción",
    proofNote: "Puedes abrir cada uno",
    ctaPrimary: "Agendar diagnóstico",
    ctaSecondary: "Ver los sistemas",
    mosaicLabel: "Capturas de proyectos de Grolow en producción",
  },
  en: {
    brandAccent: "Systems",
    tagline: "We build the system your business runs on.",
    services: "Internal dashboards • Inventory and scheduling • Client portals",
    proof: "projects in production",
    proofNote: "You can open every one",
    ctaPrimary: "Book a diagnosis",
    ctaSecondary: "See the systems",
    mosaicLabel: "Screenshots of Grolow projects in production",
  },
} as const;

/** Una captura del mosaico. */
function Shot({ project, lang }: { project: Project; lang: Lang }) {
  return (
    <figure className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-[0_24px_60px_-20px_rgba(0,0,0,.8)]">
      <div className="relative aspect-16/10">
        <Image
          src={project.src}
          alt={
            lang === "es"
              ? `Página de inicio de ${project.name}`
              : `Home page of ${project.name}`
          }
          fill
          sizes="(max-width: 1023px) 45vw, 26vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
          // Todas perezosas a propósito. Con la primera en `eager` el elemento
          // LCP pasaba a ser esa captura y el LCP se iba a 3.7s; dejándolas
          // perezosas el elemento mayor vuelve a ser el rótulo, que es texto y
          // ya está en el HTML inicial.
          loading="lazy"
        />
      </div>
      <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 to-transparent px-3 pb-2.5 pt-8">
        <span className="block text-[11px] font-semibold text-white">
          {project.name}
        </span>
        <span className="block text-[10px] text-white/60">
          {project.kind[lang]}
        </span>
      </figcaption>
    </figure>
  );
}

export default function Hero3({ lang }: { lang: Lang }) {
  const c = COPY[lang];

  // Dos columnas desfasadas: la segunda arranca más abajo, que es lo que hace
  // que el mosaico se lea como una pila inclinada y no como una tabla.
  const columns = [PROJECTS.slice(0, 3), PROJECTS.slice(3, 6)];

  return (
    <section
      // `useHeaderTrigger` busca este atributo para saber que hay una sección
      // oscura cruzando la banda del header y pasar el menú a blanco. Sin él,
      // la navegación se pinta en ink sobre este fondo y no se ve.
      data-header-trigger="true"
      className="relative isolate w-full overflow-hidden bg-grolow-ink text-white">
      {/* Resplandor de marca. Radial muy abierto y al 12%: da profundidad sin
          convertirse en una mancha de color. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-1/4 -top-1/3 -z-10 h-[80vh] w-[80vw] rounded-full opacity-60 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(0,143,139,.30) 0%, rgba(0,143,139,0) 70%)",
        }}
      />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 pb-16 pt-28 md:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-8 lg:pb-24 lg:pt-32">
        {/* ─────────────── Columna de texto ─────────────── */}
        <div className="relative z-10">
          {/* Rótulo. Decorativo: el nombre accesible lo da el h1 y el header.

              El cuerpo sale de medir la fuente: «grolow» en Sergio Trendy mide
              3.64× su font-size, así que 23vw lo deja tocando los márgenes en
              móvil. A 15vw ocupaba 380×52px y perdía el LCP contra la primera
              captura del mosaico; a este tamaño el elemento mayor vuelve a ser
              texto, que ya viene en el HTML y no cuesta una descarga. */}
          <div aria-hidden="true" className="mb-8 select-none leading-[0.82]">
            <Brand
              as="div"
              className="block text-[clamp(3.5rem,23vw,9rem)] text-white"
            />
            <span
              className="font-brand block text-[clamp(2.9rem,18.7vw,7.25rem)] capitalize text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(100deg, #06E0DA 0%, #008F8B 45%, #00524F 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}>
              {c.brandAccent}
            </span>
          </div>

          <h1
            className="max-w-xl text-[clamp(1.5rem,4.4vw,2.25rem)] font-bold leading-[1.15] tracking-tight text-white"
            lang={lang}>
            {c.tagline}
          </h1>

          <p className="mt-4 max-w-xl text-[clamp(0.95rem,3.4vw,1.125rem)] text-white/60">
            {c.services}
          </p>

          {/* Prueba social verificable: número real + enlace para comprobarlo. */}
          <Link
            href={pathFor("casos", lang)!}
            className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.04] py-2.5 pl-3 pr-5 transition-colors hover:border-grolow-brand/60">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-grolow-brand text-sm font-bold text-grolow-ink">
              {PROJECTS.length}
            </span>
            <span className="text-sm">
              <span className="font-semibold text-white">{c.proof}</span>
              <span className="text-white/50"> · {c.proofNote}</span>
            </span>
          </Link>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={pathFor("contacto", lang)!}
              className="group inline-flex items-center justify-center gap-3 bg-white px-7 py-4 text-sm font-bold uppercase tracking-wider text-grolow-ink transition-colors hover:bg-grolow-brand hover:text-white">
              {c.ctaPrimary}
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href={pathFor("casos", lang)!}
              className="group inline-flex items-center justify-center gap-3 border border-white/25 px-7 py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:border-grolow-brand hover:text-grolow-brand">
              {c.ctaSecondary}
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* ─────────────── Mosaico ───────────────
            La inclinación vive en un contenedor aparte para que el `rotate` no
            arrastre al texto ni cree un contexto de apilamiento sobre él. En
            móvil se endereza y se reduce a dos columnas rectas: una pila
            inclinada a 360px de ancho solo desperdicia espacio. */}
        <div className="relative" role="group" aria-label={c.mosaicLabel}>
          <div className="grid grid-cols-2 gap-4 lg:[transform:perspective(1400px)rotateY(-14deg)rotateZ(-3deg)_scale(1.12)] lg:[transform-origin:left_center]">
            {columns.map((column, i) => (
              <div
                key={i}
                className={`flex flex-col gap-4 ${i === 1 ? "mt-8 lg:mt-14" : ""}`}>
                {column.map((project) => (
                  <Shot key={project.src} project={project} lang={lang} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Degradado de salida hacia el crema del resto del sitio. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent to-grolow-dark/100"
      />
    </section>
  );
}
