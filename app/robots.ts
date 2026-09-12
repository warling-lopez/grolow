import type { MetadataRoute } from "next";
import { SITE_URL } from "@/app/lib/i18n";

/**
 * `bingbot` y `Slurp` (Yahoo, que consume el índice de Bing) quedan permitidos
 * al no existir ningún `Disallow` que los alcance. Solo se excluye `/api`, que
 * no tiene nada que indexar.
 *
 * Los rastreadores de IA se declaran uno a uno aunque la regla `*` ya los
 * cubra. No cambia el comportamiento: cambia la señal. Un `Allow` explícito
 * documenta que la decisión es deliberada y no un descuido, y algunos
 * operadores comprueban su propio user-agent antes que el comodín.
 *
 * Para un estudio que vende servicios, aparecer en las respuestas de un motor
 * generativo vale más que proteger el texto de la web: el contenido ya es
 * público y el coste de que lo citen es cero.
 *
 * Ojo: esto no sirve de nada si el edge (Vercel Bot Protection, Cloudflare AI
 * Scrapers) los bloquea antes. Comprobar con:
 *   curl -A "GPTBot/1.0" -sI https://www.grolow.com/es | head -1
 */
const AI_CRAWLERS = [
  "GPTBot",            // OpenAI — entrenamiento
  "OAI-SearchBot",     // OpenAI — índice de ChatGPT Search
  "ChatGPT-User",      // OpenAI — navega por petición del usuario
  "ClaudeBot",         // Anthropic — entrenamiento
  "Claude-SearchBot",  // Anthropic — búsqueda
  "Claude-User",       // Anthropic — navega por petición del usuario
  "PerplexityBot",     // Perplexity — índice
  "Perplexity-User",   // Perplexity — navega por petición del usuario
  "Google-Extended",   // Google — Gemini y AI Overviews
  "Applebot-Extended", // Apple — Apple Intelligence
  "meta-externalagent",// Meta
  "Bytespider",        // ByteDance
  "Amazonbot",         // Amazon
  "cohere-ai",         // Cohere
];
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: "/api/",
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
