"use client";

import { useRef } from "react";
import { values } from "@/lib/data";
import { gsap, MOTION_OK, useGSAP } from "./motion";

const LINES = ["Every layer, load-bearing.", "Nothing for its own sake.", "One owner, end to end."];

const ICONS = [
  <g key="a">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </g>,
  <polyline key="b" points="22 12 18 12 15 21 9 3 6 12 2 12" />,
  <g key="c">
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </g>,
];

/**
 * How I work: three sticky cards that stack as you scroll. Each card sinks
 * and dims as the next one slides over it.
 */
export default function Stack() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const cards = gsap.utils.toArray<HTMLElement>(".lp-stack-card", root.current);
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          gsap.to(card, {
            scale: 0.9,
            ease: "none",
            scrollTrigger: { trigger: next, start: "top bottom", end: "top 20%", scrub: true },
          });
          gsap.to(card.querySelector(".lp-stack-dim"), {
            opacity: 0.4,
            ease: "none",
            scrollTrigger: { trigger: next, start: "top bottom", end: "top 20%", scrub: true },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="lp-stack" aria-labelledby="stack-title">
      <div className="lp-wrap">
        <div className="lp-label-row">
          <p className="lp-label">(04) How I work</p>
          <h2 id="stack-title" className="lp-label lp-label-r">This is my thing</h2>
        </div>
        <ol className="lp-stack-list">
          {values.map((v, i) => (
            <li key={v.title} className={`lp-stack-card lp-stack-${i}`} style={{ "--i": i } as React.CSSProperties}>
              <div className="lp-stack-top">
                <span className="lp-num">0{i + 1} / 03</span>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden>
                  {ICONS[i]}
                </svg>
              </div>
              <h3 className="lp-stack-title">{v.title}</h3>
              <div className="lp-stack-bottom">
                <p className="lp-stack-line">{LINES[i]}</p>
                <p className="lp-stack-body">{v.body}</p>
              </div>
              <span className="lp-stack-dim" aria-hidden />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
