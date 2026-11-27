import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/data";
import { projectDetails } from "@/lib/projectDetails";
import Header from "@/app/components/Header";
import SmoothScroll from "@/app/components/landing/SmoothScroll";
import RevealFooter from "@/app/components/landing/RevealFooter";
import CaseMotion from "@/app/components/case/CaseMotion";

export const metadata: Metadata = {
  title: "Work — Bintang Anandhiya",
  description: "Brand identities, campaigns and digital design by Bintang Anandhiya.",
  alternates: { canonical: "/work" },
  openGraph: { title: "Work — Bintang Anandhiya", url: "/work" },
};

export default function WorkIndex() {
  return (
    <div className="lp">
      <SmoothScroll />
      <Header />
      <main className="lp-main cs cs-index">
        <CaseMotion>
          <section className="cs-hero lp-wrap">
            <div className="cs-top">
              <Link href="/" className="cs-back">
                <span aria-hidden>←</span> Home
              </Link>
              <span className="lp-num">{projects.length} projects</span>
            </div>
            <h1 className="cs-title">
              <span className="lp-mask">
                <span>All</span>
              </span>{" "}
              <span className="lp-mask">
                <span className="is-serif">work</span>
              </span>
            </h1>
            <p className="cs-summary cs-rv">
              Identities, campaigns and systems for agencies, foundations, festivals and the student organisations where I
              started.
            </p>
          </section>

          <ul className="cs-grid lp-wrap">
            {projects.map((p, n) => {
              const d = projectDetails[p.slug];
              return (
                <li key={p.slug} className={`cs-rv ${n % 3 === 0 ? "is-wide" : ""}`}>
                  <Link href={`/work/${p.slug}`} className="cs-item">
                    <span className="cs-item-img">
                      <Image src={p.images[0]} alt="" fill sizes="(min-width: 900px) 60vw, 100vw" className="object-cover" />
                    </span>
                    <span className="cs-item-row">
                      <span className="lp-num">{p.index}</span>
                      <span className="cs-item-name">{p.name}</span>
                      <span className="cs-item-year">{d?.year ?? ""}</span>
                    </span>
                    {d?.summary && <span className="cs-item-sum">{d.summary}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </CaseMotion>
      </main>
      <RevealFooter />
    </div>
  );
}
