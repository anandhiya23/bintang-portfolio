"use client";

import { useEffect, useRef } from "react";
import { siteConfig, socialLinks } from "@/lib/data";

/**
 * Footer that sits fixed beneath the page; the page lifts away to reveal it.
 * Its measured height is written to --lp-footer-h so <main> leaves room.
 */
export default function RevealFooter() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const set = () => document.documentElement.style.setProperty("--lp-footer-h", `${el.offsetHeight}px`);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const toTop = (e: React.MouseEvent) => {
    e.preventDefault();
    const lenis = (window as unknown as { __lenis?: { scrollTo: (y: number, o?: object) => void } }).__lenis;
    if (lenis) lenis.scrollTo(0, { duration: 2 });
    else window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <footer ref={ref} className="lp-foot">
      <div className="lp-wrap lp-foot-top">
        <p className="lp-foot-line">
          Okay, that’s enough scrolling.
          <br />
          <em>Thanks for stopping by.</em>
        </p>
        <nav className="lp-foot-links" aria-label="Social">
          {socialLinks.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label}
            </a>
          ))}
          <a href="#home" onClick={toTop}>
            Back to top ↑
          </a>
        </nav>
      </div>
      <p className="lp-foot-mark" aria-hidden>
        Bintang
      </p>
      <div className="lp-wrap lp-foot-bottom">
        <span>{siteConfig.copyright}</span>
        <span>Designed &amp; built by hand in Jakarta</span>
      </div>
    </footer>
  );
}
