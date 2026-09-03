/**
 * Checklist de calidad final: lo que no cubre `seo:check`.
 *
 * Accesibilidad, integridad de imágenes, landmarks semánticos, cadenas de
 * redirección y los enlaces externos de los casos. Todo contra el HTML servido.
 *
 * Uso:
 *   node scripts/qa-check.mjs                      # contra localhost:3000
 *   node scripts/qa-check.mjs http://localhost:3111
 */

const BASE = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");

const problems = [];
const notes = [];

function fail(where, message) {
  problems.push(`${where}\n    ${message}`);
}

async function get(path) {
  const response = await fetch(`${BASE}${path}`, { redirect: "manual" });
  return { response, body: await response.text() };
}

/** Quita etiquetas para saber si un elemento tiene texto visible. */
function strip(html) {
  return html
    .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;|&#x?[0-9a-f]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function checkPage(path) {
  const { response, body } = await get(path);
  if (response.status !== 200) {
    fail(path, `devuelve ${response.status}`);
    return;
  }

  // ── Landmarks semánticos ──────────────────────────────────────────────
  const mains = (body.match(/<main[\s>]/g) ?? []).length;
  if (mains !== 1) fail(path, `${mains} elementos <main>, debe haber exactamente 1`);
  if (!/<nav[\s>]/.test(body)) fail(path, "sin landmark <nav>");
  if (!/<footer[\s>]/.test(body)) fail(path, "sin landmark <footer>");

  // ── Imágenes ──────────────────────────────────────────────────────────
  for (const tag of body.match(/<img\b[^>]*>/gi) ?? []) {
    const src = (tag.match(/\ssrc="([^"]*)"/) ?? [])[1] ?? "(sin src)";
    if (!/\salt=/.test(tag)) {
      fail(path, `<img> sin atributo alt: ${src}`);
      continue;
    }
    const alt = (tag.match(/\salt="([^"]*)"/) ?? [])[1] ?? "";
    // El alt vacío solo es correcto en imágenes decorativas, que aquí van
    // dentro de un contenedor aria-hidden.
    if (alt === "" && !/aria-hidden/.test(tag)) {
      notes.push(`${path}: <img alt=""> en ${src} — decorativa, comprobar que el contenedor sea aria-hidden`);
    }
    if (/\.(webp|png|jpe?g)$/i.test(alt) || /^imagen?\s*\d*$/i.test(alt)) {
      fail(path, `alt no descriptivo ("${alt}") en ${src}`);
    }
  }

  // ── Enlaces con nombre accesible ──────────────────────────────────────
  for (const anchor of body.match(/<a\b[^>]*>[\s\S]*?<\/a>/gi) ?? []) {
    const open = anchor.slice(0, anchor.indexOf(">") + 1);
    const hasLabel = /aria-label="[^"]+"/.test(open) || /title="[^"]+"/.test(open);
    if (!hasLabel && strip(anchor) === "") {
      const href = (open.match(/href="([^"]*)"/) ?? [])[1] ?? "?";
      fail(path, `enlace sin texto ni aria-label: ${href}`);
    }
  }

  // ── Botones con nombre accesible ──────────────────────────────────────
  for (const button of body.match(/<button\b[^>]*>[\s\S]*?<\/button>/gi) ?? []) {
    const open = button.slice(0, button.indexOf(">") + 1);
    if (!/aria-label="[^"]+"/.test(open) && strip(button) === "") {
      fail(path, "botón sin texto ni aria-label");
    }
  }

  // ── `lang` coherente ──────────────────────────────────────────────────
  if (!/<html[^>]*\slang="/.test(body)) fail(path, "sin atributo lang en <html>");
}

/** Ninguna redirección debe encadenar más de un salto. */
async function checkRedirectChains() {
  const starts = [
    "/",
    "/servicios",
    "/catalogos",
    "/catalogos-whatsapp",
    "/gracias",
    "/precios",
    "/contacto",
    "/casos",
  ];
  for (const start of starts) {
    let path = start;
    const hops = [];
    for (let i = 0; i < 5; i++) {
      const { response } = await get(path);
      if (response.status < 300 || response.status >= 400) break;
      const location = response.headers.get("location") ?? "";
      hops.push(`${response.status} → ${location}`);
      const next = location.startsWith("http") ? new URL(location).pathname : location;
      if (!next || next === path) break;
      path = next;
    }
    if (hops.length > 1) {
      fail(start, `cadena de ${hops.length} redirecciones: ${hops.join("  |  ")}`);
    }
  }
}

/** Los casos afirman que estos sitios están en línea: hay que comprobarlo. */
async function checkCaseStudySites() {
  const sites = [
    "https://laperfum1.com/",
    "https://hellenscute.com/",
    "https://www.warling.top/",
  ];
  for (const site of sites) {
    try {
      const response = await fetch(site, { redirect: "follow", signal: AbortSignal.timeout(20000) });
      if (!response.ok) {
        fail(site, `el caso de éxito lo cita como en línea y devuelve ${response.status}`);
      }
    } catch (error) {
      fail(site, `el caso de éxito lo cita como en línea y no responde: ${error.message}`);
    }
  }
}

/** Afirmaciones que exigen medición antes de publicarse. */
async function checkClaims() {
  const risky = [
    ["menos de 1 segundo", "velocidad sin medición publicada"],
    ["under 1 second", "velocidad sin medición publicada"],
    ["garantizado en Google", "posición garantizada en buscadores"],
    ["primera página de Google garantizada", "posición garantizada en buscadores"],
  ];
  const { body } = await get("/es");
  const { body: bodyEn } = await get("/en");
  for (const [phrase, why] of risky) {
    for (const [label, html] of [["/es", body], ["/en", bodyEn]]) {
      // Solo cuenta si la afirmación es propia, no si se cita como mala práctica.
      if (html.toLowerCase().includes(phrase.toLowerCase())) {
        notes.push(`${label}: afirma "${phrase}" — ${why}; verificar o retirar`);
      }
    }
  }
}

console.log(`Revisión de calidad sobre ${BASE}\n`);

const { body: sitemap } = await get("/sitemap.xml");
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
  new URL(m[1]).pathname,
);
// Las legales están fuera del sitemap (noindex) pero también se revisan.
paths.push("/es/politica-de-privacidad", "/es/politica-de-cookies", "/es/terminos-y-condiciones");

for (const path of paths) await checkPage(path);
await checkRedirectChains();
await checkCaseStudySites();
await checkClaims();

console.log(`  · ${paths.length} páginas revisadas`);
for (const note of notes) console.log(`  · ${note}`);
console.log();

if (problems.length === 0) {
  console.log("✅ Sin problemas.");
  process.exit(0);
}
console.log(`❌ ${problems.length} problema(s):\n`);
for (const problem of problems) console.log(`  ${problem}\n`);
process.exit(1);
