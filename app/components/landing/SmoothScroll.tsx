"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./motion";

/**
 * Inertial smooth scrolling (Lenis) driven by GSAP's ticker so ScrollTrigger
 * scrubs stay in lockstep. Off for prefers-reduced-motion.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, anchors: { offset: -64 } });
    const w = window as unknown as { __lenis?: Lenis };
    w.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    // Hold still while the intro curtain is down.
    const html = document.documentElement;
    const resume = () => lenis.start();
    if (html.classList.contains("intro-lock")) {
      lenis.stop();
      window.addEventListener("intro:done", resume, { once: true });
    }
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Layout settles as fonts and images arrive; re-measure pins.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("load", refresh);
      window.removeEventListener("intro:done", resume);
      lenis.destroy();
      delete w.__lenis;
    };
  }, []);
  return null;
}
