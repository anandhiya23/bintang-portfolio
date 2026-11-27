"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/lib/data";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Work index. On fine pointers, hovering a row floats a preview of the
 * project that trails the cursor; on touch, each row carries a thumbnail.
 */
export default function FeaturedWork() {
  const reduced = useReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  // Preview images load only once someone actually hovers the list.
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const list = listRef.current;
    const preview = previewRef.current;
    if (!list || !preview) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let x = 0;
    let y = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;
    let running = false;

    const loop = () => {
      const k = reduced ? 1 : 0.14;
      const dx = x - cx;
      cx += dx * k;
      cy += (y - cy) * k;
      const tilt = reduced ? 0 : Math.max(-8, Math.min(8, dx * 0.04));
      preview.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%) rotate(${tilt}deg)`;
      if (Math.abs(x - cx) + Math.abs(y - cy) > 0.3) raf = requestAnimationFrame(loop);
      else running = false;
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!running) {
        if (cx === 0 && cy === 0) {
          cx = x;
          cy = y;
        }
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };
    list.addEventListener("pointermove", onMove);
    return () => {
      list.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <section id="work" className="work section-pad" aria-labelledby="work-title">
      <div className="max-w-7xl mx-auto">
        <div className="section-head">
          <p className="eyebrow">Selected work</p>
          <h2 id="work-title" className="section-title" data-reveal>
            Brands, campaigns <br className="hidden sm:block" />
            <em>&amp; the systems behind them.</em>
          </h2>
          <p className="section-count" aria-hidden>
            ({String(projects.length).padStart(2, "0")})
          </p>
        </div>

        <ol ref={listRef} className="work-list" onPointerLeave={() => setHover(null)}
          onPointerEnter={(e) => e.pointerType === "mouse" && setArmed(true)}
        >
          {projects.map((p, i) => (
            <li key={p.slug} className="work-row" data-reveal style={{ "--d": `${(i % 4) * 60}ms` } as React.CSSProperties}>
              <Link
                href={`/work/${p.slug}`}
                className={`work-link ${hover !== null && hover !== i ? "is-dim" : ""}`}
                onPointerEnter={() => setHover(i)}
                onFocus={() => setHover(null)}
              >
                <span className="work-index">{p.index}</span>
                <span className="work-thumb" aria-hidden>
                  <Image src={p.images[0]} alt="" fill sizes="96px" className="object-cover" />
                </span>
                <span className="work-name">{p.name}</span>
                <span className="work-tags">{p.date}</span>
                <span className="work-arrow" aria-hidden>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="8 7 17 7 17 16" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>

      <div ref={previewRef} className={`work-preview ${hover !== null ? "is-on" : ""}`} aria-hidden>
        {armed && projects.map((p, i) => (
          <div key={p.slug} className={`work-preview-img ${hover === i ? "is-on" : ""}`}>
            <Image src={p.images[0]} alt="" fill sizes="380px" className="object-cover" />
          </div>
        ))}
        <span className="work-preview-label">{hover !== null ? projects[hover].name : ""}</span>
      </div>
    </section>
  );
}
