import { values } from "@/lib/data";

export default function Values() {
  return (
    <section id="about" className="px-6 sm:px-10 md:px-16 lg:px-24 py-20 md:py-32" style={{ background: "#fff" }}>
      <div className="mb-16 md:mb-20">
        <div
          className="uppercase mb-3"
          style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "10px", color: "var(--color-primary)", letterSpacing: "0.3em" }}
        >
          About
        </div>
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold italic"
          style={{ fontFamily: "var(--font-playfair), serif", color: "var(--color-on-surface)", letterSpacing: "-0.02em" }}
        >
          The Designer-Engineer
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-12">
        {values.map((v) => (
          <div key={v.title} className="p-4 group">
            <div className="mb-8">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5">
                {v.title === "Precision Engineering" && (
                  <>
                    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
                  </>
                )}
                {v.title === "Data-Driven Logic" && (
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                )}
                {v.title === "Hybrid Execution" && (
                  <><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></>
                )}
              </svg>
            </div>
            <h4
              className="text-xl md:text-2xl font-bold mb-4 italic"
              style={{ fontFamily: "var(--font-playfair), serif", color: "var(--color-on-surface)" }}
            >
              {v.title}
            </h4>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-secondary)" }}>{v.body}</p>
            <div className="mt-6 w-0 group-hover:w-full h-px transition-all duration-700" style={{ background: "var(--color-primary)" }} />
          </div>
        ))}
      </div>
    </section>
  );
}
