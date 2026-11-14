"use client";

import { useEffect, useRef, useState } from "react";
import { cx } from "@/lib/cx";

/*
 * A live "liquid" background rendered with a WebGL2 fragment shader:
 * iterated sinusoidal domain warping with iridescent rims, plus a soft lens
 * that follows the pointer. It pauses off-screen, adapts its resolution to the
 * GPU, renders a single still frame for reduced-motion users, and falls back to
 * a CSS gradient when WebGL2 is unavailable.
 */

const VERTEX_SHADER = /* glsl */ `#version 300 es
in vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAGMENT_SHADER = /* glsl */ `#version 300 es
precision highp float;

uniform vec2 uRes;
uniform float uTime;
uniform vec2 uPointer;
uniform float uSeed;

out vec4 outColor;

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  vec2 mp = (uPointer - 0.5 * uRes) / uRes.y;
  // soft lens that follows the pointer
  vec2 d = p - mp;
  p -= d * 0.16 * exp(-dot(d, d) * 7.0);

  float t = uTime * 0.11 + uSeed;

  // Liquid: iterated sinusoidal domain warping gives long, smooth folds.
  vec2 uv = p * 2.6 + vec2(uSeed * 0.37, -uSeed * 0.21);
  for (int i = 1; i < 8; i++) {
    float fi = float(i);
    uv.x += 0.7 / pow(fi, 1.3) * sin(fi * 1.55 * uv.y + t + 0.9 * fi);
    uv.y += 0.55 / pow(fi, 1.3) * cos(fi * 1.35 * uv.x - 0.8 * t + 1.7 * fi);
  }

  float s1 = sin(uv.x * 1.5 + uv.y * 0.75);
  float s2 = sin(uv.x * 0.55 - uv.y * 1.3 + 1.3);

  vec3 abyss  = vec3(0.004, 0.006, 0.030);
  vec3 navy   = vec3(0.015, 0.040, 0.190);
  vec3 cobalt = vec3(0.060, 0.290, 1.000);
  vec3 violet = vec3(0.420, 0.160, 0.880);
  vec3 sky    = vec3(0.620, 0.880, 1.000);
  vec3 orchid = vec3(0.980, 0.540, 0.930);
  vec3 peach  = vec3(1.000, 0.720, 0.680);

  float lum = smoothstep(-0.55, 0.9, s1);
  vec3 col = mix(abyss, navy, smoothstep(0.0, 0.3, lum));
  col = mix(col, cobalt, smoothstep(0.3, 1.0, lum));
  col = mix(col, violet, smoothstep(0.35, 1.0, s2) * 0.4 * (1.0 - 0.6 * lum));
  col = mix(col, orchid, smoothstep(0.75, 1.0, s2) * smoothstep(0.2, 0.7, lum) * 0.22);
  col *= mix(0.22, 1.0, smoothstep(-1.3, -0.25, s1 + s2 * 0.7));

  // iridescent rims along the fold edges
  float phase = s1 * 5.0 + s2 * 1.6;
  float edge = 1.0 - abs(sin(phase));
  float rim = pow(edge, 26.0);
  float halo = pow(edge, 6.0);
  vec3 iri = mix(sky, orchid, smoothstep(-0.6, 0.9, sin(s2 * 2.6 + uv.x * 0.7)));
  iri = mix(iri, peach, smoothstep(0.65, 1.0, s2) * 0.55);
  float rimMask = smoothstep(-0.5, 0.5, s1);
  col += rim * iri * 0.85 * rimMask;
  col += halo * iri * 0.07 * rimMask;

  float vignette = smoothstep(1.35, 0.2, length(p * vec2(0.8, 1.1)));
  col *= mix(0.5, 1.0, vignette);

  col = 1.0 - exp(-col * 1.6);
  // dither to avoid banding in the dark gradients
  col += (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) / 255.0;
  outColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGL2RenderingContext) {
  const vs = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  if (!vs || !fs) return null;
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.bindAttribLocation(program, 0, "aPos");
  gl.linkProgram(program);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

type LiquidCanvasProps = {
  className?: string;
  /** Offsets the noise field so each instance looks different. */
  seed?: number;
};

export function LiquidCanvas({ className, seed = 0 }: LiquidCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
    });
    if (!gl) return;

    const program = createProgram(gl);
    if (!program) return;

    const vao = gl.createVertexArray();
    const buffer = gl.createBuffer();
    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    // One oversized triangle covers the whole viewport.
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.useProgram(program);

    const uRes = gl.getUniformLocation(program, "uRes");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uPointer = gl.getUniformLocation(program, "uPointer");
    gl.uniform1f(gl.getUniformLocation(program, "uSeed"), seed);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Render below native resolution: the image is soft, so this is invisible
    // but saves a lot of GPU time. Lowered further if frames run long.
    let quality = Math.min(window.devicePixelRatio || 1, 2) * 0.75;
    // As a full-screen wallpaper the canvas can get very large (4K, high-DPI),
    // so cap the pixels shaded per frame as well.
    const MAX_PIXELS = 1_500_000;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const area = Math.max(rect.width * rect.height, 1);
      const scale = Math.min(quality, Math.sqrt(MAX_PIXELS / area));
      const w = Math.max(1, Math.round(rect.width * scale));
      const h = Math.max(1, Math.round(rect.height * scale));
      if (w !== width || h !== height) {
        width = w;
        height = h;
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    const pointer = { x: 0, y: 0, lastMove: -Infinity };
    const lens = { x: 0.5, y: 0.5 };
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.lastMove = performance.now();
    };

    let elapsed = 6; // start mid-flow so the first frame is already interesting
    let last = 0;
    let raf = 0;
    let firstFrame = 0;
    let frames = 0;
    let slowFrames = 0;
    let shown = false;

    const draw = () => {
      let tx: number;
      let ty: number;
      if (performance.now() - pointer.lastMove < 4000) {
        const rect = canvas.getBoundingClientRect();
        tx = (pointer.x - rect.left) / Math.max(rect.width, 1);
        ty = (pointer.y - rect.top) / Math.max(rect.height, 1);
      } else {
        // idle / touch: let the lens drift on its own
        tx = 0.5 + Math.cos(elapsed * 0.21) * 0.22;
        ty = 0.5 + Math.sin(elapsed * 0.17) * 0.18;
      }
      lens.x += (tx - lens.x) * 0.045;
      lens.y += (ty - lens.y) * 0.045;

      gl.uniform2f(uRes, width, height);
      gl.uniform1f(uTime, elapsed);
      gl.uniform2f(uPointer, lens.x * width, (1 - lens.y) * height);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      if (!shown) {
        shown = true;
        setReady(true);
      }
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = last ? Math.min((now - last) / 1000, 0.1) : 1 / 60;
      last = now;
      elapsed += dt;

      // Adaptive quality: if many frames take longer than ~25ms, drop resolution.
      frames += 1;
      if (frames > 30) {
        if (dt > 1 / 40) slowFrames += 1;
        if (frames >= 150) {
          if (slowFrames > 45 && quality > 0.3) {
            quality = Math.max(0.3, quality * 0.7);
            resize();
          }
          frames = 0;
          slowFrames = 0;
        }
      }
      draw();
    };

    const start = () => {
      if (raf || reducedMotion) return;
      last = 0;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    let inView = true;
    const sync = () => (inView && !document.hidden ? start() : stop());
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    io.observe(canvas);

    const ro = new ResizeObserver(() => {
      resize();
      if (!raf) draw();
    });
    ro.observe(canvas);

    const onContextLost = (event: Event) => {
      event.preventDefault();
      stop();
      setReady(false);
    };

    document.addEventListener("visibilitychange", sync);
    canvas.addEventListener("webglcontextlost", onContextLost);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    resize();
    firstFrame = requestAnimationFrame(() => draw());
    sync();

    return () => {
      stop();
      cancelAnimationFrame(firstFrame);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", sync);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      window.removeEventListener("pointermove", onPointerMove);
      gl.deleteBuffer(buffer);
      gl.deleteVertexArray(vao);
      gl.deleteProgram(program);
    };
  }, [seed]);

  return (
    <div className={className} aria-hidden="true">
      <div className="liquid-fallback absolute inset-0" />
      <canvas
        ref={canvasRef}
        className={cx(
          "absolute inset-0 h-full w-full transition-opacity duration-[1600ms] ease-out",
          ready ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}
