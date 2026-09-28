import type { CSSProperties, Ref } from "react";

/**
 * El palo del logo, aislado para poder reutilizarlo cuando se convierta en
 * parte del logo animado.
 *
 * Crece de abajo arriba con `scaleY` y `transform-origin: bottom` (nunca se
 * anima `height`). `progress` fija el valor en render; para animarlo cada frame
 * sin re-renderizar React, usa `barRef` y escribe `style.transform` directo.
 *
 * Sin estado ni efectos: sirve igual en servidor que en cliente.
 */
export type LoaderMarkProps = {
  /** 0 → 1. */
  progress?: number;
  /** Alto del palo; cualquier valor CSS. */
  height?: number | string;
  /** Grosor en px. */
  thickness?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
  barRef?: Ref<SVGRectElement>;
};

export default function LoaderMark({
  progress = 1,
  height = 300,
  thickness = 4,
  color = "currentColor",
  className,
  style,
  barRef,
}: LoaderMarkProps) {
  return (
    <svg
      viewBox={`0 0 ${thickness} 100`}
      preserveAspectRatio="none"
      width={thickness}
      className={className}
      style={{ height, overflow: "visible", ...style }}
      aria-hidden="true">
      <rect
        ref={barRef}
        width={thickness}
        height={100}
        fill={color}
        style={{
          transformBox: "fill-box",
          transformOrigin: "50% 100%",
          transform: `scaleY(${progress})`,
        }}
      />
    </svg>
  );
}
