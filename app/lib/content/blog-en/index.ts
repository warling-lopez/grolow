import type { RouteId } from "@/app/lib/i18n";
import type { PageContent } from "../types";
import { blogEn } from "./blog";
import { blogPreciosEn } from "./precios";
import { blogWordpressEn } from "./wordpress";
import { blogPhp2shellEn } from "./php2shell";
import { blogPhpRevisarEn } from "./php-revisar";
import { blogPhpObsoletoEn } from "./php-obsoleto";
import { blogNginxEn } from "./nginx";
import { blogEmudhraEn } from "./emudhra";
import { blogCertificadosEn } from "./certificados";
import { blogSemanaNegraEn } from "./semana-negra";
import { blogPhpRdEn } from "./php-rd";
import { blogCertificadosRdEn } from "./certificados-rd";
import { blogLeyRdEn } from "./ley-rd";
import { blogQueEsGrolowEn } from "./que-es-grolow";
import { blogQuienEsGrolowEn } from "./quien-es-grolow";
import { blogMensualidadEn } from "./mensualidad";
import { blogPropiedadEn } from "./propiedad";
import { blogLoQueNoHaceEn } from "./lo-que-no-hace";
import { blogCatalogoTiendaEn } from "./catalogo-tienda";
import { blogPagosRdEn } from "./pagos-rd";
import { blogSistemaMedidaEn } from "./sistema-medida";
import { blogAntesDeContratarEn } from "./antes-de-contratar";
import { blogNoApareceGoogleEn } from "./no-aparece-google";

/**
 * Versión en inglés del blog. Cada artículo vive en su propio archivo y se
 * suma como variante `en` en `content/index.ts`, sin tocar los textos en
 * español.
 */
export const BLOG_EN: Partial<Record<RouteId, PageContent>> = {
  blog: blogEn,
  blogPrecios: blogPreciosEn,
  blogWordpress: blogWordpressEn,
  blogPhp2shell: blogPhp2shellEn,
  blogPhpRevisar: blogPhpRevisarEn,
  blogPhpObsoleto: blogPhpObsoletoEn,
  blogNginx: blogNginxEn,
  blogEmudhra: blogEmudhraEn,
  blogCertificados: blogCertificadosEn,
  blogSemanaNegra: blogSemanaNegraEn,
  blogPhpRd: blogPhpRdEn,
  blogCertificadosRd: blogCertificadosRdEn,
  blogLeyRd: blogLeyRdEn,
  blogQueEsGrolow: blogQueEsGrolowEn,
  blogQuienEsGrolow: blogQuienEsGrolowEn,
  blogMensualidad: blogMensualidadEn,
  blogPropiedad: blogPropiedadEn,
  blogLoQueNoHace: blogLoQueNoHaceEn,
  blogCatalogoTienda: blogCatalogoTiendaEn,
  blogPagosRd: blogPagosRdEn,
  blogSistemaMedida: blogSistemaMedidaEn,
  blogAntesDeContratar: blogAntesDeContratarEn,
  blogNoApareceGoogle: blogNoApareceGoogleEn,
};
