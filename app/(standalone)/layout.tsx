import type { Metadata } from "next";
import { Open_Sans, Saira } from "next/font/google";
import localFont from "next/font/local";
import ClientLayout from "@/app/components/ClientLayout";
import Analytics from "@/app/components/Analytics";
import { SITE_URL } from "@/app/lib/i18n";
import "../globals.css"; 

/**
 * Root layout de las landings que no llevan prefijo de idioma: sitios de
 * cliente (Hermon Dental) y páginas personales. Se mantienen fuera
 * de `/es` y `/en` porque no compiten por las palabras clave de Grolow y sus
 * URLs ya están compartidas tal cual.
 *
 * Cada grupo de rutas tiene su propio root layout, así que la portada del
 * sitio puede declarar `<html lang>` dinámico sin volver dinámico todo el
 * renderizado.
 */
/**
 * Las mismas tres familias que el sitio principal. Se declaran otra vez porque
 * este es un root layout independiente: `next/font` inyecta las variables en
 * el `<html>` de cada árbol, así que sin repetirlo aquí `font-brand` y las
 * familias de cuerpo y titulares caían al fallback en estas rutas.
 */
const body = Open_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const heading = Saira({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const brand = localFont({
  src: "../fonts/sergio-trendy-latin.woff2",
  variable: "--font-brand-face",
  display: "swap",
  adjustFontFallback: "Arial",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
};

export default function StandaloneRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es-DO"
      className={`${body.variable} ${heading.variable} ${brand.variable} bg-grolow-dark`}>
      <body className="antialiased text-grolow-light relative">
        <ClientLayout>{children}</ClientLayout>
        <Analytics />
      </body>
    </html>
  );
}
