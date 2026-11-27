"use client";

import { useEffect } from "react";

// Builds two small tiles of fine, monochrome film grain on the client and
// hands them to CSS as --grain-a / --grain-b. The tiles have prime sizes and
// are layered, so their pattern only lines up again after tens of thousands of
// pixels and no repeat is visible. Each noise pixel maps to one device pixel,
// so the grain stays sharp on retina screens, and nothing is downloaded.
function tile(size: number) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d");
  if (!ctx) return null;
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
  return c.toDataURL("image/png");
}

export default function Grain() {
  useEffect(() => {
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    const root = document.documentElement.style;
    for (const [name, size] of [["a", 241], ["b", 179]] as const) {
      const url = tile(size);
      if (!url) return;
      root.setProperty(`--grain-${name}`, `url(${url})`);
      root.setProperty(`--grain-${name}-size`, `${size / dpr}px`);
    }
  }, []);
  return null;
}
