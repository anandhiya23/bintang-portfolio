"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "./motion";

/**
 * First-visit opening, kept to one idea: on the hero's own off-white ground a
 * thin orange line draws across the centre, opens into the portrait card, and
 * the hero then assembles around it (the card sits exactly where the hero's
 * card is, so nothing jumps). Skipped (before first paint, by the inline script
 * below) on repeat visits in a session and for reduced motion.
 */
export default function Intro() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const html = document.documentElement;
      // Only on a real first load: arriving here through an in-site link never
      // ran the inline script below, so there is no intro-lock and nothing to play.
      if (!html.classList.contains("intro-lock")) return;
      const el = root.current!;
      const card = el.querySelector<HTMLElement>(".lp-intro-card")!;
      const w = card.offsetWidth;
      const mid = card.offsetHeight / 2 - 1;

      const tl = gsap.timeline({
        onComplete: () => {
          html.classList.remove("intro-lock");
          html.classList.add("intro-done");
          try {
            sessionStorage.setItem("intro-seen", "1");
          } catch {}
        },
      });
      tl.fromTo(
        card,
        { clipPath: `inset(${mid}px ${w / 2}px ${mid}px ${w / 2}px round 0px)` },
        { clipPath: `inset(${mid}px 0px ${mid}px 0px round 0px)`, duration: 0.7, ease: "power3.inOut" },
        0.15,
      )
        // Explicit start: the browser shortens a read-back inset() to two values,
        // which would pair up wrongly with a four-value end.
        .fromTo(
          card,
          { clipPath: `inset(${mid}px 0px ${mid}px 0px round 0px)` },
          { clipPath: "inset(0px 0px 0px 0px round 22px)", duration: 0.85, ease: "power4.inOut", immediateRender: false },
          0.8,
        )
        .from(el.querySelector(".lp-intro-portrait"), { yPercent: 18, opacity: 0, duration: 0.9, ease: "power3.out" }, 1.15)
        .call(() => {
          window.dispatchEvent(new Event("intro:done"));
        }, [], 1.55)
        .to(el.querySelector(".lp-intro-bg"), { opacity: 0, duration: 0.5, ease: "power1.out" }, 1.55)
        .set(el, { display: "none" }, 2.15);
    },
    { scope: root },
  );

  return (
    <>
      {/* Before first paint: hold the hero until its entry animation is set up
          (so it never shows, vanishes and reappears), and decide whether the
          opening runs at all. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `try{var h=document.documentElement;h.classList.add('hero-wait');if(sessionStorage.getItem('intro-seen')||matchMedia('(prefers-reduced-motion: reduce)').matches){h.classList.add('intro-skip')}else{h.classList.add('intro-lock','hero-hold')}}catch(e){document.documentElement.classList.add('intro-skip')}`,
        }}
      />
      <div ref={root} className="lp-intro" aria-hidden>
        <div className="lp-intro-bg lp-grain-dark" />
        <div className="lp-intro-card">
          <Image
            src="/DSC06399 1.png"
            alt=""
            width={1737}
            height={2368}
            sizes="(max-width: 768px) 100vw, 60vw"
            className="lp-intro-portrait"
          />
        </div>
      </div>
    </>
  );
}
