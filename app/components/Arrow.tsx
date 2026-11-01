/**
 * Flecha dibujada en SVG, en lugar de los caracteres → ← ↗.
 *
 * Por qué: Open Sans no trae esas flechas en su subset `latin`. Al encontrar
 * una en la página, el navegador descarga los subsets «math» (46 KB) y
 * «symbols» (22 KB) de Open Sans solo para pintarla, y como el botón del hero
 * lleva una, esa descarga entraba en la ruta crítica de la portada
 * (PageSpeed: «Árbol de dependencia de red», 672 ms). Un SVG no pide fuentes.
 *
 * Mide 1em y usa `currentColor`: hereda tamaño y color del texto, igual que
 * el carácter al que sustituye.
 */
type ArrowDir = "right" | "left" | "up-right";

const PATHS: Record<ArrowDir, string> = {
  right: "M4 12h15M13 6l6 6-6 6",
  left: "M20 12H5M11 6l-6 6 6 6",
  "up-right": "M7 17L17 7M8 7h9v9",
};

export default function Arrow({
  dir = "right",
  className = "",
}: {
  dir?: ArrowDir;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.25}
      strokeLinecap="square"
      aria-hidden="true"
      focusable="false"
      className={`inline-block shrink-0 align-[-0.125em] ${className}`}>
      <path d={PATHS[dir]} />
    </svg>
  );
}
