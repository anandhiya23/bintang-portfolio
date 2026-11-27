import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Shared renderer for the link-preview cards (WhatsApp, LinkedIn, X...).
// Fonts and pre-cropped JPEG covers live in /assets/og so the build never
// has to decode the multi-megabyte originals in /public.

export const OG_SIZE = { width: 1200, height: 630 };

const ORANGE = "#ff5c00";
const INK = "#0f172a";
const PAPER = "#f8fafc";

const asset = (f: string) => readFile(join(process.cwd(), "assets/og", f));
const dataUrl = async (f: string, mime: string) => `data:${mime};base64,${(await asset(f)).toString("base64")}`;

async function fonts() {
  const [tight, mono, serif] = await Promise.all([
    asset("InterTight-ExtraBold.ttf"),
    asset("JetBrainsMono-Medium.ttf"),
    asset("PlayfairDisplay-Italic.ttf"),
  ]);
  return [
    { name: "Tight", data: tight, weight: 800 as const, style: "normal" as const },
    { name: "Mono", data: mono, weight: 500 as const, style: "normal" as const },
    { name: "Serif", data: serif, weight: 400 as const, style: "italic" as const },
  ];
}

const mark = (color: string) => (
  <div style={{ display: "flex", alignItems: "center", fontFamily: "Mono", fontSize: 26, letterSpacing: 3, color }}>
    <span style={{ color: ORANGE, marginRight: 14 }}>{">_"}</span>ANANDHIYA.COM
  </div>
);

export async function homeCard() {
  const portrait = await dataUrl("portrait.png", "image/png");
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: PAPER, padding: "64px 72px" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          {mark(INK)}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "Tight", fontSize: 104, lineHeight: 0.95, color: INK, letterSpacing: -1 }}>BINTANG</div>
            <div style={{ fontFamily: "Tight", fontSize: 104, lineHeight: 0.95, color: INK, letterSpacing: -1 }}>ANANDHIYA</div>
            <div style={{ fontFamily: "Serif", fontStyle: "italic", fontSize: 50, color: ORANGE, marginTop: 22 }}>
              between design &amp; execution.
            </div>
          </div>
          <div style={{ fontFamily: "Mono", fontSize: 22, letterSpacing: 3, color: "#475569" }}>
            DESIGNER-ENGINEER · JAKARTA
          </div>
        </div>
        <div
          style={{
            width: 360,
            height: 502,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            background: ORANGE,
            borderRadius: 28,
            overflow: "hidden",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={portrait} width={368} height={501} style={{ objectFit: "cover" }} alt="" />
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: await fonts() },
  );
}

export async function projectCard(p: { slug: string; name: string; tags: string[]; index: string }) {
  const cover = await dataUrl(`${p.slug}.jpg`, "image/jpeg");
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: INK }}>
        <div
          style={{
            width: 500,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 56px 60px",
          }}
        >
          {mark("#ffffff")}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "Mono", fontSize: 20, letterSpacing: 3, color: ORANGE, marginBottom: 18 }}>
              {`${p.index} / ${p.tags.slice(0, 2).join(" · ").toUpperCase()}`}
            </div>
            <div style={{ fontFamily: "Tight", fontSize: p.name.length > 14 ? 60 : 78, lineHeight: 0.98, color: "#ffffff", letterSpacing: -1 }}>
              {p.name.toUpperCase()}
            </div>
            <div style={{ fontFamily: "Serif", fontStyle: "italic", fontSize: 30, color: "#94a3b8", marginTop: 26 }}>
              by Bintang Anandhiya
            </div>
          </div>
        </div>
        <div style={{ width: 700, height: "100%", display: "flex", padding: "24px 24px 24px 0" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cover} width={676} height={582} style={{ objectFit: "cover", borderRadius: 20 }} alt="" />
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: await fonts() },
  );
}
