"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";

const fade = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.25, 0.1, 0, 1] },
  }),
};

const services = [
  {
    title: "Starter Website",
    price: "₹5,555",
    market: "₹15,000",
    desc: "Everything a new business needs to get online — clean, fast, and built to make a strong first impression.",
    features: ["Up to 5 pages", "Fully responsive design", "Contact form + WhatsApp", "Basic SEO setup", "Google Analytics", "2 revision rounds"],
    best: "New businesses, professionals, local shops",
  },
  {
    title: "Business Website",
    price: "₹9,999",
    market: "₹30,000",
    desc: "For businesses that need more than a brochure — lead generation, premium design, and a site that actually converts.",
    features: ["10+ custom pages", "Premium animations", "Lead generation setup", "Advanced SEO structure", "Priority delivery", "CMS for blog/updates"],
    best: "Growing brands, manufacturers, B2B companies",
    popular: true,
  },
  {
    title: "E-Commerce Website",
    price: "from ₹14,999",
    market: "₹50,000",
    desc: "A complete online store — product catalog, payments, order management, and everything you need to sell online.",
    features: ["Product catalog & filters", "Cart & checkout", "Payment gateway integration", "Admin panel", "Order management", "Inventory tracking"],
    best: "Retail, D2C brands, product businesses",
  },
  {
    title: "Brand Growth Package",
    price: "₹6,999/mo",
    market: "₹15,000/mo",
    desc: "Ongoing content and branding that keeps your business visible and your leads flowing month after month.",
    features: ["12 premium creatives/month", "Content strategy", "Brand identity refinement", "WhatsApp lead-gen focus", "Monthly content calendar", "Performance reporting"],
    best: "Brands wanting consistent visibility",
  },
  {
    title: "SEO Foundation",
    price: "from ₹4,999",
    market: "₹12,000",
    desc: "Technical SEO setup that gives your site the best chance to rank. Foundation work — not magic promises.",
    features: ["Meta titles & descriptions", "Schema markup", "XML sitemap", "Technical audit & fixes", "Local SEO setup", "Alt tags & image optimization"],
    best: "Any business that wants to be found on Google",
  },
  {
    title: "Custom Solutions",
    price: "Custom quote",
    market: "",
    desc: "When off-the-shelf doesn't cut it — AI tools, dashboards, CRM systems, internal software, or anything custom.",
    features: ["AI automation & chatbots", "Custom dashboards", "CRM & lead management", "Internal tools", "API integrations", "Dedicated project scoping"],
    best: "Startups, enterprises, unique requirements",
  },
];

export default function ServicesPage() {
  return (
    <main>
      <div className="v5-page-header">
        <motion.p className="v5-label" custom={0} variants={fade} initial="hidden" animate="visible">Services</motion.p>
        <motion.h1 className="v5-serif" custom={1} variants={fade} initial="hidden" animate="visible">
          What we build.
        </motion.h1>
        <motion.p className="v5-sans" custom={2} variants={fade} initial="hidden" animate="visible">
          Fixed pricing, no surprises. Every project is custom-designed from scratch
          and delivered with full ownership.
        </motion.p>
      </div>

      <hr className="v5-rule" style={{ maxWidth: 1280, margin: "0 auto" }} />

      {/* Service cards */}
      <section style={{ padding: "80px 40px", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          {services.map((s, i) => (
            <motion.div
              key={i}
              variants={fade} custom={i % 2} initial="hidden" whileInView="visible" viewport={{ once: true }}
              style={{
                padding: 40,
                borderRadius: 16,
                border: s.popular ? "2px solid var(--ink)" : "1px solid var(--border)",
                background: s.popular ? "var(--surface)" : "transparent",
                position: "relative",
              }}
            >
              {s.popular && (
                <div className="v5-sans" style={{
                  position: "absolute", top: -12, left: 32,
                  background: "var(--ink)", color: "var(--ivory)",
                  padding: "4px 16px", borderRadius: 100, fontSize: 12, fontWeight: 500,
                }}>
                  Most popular
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h3 className="v5-serif" style={{ fontSize: 26 }}>{s.title}</h3>
                  {s.market && (
                    <span className="v5-sans" style={{ fontSize: 12, color: "var(--muted)", textDecoration: "line-through" }}>
                      Market rate ~{s.market}
                    </span>
                  )}
                </div>
                <div className="v5-sans" style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em" }}>{s.price}</div>
              </div>
              <p className="v5-sans" style={{ fontSize: 15, lineHeight: 1.65, color: "var(--muted)", marginTop: 16 }}>{s.desc}</p>
              <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
                {s.features.map((f, j) => (
                  <div key={j} className="v5-sans" style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14 }}>
                    <Check size={15} style={{ color: "var(--accent)", flexShrink: 0 }} />
                    {f}
                  </div>
                ))}
              </div>
              <div className="v5-sans" style={{ marginTop: 20, fontSize: 13, color: "var(--muted)" }}>
                Best for: {s.best}
              </div>
              <a href="https://wa.me/917701903505" className="v5-btn v5-btn-dark" style={{ marginTop: 24, width: "100%", justifyContent: "center" }}>
                Get started <ArrowRight size={16} />
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      <hr className="v5-rule" style={{ maxWidth: 1280, margin: "0 auto" }} />

      {/* What's included */}
      <section style={{ padding: "100px 40px", maxWidth: 1280, margin: "0 auto" }}>
        <div className="v5-grid-aside">
          <div>
            <p className="v5-label">Every project includes</p>
            <h2 className="v5-serif" style={{ fontSize: 36, letterSpacing: "-0.02em", marginTop: 20 }}>
              The basics,<br />done right.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px 48px" }}>
            {[
              { title: "100% ownership", desc: "Code, domain, hosting — all yours after final payment." },
              { title: "Responsive design", desc: "Looks great on every screen size, from phone to desktop." },
              { title: "2 revision rounds", desc: "See it on staging, request changes, approve before launch." },
              { title: "50/50 payment", desc: "50% advance to start. 50% only when you're satisfied." },
              { title: "WhatsApp support", desc: "Direct communication on the platform you already use." },
              { title: "~10 day delivery", desc: "Most projects go live within 10 business days." },
            ].map((item, i) => (
              <motion.div key={i} variants={fade} custom={i % 2} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div className="v5-sans" style={{ fontSize: 16, fontWeight: 500 }}>{item.title}</div>
                <p className="v5-sans" style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6, marginTop: 6 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <hr className="v5-rule" style={{ maxWidth: 1280, margin: "0 auto" }} />

      <section style={{ padding: "100px 40px", maxWidth: 1280, margin: "0 auto", textAlign: "center" }}>
        <h2 className="v5-serif" style={{ fontSize: "clamp(32px, 4vw, 52px)", letterSpacing: "-0.025em" }}>
          Not sure which package?
        </h2>
        <p className="v5-sans" style={{ fontSize: 17, color: "var(--muted)", marginTop: 16, maxWidth: 420, marginInline: "auto" }}>
          Tell us about your business. We&rsquo;ll recommend the right fit — no upselling.
        </p>
        <div style={{ marginTop: 36, display: "flex", gap: 16, justifyContent: "center" }}>
          <a href="https://wa.me/917701903505" className="v5-btn v5-btn-dark">Free consultation <ArrowRight size={16} /></a>
        </div>
      </section>
    </main>
  );
}
