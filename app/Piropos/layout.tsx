import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PIROPOS · Casa de Perfumes — El perfume #1 de República Dominicana',
  description:
    'Casa de perfumes dominicana en Santiago. Extrait de Parfum de fabricación propia. Elige tu perfume, transfiere y recibe en todo el país.',
  // Demo de presentación: no se indexa hasta que el cliente apruebe.
  robots: { index: false, follow: false },
};

export default function PiroposLayout({ children }: { children: React.ReactNode }) {
  return children;
}
