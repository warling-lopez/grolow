import type { Lang, RouteId } from "@/app/lib/i18n";

/**
 * Nombre corto de cada ruta. Se usa en las migas de pan y en los enlaces
 * internos, donde el anchor text tiene que describir el destino.
 */
export const NAV_LABEL: Record<RouteId, Record<Lang, string>> = {
  home: { es: "Inicio", en: "Home" },
  servicios: { es: "Servicios", en: "Services" },
  desarrolloWeb: {
    es: "Desarrollo web a medida",
    en: "Custom web development",
  },
  disenoWeb: {
    es: "Diseño web en Santo Domingo",
    en: "Web design in Santo Domingo",
  },
  software: {
    es: "Desarrollo de software a medida",
    en: "Custom software development",
  },
  tiendaWhatsapp: {
    es: "Tienda en línea con WhatsApp",
    en: "WhatsApp online store",
  },
  apps: { es: "Aplicaciones móviles", en: "Mobile apps" },
  empresas: { es: "Sitios web para empresas", en: "Websites for companies" },
  consultores: {
    es: "Sitios web para consultoras",
    en: "Websites for consultants",
  },
  creadores: {
    es: "Sitios web para creadores",
    en: "Websites for creators",
  },
  precios: { es: "Precios", en: "Pricing" },
  casos: { es: "Casos", en: "Case studies" },
  casoLaperfum: { es: "La Perfurm RD", en: "La Perfurm RD" },
  casoHellens: { es: "Hellen's Cute Kids", en: "Hellen's Cute Kids" },
  casoWarling: { es: "Warling Dev", en: "Warling Dev" },
  contacto: { es: "Contacto", en: "Contact" },
  blog: { es: "Blog", en: "Blog" },
  blogPrecios: {
    es: "Cuánto cuesta una página web en RD",
    en: "What a website costs in the DR",
  },
  blogWordpress: {
    es: "WordPress o código a medida",
    en: "WordPress or custom code",
  },
  privacidad: { es: "Política de privacidad", en: "Privacy policy" },
  cookies: { es: "Política de cookies", en: "Cookie policy" },
  terminos: { es: "Términos y condiciones", en: "Terms and conditions" },
  clinicas: { es: "Webs para clínicas", en: "Websites for clinics" },
  gracias: { es: "Gracias", en: "Thank you" },
};
