"use client";

import { Palette, PenTool, Code2, Wand2, LineChart, ShieldCheck } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const teams = [
  {
    icon: Palette,
    name: "Brand & Strategy",
    desc: "We start with your goals and audience, then shape a clear direction so the site actually fits your business.",
    tags: ["Brand Direction", "Strategy", "Messaging"],
  },
  {
    icon: PenTool,
    name: "UI/UX Design",
    desc: "Clean, user-first interfaces designed to look expensive and guide visitors towards taking action.",
    tags: ["UI/UX Design", "Wireframing", "Design Systems"],
  },
  {
    icon: Code2,
    name: "Web Development",
    desc: "Fast, modern code on Next.js — websites, web apps and custom systems built to last.",
    tags: ["Next.js", "Full-Stack", "APIs & Integrations"],
  },
  {
    icon: Wand2,
    name: "Motion & Interaction",
    desc: "Subtle animations and micro-interactions that make every scroll feel polished and high-end.",
    tags: ["Motion", "Animation", "Interactions"],
  },
  {
    icon: LineChart,
    name: "SEO & Performance",
    desc: "Technical SEO, fast load times and conversion-focused structure so the site can actually get found.",
    tags: ["SEO", "Performance", "Conversion"],
  },
  {
    icon: ShieldCheck,
    name: "Testing & Support",
    desc: "We test across devices before launch and stay reachable after, so your site keeps running smoothly.",
    tags: ["QA & Testing", "Launch", "Support"],
  },
];

export default function Team() {
  return (
    <section id="team" className="py-24">
      <div className="container-px">
        <SectionHeading
          eyebrow="How We Work"
          title={
            <>
              One Focused Studio, <span className="gradient-text">End To End</span>
            </>
          }
          subtitle="We're a small, hands-on studio — not a faceless agency. The same people take your project from strategy to launch, so nothing gets lost in handoffs and every detail gets attention."
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
