"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { siteConfig, values } from "@/lib/data";
import { useReducedMotion } from "./useReducedMotion";

const icons: Record<string, React.ReactNode> = {
  "Precision Engineering": (
    <>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </>
  ),
  "Data-Driven Logic": <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />,
  "Hybrid Execution": (
    <>
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </>
  ),
};

export default function Values() {
  const reduced = useReducedMotion();
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const words = siteConfig.philosophy.split(" ");

  // Words ink in as the statement scrolls through the viewport.
  useEffect(() => {
    const el = quoteRef.current;
    if (!el) return;
    if (reduced) {
      el.style.setProperty("--p", "1");
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = (vh * 0.85 - r.top) / (r.height + vh * 0.35);
      el.style.setProperty("--p", Math.min(1, Math.max(0, p)).toFixed(3));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  return (
    <section id="about" className="about section-pad" aria-labelledby="about-title">
      <div className="max-w-7xl mx-auto about-grid">
        <div className="about-portrait-col" data-reveal>
          <figure className="about-portrait">
            <Image
              src="/DSC06399 1.png"
              alt="Portrait of Bintang Anandhiya"
              width={1737}
              height={2368}
              sizes="(min-width: 1024px) 34vw, (min-width: 640px) 60vw, 90vw"
              className="w-full h-auto block"
            />
            <figcaption>
              <span>Bintang Anandhiya</span>
              <span>Designer-Engineer</span>
            </figcaption>
          </figure>
        </div>

        <div className="about-body">
          <p className="eyebrow">About</p>
          <h2 id="about-title" className="section-title" data-reveal>
            The <em>Designer-Engineer</em>
          </h2>
          <p
            ref={quoteRef}
            className="about-quote"
            style={{ "--n": words.length } as React.CSSProperties}
          >
            {words.map((w, i) => (
              <span key={i} style={{ "--i": i } as React.CSSProperties}>
                {w}{" "}
              </span>
            ))}
          </p>

          <ol className="values">
            {values.map((v, i) => (
              <li key={v.title} className="value" data-reveal style={{ "--d": `${i * 90}ms` } as React.CSSProperties}>
                <div className="value-top">
                  <span className="value-num">0{i + 1}</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" aria-hidden>
                    {icons[v.title]}
                  </svg>
                </div>
                <h3 className="value-title">{v.title}</h3>
                <p className="value-body">{v.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
