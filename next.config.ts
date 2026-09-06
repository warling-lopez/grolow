import type { NextConfig } from "next";

/**
 * Raíz → idioma por defecto.
 *
 * Vive aquí y no en un `proxy.ts` porque los `redirects` de la configuración se
 * evalúan **antes** que el proxy («Execution order» en la documentación de
 * `proxy`), se resuelven en el CDN y, sobre todo, se emiten como **308
 * permanente**: es la señal que consolida `/` y `/es` en una sola URL y le
 * traspasa la autoridad. El 307 anterior decía justo lo contrario —que la raíz
 * puede cambiar de destino en cualquier momento— y con esa señal el buscador no
 * consolida ni indexa.
 *
 * Consecuencia asumida: se descarta negociar el idioma por `Accept-Language`.
 * El mercado es República Dominicana, el cambio a inglés está en el header, y
 * una redirección que varía según el visitante es incompatible con una
 * permanente (obligaría además a un `Vary: Accept-Language` que hoy no existe).
 */
const ROOT_REDIRECT = {
  source: "/",
  // Literal, como el resto del fichero: `next.config` se evalúa fuera del
  // grafo de módulos de la app y no conviene acoplarlo a `app/lib/i18n`.
  destination: "/es",
  permanent: true, // 308
};

/**
 * Rutas antiguas → rutas nuevas con prefijo de idioma.
 *
 * Todas con 301 explícito (`permanent: true` emitiría 308; los buscadores lo
 * tratan igual, pero el 301 es lo que espera el resto de herramientas y lo que
 * pide el plan). Conservan la autoridad de las URLs que ya estaban indexadas y
 * evitan que convivan dos versiones de la misma página.
 */
const LEGACY_REDIRECTS: { source: string; destination: string }[] = [
  { source: "/servicios", destination: "/es/servicios" },
  { source: "/catalogos", destination: "/es/tienda-online-whatsapp" },
  // Canonical que apuntaba a un 404: la URL nunca existió, pero estaba
  // publicada en el <head>, así que puede estar rastreada.
  { source: "/catalogos-whatsapp", destination: "/es/tienda-online-whatsapp" },
  { source: "/clinicas", destination: "/es/clinicas" },
  { source: "/webs-para-clinicas", destination: "/es/clinicas" },
  { source: "/gracias", destination: "/es/gracias" },

  // Rutas nuevas sin prefijo de idioma: alguien puede teclearlas o enlazarlas
  // sin el /es, y es mejor un salto único que un 404.
  { source: "/contacto", destination: "/es/contacto" },
  { source: "/precios", destination: "/es/precios" },
  { source: "/casos", destination: "/es/casos" },
  { source: "/desarrollo-web-a-medida", destination: "/es/desarrollo-web-a-medida" },
  { source: "/diseno-web-santo-domingo", destination: "/es/diseno-web-santo-domingo" },
  {
    source: "/desarrollo-de-software-a-medida",
    destination: "/es/desarrollo-de-software-a-medida",
  },
  { source: "/tienda-online-whatsapp", destination: "/es/tienda-online-whatsapp" },
  { source: "/aplicaciones-moviles", destination: "/es/aplicaciones-moviles" },
  { source: "/sitios-web-para-empresas", destination: "/es/sitios-web-para-empresas" },
  {
    source: "/sitios-web-para-consultores",
    destination: "/es/sitios-web-para-consultores",
  },
  { source: "/sitios-web-para-creadores", destination: "/es/sitios-web-para-creadores" },
];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      ROOT_REDIRECT,
      ...LEGACY_REDIRECTS.map(({ source, destination }) => ({
        source,
        destination,
        statusCode: 301,
      })),
    ];
  },

  images: {
    // AVIF primero, WebP de reserva.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
