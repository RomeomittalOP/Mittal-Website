"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type Props = { value: string; className?: string };

/**
 * Animates the numeric part of a value string (e.g. "10+", "100%", "10 Days")
 * from 0 to its target when scrolled into view. Non-numeric values render as-is.
 */
export default function CountUp({ value, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(value);

  const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);

  useEffect(() => {
    if (!inView || !match) return;
    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr);
    const duration = 1300;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = Math.round(target * eased);
      setDisplay(`${prefix}${current}${suffix}`);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, match]);

  return (
    <span ref={ref} className={className}>
      {match ? display : value}
    </span>
  );
}
