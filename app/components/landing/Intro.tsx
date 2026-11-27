"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "./motion";

const NAME = "BINTANG";

/**
 * First-visit loader: a 000→100 counter and the name rising letter by letter,
 * then the curtain lifts into the hero. Skipped (before first paint, by the
 * inline script below) on repeat visits in a session and for reduced motion.
 */
export default function Intro() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const html = document.documentElement;
      if (html.classList.contains("intro-skip")) return;
      const el = root.current!;
      const count = el.querySelector<HTMLElement>(".lp-intro-count")!;
      const n = { v: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          html.classList.remove("intro-lock");
          html.classList.add("intro-done");
          try {
            sessionStorage.setItem("intro-seen", "1");
          } catch {}
          window.dispatchEvent(new Event("intro:done"));
        },
      });
      tl.from(el.querySelectorAll(".lp-intro-letter"), {
        yPercent: 110,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.05,
      })
        .to(n, {
          v: 100,
          duration: 1.3,
          ease: "power2.inOut",
          onUpdate: () => {
            count.textContent = String(Math.round(n.v)).padStart(3, "0");
          },
        }, 0)
        .to(el.querySelectorAll(".lp-intro-letter"), { yPercent: -110, duration: 0.6, ease: "power3.in", stagger: 0.03 }, 1.35)
        .to(el, { yPercent: -112, duration: 1, ease: "power4.inOut" }, 1.6)
        .set(el, { display: "none" });
    },
    { scope: root },
  );

  return (
    <>
      {/* Decide before first paint whether the loader runs at all. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `try{var h=document.documentElement;if(sessionStorage.getItem('intro-seen')||matchMedia('(prefers-reduced-motion: reduce)').matches){h.classList.add('intro-skip')}else{h.classList.add('intro-lock')}}catch(e){document.documentElement.classList.add('intro-skip')}`,
        }}
      />
      <div ref={root} className="lp-intro" aria-hidden>
        <div className="lp-intro-name">
          {NAME.split("").map((c, i) => (
            <span key={i} className="lp-intro-mask">
              <span className="lp-intro-letter">{c}</span>
            </span>
          ))}
        </div>
        <span className="lp-intro-label">Designer-Engineer · Portfolio 2026</span>
        <span className="lp-intro-count">000</span>
      </div>
    </>
  );
}
