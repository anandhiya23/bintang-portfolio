"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isDetailPage = pathname.startsWith("/work/");

  // On detail pages, highlight "Work" automatically
  useEffect(() => {
    if (isDetailPage) setActive("Work");
  }, [isDetailPage]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isDetailPage) return;
    const sections = ["home", "work", "about", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const label = navLinks.find((l) => l.href === `/#${entry.target.id}`)?.label;
            if (label) setActive(label);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isDetailPage]);

  const handleNav = (label: string, href: string, e: React.MouseEvent) => {
    const hash = href.split("#")[1];
    setActive(label);
    setMenuOpen(false);
    if (hash && pathname === "/") {
      e.preventDefault();
      const el = document.getElementById(hash);
      if (!el) return;
      // Measure the top bar only (not the expanded mobile menu) so scroll offset is correct.
      const topBar = document.querySelector("header > div") as HTMLElement | null;
      const headerH = topBar?.offsetHeight ?? 0;
      const scroll = () => {
        const top = el.getBoundingClientRect().top + window.scrollY - headerH;
        window.scrollTo({ top: hash === "home" ? 0 : top, behavior: "smooth" });
      };
      // Wait for the menu collapse transition to avoid layout shift mid-scroll.
      requestAnimationFrame(() => requestAnimationFrame(scroll));
    }
  };

  return (
    <>
      <header
        className="fixed top-0 w-full z-50 transition-all duration-300"
        style={{
          background: scrolled || menuOpen ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.9)",
          backdropFilter: "blur(24px)",
          borderBottom: "1px solid var(--color-outline-variant)",
        }}
      >
        <div className="flex justify-between items-center px-6 md:px-8 py-5 max-w-7xl mx-auto">
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none" }} className="flex items-center gap-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5">
              <polyline points="4 17 10 11 4 5" />
              <line x1="12" y1="19" x2="20" y2="19" />
            </svg>
            <span
              className="text-base font-bold uppercase"
              style={{ fontFamily: "var(--font-jetbrains), monospace", letterSpacing: "0.1em", color: "var(--color-on-surface)" }}
            >
              BINTANG.dev
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleNav(link.label, link.href, e)}
                className={`nav-link${active === link.label ? " active" : ""}`}
                style={{ textDecoration: "none" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: social icons + mobile toggle */}
          <div className="flex items-center gap-4">
            <a href="https://github.com/anandhiya23" target="_blank" rel="noopener noreferrer" className="hidden md:block transition-opacity hover:opacity-60" aria-label="GitHub">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-on-surface)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/bintanganandhiya/" target="_blank" rel="noopener noreferrer" className="hidden md:block transition-opacity hover:opacity-60" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-on-surface)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden flex flex-col justify-center gap-1.5 w-6 h-6"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              <span
                className="block h-px w-full transition-all duration-300 origin-center"
                style={{
                  background: "var(--color-on-surface)",
                  transform: menuOpen ? "translateY(4px) rotate(45deg)" : "none",
                }}
              />
              <span
                className="block h-px transition-all duration-300"
                style={{
                  background: "var(--color-on-surface)",
                  width: menuOpen ? "0" : "100%",
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                className="block h-px w-full transition-all duration-300 origin-center"
                style={{
                  background: "var(--color-on-surface)",
                  transform: menuOpen ? "translateY(-4px) rotate(-45deg)" : "none",
                }}
              />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300"
          style={{ maxHeight: menuOpen ? "360px" : "0" }}
        >
          <nav
            className="flex flex-col px-6 pt-6 pb-6 gap-6"
            style={{ borderTop: "1px solid var(--color-outline-variant)" }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleNav(link.label, link.href, e)}
                className={`nav-link self-start${active === link.label ? " active" : ""}`}
                style={{ textDecoration: "none" }}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-4 pt-2">
              <a href="https://github.com/anandhiya23" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-60" aria-label="GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-on-surface)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/bintanganandhiya/" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-60" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-on-surface)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
