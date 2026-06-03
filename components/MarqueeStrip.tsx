"use client";

const phrases = [
  "Designed To Convert",
  "Built For Growth",
  "Premium Websites",
  "Custom Web Apps",
  "10 Day Delivery",
  "Real Results",
];

export default function MarqueeStrip() {
  const loop = [...phrases, ...phrases];

  return (
    <section className="relative overflow-hidden border-y border-white/5 py-10 sm:py-14">
      <div className="flex w-max animate-marquee gap-10 hover:[animation-play-state:paused]">
        {loop.map((p, i) => (
          <div key={`${p}-${i}`} className="flex items-center gap-10">
            <span
              className="select-none whitespace-nowrap font-display text-4xl font-bold uppercase tracking-tight text-transparent sm:text-6xl"
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.22)" }}
            >
              {p}
            </span>
            <span className="text-2xl text-white/25 sm:text-4xl">✦</span>
          </div>
        ))}
      </div>
    </section>
  );
}
