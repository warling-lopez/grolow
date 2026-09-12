import type { Lang } from "@/app/lib/i18n";

/**
 * Testimonios de clientes.
 *
 * ⚠️ ESTÁ VACÍO A PROPÓSITO. La sección no se pinta mientras no haya datos
 * reales: `TestimonialsSection` devuelve `null` con la lista vacía, así que la
 * portada no enseña un hueco ni un texto de relleno.
 *
 * Por qué vacío en vez de tres testimonios genéricos: un testimonio inventado
 * es la clase de afirmación que un cliente puede desmentir con una llamada, y
 * `/es/casos` dice literalmente que preferimos contar el cambio operativo
 * concreto porque sí es verificable. Tres frases anónimas de relleno
 * contradirían eso en la misma portada.
 *
 * Para rellenarlo hacen falta, por cada testimonio:
 *   - `quote`  el texto tal cual lo escribió la persona, sin retocar
 *   - `name`   nombre real y con permiso para publicarlo
 *   - `role`   su cargo o su negocio
 *   - `avatar` ruta a una foto o logo en /public (opcional)
 *   - `url`    enlace al sitio del cliente, para que se pueda comprobar (opcional)
 *
 * Cuando existan reseñas reales en Google Business, este es también el sitio
 * desde el que alimentar `AggregateRating` en el schema — y no antes: marcar
 * reseñas que no existen es motivo de acción manual de Google.
 */

export type Testimonial = {
  quote: Record<Lang, string>;
  name: string;
  role: Record<Lang, string>;
  avatar?: string;
  url?: string;
};

export const TESTIMONIALS: Testimonial[] = [];

export const COPY = {
  es: {
    label: "Clientes",
    title: "Lo que dicen nuestros clientes",
    empty: "",
  },
  en: {
    label: "Clients",
    title: "What our clients say",
    empty: "",
  },
} as const;
