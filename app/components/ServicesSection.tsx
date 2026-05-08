export default function ServicesSection() {
  const services = [
    {
      num: "01",
      icon: "ti-rocket",
      title: "Landing Pages de alta conversión",
      description: "Embudos sin fugas diseñados para convertir tráfico de redes en leads calificados. Desde el primer clic hasta la consulta.",
      result: "Hasta 4× más leads vs página genérica",
    },
    {
      num: "02",
      icon: "ti-brand-whatsapp",
      title: "Tienda online → WhatsApp",
      description: "Catálogo digital con carrito que envía el pedido estructurado directo a tu WhatsApp. Cero comisiones de pasarela.",
      result: "0% comisión por venta procesada",
    },
    {
      num: "03",
      icon: "ti-calendar-check",
      title: "Web de servicios y citas",
      description: "Plataformas que muestran tu portafolio, filtran clientes y agendan citas antes de que lleguen a tu bandeja.",
      result: "Clientes pre-calificados en tu agenda",
    },
  ];

  return (
    <section id="servicios" className="w-full py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[.14em] uppercase text-grolow-cyan border border-grolow-cyan/20 bg-grolow-cyan/[.06] px-3 py-1.5 rounded-full mb-5">
            <i className="ti ti-cpu text-[13px]" aria-hidden="true" />
            Infraestructura
          </div>
          <h2 className="font-extrabold text-4xl md:text-[42px] leading-[1.1] tracking-tight text-grolow-light mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
            Sistemas que trabajan<br />mientras tú descansas.
          </h2>
          <p className="text-slate-500 text-base max-w-md">
            Tres módulos. Un solo objetivo: que tu negocio capture y cierre sin tu intervención.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[.06] border border-white/[.06] rounded-2xl overflow-hidden">
          {services.map((s) => (
            <div key={s.num} className="relative p-10 bg-grolow-dark hover:bg-[#0d0d0d] transition-colors group">
              <p className="text-[11px] font-bold tracking-[.18em] text-grolow-cyan/40 mb-8">{s.num}</p>
              <div className="w-11 h-11 rounded-[10px] border border-grolow-cyan/20 flex items-center justify-center text-grolow-cyan mb-6">
                <i className={`ti ${s.icon} text-xl`} aria-hidden="true" />
              </div>
              <span className="absolute top-10 right-8 text-grolow-cyan/30 text-lg group-hover:text-grolow-cyan/60 transition-colors">↗</span>
              <h3 className="font-extrabold text-lg text-grolow-light mb-3 leading-snug" style={{ fontFamily: "'Syne', sans-serif" }}>
                {s.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">{s.description}</p>
              <div className="flex items-center gap-2 mt-5 pt-4 border-t border-grolow-cyan/10 text-xs font-medium text-grolow-cyan">
                <span className="w-1.5 h-1.5 rounded-full bg-grolow-cyan" />
                {s.result}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}