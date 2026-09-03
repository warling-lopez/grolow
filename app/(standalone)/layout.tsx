import type { Metadata } from "next";
import ClientLayout from "@/app/components/ClientLayout";
import Analytics from "@/app/components/Analytics";
import { SITE_URL } from "@/app/lib/i18n";
import "../globals.css";

/**
 * Root layout de las landings que no llevan prefijo de idioma: sitios de
 * cliente (VisualLab, Hermon Dental) y páginas personales. Se mantienen fuera
 * de `/es` y `/en` porque no compiten por las palabras clave de Grolow y sus
 * URLs ya están compartidas tal cual.
 *
 * Cada grupo de rutas tiene su propio root layout, así que la portada del
 * sitio puede declarar `<html lang>` dinámico sin volver dinámico todo el
 * renderizado.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
};

export default function StandaloneRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-DO" className="bg-grolow-dark">
      <body className="antialiased text-grolow-light relative">
        <ClientLayout>{children}</ClientLayout>
        <Analytics />
      </body>
    </html>
  );
}
