import type { CSSProperties, ReactNode } from "react";

export type SplitTextProps = {
  children: ReactNode;
  split?: string;
  topClassName?: string;
  bottomClassName?: string;
  topBgColor?: string; // Nuevo: color fondo superior
  bottomBgColor?: string; // Nuevo: color fondo inferior
  filter?: string;
  className?: string;
};

/**
 * El relleno va en `em`, no en píxeles fijos.
 *
 * Con `p-5` (20px) el recuadro quedaba desproporcionado en cuerpos pequeños:
 * a 17px de texto, los 40px de relleno vertical pesaban más que las letras y
 * el corte a mitad de altura se leía como un fallo de render en vez de como
 * un efecto. En `em` el recuadro escala con el texto y la costura cae siempre
 * en el centro óptico de las mayúsculas.
 */
export default function SplitText({
  children,
  split = "50%",
  topClassName = "text-grolow-cream",
  bottomClassName = "text-grolow-dark",
  topBgColor = "bg-grolow-dark", // Color base superior
  bottomBgColor = "bg-grolow-light", // Color base inferior
  filter = "",
  className = "text-[clamp(1.5rem,2vw,3rem)] ",
}: SplitTextProps) {
  const overlayStyle: CSSProperties = {
    clipPath: `inset(0 0 calc(100% - ${split}) 0)`,
  };

  return (
    <span
      className={[
        "relative inline-block whitespace-nowrap uppercase font-black overflow-hidden pt-[0.42em]",
        "leading-[0.85] tracking-tight",
        className,
      ].join(" ")}>
      {/* CAPA INFERIOR (Fondo invertido + texto) */}
      <span
        className={[
          bottomBgColor,
          "pb-[0.42em] px-[0.5em] rounded-b-xl",
          bottomClassName,
        ].join(" ")}
        style={{ filter, display: "block" }}>
        {children}
      </span>

      {/* CAPA SUPERIOR (Fondo original + texto, recortada) */}
      <span
        aria-hidden="true"
        className={[
          "absolute inset-0 select-none pointer-events-none pt-[0.42em] px-[0.5em] rounded-t-xl",
          topBgColor,
          topClassName,
        ].join(" ")}
        style={overlayStyle}>
        {children}
      </span>
    </span>
  );
}
