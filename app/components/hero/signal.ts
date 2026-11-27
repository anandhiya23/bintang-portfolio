// Shared, mutable state between the hero's DOM layer (pointer, lens, scroll)
// and the particle canvas. Kept outside React state so per-frame updates never
// trigger re-renders.
export type Pulse = { x: number; y: number; t: number };

export type HeroSignal = {
  /** Pointer position in hero-local CSS pixels. */
  px: number;
  py: number;
  /** Smoothed pointer velocity, CSS px per frame. */
  pvx: number;
  pvy: number;
  /** True while a pointer is over (or touching) the hero. */
  active: boolean;
  /** Logic-lens centre and radius, hero-local CSS pixels. */
  lx: number;
  ly: number;
  lr: number;
  /** Click / tap shockwaves. */
  pulses: Pulse[];
  /** 0 when the hero is fully in view, 1 once it has scrolled away. */
  scroll: number;
  /** Set when something changed and a static (reduced-motion) frame must redraw. */
  dirty: boolean;
};

export function createSignal(): HeroSignal {
  return {
    px: -9999,
    py: -9999,
    pvx: 0,
    pvy: 0,
    active: false,
    lx: -9999,
    ly: -9999,
    lr: 0,
    pulses: [],
    scroll: 0,
    dirty: true,
  };
}
