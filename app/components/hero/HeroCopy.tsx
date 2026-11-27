"use client";

import { useEffect, useRef } from "react";

export const ROLL_WORDS = ["programming.", "engineering.", "community.", "movement."];

type Props = {
  /** "design" is the real, interactive page. "blueprint" is the x-ray copy seen through the lens. */
  variant: "design" | "blueprint";
  wordIndex: number;
  prevIndex: number;
  onNavigate?: (id: string) => void;
};

/**
 * The hero's text. Rendered twice with identical layout: once as the real
 * page, once as a wireframe "inspector" view revealed inside the logic lens.
 */
export default function HeroCopy({ variant, wordIndex, prevIndex, onNavigate }: Props) {
  const bp = variant === "blueprint";
  const rootRef = useRef<HTMLDivElement>(null);

  // Blueprint: show live element dimensions next to each annotation.
  useEffect(() => {
    if (!bp || !rootRef.current) return;
    const els = Array.from(rootRef.current.querySelectorAll<HTMLElement>("[data-bp]"));
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        const el = e.target as HTMLElement;
        const r = el.getBoundingClientRect();
        el.dataset.size = `${Math.round(r.width)} × ${Math.round(r.height)}`;
      }
    });
    els.forEach((el) => ro.observe(el));
    return () => ro.disconnect();
  }, [bp]);

  const go = (id: string) => (e: React.MouseEvent) => {
    if (!onNavigate) return;
    e.preventDefault();
    onNavigate(id);
  };

  return (
    <div ref={rootRef} className={`hero-copy ${bp ? "bp" : ""}`} aria-hidden={bp || undefined}>
      <div className="hero-eyebrow reveal-line" style={{ "--d": "0ms" } as React.CSSProperties}>
        <span className="hero-badge" data-bp="badge">
          <span className="hero-badge-dot" />
          Open to opportunities
        </span>
        <span className="hero-eyebrow-meta" data-bp="meta">Designer-Engineer · Jakarta, ID</span>
      </div>

      <h1 className="hero-title" data-bp="h1 · Playfair Display Italic">
        {!bp && (
          <span className="sr-only">
            Building bridges between design &amp; {ROLL_WORDS.map((w) => w.replace(".", "")).join(", ")}.
          </span>
        )}
        <span aria-hidden className="hero-line">
          <span className="reveal-line" style={{ "--d": "120ms" } as React.CSSProperties}>
            Building <span className="hero-word" data-bp="bridges">bridges</span>
          </span>
        </span>
        <span aria-hidden className="hero-line">
          <span className="reveal-line" style={{ "--d": "220ms" } as React.CSSProperties}>
            between <span className="hero-word hero-accent" data-bp="design">design</span>
          </span>
        </span>
        <span aria-hidden className="hero-line">
          <span className="reveal-line" style={{ "--d": "320ms" } as React.CSSProperties}>
            &amp;{" "}
            <span className="hero-roll" data-bp="logic">
              {ROLL_WORDS.map((w, i) => (
                <span
                  key={w}
                  className={i === wordIndex ? "is-on" : i === prevIndex ? "is-out" : ""}
                >
                  {w}
                </span>
              ))}
            </span>
          </span>
        </span>
      </h1>

      <div className="hero-foot">
        <p className="hero-lede reveal-line" style={{ "--d": "460ms" } as React.CSSProperties} data-bp="p · Inter 400">
          I design brands and interfaces, then engineer the systems underneath them, so nothing gets lost in
          the hand-off.
        </p>
        <div className="hero-ctas reveal-line" style={{ "--d": "560ms" } as React.CSSProperties}>
          <a href="#work" onClick={go("work")} className="btn-solid" tabIndex={bp ? -1 : undefined} data-bp="a.btn">
            <span>View work</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
          <a href="#about" onClick={go("about")} className="btn-ghost" tabIndex={bp ? -1 : undefined} data-bp="a.link">
            The methodology
          </a>
        </div>
      </div>
    </div>
  );
}
