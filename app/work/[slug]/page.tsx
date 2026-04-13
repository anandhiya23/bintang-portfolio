import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/lib/data";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Carousel from "@/app/components/Carousel";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prev = projects[currentIndex - 1] ?? null;
  const next = projects[currentIndex + 1] ?? null;

  return (
    <>
      <Header />
      <main className="pt-32 min-h-screen" style={{ background: "var(--color-surface)" }}>

        {/* Hero */}
        <section className="px-6 sm:px-10 md:px-16 lg:px-24 py-20 md:py-32" style={{ borderBottom: "1px solid var(--color-outline-variant)" }}>
          <div className="max-w-7xl mx-auto">
            <Link
              href="/#work"
              className="inline-flex items-center gap-3 mb-12 uppercase transition-colors hover:text-[var(--color-primary)]"
              style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "10px", letterSpacing: "0.2em", color: "var(--color-secondary)", textDecoration: "none" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
              </svg>
              Back to Work
            </Link>

            <div className="flex flex-col sm:flex-row justify-between items-baseline gap-4 mb-10 pb-8" style={{ borderBottom: "1px solid var(--color-outline)" }}>
              <div className="flex gap-4 items-center">
                <span
                  className="italic text-3xl md:text-4xl"
                  style={{ fontFamily: "var(--font-playfair), serif", color: "var(--color-outline)" }}
                >
                  {project.index}
                </span>
                <span
                  className="uppercase text-xs"
                  style={{ fontFamily: "var(--font-jetbrains), monospace", color: "var(--color-primary)", letterSpacing: "0.2em" }}
                >
                  Case Study
                </span>
              </div>
              <div
                className="uppercase"
                style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "10px", color: "var(--color-primary)", letterSpacing: "0.2em" }}
              >
                {project.date}
              </div>
            </div>

            <h1
              className="italic leading-[1.05] mb-10"
              style={{ fontFamily: "var(--font-playfair), serif", color: "var(--color-on-surface)", fontSize: "clamp(2.5rem, 7vw, 6rem)", letterSpacing: "-0.02em" }}
            >
              {project.name}
            </h1>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="uppercase"
                  style={{ border: "1px solid var(--color-outline)", color: "var(--color-secondary)", fontFamily: "var(--font-jetbrains), monospace", fontSize: "9px", padding: "6px 14px", letterSpacing: "0.1em" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Carousel + About */}
        <section className="px-6 sm:px-10 md:px-16 lg:px-24 py-16 md:py-20" style={{ borderBottom: "1px solid var(--color-outline-variant)" }}>
          <div className="max-w-4xl mx-auto flex flex-col gap-12">
            <Carousel images={project.images} title={project.title} />

            {/* About */}
            <div className="flex flex-col gap-6">
              <div className="uppercase" style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "10px", color: "var(--color-primary)", letterSpacing: "0.2em" }}>
                About the Project
              </div>
              <p className="text-base leading-relaxed" style={{ color: "var(--color-secondary)" }}>
                {project.description}
              </p>
            </div>
          </div>
        </section>

        {/* Prev / Next navigation */}
        <section className="px-6 sm:px-10 md:px-16 lg:px-24 py-16 md:py-20">
          <div className="max-w-7xl mx-auto flex justify-between items-center gap-6">
            {prev ? (
              <Link
                href={`/work/${prev.slug}`}
                className="flex items-center gap-4 group"
                style={{ textDecoration: "none" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" className="transition-transform group-hover:-translate-x-1">
                  <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
                </svg>
                <div>
                  <div className="uppercase mb-1" style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "9px", color: "var(--color-outline)", letterSpacing: "0.2em" }}>Previous</div>
                  <div className="uppercase font-bold" style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "11px", color: "var(--color-on-surface)", letterSpacing: "0.1em" }}>{prev.title}</div>
                </div>
              </Link>
            ) : <div />}

            {next ? (
              <Link
                href={`/work/${next.slug}`}
                className="flex items-center gap-4 group text-right"
                style={{ textDecoration: "none" }}
              >
                <div>
                  <div className="uppercase mb-1" style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "9px", color: "var(--color-outline)", letterSpacing: "0.2em" }}>Next</div>
                  <div className="uppercase font-bold" style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "11px", color: "var(--color-on-surface)", letterSpacing: "0.1em" }}>{next.title}</div>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" className="transition-transform group-hover:translate-x-1">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            ) : <div />}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
