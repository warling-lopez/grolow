import type { Metadata } from 'next';
import Script from 'next/script';
import ClientLayout from '@/app/components/ClientLayout';
import './globals.css';

/** Descripción única reutilizada en meta, Open Graph y Twitter. */
const SITE_DESCRIPTION =
  'Convertimos tu catálogo en una tienda en línea que envía los pedidos directo a tu WhatsApp. Sin comisiones por venta. Propuesta en 24 horas. República Dominicana.';

const SITE_TITLE = 'Grolow — Tu catálogo en línea, los pedidos a tu WhatsApp';

export const metadata: Metadata = {
  // Necesario para que /og-image.png se resuelva a URL absoluta: WhatsApp
  // descarta las previsualizaciones con rutas relativas.
  metadataBase: new URL('https://www.grolow.com'),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: ['catálogo online', 'tienda whatsapp', 'página web República Dominicana', 'pedidos por whatsapp', 'tienda en línea RD', 'diseño web Santo Domingo'],
  authors: [{ name: 'Grolow' }],
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: 'https://www.grolow.com',
    siteName: 'Grolow',
    locale: 'es_DO',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Grolow — Tu catálogo en línea, los pedidos a tu WhatsApp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Grolow",
  "description": SITE_DESCRIPTION,
  "slogan": "Tu catálogo en línea, los pedidos a tu WhatsApp.",
  "url": "https://www.grolow.com",
  "logo": "https://www.grolow.com/logo.png",
  "areaServed": "DO",
  "sameAs": [
    "https://www.facebook.com/share/1KWFa6vDno/?mibextid=wwXIfr",
    "https://www.instagram.com/grolow.studio/",
  ]
};  
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="bg-grolow-dark">
      <body className="antialiased text-grolow-light relative">
        {/* Estaba declarado pero nunca se inyectaba: sin esto Google no ve
            los datos estructurados del negocio. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-Q8RNVKKBJZ"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-Q8RNVKKBJZ');
        `}
      </Script>
    </html>
  );
}
