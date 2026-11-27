"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import BridgeField from "./hero/BridgeField";
import HeroCopy, { ROLL_WORDS } from "./hero/HeroCopy";
import { createSignal, type HeroSignal } from "./hero/signal";
import { useReducedMotion } from "./useReducedMotion";

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const headerH = (document.querySelector("header > div") as HTMLElement | null)?.offsetHeight ?? 0;
  const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - headerH, behavior: smooth ? "smooth" : "auto" });
};

function useJakartaClock() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Jakarta",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

export default function Hero() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const signal = useRef<HeroSignal>(createSignal());
  const [word, setWord] = useState({ i: 0, prev: -1 });
  const [inspect, setInspect] = useState(false);
  const [webgl, setWebgl] = useState(true);
  const inspectRef = useRef(false);
  const time = useJakartaClock();

  useEffect(() => {
    inspectRef.current = inspect;
  }, [inspect]);

  // Rolling word: design & programming / engineering / community / movement.
  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setWord((w) => ({ i: (w.i + 1) % ROLL_WORDS.length, prev: w.i }));
    }, 2400);
    return () => window.clearInterval(id);
  }, [reduced]);

  // Pointer, lens and scroll loop.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const s = signal.current;

    let W = section.clientWidth;
    let H = section.clientHeight;
    const lensBase = () => (W < 768 ? 88 : Math.min(150, Math.max(110, W * 0.085)));

    // Pointer target (raw) vs. eased lens.
    let tx = W * 0.3;
    let ty = H * 0.4;
    let lx = tx;
    let ly = ty;
    let lr = 0;
    let targetR = 0;
    let lastPx = 0;
    let lastPy = 0;
    let touched = false;
    let releaseT = 0;
    const t0 = performance.now();

    const local = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    const onMove = (e: PointerEvent) => {
      const p = local(e);
      tx = p.x;
      ty = p.y;
      s.px = p.x;
      s.py = p.y;
      if (e.pointerType === "mouse" || e.pointerType === "pen") {
        s.active = true;
        touched = true;
        targetR = lensBase();
      }
      s.dirty = true;
    };
    const onDown = (e: PointerEvent) => {
      const p = local(e);
      tx = p.x;
      ty = p.y;
      s.px = p.x;
      s.py = p.y;
      touched = true;
      s.active = true;
      targetR = lensBase();
      window.clearTimeout(releaseT);
      if (!reduced && e.button === 0) s.pulses.push({ x: p.x, y: p.y, t: performance.now() });
      s.dirty = true;
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerType !== "touch") return;
      releaseT = window.setTimeout(() => {
        s.active = false;
        targetR = 0;
      }, 650);
    };
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      s.active = false;
      targetR = 0;
      s.dirty = true;
    };

    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerdown", onDown);
    section.addEventListener("pointerup", onUp);
    section.addEventListener("pointercancel", onUp);
    section.addEventListener("pointerleave", onLeave);

    const onScroll = () => {
      const r = section.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / r.height));
      s.scroll = reduced ? 0 : p;
      section.style.setProperty("--sp", (reduced ? 0 : p).toFixed(4));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const ro = new ResizeObserver(() => {
      W = section.clientWidth;
      H = section.clientHeight;
    });
    ro.observe(section);

    // Self-demo: once the intro settles, the lens glides across the headline
    // so visitors discover it even before they move the pointer.
    const demo = (now: number) => {
      const el0 = section.querySelector(".hero-copy:not(.bp) .hero-word");
      const el1 = section.querySelector(".hero-copy:not(.bp) .hero-accent");
      if (!el0 || !el1) return null;
      const sr = section.getBoundingClientRect();
      const a = el0.getBoundingClientRect();
      const b = el1.getBoundingClientRect();
      const t = (now - t0 - 2300) / 2200;
      if (t < 0 || t > 1) return null;
      const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      return {
        x: a.left + a.width / 2 - sr.left + (b.left + b.width / 2 - (a.left + a.width / 2)) * e,
        y: a.top + a.height / 2 - sr.top + (b.top + b.height / 2 - (a.top + a.height / 2)) * e,
        r: Math.sin(Math.PI * t) * lensBase(),
      };
    };

    let raf = 0;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      let goalR = targetR;
      if (inspectRef.current) goalR = Math.hypot(W, H);
      if (!touched && !inspectRef.current && !reduced) {
        const d = demo(now);
        if (d) {
          tx = d.x;
          ty = d.y;
          goalR = d.r;
        }
      }
      const ease = reduced ? 1 : 0.2;
      lx += (tx - lx) * ease;
      ly += (ty - ly) * ease;
      lr += (goalR - lr) * (reduced ? 1 : inspectRef.current ? 0.09 : 0.16);
      if (Math.abs(goalR - lr) < 0.3) lr = goalR;

      s.pvx = s.pvx * 0.7 + (s.px - lastPx) * 0.3;
      s.pvy = s.pvy * 0.7 + (s.py - lastPy) * 0.3;
      lastPx = s.px;
      lastPy = s.py;

      if (s.lx !== lx || s.ly !== ly || s.lr !== lr) s.dirty = true;
      s.lx = lx;
      s.ly = ly;
      s.lr = lr;
      section.style.setProperty("--lx", `${lx.toFixed(1)}px`);
      section.style.setProperty("--ly", `${ly.toFixed(1)}px`);
      section.style.setProperty("--lr", `${lr.toFixed(1)}px`);
      section.dataset.lens = lr > 1 ? "on" : "off";
      const coords = section.querySelector<HTMLElement>(".lens-coords");
      if (coords && lr > 1) coords.textContent = `x ${Math.round(lx)}  y ${Math.round(ly)}`;
    };

    // Only animate while the hero is on screen.
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      raf = e.isIntersecting ? requestAnimationFrame(loop) : 0;
    });
    io.observe(section);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.clearTimeout(releaseT);
      window.removeEventListener("scroll", onScroll);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerdown", onDown);
      section.removeEventListener("pointerup", onUp);
      section.removeEventListener("pointercancel", onUp);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  // Keyboard: "I" toggles inspect mode, Escape leaves it.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, select, [contenteditable='true']")) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "i" || e.key === "I") {
        const r = sectionRef.current?.getBoundingClientRect();
        if (r && r.bottom > 0) setInspect((v) => !v);
      } else if (e.key === "Escape") setInspect(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const onUnsupported = useCallback(() => setWebgl(false), []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className={`hero ${reduced ? "is-reduced" : ""} ${inspect ? "is-inspect" : ""}`}
      aria-label="Introduction"
    >
      {/* Logic lens: dark blueprint backdrop, clipped to a circle. */}
      <div className="lens-bg" aria-hidden />

      {webgl ? (
        <BridgeField key={reduced ? "static" : "live"} signal={signal} reduced={reduced} onUnsupported={onUnsupported} />
      ) : (
        <div className="hero-bridge-fallback" aria-hidden />
      )}

      {/* The real page, with a hole where the lens is. */}
      <div className="hero-layer hero-layer-design">
        <div className="hero-inner">
          <HeroCopy variant="design" wordIndex={word.i} prevIndex={word.prev} onNavigate={scrollToId} />
        </div>
      </div>

      {/* The x-ray: same layout, rendered as a design-tool inspector. */}
      <div className="hero-layer hero-layer-bp" aria-hidden>
        <div className="hero-inner">
          <HeroCopy variant="blueprint" wordIndex={word.i} prevIndex={word.prev} />
        </div>
        <div className="lens-cross" />
        <div className="lens-coords" />
      </div>

      <div className="hero-chrome">
        <a
          href="#work"
          className="hero-scroll"
          onClick={(e) => {
            e.preventDefault();
            scrollToId("work");
          }}
        >
          <span className="hero-scroll-line" aria-hidden />
          Scroll
        </a>
        <p className="hero-hint" aria-hidden>
          <span className="hint-fine">Move to inspect the build · click to send a ripple</span>
          <span className="hint-coarse">Touch and drag to inspect the build</span>
        </p>
        <div className="hero-chrome-right">
          <span className="hero-clock" aria-label={time ? `Jakarta time ${time}` : undefined}>
            JKT {time ?? "--:--:--"}
          </span>
          <button
            type="button"
            className="hero-inspect"
            aria-pressed={inspect}
            onClick={() => setInspect((v) => !v)}
          >
            <span aria-hidden className="hero-inspect-key">I</span>
            {inspect ? "Exit inspect" : "Inspect"}
          </button>
        </div>
      </div>
    </section>
  );
}
