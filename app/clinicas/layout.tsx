import type { Metadata } from 'next';

const DESCRIPTION =
  'Tus pacientes agendan solos, a cualquier hora, sin ocupar a tu recepcionista. Recordatorios automáticos para que no falten a la cita. Listo en una semana.';

/**
 * SIN PUBLICAR — a la espera del primer caso real de clínica.
 *
 * `index: false` mantiene la página fuera de Google y no está enlazada desde
 * el menú ni desde la home: es accesible por URL directa para usarla en
 * mensajes en frío, pero no funciona como landing pública.
 *
 * PARA PUBLICARLA cuando cierres la primera clínica:
 *   1. cambia `robots` a { index: true, follow: true }
 *   2. añade el caso real en ProjectsSection y activa el bloque `projects`
 *      del config en page.tsx
 *   3. enlázala desde el menú (NAV_LINKS en Header.tsx)
 */
export const metadata: Metadata = {
  title: 'Webs para clínicas con citas en línea | Grolow',
  description: DESCRIPTION,
  alternates: { canonical: '/webs-para-clinicas' },
  openGraph: {
    title: 'Tus pacientes agendan solos, sin ocupar a tu recepcionista',
    description: DESCRIPTION,
    url: 'https://www.grolow.com/webs-para-clinicas',
    siteName: 'Grolow',
    locale: 'es_DO',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Grolow — Webs para clínicas' }],
  },
  robots: { index: false, follow: false },
};

export default function ClinicasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
