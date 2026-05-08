import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Grolow | Agencia de Sistemas Web e Infraestructura Digital',
  description: 'Escala tu negocio sin depender de tu presencia manual. Desarrollamos landing pages, tiendas con pedidos a WhatsApp y webs de servicios automatizadas.',
  keywords: ['agencia web', 'sistemas web', 'automatización de ventas', 'tienda whatsapp', 'landing pages', 'grolow'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      {/* Por defecto forzamos el dark mode como pediste, pero dejamos la base para que el OS decida o se cambie por estado */}
      <body className={`${inter.className} bg-grolow-light text-slate-900 dark:bg-grolow-dark dark:text-white antialiased`}>
        {children}
      </body>
    </html>
  )
}