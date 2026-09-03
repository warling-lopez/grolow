import type { Metadata } from 'next';
import { Caveat, EB_Garamond } from 'next/font/google';

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
});

const garamond = EB_Garamond({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-garamond',
});

export const metadata: Metadata = {
  title: 'Para yessica 💌',
  description: 'Una carta para mi amiga platónica de mi corazón.',
  robots: { index: false, follow: false },
};

export default function CartaLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${caveat.variable} ${garamond.variable}`}>{children}</div>;
}
