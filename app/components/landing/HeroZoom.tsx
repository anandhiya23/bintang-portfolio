"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "./motion";

/**
 * Pinned hero. "BUILDING / BRIDGES" frame a small orange card holding the
 * portrait; scrolling splits the words apart while the card grows to fill
 * the screen, then the statement rises over it.
 */
export default function HeroZoom() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const el = root.current!;
        const pin = el.querySelector<HTMLElement>(".lp-hero-pin")!;
        const media = el.querySelector<HTMLElement>(".lp-hero-media")!;
        const portrait = el.querySelector<HTMLElement>(".lp-hero-portrait")!;

        // Card geometry, recomputed on every refresh.
        const card = () => {
          const W = pin.clientWidth;
          const H = pin.clientHeight;
          const w = Math.min(340, Math.max(150, W * (W < 768 ? 0.4 : 0.22)));
          const h = w * 1.28;
          // Centred 2rem below the middle, clear of the fixed header.
          const t = (H - h) / 2 + 32;
          return { W, H, w, h, t, b: H - t - h, l: (W - w) / 2 };
        };
        const clipFrom = () => {
          const c = card();
          return `inset(${c.t}px ${c.l}px ${c.b}px ${c.l}px round 22px)`;
        };
        // Portrait fills the card at the start, the screen at the end.
        const scaleFrom = () => {
          const c = card();
          return (c.h * 0.96) / portrait.offsetHeight;
        };
        const yFrom = () => {
          const c = card();
          return -(c.H - (c.t + c.h));
        };

        gsap.set(media, { clipPath: clipFrom });
        gsap.set(portrait, { scale: scaleFrom, y: yFrom, transformOrigin: "50% 100%" });

        // Entry (after the loader if it runs).
        const intro = gsap.timeline({ paused: true });
        intro
          .from(el.querySelectorAll(".lp-hero-word"), { yPercent: 110, duration: 1.2, ease: "power4.out", stagger: 0.08 })
          .from(media, { clipPath: () => {
            const c = card();
            const my = c.t + c.h / 2;
            return `inset(${my}px ${c.W / 2}px ${c.H - my}px ${c.W / 2}px round 22px)`;
          }, duration: 1.2, ease: "power4.inOut" }, 0.15)
          .from(el.querySelectorAll(".lp-hero-fade"), { opacity: 0, y: 12, duration: 0.8, stagger: 0.06 }, 0.6);
        const play = () => intro.play();
        if (document.documentElement.classList.contains("intro-lock")) {
          window.addEventListener("intro:done", play, { once: true });
          gsap.delayedCall(1.55, play); // start as the curtain lifts
        } else play();

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: () => `+=${window.innerHeight * 1.6}`,
            pin,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        tl.fromTo(media, { clipPath: clipFrom }, { clipPath: "inset(0px 0px 0px 0px round 0px)", duration: 0.55, ease: "power2.inOut" }, 0)
          .fromTo(portrait, { scale: scaleFrom, y: yFrom }, { scale: 1, y: 0, duration: 0.55, ease: "power2.inOut" }, 0)
          .to(el.querySelector(".lp-hero-l1"), { xPercent: -45, duration: 0.55 }, 0)
          .to(el.querySelector(".lp-hero-l2"), { xPercent: 45, duration: 0.55 }, 0)
          .to(el.querySelectorAll(".lp-hero-fade"), { opacity: 0, duration: 0.15 }, 0)
          .to(el.querySelector(".lp-hero-shade"), { opacity: 0.9, duration: 0.25 }, 0.5)
          .to(portrait, { scale: 1.08, duration: 0.45 }, 0.55)
          .set(el.querySelector(".lp-hero-statement"), { opacity: 1 }, 0.6)
          .fromTo(
            el.querySelectorAll(".lp-hero-say"),
            { yPercent: 115 },
            { yPercent: 0, duration: 0.18, stagger: 0.04, ease: "power3.out" },
            0.62,
          )
          .to({}, { duration: 0.12 });

        return () => {
          window.removeEventListener("intro:done", play);
        };
      });
    },
    { scope: root },
  );

  const say = ["between", "design", "&", "logic."];

  return (
    <section id="home" ref={root} className="lp-hero" aria-labelledby="hero-title">
      <h1 id="hero-title" className="sr-only">
        Bintang Anandhiya, designer-engineer: building bridges between design and logic.
      </h1>
      <div className="lp-hero-pin">
        <p className="lp-hero-kicker lp-hero-fade" aria-hidden>
          <span>(Independent)</span> Designer-Engineer
        </p>
        <p className="lp-hero-status lp-hero-fade" aria-hidden>
          <span className="lp-dot" /> Open to opportunities
        </p>

        <div className="lp-hero-line lp-hero-l1" aria-hidden>
          <span className="lp-mask">
            <span className="lp-hero-word">Building</span>
          </span>
        </div>

        <div className="lp-hero-media">
          <Image
            src="/DSC06399 1.png"
            alt=""
            width={1737}
            height={2368}
            preload
            sizes="(max-width: 768px) 100vw, 60vw"
            className="lp-hero-portrait"
          />
          <div className="lp-hero-shade" />
          <p className="lp-hero-statement" aria-hidden>
            {say.map((w, i) => (
              <span key={i} className="lp-mask">
                <span className={`lp-hero-say ${i === 1 || i === 3 ? "is-serif" : ""}`}>{w}</span>
              </span>
            ))}
          </p>
        </div>

        <div className="lp-hero-line lp-hero-l2" aria-hidden>
          <span className="lp-mask">
            <span className="lp-hero-word">Bridges</span>
          </span>
        </div>

        <p className="lp-hero-tag" aria-hidden>
          between <em>design</em> &amp; <em>logic.</em>
        </p>

        <div className="lp-hero-foot lp-hero-fade" aria-hidden>
          <span>Jakarta, ID</span>
          <span className="lp-hero-scrollcue">
            Scroll <span className="lp-hero-scrollbar" />
          </span>
          <span>Portfolio ’26</span>
        </div>
      </div>
    </section>
  );
}
