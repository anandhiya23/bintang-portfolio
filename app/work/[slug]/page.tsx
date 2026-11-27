import { Fragment } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/data";
import { projectDetails } from "@/lib/projectDetails";
import Header from "@/app/components/Header";
import SmoothScroll from "@/app/components/landing/SmoothScroll";
import RevealFooter from "@/app/components/landing/RevealFooter";
import CaseMotion from "@/app/components/case/CaseMotion";

// Only the known projects exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.name} — Bintang Anandhiya`,
    description: projectDetails[slug]?.summary ?? p.description,
  };
}

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = projects.findIndex((p) => p.slug === slug);
  if (i < 0) notFound();
  const project = projects[i];
  const d = projectDetails[slug];
  const next = projects[(i + 1) % projects.length];
  const [lead, ...rest] = project.images;
  const words = project.name.split(" ");

  const meta = [
    { k: "Client", v: d?.client ?? project.name },
    d?.year ? { k: "Year", v: d.year } : null,
    d?.role ? { k: "Role", v: d.role } : null,
    { k: "Discipline", v: project.tags.join(", ") },
  ].filter(Boolean) as { k: string; v: string }[];

  return (
    <div className="lp">
      <SmoothScroll />
      <Header />
      <main className="lp-main cs">
        <CaseMotion>
          <section className="cs-hero lp-wrap">
            <div className="cs-top">
              <Link href="/work" className="cs-back">
                <span aria-hidden>←</span> All work
              </Link>
              <span className="lp-num">
                {project.index} / {String(projects.length).padStart(2, "0")}
              </span>
            </div>

            <h1 className="cs-title">
              {words.map((w, n) => (
                <Fragment key={n}>
                  <span className="lp-mask">
                    <span>{w}</span>
                  </span>{" "}
                </Fragment>
              ))}
            </h1>

            {d?.summary && <p className="cs-summary cs-rv">{d.summary}</p>}

            <dl className="cs-meta cs-rv">
              {meta.map((m) => (
                <div key={m.k}>
                  <dt>{m.k}</dt>
                  <dd>{m.v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <figure className="cs-lead">
            <div className="cs-frame">
              <div className="cs-par">
                <Image src={lead} alt={`${project.name}, key visual`} fill preload sizes="100vw" className="object-cover" />
              </div>
            </div>
          </figure>

          <section className="cs-block lp-wrap">
            <p className="lp-label">(01) Overview</p>
            <div className="cs-prose">
              <p className="cs-lede cs-rv">{project.description}</p>
              {d?.context.map((t, n) => (
                <p key={n} className="cs-rv">
                  {t}
                </p>
              ))}
            </div>
          </section>

          {d?.facts && (
            <section className="cs-facts lp-wrap">
              {d.facts.map((f) => (
                <div key={f.label} className="cs-fact cs-rv">
                  <span className="cs-fact-v">{f.value}</span>
                  <span className="lp-num">{f.label}</span>
                </div>
              ))}
            </section>
          )}

          {rest[0] && <Shot src={rest[0]} alt={`${project.name}, detail 1`} />}

          {d && (
            <section className="cs-block lp-wrap">
              <p className="lp-label">(02) Approach</p>
              <div className="cs-prose">
                {d.approach.map((t, n) => (
                  <p key={n} className={`cs-rv ${n === 0 ? "cs-lede" : ""}`}>
                    {t}
                  </p>
                ))}
                <ul className="cs-deliv cs-rv" aria-label="Deliverables">
                  {d.deliverables.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {d?.palette && (
            <section className="cs-palette lp-wrap" aria-label="Colour palette">
              {d.palette.map((c) => (
                <div key={c.hex} className="cs-swatch cs-rv" style={{ background: c.hex }}>
                  <span>{c.name}</span>
                  <span>{c.hex}</span>
                </div>
              ))}
            </section>
          )}

          {rest.slice(1).map((src, n) => (
            <Shot key={src} src={src} alt={`${project.name}, detail ${n + 2}`} />
          ))}

          {d?.sources && (
            <section className="cs-block lp-wrap">
              <p className="lp-label">Sources</p>
              <ul className="cs-sources">
                {d.sources.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer">
                      {s.label} <span aria-hidden>↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <Link href={`/work/${next.slug}`} className="cs-next lp-grain-light">
            <span className="lp-wrap cs-next-in">
              <span className="lp-num">Next project · {next.index}</span>
              <span className="cs-next-name">{next.name}</span>
            </span>
            <span className="cs-next-img" aria-hidden>
              <Image src={next.images[0]} alt="" fill sizes="50vw" className="object-cover" />
            </span>
          </Link>
        </CaseMotion>
      </main>
      <RevealFooter />
    </div>
  );
}

function Shot({ src, alt }: { src: string; alt: string }) {
  return (
    <figure className="cs-shot lp-wrap cs-rv">
      <div className="cs-shot-frame">
        <Image src={src} alt={alt} width={1920} height={1080} sizes="(min-width: 1440px) 1360px, 100vw" />
      </div>
    </figure>
  );
}
