"use client";

import { Quote, Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Testimonials() {
  const hasTestimonials = TESTIMONIALS.length > 0;
  const loop = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="overflow-hidden py-24">
      <div className="container-px">
        <SectionHeading
          eyebrow="Testimonials"
          title={
            <>
              Loved By <span className="gradient-text">Founders &amp; Owners</span>
            </>
          }
          subtitle={
            hasTestimonials
              ? "Don't just take our word for it — here's what our clients say."
              : "We let our work speak first. Real client stories are on the way — your business could be one of the first we feature."
          }
        />
      </div>

      {hasTestimonials ? (
        <div className="relative mt-14 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max gap-6 animate-marquee hover:[animation-play-state:paused]">
            {loop.map((t, i) => (
              <figure
                key={`${t.name}-${i}`}
                className="glass w-[340px] shrink-0 rounded-2xl p-6 transition-colors duration-300 hover:border-gold/40"
              >
                <div className="flex items-center justify-between">
                  <Quote size={28} className="text-violet/60" />
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} size={14} className="fill-gold text-gold" />
                    ))}
                  </div>
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-white/75">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-gradient text-sm font-semibold text-ink">
                    {t.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-white">{t.name}</span>
                    <span className="block text-xs text-white/50">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      ) : (
        <div className="container-px mt-12">
          <Reveal>
            <div className="mx-auto flex max-w-xl flex-col items-center gap-4 rounded-2xl glass px-6 py-10 text-center">
              <Quote size={30} className="text-white/30" />
              <p className="text-base leading-relaxed text-white/65">
                Work with us and your story goes here. We&apos;re selective about who we take on —
                and obsessive about results.
              </p>
              <a href="/#contact" className="btn-primary mt-1">
                Start Your Project
              </a>
            </div>
          </Reveal>
        </div>
      )}
    </section>
  );
}
