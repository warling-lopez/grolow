import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Solicitud recibida — Grolow Studio',
  robots: { index: false, follow: false },
};

export default function GraciasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
