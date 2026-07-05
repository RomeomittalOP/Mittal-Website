"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const fade = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.25, 0.1, 0, 1] },
  }),
};

export default function AboutPage() {
  return (
    <main>
      {/* Header */}
      <div className="v5-page-header">
        <motion.p className="v5-label" custom={0} variants={fade} initial="hidden" animate="visible">About</motion.p>
        <motion.h1 className="v5-serif" custom={1} variants={fade} initial="hidden" animate="visible">
          A studio built on<br />one simple belief.
        </motion.h1>
        <motion.p className="v5-sans" custom={2} variants={fade} initial="hidden" animate="visible">
          Your website should be as unique as your business. Not a template. Not a copy-paste.
          Something designed from scratch, for you.
        </motion.p>
      </div>

      <hr className="v5-rule" style={{ maxWidth: 1280, margin: "0 auto" }} />

      {/* Founder section */}
      <section style={{ padding: "100px 40px", maxWidth: 1280, margin: "0 auto" }}>
        <div className="v5-grid-aside">
          <div>
            <div style={{ width: 200, height: 260, borderRadius: 12, overflow: "hidden", background: "var(--surface)" }}>
              <Image src="/shubham.png" alt="Shubham Mittal" width={200} height={260} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
            </div>
          </div>
          <div>
            <p className="v5-label">The founder</p>
            <h2 className="v5-serif" style={{ fontSize: 36, letterSpacing: "-0.02em", marginTop: 16 }}>Shubham Mittal</h2>
            <motion.p
              className="v5-sans"
              variants={fade} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}
              style={{ fontSize: 17, lineHeight: 1.75, color: "var(--muted)", marginTop: 20, maxWidth: 540 }}
            >
              I started MITTAL.WEBSITE after seeing too many businesses overpay for cookie-cutter websites
              that don&rsquo;t convert. Agencies charge ₹30,000–₹50,000 for a theme with a logo swap.
              That didn&rsquo;t sit right with me.
            </motion.p>
            <motion.p
              className="v5-sans"
              variants={fade} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}
              style={{ fontSize: 17, lineHeight: 1.75, color: "var(--muted)", marginTop: 16, maxWidth: 540 }}
            >
              Every project I take on is designed from scratch, priced honestly, and delivered fast.
              You talk directly to me — no account managers, no runaround. I treat your project like
              my own because my name is on it.
            </motion.p>
            <motion.p
              className="v5-sans"
              variants={fade} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}
              style={{ fontSize: 17, lineHeight: 1.75, color: "var(--muted)", marginTop: 16, maxWidth: 540 }}
            >
              Based in Delhi NCR, serving businesses across India — from local shops to funded startups.
            </motion.p>
          </div>
        </div>
      </section>

      <hr className="v5-rule" style={{ maxWidth: 1280, margin: "0 auto" }} />

      {/* Values */}
      <section style={{ padding: "100px 40px", maxWidth: 1280, margin: "0 auto" }}>
        <p className="v5-label">What we stand for</p>
        <h2 className="v5-serif" style={{ fontSize: 40, letterSpacing: "-0.02em", marginTop: 20, marginBottom: 64 }}>Studio values</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 48 }}>
          {[
            { title: "Honest pricing", desc: "Fixed quotes upfront. No hidden charges. No scope creep surprises. You know exactly what you're paying before we write a line of code." },
            { title: "Real ownership", desc: "You own everything — code, domain, hosting accounts. No lock-in, no monthly trap, no 'you can't leave' clauses." },
            { title: "Speed without shortcuts", desc: "Most projects launch in 10 days. We move fast because we're focused — not because we're cutting corners on design or code quality." },
            { title: "Custom, always", desc: "Every site is designed from scratch. Two clients in the same industry never get the same site. Templates are for agencies that don't care." },
            { title: "Direct communication", desc: "You talk to the founder, not an intern. WhatsApp-first — updates, drafts, feedback all happen where you already communicate." },
            { title: "Built to convert", desc: "Pretty websites that don't bring in leads are art projects. Every design decision we make is about turning visitors into customers." },
          ].map((v, i) => (
            <motion.div key={i} variants={fade} custom={i % 3} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="v5-sans" style={{ fontSize: 18, fontWeight: 500 }}>{v.title}</div>
              <p className="v5-sans" style={{ fontSize: 14, lineHeight: 1.7, color: "var(--muted)", marginTop: 10 }}>{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <hr className="v5-rule" style={{ maxWidth: 1280, margin: "0 auto" }} />

      {/* CTA */}
      <section style={{ padding: "100px 40px", maxWidth: 1280, margin: "0 auto", textAlign: "center" }}>
        <h2 className="v5-serif" style={{ fontSize: "clamp(32px, 4vw, 52px)", letterSpacing: "-0.025em" }}>
          Want to work together?
        </h2>
        <p className="v5-sans" style={{ fontSize: 17, color: "var(--muted)", marginTop: 16, maxWidth: 400, marginInline: "auto" }}>
          Free consultation. No commitment. Let&rsquo;s talk about what your business actually needs.
        </p>
        <div style={{ marginTop: 36, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="https://wa.me/917701903505" className="v5-btn v5-btn-dark">
            WhatsApp us <ArrowRight size={16} />
          </a>
          <Link href="/v5/contact" className="v5-btn v5-btn-outline">Contact page</Link>
        </div>
      </section>
    </main>
  );
}
