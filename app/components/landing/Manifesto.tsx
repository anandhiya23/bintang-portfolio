"use client";

import Image from "next/image";
import { useRef } from "react";
import { values } from "@/lib/data";
import { gsap, MOTION_OK, useGSAP } from "./motion";

type Token = string | { img: string; alt: string; pos?: string };

// Words with small image "pills" set inline, the way a sentence would point at things.
const TOKENS: Token[] = [
  "I’m", "Bintang,", "a", "designer", "who", "writes", "code.",
  { img: "/DSC06399 1.png", alt: "", pos: "50% 8%" },
  "I", "build", "brands,", "interfaces",
  { img: "/murka/1 (1).png", alt: "" },
  "and", "the", "systems", "underneath", "them,", "so", "nothing", "gets", "lost",
  { img: "/jakarta_youth_festival/JYF1.png", alt: "" },
  "in", "the", "hand-off.",
];

const TAGLINES = ["Professional overthinker", "Allergic to arbitrary", "Concept to deploy"];

export default function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const el = root.current!;
        gsap.fromTo(
          el.querySelectorAll(".lp-man-w"),
          { opacity: 0.12 },
          {
            opacity: 1,
            stagger: 0.08,
            ease: "none",
            scrollTrigger: { trigger: el.querySelector(".lp-man-text"), start: "top 78%", end: "bottom 50%", scrub: true },
          },
        );
        el.querySelectorAll(".lp-man-pill-in").forEach((p) => {
          gsap.fromTo(
            p,
            { clipPath: "inset(0% 50% 0% 50% round 999px)", scale: 0.6 },
            {
              clipPath: "inset(0% 0% 0% 0% round 999px)",
              scale: 1,
              ease: "power3.out",
              duration: 1,
              scrollTrigger: { trigger: p, start: "top 82%", toggleActions: "play none none reverse" },
            },
          );
        });
        gsap.from(el.querySelectorAll(".lp-man-tag"), {
          yPercent: 100,
          opacity: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el.querySelector(".lp-man-tags"), start: "top 85%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="about" ref={root} className="lp-man" aria-labelledby="about-title">
      <div className="lp-wrap">
        <div className="lp-label-row">
          <p className="lp-label">(01) A bit about me</p>
          <h2 id="about-title" className="lp-label lp-label-r">The Designer-Engineer</h2>
        </div>
        <p className="lp-man-text">
          {TOKENS.map((t, i) =>
            typeof t === "string" ? (
              <span key={i} className="lp-man-w">
                {t}{" "}
              </span>
            ) : (
              <span key={i} className="lp-man-pill" aria-hidden>
                <span className="lp-man-pill-in">
                  <Image src={t.img} alt={t.alt} fill sizes="200px" className="object-cover" style={t.pos ? { objectPosition: t.pos } : undefined} />
                </span>{" "}
              </span>
            ),
          )}
        </p>
        <ul className="lp-man-tags">
          {TAGLINES.map((t, i) => (
            <li key={t} className="lp-man-tag">
              <span className="lp-num">0{i + 1}</span>
              <span className="lp-man-tag-t">{t}</span>
              <span className="lp-man-tag-b">{values[i]?.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
