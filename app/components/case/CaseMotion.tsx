"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "../landing/motion";

/** Scroll reveals and image parallax for the case study and work index pages. */
export default function CaseMotion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const el = root.current!;
        gsap.from(el.querySelectorAll(".cs-title .lp-mask > span"), {
          yPercent: 140,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.08,
          delay: 0.1,
        });
        gsap.utils.toArray<HTMLElement>(".cs-rv", el).forEach((n) => {
          gsap.from(n, {
            y: 48,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: n, start: "top 88%" },
          });
        });
        gsap.utils.toArray<HTMLElement>(".cs-par", el).forEach((n) => {
          gsap.fromTo(
            n,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: "none",
              scrollTrigger: { trigger: n.parentElement, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
      });
      // Reveal tweens have now hidden what they animate in; show the page.
      document.documentElement.classList.remove("cs-wait");
    },
    { scope: root },
  );

  return (
    <div ref={root} className="cs-motion">
      {/* Hold the page from first paint until its reveals are set up, so
          nothing shows, vanishes and reappears. */}
      <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add('cs-wait')` }} />
      {children}
    </div>
  );
}
