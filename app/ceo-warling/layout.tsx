import type { Metadata } from 'next';
import { Syne } from 'next/font/google';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
});

export const metadata: Metadata = {
  title: 'Warling López — Full-Stack Developer & Founder',
  description:
    'Portfolio profesional de Warling López: desarrollador full-stack y fundador de Grolow. Next.js, React, TypeScript y sistemas a medida que escalan.',
  keywords: [
    'Warling López',
    'full-stack developer',
    'Next.js',
    'React',
    'TypeScript',
    'Grolow',
    'República Dominicana',
  ],
  authors: [{ name: 'Warling López' }],
  openGraph: {
    title: 'Warling López — Full-Stack Developer & Founder',
    description:
      'Desarrollador full-stack y fundador de Grolow. Construyo sistemas a medida que escalan.',
    url: 'https://www.grolow.com/ceo-warling',
    siteName: 'Warling López',
    locale: 'es_DO',
    type: 'profile',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CeoWarlingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // La variable --font-syne alimenta los títulos de toda la ruta.
  return <div className={syne.variable}>{children}</div>;
}
