import LetterReveal from "./LetterReveal";
import lighthouse from "@/app/lib/content/lighthouse.json";
import {
  AUDIT_URL,
  COPY,
  SCHEMA_TYPES,
  STACK,
  TOOLS,
} from "@/app/lib/content/engineering";
import type { Lang } from "@/app/lib/i18n";

/**
 * Panel de estándares de ingeniería.
 *
 * Sustituye a «Sistemas que escalan», que eran cuatro palabras abstractas
 * —Automatización, Tiempo Real, Seguridad, Escalabilidad— que puede firmar
 * cualquiera. Aquí cada afirmación viene con la forma de comprobarla.
 *
 * Diferencia deliberada con el patrón del que copia la estructura: los scores
 * no están escritos en el JSX. Salen de `lighthouse.json`, que genera
 * `npm run perf:measure` con la URL medida, la fecha y la versión de
 * Lighthouse, y al lado va el botón para que el visitante corra la prueba él
 * mismo. Un scorecard hardcodeado es una afirmación que caduca y que cualquiera
 * desmiente en treinta segundos.
 */

const RADIUS = 30;
const CIRC = 2 * Math.PI * RADIUS;

/** Aro de progreso en SVG: sin librería y sin JS. */
function Gauge({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative h-[72px] w-[72px]">
        <svg viewBox="0 0 72 72" className="h-full w-full -rotate-90">
          <circle
            cx="36" cy="36" r={RADIUS}
            fill="none" strokeWidth="5"
            className="stroke-white/10"
          />
          <circle
            cx="36" cy="36" r={RADIUS}
            fill="none" strokeWidth="5" strokeLinecap="round"
            className="stroke-grolow-brand"
            strokeDasharray={CIRC}
            strokeDashoffset={CIRC * (1 - value / 100)}
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center text-lg font-bold text-white">
          {value}
        </span>
      </div>
      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/55">
        {label}
      </span>
    </div>
  );
}

function Card({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-white/10 bg-white/[0.025] p-6 md:p-8 ${className}`}>
      <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.16em] text-white">
        {title}
      </h3>
      {children}
    </section>
  );
}

export default function EngineeringSection({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  const s = lighthouse.scores;

  const measured = new Date(lighthouse.measuredAt).toLocaleDateString(
    lang === "es" ? "es-DO" : "en-US",
    { day: "numeric", month: "long", year: "numeric" },
  );

  // La medición puede venir de un build local (antes de desplegar) o del sitio
  // publicado. Enseñar «http://localhost:3001» en una página pública no dice
  // nada al visitante, así que en ese caso se etiqueta como build local y se
  // omite la URL. Se corrige solo al correr `npm run perf:measure` contra
  // producción.
  const isLocal = /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])/.test(
    lighthouse.url,
  );

  return (
    <section
      // Superficie oscura: el header necesita saberlo para pasar a blanco.
      data-header-trigger="true"
      className="w-full bg-grolow-ink text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-white/55">
          {c.label}
        </p>

        {/* En Noto, no en la fuente de marca. Sergio Trendy es la versión
            demo y trae 126 de sus 207 caracteres sustituidos por un sello de
            «compra la licencia»: entre ellos TODAS las vocales acentuadas y la
            ñ. «Estándares de ingeniería» salía como «estkkndares de
            ingenierkka». La fuente de marca queda para «grolow», que es lo
            único que sabe dibujar bien. */}
        <h2 className="font-display text-[clamp(2.25rem,7.5vw,4.5rem)] font-bold uppercase tracking-tight leading-[0.95] text-white">
          <LetterReveal text={c.title} step={18} />
        </h2>

        <p className="mt-5 max-w-2xl text-base text-white/60">{c.intro}</p>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {/* ── Medición ── */}
          <Card title={c.scores} className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              <Gauge value={s.performance} label={c.perf} />
              <Gauge value={s.accessibility} label={c.a11y} />
              <Gauge value={s.bestPractices} label={c.bp} />
              <Gauge value={s.seo} label={c.seo} />
            </div>

            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-white/10 pt-6 sm:grid-cols-4">
              {[
                ["LCP", lighthouse.metrics.lcp],
                ["CLS", lighthouse.metrics.cls],
                ["TBT", lighthouse.metrics.tbt],
                ["Speed Index", lighthouse.metrics.si],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">
                    {k}
                  </dt>
                  <dd className="mt-1 font-mono text-sm text-grolow-brand-bright">{v}</dd>
                </div>
              ))}
            </dl>

            {/* Trazabilidad de la cifra: fecha, perfil y versión. Sin esto un
                score es una opinión. */}
            <p className="mt-6 text-xs leading-relaxed text-white/45">
              {c.scoresNote} {measured} · Lighthouse {lighthouse.lighthouseVersion} ·{" "}
              {lighthouse.formFactor === "mobile"
                ? lang === "es" ? "móvil" : "mobile"
                : lighthouse.formFactor}
              {isLocal ? (
                <> · {c.localBuild}</>
              ) : (
                <>
                  {" · "}
                  <span className="font-mono break-all">{lighthouse.url}</span>
                </>
              )}
            </p>

            <a
              href={AUDIT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-grolow-brand px-5 py-2.5 text-sm font-bold text-grolow-ink transition-colors hover:bg-white">
              {c.audit}
              <span aria-hidden="true">↗</span>
            </a>
          </Card>

          {/* ── Datos estructurados ── */}
          <Card title={c.dataTitle}>
            <ul className="flex flex-wrap gap-2">
              {SCHEMA_TYPES.map((type) => (
                <li
                  key={type}
                  className="rounded-full border border-grolow-brand/30 bg-grolow-brand/[0.08] px-3 py-1.5 font-mono text-xs text-grolow-brand-bright">
                  {type}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-white/60">
              {c.dataBody}
            </p>
          </Card>

          {/* ── Stack ── */}
          <Card title={c.stackTitle} className="lg:col-span-3">
            <p className="mb-7 max-w-2xl text-sm text-white/60">{c.stackBody}</p>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {STACK.map((group) => (
                <div key={group.layer.es}>
                  <h4 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">
                    {group.layer[lang]}
                  </h4>
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-xs text-white/80">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* ── Barra de herramientas ── */}
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.025] px-6 py-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
              {c.toolsLabel}
            </span>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {TOOLS.map((tool) => (
                <li key={tool.name}>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/70 underline-offset-4 transition-colors hover:text-grolow-brand-bright hover:underline">
                    {tool.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
