"use client";

import { motion } from "framer-motion";

const blobs = [
  {
    className: "left-[-10%] top-[-5%] h-[42rem] w-[42rem]",
    color: "rgba(255,255,255,0.06)",
    animate: { x: [0, 80, -40, 0], y: [0, 60, 120, 0], scale: [1, 1.15, 0.95, 1] },
    duration: 24,
  },
  {
    className: "right-[-12%] top-[10%] h-[38rem] w-[38rem]",
    color: "rgba(174,182,204,0.05)",
    animate: { x: [0, -70, 30, 0], y: [0, 80, -30, 0], scale: [1, 1.1, 1.2, 1] },
    duration: 28,
  },
  {
    className: "left-[28%] bottom-[-15%] h-[40rem] w-[40rem]",
    color: "rgba(255,255,255,0.04)",
    animate: { x: [0, 60, -60, 0], y: [0, -50, 30, 0], scale: [1, 1.25, 1, 1] },
    duration: 32,
  },
];

export default function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-[120px] ${b.className}`}
          style={{ background: `radial-gradient(circle, ${b.color}, transparent 65%)` }}
          animate={b.animate}
          transition={{ duration: b.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
