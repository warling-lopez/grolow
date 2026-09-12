import { SITE_URL } from "@/app/lib/i18n";

/**
 * Identidad de la marca y del fundador, en un solo sitio.
 *
 * Existía repartida entre `app/[lang]/layout.tsx` (organización) y prosa suelta
 * en `/ceo-warling` (perfiles del fundador). Esa fragmentación es justo lo que
 * una auditoría de entidad detecta: los `sameAs` del fundador vivían como texto
 * en una página huérfana, no en el grafo, así que ningún motor podía atar la
 * persona a la empresa.
 *
 * Regla: aquí solo entran datos verificables. Un campo que no tenemos se queda
 * fuera en vez de inventarse — un `Organization` con una dirección falsa es
 * peor que uno sin dirección.
 */

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const PERSON_ID = `${SITE_URL}/#warling`;
export const LOCALBUSINESS_ID = `${SITE_URL}/#localbusiness`;

export const EMAIL = "grolow.web@gmail.com";
export const PHONE = "+1-829-994-6354";
export const WHATSAPP = "18299946354";

/**
 * Perfiles oficiales. `sameAs` es lo que le dice a un buscador «esta marca y
 * ese perfil son la misma entidad», y es la pieza que permite desambiguar
 * «Grolow» de sus homónimos en inglés (un cultivar de arbusto y una marca de
 * vino compiten hoy por esas seis letras).
 */
export const ORG_SAME_AS = [
  "https://www.facebook.com/share/1KWFa6vDno/?mibextid=wwXIfr",
  "https://www.instagram.com/grolow.studio/",
];

/** Perfiles del fundador. Estaban solo como texto visible en `/ceo-warling`. */
export const PERSON_SAME_AS = [
  "https://www.linkedin.com/in/warling-lopez",
  "https://github.com/warling-lopez",
];

/**
 * Ámbito de servicio, con grano de ciudad además de país.
 *
 * Con `areaServed` solo a nivel país, una consulta de intención local —«…en
 * Santiago», «…en Punta Cana»— no tiene a qué agarrarse. Estas son plazas donde
 * el estudio trabaja de verdad: no es una lista de relleno, y ampliarla sin
 * respaldo sería la misma clase de afirmación que el sitio rechaza en su copy.
 */
export const AREA_SERVED = [
  { "@type": "Country", name: "República Dominicana" },
  { "@type": "City", name: "Santo Domingo" },
  { "@type": "AdministrativeArea", name: "Distrito Nacional" },
  { "@type": "City", name: "Santiago de los Caballeros" },
  { "@type": "City", name: "Punta Cana" },
  { "@type": "City", name: "La Romana" },
];

/** Materias sobre las que la entidad tiene competencia demostrable. */
export const KNOWS_ABOUT = [
  "desarrollo web a medida",
  "desarrollo de software a medida",
  "sistemas de operación para pymes",
  "tiendas online con pedidos por WhatsApp",
  "aplicaciones móviles",
  "automatización de procesos",
  "SEO técnico",
  "React",
  "Next.js",
  "TypeScript",
  "PostgreSQL",
];

/**
 * El fundador como entidad propia, con `@id` referenciable.
 *
 * Antes iba anidado dentro de `Organization.founder` sin `@id`, así que no era
 * una entidad: era un campo. Con `@id` propio, el `author` de los artículos y
 * el `founder` de la organización pueden apuntar al mismo nodo, y los perfiles
 * de `sameAs` quedan atados a él.
 */
export function personNode(lang: "es" | "en") {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Warling López",
    givenName: "Warling",
    familyName: "López",
    jobTitle:
      lang === "es"
        ? "Fundador y desarrollador principal"
        : "Founder and lead developer",
    description:
      lang === "es"
        ? "Desarrollador full-stack dominicano. Funda Grolow, donde construye sistemas de operación a medida para negocios que ya crecieron más de lo que aguanta una hoja de cálculo."
        : "Dominican full-stack developer. Founder of Grolow, where he builds custom operations systems for businesses that have outgrown a spreadsheet.",
    url: `${SITE_URL}/ceo-warling`,
    worksFor: { "@id": ORGANIZATION_ID },
    knowsAbout: KNOWS_ABOUT,
    sameAs: PERSON_SAME_AS,
    nationality: { "@type": "Country", name: "República Dominicana" },
  };
}
