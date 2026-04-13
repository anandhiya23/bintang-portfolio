"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section id="home">
      {/* ── Mobile / tablet: stacked ── */}
      <div className="lg:hidden flex flex-col">
        <div className="px-6 sm:px-10 py-12 flex flex-col gap-8">
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
            className="italic text-4xl sm:text-5xl leading-[1.05]"
            style={{ fontFamily: "var(--font-playfair), serif", color: "var(--color-on-surface)", letterSpacing: "-0.02em" }}
          >
            Building bridges <br />
            between <span style={{ color: "var(--color-primary)" }}>design</span>{" "}
            &amp; <span className="not-italic" style={{ color: "var(--color-secondary)" }}>programming.</span>
          </h1>

          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <a
              href="#work"
              className="inline-block transition-all duration-300 trace-hover"
              style={{ background: "var(--color-on-surface)", color: "#fff", fontFamily: "var(--font-jetbrains), monospace", fontSize: "11px", padding: "16px 32px", textTransform: "uppercase", letterSpacing: "0.15em" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--color-primary)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--color-on-surface)")}
            >
              View Portfolio
            </a>
            <a href="#about" className="flex items-center gap-3 group cursor-pointer" style={{ textDecoration: "none" }}>
              <span className="uppercase group-hover:text-[var(--color-primary)] transition-colors" style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "11px", letterSpacing: "0.15em", color: "var(--color-secondary)" }}>
                The Methodology
              </span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" className="transition-transform group-hover:translate-x-1">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>

          <div className="pt-8" style={{ borderTop: "1px solid var(--color-outline-variant)" }}>
            <div className="mb-3 uppercase" style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "10px", color: "var(--color-secondary)", letterSpacing: "0.3em" }}>
              Core Philosophy
            </div>
            <p className="text-sm leading-relaxed max-w-sm italic" style={{ fontFamily: "var(--font-body), sans-serif", color: "var(--color-secondary)" }}>
              &ldquo;The screen is a structured, multi-dimensional space where logic meets aesthetic restraint.&rdquo;
            </p>
          </div>
        </div>
        <div className="w-full max-w-xs mx-auto leading-[0] px-8">
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
        {/* Image — defines section height */}
        <div className="w-[33%] leading-[0] ml-[5%]">
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
        <div className="absolute top-0 right-0 w-[62%] h-full flex flex-col justify-end px-16 xl:px-24 pb-16">
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
            &amp;{" "}
            <span className="not-italic" style={{ color: "var(--color-secondary)" }}>programming.</span>
          </h1>

          <div className="flex flex-row gap-8 items-center mb-16">
            <a
              href="#work"
              className="inline-block transition-all duration-300 trace-hover"
              style={{ background: "var(--color-on-surface)", color: "#fff", fontFamily: "var(--font-jetbrains), monospace", fontSize: "11px", padding: "20px 40px", textTransform: "uppercase", letterSpacing: "0.15em" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--color-primary)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--color-on-surface)")}
            >
              View Portfolio
            </a>
            <a href="#about" className="flex items-center gap-4 group cursor-pointer" style={{ textDecoration: "none" }}>
              <span className="uppercase group-hover:text-[var(--color-primary)] transition-colors" style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "11px", letterSpacing: "0.15em", color: "var(--color-secondary)" }}>
                The Methodology
              </span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" className="transition-transform group-hover:translate-x-2">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>

          <div className="pt-8" style={{ borderTop: "1px solid var(--color-outline-variant)" }}>
            <div className="mb-3 uppercase" style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "10px", color: "var(--color-secondary)", letterSpacing: "0.3em" }}>
              Core Philosophy
            </div>
            <p className="text-sm leading-relaxed max-w-sm italic" style={{ fontFamily: "var(--font-body), sans-serif", color: "var(--color-secondary)" }}>
              &ldquo;The screen is a structured, multi-dimensional space where logic meets aesthetic restraint.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
