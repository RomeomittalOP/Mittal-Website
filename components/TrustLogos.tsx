"use client";

import { TRUST_LOGOS } from "@/lib/data";

export default function TrustLogos() {
  const loop = [...TRUST_LOGOS, ...TRUST_LOGOS];

  return (
    <section className="border-y border-white/10 py-14">
      <div className="container-px">
        <p className="text-center text-xs font-medium uppercase tracking-[0.3em] text-white/40">
          Trusted By Growing Businesses
        </p>

        <div className="relative mt-9 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
          <div className="flex w-max animate-marquee gap-12 hover:[animation-play-state:paused]">
            {loop.map((logo, i) => (
              <span
                key={`${logo}-${i}`}
                className="cursor-default whitespace-nowrap font-display text-xl font-semibold text-white/35 transition-colors duration-300 hover:text-white"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
