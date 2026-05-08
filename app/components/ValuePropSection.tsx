const metrics = [
  { value: "72h", label: "Tiempo promedio de entrega" },
  { value: "0",   label: "Comisiones por ventas" },
  { value: "24/7",label: "Tu sistema trabaja solo" },
];

export default function ValuePropSection() {
  return (
    <section className="w-full py-24 px-6 bg-[#080808] border-y border-white/[.04]">
      <div className="max-w-3xl mx-auto">
        <span className="block text-[11px] font-medium tracking-[.18em] uppercase text-grolow-cyan mb-8">
          Por qué Grolow
        </span>
        <blockquote className="font-extrabold text-3xl md:text-[38px] leading-[1.15] tracking-tight text-grolow-light mb-10" style={{ fontFamily: "'Syne', sans-serif" }}>
          "El mejor software<br />es el que{" "}
          <span className="text-grolow-cyan">no notas.</span>"
        </blockquote>
        <p className="text-[17px] font-light leading-[1.8] text-slate-500 max-w-2xl">
          Si tu web requiere atención constante, no es una herramienta — es un empleado ineficiente. En Grolow construimos sistemas que operan en segundo plano,{" "}
          <strong className="font-medium text-slate-400">
            capturando clientes y procesando ventas automáticamente
          </strong>{" "}
          desde tu tráfico de Instagram y TikTok.
        </p>

        <div className="grid grid-cols-3 divide-x divide-white/[.05] border border-white/[.05] rounded-xl overflow-hidden mt-14">
          {metrics.map((m) => (
            <div key={m.value} className="bg-[#080808] px-6 py-7">
              <p className="font-extrabold text-3xl text-grolow-cyan leading-none" style={{ fontFamily: "'Syne', sans-serif" }}>
                {m.value}
              </p>
              <p className="text-xs text-slate-600 mt-1 tracking-wide">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}