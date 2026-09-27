"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import LetterReveal from "./LetterReveal";
import {
  HUB_CARD,
  METHOD_CARDS,
  METHOD_COPY,
  type MethodCard,
} from "@/app/lib/content/method-cards";
import type { Lang } from "@/app/lib/i18n";

/**
 * Constelación «sistema de trabajo».
 *
 * Cuatro tarjetas negras —consultoría, estrategia, diseño, entrega— y un
 * núcleo —pensamiento sistémico—, las cinco con la misma forma (título,
 * frase, cuatro puntos, cita) y el mismo tamaño. El lienzo va sobre fondo
 * claro, como el resto del sitio.
 *
 * (Sustituye al panel de «estándares de ingeniería» —scores de Lighthouse,
 * schema, stack, herramientas—, que ya no se pinta en ningún sitio del sitio
 * pero sigue intacto en `engineering.ts` / `lighthouse.json` por si hace
 * falta enseñarlo en otra sección.)
 *
 * Nada se recorta ni se resume: la tarjeta es tan grande como su contenido lo
 * pide (ver `CARD_BOX`), no al revés. Si el copy crece, esto crece con él.
 *
 * En escritorio (`lg+`) cada tarjeta se arrastra por separado —no el lienzo
 * entero como un bloque rígido— y flota despacio todo el tiempo. Al entrar la
 * sección en pantalla, las cuatro salen de debajo del núcleo (tapadas por él,
 * encogidas) y «estiran» hacia su sitio con un pequeño rebote elástico; a
 * partir de ahí ya se pueden mover a mano. El hilo punteado se recalcula en
 * cada fotograma mientras la sección está a la vista, así que no se
 * desincroniza ni con el flotado ni con el arrastre. En móvil y tablet no
 * hay lienzo: es una lista vertical que revela cada tarjeta al entrar y no
 * la vuelve a ocultar.
 *
 * `Server Component` no es posible aquí: el arrastre, el flotado y el hover
 * son interacción de cliente. Aun así todo el texto sale igual en el HTML
 * inicial (SSR + hidratación), no se pinta después con JS.
 */

/** Envoltorio visual común a las cuatro tarjetas y al núcleo: título, frase
 *  en cursiva, cuatro puntos y una cita de cierre. `tone` es lo único que
 *  cambia entre las tarjetas negras y el núcleo en verde de marca. */
function CardBody({
  card,
  lang,
  tone = "dark",
}: {
  card: MethodCard;
  lang: Lang;
  tone?: "dark" | "hub";
}) {
  const ink = tone === "hub";
  return (
    <>
      <h3
        className={`text-xl font-bold uppercase tracking-tight md:text-2xl ${
          ink ? "text-grolow-ink" : "text-white"
        }`}>
        {card.title[lang]}
      </h3>
      <p
        className={`mt-2 text-base italic ${
          ink ? "text-grolow-ink/70" : "text-white/60"
        }`}>
        {card.tagline[lang]}
      </p>
      <ul className="mt-5 flex flex-col gap-3">
        {card.bullets[lang].map((item) => (
          <li
            key={item}
            className={`flex gap-3 text-base leading-snug ${
              ink ? "text-grolow-ink/85" : "text-white/75"
            }`}>
            <span
              aria-hidden="true"
              className={`mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full ${
                ink ? "bg-grolow-ink/60" : "bg-grolow-brand-bright"
              }`}
            />
            {item}
          </li>
        ))}
      </ul>
      <p
        className={`mt-6 border-t pt-4 text-sm italic leading-relaxed ${
          ink
            ? "border-grolow-ink/15 text-grolow-ink/60"
            : "border-white/10 text-white/45"
        }`}>
        {card.quote[lang]}
      </p>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Geometría del lienzo (desktop)                                      */
/* ------------------------------------------------------------------ */

/** Centro de cada tarjeta exterior, en % del lienzo. El núcleo va en (50,50). */
const POSITIONS = [
  { left: "25%", top: "23%" }, // consultoría
  { left: "75%", top: "23%" }, // estrategia
  { left: "25%", top: "79%" }, // diseño
  { left: "75%", top: "79%" }, // entrega
];

/** Tamaño uniforme de las cinco tarjetas (las cuatro y el núcleo). Más
 *  angosto que la rejilla «natural» (36%→32%) para que sobre lienzo al
 *  arrastrarlas, pero con toda la altura que el copy —título, frase, cuatro
 *  puntos y cita— necesita para leerse entero, sin recortes ni scroll. */
const CARD_BOX = "w-[32%] max-w-[24rem] h-[27rem]";

/** Desde dónde «sale» cada tarjeta al entrar la sección en pantalla: tapada
 *  por el núcleo y encogida, tirando hacia el centro (50,50) desde su
 *  cuadrante. El signo de cada eje sale directo de en qué cuadrante vive. */
const ENTER_FROM = [
  { x: 95, y: 74 }, // consultoría: arriba-izq → tira hacia abajo-der
  { x: -95, y: 74 }, // estrategia: arriba-der → hacia abajo-izq
  { x: 95, y: -74 }, // diseño: abajo-izq → hacia arriba-der
  { x: -95, y: -74 }, // entrega: abajo-der → hacia arriba-izq
];

export default function EngineeringSection({ lang }: { lang: Lang }) {
  const c = METHOD_COPY[lang];
  const reduce = useReducedMotion() ?? false;

  // Contenido de las 4 tarjetas exteriores. Se define una sola vez y se pinta
  // dos veces (lienzo de escritorio, lista de móvil): el mismo texto en las
  // dos, sin recortes — la tarjeta mide lo que el copy pide.
  const outer = METHOD_CARDS.map((card) => ({
    key: card.title.es,
    node: <CardBody card={card} lang={lang} />,
  }));

  const hub = <CardBody card={HUB_CARD} lang={lang} tone="hub" />;

  return (
    <section className="w-full overflow-hidden bg-grolow-dark text-grolow-light">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-grolow-light/60">
          {c.label}
        </p>

        <h2 className="font-display text-[clamp(2.25rem,7.5vw,4.5rem)] font-bold uppercase tracking-tight leading-[0.95] text-grolow-light">
          <LetterReveal text={c.title} step={18} />
        </h2>

        {/* ================= LIENZO (desktop) ================= */}
        {/* Aquí lo que se arrastra es cada tarjeta, una por una — no el
            lienzo entero como un bloque rígido. El hilo punteado se
            recalcula en cada fotograma mientras la sección está a la vista,
            así que sigue a la tarjeta al flotar, al entrar y al arrastrarla. */}
        <OrbitBoard reduce={reduce} dragHint={c.dragHint} outer={outer} hub={hub} />

        {/* ================= LISTA (móvil / tablet) ================= */}
        <div className="mt-12 flex flex-col gap-4 lg:hidden">
          {[outer[0], outer[1], null, outer[2], outer[3]].map((card) =>
            card ? (
              <motion.div
                key={card.key}
                initial={reduce ? undefined : { opacity: 0, y: 24 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl border border-white/10 bg-grolow-ink p-6">
                {card.node}
              </motion.div>
            ) : (
              <motion.div
                key="hub"
                initial={reduce ? undefined : { opacity: 0, y: 24 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl bg-grolow-brand p-6 text-center">
                {hub}
              </motion.div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Lienzo: tarjetas arrastrables individualmente + hilo al núcleo       */
/* ------------------------------------------------------------------ */

type OuterCard = { key: string; node: React.ReactNode };

type Line = { x1: number; y1: number; x2: number; y2: number };

function OrbitBoard({
  reduce,
  dragHint,
  outer,
  hub,
}: {
  reduce: boolean;
  dragHint: string;
  outer: OuterCard[];
  hub: React.ReactNode;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [lines, setLines] = useState<Line[]>([]);

  // Cuándo está la sección a la vista: solo entonces vale la pena recalcular
  // el hilo en cada fotograma (el flotado y la entrada solo se mueven
  // mientras se puede ver, así que fuera de vista no hay nada que perseguir).
  const inView = useInView(stageRef, { amount: 0.1 });

  // Centro de cada tarjeta y del núcleo, en píxeles relativos al lienzo.
  const measure = () => {
    const stage = stageRef.current;
    const hubEl = hubRef.current;
    if (!stage || !hubEl) return;
    const stageRect = stage.getBoundingClientRect();
    const center = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2 - stageRect.left, y: r.top + r.height / 2 - stageRect.top };
    };
    const hubCenter = center(hubEl);
    setLines(
      cardRefs.current.map((el) => {
        const p = el ? center(el) : hubCenter;
        return { x1: p.x, y1: p.y, x2: hubCenter.x, y2: hubCenter.y };
      }),
    );
    setBox({ w: stageRect.width, h: stageRect.height });
  };

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (stageRef.current) ro.observe(stageRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
     
  }, [outer.length]);

  // Mientras la sección está a la vista (y hay animación), se remide en cada
  // fotograma: es lo único que mantiene el hilo pegado a una tarjeta que
  // flota sola, que está entrando, o que se está arrastrando, sin distinguir
  // casos — todo mueve la misma caja, así que todo se sigue igual.
  useEffect(() => {
    if (reduce || !inView) return;
    let raf: number;
    const tick = () => {
      measure();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
     
  }, [inView, reduce]);

  return (
    <div
      ref={stageRef}
      className="relative mt-16 hidden min-h-[1220px] select-none lg:block">
      {/* Hilo punteado: une cada tarjeta con el núcleo. Va debajo de todo,
          así que el núcleo lo tapa justo donde llega. Coordenadas en
          píxeles reales del lienzo, no en porcentaje: así el ángulo no se
          deforma si el lienzo no es cuadrado. */}
      <svg
        viewBox={`0 0 ${box.w} ${box.h}`}
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true">
        {lines.map((l, i) => (
          <line
            key={i}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            className="stroke-grolow-brand/45"
            strokeWidth="1.5"
            strokeDasharray="6 7"
          />
        ))}
      </svg>

      {outer.map((card, i) => (
        // Capa de posición: fija el sitio de reposo (izquierda/arriba) y el
        // tamaño — igual para las cuatro. Ni flota ni se arrastra: eso lo
        // hacen las dos capas de dentro, cada una con su propio movimiento,
        // que se suman sin pisarse porque cada una controla su propia
        // transformación.
        <div
          key={card.key}
          className={`absolute z-1 -translate-x-1/2 -translate-y-1/2 ${CARD_BOX}`}
          style={{ left: POSITIONS[i].left, top: POSITIONS[i].top }}>
          {/* Capa de flotado: un vaivén vertical lento y continuo, propio de
              cada tarjeta (duración y retardo distintos) para que no floten
              al unísono como un solo bloque. */}
          <motion.div
            className="h-full w-full"
            animate={reduce ? undefined : { y: [0, -9, 0] }}
            transition={
              reduce
                ? undefined
                : {
                    duration: 3.4 + i * 0.5,
                    delay: i * 0.35,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }>
            {/* Capa de arrastre + entrada: nace tapada por el núcleo y
                encogida, y se ESTIRA a su tamaño de reposo con un pequeño
                rebote elástico (spring con `bounce`) al entrar la sección en
                pantalla — no una transición lineal. Desde ahí queda libre
                para arrastrarse. */}
            <motion.div
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="h-full w-full rounded-2xl border border-white/10 bg-grolow-ink p-7"
              style={{ cursor: reduce ? undefined : "grab" }}
              drag={!reduce}
              dragConstraints={stageRef}
              dragElastic={0.05}
              dragMomentum={false}
              whileDrag={{ cursor: "grabbing", zIndex: 2 }}
              whileHover={
                reduce
                  ? undefined
                  : { scale: 1.02, borderColor: "rgba(255,255,255,0.3)" }
              }
              initial={
                reduce
                  ? undefined
                  : { ...ENTER_FROM[i], scale: 0.6, opacity: 0.5 }
              }
              whileInView={
                reduce ? undefined : { x: 0, y: 0, scale: 1, opacity: 1 }
              }
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                type: "spring",
                bounce: 0.42,
                duration: 1,
                delay: i * 0.1,
              }}>
              {card.node}
            </motion.div>
          </motion.div>
        </div>
      ))}

      {/* Núcleo: la idea que conecta a las cuatro. Mismo tamaño que ellas,
          fijo — es la referencia contra la que se mueven las demás. */}
      <div
        ref={hubRef}
        className={`absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-grolow-brand p-7 shadow-[0_20px_60px_rgba(0,0,0,0.35)] ${CARD_BOX}`}>
        {hub}
      </div>

      {!reduce && (
        <span className="pointer-events-none absolute bottom-4 left-1/2 z-1 -translate-x-1/2 rounded-full bg-grolow-ink px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
          {dragHint}
        </span>
      )}
    </div>
  );
}
