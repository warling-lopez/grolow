import type { Metadata } from 'next';

const DESCRIPTION =
  'Tu inventario completo en un enlace para tu bio de Instagram. El cliente elige y el pedido te llega a WhatsApp ya armado. Sin comisiones por venta. Listo en 72 horas.';

export const metadata: Metadata = {
  title: 'Catálogo en línea con pedidos por WhatsApp | Grolow',
  description: DESCRIPTION,
  keywords: ['catálogo online', 'catálogo whatsapp', 'tienda whatsapp República Dominicana', 'pedidos por whatsapp', 'catálogo para Instagram', 'tienda en línea RD'],
  alternates: { canonical: '/catalogos-whatsapp' },
  openGraph: {
    title: 'Tu catálogo completo en un enlace, los pedidos a tu WhatsApp',
    description: DESCRIPTION,
    url: 'https://www.grolow.com/catalogos-whatsapp',
    siteName: 'Grolow',
    locale: 'es_DO',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Grolow — Catálogos con pedidos por WhatsApp' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tu catálogo completo en un enlace, los pedidos a tu WhatsApp',
    description: DESCRIPTION,
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

export default function CatalogosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
