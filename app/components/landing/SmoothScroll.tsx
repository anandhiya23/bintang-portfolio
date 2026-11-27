"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./motion";

/**
 * Inertial smooth scrolling (Lenis) driven by GSAP's ticker so ScrollTrigger
 * scrubs stay in lockstep. Off for prefers-reduced-motion.
 */
export default function SmoothScroll() {
  const pathname = usePathname();

  // Every new page (including project → next project, which reuses this
  // component) starts at its top.
  useEffect(() => {
    if (location.hash) return;
    const w = window as unknown as { __lenis?: Lenis };
    window.scrollTo(0, 0);
    w.__lenis?.scrollTo(0, { immediate: true, force: true });
    ScrollTrigger.refresh();
  }, [pathname]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Pages here are built around pinned, scroll-driven sections, so always
    // open a page at its top (unless a #section is asked for) instead of
    // restoring an old scroll position.
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
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
