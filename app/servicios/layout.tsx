import type { Metadata } from 'next';

const DESCRIPTION =
  'Tiendas online con pedidos por WhatsApp, landing pages de conversión, webs de servicios y citas, e-commerce completo y sistemas a medida. Entrega desde 72 horas.';

export const metadata: Metadata = {
  title: 'Servicios de desarrollo web | Grolow',
  description: DESCRIPTION,
  keywords: ['servicios desarrollo web', 'tienda whatsapp', 'landing page República Dominicana', 'e-commerce', 'sistema a medida', 'diseño web Santo Domingo'],
  alternates: { canonical: '/servicios' },
  openGraph: {
    title: 'Servicios de desarrollo web | Grolow',
    description: DESCRIPTION,
    url: 'https://www.grolow.com/servicios',
    siteName: 'Grolow',
    locale: 'es_DO',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Grolow — Servicios de desarrollo web' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Servicios de desarrollo web | Grolow',
    description: DESCRIPTION,
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

export default function ServiciosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
