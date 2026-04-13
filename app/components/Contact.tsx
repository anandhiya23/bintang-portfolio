"use client";

import { useState } from "react";

export default function Contact() {
  const [focused, setFocused] = useState<string | null>(null);

  const inputStyle = (name: string) => ({
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `${focused === name ? "2px" : "1px"} solid ${focused === name ? "var(--color-primary)" : "rgba(203,213,225,0.5)"}`,
    padding: "12px 0",
    fontFamily: "var(--font-inter), sans-serif",
    fontSize: "14px",
    color: "var(--color-on-surface)",
    outline: "none",
    transition: "border 0.2s",
  });

  const labelStyle = {
    fontFamily: "var(--font-jetbrains), monospace",
    fontSize: "9px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.15em",
    color: "var(--color-secondary)",
    display: "block",
    marginBottom: "4px",
  };

  return (
    <section
      id="contact"
      className="px-6 sm:px-10 md:px-16 lg:px-24 py-20 md:py-32"
      style={{ background: "var(--color-surface)", borderTop: "1px solid var(--color-outline-variant)" }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left */}
        <div className="lg:col-span-5">
          <div className="uppercase mb-3" style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "10px", color: "var(--color-primary)", letterSpacing: "0.3em" }}>
            Contact
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold italic mb-6 md:mb-8"
            style={{ fontFamily: "var(--font-playfair), serif", color: "var(--color-on-surface)", letterSpacing: "-0.02em" }}
          >
            Let&apos;s build something precise.
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-secondary)" }}>
            Whether you have a product idea, a technical challenge, or just want to talk design systems — reach out. I respond to every message within 24 hours.
          </p>

          <div className="mt-10 md:mt-12 space-y-4">
            {[
              { label: "Email", value: "hello@bintang.dev" },
              { label: "Location", value: "Jakarta, Indonesia" },
            ].map((item) => (
              <div key={item.label}>
                <span style={labelStyle}>{item.label}</span>
                <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "14px", color: "var(--color-on-surface)" }}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Form */}
        <div className="lg:col-span-7">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-8 md:space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
              <div>
                <label htmlFor="name" style={labelStyle}>Name</label>
                <input id="name" type="text" placeholder="Your name" style={inputStyle("name")} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} />
              </div>
              <div>
                <label htmlFor="email" style={labelStyle}>Email</label>
                <input id="email" type="email" placeholder="your@email.com" style={inputStyle("email")} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} />
              </div>
            </div>

            <div>
              <label htmlFor="subject" style={labelStyle}>Subject</label>
              <input id="subject" type="text" placeholder="What are we building?" style={inputStyle("subject")} onFocus={() => setFocused("subject")} onBlur={() => setFocused(null)} />
            </div>

            <div>
              <label htmlFor="message" style={labelStyle}>Message</label>
              <textarea id="message" rows={5} placeholder="Describe your project or challenge..." style={{ ...inputStyle("message"), resize: "none" }} onFocus={() => setFocused("message")} onBlur={() => setFocused(null)} />
            </div>

            <button
              type="submit"
              className="transition-all duration-300 trace-hover uppercase w-full sm:w-auto"
              style={{ background: "linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))", color: "#fff", fontFamily: "var(--font-jetbrains), monospace", fontSize: "11px", padding: "20px 48px", letterSpacing: "0.15em", border: "none", cursor: "pointer" }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
