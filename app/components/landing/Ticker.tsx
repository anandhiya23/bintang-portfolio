"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "./motion";

const ROW_A = ["Make it make sense", "Design", "Logic", "Branding", "Engineering"];
const ROW_B = ["Community", "Movement", "Systems", "Programming", "No hand-off gaps"];

function Row({ items, outline }: { items: string[]; outline?: boolean }) {
  const seq = (
    <span className="lp-tick-seq">
      {items.map((t) => (
        <span key={t} className={outline ? "is-outline" : ""}>
          {t}
          <svg viewBox="0 0 24 24" width="0.6em" height="0.6em" aria-hidden className="lp-tick-star">
            <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" fill="currentColor" />
          </svg>
        </span>
      ))}
    </span>
  );
  return (
    <div className="lp-tick-row">
      <div className="lp-tick-track">
        {seq}
        {seq}
      </div>
    </div>
  );
}

/** Two counter-running bands whose speed and direction follow the scroll. */
export default function Ticker() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tracks = gsap.utils.toArray<HTMLElement>(".lp-tick-track", root.current);
        const loops = tracks.map((t, i) =>
          gsap.fromTo(t, { xPercent: i % 2 ? -50 : 0 }, { xPercent: i % 2 ? 0 : -50, duration: 38, ease: "none", repeat: -1 }),
        );
        // Scroll velocity kicks the bands; they ease back to cruising speed.
        let dir = 1;
        let boost = 1;
        const st = ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            dir = self.direction;
            boost = Math.max(boost, 1 + Math.min(7, Math.abs(self.getVelocity()) / 350));
          },
        });
        const tick = () => {
          boost += (1 - boost) * 0.06;
          loops.forEach((l) => l.timeScale(dir * boost));
        };
        gsap.ticker.add(tick);
        gsap.fromTo(root.current, { rotate: -4 }, {
          rotate: -1.5,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        });
        return () => {
          st.kill();
          gsap.ticker.remove(tick);
        };
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="lp-tick" aria-hidden>
      <Row items={ROW_A} />
      <Row items={ROW_B} outline />
    </div>
  );
}
