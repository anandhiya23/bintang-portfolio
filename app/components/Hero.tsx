"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const TYPEWRITER_WORDS = ["programming.", "engineering.", "community.", "movement."];

function useTypewriter(words: string[], typeMs = 90, deleteMs = 45, holdMs = 1600) {
  const [wordIdx, setWordIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), holdMs);
      return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
      return;
    }
    const t = setTimeout(
      () => setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1)),
      deleting ? deleteMs : typeMs,
    );
    return () => clearTimeout(t);
  }, [text, deleting, wordIdx, words, typeMs, deleteMs, holdMs]);

  return text;
}

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const headerH = document.querySelector("header")?.offsetHeight ?? 0;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - headerH, behavior: "smooth" });
};

export default function Hero() {
  const typed = useTypewriter(TYPEWRITER_WORDS);
  return (
    <section id="home">
      {/* ── Mobile / tablet: stacked ── */}
      <div className="lg:hidden relative flex flex-col">
        {/* Bridge backdrop — full width, centered */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-50 pointer-events-none select-none z-0"
          style={{
            backgroundColor: "var(--color-primary)",
            WebkitMaskImage: "url(/bridge.svg)",
            maskImage: "url(/bridge.svg)",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center bottom",
            maskPosition: "center bottom",
            WebkitMaskSize: "100% auto",
            maskSize: "100% auto",
          }}
        />
        <div className="relative z-10 px-6 sm:px-10 py-12 flex flex-col gap-8">
          {/* Status badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 self-start"
            style={{ background: "var(--color-surface-variant)", border: "1px solid var(--color-outline-variant)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-primary)" }} />
            <span className="uppercase" style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "10px", letterSpacing: "0.15em", color: "var(--color-on-surface)" }}>
              Open to Opportunities
            </span>
          </div>

          <h1
            className="italic leading-[1.05] w-full"
            style={{ fontFamily: "var(--font-playfair), serif", color: "var(--color-on-surface)", letterSpacing: "-0.02em", fontSize: "clamp(2.25rem, 10.5vw, 4.5rem)" }}
          >
            Building bridges <br />
            between <span style={{ color: "var(--color-primary)" }}>design</span>{" "}
            &amp; <br />
            <span className="not-italic" style={{ color: "var(--color-secondary)" }}>
              {typed}
              <span className="inline-block w-[0.05em] -mb-[0.05em] ml-[0.05em] animate-pulse" style={{ background: "currentColor", height: "0.9em", verticalAlign: "-0.1em" }} />
            </span>
          </h1>

          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <a
              href="#work" onClick={(e) => { e.preventDefault(); scrollTo("work"); }}
              className="inline-block transition-all duration-300 trace-hover"
              style={{ background: "var(--color-on-surface)", color: "#fff", fontFamily: "var(--font-jetbrains), monospace", fontSize: "11px", padding: "16px 32px", textTransform: "uppercase", letterSpacing: "0.15em" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--color-primary)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--color-on-surface)")}
            >
              View Portfolio
            </a>
            <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo("about"); }} className="flex items-center gap-3 group cursor-pointer" style={{ textDecoration: "none" }}>
              <span className="uppercase group-hover:text-[var(--color-primary)] transition-colors" style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "11px", letterSpacing: "0.15em", color: "var(--color-secondary)" }}>
                The Methodology
              </span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" className="transition-transform group-hover:translate-x-1">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>

        </div>
        <div className="relative z-10 w-full max-w-xs mx-auto leading-[0] px-8">
          <Image
            src="/DSC06399 1.png"
            alt="Bintang Anandhiya"
            width={1737}
            height={2368}
            priority
            className="w-full h-auto block"
          />
        </div>
      </div>

      {/* ── Desktop: independent containers ── */}
      <div className="hidden lg:block relative">
        {/* Bridge backdrop — anchored bottom-left, fills 0 → 45% width, full hero height */}
        <div
          aria-hidden
          className="absolute left-[-10%] bottom-0 top-0 w-[60%] opacity-50 pointer-events-none select-none z-0"
          style={{
            backgroundColor: "var(--color-primary)",
            WebkitMaskImage: "url(/bridge.svg)",
            maskImage: "url(/bridge.svg)",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "left bottom",
            maskPosition: "left bottom",
            WebkitMaskSize: "contain",
            maskSize: "contain",
          }}
        />
        {/* Image — defines section height */}
        <div className="relative w-[33%] leading-[0] ml-[5%] z-10">
          <Image
            src="/DSC06399 1.png"
            alt="Bintang Anandhiya"
            width={1737}
            height={2368}
            priority
            className="w-full h-auto block"
          />
        </div>

        {/* Text — absolutely overlaid on the right, independent */}
        <div className="absolute top-0 right-0 w-[62%] h-full flex flex-col justify-center px-16 xl:px-24 pb-32">
          {/* Status badge */}
          <div
            className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 self-start"
            style={{ background: "var(--color-surface-variant)", border: "1px solid var(--color-outline-variant)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-primary)" }} />
            <span className="uppercase" style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "10px", letterSpacing: "0.15em", color: "var(--color-on-surface)" }}>
              Open to Opportunities
            </span>
          </div>

          <h1
            className="italic text-6xl xl:text-7xl 2xl:text-8xl leading-[1.05] mb-12"
            style={{ fontFamily: "var(--font-playfair), serif", color: "var(--color-on-surface)", letterSpacing: "-0.02em" }}
          >
            Building bridges <br />
            between{" "}
            <span style={{ color: "var(--color-primary)" }}>design</span>{" "}
            &amp; <br />
            <span className="not-italic" style={{ color: "var(--color-secondary)" }}>
              {typed}
              <span className="inline-block w-[0.05em] -mb-[0.05em] ml-[0.05em] animate-pulse" style={{ background: "currentColor", height: "0.9em", verticalAlign: "-0.1em" }} />
            </span>
          </h1>

          <div className="flex flex-row gap-8 items-center">
            <a
              href="#work" onClick={(e) => { e.preventDefault(); scrollTo("work"); }}
              className="inline-block transition-all duration-300 trace-hover"
              style={{ background: "var(--color-on-surface)", color: "#fff", fontFamily: "var(--font-jetbrains), monospace", fontSize: "11px", padding: "20px 40px", textTransform: "uppercase", letterSpacing: "0.15em" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--color-primary)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--color-on-surface)")}
            >
              View Portfolio
            </a>
            <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo("about"); }} className="flex items-center gap-4 group cursor-pointer" style={{ textDecoration: "none" }}>
              <span className="uppercase group-hover:text-[var(--color-primary)] transition-colors" style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "11px", letterSpacing: "0.15em", color: "var(--color-secondary)" }}>
                The Methodology
              </span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" className="transition-transform group-hover:translate-x-2">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
