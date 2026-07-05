"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const fade = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.25, 0.1, 0, 1] },
  }),
};

export default function V5Home() {
  return (
    <main>
      {/* ─── HERO ─── */}
      <section style={{ padding: "140px 40px 120px", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ maxWidth: 920 }}>
          <motion.p className="v5-label" custom={0} variants={fade} initial="hidden" animate="visible">
            Web Design Studio — Delhi NCR
          </motion.p>
          <motion.h1
            className="v5-serif"
            custom={1}
            variants={fade}
            initial="hidden"
            animate="visible"
            style={{
              fontSize: "clamp(50px, 7.5vw, 92px)",
              lineHeight: 1.04,
              letterSpacing: "-0.035em",
              marginTop: 24,
              fontWeight: 400,
            }}
          >
            Websites that feel
            <br />
            like <em>your</em> business,
            <br />
            not a template.
          </motion.h1>
          <motion.p
            className="v5-sans"
            custom={2}
            variants={fade}
            initial="hidden"
            animate="visible"
            style={{ fontSize: 18, lineHeight: 1.7, color: "var(--muted)", maxWidth: 500, marginTop: 36 }}
          >
            Founder-led studio. Fixed pricing from ₹5,555.
            Custom design, real ownership, launched in 10 days.
          </motion.p>
          <motion.div custom={3} variants={fade} initial="hidden" animate="visible" style={{ marginTop: 44, display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a href="https://wa.me/917701903505" className="v5-btn v5-btn-dark">
              Start your project <ArrowRight size={16} />
            </a>
            <Link href="/v5/work" className="v5-btn v5-btn-outline">
              See our work
            </Link>
          </motion.div>
        </div>
      </section>

      <hr className="v5-rule" style={{ maxWidth: 1280, margin: "0 auto" }} />

      {/* ─── TRUST STRIP ─── */}
      <section style={{ padding: "52px 40px", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 40 }}>
          {[
            { value: "10-day", label: "average delivery" },
            { value: "₹5,555", label: "starting price" },
            { value: "100%", label: "ownership — yours" },
            { value: "Founder-led", label: "direct communication" },
          ].map((s, i) => (
            <motion.div key={i} custom={i} variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="v5-serif" style={{ fontSize: 32, letterSpacing: "-0.02em" }}>{s.value}</div>
              <div className="v5-sans" style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <hr className="v5-rule" style={{ maxWidth: 1280, margin: "0 auto" }} />

      {/* ─── MANIFESTO ─── */}
      <section style={{ padding: "120px 40px", maxWidth: 1280, margin: "0 auto" }}>
        <div className="v5-grid-aside">
          <p className="v5-label" style={{ paddingTop: 8 }}>Our philosophy</p>
          <div>
            <motion.h2
              className="v5-serif"
              variants={fade} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}
              style={{ fontSize: "clamp(32px, 4vw, 52px)", lineHeight: 1.2, letterSpacing: "-0.025em", maxWidth: 700 }}
            >
              Most agencies sell you a theme with your logo on it. We think that&rsquo;s a waste of your money.
            </motion.h2>
            <motion.p
              className="v5-sans"
              variants={fade} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}
              style={{ fontSize: 17, lineHeight: 1.7, color: "var(--muted)", maxWidth: 560, marginTop: 28 }}
            >
              Every business has a different story, a different customer, a different way of earning trust.
              Your website should reflect that — not look like a copy-paste of the last ten sites your agency shipped.
            </motion.p>
            <motion.div variants={fade} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ marginTop: 36 }}>
              <Link href="/v5/about" className="v5-link">
                About our studio <ArrowRight size={15} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <hr className="v5-rule" style={{ maxWidth: 1280, margin: "0 auto" }} />

      {/* ─── SERVICES PREVIEW ─── */}
      <section style={{ padding: "120px 40px", maxWidth: 1280, margin: "0 auto" }}>
        <div className="v5-grid-aside">
          <div>
            <p className="v5-label">What we build</p>
            <h2 className="v5-serif" style={{ fontSize: "clamp(32px, 4vw, 48px)", letterSpacing: "-0.02em", marginTop: 20 }}>
              Services
            </h2>
          </div>
          <div />
        </div>
        <div style={{ marginTop: 48, display: "flex", flexDirection: "column" }}>
          {[
            { title: "Starter Website", price: "₹5,555", desc: "Up to 5 pages, responsive, contact form, WhatsApp, basic SEO." },
            { title: "Business Website", price: "₹9,999", desc: "Premium custom design, lead-gen, SEO structure, animations." },
            { title: "E-Commerce", price: "from ₹14,999", desc: "Product catalog, cart, payments, admin panel, order management." },
            { title: "Custom Solutions", price: "Custom", desc: "AI automation, dashboards, CRM systems, internal tools." },
          ].map((s, i) => (
            <motion.div
              key={i}
              variants={fade} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="v5-service-row"
            >
              <div style={{ flex: 1 }}>
                <span className="v5-serif" style={{ fontSize: 22 }}>{s.title}</span>
                <p className="v5-sans" style={{ fontSize: 14, color: "var(--muted)", marginTop: 4 }}>{s.desc}</p>
              </div>
              <div className="v5-sans" style={{ fontSize: 18, fontWeight: 500, whiteSpace: "nowrap" }}>{s.price}</div>
              <ArrowUpRight size={18} style={{ color: "var(--muted)", flexShrink: 0 }} />
            </motion.div>
          ))}
        </div>
        <div style={{ marginTop: 40 }}>
          <Link href="/v5/services" className="v5-link">
            View all services & pricing <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <hr className="v5-rule" style={{ maxWidth: 1280, margin: "0 auto" }} />

      {/* ─── SELECTED WORK ─── */}
      <section style={{ padding: "120px 40px", maxWidth: 1280, margin: "0 auto" }}>
        <div className="v5-grid-aside">
          <div>
            <p className="v5-label">Selected work</p>
            <h2 className="v5-serif" style={{ fontSize: "clamp(32px, 4vw, 48px)", letterSpacing: "-0.02em", marginTop: 20 }}>
              Projects
            </h2>
          </div>
          <div />
        </div>
        <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          {[
            { name: "Solid State Lights", type: "LED Lighting · Website Design", url: "https://solidstatelights.in", color: "#1C1C1C" },
            { name: "ClearMyChallan", type: "Traffic Platform · Web App", url: "https://clearmychallan.com", color: "#0F1923" },
          ].map((p, i) => (
            <motion.a
              key={i} href={p.url} target="_blank" rel="noopener"
              variants={fade} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="v5-project-card"
            >
              <div style={{
                aspectRatio: "16/10", borderRadius: 12, background: p.color,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "transform 0.5s cubic-bezier(0.25,0.1,0,1)",
              }}>
                <span className="v5-serif" style={{ fontSize: 28, color: "#fff", opacity: 0.6, fontStyle: "italic" }}>{p.name}</span>
              </div>
              <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div className="v5-sans" style={{ fontSize: 16, fontWeight: 500 }}>{p.name}</div>
                  <div className="v5-sans" style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>{p.type}</div>
                </div>
                <ArrowUpRight size={18} style={{ color: "var(--muted)" }} />
              </div>
            </motion.a>
          ))}
        </div>
        <div style={{ marginTop: 48, display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Link href="/v5/work" className="v5-btn v5-btn-outline">
            All projects <ArrowRight size={16} />
          </Link>
          <Link href="/website-gallery" className="v5-link" style={{ padding: "14px 0" }}>
            Browse 100+ demos <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <hr className="v5-rule" style={{ maxWidth: 1280, margin: "0 auto" }} />

      {/* ─── PROCESS ─── */}
      <section style={{ padding: "120px 40px", maxWidth: 1280, margin: "0 auto" }}>
        <div className="v5-grid-aside">
          <div>
            <p className="v5-label">How it works</p>
            <h2 className="v5-serif" style={{ fontSize: 40, letterSpacing: "-0.02em", marginTop: 20 }}>
              Simple process,
              <br />
              no surprises.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px 64px" }}>
            {[
              { num: "01", title: "Discovery call", desc: "15-minute WhatsApp call. We understand your business, goals, and what your website needs to do." },
              { num: "02", title: "Design & build", desc: "Custom design from scratch. Live staging preview. Two revision rounds included." },
              { num: "03", title: "Review & refine", desc: "You review on staging. We refine until you're happy. You approve before launch." },
              { num: "04", title: "Launch & handoff", desc: "Site goes live. You own everything — code, hosting, accounts. 100% yours." },
            ].map((s, i) => (
              <motion.div key={i} variants={fade} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div className="v5-sans" style={{ fontSize: 12, color: "var(--accent)", fontWeight: 600, letterSpacing: "0.1em" }}>{s.num}</div>
                <div className="v5-sans" style={{ fontSize: 18, fontWeight: 500, marginTop: 12 }}>{s.title}</div>
                <p className="v5-sans" style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.65, marginTop: 8 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <hr className="v5-rule" style={{ maxWidth: 1280, margin: "0 auto" }} />

      {/* ─── FOUNDER ─── */}
      <section style={{ padding: "120px 40px", maxWidth: 1280, margin: "0 auto" }}>
        <div className="v5-grid-aside">
          <p className="v5-label" style={{ paddingTop: 8 }}>The studio</p>
          <div>
            <motion.blockquote
              className="v5-serif"
              variants={fade} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}
              style={{
                fontSize: "clamp(24px, 3.2vw, 40px)", lineHeight: 1.3,
                letterSpacing: "-0.02em", fontStyle: "italic", maxWidth: 640,
                borderLeft: "3px solid var(--accent)", paddingLeft: 32,
              }}
            >
              &ldquo;I started MITTAL.WEBSITE because I was tired of seeing businesses pay ₹30,000 for a theme
              with their logo slapped on. You deserve better than that.&rdquo;
            </motion.blockquote>
            <motion.div
              className="v5-sans"
              variants={fade} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}
              style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 16 }}
            >
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--surface)", overflow: "hidden" }}>
                <Image src="/shubham.png" alt="Shubham Mittal" width={48} height={48} style={{ objectFit: "cover" }} />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 500 }}>Shubham Mittal</div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>Founder & Lead Developer</div>
              </div>
            </motion.div>
            <motion.div variants={fade} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ marginTop: 32 }}>
              <Link href="/v5/about" className="v5-link">
                More about us <ArrowRight size={15} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={{ padding: "120px 40px 140px", maxWidth: 1280, margin: "0 auto", textAlign: "center" }}>
        <motion.p className="v5-label" variants={fade} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          Ready to start?
        </motion.p>
        <motion.h2
          className="v5-serif"
          variants={fade} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}
          style={{ fontSize: "clamp(36px, 5vw, 68px)", letterSpacing: "-0.03em", lineHeight: 1.1, marginTop: 20 }}
        >
          Let&rsquo;s build something
          <br />
          <em>worth visiting.</em>
        </motion.h2>
        <motion.p
          className="v5-sans"
          variants={fade} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}
          style={{ fontSize: 17, color: "var(--muted)", marginTop: 24, maxWidth: 420, marginInline: "auto" }}
        >
          Free consultation. Fixed pricing. No lock-in.
          <br />
          50% advance, 50% on completion.
        </motion.p>
        <motion.div variants={fade} custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ marginTop: 40, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="https://wa.me/917701903505" className="v5-btn v5-btn-dark">
            WhatsApp us <ArrowRight size={16} />
          </a>
          <Link href="/v5/contact" className="v5-btn v5-btn-outline">
            Contact us
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
