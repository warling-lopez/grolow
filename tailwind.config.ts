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
          cyan: '#004643', // Acento verde profundo (antes cyan #009b9b) — modo claro
          teal: '#004643', // Acento verde profundo
          dark: '#F6F1E2', // Token de fondo: crema cálido
          light: '#0E1512', // Token de texto: ink
        }
      },
    },
  },
  plugins: [],
}
export default config