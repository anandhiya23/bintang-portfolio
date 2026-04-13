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

  const handleNav = (label: string) => {
    setActive(label);
    setMenuOpen(false);
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
                onClick={() => handleNav(link.label)}
                className={`nav-link${active === link.label ? " active" : ""}`}
                style={{ textDecoration: "none" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: status + mobile toggle */}
          <div className="flex items-center gap-4">
            <span
              className="hidden lg:block uppercase"
              style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "9px", letterSpacing: "0.2em", color: "var(--color-secondary)" }}
            >
              Available for work
            </span>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse hidden md:block" style={{ background: "var(--color-primary)" }} />

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
          style={{ maxHeight: menuOpen ? "300px" : "0" }}
        >
          <nav
            className="flex flex-col px-6 pb-6 gap-6"
            style={{ borderTop: "1px solid var(--color-outline-variant)" }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => handleNav(link.label)}
                className={`nav-link self-start pt-4${active === link.label ? " active" : ""}`}
                style={{ textDecoration: "none" }}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-2 pt-2">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--color-primary)" }} />
              <span
                className="uppercase"
                style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "9px", letterSpacing: "0.2em", color: "var(--color-secondary)" }}
              >
                Available for work
              </span>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
