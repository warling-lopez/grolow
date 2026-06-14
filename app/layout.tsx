import type { Metadata } from 'next';
import Script from 'next/script';
import ClientLayout from '@/app/components/ClientLayout';
import './globals.css';

export const metadata: Metadata = {
  title: 'Grolow Studio — Webs que venden, no solo que se ven bien',
  description: 'Agencia de desarrollo web en República Dominicana. Landing pages, tiendas online, apps móviles y sistemas a medida. Diagnóstico gratis en 24h.',
  keywords: ['desarrollo web', 'landing page', 'tienda online', 'República Dominicana', 'agencia web', 'Grolow'],
  authors: [{ name: 'Grolow Studio' }],
  openGraph: {
    title: 'Grolow Studio — Webs que venden',
    description: 'Tu negocio merece una web que venda. Desarrollo web profesional desde $250. Diagnóstico gratis.',
    url: 'https://grolow.agency',
    siteName: 'Grolow Studio',
    locale: 'es_DO',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Grolow Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grolow Studio — Webs que venden',
    description: 'Tu negocio merece una web que venda. Desarrollo web profesional desde $250.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="bg-grolow-dark">
      <body className="antialiased text-white relative">
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
