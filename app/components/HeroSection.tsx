export default function HeroSection() {
  return (
    <section className="w-full min-h-[90vh] flex flex-col justify-center items-center px-6 py-20 text-center">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-grolow-teal dark:text-grolow-cyan">
          Grolow
        </h1>
        <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
          Escala tu negocio sin tu presencia manual.
        </h2>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mt-4 max-w-2xl">
          No vendemos diseño. Construimos infraestructura digital de alto rendimiento para dueños de negocio que quieren sistemas, no dolores de cabeza.
        </p>
        <div className="mt-8 flex flex-col w-full sm:w-auto sm:flex-row gap-4">
          <a 
            href="#contacto" 
            className="w-full sm:w-auto px-8 py-4 bg-grolow-teal text-white dark:bg-grolow-cyan dark:text-black font-bold rounded-lg shadow-lg hover:opacity-90 transition-opacity text-lg text-center"
          >
            Sistematizar mi negocio
          </a>
          <a 
            href="#servicios" 
            className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-grolow-teal text-grolow-teal dark:border-grolow-cyan dark:text-grolow-cyan font-bold rounded-lg hover:bg-grolow-teal/10 dark:hover:bg-grolow-cyan/10 transition-colors text-lg text-center"
          >
            Ver infraestructura
          </a>
        </div>
      </div>
    </section>
  )
}
