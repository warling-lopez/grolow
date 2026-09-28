/**
 * Shader de rotura «papel roto» con trama Bayer.
 *
 * Es la lógica original generalizada: hasta dos capas de color opcionales
 * (color + adelanto + seed + borde) y la intensidad del borde y el warp como
 * uniforms (`uEdgeAmp`, `uWarp`) para ajustarlos desde `config.ts`.
 *
 * `uDither` elige el borde: trama Bayer (pixelado) o sólido.
 *
 * vUv.y = 0 es abajo: la rotura avanza hacia arriba. Donde revela, la salida es
 * vec4(0) — transparente en premultiplied alpha — y se ve el HTML de debajo.
 */

export const VERTEX_SHADER = /* glsl */ `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

export const FRAGMENT_SHADER = /* glsl */ `
precision highp float;

uniform sampler2D uSectionA;
uniform float uProgress;
uniform float uAspect;
uniform float uDotSize;
uniform float uEdgeAmp;
uniform float uWarp;
uniform float uEdgeB;
uniform float uDither;   // 1 = trama Bayer (pixelado), 0 = borde sólido
uniform float uPixelY;   // alto de 1 píxel en unidades de vUv (antialias)

uniform vec3  uColor1; uniform float uLead1; uniform float uUse1;
uniform float uSeed1;  uniform float uEdge1;
uniform vec3  uColor2; uniform float uLead2; uniform float uUse2;
uniform float uSeed2;  uniform float uEdge2;

varying vec2 vUv;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 6; i++){ v += a * noise(p); p *= 2.0; a *= 0.5; }
  return v;
}
float bayer2(vec2 a){ a = floor(a); return fract(a.x / 2.0 + a.y * a.y * 0.75); }
float bayer4(vec2 a){ return bayer2(0.5 * a) * 0.25 + bayer2(a); }

float reveal(vec2 uv, float p, float seed, float edge){
  vec2 q = vec2(uv.x * uAspect, uv.y);
  vec2 w = vec2(fbm(q * 2.0 + seed + p * 1.5),
                fbm(q * 2.0 + seed + 5.2 - p * 1.5));
  float n = fbm(q * 3.0 + w * uWarp + seed);
  float front = uv.y + (n - 0.5) * uEdgeAmp;
  // Con uEdgeAmp = 0.6 es exactamente el -0.3 - edge + p * (1.6 + edge)
  // original: el recorrido se adapta a la amplitud del borde.
  float t = -0.5 * uEdgeAmp - edge + p * (1.0 + uEdgeAmp + edge);
  float d = clamp((front - t) / edge, 0.0, 1.0);
  if (uDither > 0.5) return step(d, bayer4(gl_FragCoord.xy / uDotSize));
  // Sólido: corte en la mitad de la franja, suavizado ~1px para que no
  // se vea escalonado.
  float aa = uPixelY / edge;
  return 1.0 - smoothstep(0.5 - aa, 0.5 + aa, d);
}

void main(){
  vec4 c = texture2D(uSectionA, vUv);
  if (uUse1 > 0.5) {
    c = mix(c, vec4(uColor1, 1.0), reveal(vUv, clamp(uProgress * uLead1, 0.0, 1.0), uSeed1, uEdge1));
  }
  if (uUse2 > 0.5) {
    c = mix(c, vec4(uColor2, 1.0), reveal(vUv, clamp(uProgress * uLead2, 0.0, 1.0), uSeed2, uEdge2));
  }
  float rB = reveal(vUv, uProgress, 0.0, uEdgeB);
  gl_FragColor = mix(c, vec4(0.0), rB);
}
`;
