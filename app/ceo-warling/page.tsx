"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Hero2 from "@/app/components/Hero2";
import SplitText from "@/app/components/SplitText";

/* ------------------------------------------------------------------ */
/* i18n — diccionario ES/EN                                            */
/* ------------------------------------------------------------------ */

type Lang = "es" | "en";

const STORAGE_KEY = "ceo-warling-lang";

const t = {
  es: {
    nav: {
      about: "Sobre mí",
      experience: "Experiencia",
      projects: "Proyectos",
      contact: "Contacto",
    },
    hero: {
      title: (
        <>
          Construyo{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-grolow-cream to-grolow-accent italic">
            sistemas
          </span>{" "}
          que escalan.
        </>
      ),
      subtitle: (
        <>
          Desarrollador full-stack y fundador de{" "}
          <span className="text-grolow-light font-medium">Grolow</span>. Diseño
          y construyo plataformas web a medida — de la idea al despliegue, con
          código limpio y sin atajos.
        </>
      ),
      ctaExperience: "Ver experiencia",
      ctaContact: "Contactar",
    },
    about: {
      eyebrow: "Sobre mí",
      title: (
        <>
          CÓDIGO CON <span className="text-grolow-cream italic">CRITERIO.</span>
        </>
      ),
      paragraphs: [
        "Soy Warling López, desarrollador full-stack de República Dominicana. Fundé Grolow, una agencia de infraestructura digital donde convierto procesos manuales en sistemas que venden solos.",
        "Trabajo el ciclo completo: descubrimiento del negocio, propuesta, desarrollo a código limpio y despliegue. Nada de CMS genéricos — soluciones simples y estables para problemas reales.",
        "Este portfolio está orientado a colaboración profesional y roles formales. Si buscas mi perfil freelance, está en warling.top.",
      ],
    },
    experience: {
      eyebrow: "Trayectoria",
      title: (
        <>
          EXPERIENCIA <span className="text-grolow-cream italic">REAL.</span>
        </>
      ),
      items: [
        {
          role: "Fundador & Lead Developer",
          company: "Grolow — Agencia de Infraestructura Digital",
          period: "2025 — Presente",
          points: [
            "Fundé y dirijo una agencia enfocada en sistemas de ventas y plataformas a medida.",
            "Diseño y desarrollo landings y sistemas para clientes reales (Hermon Dental, VisualLab).",
            "Stack: Next.js, React, TypeScript, Three.js, GSAP, Tailwind CSS.",
          ],
        },
        {
          role: "Desarrollador Web Freelance",
          company: "warling.top — Independiente",
          period: "2023 — Presente",
          points: [
            "Sitios web rápidos y a código para negocios locales — sin CMS, sin plantillas.",
            "Soluciones a medida: formularios, filtros, dashboards y mantenimiento continuo.",
            "Stack: Next.js, Vite, Remix, Astro, PHP, SQLite, REST APIs.",
          ],
        },
      ],
    },
    projects: {
      eyebrow: "Casos",
      title: (
        <>
          PROYECTOS <span className="text-grolow-cream italic">DESTACADOS.</span>
        </>
      ),
      view: "Ver proyecto",
      items: [
        {
          name: "Grolow",
          desc: "Agencia de infraestructura digital: web inmersiva con 3D, scroll animado y sistema de captación de clientes.",
          href: "/",
          tags: ["Next.js", "Three.js", "GSAP"],
        },
        {
          name: "Hermon Dental",
          desc: "Landing page para clínica dental — captación de citas y presencia digital profesional.",
          href: "/Hermon-Dental",
          tags: ["Next.js", "Framer Motion"],
        },
        {
          name: "VisualLab",
          desc: "Landing con hero 3D interactivo para empresa de letreros y rotulación.",
          href: "/VisualLab",
          tags: ["R3F", "Three.js"],
        },
        {
          name: "warling.top",
          desc: "Mi portfolio freelance: servicios, proceso y casos para negocios locales.",
          href: "https://warling.top",
          tags: ["Web", "Freelance"],
        },
      ],
    },
    stack: {
      eyebrow: "Herramientas",
      title: (
        <>
          STACK <span className="text-grolow-cream italic">TÉCNICO.</span>
        </>
      ),
      groups: [
        {
          name: "Frontend",
          items: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
        },
        {
          name: "Animación & 3D",
          items: ["Three.js / R3F", "GSAP", "Framer Motion", "Lenis"],
        },
        {
          name: "Backend & Datos",
          items: ["Node.js", "PHP", "SQLite", "REST APIs"],
        },
        {
          name: "Otros frameworks",
          items: ["Vite", "Astro", "Remix", "Git"],
        },
      ],
    },
    contact: {
      eyebrow: "Contacto",
      title: (
        <>
          HABLEMOS DE <span className="text-grolow-cream italic">TRABAJO.</span>
        </>
      ),
      subtitle:
        "Abierto a roles full-stack, colaboraciones y proyectos serios. Respondo rápido.",
      email: "Escríbeme",
      freelanceNote: "¿Buscas freelance? Visita",
    },
    footer: "Hecho a código por Warling López",
  },
  en: {
    nav: {
      about: "About",
      experience: "Experience",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      title: (
        <>
          I build{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-grolow-cream to-grolow-accent italic">
            systems
          </span>{" "}
          that scale.
        </>
      ),
      subtitle: (
        <>
          Full-stack developer and founder of{" "}
          <span className="text-grolow-light font-medium">Grolow</span>. I
          design and build custom web platforms — from idea to deployment, with
          clean code and no shortcuts.
        </>
      ),
      ctaExperience: "View experience",
      ctaContact: "Get in touch",
    },
    about: {
      eyebrow: "About me",
      title: (
        <>
          CODE WITH <span className="text-grolow-cream italic">PURPOSE.</span>
        </>
      ),
      paragraphs: [
        "I'm Warling López, a full-stack developer from the Dominican Republic. I founded Grolow, a digital infrastructure agency where I turn manual processes into systems that sell on their own.",
        "I work the full cycle: business discovery, proposal, clean-code development and deployment. No generic CMS — simple, stable solutions for real problems.",
        "This portfolio is aimed at professional collaboration and formal roles. Looking for my freelance profile? It lives at warling.top.",
      ],
    },
    experience: {
      eyebrow: "Career",
      title: (
        <>
          REAL <span className="text-grolow-cream italic">EXPERIENCE.</span>
        </>
      ),
      items: [
        {
          role: "Founder & Lead Developer",
          company: "Grolow — Digital Infrastructure Agency",
          period: "2025 — Present",
          points: [
            "Founded and lead an agency focused on sales systems and custom platforms.",
            "Design and build landing pages and systems for real clients (Hermon Dental, VisualLab).",
            "Stack: Next.js, React, TypeScript, Three.js, GSAP, Tailwind CSS.",
          ],
        },
        {
          role: "Freelance Web Developer",
          company: "warling.top — Independent",
          period: "2023 — Present",
          points: [
            "Fast, hand-coded websites for local businesses — no CMS, no templates.",
            "Custom solutions: forms, filters, dashboards and ongoing maintenance.",
            "Stack: Next.js, Vite, Remix, Astro, PHP, SQLite, REST APIs.",
          ],
        },
      ],
    },
    projects: {
      eyebrow: "Cases",
      title: (
        <>
          FEATURED <span className="text-grolow-cream italic">PROJECTS.</span>
        </>
      ),
      view: "View project",
      items: [
        {
          name: "Grolow",
          desc: "Digital infrastructure agency: immersive site with 3D, animated scroll and a client acquisition system.",
          href: "/",
          tags: ["Next.js", "Three.js", "GSAP"],
        },
        {
          name: "Hermon Dental",
          desc: "Landing page for a dental clinic — appointment capture and a professional digital presence.",
          href: "/Hermon-Dental",
          tags: ["Next.js", "Framer Motion"],
        },
        {
          name: "VisualLab",
          desc: "Landing with an interactive 3D hero for a signage company.",
          href: "/VisualLab",
          tags: ["R3F", "Three.js"],
        },
        {
          name: "warling.top",
          desc: "My freelance portfolio: services, process and case studies for local businesses.",
          href: "https://warling.top",
          tags: ["Web", "Freelance"],
        },
      ],
    },
    stack: {
      eyebrow: "Tools",
      title: (
        <>
          TECH <span className="text-grolow-cream italic">STACK.</span>
        </>
      ),
      groups: [
        {
          name: "Frontend",
          items: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
        },
        {
          name: "Animation & 3D",
          items: ["Three.js / R3F", "GSAP", "Framer Motion", "Lenis"],
        },
        {
          name: "Backend & Data",
          items: ["Node.js", "PHP", "SQLite", "REST APIs"],
        },
        {
          name: "Other frameworks",
          items: ["Vite", "Astro", "Remix", "Git"],
        },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: (
        <>
          LET&apos;S TALK{" "}
          <span className="text-grolow-cream italic">BUSINESS.</span>
        </>
      ),
      subtitle:
        "Open to full-stack roles, collaborations and serious projects. I reply fast.",
      email: "Email me",
      freelanceNote: "Looking for freelance? Visit",
    },
    footer: "Hand-coded by Warling López",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Links — [EDITAR]: confirma la URL exacta de tu LinkedIn             */
/* ------------------------------------------------------------------ */

const LINKS = {
  email: "warlinglopez01@gmail.com",
  github: "https://github.com/warling-lopez",
  linkedin: "https://www.linkedin.com/in/warling-lopez", // [EDITAR]
  freelance: "https://warling.top",
};

/* ------------------------------------------------------------------ */
/* Helpers de UI                                                       */
/* ------------------------------------------------------------------ */

const syne = { fontFamily: "var(--font-syne), 'Syne', sans-serif" };

const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: React.ReactNode;
}) {
  return (
    <motion.div {...reveal} className="mb-14">
      <p className="text-xs font-extrabold uppercase tracking-widest text-grolow-cream/80 mb-4">
        {eyebrow}
      </p>
      <h2
        className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-[0.95] tracking-tight text-grolow-light uppercase"
        style={syne}>
        {title}
      </h2>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Header propio (ruta standalone, sin branding de Grolow)             */
/* ------------------------------------------------------------------ */

function PortfolioHeader({
  lang,
  setLang,
  nav,
  cta,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  nav: (typeof t)[Lang]["nav"];
  cta: string;
}) {
  const links = [
    { label: nav.about, target: "sobre-mi" },
    { label: nav.experience, target: "experiencia" },
    { label: nav.projects, target: "proyectos" },
    { label: nav.contact, target: "contacto" },
  ];

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50 bg-grolow-dark/70 backdrop-blur-md border-b border-grolow-light/10">
      <nav className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-6 h-16">
        <a
          href="#top"
          className="font-extrabold tracking-tight lowercase italic text-xl text-grolow-light hover:opacity-70 transition-opacity"
          style={syne}>
          warling.
        </a>

        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link.target}
              href={`#${link.target}`}
              className="px-4 py-2 text-sm font-semibold tracking-wide text-grolow-light/80 hover:text-grolow-light transition-colors">
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Toggle ES / EN */}
          <div className="flex items-center rounded-full border border-grolow-light/20 overflow-hidden text-xs font-extrabold">
            {(["es", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`px-3 py-1.5 uppercase transition-colors ${
                  lang === l
                    ? "bg-grolow-light text-grolow-dark"
                    : "text-grolow-light/60 hover:text-grolow-light"
                }`}>
                {l}
              </button>
            ))}
          </div>

          <a
            href="#contacto"
            className="hidden sm:inline-flex items-center rounded-full bg-grolow-light text-grolow-dark font-bold px-5 py-2.5 text-sm hover:bg-grolow-cream hover:text-white transition-colors">
            {cta}
          </a>
        </div>
      </nav>
    </motion.header>
  );
}

/* ------------------------------------------------------------------ */
/* Página                                                              */
/* ------------------------------------------------------------------ */

export default function CeoWarlingPage() {
  const [lang, setLangState] = useState<Lang>("es");

  // Recupera el idioma elegido en visitas anteriores.
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "es" || saved === "en") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
  };

  const d = t[lang];

  return (
    <main id="top" className="w-full bg-grolow-dark text-grolow-light">
      <PortfolioHeader
        lang={lang}
        setLang={setLang}
        nav={d.nav}
        cta={d.hero.ctaContact}
      />

      {/* ---------- Hero (mismo componente que la home) ---------- */}
      <Hero2
        eyebrow={<SplitText>WARLING LÓPEZ</SplitText>}
        title={d.hero.title}
        subtitle={d.hero.subtitle}
        ctas={[
          {
            label: d.hero.ctaExperience,
            href: "#experiencia",
            variant: "outline",
          },
          { label: d.hero.ctaContact, href: "#contacto", variant: "solid" },
        ]}
      />

      {/* ---------- Sobre mí ---------- */}
      <section id="sobre-mi" className="px-6 py-28 md:py-40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">
          <SectionHeading eyebrow={d.about.eyebrow} title={d.about.title} />
          <motion.div {...reveal} className="space-y-6 lg:pt-16">
            {d.about.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-base md:text-lg text-grolow-light/75 font-light leading-relaxed">
                {p}
              </p>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------- Experiencia ---------- */}
      <section id="experiencia" className="px-6 py-28 md:py-40 bg-grolow-card">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow={d.experience.eyebrow}
            title={d.experience.title}
          />

          <div className="relative border-l border-grolow-light/15 ml-2 md:ml-4 space-y-16">
            {d.experience.items.map((item, i) => (
              <motion.article
                key={i}
                {...reveal}
                transition={{ ...reveal.transition, delay: i * 0.12 }}
                className="relative pl-8 md:pl-12">
                {/* Punto del timeline */}
                <span
                  className="absolute -left-1.75 top-2 w-3.5 h-3.5 rounded-full bg-grolow-cream"
                  aria-hidden="true"
                />
                <p className="text-xs font-extrabold uppercase tracking-widest text-grolow-cream mb-2">
                  {item.period}
                </p>
                <h3
                  className="text-2xl md:text-3xl font-extrabold text-grolow-light"
                  style={syne}>
                  {item.role}
                </h3>
                <p className="text-sm font-semibold text-grolow-light/60 mt-1 mb-5">
                  {item.company}
                </p>
                <ul className="space-y-2.5">
                  {item.points.map((point, j) => (
                    <li
                      key={j}
                      className="flex gap-3 text-sm md:text-base text-grolow-light/75 font-light leading-relaxed">
                      <span className="text-grolow-cream mt-0.5">→</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Proyectos ---------- */}
      <section id="proyectos" className="px-6 py-28 md:py-40">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow={d.projects.eyebrow}
            title={d.projects.title}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {d.projects.items.map((project, i) => (
              <motion.a
                key={project.name}
                {...reveal}
                transition={{ ...reveal.transition, delay: (i % 2) * 0.12 }}
                href={project.href}
                target={project.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  project.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="group flex flex-col justify-between p-8 md:p-10 bg-grolow-card border border-grolow-light/10 rounded-2xl hover:border-grolow-cream/40 hover:shadow-[0_20px_50px_rgba(14,21,18,0.12)] transition-all duration-300">
                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-extrabold uppercase tracking-widest bg-grolow-dark border border-grolow-light/10 text-grolow-light/70 px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3
                    className="text-2xl md:text-3xl font-extrabold text-grolow-light group-hover:text-grolow-cream transition-colors"
                    style={syne}>
                    {project.name}
                  </h3>
                  <p className="text-sm md:text-base text-grolow-light/70 font-light leading-relaxed mt-3">
                    {project.desc}
                  </p>
                </div>
                <p className="mt-8 text-xs font-extrabold uppercase tracking-widest text-grolow-cream">
                  {d.projects.view}
                  <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Stack técnico ---------- */}
      <section className="px-6 py-28 md:py-40 bg-grolow-card">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-14 lg:gap-20">
          <div className="lg:w-1/2 lg:sticky lg:top-32 h-fit">
            <SectionHeading eyebrow={d.stack.eyebrow} title={d.stack.title} />
          </div>

          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {d.stack.groups.map((group, i) => (
              <motion.div
                key={group.name}
                {...reveal}
                transition={{ ...reveal.transition, delay: (i % 2) * 0.12 }}
                className="p-8 bg-white/60 border border-grolow-light/10 backdrop-blur-md rounded-2xl">
                <h3
                  className="text-lg font-extrabold uppercase text-grolow-light mb-4"
                  style={syne}>
                  {group.name}
                </h3>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm font-mono text-grolow-cream">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Contacto ---------- */}
      <section id="contacto" className="px-6 py-28 md:py-40">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...reveal}>
            <p className="text-xs font-extrabold uppercase tracking-widest text-grolow-cream/80 mb-4">
              {d.contact.eyebrow}
            </p>
            <h2
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-[0.95] tracking-tight text-grolow-light uppercase mb-8"
              style={syne}>
              {d.contact.title}
            </h2>
            <p className="text-base md:text-lg text-grolow-light/70 font-light leading-relaxed max-w-xl mx-auto mb-12">
              {d.contact.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-center mb-12">
              <a
                href={`mailto:${LINKS.email}`}
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-grolow-cream text-grolow-dark font-bold uppercase tracking-wider text-sm hover:bg-grolow-light transition-colors">
                {d.contact.email}
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </a>
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-3 px-8 py-4 border border-grolow-cream/40 text-grolow-cream font-bold uppercase tracking-wider text-sm hover:border-grolow-cream transition-colors">
                LinkedIn
                <span className="group-hover:translate-x-1 transition-transform">
                  ↗
                </span>
              </a>
              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-3 px-8 py-4 border border-grolow-cream/40 text-grolow-cream font-bold uppercase tracking-wider text-sm hover:border-grolow-cream transition-colors">
                GitHub
                <span className="group-hover:translate-x-1 transition-transform">
                  ↗
                </span>
              </a>
            </div>

            <p className="text-sm text-grolow-light/55">
              {d.contact.freelanceNote}{" "}
              <a
                href={LINKS.freelance}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-grolow-cream hover:underline">
                warling.top
              </a>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="px-6 py-10 border-t border-grolow-light/10">
        <p className="max-w-7xl mx-auto text-center text-xs text-grolow-light/50 font-light">
          © {new Date().getFullYear()} · {d.footer}
        </p>
      </footer>
    </main>
  );
}
