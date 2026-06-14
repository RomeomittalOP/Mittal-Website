"use client";

import { motion } from "framer-motion";

type Props = {
  brand: string;
  category: string;
  gradient: string;
  accent: string;
  variant?: number; // 0..4 — different mockup layouts
  className?: string;
  hover?: boolean;
};

/**
 * A mini browser-window mockup that visually represents a built website.
 * Every frame includes a `mittal.website` watermark and the Mittal brand.
 */
export default function DemoFrame({
  brand,
  category,
  gradient,
  accent,
  variant = 0,
  className = "",
  hover = true,
}: Props) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f12] ${className}`}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <div className="ml-3 flex-1 truncate rounded-md bg-white/[0.04] px-2 py-0.5 text-[10px] text-white/40">
          mittal.website / demo · {brand.toLowerCase().replace(/\s+/g, "")}
        </div>
      </div>

      {/* Gradient hero band */}
      <div className={`relative aspect-[16/10] bg-gradient-to-br ${gradient}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_60%)]" />

        {/* Brand wordmark in the mock */}
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span
            className="flex h-6 w-6 items-center justify-center rounded-md text-[11px] font-bold text-black"
            style={{ background: accent }}
          >
            M
          </span>
          <span className="font-display text-sm font-semibold text-white drop-shadow">
            {brand}
          </span>
        </div>

        {/* Tiny mock navigation */}
        <div className="absolute right-4 top-4 hidden gap-3 text-[10px] text-white/70 sm:flex">
          <span>Home</span>
          <span>About</span>
          <span>Services</span>
          <span
            className="rounded-full px-2 py-0.5 text-black"
            style={{ background: "white" }}
          >
            Contact
          </span>
        </div>

        {/* Variant-specific mockup content */}
        <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6">
          {variant === 0 && <VariantHero accent={accent} category={category} />}
          {variant === 1 && <VariantGrid accent={accent} />}
          {variant === 2 && <VariantSplit accent={accent} category={category} />}
          {variant === 3 && <VariantDashboard accent={accent} />}
          {variant === 4 && <VariantList accent={accent} />}
        </div>

        {/* Watermark — bottom right */}
        <div className="absolute bottom-2 right-3 select-none text-[9px] font-medium uppercase tracking-[0.16em] text-white/45">
          Demo · mittal.website
        </div>

        {/* Diagonal soft watermark across the mock */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap rotate-[-22deg] text-[2.2rem] font-bold uppercase tracking-[0.4em] text-white/[0.05] sm:text-[3rem]"
        >
          mittal.website
        </span>

        {hover && (
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black/30 transition"
          />
        )}
      </div>
    </div>
  );
}

/* -------- Variant mock layouts -------- */

function VariantHero({ accent, category }: { accent: string; category: string }) {
  return (
    <div className="space-y-2">
      <div className="h-1.5 w-1/3 rounded bg-white/30" />
      <div className="h-3 w-2/3 rounded bg-white/85" />
      <div className="h-2 w-1/2 rounded bg-white/40" />
      <div className="mt-2 flex gap-1.5">
        <div className="h-5 w-16 rounded-full" style={{ background: accent }} />
        <div className="h-5 w-12 rounded-full border border-white/40" />
      </div>
      <div className="absolute -top-1 right-0 hidden text-[8px] uppercase tracking-wider text-white/55 sm:block">
        {category}
      </div>
    </div>
  );
}

function VariantGrid({ accent }: { accent: string }) {
  return (
    <div className="grid grid-cols-3 gap-1.5">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="aspect-square rounded bg-white/15"
          style={i === 0 ? { background: accent, opacity: 0.55 } : undefined}
        />
      ))}
    </div>
  );
}

function VariantSplit({ accent, category }: { accent: string; category: string }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="space-y-1.5">
        <div className="h-2 w-3/4 rounded bg-white/80" />
        <div className="h-1.5 w-2/3 rounded bg-white/50" />
        <div className="h-1.5 w-1/2 rounded bg-white/40" />
        <div
          className="mt-1 h-4 w-14 rounded-full text-center text-[8px] leading-4 text-black"
          style={{ background: accent }}
        >
          {category.split(" ")[0]}
        </div>
      </div>
      <div className="rounded bg-white/15" />
    </div>
  );
}

function VariantDashboard({ accent }: { accent: string }) {
  return (
    <div className="space-y-1.5">
      <div className="grid grid-cols-3 gap-1.5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded bg-white/[0.08] px-1.5 py-1">
            <div className="h-1 w-2/3 rounded bg-white/40" />
            <div
              className="mt-1 h-2 w-1/2 rounded"
              style={{ background: i === 1 ? accent : "rgba(255,255,255,0.7)" }}
            />
          </div>
        ))}
      </div>
      <div className="flex items-end gap-1">
        {[40, 65, 30, 80, 55, 70, 90].map((h, i) => (
          <div
            key={i}
            className="w-2 rounded-sm"
            style={{ height: `${h * 0.18}px`, background: accent, opacity: 0.7 }}
          />
        ))}
      </div>
    </div>
  );
}

function VariantList({ accent }: { accent: string }) {
  return (
    <div className="space-y-1.5">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-center gap-2 rounded bg-white/[0.06] p-1.5">
          <div
            className="h-4 w-4 shrink-0 rounded"
            style={{ background: i === 0 ? accent : "rgba(255,255,255,0.25)" }}
          />
          <div className="flex-1 space-y-0.5">
            <div className="h-1.5 w-2/3 rounded bg-white/60" />
            <div className="h-1 w-1/2 rounded bg-white/35" />
          </div>
        </div>
      ))}
    </div>
  );
}
