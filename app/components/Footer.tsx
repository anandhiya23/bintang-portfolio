import { socialLinks, siteConfig } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-12">
        <div className="footer-top">
          <span className="footer-tag">{siteConfig.tagline}</span>
          <nav aria-label="Social" className="footer-links">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <p className="footer-mark" aria-hidden>
          Bintang<span>.</span>
        </p>
        <div className="footer-bottom">
          <span>{siteConfig.name}</span>
          <span>{siteConfig.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
