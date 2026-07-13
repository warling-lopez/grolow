'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// ═══════════════════════════════════════════════════════════════
// ✏️  EDITA TU CARTA AQUÍ — cambia el texto a tu gusto.
//     Cada string del array `parrafos` es un párrafo de la carta.
// ═══════════════════════════════════════════════════════════════
const CARTA = {
  destinataria: 'yessica',
  subtitulo: 'mi amiga platónica, de mi corazón',
  saludo: 'Querida yessica:',
  parrafos: [
    'Hay personas que llegan a tu vida sin avisar y, sin darte cuenta, se vuelven parte de tus días tus horas. Tú eres una de esas personas para mí lo fuiste hace mucho, y aunque ya no seamos tan especiales el uno para el otro yo si, no se si esto lo sabias pero la poesia la iba a dejar hasta que hiciste que me volviera a interesar por ella y hasta el dia de hoy sigo aprendiendo y aplicandola gracias a ti.',
    'Gracias por cada conversación, por cada risa que me sacabas en su momento, cuando menos lo esperaba, y por escucharme incluso cuando ni yo mismo sabia lo que queria decir, aunq eso sea un poco vergonzoso, te considero unos de los pocos amigos de verdad que tengo en esta vida, y creeme que los puedo contar con media mano jsjs.',
    'Eres de esas amistades raras y bonitas: de las que no necesitan verse todos los días para sentirse cerca, de hecho en clase de español siempre me acuerdo de ti porque cuando se habla de escribir algo, estructurarlo y hacer que se sienta siempre llega ese momento en el que recuerdo a la persona que me hizo sentir más por ese medio.',
    'Quiero que sepas que te admiro, que te aprecio muchísimo, y que tenerte como amiga es de las mejores cosas que me han pasado.',
    'Ojalá la vida nos regale muchos años más de esta amistad tan nuestra.',
  ],
  despedida: 'Con todo el cariño del mundo,',
  firma: 'Tu amigo de corazón',
  posdata: 'P.D. Gracias por existir. 💗',
};
// ═══════════════════════════════════════════════════════════════

// Corazones flotantes de fondo: posición (%), tamaño (px), duración y
// retraso (s) fijos para que el render del servidor y el cliente coincidan.
const CORAZONES = [
  { left: 6, top: 12, size: 22, dur: 9, delay: 0, opacity: 0.35 },
  { left: 14, top: 58, size: 14, dur: 11, delay: 1.5, opacity: 0.25 },
  { left: 9, top: 82, size: 18, dur: 8, delay: 3, opacity: 0.3 },
  { left: 22, top: 30, size: 12, dur: 12, delay: 0.8, opacity: 0.2 },
  { left: 30, top: 74, size: 16, dur: 10, delay: 2.2, opacity: 0.28 },
  { left: 45, top: 8, size: 13, dur: 11, delay: 4, opacity: 0.22 },
  { left: 55, top: 88, size: 20, dur: 9, delay: 1, opacity: 0.32 },
  { left: 68, top: 20, size: 15, dur: 12, delay: 2.8, opacity: 0.25 },
  { left: 76, top: 62, size: 24, dur: 8, delay: 0.4, opacity: 0.35 },
  { left: 84, top: 38, size: 13, dur: 10, delay: 3.6, opacity: 0.22 },
  { left: 91, top: 78, size: 17, dur: 11, delay: 1.8, opacity: 0.3 },
  { left: 93, top: 14, size: 14, dur: 9, delay: 2.5, opacity: 0.25 },
];

function Corazon({ size, className, style }: { size: number; className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      style={style}
      aria-hidden="true">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

// Divide un texto en <span> por palabra para poder revelarlas con el scroll.
function Palabras({ texto }: { texto: string }) {
  return (
    <>
      {texto.split(' ').map((palabra, i) => (
        <span key={i} className="palabra inline-block whitespace-pre">
          {palabra}{' '}
        </span>
      ))}
    </>
  );
}

export default function CartaParayessica() {
  const contenedor = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Portada: entrada suave al cargar
      gsap.from('.portada-item', {
        opacity: 0,
        y: 24,
        duration: 1.2,
        stagger: 0.25,
        ease: 'power3.out',
      });

      // Carta: cada palabra aparece a medida que bajas (scrub = atado al scroll)
      gsap.utils.toArray<HTMLElement>('.carta-bloque').forEach((bloque) => {
        gsap.fromTo(
          bloque.querySelectorAll('.palabra'),
          { opacity: 0.08, y: 10 },
          {
            opacity: 1,
            y: 0,
            ease: 'none',
            stagger: 0.08,
            scrollTrigger: {
              trigger: bloque,
              start: 'top 88%',
              end: 'top 40%',
              scrub: 0.5,
            },
          }
        );
      });

      // Cierre: el corazón final crece al llegar abajo
      gsap.from('.corazon-final', {
        scale: 0,
        rotate: -20,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: '.corazon-final',
          start: 'top 90%',
          end: 'top 60%',
          scrub: 0.5,
        },
      });
    },
    { scope: contenedor }
  );

  return (
    <main
      ref={contenedor}
      className="relative min-h-screen overflow-hidden bg-[#FFF7F2] text-[#5b4048]"
      style={{ fontFamily: 'var(--font-garamond), Georgia, serif' }}>
      {/* ── Corazones 2D flotando de fondo ── */}
      <div className="pointer-events-none fixed inset-0 z-0 text-[#e89bb4]">
        {CORAZONES.map((c, i) => (
          <Corazon
            key={i}
            size={c.size}
            className="corazon-flotante absolute"
            style={{
              left: `${c.left}%`,
              top: `${c.top}%`,
              opacity: c.opacity,
              animationDuration: `${c.dur}s`,
              animationDelay: `${c.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* ── Portada ── */}
        <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <p className="portada-item mb-4 text-sm uppercase tracking-[0.35em] text-[#c98da1]">
            una carta para ti
          </p>
          <h1
            className="portada-item text-6xl leading-tight text-[#d96c8b] md:text-8xl"
            style={{ fontFamily: 'var(--font-caveat), cursive' }}>
            Para {CARTA.destinataria}
          </h1>
          <p className="portada-item mt-3 text-lg italic text-[#a97f8d] md:text-xl">
            {CARTA.subtitulo}
          </p>
          <Corazon size={34} className="portada-item mt-8 animate-pulse text-[#e8748f]" />
          <div className="portada-item absolute bottom-10 flex flex-col items-center gap-2 text-[#c98da1]">
            <span className="text-xs uppercase tracking-[0.3em]">baja despacito</span>
            <span className="animate-bounce text-xl">↓</span>
          </div>
        </section>

        {/* ── La carta ── */}
        <section className="mx-auto max-w-2xl px-5 pb-32">
          <div className="relative rounded-md border border-[#f2d8e0] bg-[#fffdf9] px-7 py-12 shadow-[0_18px_50px_-20px_rgba(217,108,139,0.35)] md:px-14 md:py-16">
            {/* cinta adhesiva decorativa */}
            <span className="absolute -top-3 left-8 h-7 w-24 -rotate-6 rounded-sm bg-[#f6c8d7]/70" />
            <span className="absolute -top-3 right-8 h-7 w-24 rotate-6 rounded-sm bg-[#f6c8d7]/70" />

            <p
              className="carta-bloque mb-10 text-4xl text-[#d96c8b] md:text-5xl"
              style={{ fontFamily: 'var(--font-caveat), cursive' }}>
              <Palabras texto={CARTA.saludo} />
            </p>

            {CARTA.parrafos.map((parrafo, i) => (
              <p
                key={i}
                className="carta-bloque mb-8 text-xl leading-relaxed md:text-2xl md:leading-relaxed">
                <Palabras texto={parrafo} />
              </p>
            ))}

            <div className="carta-bloque mt-14 text-right">
              <p className="mb-2 text-xl italic md:text-2xl">
                <Palabras texto={CARTA.despedida} />
              </p>
              <p
                className="text-4xl text-[#d96c8b] md:text-5xl"
                style={{ fontFamily: 'var(--font-caveat), cursive' }}>
                <Palabras texto={CARTA.firma} />
              </p>
            </div>

            <p className="carta-bloque mt-12 text-base italic text-[#a97f8d] md:text-lg">
              <Palabras texto={CARTA.posdata} />
            </p>
          </div>
        </section>

        {/* ── Cierre ── */}
        <section className="flex flex-col items-center justify-center px-6 pb-40 text-center">
          <Corazon size={72} className="corazon-final text-[#e8748f] drop-shadow-[0_8px_20px_rgba(232,116,143,0.45)]" />
          <p
            className="mt-6 text-3xl text-[#d96c8b] md:text-4xl"
            style={{ fontFamily: 'var(--font-caveat), cursive' }}>
            Te quiero, amiga.
          </p>
        </section>
      </div>

      <style>{`
        @keyframes flotarCorazon {
          0%   { transform: translateY(0) rotate(-6deg) scale(1); }
          50%  { transform: translateY(-26px) rotate(8deg) scale(1.12); }
          100% { transform: translateY(0) rotate(-6deg) scale(1); }
        }
        .corazon-flotante {
          animation-name: flotarCorazon;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
      `}</style>
    </main>
  );
}
