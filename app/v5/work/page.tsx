"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const fade = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.25, 0.1, 0, 1] },
  }),
};

const projects = [
  {
    name: "Solid State Lights",
    type: "LED Lighting · Website Design",
    url: "https://solidstatelights.in",
    color: "#1C1C1C",
    desc: "Complete website for a Delhi-based LED lighting manufacturer. Product showcase, dealer network, and lead generation — designed to build trust with B2B buyers.",
    scope: ["Custom design", "Product catalog", "Contact forms", "Mobile responsive", "SEO"],
  },
  {
    name: "ClearMyChallan",
    type: "Traffic Platform · Web Application",
    url: "https://clearmychallan.com",
    color: "#0F1923",
    desc: "Web platform for checking and resolving traffic challans across India. Clean interface focused on usability — users need quick answers, not distractions.",
    scope: ["Web application", "Search system", "Payment integration", "Mobile-first", "Performance"],
  },
];

const categories = [
  "Restaurant", "Gym & Fitness", "Healthcare", "E-Commerce", "Real Estate",
  "Education", "Travel", "SaaS & Startups", "Portfolio", "Business",
  "NGO", "Events", "Blog & News", "Landing Pages", "Custom Apps",
];

export default function WorkPage() {
  return (
    <main>
      <div className="v5-page-header">
        <motion.p className="v5-label" custom={0} variants={fade} initial="hidden" animate="visible">Work</motion.p>
        <motion.h1 className="v5-serif" custom={1} variants={fade} initial="hidden" animate="visible">
          Projects we&rsquo;re<br />proud of.
        </motion.h1>
        <motion.p className="v5-sans" custom={2} variants={fade} initial="hidden" animate="visible">
          Real projects, real businesses. Every site is designed from scratch — no two look alike.
        </motion.p>
      </div>

      <hr className="v5-rule" style={{ maxWidth: 1280, margin: "0 auto" }} />

      {/* Case studies */}
      <section style={{ padding: "80px 40px", maxWidth: 1280, margin: "0 auto" }}>
        {projects.map((p, i) => (
          <motion.div
            key={i}
            variants={fade} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}
            style={{ marginBottom: i < projects.length - 1 ? 80 : 0 }}
          >
            <a href={p.url} target="_blank" rel="noopener">
              <div style={{
                aspectRatio: "21/9", borderRadius: 16, background: p.color,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "transform 0.5s cubic-bezier(0.25,0.1,0,1)",
                cursor: "pointer",
              }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(0.985)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <span className="v5-serif" style={{ fontSize: 36, color: "#fff", opacity: 0.5, fontStyle: "italic" }}>{p.name}</span>
              </div>
            </a>
            <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <h3 className="v5-sans" style={{ fontSize: 22, fontWeight: 500 }}>{p.name}</h3>
                  <a href={p.url} target="_blank" rel="noopener">
                    <ArrowUpRight size={18} style={{ color: "var(--muted)" }} />
                  </a>
                </div>
                <div className="v5-sans" style={{ fontSize: 14, color: "var(--muted)", marginTop: 4 }}>{p.type}</div>
                <p className="v5-sans" style={{ fontSize: 15, lineHeight: 1.7, color: "var(--muted)", marginTop: 16 }}>{p.desc}</p>
              </div>
              <div>
                <div className="v5-label" style={{ marginBottom: 16 }}>Scope</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {p.scope.map((s, j) => (
                    <span key={j} className="v5-sans" style={{
                      fontSize: 13, padding: "6px 14px", borderRadius: 100,
                      border: "1px solid var(--border)", color: "var(--muted)",
                    }}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      <hr className="v5-rule" style={{ maxWidth: 1280, margin: "0 auto" }} />

      {/* Demo gallery CTA */}
      <section style={{ padding: "100px 40px", maxWidth: 1280, margin: "0 auto" }}>
        <div className="v5-grid-aside">
          <div>
            <p className="v5-label">Demo gallery</p>
            <h2 className="v5-serif" style={{ fontSize: 36, letterSpacing: "-0.02em", marginTop: 20 }}>
              100+ industry<br />demos to browse.
            </h2>
          </div>
          <div>
            <p className="v5-sans" style={{ fontSize: 17, lineHeight: 1.7, color: "var(--muted)", maxWidth: 480 }}>
              Not sure what your website should look like? Browse our demo gallery — Mittal-branded prototypes
              across 15 industries. Find your category, see what&rsquo;s possible, and start a conversation.
            </p>
            <div style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {categories.map((c, i) => (
                <span key={i} className="v5-sans" style={{
                  fontSize: 12, padding: "5px 12px", borderRadius: 100,
                  background: "var(--surface)", color: "var(--muted)",
                }}>{c}</span>
              ))}
            </div>
            <div style={{ marginTop: 32 }}>
              <Link href="/website-gallery" className="v5-btn v5-btn-dark">
                Browse demos <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <hr className="v5-rule" style={{ maxWidth: 1280, margin: "0 auto" }} />

      <section style={{ padding: "100px 40px", maxWidth: 1280, margin: "0 auto", textAlign: "center" }}>
        <h2 className="v5-serif" style={{ fontSize: "clamp(32px, 4vw, 52px)", letterSpacing: "-0.025em" }}>
          Your project could be next.
        </h2>
        <p className="v5-sans" style={{ fontSize: 17, color: "var(--muted)", marginTop: 16, maxWidth: 400, marginInline: "auto" }}>
          Tell us what you&rsquo;re building. We&rsquo;ll tell you how we&rsquo;d approach it.
        </p>
        <div style={{ marginTop: 36 }}>
          <a href="https://wa.me/917701903505" className="v5-btn v5-btn-dark">Start a conversation <ArrowRight size={16} /></a>
        </div>
      </section>
    </main>
  );
}
