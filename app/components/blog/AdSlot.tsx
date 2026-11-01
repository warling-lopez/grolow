import WhatsAppLink from "@/app/components/WhatsAppLink";

/**
 * Hueco publicitario de la barra lateral.
 *
 * Mientras no haya un anunciante (o AdSense) se muestra como espacio
 * disponible, con un enlace para contratarlo. Para poner un anuncio real,
 * sustituir el contenido de este componente por el banner o el script, y usar
 * `size` para conservar las medidas estándar (300×250 y 300×600).
 */
const SIZES = {
  rect: "aspect-[6/5]",
  tall: "aspect-[1/2]",
} as const;

export default function AdSlot({
  size = "rect",
  id,
}: {
  size?: keyof typeof SIZES;
  /** Identificador del espacio, útil para la analítica y para AdSense. */
  id: string;
}) {
  return (
    <aside
      aria-label="Publicidad"
      data-ad-slot={id}
      className={`${SIZES[size]} w-full rounded-xl border border-dashed border-neutral-300 bg-neutral-50 flex flex-col items-center justify-center gap-3 p-6 text-center`}>
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
        Publicidad
      </span>
      <p className="text-sm font-semibold text-neutral-700 max-w-[16rem]">
        Este espacio está disponible para tu marca.
      </p>
      <WhatsAppLink
        message={`Hola, quiero anunciarme en el blog de Grolow (espacio ${id}).`}
        placement={`blog-ad-${id}`}
        className="text-sm font-bold text-grolow-cream underline underline-offset-4 hover:text-grolow-brand">
        Anúnciate aquí
      </WhatsAppLink>
    </aside>
  );
}
