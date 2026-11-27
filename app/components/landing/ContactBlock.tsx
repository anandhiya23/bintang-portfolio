"use client";

import { useRef, useState } from "react";
import { gsap, MOTION_OK, useGSAP } from "./motion";

const EMAIL = "bintanganandhiya23@gmail.com";

const CHANNELS = [
  { label: "WhatsApp", value: "+62 811 892 313", href: "https://wa.me/62811892313" },
  { label: "LinkedIn", value: "bintanganandhiya", href: "https://www.linkedin.com/in/bintanganandhiya/" },
  { label: "GitHub", value: "anandhiya23", href: "https://github.com/anandhiya23" },
  { label: "Location", value: "Jakarta, Indonesia", href: null },
];

export default function ContactBlock() {
  const root = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(root.current!.querySelectorAll(".lp-ct-title .lp-mask > span"), {
          yPercent: 140,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.07,
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        });
      });
    },
    { scope: root },
  );

  // No backend: compose the message in the visitor's own mail app.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const from = String(f.get("email") ?? "").trim();
    const subject = String(f.get("subject") ?? "").trim() || "Hello from your website";
    const message = String(f.get("message") ?? "").trim();
    const body = `${message}\n\n— ${name}${from ? ` (${from})` : ""}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section id="contact" ref={root} className="lp-ct" aria-labelledby="contact-title">
      <div className="lp-wrap">
        <p className="lp-label">(05) Contact</p>
        <h2 id="contact-title" className="lp-ct-title">
          <span className="lp-mask"><span>Let’s build</span></span>{" "}
          <span className="lp-mask"><span>something</span></span>{" "}
          <span className="lp-mask"><span className="is-serif">precise.</span></span>
        </h2>

        <div className="lp-ct-grid">
          <div>
            <a href={`mailto:${EMAIL}`} className="lp-ct-mail">
              <span>{EMAIL}</span>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="8 7 17 7 17 16" />
              </svg>
            </a>
            <p className="lp-ct-lede">
              Have a product idea, a technical challenge, or just want to talk design systems? I reply to every message
              within 24 hours.
            </p>
            <ul className="lp-ct-channels">
              {CHANNELS.map((c) => (
                <li key={c.label}>
                  <span className="lp-ct-k">{c.label}</span>
                  {c.href ? (
                    <a href={c.href} target="_blank" rel="noopener noreferrer">
                      {c.value}
                    </a>
                  ) : (
                    <span>{c.value}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <form className="lp-form" onSubmit={onSubmit}>
            <div className="lp-field-row">
              <div className="lp-field">
                <input id="name" name="name" type="text" placeholder=" " autoComplete="name" required />
                <label htmlFor="name">Name</label>
              </div>
              <div className="lp-field">
                <input id="email" name="email" type="email" placeholder=" " autoComplete="email" />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="lp-field">
              <input id="subject" name="subject" type="text" placeholder=" " />
              <label htmlFor="subject">What are we building?</label>
            </div>
            <div className="lp-field">
              <textarea id="message" name="message" rows={4} placeholder=" " required />
              <label htmlFor="message">Tell me about the project</label>
            </div>
            <div className="lp-form-row">
              <button type="submit" className="lp-btn">
                Send message
              </button>
              <p className="lp-form-note" role="status">
                {sent ? "Your mail app should open with the message ready." : "Opens in your mail app."}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
