import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    // Como tienes los componentes dentro de app, esta única ruta ya escanea 
    // tus page.tsx, layout.tsx y todo lo que esté en app/components/
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '.dark'], // ya lo tienes
  theme: {
    extend: {
      colors: {
        grolow: {
          cyan: '#009b9b', // Color principal del logo en modo oscuro
          teal: '#004d4d', // Color principal del logo en modo claro
          dark: '#050505', // Fondo negro profundo
          light: '#f8fafc', // Fondo claro
        }
      },
    },
  },
  plugins: [],
}
export default config