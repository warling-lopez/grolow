import type { Metadata } from 'next';
import Script from 'next/script';
import ClientLayout from '@/app/components/ClientLayout';
import './globals.css';

export const metadata: Metadata = {
  title: 'Grolow — Infraestructura digital que automatiza tus ventas',
  description: 'Agencia de infraestructura digital y sistemas de ventas. Construimos plataformas a medida que automatizan procesos y optimizan operaciones. Propuesta en 24h.',
  keywords: ['infraestructura digital', 'automatización de ventas', 'sistemas a medida', 'plataformas', 'República Dominicana', 'agencia digital', 'Grolow'],
  authors: [{ name: 'Grolow' }],
  openGraph: {
    title: 'Grolow — Infraestructura digital que automatiza tus ventas',
    description: 'Construimos la infraestructura digital que automatiza tus ventas y optimiza tus operaciones. Sistemas a medida para negocios que escalan.',
    url: 'https://grolow.agency',
    siteName: 'Grolow',
    locale: 'es_DO',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Grolow — Agencia de Infraestructura Digital',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grolow — Infraestructura digital que automatiza tus ventas',
    description: 'Construimos la infraestructura digital que automatiza tus ventas y optimiza tus operaciones.',
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
  "description": "Agencia de infraestructura digital y sistemas de ventas. Construimos plataformas a medida que automatizan procesos y optimizan operaciones.",
  "slogan": "Infraestructura digital que automatiza tus ventas.",
  "url": "https://www.grolow.com",
  "logo": "https://www.grolow.com/logo.png",
  "areaServed": "DO",
  "sameAs": [
    "https://www.facebook.com/share/1KWFa6vDno/?mibextid=wwXIfr",
    "https://www.instagram.com/grolow.agency/",
  ]
};  
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="bg-grolow-dark">
      <body className="antialiased text-grolow-light relative">
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
