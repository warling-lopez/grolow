import Image from "next/image";
import type { Lang } from "@/app/lib/i18n";

/**
 * Fundador: foto en círculo con aro, rótulo `[ FOUNDER ]`, nombre, cargo y
 * una bio corta. Va entre el contacto y el pie.
 *
 * PENDIENTE: sube una foto real a /public/founder.webp y pon aquí la ruta.
 * `null` mientras no exista: con una ruta fija el navegador pediría el
 * archivo en cada carga y se llevaría un 404. Mientras tanto el círculo
 * muestra las iniciales.
 */
const PHOTO_SRC: string | null = null;

const COPY = {
  en: {
    label: "FOUNDER",
    name: "Warling López",
    role: "Founder of Grolow",
    alt: "Warling López, founder of Grolow",
    bio: "Programmer with 5 years of experience building custom systems for businesses. You talk directly with the person who builds your project, so we know exactly what's inside your site and can fix anything the same day.",
  },
  es: {
    label: "FOUNDER",
    name: "Warling López",
    role: "Fundador de Grolow",
    alt: "Warling López, fundador de Grolow",
    bio: "Programador con 5 años de experiencia construyendo sistemas a medida para negocios. Hablas directamente con quien construye tu proyecto, así que sabemos exactamente qué hay dentro de tu web y podemos arreglar cualquier cosa el mismo día.",
  },
} as const;

export default function FounderSection({ lang }: { lang: Lang }) {
  const c = COPY[lang];

  return (
    <section
      id="founder"
      className="flex min-h-[120vh] w-full items-center bg-grolow-card border-t border-grolow-light/10">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-3 pb-72 pt-24 md:grid-cols-2 md:gap-16 md:px-8 md:pb-48 md:pt-36">
        {/* Foto: círculo con aro exterior y sombra */}
        <div className="flex justify-center md:justify-start">
          <div className="grid aspect-square w-full max-w-[22rem] place-items-center rounded-full border border-grolow-light/10 md:max-w-md">
            <div className="relative aspect-square w-[78%] overflow-hidden rounded-full bg-grolow-dark shadow-[0_24px_60px_-12px_rgba(14,21,18,0.45)]">
              {PHOTO_SRC ? (
                <Image
                  src={PHOTO_SRC}
                  alt={c.alt}
                  fill
                  sizes="(min-width: 768px) 30vw, 70vw"
                  className="object-cover"
                />
              ) : (
                <span
                  role="img"
                  aria-label={c.alt}
                  className="absolute inset-0 grid place-items-center text-6xl font-black text-grolow-light/40">
                  WL
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Texto */}
        <div className="flex flex-col">
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-grolow-cream">
            [ {c.label} ]
          </p>
          <h2 className="mt-5 font-display text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-[1.05] tracking-tight text-grolow-light">
            {c.name}
          </h2>
          <p className="mt-3 text-lg text-grolow-light/70">{c.role}</p>
          <p className="mt-8 text-lg leading-relaxed text-grolow-light/75 md:text-xl">
            {c.bio}
          </p>
        </div>
      </div>
    </section>
  );
}
