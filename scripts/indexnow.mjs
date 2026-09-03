/**
 * Notifica a IndexNow que las URLs del sitio cambiaron.
 *
 * IndexNow lo consumen Bing y Yandex (y Yahoo por vía del índice de Bing): la
 * indexación pasa de días a minutos. Google no lo usa, así que sigue haciendo
 * falta el sitemap. Ninguna agencia local del sector lo implementa.
 *
 * Uso:
 *   node scripts/indexnow.mjs           # envía las URLs indexables
 *   node scripts/indexnow.mjs --dry-run # imprime lo que enviaría
 *
 * Se ejecuta solo en `postbuild` de producción; en previews y en local no
 * dispara nada, para no anunciar como pública una URL de preview.
 */

const KEY = "0deeefb9ef99b29d454c912c326c0619";
const HOST = "www.grolow.com";
const SITE_URL = `https://${HOST}`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

// Espejo del registro de `app/lib/i18n.ts`, limitado a lo indexable. Se
// mantiene aquí a mano porque el script corre fuera del bundle de Next.
const PATHS = [
  "/es",
  "/en",
  "/es/servicios",
  "/en/services",
  "/es/tienda-online-whatsapp",
];

const urlList = PATHS.map((path) => `${SITE_URL}${path}`);

const dryRun = process.argv.includes("--dry-run");
const isProduction =
  process.env.VERCEL_ENV === "production" || process.env.INDEXNOW_FORCE === "1";

if (!dryRun && !isProduction) {
  console.log(
    "[indexnow] omitido: no es un despliegue de producción " +
      "(usa INDEXNOW_FORCE=1 para forzarlo).",
  );
  process.exit(0);
}

const payload = { host: HOST, key: KEY, keyLocation: `${SITE_URL}/${KEY}.txt`, urlList };

if (dryRun) {
  console.log("[indexnow] dry-run, se enviaría:");
  console.log(JSON.stringify(payload, null, 2));
  process.exit(0);
}

try {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  // 200 = aceptado. 202 = aceptado, clave pendiente de validar.
  if (response.ok) {
    console.log(
      `[indexnow] ${response.status} — ${urlList.length} URLs enviadas.`,
    );
  } else {
    console.warn(
      `[indexnow] respuesta ${response.status}: ${await response.text()}`,
    );
  }
} catch (error) {
  // Nunca debe tumbar un despliegue: es una señal de mejora, no un requisito.
  console.warn("[indexnow] no se pudo notificar:", error.message);
}
