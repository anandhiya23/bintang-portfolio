"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { projects } from "@/lib/data";
import { gsap, MOTION_OK, useGSAP } from "./motion";

const FEATURED = projects.slice(0, 6);
const MORE = projects.slice(6);

/**
 * Selected work. On wide screens the section pins and vertical scroll drives
 * a horizontal rail of projects, with each image drifting inside its frame.
 * Elsewhere it is a native swipeable rail with snap points.
 */
export default function WorkRail() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const el = root.current!;
      const pinEl = el.querySelector<HTMLElement>(".lp-work-pin")!;
      const rail = el.querySelector<HTMLElement>(".lp-work-rail")!;
      const track = el.querySelector<HTMLElement>(".lp-work-track")!;
      const bar = el.querySelector<HTMLElement>(".lp-work-progress span")!;
      const count = el.querySelector<HTMLElement>(".lp-work-count b")!;

      mm.add(MOTION_OK, () => {
        el.classList.add("is-pinned");
        const dist = () => Math.max(0, track.scrollWidth - rail.clientWidth);
        const tween = gsap.to(track, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: pinEl,
            start: "top top",
            end: () => `+=${dist()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              bar.style.transform = `scaleX(${self.progress})`;
              const i = Math.min(FEATURED.length, Math.floor(self.progress * FEATURED.length) + 1);
              count.textContent = String(i).padStart(2, "0");
            },
          },
        });
        gsap.utils.toArray<HTMLElement>(".lp-card-par", el).forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -6 },
            {
              xPercent: 6,
              ease: "none",
              scrollTrigger: {
                trigger: img.closest(".lp-card"),
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        });
        return () => el.classList.remove("is-pinned");
      });

      mm.add(MOTION_OK, () => {
        gsap.from(el.querySelectorAll(".lp-work-title .lp-mask > span"), {
          yPercent: 140,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 75%" },
        });
        gsap.utils.toArray<HTMLElement>(".lp-more-row", el).forEach((row) => {
          gsap.from(row, {
            yPercent: 40,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 92%" },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="work" ref={root} className="lp-work" aria-labelledby="work-title">
      <div className="lp-work-pin">
        <div className="lp-wrap lp-work-head">
          <p className="lp-label">(02) Selected work</p>
          <h2 id="work-title" className="lp-work-title">
            <span className="lp-mask">
              <span>Selected</span>
            </span>{" "}
            <span className="lp-mask">
              <span className="is-serif">work</span>
            </span>
          </h2>
          <p className="lp-work-count" aria-hidden>
            <b>01</b> / {String(FEATURED.length).padStart(2, "0")}
          </p>
        </div>

        <div className="lp-work-rail">
          <ol className="lp-work-track">
            {FEATURED.map((p) => (
              <li key={p.slug} className="lp-card">
                <Link href={`/work/${p.slug}`} className="lp-card-link">
                  <span className="lp-card-media">
                    <span className="lp-card-par">
                      <Image src={p.images[0]} alt="" fill sizes="(min-width: 900px) 64vw, 85vw" className="lp-card-img" />
                    </span>
                    <span className="lp-card-view" aria-hidden>
                      View
                    </span>
                  </span>
                  <span className="lp-card-meta">
                    <span className="lp-num">{p.index}</span>
                    <span className="lp-card-name">{p.name}</span>
                    <span className="lp-card-tags">{p.date}</span>
                  </span>
                </Link>
              </li>
            ))}
            <li className="lp-card lp-card-end">
              <a href="#more-work" className="lp-card-end-link">
                <span>We could keep going.</span>
                <em>There’s more below ↓</em>
              </a>
            </li>
          </ol>
        </div>

        <div className="lp-wrap">
          <div className="lp-work-progress" aria-hidden>
            <span />
          </div>
        </div>
      </div>

      <div id="more-work" className="lp-wrap lp-more">
        <div className="lp-more-head">
          <p className="lp-label">More projects</p>
          <Link href="/work" className="lp-more-all">
            All case studies <span aria-hidden>→</span>
          </Link>
        </div>
        <ul>
          {MORE.map((p) => (
            <li key={p.slug} className="lp-more-row">
              <Link href={`/work/${p.slug}`}>
                <span className="lp-num">{p.index}</span>
                <span className="lp-more-name">{p.name}</span>
                <span className="lp-more-tags">{p.date}</span>
                <span className="lp-more-thumb" aria-hidden>
                  <Image src={p.images[0]} alt="" fill sizes="160px" className="object-cover" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
