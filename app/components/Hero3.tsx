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
function Shot({
  project,
  lang,
  decorative = false,
}: {
  project: Project;
  lang: Lang;
  /** Copia del bucle: sin texto alternativo, para no duplicar el contenido. */
  decorative?: boolean;
}) {
  return (
    <figure className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-[0_24px_60px_-20px_rgba(0,0,0,.8)]">
      <div className="relative aspect-16/10">
        <Image
          src={project.src}
          alt={
            decorative
              ? ""
              : lang === "es"
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

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 pb-16 pt-28 md:px-8 lg:min-h-[40rem] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-stretch lg:gap-8 lg:pb-24 lg:pt-32">
        {/* ─────────────── Columna de texto ─────────────── */}
        <div className="relative z-10 lg:self-center">
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
            inclinada a 360px de ancho solo desperdicia espacio.

            A partir de `lg` las columnas se desplazan en bucle en direcciones
            opuestas —la izquierda baja, la derecha sube— en CSS puro. Por
            debajo de `lg` no hay animación y las tarjetas duplicadas ni se
            renderizan: en móvil serían seis tarjetas de relleno que el
            visitante tendría que pasar con el dedo. */}
        <div className="relative">
          <div
            // Los desplazamientos negativos cancelan el `pt-32` y el `pb-24` del
            // contenedor: la ventana deja de terminar donde empieza el texto y
            // llega al borde de la sección, arriba y abajo. Las tarjetas no
            // cambian de tamaño —su ancho lo sigue marcando la rejilla—, solo
            // se ve más recorrido.
            className="relative lg:absolute lg:inset-x-0 lg:-top-32 lg:-bottom-24 lg:[clip-path:inset(0_-100vw)]"
            role="group"
            aria-label={c.mosaicLabel}>
          <div className="grid grid-cols-2 gap-4 lg:[transform:perspective(1400px)rotateY(-14deg)rotateZ(-3deg)_scale(1.12)] lg:[transform-origin:left_center]">
            {columns.map((column, i) => (
              <div
                key={i}
                className={`mosaic-col ${
                  i === 0 ? "mosaic-col--down" : "mosaic-col--up"
                } flex flex-col gap-4 ${i === 1 ? "mt-8 lg:mt-0" : ""}`}>
                {/* Tres bloques idénticos, no nueve tarjetas sueltas.

                    Con las seis como hijos directos, el recorrido del bucle
                    había que deducirlo de la altura total asumiendo que todas
                    miden lo mismo — y no lo hacen: el redondeo de `aspect-ratio`
                    deja ~1px de diferencia por tarjeta, que se acumulaba en 3px
                    de salto en cada vuelta. Con bloques iguales el recorrido
                    sale exacto por construcción.

                    ¿Por qué TRES y no dos? Porque la ventana ahora llega a los
                    bordes de la sección y es más alta que un bloque. Con dos,
                    al final del ciclo quedaba un hueco vacío por debajo: el
                    contenido no alcanzaba a cubrirla. Con tres, la ventana
                    puede medir hasta dos bloques y siempre queda tapada. */}
                {[0, 1, 2].map((copy) => (
                  <div
                    key={copy}
                    className={`flex flex-col gap-4 ${copy > 0 ? "hidden lg:flex" : ""}`}
                    // Las vueltas extra repiten la misma información: si no se
                    // ocultan, un lector de pantalla lee los proyectos tres veces.
                    aria-hidden={copy > 0 ? "true" : undefined}>
                    {column.map((project) => (
                      <Shot
                        key={project.src}
                        project={project}
                        lang={lang}
                        decorative={copy > 0}
                      />
                    ))}
                  </div>
                ))}
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>

      {/* Velo superior.

          Al sangrar el mosaico hasta el borde de la sección, las capturas
          pasan por detrás del header —que es transparente y sin blur— y cinco
          elementos del menú quedaban sobre imágenes claras. Este degradado les
          devuelve una base oscura sin tapar el mosaico: es opaco en los
          primeros 30% (la banda del menú) y se desvanece por completo antes de
          llegar al titular.

          Solo en `lg`: por debajo el mosaico va apilado bajo el texto y no
          hay nada que velar. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 hidden h-44 bg-linear-to-b from-grolow-ink from-30% via-grolow-ink/60 via-65% to-transparent lg:block"
      />

      {/* Degradado de salida hacia el crema del resto del sitio. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent to-grolow-dark/100"
      />
    </section>
  );
}
