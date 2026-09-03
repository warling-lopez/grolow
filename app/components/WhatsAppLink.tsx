"use client";

import { usePathname } from "next/navigation";
import { trackWhatsAppClick } from "@/app/lib/analytics";
import { whatsappHref } from "@/app/lib/i18n";

/**
 * Enlace a WhatsApp que registra desde qué página se hizo clic.
 *
 * Toda salida a WhatsApp debería pasar por aquí: es la única forma de saber
 * qué página de servicio o de segmento está generando conversaciones, que es
 * la pregunta que decide qué contenido ampliar.
 */
export default function WhatsAppLink({
  message,
  placement,
  className,
  children,
  ariaLabel,
}: {
  /** Mensaje precargado, contextual a la página. */
  message: string;
  /** Dónde está el botón: `cta`, `floating`, `header`… */
  placement: string;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  const pathname = usePathname() ?? "/";

  return (
    <a
      href={whatsappHref(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      onClick={() => trackWhatsAppClick(pathname, placement)}
      className={className}>
      {children}
    </a>
  );
}
