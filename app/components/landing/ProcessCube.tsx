"use client";

import { useEffect, useRef, useState } from "react";
import { MOTION_OK, ScrollTrigger } from "./motion";

const STEPS = [
  { k: "Sketch", t: "Every project starts as a wireframe. Structure first, so the style has something to stand on." },
  { k: "System", t: "Then it’s taken apart: tokens, components and rules that can each be reasoned about on their own." },
  { k: "Ship", t: "And put back together, tested and deployed by the same pair of hands, so nothing gets lost in the hand-off." },
];

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/**
 * "From sketch to ship": a 3×3×3 cube that starts as a wireframe, bursts into
 * its 27 parts, then twists back together as a solid. Driven by scroll through
 * a tall section with a sticky stage. three.js is loaded only when the section
 * is near the viewport.
 */
export default function ProcessCube() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState<"anim" | "static" | "fallback">("anim");

  useEffect(() => {
    const el = root.current!;
    const wrap = stage.current!;
    const reduced = !window.matchMedia(MOTION_OK).matches;
    if (reduced) setMode("static");

    let disposed = false;
    let cleanup = () => {};

    const boot = async () => {
      const THREE = await import("three");
      const { RoundedBoxGeometry } = await import("three/examples/jsm/geometries/RoundedBoxGeometry.js");
      if (disposed) return;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      } catch {
        setMode("fallback");
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      wrap.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);

      scene.add(new THREE.HemisphereLight(0xffffff, 0x0f172a, 1.1));
      const key = new THREE.DirectionalLight(0xffffff, 2.4);
      key.position.set(5, 7, 6);
      scene.add(key);
      const rim = new THREE.PointLight(0xff5c00, 60, 30);
      rim.position.set(-6, -4, -3);
      scene.add(rim);

      const ORANGE = new THREE.Color("#ff5c00");
      const DEEP = new THREE.Color("#b02f00");
      const PAPER = new THREE.Color("#f8fafc");

      const geo = new RoundedBoxGeometry(0.92, 0.92, 0.92, 3, 0.1);
      const edgeGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(0.92, 0.92, 0.92));
      const group = new THREE.Group();
      scene.add(group);

      type Cubie = {
        mesh: import("three").Mesh;
        mat: import("three").MeshStandardMaterial;
        edge: import("three").LineBasicMaterial;
        base: import("three").Vector3;
        dir: import("three").Vector3;
        spin: import("three").Euler;
      };
      const cubies: Cubie[] = [];
      let seed = 7;
      const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
      for (let x = -1; x <= 1; x++)
        for (let y = -1; y <= 1; y++)
          for (let z = -1; z <= 1; z++) {
            const n = Math.abs(x) + Math.abs(y) + Math.abs(z);
            const color = n === 3 ? ORANGE : n === 2 ? (rnd() > 0.55 ? PAPER : ORANGE) : DEEP;
            const mat = new THREE.MeshStandardMaterial({ color, roughness: 1, metalness: 0, transparent: true });
            const mesh = new THREE.Mesh(geo, mat);
            const edge = new THREE.LineBasicMaterial({ color: 0xff5c00, transparent: true });
            mesh.add(new THREE.LineSegments(edgeGeo, edge));
            group.add(mesh);
            const base = new THREE.Vector3(x, y, z);
            const dir = new THREE.Vector3(x + (rnd() - 0.5) * 0.8, y + (rnd() - 0.5) * 0.8, z + (rnd() - 0.5) * 0.8);
            if (dir.lengthSq() < 0.01) dir.set(0, 0.4, 0);
            const spin = new THREE.Euler((rnd() - 0.5) * 3, (rnd() - 0.5) * 3, (rnd() - 0.5) * 3);
            cubies.push({ mesh, mat, edge, base, dir, spin });
          }

      // Scroll progress (0..1) and pointer tilt, eased in the render loop.
      const state = { target: reduced ? 1 : 0, p: reduced ? 1 : 0, tx: 0, ty: 0, mx: 0, my: 0 };
      const st = reduced
        ? null
        : ScrollTrigger.create({
            trigger: el,
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
              state.target = self.progress;
            },
          });

      const onPointer = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        state.mx = (e.clientX / window.innerWidth - 0.5) * 0.5;
        state.my = (e.clientY / window.innerHeight - 0.5) * 0.35;
      };
      window.addEventListener("pointermove", onPointer);

      const size = () => {
        const w = wrap.clientWidth;
        const h = wrap.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        const wide = w >= 900;
        // The stage spans the whole screen; on wide screens the cube is drawn
        // in the right-hand part (beside the copy) by shifting the view.
        const room = wide ? Math.min(w * 0.58, h * 1.1) / h : w / h;
        const fit = 9.4 / (2 * Math.tan((camera.fov * Math.PI) / 360)) / Math.min(1, room);
        camera.position.set(0, 0, fit);
        // Narrow screens: cube sits in the upper part, above the copy.
        if (wide) camera.setViewOffset(w, h, -w * 0.2, 0, w, h);
        else camera.setViewOffset(w, h, 0, h * 0.16, w, h);
        camera.updateProjectionMatrix();
      };
      size();
      const ro = new ResizeObserver(size);
      ro.observe(wrap);

      const tmp = new THREE.Vector3();
      const qLocal = new THREE.Quaternion();
      const qTwist = new THREE.Quaternion();
      const qx = new THREE.Quaternion();
      const eul = new THREE.Euler();
      const grid = new THREE.Vector3();
      const AX = new THREE.Vector3(1, 0, 0);
      const AY = new THREE.Vector3(0, 1, 0);
      let lastStep = -1;
      let t0 = performance.now();

      const render = (now: number) => {
        const dt = Math.min(0.05, (now - t0) / 1000);
        t0 = now;
        state.p += (state.target - state.p) * Math.min(1, dt * 6);
        state.tx += (state.mx - state.tx) * Math.min(1, dt * 4);
        state.ty += (state.my - state.ty) * Math.min(1, dt * 4);
        const p = state.p;

        const solid = smooth(0.14, 0.28, p);
        const burst = smooth(0.22, 0.38, p) * (1 - smooth(0.58, 0.7, p));
        const twistY = smooth(0.68, 0.77, p) * (Math.PI / 2);
        const twistX = smooth(0.77, 0.86, p) * (Math.PI / 2);

        for (const c of cubies) {
          // Exploded position and tumble.
          tmp.copy(c.base).multiplyScalar(1 + 0.75 * burst).addScaledVector(c.dir, 0.9 * burst);
          qLocal.setFromEuler(eul.set(c.spin.x * burst, c.spin.y * burst, c.spin.z * burst));
          // Layer twists while reassembling: top layer about Y, then the right layer about X.
          qTwist.identity();
          if (c.base.y === 1) qTwist.setFromAxisAngle(AY, twistY);
          grid.copy(c.base).applyQuaternion(qTwist);
          if (Math.round(grid.x) === 1) {
            qx.setFromAxisAngle(AX, twistX);
            qTwist.premultiply(qx);
          }
          tmp.applyQuaternion(qTwist);
          c.mesh.position.copy(tmp);
          c.mesh.quaternion.copy(qTwist).multiply(qLocal);
          c.mat.opacity = solid;
          c.mat.depthWrite = solid > 0.95;
          c.mesh.visible = true;
          c.edge.opacity = 1 - smooth(0.26, 0.42, p) * 0.85;
        }

        const idle = reduced ? 0 : now / 1000;
        group.rotation.set(0.5 + state.ty + p * 0.3, -0.6 + idle * 0.12 + p * Math.PI * 1.25 + state.tx, 0);
        group.scale.setScalar(0.92 + smooth(0.84, 0.92, p) * 0.08);
        renderer.render(scene, camera);

        const s = p < 0.24 ? 0 : p < 0.64 ? 1 : 2;
        if (s !== lastStep) {
          lastStep = s;
          setStep(s);
        }
      };

      // Only animate while the section is on screen.
      let raf = 0;
      let running = false;
      const loop = (now: number) => {
        render(now);
        raf = requestAnimationFrame(loop);
      };
      const io = new IntersectionObserver(
        ([entry]) => {
          if (reduced) return;
          if (entry.isIntersecting && !running) {
            running = true;
            t0 = performance.now();
            raf = requestAnimationFrame(loop);
          } else if (!entry.isIntersecting && running) {
            running = false;
            cancelAnimationFrame(raf);
          }
        },
        { rootMargin: "100px" },
      );
      io.observe(el);
      render(performance.now());

      cleanup = () => {
        io.disconnect();
        ro.disconnect();
        cancelAnimationFrame(raf);
        st?.kill();
        window.removeEventListener("pointermove", onPointer);
        geo.dispose();
        edgeGeo.dispose();
        cubies.forEach((c) => {
          c.mat.dispose();
          c.edge.dispose();
        });
        renderer.dispose();
        renderer.domElement.remove();
      };
    };

    // Load three.js shortly before the section scrolls into view.
    const near = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          near.disconnect();
          boot();
        }
      },
      { rootMargin: "120% 0px" },
    );
    near.observe(el);

    return () => {
      disposed = true;
      near.disconnect();
      cleanup();
    };
  }, []);

  return (
    <section ref={root} className={`lp-proc is-${mode}`} aria-labelledby="proc-title">
      <div className="lp-proc-sticky">
        <div className="lp-wrap lp-proc-grid">
          <div className="lp-proc-copy">
            <p className="lp-label">(03) Process</p>
            <h2 id="proc-title" className="lp-proc-title">
              From sketch <br />
              to <span className="is-serif">ship.</span>
            </h2>
            <ol className="lp-proc-steps">
              {STEPS.map((s, i) => (
                <li key={s.k} className={`lp-proc-step ${i === step ? "is-on" : ""}`}>
                  <span className="lp-num">0{i + 1}</span>
                  <span className="lp-proc-k">{s.k}</span>
                  <span className="lp-proc-t">{s.t}</span>
                </li>
              ))}
            </ol>
            <div className="lp-proc-bar" aria-hidden>
              {STEPS.map((s, i) => (
                <span key={s.k} className={i <= step ? "is-on" : ""} />
              ))}
            </div>
          </div>
        </div>
        <div ref={stage} className="lp-proc-stage" aria-hidden />
      </div>
    </section>
  );
}
