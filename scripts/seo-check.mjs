/**
 * Verifica los criterios de aceptación contra el HTML realmente servido.
 *
 * No mira el código fuente a propósito: comprueba lo que recibe un rastreador
 * que no ejecuta JavaScript, que es exactamente lo que hace Bing. Si algo pasa
 * aquí, pasa para Bing y para Yahoo.
 *
 * Uso:
 *   node scripts/seo-check.mjs                      # contra localhost:3000
 *   node scripts/seo-check.mjs https://www.grolow.com
 */

const BASE = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");

const problems = [];
const notes = [];
const seenTitles = new Map();
const seenDescriptions = new Map();
const seenOgImages = new Map();

function fail(url, message) {
  problems.push(`${url}\n    ${message}`);
}

function attr(html, regex) {
  const match = html.match(regex);
  return match ? match[1] : null;
}

function all(html, regex) {
  return [...html.matchAll(regex)].map((m) => m[1]);
}

async function get(path) {
  const response = await fetch(`${BASE}${path}`, { redirect: "manual" });
  return { response, body: await response.text() };
}

/** URLs del sitemap: es la lista que el sitio declara como indexable. */
async function sitemapUrls() {
  const { response, body } = await get("/sitemap.xml");
  if (!response.ok) {
    fail("/sitemap.xml", `no accesible (${response.status})`);
    return [];
  }
  return all(body, /<loc>([^<]+)<\/loc>/g);
}


/** Páginas que el plan exige que superen las 600 palabras de contenido real. */
const LONG_FORM = [
  "desarrollo-web-a-medida", "custom-web-development",
  "diseno-web-santo-domingo", "web-design-santo-domingo",
  "desarrollo-de-software-a-medida", "custom-software-development",
  "tienda-online-whatsapp", "whatsapp-online-store",
  "aplicaciones-moviles", "mobile-app-development",
  "sitios-web-para-empresas", "websites-for-companies",
  "sitios-web-para-consultores", "websites-for-consultants",
  "sitios-web-para-creadores", "websites-for-creators",
];

/**
 * Vocabulario intercambiable de agencia. Si una frase podría estar en el sitio
 * de cualquier competidor, no dice nada sobre este negocio.
 */
const BANNED = [
  "soluciones digitales",
  "resultados reales",
  "creatividad e innovación",
  "productos de la más alta calidad",
  "lorem ipsum",
];

/** Texto visible dentro de <main>, sin etiquetas ni scripts. */
function visibleText(html) {
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  return (main ? main[1] : html)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;|&#x?[0-9a-f]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function countWords(text) {
  return text.split(" ").filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
}

function checkContent(path, body) {
  const text = visibleText(body);

  const slug = path.split("/").filter(Boolean).slice(1).join("/");
  if (LONG_FORM.includes(slug)) {
    const words = countWords(text);
    if (words < 600) {
      fail(path, `${words} palabras de contenido, el mínimo es 600`);
    }
  }

  const lower = text.toLowerCase();
  for (const phrase of BANNED) {
    if (lower.includes(phrase)) {
      fail(path, `usa vocabulario genérico prohibido: "${phrase}"`);
    }
  }

  // Jerarquía de encabezados: no se puede saltar de h2 a h4.
  const levels = [...body.matchAll(/<h([1-6])[\s>]/gi)].map((m) => Number(m[1]));
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] - levels[i - 1] > 1) {
      fail(path, `salto de jerarquía: h${levels[i - 1]} seguido de h${levels[i]}`);
    }
  }

  // Datos estructurados: migas en todas las internas.
  const isInternal = path.split("/").filter(Boolean).length > 1;
  if (isInternal) {
    const blocks = [
      ...body.matchAll(
        /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi,
      ),
    ].map((m) => m[1]);
    const joined = blocks.join(" ");
    if (!joined.includes("BreadcrumbList")) {
      fail(path, "sin BreadcrumbList en los datos estructurados");
    }
    for (const block of blocks) {
      try {
        JSON.parse(block);
      } catch {
        fail(path, "un bloque JSON-LD no es JSON válido");
      }
    }
  }
}

async function checkPage(absoluteUrl) {
  const path = new URL(absoluteUrl).pathname;
  const { response, body } = await get(path);

  if (response.status !== 200) {
    fail(path, `devuelve ${response.status}, se esperaba 200`);
    return;
  }

  // ── Idioma ────────────────────────────────────────────────────────────
  const htmlLang = attr(body, /<html[^>]*\slang="([^"]+)"/);
  if (!htmlLang) fail(path, "sin atributo <html lang>");

  const expected = path.startsWith("/en") ? "en" : "es";
  if (htmlLang && !htmlLang.startsWith(expected)) {
    fail(path, `<html lang="${htmlLang}"> no coincide con el prefijo /${expected}`);
  }

  // Ningún elemento del cuerpo debe contradecir el idioma del documento.
  for (const inner of all(body, /<(?:h1|h2|p)[^>]*\slang="([^"]+)"/g)) {
    if (!inner.startsWith(expected)) {
      fail(path, `elemento con lang="${inner}" dentro de una página ${expected}`);
    }
  }

  // ── Encabezados ───────────────────────────────────────────────────────
  const h1Count = (body.match(/<h1[\s>]/g) ?? []).length;
  if (h1Count !== 1) fail(path, `${h1Count} etiquetas <h1>, debe haber exactamente 1`);

  // ── Metadata ──────────────────────────────────────────────────────────
  const title = attr(body, /<title>([^<]*)<\/title>/);
  if (!title) {
    fail(path, "sin <title>");
  } else {
    if (title.length < 50 || title.length > 60) {
      fail(path, `title de ${title.length} caracteres, fuera del rango 50–60: "${title}"`);
    }
    if (seenTitles.has(title)) {
      fail(path, `title duplicado, ya usado en ${seenTitles.get(title)}`);
    }
    seenTitles.set(title, path);
  }

  const description = attr(body, /<meta name="description" content="([^"]*)"/i);
  if (!description) {
    fail(path, "sin meta description");
  } else {
    if (description.length < 140 || description.length > 160) {
      fail(path, `description de ${description.length} caracteres, fuera del rango 140–160`);
    }
    if (seenDescriptions.has(description)) {
      fail(path, `description duplicada, ya usada en ${seenDescriptions.get(description)}`);
    }
    seenDescriptions.set(description, path);
  }

  if (/<meta name="keywords"/i.test(body)) {
    fail(path, "tiene meta keywords (Bing la trata como señal de spam)");
  }

  checkContent(path, body);

  // ── Open Graph ────────────────────────────────────────────────────────
  const ogImage = attr(body, /<meta property="og:image" content="([^"]*)"/i);
  if (!ogImage) {
    fail(path, "sin og:image");
  } else {
    if (!ogImage.startsWith("https://")) {
      fail(path, `og:image no absoluta: ${ogImage}`);
    }
    if (seenOgImages.has(ogImage)) {
      fail(path, `og:image duplicada, ya usada en ${seenOgImages.get(ogImage)}`);
    }
    seenOgImages.set(ogImage, path);

    // La imagen tiene que existir de verdad: una og:image rota deja cada
    // enlace compartido sin previsualización y no da ningún aviso.
    const image = await get(new URL(ogImage).pathname);
    if (!image.response.ok) {
      fail(path, `og:image devuelve ${image.response.status}`);
    } else {
      const type = image.response.headers.get("content-type") ?? "";
      if (!type.startsWith("image/")) {
        fail(path, `og:image no es una imagen (content-type: ${type})`);
      }
    }
  }

  // ── Canonical ─────────────────────────────────────────────────────────
  const canonicals = all(body, /<link rel="canonical" href="([^"]+)"/gi);
  if (canonicals.length !== 1) {
    fail(path, `${canonicals.length} canonicals, debe haber exactamente 1`);
  } else {
    const canonical = canonicals[0];
    if (!canonical.startsWith("https://")) {
      fail(path, `canonical no absoluta: ${canonical}`);
    }
    if (new URL(canonical).pathname !== path) {
      fail(path, `canonical no autorreferencial: apunta a ${canonical}`);
    }
  }

  // ── hreflang ──────────────────────────────────────────────────────────
  const alternates = [
    ...body.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/gi),
  ].map((m) => ({ lang: m[1], href: m[2] }));

  if (alternates.length === 0) {
    fail(path, "sin etiquetas hreflang");
    return { alternates, path };
  }
  if (!alternates.some((a) => a.lang === "x-default")) {
    fail(path, "sin hreflang x-default");
  }
  const selfReference = alternates.some(
    (a) => a.lang !== "x-default" && new URL(a.href).pathname === path,
  );
  if (!selfReference) fail(path, "hreflang sin autorreferencia");

  for (const alternate of alternates) {
    if (!alternate.href.startsWith("https://")) {
      fail(path, `hreflang no absoluto: ${alternate.href}`);
    }
  }

  return { alternates, path };
}

/** A→B exige B→A. Bing es estricto con esto y descarta el grupo entero si falla. */
function checkReciprocity(pages) {
  const byPath = new Map(pages.map((p) => [p.path, p]));
  for (const page of pages) {
    for (const alternate of page.alternates) {
      if (alternate.lang === "x-default") continue;
      const targetPath = new URL(alternate.href).pathname;
      if (targetPath === page.path) continue;

      const target = byPath.get(targetPath);
      if (!target) continue; // fuera del sitemap: se valida por separado

      const pointsBack = target.alternates.some(
        (a) => a.lang !== "x-default" && new URL(a.href).pathname === page.path,
      );
      if (!pointsBack) {
        fail(page.path, `hreflang no recíproco: ${targetPath} no apunta de vuelta`);
      }
    }
  }
}

async function checkInfrastructure() {
  const robots = await get("/robots.txt");
  if (!robots.response.ok) {
    fail("/robots.txt", `no accesible (${robots.response.status})`);
  } else {
    if (!/Sitemap:/i.test(robots.body)) fail("/robots.txt", "no declara el sitemap");
    if (/Disallow:\s*\/\s*$/m.test(robots.body)) {
      fail("/robots.txt", "bloquea el sitio entero");
    }
    for (const bot of ["bingbot", "Slurp"]) {
      const rule = new RegExp(`User-Agent:\\s*${bot}[\\s\\S]*?Disallow:\\s*/\\s*$`, "im");
      if (rule.test(robots.body)) fail("/robots.txt", `bloquea ${bot}`);
    }
  }

  const key = await get("/0deeefb9ef99b29d454c912c326c0619.txt");
  if (!key.response.ok) {
    fail("/0deeefb9ef99b29d454c912c326c0619.txt", "clave de IndexNow no accesible");
  }

  // 308 y no 307: la raíz y `/es` son la misma página para siempre, y solo el
  // permanente consolida las dos URLs y traspasa la autoridad. Si esto vuelve a
  // salir 307, alguien reintrodujo la redirección fuera de `next.config.ts`.
  const root = await get("/");
  if (root.response.status !== 308) {
    fail("/", `redirige con ${root.response.status}, se esperaba 308`);
  } else if (!(root.response.headers.get("location") ?? "").endsWith("/es")) {
    fail("/", `redirige a ${root.response.headers.get("location")}, se esperaba /es`);
  }

  for (const [from, to] of [
    ["/servicios", "/es/servicios"],
    ["/catalogos", "/es/tienda-online-whatsapp"],
    ["/gracias", "/es/gracias"],
  ]) {
    const legacy = await get(from);
    if (legacy.response.status !== 301) {
      fail(from, `redirige con ${legacy.response.status}, se esperaba 301`);
    } else if (!(legacy.response.headers.get("location") ?? "").endsWith(to)) {
      fail(from, `redirige a ${legacy.response.headers.get("location")}, se esperaba ${to}`);
    }
  }
}

/**
 * Las páginas legales están fuera del sitemap (noindex) mientras tengan
 * marcadores sin rellenar. Se listan aparte para que no se olviden.
 */
async function checkLegalPlaceholders() {
  const legal = [
    "/es/politica-de-privacidad",
    "/es/politica-de-cookies",
    "/es/terminos-y-condiciones",
    "/en/privacy-policy",
    "/en/cookie-policy",
    "/en/terms-and-conditions",
  ];
  let total = 0;
  for (const path of legal) {
    const { response, body } = await get(path);
    if (!response.ok) {
      fail(path, `página legal no accesible (${response.status})`);
      continue;
    }
    const pending = [...body.matchAll(/\[COMPLETAR: ([^\]]+)\]/g)].map((m) => m[1]);
    total += pending.length;
    if (pending.length > 0) {
      notes.push(
        `${path}: ${pending.length} marcador(es) por rellenar — ${[...new Set(pending)].join(", ")}`,
      );
    }
  }
  if (total > 0) {
    notes.push(
      "las legales siguen en noindex: al rellenar los marcadores, poner index: true en i18n.ts",
    );
  }
}

console.log(`Verificando ${BASE}\n`);

await checkInfrastructure();
await checkLegalPlaceholders();

const urls = await sitemapUrls();
notes.push(`${urls.length} URLs en el sitemap`);

const pages = [];
for (const url of urls) {
  const result = await checkPage(url);
  if (result) pages.push(result);
}
checkReciprocity(pages);
notes.push(`${seenOgImages.size} imágenes og:image distintas`);

for (const note of notes) console.log(`  · ${note}`);
console.log();

if (problems.length === 0) {
  console.log("✅ Sin problemas.");
  process.exit(0);
}

console.log(`❌ ${problems.length} problema(s):\n`);
for (const problem of problems) console.log(`  ${problem}\n`);
process.exit(1);
