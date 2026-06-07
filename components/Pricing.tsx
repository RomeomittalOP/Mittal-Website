"use client";

import { Check, Sparkles, Info } from "lucide-react";
import { PACKAGES } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Pricing() {
  return (
    <section id="pricing" className="py-24">
      <div className="container-px">
        <SectionHeading
          eyebrow="Our Packages"
          title={
            <>
              Packages, <span className="gradient-text">Built For Growth</span>
            </>
          }
          subtitle="We don't just build websites — we help businesses establish a strong online presence, generate trust and convert visitors into customers. From one-time website builds to ongoing brand growth, pick what fits your stage."
        />

        <div className="mt-14 grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PACKAGES.map((pkg, i) => (
            <Reveal key={pkg.name} delay={(i % 3) * 0.08}>
              <div
                className={`relative flex h-full flex-col rounded-2xl p-7 transition-all duration-500 ${
                  pkg.highlight
                    ? "glass-strong shadow-2xl shadow-white/5 ring-1 ring-white/20"
                    : "card-glow"
                }`}
              >
                {pkg.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent-gradient px-4 py-1 text-xs font-semibold text-ink shadow-lg">
                    <Sparkles size={12} className="mr-1 inline" />
                    {pkg.badge}
                  </span>
                )}

                <h3 className="font-display text-lg font-semibold text-white">{pkg.name}</h3>

                <div className="mt-4">
                  {pkg.marketPrice && (
                    <div className="text-xs text-white/40">
                      Typical market rate{" "}
                      <span className="text-white/45 line-through">{pkg.marketPrice}</span>
                    </div>
                  )}
                  <div className="mt-1 flex items-baseline gap-1.5">
                    {pkg.from && <span className="text-sm text-white/45">From</span>}
                    <span className="font-display text-4xl font-bold gradient-text">{pkg.price}</span>
                    {pkg.priceNote && (
                      <span className="text-sm text-white/50">{pkg.priceNote}</span>
                    )}
                  </div>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-white/55">{pkg.tagline}</p>

                <a
                  href="/#contact"
                  className={pkg.highlight ? "btn-primary mt-6 w-full" : "btn-ghost mt-6 w-full"}
                >
                  {pkg.cta}
                </a>

                <ul className="mt-7 space-y-2.5">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-white/75">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft">
                        <Check size={12} className="text-electric" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                {pkg.note && (
                  <p className="mt-5 flex gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3 text-xs leading-relaxed text-white/50">
                    <Info size={14} className="mt-0.5 shrink-0 text-white/40" />
                    {pkg.note}
                  </p>
                )}

                {pkg.idealFor && (
                  <p className="mt-auto pt-6 text-xs leading-relaxed text-white/40">
                    <span className="font-semibold uppercase tracking-wider text-white/50">
                      Ideal for:
                    </span>{" "}
                    {pkg.idealFor}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-10 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-4 text-center text-sm text-white/55">
            <span className="font-semibold text-white/75">Please note:</span> Domain, hosting, paid
            plugins, payment-gateway charges and third-party services are billed separately as per
            your requirements. Every project starts with a free consultation and a clear, fixed
            quote — no hidden costs.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
