"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { ReactNode } from "react";

type Props = { children: ReactNode; className?: string; max?: number };

export default function Tilt({ children, className = "", max = 7 }: Props) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [max, -max]), {
    stiffness: 150,
    damping: 15,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-max, max]), {
    stiffness: 150,
    damping: 15,
  });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`[perspective:1100px] ${className}`}
    >
      <motion.div style={{ rotateX, rotateY }} className="h-full [transform-style:preserve-3d]">
        {children}
      </motion.div>
    </div>
  );
}
