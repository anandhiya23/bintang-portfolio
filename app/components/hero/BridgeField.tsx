"use client";

import { useEffect, useRef } from "react";
import { BRIDGE_ASPECT, BRIDGE_POINTS_B64 } from "@/lib/bridgePoints";
import type { HeroSignal } from "./signal";

/**
 * A WebGL particle field. Thousands of "stars" (bintang) drift in, assemble
 * into the bridge drawing, part around the pointer, ripple on click and
 * scatter back into a starfield as the hero scrolls away.
 *
 * Physics runs on the CPU in typed arrays (cheap at this size); WebGL only
 * draws points. The loop sleeps whenever the hero is off-screen or the tab is
 * hidden. With prefers-reduced-motion the bridge is drawn statically.
 */

let decoded: Float32Array | null = null;
function bridgePoints(): Float32Array {
  if (decoded) return decoded;
  const bin = atob(BRIDGE_POINTS_B64);
  const n = bin.length / 4;
  const out = new Float32Array(n * 2);
  for (let i = 0; i < n; i++) {
    const o = i * 4;
    out[i * 2] = (bin.charCodeAt(o) | (bin.charCodeAt(o + 1) << 8)) / 65535;
    out[i * 2 + 1] = (bin.charCodeAt(o + 2) | (bin.charCodeAt(o + 3) << 8)) / 65535;
  }
  decoded = out;
  return out;
}

const VERT = `
attribute vec2 a_pos;
attribute float a_heat;
attribute float a_kind;
uniform vec2 u_res;
uniform float u_dpr;
uniform vec3 u_lens;
uniform float u_alpha;
varying vec3 v_col;
varying float v_a;
void main() {
  vec2 clip = (a_pos / u_res) * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
  float inLens = 1.0 - smoothstep(u_lens.z - 1.5, u_lens.z + 0.5, distance(a_pos, u_lens.xy));
  vec3 orange = vec3(1.0, 0.361, 0.0);
  vec3 hot    = vec3(0.690, 0.184, 0.0);
  vec3 slate  = vec3(0.278, 0.333, 0.412);
  vec3 pale   = vec3(0.886, 0.910, 0.941);
  float h = clamp(a_heat, 0.0, 1.0);
  // Orange stars burn darker when disturbed; slate stars catch fire.
  vec3 col = mix(mix(orange, hot, h * 0.7), mix(slate, orange, h), a_kind);
  // Inside the logic lens (dark blueprint) slate stars turn pale.
  col = mix(col, mix(orange, pale, a_kind), inLens);
  v_col = col;
  v_a = u_alpha * mix(0.92, 0.62, a_kind) * mix(1.0, 1.0, inLens);
  gl_PointSize = u_dpr * (1.75 + h * 1.9 - a_kind * 0.25) * mix(1.0, 1.3, inLens);
}`;

const FRAG = `
precision mediump float;
varying vec3 v_col;
varying float v_a;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  float a = v_a * (1.0 - smoothstep(0.32, 0.5, d));
  gl_FragColor = vec4(v_col * a, a);
}`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(s) ?? "shader");
  }
  return s;
}

type Props = {
  signal: React.RefObject<HeroSignal>;
  reduced: boolean;
  onUnsupported?: () => void;
};

export default function BridgeField({ signal, reduced, onUnsupported }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: true, premultipliedAlpha: true, powerPreference: "high-performance" });
    if (!gl) {
      onUnsupported?.();
      return;
    }

    let prog: WebGLProgram;
    try {
      prog = gl.createProgram()!;
      gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error("link");
    } catch {
      onUnsupported?.();
      return;
    }
    gl.useProgram(prog);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const aPos = gl.getAttribLocation(prog, "a_pos");
    const aHeat = gl.getAttribLocation(prog, "a_heat");
    const aKind = gl.getAttribLocation(prog, "a_kind");
    const uRes = gl.getUniformLocation(prog, "u_res");
    const uDpr = gl.getUniformLocation(prog, "u_dpr");
    const uLens = gl.getUniformLocation(prog, "u_lens");
    const uAlpha = gl.getUniformLocation(prog, "u_alpha");
    const posBuf = gl.createBuffer();
    const heatBuf = gl.createBuffer();
    const kindBuf = gl.createBuffer();

    const src = bridgePoints();
    const maxN = src.length / 2;

    // Per-particle state.
    let N = 0;
    let W = 0;
    let H = 0;
    let dpr = 1;
    let pos = new Float32Array(0);
    let vel = new Float32Array(0);
    let home = new Float32Array(0);
    let scatter = new Float32Array(0);
    let heat = new Float32Array(0);
    let delay = new Float32Array(0);
    let seed = new Float32Array(0);
    let started = false;
    let introT0 = 0;

    const rand = (() => {
      let s = 1234567;
      return () => ((s = (s * 16807) % 2147483647) / 2147483647);
    })();

    function layout() {
      const rect = canvas!.getBoundingClientRect();
      W = Math.max(1, rect.width);
      H = Math.max(1, rect.height);
      const mobile = W < 768;
      dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.75 : 2);
      canvas!.width = Math.round(W * dpr);
      canvas!.height = Math.round(H * dpr);
      gl!.viewport(0, 0, canvas!.width, canvas!.height);

      // Bridge placement: anchored bottom-right, landscape vs portrait.
      // The drawing's content ends ~80% of the way down its box (water/rocks trimmed).
      let bw: number;
      let ox: number;
      if (W >= 1024) {
        bw = Math.min(W * 0.92, H * 0.9 * BRIDGE_ASPECT);
        ox = W - bw * 0.94;
      } else if (W >= 640) {
        bw = W * 1.1;
        ox = W - bw * 0.95;
      } else {
        bw = W * 1.5;
        ox = W - bw * 0.97;
      }
      const bh = bw / BRIDGE_ASPECT;
      const oy = H - bh * 0.8 - H * (W >= 1024 ? 0.09 : 0.08);

      const target = Math.round(Math.min(maxN, Math.max(mobile ? 3600 : 4200, (W * H) / (mobile ? 100 : 120))));
      const prevN = N;
      if (target !== N) {
        const grow = (a: Float32Array, len: number) => {
          const b = new Float32Array(len);
          b.set(a.subarray(0, Math.min(a.length, len)));
          return b;
        };
        pos = grow(pos, target * 2);
        vel = grow(vel, target * 2);
        home = new Float32Array(target * 2);
        scatter = grow(scatter, target * 2);
        heat = grow(heat, target);
        delay = grow(delay, target);
        seed = grow(seed, target);
        N = target;
      }
      for (let i = 0; i < N; i++) {
        home[i * 2] = ox + src[i * 2] * bw;
        home[i * 2 + 1] = oy + src[i * 2 + 1] * bh;
        if (i >= prevN) {
          const a = rand() * Math.PI * 2;
          const m = 0.35 + rand() * 0.9;
          scatter[i * 2] = Math.cos(a) * m;
          scatter[i * 2 + 1] = Math.sin(a) * m;
          seed[i] = rand();
          // Sweep the bridge in from left to right.
          delay[i] = src[i * 2] * 1100 + rand() * 700;
          if (reduced || started) {
            pos[i * 2] = home[i * 2];
            pos[i * 2 + 1] = home[i * 2 + 1];
          } else {
            pos[i * 2] = rand() * W;
            pos[i * 2 + 1] = rand() * H;
            vel[i * 2] = (rand() - 0.5) * 0.4;
            vel[i * 2 + 1] = (rand() - 0.5) * 0.4;
          }
        }
      }
      kindUpload();
      signal.current.dirty = true;
    }

    function kindUpload() {
      const kind = new Float32Array(N);
      for (let i = 0; i < N; i++) kind[i] = seed[i] < 0.26 ? 1 : 0;
      gl!.bindBuffer(gl!.ARRAY_BUFFER, kindBuf);
      gl!.bufferData(gl!.ARRAY_BUFFER, kind, gl!.STATIC_DRAW);
    }

    function step(now: number, dt: number) {
      const s = signal.current;
      const t = now - introT0;
      const warp = s.scroll * s.scroll;
      const R = Math.max(70, Math.min(140, W * 0.075));
      const R2 = R * R;
      const damp = Math.pow(0.86, dt);
      const pulses = s.pulses;
      for (let p = pulses.length - 1; p >= 0; p--) if (now - pulses[p].t > 1400) pulses.splice(p, 1);

      for (let i = 0; i < N; i++) {
        const ix = i * 2;
        const iy = ix + 1;
        let x = pos[ix];
        let y = pos[iy];
        const sd = seed[i];

        // Spring toward home (gated by the intro sweep).
        const gate = Math.min(1, Math.max(0, (t - delay[i]) / 650));
        const k = 0.006 + 0.04 * gate * gate;
        let tx = home[ix] + Math.sin(now * 0.0007 + sd * 40) * 1.1;
        let ty = home[iy] + Math.cos(now * 0.0009 + sd * 70) * 1.1;
        if (warp > 0) {
          tx += scatter[ix] * warp * W * 0.7;
          ty += scatter[iy] * warp * H * 0.7 - warp * H * 0.25;
        }
        let ax = gate > 0 ? (tx - x) * k : 0;
        let ay = gate > 0 ? (ty - y) * k : 0;

        // Pointer: push away and drag along with its motion.
        if (s.active) {
          const dx = x - s.px;
          const dy = y - s.py;
          const d2 = dx * dx + dy * dy;
          if (d2 < R2) {
            const d = Math.sqrt(d2) + 0.001;
            let f = 1 - d / R;
            f *= f;
            ax += (dx / d) * f * 5.2 + s.pvx * f * 0.22;
            ay += (dy / d) * f * 5.2 + s.pvy * f * 0.22;
          }
        }

        // Shockwaves.
        for (let p = 0; p < pulses.length; p++) {
          const pu = pulses[p];
          const age = now - pu.t;
          const r = age * 0.85;
          const dx = x - pu.x;
          const dy = y - pu.y;
          const d = Math.sqrt(dx * dx + dy * dy) + 0.001;
          const band = 46;
          const dd = Math.abs(d - r);
          if (dd < band) {
            const f = (1 - dd / band) * (1 - age / 1400) * 3.2;
            ax += (dx / d) * f;
            ay += (dy / d) * f;
          }
        }

        const vx = (vel[ix] + ax * dt) * damp;
        const vy = (vel[iy] + ay * dt) * damp;
        x += vx * dt;
        y += vy * dt;
        pos[ix] = x;
        pos[iy] = y;
        vel[ix] = vx;
        vel[iy] = vy;
        const sp = Math.min(1, Math.sqrt(vx * vx + vy * vy) / 6);
        heat[i] += (sp - heat[i]) * 0.2;
      }
    }

    function draw() {
      const s = signal.current;
      gl!.clearColor(0, 0, 0, 0);
      gl!.clear(gl!.COLOR_BUFFER_BIT);
      gl!.uniform2f(uRes, W, H);
      gl!.uniform1f(uDpr, dpr);
      gl!.uniform3f(uLens, s.lx, s.ly, s.lr);
      gl!.uniform1f(uAlpha, reduced ? 1 : Math.max(0, 1 - s.scroll * 1.1));

      gl!.bindBuffer(gl!.ARRAY_BUFFER, posBuf);
      gl!.bufferData(gl!.ARRAY_BUFFER, pos.subarray(0, N * 2), gl!.DYNAMIC_DRAW);
      gl!.enableVertexAttribArray(aPos);
      gl!.vertexAttribPointer(aPos, 2, gl!.FLOAT, false, 0, 0);

      gl!.bindBuffer(gl!.ARRAY_BUFFER, heatBuf);
      gl!.bufferData(gl!.ARRAY_BUFFER, heat.subarray(0, N), gl!.DYNAMIC_DRAW);
      gl!.enableVertexAttribArray(aHeat);
      gl!.vertexAttribPointer(aHeat, 1, gl!.FLOAT, false, 0, 0);

      gl!.bindBuffer(gl!.ARRAY_BUFFER, kindBuf);
      gl!.enableVertexAttribArray(aKind);
      gl!.vertexAttribPointer(aKind, 1, gl!.FLOAT, false, 0, 0);

      gl!.drawArrays(gl!.POINTS, 0, N);
    }

    layout();
    introT0 = performance.now();
    started = true;

    let raf = 0;
    let last = performance.now();
    let visible = true;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(2.5, (now - last) / 16.667);
      last = now;
      const s = signal.current;
      if (reduced) {
        if (!s.dirty) return;
        s.dirty = false;
        draw();
        return;
      }
      step(now, dt);
      draw();
    };
    const start = () => {
      if (raf || !visible || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    let resizeT = 0;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(resizeT);
      resizeT = window.setTimeout(layout, 120);
    });
    ro.observe(canvas);
    start();
    canvas.dataset.ready = "true";

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      window.clearTimeout(resizeT);
      document.removeEventListener("visibilitychange", onVis);
      gl.deleteBuffer(posBuf);
      gl.deleteBuffer(heatBuf);
      gl.deleteBuffer(kindBuf);
      gl.deleteProgram(prog);
    };
  }, [reduced, signal, onUnsupported]);

  return <canvas ref={canvasRef} aria-hidden className="hero-canvas" />;
}
