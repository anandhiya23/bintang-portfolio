import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/data";
import Header from "@/app/components/Header";
import CaseMotion from "@/app/components/case/CaseMotion";

export const metadata: Metadata = {
  title: "Not found — Bintang Anandhiya",
  robots: { index: false },
};

export default function NotFound() {
  const picks = projects.slice(0, 4);
  return (
    <div className="lp">
      <Header />
      <main className="lp-main cs cs-404">
        <CaseMotion>
          <section className="cs-hero lp-wrap">
            <div className="cs-top">
              <Link href="/" className="cs-back">
                <span aria-hidden>←</span> Home
              </Link>
              <span className="lp-num">Error 404</span>
            </div>
            <h1 className="cs-title">
              <span className="lp-mask">
                <span>Lost in</span>
              </span>{" "}
              <span className="lp-mask">
                <span className="is-serif">hand-off.</span>
              </span>
            </h1>
            <p className="cs-summary cs-rv">
              This page doesn’t exist or has moved. Try one of these projects instead.
            </p>
            <div className="cs-404-actions cs-rv">
              <Link href="/work" className="lp-btn">
                See all work
              </Link>
              <Link href="/" className="cs-back">
                Back to home
              </Link>
            </div>
            <ul className="cs-404-list cs-rv">
              {picks.map((p) => (
                <li key={p.slug}>
                  <Link href={`/work/${p.slug}`}>
                    <span className="lp-num">{p.index}</span>
                    <span>{p.name}</span>
                    <span aria-hidden>→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </CaseMotion>
      </main>
    </div>
  );
}
