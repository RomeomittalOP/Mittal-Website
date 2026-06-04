"use client";

import { Palette, PenTool, Code2, Wand2, LineChart, ShieldCheck } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const teams = [
  {
    icon: Palette,
    name: "Creative & Brand Team",
    desc: "Brand strategy, creative direction and visual identity that make your business unforgettable.",
    tags: ["Brand Strategy", "Creative Direction", "Art Direction"],
  },
  {
    icon: PenTool,
    name: "UI/UX Design Team",
    desc: "Pixel-perfect, user-first interfaces crafted to look premium and convert visitors into customers.",
    tags: ["UI/UX Design", "Wireframing", "Design Systems"],
  },
  {
    icon: Code2,
    name: "Development Team",
    desc: "Fast, scalable, modern code — websites, web apps and custom systems built to last.",
    tags: ["Next.js", "Full-Stack", "APIs & Integrations"],
  },
  {
    icon: Wand2,
    name: "Motion & Interaction",
    desc: "Premium animations and micro-interactions that make every scroll feel alive and high-end.",
    tags: ["Motion Design", "Animation", "Interactions"],
  },
  {
    icon: LineChart,
    name: "SEO & Growth Team",
    desc: "Technical SEO, performance tuning and conversion optimization to actually grow your business.",
    tags: ["SEO", "Performance", "Conversion (CRO)"],
  },
  {
    icon: ShieldCheck,
    name: "QA & Support Team",
    desc: "Rigorous testing across devices and ongoing support so your website always just works.",
    tags: ["Quality Assurance", "Testing", "Ongoing Support"],
  },
];

export default function Team() {
  return (
    <section id="team" className="py-24">
      <div className="container-px">
        <SectionHeading
          eyebrow="Our Studio"
          title={
            <>
              A Full Creative Team <span className="gradient-text">Behind Every Project</span>
            </>
          }
          subtitle="We're not a one-person freelancer setup. From brand strategy to launch, a dedicated in-house team of designers, developers and growth experts handles your project end to end."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teams.map((team, i) => (
            <Reveal key={team.name} delay={(i % 3) * 0.08}>
              <div className="card-glow group h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft transition-transform duration-500 group-hover:scale-110">
                  <team.icon size={22} className="text-white" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">{team.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{team.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {team.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-white/55"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
