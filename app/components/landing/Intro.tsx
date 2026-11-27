"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "./motion";

const NAME = "BINTANG";

// Project shots flicker through the card while the counter runs. Same files and
// sizes as the hero's floating tiles, so the browser downloads them only once.
const FRAMES = [
  "/murka/1 (1).png",
  "/jakarta_youth_festival/JYF1.png",
  "/jiwajiwa/KV Jiwa Jiwa 12.png",
  "/yayasan_bumn/2.png",
  "/tedx_sampoerna/Design Porto 21.png",
  "/gdsc/Design Porto 24.png",
];

/**
 * First-visit loader. "BINTANG" rises behind a card that flicks through the
 * work while a counter runs to 100; the card lands on the orange portrait card
 * exactly where the hero's card sits, then the dark curtain splits open around
 * it and hands over to the hero. Skipped (before first paint, by the inline
 * script below) on repeat visits in a session and for reduced motion.
 */
export default function Intro() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const html = document.documentElement;
      if (html.classList.contains("intro-skip")) return;
      const el = root.current!;
      const q = (s: string) => el.querySelectorAll<HTMLElement>(s);
      const count = el.querySelector<HTMLElement>(".lp-intro-count")!;
      const bar = el.querySelector<HTMLElement>(".lp-intro-bar")!;
      const frames = Array.from(q(".lp-intro-frame"));
      const n = { v: 0 };

      const finish = () => {
        html.classList.remove("intro-lock");
        html.classList.add("intro-done");
        try {
          sessionStorage.setItem("intro-seen", "1");
        } catch {}
      };

      const tl = gsap.timeline({ onComplete: finish });
      tl.from(q(".lp-intro-letter"), { yPercent: 120, duration: 1, ease: "power4.out", stagger: 0.045 }, 0)
        .from(q(".lp-intro-meta"), { opacity: 0, y: 10, duration: 0.6, stagger: 0.05 }, 0.2)
        .fromTo(
          el.querySelector(".lp-intro-card"),
          { clipPath: "inset(100% 0% 0% 0% round 22px)" },
          { clipPath: "inset(0% 0% 0% 0% round 22px)", duration: 0.9, ease: "power4.inOut" },
          0.25,
        )
        .to(n, {
          v: 100,
          duration: 1.85,
          ease: "power2.inOut",
          onUpdate: () => {
            count.textContent = String(Math.round(n.v)).padStart(3, "0");
            bar.style.transform = `scaleX(${n.v / 100})`;
          },
        }, 0.1);

      // Flick through the work, then settle on the portrait card.
      frames.forEach((f, i) => {
        tl.set(f, { autoAlpha: 1 }, 0.45 + i * 0.2);
      });

      tl.to(q(".lp-intro-letter"), { yPercent: -120, duration: 0.6, ease: "power3.in", stagger: 0.03 }, 2.05)
        .to(q(".lp-intro-meta, .lp-intro-count, .lp-intro-track"), { opacity: 0, duration: 0.3 }, 2.1)
        .call(() => {
          window.dispatchEvent(new Event("intro:done"));
        }, [], 2.35)
        .to(el.querySelector(".lp-intro-top"), { yPercent: -100, duration: 1.05, ease: "power4.inOut" }, 2.35)
        .to(el.querySelector(".lp-intro-bot"), { yPercent: 100, duration: 1.05, ease: "power4.inOut" }, 2.35)
        // The hero's own card is now directly underneath; dissolve into it.
        .to(el.querySelector(".lp-intro-card"), { autoAlpha: 0, duration: 0.35 }, 3.15)
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
        <div className="lp-intro-panel lp-intro-top lp-grain-light" />
        <div className="lp-intro-panel lp-intro-bot lp-grain-light" />

        <div className="lp-intro-name">
          {NAME.split("").map((c, i) => (
            <span key={i} className="lp-intro-mask">
              <span className="lp-intro-letter">{c}</span>
            </span>
          ))}
        </div>

        <div className="lp-intro-card">
          {FRAMES.map((src) => (
            <div key={src} className="lp-intro-frame">
              <Image src={src} alt="" fill sizes="16vw" className="object-cover" />
            </div>
          ))}
          <div className="lp-intro-frame is-portrait">
            <Image src="/DSC06399 1.png" alt="" width={1737} height={2368} sizes="(max-width: 768px) 100vw, 60vw" />
          </div>
        </div>

        <span className="lp-intro-meta is-tl">Anandhiya.com</span>
        <span className="lp-intro-meta is-tr">Jakarta, ID</span>
        <span className="lp-intro-meta is-bl">Designer-Engineer · Portfolio ’26</span>
        <span className="lp-intro-count">000</span>
        <span className="lp-intro-track">
          <span className="lp-intro-bar" />
        </span>
      </div>
    </>
  );
}
