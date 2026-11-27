"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  // Mobile URL bars resize the viewport on scroll; don't re-measure pins for that.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

/** Media query under which scroll choreography runs. Everything else gets the static layout. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger, useGSAP };
