/**
 * El nombre de la marca, siempre en la fuente de marca.
 *
 * Existe para que «grolow» no dependa de que cada sitio donde aparece se
 * acuerde de poner la clase: si mañana cambia la fuente, cambia aquí y cambia
 * en todas partes. Es un Server Component, así que no cuesta bundle.
 *
 * No lleva utilidad de caja: el rótulo es «grolow» en minúsculas y el texto ya
 * viene así literalmente. Añadir `lowercase` aquí solo servía para chocar con
 * cualquier `normal-case` que pasara quien lo usa.
 *
 * Sergio Trendy solo sabe dibujar A-Z, a-z y dígitos —los 126 caracteres
 * restantes del fichero demo son un sello de licencia—, así que este componente
 * se usa SOLO para la palabra «grolow», que no lleva acentos. Cualquier otro
 * texto va en la fuente del sitio.
 */
export default function Brand({
  className = "",
  as: Tag = "span",
}: {
  className?: string;
  as?: "span" | "strong" | "div";
}) {
  return <Tag className={`font-brand ${className}`}>Grolow</Tag>;
}
/**
 * Pinta el nombre de la marca en su fuente dentro de una cadena cualquiera.
 *
 * Los textos de `/ceo-warling` viven como strings dentro de objetos de datos
 * («Fundé Grolow, una agencia de…»), así que no se puede envolver la palabra
 * en el origen sin convertir esos datos en JSX. Esto lo resuelve en el punto
 * de render: parte la cadena por el nombre y devuelve los trozos.
 *
 * Case-insensitive a propósito —en los datos aparece «Grolow» y el rótulo es
 * «grolow»— y siempre se pinta en minúsculas, que es como se escribe la marca.
 */
export function withBrand(text: string): React.ReactNode[] {
  return text.split(/(grolow)/gi).map((part, i) =>
    part.toLowerCase() === "grolow" ? (
      <Brand key={i} />
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}
