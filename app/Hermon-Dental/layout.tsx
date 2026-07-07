import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'Hermon Dental Clinic — Implantes, Periodoncia y Armonización Facial en Santo Domingo',
  description:
    'Clínica dental 5.0 estrellas en Manoguayabo, Santo Domingo. Implantes, periodoncia y armonización facial. Agenda tu cita por WhatsApp.',
  robots: { index: true, follow: true },
};

export default function HermonLayout({ children }: { children: React.ReactNode }) {
  return children;
}
