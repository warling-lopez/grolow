"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Revelado letra a letra, en CSS puro y sin librería de animación.
 *
 * Sustituye al `ScrollTrigger` con `pin` que tenía la sección de método: aquel
 * secuestraba el scroll (500px de pausa por panel más desplazamiento
 * horizontal) y arrastraba GSAP al bundle solo para animar un titular.
 *
 * El único JavaScript que queda es un `IntersectionObserver` que añade una
 * clase cuando el bloque entra en pantalla; el escalonado lo hace CSS con la
 * variable `--i` de cada letra. Se dispara una sola vez: una animación que se
 * repite cada vez que pasas por delante cansa.
 *
 * Los espacios se emiten como `&nbsp;` dentro de su propio `<span>` para que
 * `inline-block` no los colapse.
 *
 * Para el lector de pantalla el texto va en un `<span class="sr-only">` y las
 * letras quedan `aria-hidden`, así que se lee una palabra y no una letra por
 * segundo. No se usa `aria-label` sobre el contenedor: en un elemento genérico
 * —un `span` sin rol— ese atributo está prohibido y los lectores lo ignoran
 * (regla `aria-prohibited-attr`).
 */
export default function LetterReveal({
  text,
  className = "",
  /** Retardo entre letras, en ms. */
  step = 28,
  /** Retardo inicial del bloque entero, en ms. */
  delay = 0,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  step?: number;
  delay?: number;
  as?: "span" | "h2" | "h3" | "p";
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Sin soporte de IntersectionObserver se muestra el texto y ya está: el
    // contenido nunca puede quedar dependiendo de que la animación funcione.
    // Se aplaza un frame en vez de llamar a `setShown` dentro del efecto, que
    // encadena un render sincrónico de más (regla `set-state-in-effect`).
    if (typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setShown(true);
        observer.disconnect();
      },
      { threshold: 0.25 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<HTMLHeadingElement>}
      className={`letter-reveal ${shown ? "is-shown" : ""} ${className}`}>
      <span className="sr-only">{text}</span>
      {Array.from(text).map((char, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="letter-reveal__char"
          style={
            { "--i": i, "--step": `${step}ms`, "--delay": `${delay}ms` } as React.CSSProperties
          }>
          {char === " " ? " " : char}
        </span>
      ))}
    </Tag>
  );
}
