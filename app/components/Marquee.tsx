const ITEMS = ["Design", "Logic", "Branding", "Engineering", "Community", "Movement", "Systems", "Programming"];

/** A slow ticker between the hero and the work index. Decorative. */
export default function Marquee() {
  const row = (
    <div className="marquee-row">
      {ITEMS.map((t, i) => (
        <span key={t} className={i % 2 ? "marquee-outline" : ""}>
          {t}
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden className="marquee-star">
            <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" fill="currentColor" />
          </svg>
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee-track">
        {row}
        {row}
      </div>
    </div>
  );
}
