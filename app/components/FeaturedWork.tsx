"use client";

import Link from "next/link";
import { projects } from "@/lib/data";
import Carousel from "@/app/components/Carousel";

export default function FeaturedWork() {
  return (
    <section
      id="work"
      className="py-20 md:py-32 px-6 sm:px-10 md:px-16 lg:px-24"
      style={{
        background: "var(--color-surface)",
        borderTop: "1px solid var(--color-outline-variant)",
        borderBottom: "1px solid var(--color-outline-variant)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {projects.map((project, i) => (
          <div key={project.index} className={i > 0 ? "mt-24 md:mt-32" : ""}>
            {/* Section header */}
            <div
              className="flex flex-col sm:flex-row justify-between items-baseline mb-10 pb-8"
              style={{ borderBottom: "1px solid var(--color-outline)" }}
            >
              <div className="flex gap-4 items-center">
                <span
                  className="italic text-3xl md:text-4xl"
                  style={{ fontFamily: "var(--font-playfair), serif", color: "var(--color-outline)" }}
                >
                  {project.index}
                </span>
                <h2
                  className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase"
                  style={{ fontFamily: "var(--font-jetbrains), monospace", color: "var(--color-outline)", letterSpacing: "0.05em" }}
                >
                  Featured_Work
                </h2>
              </div>
              <div
                className="mt-3 sm:mt-0 uppercase"
                style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "10px", color: "var(--color-primary)", letterSpacing: "0.2em" }}
              >
                {project.date}
              </div>
            </div>

            {/* Project card */}
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 lg:items-start">

              {/* Carousel — no overflow-hidden so peeking cards are visible */}
              <div className="w-full lg:w-1/2 shrink-0">
                <Carousel images={project.images} title={project.title} />
              </div>

              {/* Details */}
              <div className="flex flex-col justify-between gap-10 lg:py-2 lg:flex-1">
                <div>
                  <h3
                    className="italic mb-3 leading-snug"
                    style={{ fontFamily: "var(--font-playfair), serif", color: "var(--color-on-surface)", fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
                  >
                    {project.name}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="uppercase"
                        style={{ border: "1px solid var(--color-outline)", color: "var(--color-secondary)", fontFamily: "var(--font-jetbrains), monospace", fontSize: "9px", padding: "4px 10px", letterSpacing: "0.1em" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <div className="uppercase" style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "10px", color: "var(--color-primary)", letterSpacing: "0.15em" }}>
                      About
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--color-secondary)" }}>{project.description}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={`/work/${project.slug}`}
                    className="trace-hover transition-colors uppercase inline-block"
                    style={{ background: "var(--color-primary)", color: "#fff", fontFamily: "var(--font-jetbrains), monospace", fontSize: "10px", fontWeight: "bold", padding: "16px 24px", letterSpacing: "0.1em", textDecoration: "none" }}
                  >
                    Explore Case
                  </Link>
                  <div
                    className="p-4 px-6 cursor-pointer group transition-all inline-flex items-center gap-3"
                    style={{ border: "1px solid var(--color-outline-variant)", background: "#fff" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--color-outline-variant)")}
                  >
                    <span className="uppercase" style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "10px", color: "var(--color-on-surface)", letterSpacing: "0.3em" }}>
                      View Archive
                    </span>
                    <div className="h-px w-4 group-hover:w-8 transition-all duration-500" style={{ background: "var(--color-primary)" }} />
                  </div>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
