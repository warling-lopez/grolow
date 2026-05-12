const metrics = [
  { value: "72h", label: "Tiempo promedio de entrega", sub: "Rápido y funcional" },
  { value: "0%", label: "Comisiones por ventas", sub: "El 100% de tu dinero es tuyo" },
  { value: "24/7", label: "Tu sistema trabaja solo", sub: "Automatización total" },
];

export default function ValuePropSection() {
  return (
    <section className="w-full py-32 px-6 bg-grolow-dark border-y border-white/[.05] relative overflow-hidden">
      {/* Grid background sutil para darle aspecto técnico */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="max-w-xl">
            <span className="block text-[11px] font-medium tracking-[.2em] uppercase text-grolow-cyan mb-8">
              Por qué elegir Grolow
            </span>
            <blockquote className="font-extrabold text-4xl md:text-5xl leading-[1.1] tracking-tighter text-white mb-10" style={{ fontFamily: "'Syne', sans-serif" }}>
              "El mejor software <br />es el que <span className="text-transparent bg-clip-text bg-gradient-to-r from-grolow-cyan to-white/50 italic">no notas.</span>"
            </blockquote>
            <p className="text-lg font-light leading-relaxed text-slate-400">
              Si tu web requiere atención constante, no es una herramienta — es un empleado ineficiente. Construimos sistemas que operan en segundo plano, <strong className="text-white font-medium">capturando clientes y procesando ventas automáticamente</strong> desde tu tráfico orgánico y pautado.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {metrics.map((m, index) => (
              <div 
                key={m.value} 
                className={`bg-[#080808] border border-white/[.05] p-10 flex flex-col justify-between hover:border-grolow-cyan/30 transition-colors ${index === 2 ? 'sm:col-span-2' : ''}`}
              >
                <div>
                  <p className="font-extrabold text-5xl md:text-6xl text-white tracking-tighter mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
                    {m.value}
                  </p>
                  <p className="text-sm text-grolow-cyan font-bold uppercase tracking-wider">{m.label}</p>
                </div>
                <p className="text-xs text-slate-600 mt-8 tracking-wide">{m.sub}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}