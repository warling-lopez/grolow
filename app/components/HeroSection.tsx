export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col justify-center items-center px-6 py-20 text-center overflow-hidden bg-grolow-dark light:bg-grolow-light">

      {/* Grid de fondo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,155,155,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,155,155,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Glow central */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,155,155,0.12) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.14em] uppercase text-grolow-cyan border border-grolow-cyan/25 bg-grolow-cyan/[0.07] px-4 py-1.5 rounded-full mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-grolow-cyan animate-pulse" />
          Infraestructura digital
        </div>

        {/* Marca */}
        <p className="text-xs font-bold tracking-[0.28em] uppercase text-grolow-cyan mb-5">
          Grolow
        </p>

        {/* Headline */}
        <h1 className="text-5xl md:text-[70px] font-extrabold leading-[1.04] tracking-tight text-grolow-light light:text-grolow-dark mb-7">
          Escala sin tu{" "}
          <span className="relative text-grolow-cyan after:absolute after:bottom-1 after:left-0 after:right-0 after:h-[2px] after:bg-grolow-cyan/25 after:rounded">
            presencia manual.
          </span>
        </h1>

        {/* Descripción */}
        <p className="text-[17px] font-light leading-[1.75] text-slate-400 light:text-slate-500 max-w-[520px] mb-12">
          No vendemos diseño. Construimos{" "}
          <strong className="font-medium text-slate-300 light:text-slate-700">
            infraestructura digital de alto rendimiento
          </strong>{" "}
          para dueños de negocio que quieren sistemas, no dolores de cabeza.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          
           <a href="#contacto"
            className="group inline-flex items-center gap-2 px-7 py-3.5 bg-grolow-cyan text-grolow-dark font-semibold rounded-lg border-[1.5px] border-grolow-cyan hover:bg-[#00b3b3] hover:border-[#00b3b3] transition-all hover:-translate-y-px text-[15px]"
          >
            Sistematizar mi negocio
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a> <a
          
            href="#servicios"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-transparent text-grolow-light light:text-grolow-dark font-medium rounded-lg border-[1.5px] border-white/15 light:border-grolow-dark/20 hover:border-white/40 light:hover:border-grolow-dark/50 hover:bg-white/[0.04] transition-all text-[15px]"
          >
            Ver infraestructura
          </a>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center mt-16 pt-10 border-t border-white/[0.06] light:border-grolow-dark/10">
          {[
            { value: "3×", label: "más eficiencia" },
            { value: "48h", label: "entrega" },
            { value: "0", label: "dolores de cabeza" },
          ].map((stat, i, arr) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center gap-1 px-9 ${i < arr.length - 1 ? "border-r border-white/[0.06] light:border-grolow-dark/10" : ""}`}
            >
              <span className="font-extrabold text-[30px] leading-none text-grolow-cyan" style={{ fontFamily: "'Syne', sans-serif" }}>
                {stat.value}
              </span>
              <span className="text-[11px] uppercase tracking-wider text-slate-600 light:text-slate-400">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}