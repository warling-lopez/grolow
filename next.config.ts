import type { NextConfig } from "next";

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
    return LEGACY_REDIRECTS.map(({ source, destination }) => ({
      source,
      destination,
      statusCode: 301,
    }));
  },

  images: {
    // AVIF primero, WebP de reserva.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
