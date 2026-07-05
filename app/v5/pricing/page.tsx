"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

const fade = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.25, 0.1, 0, 1] },
  }),
};

const tiers = [
  {
    name: "Starter",
    price: "₹5,555",
    market: "₹15,000",
    features: ["Up to 5 pages", "Responsive design", "Contact form", "WhatsApp integration", "Basic SEO", "Google Analytics", "2 revision rounds"],
  },
  {
    name: "Business",
    price: "₹9,999",
    market: "₹30,000",
    popular: true,
    features: ["10+ custom pages", "Premium animations", "Lead generation setup", "Advanced SEO", "Blog / CMS", "Priority delivery", "2 revision rounds"],
  },
  {
    name: "E-Commerce",
    price: "from ₹14,999",
    market: "₹50,000",
    features: ["Product catalog", "Cart & checkout", "Payment gateway", "Admin panel", "Order management", "Inventory system", "2 revision rounds"],
  },
];

const faqs = [
  { q: "What does 'fixed pricing' mean?", a: "The price we quote is the price you pay. No surprise charges for revisions, meetings, or scope that was already discussed. We agree on scope before starting." },
  { q: "What if I need changes after launch?", a: "Minor tweaks within a week of launch are on us. After that, we offer maintenance at reasonable hourly rates — or you can hire anyone else since you own the code." },
  { q: "Do I really own everything?", a: "Yes. After final payment, you own the code, the domain stays in your name, hosting is your account. We don't hold anything hostage." },
  { q: "What's the payment structure?", a: "50% advance to start. 50% after you review and approve on staging. You never pay the full amount before seeing the final product." },
  { q: "How long does delivery take?", a: "Most projects launch in about 10 business days. Simple sites can be faster, complex apps may take longer — but you always know the timeline before we start." },
  { q: "Can I see my site before it goes live?", a: "Always. You get a staging preview link. You review, request changes (2 rounds included), and approve before anything goes public." },
  { q: "I'm not technical — is that okay?", a: "Absolutely. Most of our clients aren't technical. We handle everything and communicate in plain language on WhatsApp." },
  { q: "Do you do redesigns of existing sites?", a: "Yes. If you have an existing site that isn't working, we can redesign it from scratch. Same pricing applies based on the scope of the new site." },
];

export default function PricingPage() {
  return (
    <main>
      <div className="v5-page-header">
        <motion.p className="v5-label" custom={0} variants={fade} initial="hidden" animate="visible">Pricing</motion.p>
        <motion.h1 className="v5-serif" custom={1} variants={fade} initial="hidden" animate="visible">
          Transparent pricing.<br />No surprises.
        </motion.h1>
        <motion.p className="v5-sans" custom={2} variants={fade} initial="hidden" animate="visible">
          Fixed quotes. Full ownership. Honestly priced against what agencies typically charge.
        </motion.p>
      </div>

      <hr className="v5-rule" style={{ maxWidth: 1280, margin: "0 auto" }} />

      {/* Pricing tiers */}
      <section style={{ padding: "80px 40px", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {tiers.map((t, i) => (
            <motion.div
              key={i}
              variants={fade} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
              style={{
                padding: 36,
                borderRadius: 16,
                border: t.popular ? "2px solid var(--ink)" : "1px solid var(--border)",
                background: t.popular ? "var(--surface)" : "transparent",
                position: "relative",
                display: "flex", flexDirection: "column",
              }}
            >
              {t.popular && (
                <div className="v5-sans" style={{
                  position: "absolute", top: -12, left: 28,
                  background: "var(--ink)", color: "var(--ivory)",
                  padding: "4px 16px", borderRadius: 100, fontSize: 12, fontWeight: 500,
                }}>Most popular</div>
              )}
              <h3 className="v5-serif" style={{ fontSize: 24 }}>{t.name}</h3>
              <div style={{ marginTop: 12, display: "flex", alignItems: "baseline", gap: 12 }}>
                <span className="v5-sans" style={{ fontSize: 36, fontWeight: 600, letterSpacing: "-0.02em" }}>{t.price}</span>
                <span className="v5-sans" style={{ fontSize: 13, color: "var(--muted)", textDecoration: "line-through" }}>~{t.market}</span>
              </div>
              <div style={{ marginTop: 28, flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
                {t.features.map((f, j) => (
                  <div key={j} className="v5-sans" style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14 }}>
                    <Check size={15} style={{ color: "var(--accent)", flexShrink: 0 }} /> {f}
                  </div>
                ))}
              </div>
              <a href="https://wa.me/917701903505" className="v5-btn v5-btn-dark" style={{ marginTop: 28, width: "100%", justifyContent: "center" }}>
                Get started <ArrowRight size={16} />
              </a>
            </motion.div>
          ))}
        </div>
        <div style={{ marginTop: 32, textAlign: "center" }}>
          <Link href="/v5/services" className="v5-link" style={{ justifyContent: "center" }}>
            View all 6 services <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <hr className="v5-rule" style={{ maxWidth: 1280, margin: "0 auto" }} />

      {/* FAQ */}
      <section style={{ padding: "100px 40px", maxWidth: 1280, margin: "0 auto" }}>
        <div className="v5-grid-aside">
          <div>
            <p className="v5-label">FAQ</p>
            <h2 className="v5-serif" style={{ fontSize: 36, letterSpacing: "-0.02em", marginTop: 20 }}>
              Common<br />questions.
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {faqs.map((f, i) => (
              <motion.div
                key={i}
                variants={fade} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}
                style={{ padding: "24px 0", borderBottom: "1px solid var(--border)" }}
              >
                <div className="v5-sans" style={{ fontSize: 16, fontWeight: 500 }}>{f.q}</div>
                <p className="v5-sans" style={{ fontSize: 14, lineHeight: 1.7, color: "var(--muted)", marginTop: 8 }}>{f.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <hr className="v5-rule" style={{ maxWidth: 1280, margin: "0 auto" }} />

      <section style={{ padding: "100px 40px", maxWidth: 1280, margin: "0 auto", textAlign: "center" }}>
        <h2 className="v5-serif" style={{ fontSize: "clamp(32px, 4vw, 52px)", letterSpacing: "-0.025em" }}>
          Still have questions?
        </h2>
        <p className="v5-sans" style={{ fontSize: 17, color: "var(--muted)", marginTop: 16, maxWidth: 400, marginInline: "auto" }}>
          Drop us a message. We reply fast and don&rsquo;t do the hard sell.
        </p>
        <div style={{ marginTop: 36 }}>
          <a href="https://wa.me/917701903505" className="v5-btn v5-btn-dark">WhatsApp us <ArrowRight size={16} /></a>
        </div>
      </section>
    </main>
  );
}
