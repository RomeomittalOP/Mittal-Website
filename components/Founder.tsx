"use client";

import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import Reveal from "./Reveal";

export default function Founder() {
  return (
    <section id="founder" className="py-12">
      <div className="container-px">
        <Reveal>
          <div className="mx-auto flex max-w-xl items-center gap-5 rounded-2xl glass px-5 py-5 sm:px-6">
            <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-transparent">
              <Image
                src="/shubham.png"
                alt="Shubham Mittal — Founder & Brand Ambassador, MITTAL.WEBSITE"
                fill
                sizes="72px"
                className="object-cover object-top"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-display text-lg font-semibold text-white">
                  Shubham Mittal
                </span>
                <BadgeCheck size={16} className="text-white/70" />
              </div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-white/50">
                Founder, CEO &amp; Brand Ambassador
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/60">
                Building premium websites that turn businesses into brands.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
