"use client";

import { Clock } from "lucide-react";
import { PROCESS } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Process() {
  return (
    <section id="process" className="py-24">
      <div className="container-px">
        <SectionHeading
          eyebrow="Our Process"
          title={
            <>
              How We <span className="gradient-text">Work</span>
            </>
          }
          subtitle="A clear, proven process that takes you from idea to launch — without the stress."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROCESS.map((step, i) => (
            <Reveal key={step.step} delay={(i % 3) * 0.08}>
              <div className="card-glow group h-full">
                <div className="flex items-center justify-between">
                  <span className="font-display text-4xl font-bold text-white/10 transition-colors duration-500 group-hover:text-white/20">
                    {step.step}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-accent-gradient" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mx-auto mt-10 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm text-white/70">
            <Clock size={16} className="text-gold" />
            Usually Delivered Within <span className="font-semibold text-white">10 Days</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
