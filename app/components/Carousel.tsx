"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";

type Props = {
  images: string[];
  title: string;
};

const STACK_OFFSET = 18;
const STACK_LEVELS = 3;
const ANIM_MS = 420;
const HOVER_EXTRA = 36;

export default function Carousel({ images, title }: Props) {
  const [current, setCurrent] = useState(0);
  const [exitCount, setExitCount] = useState(0); // how many cards are currently exiting
  const [incoming, setIncoming] = useState(0);   // how many back cards are sliding in from below
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);
  const [cursorVisible, setCursorVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const goNextRef = useRef<(by?: number) => void>(() => {});
  const n = images.length;
  const animating = exitCount > 0;

  const goNext = (by = 1) => {
    if (animating || n <= 1) return;
    const count = Math.min(by, n - 1);
    setHoveredLevel(null);
    setExitCount(count);
    setTimeout(() => {
      const enterCount = Math.max(0, count - Math.max(0, n - STACK_LEVELS));
      setCurrent((c) => (c + count) % n);
      setExitCount(0);
      if (enterCount > 0) {
        setIncoming(enterCount);
        requestAnimationFrame(() => requestAnimationFrame(() => setIncoming(0)));
      }
    }, ANIM_MS);
  };

  goNextRef.current = goNext;

  const scheduleAuto = useCallback(() => {
    if (n <= 1) return;
    autoRef.current = setTimeout(() => goNextRef.current(1), 3000);
  }, [n]);

  useEffect(() => {
    scheduleAuto();
    return () => { if (autoRef.current) clearTimeout(autoRef.current); };
  }, [current, scheduleAuto]);

  const pauseAuto = () => { if (autoRef.current) clearTimeout(autoRef.current); };
  const resumeAuto = () => scheduleAuto();

  // During animation we render exitCount exiting cards + STACK_LEVELS incoming cards
  const renderCount = Math.min(exitCount + STACK_LEVELS, n);
  const stackExtraHeight = STACK_OFFSET * (Math.min(n, STACK_LEVELS) - 1) + HOVER_EXTRA;

  return (
    <div ref={containerRef} className="relative w-full" style={{ paddingTop: stackExtraHeight }}>
      <div
        style={{
          aspectRatio: "16 / 9",
          position: "relative",
          overflow: "visible",
          clipPath: `inset(-${stackExtraHeight}px 0 0 0)`,
          zIndex: 2,
        }}
        onMouseEnter={() => { setCursorVisible(true); pauseAuto(); }}
        onMouseMove={(e) => {
          const rect = containerRef.current?.getBoundingClientRect();
          if (rect) setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }}
        onMouseLeave={() => { setCursorVisible(false); resumeAuto(); }}
      >
        {Array.from({ length: renderCount }).map((_, level) => {
          const imgIdx = (current + level) % n;
          let ty: string, zi: number;

          if (animating) {
            if (level < exitCount) {
              ty = `100%`;
              zi = 20 - level;
            } else {
              const slot = level - exitCount;
              ty = `${-(slot * STACK_OFFSET)}px`;
              zi = 10 - slot;
            }
          } else {
            const sPost = Math.min(STACK_LEVELS, n);
            const isEntering = incoming > 0 && level >= sPost - incoming;
            const coverShift = !isEntering && hoveredLevel !== null && level < hoveredLevel ? HOVER_EXTRA : 0;
            ty = isEntering ? `0px` : `${-(level * STACK_OFFSET) + coverShift}px`;
            zi = 10 - level;
          }

          return (
            <div
              key={imgIdx}
              onMouseEnter={() => !animating && level > 0 && setHoveredLevel(level)}
              onMouseLeave={() => setHoveredLevel(null)}
              onClick={() => {
                if (animating) return;
                if (level === 0) goNext(1);
                else goNext(level);
              }}
              style={{
                position: "absolute",
                inset: 0,
                transform: `translateY(${ty})`,
                transition: `transform ${ANIM_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                zIndex: zi,
                borderRadius: "10px 10px 0 0",
                overflow: "hidden",
                borderTop: "1px solid var(--color-outline-variant)",
                borderLeft: "1px solid var(--color-outline-variant)",
                borderRight: "1px solid var(--color-outline-variant)",
                cursor: "none",
              }}
            >
              <Image
                src={images[imgIdx]}
                alt={`${title} — image ${imgIdx + 1}`}
                fill
                className="object-cover"
              />
            </div>
          );
        })}
      </div>

      {/* Mouse-following cursor circle */}
      {mouse && (
        <div style={{
          position: "absolute",
          left: mouse.x,
          top: mouse.y,
          transform: `translate(-50%, -50%) scale(${cursorVisible ? 1 : 0.4})`,
          opacity: cursorVisible ? 1 : 0,
          transition: "opacity 200ms ease, transform 200ms ease",
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "var(--color-primary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: 30,
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      )}

      {/* Horizon line + shadow darkening cards above */}
      <div style={{ marginLeft: -24, marginRight: -24, position: "relative" }}>
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          zIndex: 1,
          background: "radial-gradient(50% 30% at 50% 100%, rgba(0, 0, 0, 1) 50%, transparent 100%)",
          pointerEvents: "none",
        }} />
        <div style={{ height: 1, background: "var(--color-outline-variant)", position: "relative", zIndex: 2 }} />
      </div>

    </div>
  );
}
