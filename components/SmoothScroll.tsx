"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Buttery-smooth scroll for the whole page.
 * Mounts once at the root, syncs with rAF, and disables on devices that
 * prefer reduced motion or use touch-first scrolling.
 */
export default function SmoothScroll() {
  useEffect(() => {
    // Respect users who prefer reduced motion
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
