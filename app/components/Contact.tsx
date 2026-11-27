"use client";

import { useState } from "react";

const EMAIL = "bintangananandhiya23@gmail.com";

const channels = [
  { label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  { label: "WhatsApp", value: "+62 811 892 313", href: "https://wa.me/62811892313" },
  { label: "LinkedIn", value: "bintanganandhiya", href: "https://www.linkedin.com/in/bintanganandhiya/" },
  { label: "GitHub", value: "anandhiya23", href: "https://github.com/anandhiya23" },
];

export default function Contact() {
  const [sent, setSent] = useState(false);

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
    <section id="contact" className="contact section-pad" aria-labelledby="contact-title">
      <div className="max-w-7xl mx-auto">
        <p className="eyebrow">Contact</p>
        <h2 id="contact-title" className="contact-title" data-reveal>
          Let&apos;s build <br />
          something <em>precise.</em>
        </h2>

        <div className="contact-grid">
          <div className="contact-left" data-reveal>
            <p className="contact-lede">
              Whether you have a product idea, a technical challenge, or just want to talk design systems, reach out.
              I respond to every message within 24 hours.
            </p>
            <ul className="contact-channels">
              {channels.map((c) => (
                <li key={c.label}>
                  <span className="contact-label">{c.label}</span>
                  <a
                    href={c.href}
                    {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {c.value}
                  </a>
                </li>
              ))}
              <li>
                <span className="contact-label">Location</span>
                <span>Jakarta, Indonesia</span>
              </li>
            </ul>
          </div>

          <form className="contact-form" onSubmit={onSubmit} data-reveal>
            <div className="field-row">
              <div className="field">
                <input id="name" name="name" type="text" placeholder=" " autoComplete="name" required />
                <label htmlFor="name">Name</label>
              </div>
              <div className="field">
                <input id="email" name="email" type="email" placeholder=" " autoComplete="email" />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="field">
              <input id="subject" name="subject" type="text" placeholder=" " />
              <label htmlFor="subject">What are we building?</label>
            </div>
            <div className="field">
              <textarea id="message" name="message" rows={4} placeholder=" " required />
              <label htmlFor="message">Tell me about the project</label>
            </div>
            <div className="contact-submit-row">
              <button type="submit" className="btn-solid btn-orange">
                <span>Send message</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
              <p className="contact-note" role="status">
                {sent ? "Your mail app should open with the message ready to send." : "Opens in your mail app."}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
