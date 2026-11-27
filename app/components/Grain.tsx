"use client";

import { useEffect } from "react";

// Builds one small tile of fine, monochrome film grain on the client and
// hands it to CSS as --grain. Each noise pixel maps to one device pixel, so
// the grain stays sharp on retina screens, and nothing is downloaded.
export default function Grain() {
  useEffect(() => {
    const size = 192;
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const img = ctx.createImageData(size, size);
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      // Each pixel is a light or dark speck with a roughly Gaussian strength,
      // so the tile textures any colour without shifting its overall tone.
      const g = (Math.random() + Math.random() + Math.random()) / 1.5 - 1;
      d[i] = d[i + 1] = d[i + 2] = g > 0 ? 255 : 0;
      d[i + 3] = Math.min(255, Math.abs(g) * 255);
    }
    ctx.putImageData(img, 0, 0);
    const root = document.documentElement.style;
    root.setProperty("--grain", `url(${c.toDataURL("image/png")})`);
    root.setProperty("--grain-size", `${size / Math.min(window.devicePixelRatio || 1, 3)}px`);
  }, []);
  return null;
}
