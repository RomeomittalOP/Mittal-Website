"use client";

import Image from "next/image";
import { Quote, ArrowRight, MessageCircle, BadgeCheck } from "lucide-react";
import { BRAND } from "@/lib/data";
import Reveal from "./Reveal";

const values = [
  "Strategy-first websites",
  "Obsessive attention to detail",
  "Built to convert, not just look good",
];

export default function Founder() {
  return (
    <section id="founder" className="py-24">
      <div className="container-px grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Portrait */}
        <Reveal className="order-1 lg:order-none">
          <div className="relative mx-auto w-full max-w-md">
            {/* glow + ring */}
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-white/[0.06] blur-3xl" />
            <div className="absolute inset-0 -z-10 translate-x-4 translate-y-4 rounded-3xl border border-white/10" />

            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#181820] to-[#0b0b0d]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
                {/* premium spotlight behind subject */}
                <div className="absolute inset-0 bg-[radial-gradient(58%_44%_at_50%_26%,rgba(255,255,255,0.13),transparent_70%)]" />
                <Image
                  src="/shubham.png"
                  alt="Shubham Mittal — Founder & Brand Ambassador, MITTAL.WEBSITE"
                  fill
                  sizes="(max-width: 768px) 90vw, 420px"
                  className="object-contain object-bottom transition-transform duration-700 group-hover:scale-[1.03]"
                  priority
                />
                {/* floor fade + name plate */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0b0b0d] via-[#0b0b0d]/70 to-transparent p-5 pt-16">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-xl font-semibold text-white">
                      Shubham Mittal
                    </span>
                    <BadgeCheck size={18} className="text-white/80" />
                  </div>
                  <p className="text-xs uppercase tracking-[0.18em] text-white/55">
                    Founder &amp; Brand Ambassador
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Text */}
        <div>
          <Reveal>
            <span className="eyebrow">Behind The Brand</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Meet <span className="gradient-text">Shubham Mittal</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg leading-relaxed text-white/65">
              The founder and face of MITTAL.WEBSITE — on a mission to turn ambitious businesses
              into premium online brands. Every project is treated like our own: strategic,
              polished, and built to actually grow your business.
            </p>
          </Reveal>

          <ul className="mt-7 space-y-3">
            {values.map((v, i) => (
              <Reveal key={v} delay={0.15 + i * 0.05}>
                <li className="flex items-center gap-3 text-white/80">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-soft">
                    <BadgeCheck size={14} className="text-white" />
                  </span>
                  {v}
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.3}>
            <figure className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <Quote size={22} className="text-white/40" />
              <blockquote className="mt-2 text-base italic leading-relaxed text-white/75">
                &ldquo;Your business deserves a website that works 24/7 for you — not just a
                template that sits there.&rdquo;
              </blockquote>
            </figure>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#contact" className="btn-primary group">
                Work With Shubham
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={BRAND.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <MessageCircle size={16} />
                Message on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
