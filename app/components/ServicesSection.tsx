export default function ServicesSection() {
  const services = [
    {
      title: "Landing Pages de Alta Conversión",
      description: "Embudos directos y sin fugas. Optimizadas para recibir el tráfico de tus redes sociales y convertir visitas en leads de forma inmediata.",
      icon: "⚡"
    },
    {
      title: "Tiendas Online → WhatsApp",
      description: "Catálogos digitales con carrito de compras que envían el pedido estructurado directamente a tu WhatsApp. Cero comisiones por pasarelas complejas.",
      icon: "🛒"
    },
    {
      title: "Webs de Servicios",
      description: "Plataformas para agendar citas, mostrar portafolios y filtrar clientes antes de que lleguen a tu bandeja de entrada.",
      icon: "⚙️"
    }
  ]

  return (
    <section id="servicios" className="w-full py-24 px-6 max-w-6xl mx-auto">
      <div className="mb-16 md:text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestra Infraestructura</h2>
        <p className="text-slate-600 dark:text-slate-400 text-lg">Sistemas listos para instalarse en tu modelo de negocio.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div key={index} className="p-8 rounded-2xl bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-slate-800 hover:border-grolow-teal dark:hover:border-grolow-cyan transition-colors">
            <div className="text-4xl mb-6">{service.icon}</div>
            <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}