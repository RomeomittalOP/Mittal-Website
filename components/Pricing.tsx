"use client";

import { Check, Sparkles } from "lucide-react";
import { PRICING } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Pricing() {
  return (
    <section id="pricing" className="py-24">
      <div className="container-px">
        <SectionHeading
          eyebrow="Pricing"
          title={
            <>
              Transparent Pricing, <span className="gradient-text">Starting From ₹5,555</span>
            </>
          }
          subtitle="Premium quality without the agency price tag. Choose the package that fits where your business is headed."
        />

        <div className="mt-14 grid items-start gap-6 lg:grid-cols-3">
          {PRICING.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.1}>
              <div
                className={`relative h-full rounded-2xl p-8 transition-all duration-500 ${
                  tier.highlight
                    ? "glass-strong shadow-2xl shadow-gold/20 lg:-translate-y-4 lg:scale-[1.03]"
                    : "card-glow"
                }`}
              >
                {tier.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent-gradient px-4 py-1 text-xs font-semibold text-ink shadow-lg">
                    <Sparkles size={12} className="mr-1 inline" />
                    {tier.badge}
                  </span>
                )}

                <h3 className="font-display text-lg font-semibold text-white/90">{tier.name}</h3>
                <p className="mt-2 text-sm text-white/55">{tier.description}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-bold gradient-text">{tier.price}</span>
                  {tier.priceNote && (
                    <span className="text-sm text-white/50">{tier.priceNote}</span>
                  )}
                </div>

                <a
                  href="#contact"
                  className={tier.highlight ? "btn-primary mt-6 w-full" : "btn-ghost mt-6 w-full"}
                >
                  {tier.cta}
                </a>

                <ul className="mt-7 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-white/75">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-soft">
                        <Check size={12} className="text-electric" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-10 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-4 text-center text-sm text-white/55">
            <span className="font-semibold text-white/75">Please note:</span> Domain, Hosting,
            Backend Services, APIs and Third-Party Integrations are charged separately according to
            requirements.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
