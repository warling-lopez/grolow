import { FRAGMENT_SHADER, VERTEX_SHADER } from "./shader";
import { TRANSITION_CONFIG, type ColorLayer } from "./config";

/**
 * Un único canvas WebGL, `fixed` a pantalla completa, compartido por todas las
 * transiciones. No hay bucle propio: solo se dibuja cuando alguien llama a
 * `render()` (el rAF de la intro o el `onUpdate` de ScrollTrigger), así que
 * fuera de una transición no gasta nada.
 *
 * Sin three.js: para un triángulo a pantalla completa bastan ~150 líneas, y
 * three pesa ~150 KB.
 */

const UNIFORMS = [
  "uSectionA", "uProgress", "uAspect", "uDotSize", "uEdgeAmp", "uWarp", "uEdgeB",
  "uColor1", "uLead1", "uUse1", "uSeed1", "uEdge1",
  "uColor2", "uLead2", "uUse2", "uSeed2", "uEdge2",
] as const;

type UniformName = (typeof UNIFORMS)[number];

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace("#", ""), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

/** DPR del canvas: limitado, y algo más bajo en táctil por la carga del fbm. */
export function transitionDpr() {
  const { maxDpr, maxDprCoarse } = TRANSITION_CONFIG.shader;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  return Math.min(window.devicePixelRatio || 1, coarse ? maxDprCoarse : maxDpr);
}

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export class TransitionRenderer {
  readonly canvas: HTMLCanvasElement;
  private gl: WebGLRenderingContext;
  private u = {} as Record<UniformName, WebGLUniformLocation | null>;
  private owner: object | null = null;
  lost = false;

  constructor() {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.dataset.transitionCanvas = "";
    Object.assign(canvas.style, {
      position: "fixed",
      inset: "0",
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      display: "none",
    });

    // premultipliedAlpha: true + texturas subidas premultiplicadas + salida
    // vec4(0) en lo revelado → el compositor mezcla sin halos en el borde.
    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      preserveDrawingBuffer: false,
    });
    if (!gl) throw new Error("WebGL no disponible");
    this.gl = gl;
    this.canvas = canvas;

    const program = gl.createProgram()!;
    for (const [type, src] of [
      [gl.VERTEX_SHADER, VERTEX_SHADER],
      [gl.FRAGMENT_SHADER, FRAGMENT_SHADER],
    ] as const) {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(sh) ?? "shader");
      }
      gl.attachShader(program, sh);
    }
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) ?? "program");
    }
    gl.useProgram(program);

    // Un triángulo que cubre toda la pantalla (más barato que dos).
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    for (const name of UNIFORMS) this.u[name] = gl.getUniformLocation(program, name);

    const tex = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    gl.uniform1i(this.u.uSectionA, 0);

    canvas.addEventListener("webglcontextlost", (e) => {
      e.preventDefault();
      this.lost = true;
      this.canvas.style.display = "none";
    });

    document.body.appendChild(canvas);
  }

  /** Toma el canvas para una transición. Devuelve false si otra lo tiene. */
  acquire(owner: object, zIndex: number) {
    if (this.owner && this.owner !== owner) return false;
    this.owner = owner;
    this.canvas.style.zIndex = String(zIndex);
    this.canvas.style.display = "block";
    this.resize();
    return true;
  }

  release(owner: object) {
    if (this.owner !== owner) return;
    this.owner = null;
    this.canvas.style.display = "none";
  }

  isOwner(owner: object) {
    return this.owner === owner;
  }

  /** Tamaño en píxeles del canvas (viewport × DPR limitado). */
  resize() {
    const dpr = transitionDpr();
    const w = Math.max(1, Math.round(window.innerWidth * dpr));
    const h = Math.max(1, Math.round(window.innerHeight * dpr));
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
    }
    return { w, h, dpr };
  }

  setTexture(source: TexImageSource) {
    const gl = this.gl;
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
  }

  render(progress: number, layers: readonly ColorLayer[]) {
    if (this.lost) return;
    const gl = this.gl;
    const u = this.u;
    const { edgeAmp, warp, baseEdge, dotSize } = TRANSITION_CONFIG.shader;
    const { width: w, height: h } = this.canvas;
    const dpr = w / Math.max(1, window.innerWidth);

    gl.viewport(0, 0, w, h);
    gl.uniform1f(u.uProgress, progress);
    gl.uniform1f(u.uAspect, w / h);
    gl.uniform1f(u.uDotSize, dotSize * dpr);
    gl.uniform1f(u.uEdgeAmp, edgeAmp);
    gl.uniform1f(u.uWarp, warp);
    gl.uniform1f(u.uEdgeB, baseEdge);

    ([1, 2] as const).forEach((i) => {
      const layer = layers[i - 1];
      gl.uniform1f(u[`uUse${i}`], layer ? 1 : 0);
      if (!layer) return;
      gl.uniform3fv(u[`uColor${i}`], hexToRgb(layer.color));
      gl.uniform1f(u[`uLead${i}`], layer.lead);
      gl.uniform1f(u[`uSeed${i}`], layer.seed);
      gl.uniform1f(u[`uEdge${i}`], layer.edge);
    });

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
}

let instance: TransitionRenderer | null | undefined;

/** El renderer compartido, o null si no hay WebGL (→ fundido). */
export function getRenderer(): TransitionRenderer | null {
  if (typeof window === "undefined") return null;
  if (instance === undefined) {
    try {
      instance = new TransitionRenderer();
    } catch {
      instance = null;
    }
  }
  return instance && !instance.lost ? instance : null;
}
