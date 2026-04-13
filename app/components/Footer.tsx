import { socialLinks, siteConfig } from "@/lib/data";

export default function Footer() {
  return (
    <footer
      className="w-full py-12 md:py-16"
      style={{ background: "var(--color-surface)", borderTop: "1px solid var(--color-outline-variant)" }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0 px-6 sm:px-10 md:px-12 max-w-7xl mx-auto">
        <span
          className="font-bold uppercase"
          style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "16px", letterSpacing: "0.08em", color: "var(--color-on-surface)" }}
        >
          {siteConfig.name}
        </span>

        <div className="flex gap-8 md:gap-12">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="uppercase transition-colors hover:text-[var(--color-primary)]"
              style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "10px", letterSpacing: "0.2em", color: "var(--color-secondary)", textDecoration: "none" }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div
          className="uppercase text-center md:text-right"
          style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "9px", letterSpacing: "0.2em", color: "var(--color-outline)" }}
        >
          {siteConfig.copyright}
        </div>
      </div>
    </footer>
  );
}
