'use client';

import { useEffect } from 'react';
import { Bricolage_Grotesque, Manrope } from 'next/font/google';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-bricolage',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

const STYLES = `
  .hermon{
    --ink:#0C1B2A;
    --ink-soft:#33475B;
    --teal:#14B8A6;
    --cyan:#38BDF8;
    --ice:#EFF7FA;
    --white:#FFFFFF;
    --gold:#F5B942;
    --grad:linear-gradient(100deg,var(--cyan),var(--teal));
    --radius:18px;
    --shadow:0 12px 34px rgba(12,27,42,.10);
    font-family:var(--font-manrope),sans-serif;
    color:var(--ink);
    background:var(--white);
    line-height:1.6;
    min-height:100vh;
    overflow-x:hidden;
  }
  .hermon *{margin:0;padding:0;box-sizing:border-box}
  .hermon h1,.hermon h2,.hermon h3{font-family:var(--font-bricolage),sans-serif;line-height:1.12;letter-spacing:-.01em}
  .hermon a{text-decoration:none;color:inherit}
  .hermon img{max-width:100%;display:block}
  .hermon .wrap{max-width:1120px;margin:0 auto;padding:0 22px}
  .hermon .eyebrow{display:inline-block;font-size:.78rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--teal);margin-bottom:14px}
  .hermon .btn{display:inline-flex;align-items:center;gap:10px;font-weight:700;font-size:1rem;padding:15px 26px;border-radius:999px;transition:transform .18s ease,box-shadow .18s ease;cursor:pointer}
  .hermon .btn:hover{transform:translateY(-2px)}
  .hermon .btn-wa{background:var(--grad);color:#fff;box-shadow:0 10px 26px rgba(20,184,166,.35)}
  .hermon .btn-ghost{border:2px solid var(--ink);color:var(--ink)}
  .hermon .btn svg{width:20px;height:20px;fill:currentColor}
  @media (prefers-reduced-motion:reduce){.hermon .btn{transition:none}.hermon .reveal{opacity:1!important;transform:none!important}}

  /* NAV */
  .hermon nav{position:sticky;top:0;z-index:50;background:rgba(255,255,255,.92);backdrop-filter:blur(10px);border-bottom:1px solid #E4EEF2}
  .hermon .nav-in{display:flex;align-items:center;justify-content:space-between;height:72px;gap:16px}
  .hermon .logo{font-family:var(--font-bricolage),sans-serif;font-weight:700;font-size:1.25rem;display:flex;align-items:center;gap:10px}
  .hermon .logo-mark{width:34px;height:34px;border-radius:10px;background:var(--ink);display:grid;place-items:center;flex:none}
  .hermon .logo-mark svg{width:20px;height:20px}
  .hermon .logo span{background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent}
  .hermon .nav-links{display:flex;gap:28px;font-weight:600;font-size:.95rem;color:var(--ink-soft)}
  .hermon .nav-links a:hover{color:var(--teal)}
  .hermon .nav-cta{padding:11px 20px;font-size:.9rem;white-space:nowrap}
  @media(max-width:820px){.hermon .nav-links{display:none}}

  /* HERO */
  .hermon header{background:linear-gradient(180deg,var(--ice) 0%,#fff 100%);overflow:hidden;position:relative}
  .hermon .hero{display:grid;grid-template-columns:1.1fr .9fr;gap:48px;align-items:center;padding:84px 0 96px}
  .hermon .hero h1{font-size:clamp(2.1rem,4.6vw,3.6rem);font-weight:700}
  .hermon .hero h1 em{font-style:normal;background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent}
  .hermon .hero p{margin:20px 0 30px;font-size:1.1rem;color:var(--ink-soft);max-width:52ch}
  .hermon .hero-ctas{display:flex;gap:14px;flex-wrap:wrap}
  .hermon .rating{display:inline-flex;align-items:center;gap:10px;margin-top:28px;background:#fff;border:1px solid #E4EEF2;border-radius:999px;padding:10px 18px;box-shadow:var(--shadow);font-weight:700;font-size:.95rem}
  .hermon .rating .stars{color:var(--gold);letter-spacing:2px}
  .hermon .rating small{font-weight:600;color:var(--ink-soft)}
  .hermon .hero-visual{position:relative;min-height:380px}
  .hermon .smile-arc{position:absolute;inset:0;width:100%;height:100%}
  .hermon .card-float{position:absolute;background:#fff;border-radius:var(--radius);box-shadow:var(--shadow);padding:18px 22px;font-size:.9rem;font-weight:600}
  .hermon .card-float b{display:block;font-size:1.35rem;font-family:var(--font-bricolage),sans-serif}
  .hermon .cf1{top:8%;left:6%}
  .hermon .cf2{bottom:14%;right:2%}
  .hermon .cf3{top:48%;left:38%}
  .hermon .cf1 b{color:var(--teal)}.hermon .cf2 b{color:var(--cyan)}.hermon .cf3 b{color:var(--ink)}
  @media(max-width:900px){.hermon .hero{grid-template-columns:1fr;padding:56px 0 64px}.hermon .hero-visual{min-height:300px}}

  /* SERVICES */
  .hermon section{padding:88px 0}
  .hermon .sec-head{max-width:640px;margin-bottom:48px}
  .hermon .sec-head h2{font-size:clamp(1.8rem,3.2vw,2.5rem)}
  .hermon .sec-head p{margin-top:12px;color:var(--ink-soft)}
  .hermon .grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
  @media(max-width:980px){.hermon .grid-4{grid-template-columns:repeat(2,1fr)}}
  @media(max-width:560px){.hermon .grid-4{grid-template-columns:1fr}}
  .hermon .svc{background:var(--ice);border-radius:var(--radius);padding:28px 24px;transition:transform .18s ease}
  .hermon .svc:hover{transform:translateY(-4px)}
  .hermon .svc .ic{width:46px;height:46px;border-radius:12px;background:var(--grad);display:grid;place-items:center;margin-bottom:18px}
  .hermon .svc .ic svg{width:24px;height:24px;fill:#fff}
  .hermon .svc h3{font-size:1.15rem;margin-bottom:8px}
  .hermon .svc p{font-size:.92rem;color:var(--ink-soft)}

  /* RESULTS */
  .hermon .results{background:var(--ink);color:#fff}
  .hermon .results .sec-head h2{color:#fff}
  .hermon .results .sec-head p{color:#B9CBD8}
  .hermon .ba-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
  @media(max-width:820px){.hermon .ba-grid{grid-template-columns:1fr}}
  .hermon .ba{border-radius:var(--radius);overflow:hidden;background:#13283C;aspect-ratio:4/3;display:grid;place-items:center;text-align:center;padding:20px;border:1px dashed #2C4761}
  .hermon .ba b{display:block;font-family:var(--font-bricolage),sans-serif;font-size:1.1rem;background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent;margin-bottom:6px}
  .hermon .ba small{color:#B9CBD8}

  /* REVIEWS */
  .hermon .rev-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
  @media(max-width:820px){.hermon .rev-grid{grid-template-columns:1fr}}
  .hermon .rev{background:#fff;border:1px solid #E4EEF2;border-radius:var(--radius);padding:26px;box-shadow:var(--shadow)}
  .hermon .rev .stars{color:var(--gold);letter-spacing:2px;margin-bottom:12px}
  .hermon .rev p{font-size:.95rem;color:var(--ink-soft);font-style:italic}
  .hermon .rev span{display:block;margin-top:14px;font-weight:700;font-size:.9rem}

  /* STEPS */
  .hermon .steps{background:var(--ice)}
  .hermon .step-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-bottom:44px}
  @media(max-width:820px){.hermon .step-grid{grid-template-columns:1fr}}
  .hermon .step{background:#fff;border-radius:var(--radius);padding:28px;box-shadow:var(--shadow)}
  .hermon .step b{display:grid;place-items:center;width:40px;height:40px;border-radius:50%;background:var(--grad);color:#fff;font-family:var(--font-bricolage),sans-serif;margin-bottom:16px}
  .hermon .step h3{font-size:1.1rem;margin-bottom:6px}
  .hermon .step p{font-size:.92rem;color:var(--ink-soft)}
  .hermon .steps .center{text-align:center}

  /* LOCATION */
  .hermon .loc{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center}
  @media(max-width:820px){.hermon .loc{grid-template-columns:1fr}}
  .hermon .loc-info li{list-style:none;display:flex;gap:14px;margin-bottom:20px;align-items:flex-start}
  .hermon .loc-info .ic{flex:none;width:40px;height:40px;border-radius:10px;background:var(--ice);display:grid;place-items:center}
  .hermon .loc-info .ic svg{width:20px;height:20px;fill:var(--teal)}
  .hermon .loc-info b{display:block;font-size:.95rem}
  .hermon .loc-info small{color:var(--ink-soft)}
  .hermon .map-ph{border-radius:var(--radius);background:var(--ice);aspect-ratio:4/3;display:grid;place-items:center;text-align:center;padding:20px;border:1px dashed #BFD9E2;color:var(--ink-soft)}

  /* FOOTER CTA */
  .hermon footer{background:var(--ink);color:#fff;padding:72px 0 36px;text-align:center}
  .hermon footer h2{font-size:clamp(1.7rem,3vw,2.4rem);max-width:22ch;margin:0 auto 26px}
  .hermon footer h2 em{font-style:normal;background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent}
  .hermon .foot-meta{margin-top:56px;padding-top:24px;border-top:1px solid #24405A;font-size:.85rem;color:#8FA6B8}

  .hermon .reveal{opacity:0;transform:translateY(18px);transition:opacity .6s ease,transform .6s ease}
  .hermon .reveal.in{opacity:1;transform:none}

  /* RESPONSIVE — móvil */
  @media(max-width:560px){
    .hermon .wrap{padding:0 18px}
    .hermon section{padding:60px 0}
    .hermon .sec-head{margin-bottom:34px}
    .hermon .hero{padding:44px 0 52px;gap:32px}
    .hermon .hero p{font-size:1rem}
    .hermon .hero-ctas .btn{width:100%;justify-content:center}
    .hermon .logo{font-size:1.02rem;gap:8px}
    .hermon .nav-in{height:64px}
    .hermon .nav-cta{padding:9px 14px;font-size:.82rem}
    .hermon .card-float{padding:12px 14px;font-size:.78rem}
    .hermon .card-float b{font-size:1.05rem}
    .hermon .cf3{left:28%}
    .hermon footer{padding:56px 0 30px}
  }
`;

const MARKUP = `
<nav>
  <div class="wrap nav-in">
    <a class="logo" href="#top">
      <span class="logo-mark">
        <svg viewBox="0 0 24 24" fill="none"><path d="M4 20 L9 7 L12 14 L15 7 L20 20" stroke="url(#hg)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><defs><linearGradient id="hg" x1="0" y1="0" x2="24" y2="24"><stop stop-color="#38BDF8"/><stop offset="1" stop-color="#14B8A6"/></linearGradient></defs></svg>
      </span>
      HERMON <span>Dental Clinic</span>
    </a>
    <div class="nav-links">
      <a href="#servicios">Servicios</a>
      <a href="#resultados">Resultados</a>
      <a href="#opiniones">Opiniones</a>
      <a href="#ubicacion">Ubicación</a>
    </div>
    <a class="btn btn-wa nav-cta" href="https://wa.me/18094226841?text=Hola,%20quiero%20agendar%20una%20cita" target="_blank" rel="noopener">Agendar cita</a>
  </div>
</nav>

<header id="top">
  <div class="wrap hero">
    <div>
      <span class="eyebrow">Manoguayabo · Santo Domingo</span>
      <h1>La sonrisa que quieres, en la clínica <em>mejor valorada</em> de tu zona.</h1>
      <p>Implantes, periodoncia y armonización facial con tecnología moderna y un trato que nuestros pacientes califican con 5 estrellas. Agenda en menos de 1 minuto.</p>
      <div class="hero-ctas">
        <a class="btn btn-wa" href="https://wa.me/18094226841?text=Hola,%20quiero%20agendar%20una%20cita" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.2 14.3c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.5.5c-.2.2-.3.4-.1.7.2.3.9 1.5 2 2.4 1.4 1.2 2.5 1.6 2.9 1.7.3.2.5.1.7-.1l1-1.1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.4 0 .1 0 .6-.2 1.2Z"/></svg>
          Agendar por WhatsApp
        </a>
        <a class="btn btn-ghost" href="#servicios">Ver servicios</a>
      </div>
      <div class="rating">
        <span class="stars">★★★★★</span> 5.0 <small>· 47 reseñas en Google</small>
      </div>
    </div>
    <div class="hero-visual">
      <svg class="smile-arc" viewBox="0 0 500 420" fill="none" aria-hidden="true">
        <path d="M60 90 Q250 420 440 90" stroke="url(#arc)" stroke-width="26" stroke-linecap="round" opacity=".9"/>
        <path d="M95 70 Q250 340 405 70" stroke="url(#arc)" stroke-width="10" stroke-linecap="round" opacity=".25"/>
        <defs><linearGradient id="arc" x1="0" y1="0" x2="500" y2="420"><stop stop-color="#38BDF8"/><stop offset="1" stop-color="#14B8A6"/></linearGradient></defs>
      </svg>
      <div class="card-float cf1"><b>5.0 ★</b>Calificación en Google</div>
      <div class="card-float cf2"><b>+1,400</b>Pacientes nos siguen</div>
      <div class="card-float cf3"><b>72h</b>Respuesta a tu cita</div>
    </div>
  </div>
</header>

<section id="servicios">
  <div class="wrap">
    <div class="sec-head reveal">
      <span class="eyebrow">Nuestros servicios</span>
      <h2>Todo lo que tu sonrisa necesita, en un solo lugar.</h2>
      <p>Tratamientos con materiales de primera y resultados que puedes ver en nuestras redes.</p>
    </div>
    <div class="grid-4">
      <div class="svc reveal">
        <span class="ic"><svg viewBox="0 0 24 24"><path d="M12 2C8 2 5 4.5 5 8c0 2 .8 3.5 1.5 5 .6 1.4.9 3.4 1.2 5.6.1 1 .8 1.4 1.4 1.4.7 0 1.2-.5 1.3-1.3l.6-4.2c.1-.6.4-.9 1-.9s.9.3 1 .9l.6 4.2c.1.8.6 1.3 1.3 1.3.6 0 1.3-.4 1.4-1.4.3-2.2.6-4.2 1.2-5.6.7-1.5 1.5-3 1.5-5 0-3.5-3-6-7-6Z"/></svg></span>
        <h3>Implantes dentales</h3>
        <p>Recupera piezas perdidas con implantes fijos, seguros y de aspecto natural.</p>
      </div>
      <div class="svc reveal">
        <span class="ic"><svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 0 0-9 9c0 5 4 9 9 9s9-4 9-9a9 9 0 0 0-9-9Zm0 4a5 5 0 0 1 5 5h-2a3 3 0 0 0-3-3V7Z"/></svg></span>
        <h3>Periodoncia</h3>
        <p>Tratamiento de encías para frenar el sangrado, la retracción y la pérdida ósea.</p>
      </div>
      <div class="svc reveal">
        <span class="ic"><svg viewBox="0 0 24 24"><path d="M12 2 14 8l6 2-6 2-2 6-2-6-6-2 6-2 2-6Z"/></svg></span>
        <h3>Armonización facial</h3>
        <p>Perfila labios y rasgos con resultados naturales. Mira los antes y después.</p>
      </div>
      <div class="svc reveal">
        <span class="ic"><svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 5v4.6l3.5 2-1 1.7L11 13V7h2Z"/></svg></span>
        <h3>Odontología general</h3>
        <p>Limpiezas, resinas, evaluaciones y prevención para toda la familia.</p>
      </div>
    </div>
  </div>
</section>

<section class="results" id="resultados">
  <div class="wrap">
    <div class="sec-head reveal">
      <span class="eyebrow">Antes y después</span>
      <h2>Resultados reales de pacientes reales.</h2>
      <p>Estas casillas se llenan con las fotos de tu Instagram (implantes, periodoncia, armonización).</p>
    </div>
    <div class="ba-grid">
      <div class="ba reveal"><div><b>Implantes</b><small>Foto antes / después de tu Instagram</small></div></div>
      <div class="ba reveal"><div><b>Periodoncia</b><small>Foto antes / después de tu Instagram</small></div></div>
      <div class="ba reveal"><div><b>Armonización</b><small>Foto antes / después de tu Instagram</small></div></div>
    </div>
  </div>
</section>

<section id="opiniones">
  <div class="wrap">
    <div class="sec-head reveal">
      <span class="eyebrow">Opiniones</span>
      <h2>5.0 estrellas. 47 reseñas. Cero dudas.</h2>
      <p>Aquí conectamos tus reseñas reales de Google para que cada visitante las vea sin salir de la página.</p>
    </div>
    <div class="rev-grid">
      <div class="rev reveal"><div class="stars">★★★★★</div><p>“Hoy tuve un día traumático por el dolor de mi muela, gracias a ellos todo salió bien, muchas gracias por salvarme 🥹❤️”</p><span>Paciente verificado · Google</span></div>
      <div class="rev reveal"><div class="stars">★★★★★</div><p>“Excelente atención, doctores capacitados y buena higiene. 👍”</p><span>Paciente verificado · Google</span></div>
      <div class="rev reveal"><div class="stars">★★★★★</div><p>“Excelente servicio, los Doctores son muy profesionales, dedicados al trabajo y empaticos especialmente el Dr. Montero.  El lugar está muy bien equipado y preparado, el personal de servicio ofrece muy buenas atenciones.”</p><span>Paciente verificado · Google</span></div>
    </div>
  </div>
</section>

<section class="steps">
  <div class="wrap">
    <div class="sec-head reveal">
      <span class="eyebrow">Cómo agendar</span>
      <h2>Tu cita en 3 pasos. Sin llamadas, sin esperas.</h2>
    </div>
    <div class="step-grid">
      <div class="step reveal"><b>1</b><h3>Escríbenos</h3><p>Toca el botón de WhatsApp y cuéntanos qué necesitas.</p></div>
      <div class="step reveal"><b>2</b><h3>Elige tu horario</h3><p>Te damos los espacios disponibles y eliges el que te sirva.</p></div>
      <div class="step reveal"><b>3</b><h3>Ven a tu evaluación</h3><p>Te recibimos en Plaza Anabella y armamos tu plan de tratamiento.</p></div>
    </div>
    <div class="center">
      <a class="btn btn-wa" href="https://wa.me/18094226841?text=Hola,%20quiero%20agendar%20una%20cita" target="_blank" rel="noopener">
        <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.2 14.3c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.5.5c-.2.2-.3.4-.1.7.2.3.9 1.5 2 2.4 1.4 1.2 2.5 1.6 2.9 1.7.3.2.5.1.7-.1l1-1.1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.4 0 .1 0 .6-.2 1.2Z"/></svg>
        Agendar mi cita ahora
      </a>
    </div>
  </div>
</section>

<section id="ubicacion">
  <div class="wrap loc">
    <div>
      <div class="sec-head reveal" style="margin-bottom:32px">
        <span class="eyebrow">Ubicación y horario</span>
        <h2>Fácil de llegar, fácil de agendar.</h2>
      </div>
      <ul class="loc-info">
        <li class="reveal"><span class="ic"><svg viewBox="0 0 24 24"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z"/></svg></span><div><b>Av. Los Beisbolistas esq. Duarte Vieja</b><small>Plaza Anabella, Local 204, 2do nivel · Manoguayabo, Santo Domingo</small></div></li>
        <li class="reveal"><span class="ic"><svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 5v4.6l3.5 2-1 1.7L11 13V7h2Z"/></svg></span><div><b>Lunes a sábado · desde las 8:00 a.m.</b><small>Agenda tu horario por WhatsApp</small></div></li>
        <li class="reveal"><span class="ic"><svg viewBox="0 0 24 24"><path d="M6.6 10.8a15.9 15.9 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1l-2.2 2.2Z"/></svg></span><div><b>(809) 422-6841</b><small>Llámanos o escríbenos directo al WhatsApp</small></div></li>
      </ul>
    </div>
    <div class="map-ph reveal"><div><b style="font-family:var(--font-bricolage),sans-serif">Mapa de Google aquí</b><br><small>Se integra tu ubicación real de Google Maps con botón de "Cómo llegar".</small></div></div>
  </div>
</section>

<footer>
  <div class="wrap">
    <span class="eyebrow" style="color:#7DE3D3">Hermon Dental Clinic</span>
    <h2>Tu nueva sonrisa está a <em>un mensaje</em> de distancia.</h2>
    <a class="btn btn-wa" href="https://wa.me/18094226841?text=Hola,%20quiero%20agendar%20una%20cita" target="_blank" rel="noopener">
      <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.2 14.3c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.5.5c-.2.2-.3.4-.1.7.2.3.9 1.5 2 2.4 1.4 1.2 2.5 1.6 2.9 1.7.3.2.5.1.7-.1l1-1.1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.4 0 .1 0 .6-.2 1.2Z"/></svg>
      Agendar por WhatsApp
    </a>
    <div class="foot-meta">
      © 2026 Hermon Dental Clinic · Av. Los Beisbolistas esq. Duarte Vieja, Plaza Anabella, Local 204 · Santo Domingo, R.D.<br>
      Demo diseñada por <b>Grolow Studio</b> · grolow.com
    </div>
  </div>
</footer>
`;

export default function HermonDentalPage() {
  useEffect(() => {
    const els = document.querySelectorAll('.hermon .reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`hermon ${bricolage.variable} ${manrope.variable}`}
      dangerouslySetInnerHTML={{ __html: `<style>${STYLES}</style>${MARKUP}` }}
    />
  );
}
