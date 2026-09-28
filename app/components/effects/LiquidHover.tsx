"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Distorsión líquida con estela de color que sigue al ratón (solo escritorio).
 *
 * Mientras el ratón está encima, el contenido se sustituye por una captura
 * (html-to-image) pintada en un canvas WebGL que:
 *   - arrastra los píxeles en la dirección y con la fuerza del movimiento
 *     del ratón (estela de los últimos `trail` puntos, que se recupera sola);
 *   - ondula alrededor del cursor aunque el ratón esté quieto;
 *   - tiñe de `trailColor` lo que toca la estela (letras) y deja un brillo
 *     suave del mismo color en el fondo transparente.
 * Al salir, todo se relaja hasta quedar quieto y se vuelve al HTML real.
 *
 * Con `precapture` la captura se hace de antemano (al entrar en pantalla y
 * tras un cambio de ancho), así el efecto arranca en el primer movimiento.
 * Sin él, se captura al entrar tras `captureDelay` (útil si el hover cambia
 * estilos que la captura deba recoger).
 *
 * Fuera del hover no hay canvas visible ni rAF. Desactivado en táctil, con
 * prefers-reduced-motion y sin WebGL.
 */

export type LiquidOptions = {
  /** Fuerza del arrastre por velocidad del ratón. */
  drag: number;
  /** Desplazamiento máximo del arrastre, px. */
  maxDrag: number;
  /** Radio de influencia de cada punto de la estela, px. */
  radius: number;
  /** Onda alrededor del cursor: amplitud y longitud, px. */
  waveAmp: number;
  waveLength: number;
  waveSpeed: number;
  /** Puntos de la estela y su vida en frames. */
  trail: number;
  trailLife: number;
  /** Inercia del cursor virtual (0–1, más bajo = más perezoso). */
  follow: number;
  /** Color de la estela (hex) y cuánto tiñe las letras / brilla el fondo. */
  trailColor: string;
  tint: number;
  glow: number;
  captureDelay: number;
  precapture: boolean;
  maxDpr: number;
  /**
   * Margen (px) que el canvas sobresale del contenido por cada lado, para que
   * lo deformado pueda salirse de su caja y pasar por encima de lo que haya
   * alrededor en vez de cortarse contra el borde. El canvas va `fixed`, así
   * que ni un `overflow: hidden` de un ancestro lo recorta.
   */
  bleed: number;
  /** Radio (px) de la zona que se tiñe de `trailColor` alrededor del ratón. */
  tintRadius: number;
  /**
   * Velocidad de la salida (0–1 por frame; más bajo = más lenta). Al irse el
   * ratón o soltar el dedo, la deformación y el color se relajan hasta 0 y
   * solo entonces se vuelve al HTML: sin corte ni fundido cruzado.
   */
  exitEase: number;
  /** También con el dedo (arrastrar sobre el contenido). */
  touch: boolean;
};

const DEFAULTS: LiquidOptions = {
  drag: 2.6,
  maxDrag: 36,
  radius: 120,
  waveAmp: 6,
  waveLength: 90,
  waveSpeed: 2.2,
  trail: 20,
  trailLife: 30,
  follow: 0.22,
  trailColor: "#008f8b",
  tint: 0,
  glow: 0,
  captureDelay: 320,
  precapture: false,
  maxDpr: 2,
  bleed: 0,
  tintRadius: 70,
  exitEase: 0.05,
  touch: false,
};

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const frag = (n: number) => `
precision highp float;
uniform sampler2D uTex;
uniform vec2 uRes;
uniform vec2 uPts[${n}];
uniform vec2 uVel[${n}];
uniform float uLife[${n}];
uniform vec2 uMouse;
uniform float uStrength;
uniform float uTime;
uniform float uRadius;
uniform float uMaxDrag;
uniform float uWaveAmp;
uniform float uWaveLen;
uniform vec3 uTrailColor;
uniform float uTint;
uniform float uGlow;
uniform vec2 uInset;   // dónde empieza el contenido dentro del canvas (bleed)
uniform vec2 uElSize;  // tamaño del contenido (la captura)
uniform float uTintRadius;
varying vec2 vUv;

void main() {
  vec2 p = vec2(vUv.x, 1.0 - vUv.y) * uRes;
  vec2 disp = vec2(0.0);
  float heat = 0.0;
  float r2 = uRadius * uRadius;
  // La estela de color tiene su propio radio, más corto que la distorsión:
  // se ve como un trazo concentrado con el color pleno, no como un velo.
  float h2 = uTintRadius * uTintRadius;
  for (int i = 0; i < ${n}; i++) {
    vec2 d = p - uPts[i];
    float dd = dot(d, d);
    disp += uVel[i] * exp(-dd / r2) * uLife[i];
    heat += exp(-dd / h2) * uLife[i];
  }
  float len = length(disp);
  if (len > uMaxDrag) disp *= uMaxDrag / len;

  vec2 dm = p - uMouse;
  float wm = exp(-dot(dm, dm) / (r2 * 2.5));
  float k = 6.2831853 / uWaveLen;
  disp += vec2(sin(p.y * k + uTime), cos(p.x * k * 0.8 + uTime * 0.8)) * uWaveAmp * wm;

  vec2 q = (p - disp * uStrength - uInset) / uElSize;
  vec4 col = vec4(0.0);
  if (q.x >= 0.0 && q.y >= 0.0 && q.x <= 1.0 && q.y <= 1.0) {
    col = texture2D(uTex, vec2(q.x, 1.0 - q.y));
  }

  // Estela de color: tiñe lo que hay (premultiplicado) y brilla en el vacío.
  float halo = exp(-dot(dm, dm) / h2);
  heat = clamp((heat * 1.6 + halo * 0.9) * uStrength, 0.0, 1.0);
  col.rgb = mix(col.rgb, uTrailColor * col.a, heat * uTint);
  // El brillo se apaga cerca de los bordes del canvas: sin esto se veía el
  // rectángulo del contenedor recortado contra el fondo.
  float edge = smoothstep(0.0, 70.0, min(min(p.x, uRes.x - p.x), min(p.y, uRes.y - p.y)));
  float g = heat * uGlow * (1.0 - col.a) * edge;
  col += vec4(uTrailColor * g, g);
  gl_FragColor = col;
}`;

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace("#", ""), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

type GL = {
  canvas: HTMLCanvasElement;
  gl: WebGLRenderingContext;
  u: Record<string, WebGLUniformLocation | null>;
};

function createGL(o: LiquidOptions): GL | null {
  const canvas = document.createElement("canvas");
  canvas.dataset.liquidCanvas = "";
  canvas.setAttribute("aria-hidden", "true");
  // `fixed` y colocado a mano en cada frame sobre la caja del contenido
  // (+ bleed): así ningún `overflow: hidden` de un ancestro lo recorta.
  Object.assign(canvas.style, {
    position: "fixed",
    left: "0px",
    top: "0px",
    pointerEvents: "none",
    opacity: "0",
    zIndex: "20",
  });
  const gl = canvas.getContext("webgl", {
    alpha: true,
    premultipliedAlpha: true,
    antialias: false,
  });
  if (!gl) return null;
  const prog = gl.createProgram()!;
  for (const [type, src] of [
    [gl.VERTEX_SHADER, VERT],
    [gl.FRAGMENT_SHADER, frag(o.trail)],
  ] as const) {
    const sh = gl.createShader(type)!;
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) return null;
    gl.attachShader(prog, sh);
  }
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "aPos");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);

  const u: GL["u"] = {};
  for (const name of [
    "uTex", "uRes", "uPts", "uVel", "uLife", "uMouse", "uStrength", "uTime",
    "uRadius", "uMaxDrag", "uWaveAmp", "uWaveLen", "uTrailColor", "uTint", "uGlow",
    "uInset", "uElSize", "uTintRadius",
  ]) {
    u[name] = gl.getUniformLocation(prog, name);
  }
  gl.uniform1i(u.uTex, 0);
  gl.uniform1f(u.uRadius, o.radius);
  gl.uniform1f(u.uMaxDrag, o.maxDrag);
  gl.uniform1f(u.uWaveAmp, o.waveAmp);
  gl.uniform1f(u.uWaveLen, o.waveLength);
  gl.uniform3fv(u.uTrailColor, hexToRgb(o.trailColor));
  gl.uniform1f(u.uTint, o.tint);
  gl.uniform1f(u.uGlow, o.glow);
  gl.uniform1f(u.uTintRadius, o.tintRadius);
  return { canvas, gl, u };
}

export default function LiquidHover({
  className,
  options,
  children,
}: {
  className?: string;
  options?: Partial<LiquidOptions>;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const optsKey = JSON.stringify(options ?? {});

  useEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host) return;
    const o: LiquidOptions = { ...DEFAULTS, ...(JSON.parse(optsKey) as Partial<LiquidOptions>) };
    const N = o.trail;

    const desktop = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const motionOK = window.matchMedia("(prefers-reduced-motion: no-preference)");

    let g: GL | null | undefined;
    let raf = 0;
    let hovering = false;
    let active = false;
    let captureTimer = 0;
    let captureId = 0;
    let fontCSS: string | undefined;
    let cached: HTMLCanvasElement | null = null;
    let strength = 0;
    const start = performance.now();
    let lastNow = start;

    const mouse = { x: 0, y: 0 };
    const cursor = { x: 0, y: 0 };
    const pts = new Float32Array(N * 2);
    const vel = new Float32Array(N * 2);
    const life = new Float32Array(N);
    let head = 0;

    const ensureGL = () => {
      if (g === undefined) {
        g = createGL(o);
        if (g) el.appendChild(g.canvas);
      }
      return g;
    };

    const b = o.bleed;

    // Coordenadas del ratón y la estela: en px del CANVAS (contenido + bleed).
    const local = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      mouse.x = e.clientX - r.left + b;
      mouse.y = e.clientY - r.top + b;
    };

    /**
     * Coloca el canvas `fixed` sobre la caja del contenido más el bleed, y
     * ajusta su resolución si cambió el tamaño. Se llama cada frame: así
     * sigue al contenido aunque se haga scroll con el efecto activo.
     */
    const place = () => {
      if (!g) return { w: 0, h: 0 };
      const { canvas } = g;
      const r = el.getBoundingClientRect();
      const w = r.width + b * 2;
      const h = r.height + b * 2;
      canvas.style.left = `${r.left - b}px`;
      canvas.style.top = `${r.top - b}px`;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const dpr = Math.min(window.devicePixelRatio || 1, o.maxDpr);
      const pw = Math.round(w * dpr);
      const ph = Math.round(h * dpr);
      if (canvas.width !== pw || canvas.height !== ph) {
        canvas.width = pw;
        canvas.height = ph;
      }
      return { w, h };
    };

    const frame = (now: number) => {
      if (!g) return;
      const { gl, u, canvas } = g;

      const px = cursor.x;
      const py = cursor.y;
      cursor.x += (mouse.x - cursor.x) * o.follow;
      cursor.y += (mouse.y - cursor.y) * o.follow;
      const vx = (cursor.x - px) * o.drag;
      const vy = (cursor.y - py) * o.drag;

      // `trailLife` en frames a 60 fps; escalado por el tiempo real del frame.
      const step = Math.min(64, now - lastNow) / (1000 / 60);
      for (let i = 0; i < N; i++) life[i] = Math.max(0, life[i] - step / o.trailLife);
      if (Math.abs(vx) + Math.abs(vy) > 0.05) {
        pts[head * 2] = cursor.x;
        pts[head * 2 + 1] = cursor.y;
        vel[head * 2] = vx;
        vel[head * 2 + 1] = vy;
        life[head] = 1;
        head = (head + 1) % N;
      }

      // Entrada ágil, salida lenta: al irse el puntero todo se relaja. Los
      // factores están pensados para 60 fps y se escalan con el tiempo real
      // del frame, así dura lo mismo en una máquina lenta.
      const dt = Math.min(64, now - lastNow) / (1000 / 60);
      lastNow = now;
      const k = hovering ? 0.12 : o.exitEase;
      strength += ((hovering ? 1 : 0) - strength) * (1 - Math.pow(1 - k, dt));

      const { w, h } = place();
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(u.uRes, w, h);
      gl.uniform2f(u.uInset, b, b);
      gl.uniform2f(u.uElSize, w - b * 2, h - b * 2);
      gl.uniform2fv(u.uPts, pts);
      gl.uniform2fv(u.uVel, vel);
      gl.uniform1fv(u.uLife, life);
      gl.uniform2f(u.uMouse, cursor.x, cursor.y);
      gl.uniform1f(u.uStrength, strength);
      gl.uniform1f(u.uTime, ((now - start) / 1000) * o.waveSpeed);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      // Ya relajado del todo (fuerza ~0 y estela apagada): el canvas es
      // idéntico al HTML, y el relevo de vuelta no se nota.
      if (!hovering && strength < 0.02 && Math.max(...life) < 0.02) {
        finish();
        return;
      }
      raf = active ? requestAnimationFrame(frame) : 0;
    };

    const finish = () => {
      active = false;
      raf = 0;
      if (g) {
        g.canvas.style.transition = "none";
        g.canvas.style.opacity = "0";
      }
      setContentVisible(true);
    };

    /**
     * Oculta/muestra el HTML real (todo menos el canvas). Va en línea y no en
     * CSS global para no depender de una hoja externa.
     */
    const setContentVisible = (visible: boolean) => {
      for (const child of Array.from(el.children) as HTMLElement[]) {
        if (child === g?.canvas) continue;
        child.style.transition = "none";
        child.style.opacity = visible ? "" : "0";
      }
    };

    /** Relevo al canvas en el mismo frame: con fuerza 0 es idéntico al HTML. */
    const activate = (image: HTMLCanvasElement) => {
      if (!g) return;
      const { gl, canvas } = g;
      place();
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      cursor.x = mouse.x;
      cursor.y = mouse.y;
      life.fill(0);
      strength = 0;
      lastNow = performance.now();
      active = true;
      canvas.style.transition = "none";
      canvas.style.opacity = "1";
      setContentVisible(false);
      frame(performance.now());
    };


    const capture = async () => {
      const { toCanvas, getFontEmbedCSS } = await import("html-to-image");
      const canvas = g?.canvas;
      fontCSS ??= await getFontEmbedCSS(el);
      return toCanvas(el, {
        pixelRatio: Math.min(window.devicePixelRatio || 1, o.maxDpr),
        fontEmbedCSS: fontCSS,
        skipAutoScale: true,
        filter: (n) => n !== canvas,
      });
    };

    const allowed = (e: PointerEvent) =>
      (e.pointerType === "mouse" && desktop.matches) ||
      (e.pointerType !== "mouse" && o.touch && motionOK.matches);

    const onEnter = (e: PointerEvent) => {
      if (!allowed(e)) return;
      local(e);
      hovering = true;
      if (!ensureGL()) return;
      if (active) {
        // Volvió mientras se relajaba: se retoma desde donde iba.
        raf ||= requestAnimationFrame(frame);
        return;
      }
      if (o.precapture && cached) {
        activate(cached);
        return;
      }
      // Sin precaptura válida, se captura ahora.
      const id = ++captureId;
      clearTimeout(captureTimer);
      captureTimer = window.setTimeout(() => {
        capture()
          .then((image) => {
            if (o.precapture) cached = image;
            if (id === captureId && hovering) activate(image);
          })
          .catch(() => {});
      }, o.precapture ? 0 : o.captureDelay);
    };
    const onMove = (e: PointerEvent) => {
      if (hovering) local(e);
    };
    // Salida: solo deja de «tirar»; el frame se encarga de relajarlo todo y
    // de volver al HTML cuando ya no se nota (ver finish).
    const onLeave = () => {
      hovering = false;
      captureId++;
      clearTimeout(captureTimer);
    };

    // Ratón: entrar/salir. Dedo: tocar, arrastrar y soltar (o que el
    // navegador lo cancele al hacer scroll) → misma salida suave.
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") onEnter(e);
    };
    const onEnterMouse = (e: PointerEvent) => {
      if (e.pointerType === "mouse") onEnter(e);
    };
    const onLeaveAny = (e: PointerEvent) => {
      if (e.pointerType === "mouse" || e.type !== "pointerleave") onLeave();
    };

    host.addEventListener("pointerenter", onEnterMouse);
    host.addEventListener("pointerdown", onDown);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeaveAny);
    host.addEventListener("pointerup", onLeaveAny);
    host.addEventListener("pointercancel", onLeaveAny);
    // Deja el scroll vertical al navegador; el arrastre horizontal mueve el rótulo.
    if (o.touch) host.style.touchAction = "pan-y";

    // Precaptura: al acercarse a la pantalla, y de nuevo si cambia el ancho.
    let io: IntersectionObserver | undefined;
    let lastWidth = window.innerWidth;
    let resizeTimer = 0;
    const precapture = () => {
      if (!(desktop.matches || (o.touch && motionOK.matches)) || !ensureGL()) return;
      // Oculto (p. ej. el footer antes de su transición de papel roto): la
      // captura saldría vacía y se reutilizaría. Se hará al pasar el ratón.
      if (getComputedStyle(el).visibility !== "visible") return;
      capture()
        .then((image) => {
          cached = image;
        })
        .catch(() => {});
    };
    const onResize = () => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      cached = null;
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(precapture, 300);
    };
    if (o.precapture) {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((en) => en.isIntersecting) && !cached) precapture();
        },
        { rootMargin: "300px 0px" },
      );
      io.observe(el);
      window.addEventListener("resize", onResize);
    }

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(captureTimer);
      clearTimeout(resizeTimer);
      io?.disconnect();
      window.removeEventListener("resize", onResize);
      host.removeEventListener("pointerenter", onEnterMouse);
      host.removeEventListener("pointerdown", onDown);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeaveAny);
      host.removeEventListener("pointerup", onLeaveAny);
      host.removeEventListener("pointercancel", onLeaveAny);
      host.style.touchAction = "";
      setContentVisible(true);
      if (g) {
        g.gl.getExtension("WEBGL_lose_context")?.loseContext();
        g.canvas.remove();
      }
    };
  }, [optsKey]);

  return (
    <div ref={ref} data-liquid="" className={className} style={{ position: "relative" }}>
      {children}
    </div>
  );
}
