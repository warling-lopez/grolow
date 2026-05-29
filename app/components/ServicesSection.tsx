"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export type ServiceId =
  | "landing"
  | "tienda-whatsapp"
  | "servicios-citas"
  | "ecommerce"
  | "sistema-medida";

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const services: {
    id: ServiceId;
    title: string;
    priceLabel: string;
    description: string;
    tags: string[];
    features: string[];
    deliveryTime: string;
    startingPrice: number;
    highlight?: boolean;
  }[] = [
    {
      id: "landing",
      title: "Landing Page de Conversión",
      description:
        "Una sola página diseñada para convertir visitas en clientes. Ideal para lanzar un producto, capturar leads o validar tu idea rápidamente.",
      deliveryTime: "72 horas",
      startingPrice: 200,
      priceLabel: "Desde $200",
      tags: ["Conversión", "Leads", "Lanzamiento"],
      features: [
        "Diseño UI/UX premium",
        "Optimizada para velocidad < 1s",
        "Integración con WhatsApp o email",
        "Formulario de contacto incluido",
        "Adaptable a móvil y escritorio",
      ],
    },
    {
      id: "tienda-whatsapp",
      title: "Tienda Online → WhatsApp",
      description:
        "Tu catálogo en la web, los pedidos directo a tu WhatsApp. Sin comisiones de terceros, sin pasarelas que te cobren por venta. Tú controlas todo.",
      deliveryTime: "72 horas",
      startingPrice: 350,
      priceLabel: "Desde $350",
      tags: ["E-commerce", "WhatsApp", "Sin comisiones"],
      features: [
        "Catálogo de productos con fotos",
        "Carrito de compras",
        "Pedidos directos por WhatsApp",
        "Sin comisiones por venta",
        "Panel para gestionar productos",
      ],
      highlight: true,
    },
    {
      id: "servicios-citas",
      title: "Web de Servicios y Citas",
      description:
        "Para consultores, salones, clínicas o cualquier negocio que agenda. Presenta tus servicios, capta clientes y automatiza las reservas.",
      deliveryTime: "5–7 días",
      startingPrice: 300,
      priceLabel: "Desde $300",
      tags: ["Servicios", "Reservas", "Automatización"],
      features: [
        "Página de servicios con precios",
        "Sistema de reservas o citas",
        "Integración con WhatsApp o calendario",
        "Galería de trabajos o testimonios",
        "Formulario de contacto",
      ],
    },
    {
      id: "ecommerce",
      title: "E-commerce Completo",
      description:
        "Tienda profesional con pasarela de pago, gestión de inventario, panel de administración y experiencia de compra optimizada para conversión.",
      deliveryTime: "2–3 semanas",
      startingPrice: 600,
      priceLabel: "Desde $600",
      tags: ["Tienda", "Pagos online", "Inventario"],
      features: [
        "Pasarela de pago integrada",
        "Gestión de inventario en tiempo real",
        "Panel de administración completo",
        "Historial de pedidos y clientes",
        "Optimización SEO incluida",
      ],
    },
    {
      id: "sistema-medida",
      title: "Sistema a Medida",
      description:
        "Plataformas, portales, dashboards o cualquier lógica de negocio personalizada. Si lo puedes describir, lo podemos construir.",
      deliveryTime: "Según alcance",
      startingPrice: 800,
      priceLabel: "Desde $800",
      tags: ["Plataforma", "Dashboard", "A medida"],
      features: [
        "Arquitectura y base de datos a medida",
        "Autenticación y roles de usuario",
        "Integraciones con APIs externas",
        "Panel de administración personalizado",
        "Soporte y mantenimiento post-entrega",
      ],
    },
  ];

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".service-card");
      
      // Control de animaciones según el dispositivo para no romper el layout en móvil
      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Desktop: efecto cascada completo
        cards.forEach((card: any, i) => {
          gsap.to(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 50%",
              end: "top 20%",
              scrub: true,
            },
            y: -70 * i, 
            rotate: i % 2 === 0 ? 2 : -4,
          });
        });
      });

      mm.add("(max-width: 767px)", () => {
        // Móvil: efecto sutil, sin rotación y con menos overlap
        cards.forEach((card: any, i) => {
          gsap.to(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "top 30%",
              scrub: true,
            },
            y: -15 * i, 
          });
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="w-full min-h-screen bg-transparent my-20 md:my-20 py-10 md:py-20 flex items-center px-4 md:px-8">
      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 gap-8 md:gap-10">
        {services.map((service) => (
          <div
            key={service.id}
            className="service-card group relative overflow-hidden bg-white/5 border border-white/10 p-6 md:p-16 backdrop-blur-xl h-auto md:h-[500px] flex flex-col justify-between  rounded-2xl">
            
            <div className="glow pointer-events-none absolute w-[300px] h-[300px] bg-grolow-cyan/20 rounded-full blur-[100px] opacity-0 transition-opacity" />
            
            <div className="absolute top-6 right-6 md:inset-0 md:text-center group-hover:opacity-100 transition-opacity pointer-events-none text-xs md:text-base text-white/50 font-mono">
              {service.deliveryTime}
            </div>

            <div className="flex flex-col h-full z-10">
              <div className="flex items-start justify-between">
                <h3 className="text-2xl md:text-5xl font-black uppercase text-white pr-16 md:pr-0">
                  {service.title}
                </h3>
              </div>

              <p className="mt-3 md:mt-4 text-slate-400 max-w-md text-sm md:text-base leading-relaxed">
                {service.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] md:text-xs border border-white/20 text-white/60 px-2 py-1 md:px-3 uppercase tracking-wider rounded-md">
                    {tag}
                  </span>
                ))}
              </div>

              <ul className="mt-6 md:mt-auto space-y-2 mb-6 md:mb-0">
                {service.features.map((feature, index) => (
                  <ul
                    key={index}
                    className="text-xs md:text-sm text-slate-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-grolow-cyan inline-block flex-shrink-0" />
                    {feature}
                  </ul>
                ))}
              </ul>

              <div className="mt-4 md:mt-0 md:absolute md:bottom-8 md:right-8 flex justify-end">
                <span className="text-grolow-cyan font-mono text-lg md:text-xl font-bold tracking-widest uppercase">
                  {service.priceLabel}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}