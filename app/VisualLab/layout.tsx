import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VISUAL LAB · Laboratorio Gráfico Visual | Santo Domingo",
  description:
    "Fabricación de letreros luminosos, placas de acrílico, papelería, regalos y textiles personalizados en Santo Domingo. Todo lo personalizamos. Cotiza en 1 minuto por WhatsApp.",
  robots: { index: true, follow: true },
};

export default function VisualLabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
