/**
 * JAYDEN — AI Website Consultant for Mittal.website
 *
 * Architecture is intentionally pluggable: this file implements a deterministic
 * rule-based consultant today. A future LLM-backed implementation can replace
 * `recommendFromAnswers()` while keeping the same return shape.
 */

import { CATEGORIES, GALLERY_ITEMS, type Category } from "@/lib/showcase";
import { PACKAGES, type Package } from "@/lib/data";

export type BusinessType =
  | "ecommerce"
  | "restaurant"
  | "gym"
  | "portfolio"
  | "clinic"
  | "education"
  | "real-estate"
  | "travel"
  | "saas"
  | "ngo"
  | "events"
  | "blog"
  | "landing"
  | "custom"
  | "business";

export type Goal =
  | "sell-products"
  | "leads"
  | "showcase"
  | "personal-brand"
  | "bookings"
  | "donations";

export type Feature =
  | "payment"
  | "booking"
  | "admin"
  | "blog"
  | "whatsapp"
  | "auth"
  | "catalog"
  | "seo";

export type Timeline = "asap" | "10-days" | "2-3-weeks" | "flexible";
export type Budget = "under-10k" | "10-25k" | "25-50k" | "50-100k" | "100k+" | "custom";

export type Answers = {
  businessType?: BusinessType;
  businessName?: string;
  goal?: Goal;
  hasWebsite?: boolean;
  features?: Feature[];
  timeline?: Timeline;
  budget?: Budget;
};

export type Recommendation = {
  headline: string;
  reasoning: string;
  package: Package; // recommended Mittal package
  features: string[];
  timeline: string;
  budgetRange: string;
  demos: { id: string; title: string; category: string; slug: string }[]; // 3 best gallery picks
};

/* ---------- maps from business → category slug(s) ---------- */

const TYPE_TO_SLUGS: Record<BusinessType, string[]> = {
  ecommerce: ["e-commerce"],
  restaurant: ["restaurant"],
  gym: ["gym-fitness"],
  portfolio: ["portfolio"],
  clinic: ["healthcare"],
  education: ["education"],
  "real-estate": ["real-estate"],
  travel: ["travel"],
  saas: ["saas"],
  ngo: ["ngo"],
  events: ["events"],
  blog: ["blog-news"],
  landing: ["landing-page"],
  custom: ["custom-web-app"],
  business: ["business"],
};

/* ---------- core recommendation ---------- */

export function recommendFromAnswers(a: Answers): Recommendation {
  const slugs = a.businessType ? TYPE_TO_SLUGS[a.businessType] : ["business"];
  const cat: Category =
    CATEGORIES.find((c) => slugs.includes(c.slug)) ?? CATEGORIES[1]; // fallback Business

  // Pick package by signal: budget > features complexity > goal
  let pkg: Package = PACKAGES[0]; // Starter
  const wantsEcom = a.businessType === "ecommerce" || a.goal === "sell-products";
  const wantsApp =
    a.businessType === "saas" ||
    a.businessType === "custom" ||
    (a.features ?? []).includes("auth") ||
    (a.features ?? []).includes("admin");

  if (a.budget === "100k+" || wantsApp) {
    pkg = PACKAGES.find((p) => p.name === "Custom Business Solutions") ?? PACKAGES[5];
  } else if (a.budget === "50-100k" || wantsEcom) {
    pkg = PACKAGES.find((p) => p.name === "E-Commerce Website") ?? PACKAGES[2];
  } else if (
    a.budget === "25-50k" ||
    a.budget === "10-25k" ||
    a.hasWebsite === false ||
    a.goal === "leads"
  ) {
    pkg = PACKAGES.find((p) => p.name === "Business Website") ?? PACKAGES[1];
  } else if (a.budget === "under-10k") {
    pkg = PACKAGES[0]; // Starter
  }

  // Feature pills shown in summary (use chosen + sensible defaults)
  const featureLabels = new Set<string>();
  if (a.features?.includes("payment")) featureLabels.add("Payment Gateway");
  if (a.features?.includes("booking")) featureLabels.add("Booking System");
  if (a.features?.includes("admin")) featureLabels.add("Admin Panel");
  if (a.features?.includes("blog")) featureLabels.add("Blog Integration");
  if (a.features?.includes("whatsapp")) featureLabels.add("WhatsApp Integration");
  if (a.features?.includes("auth")) featureLabels.add("User Login & Roles");
  if (a.features?.includes("catalog")) featureLabels.add("Product Catalog");
  if (a.features?.includes("seo")) featureLabels.add("SEO Foundation");
  // sensible defaults
  featureLabels.add("Mobile-Optimised");
  if (!featureLabels.has("WhatsApp Integration")) featureLabels.add("WhatsApp Integration");

  // Timeline copy
  const timelineCopy =
    a.timeline === "asap"
      ? "Rushed delivery (priority queue)"
      : a.timeline === "10-days"
      ? "Around 10 days"
      : a.timeline === "2-3-weeks"
      ? "2–3 weeks"
      : "Flexible — we'll plan together";

  // Budget range copy — anchor to chosen package
  const budgetCopy =
    pkg.name === "Custom Business Solutions"
      ? "Custom quote — we'll price it after a discovery call"
      : pkg.name === "E-Commerce Website"
      ? "₹14,999 – ₹40,000 depending on features"
      : pkg.name === "Business Website"
      ? "₹9,999 – ₹25,000 depending on scope"
      : "₹5,555 – ₹12,000 depending on pages";

  // 3 gallery demos from the matching category
  const demos = GALLERY_ITEMS.filter((g) => slugs.includes(g.categorySlug))
    .slice(0, 3)
    .map((g) => ({ id: g.id, title: g.title, category: g.category, slug: g.categorySlug }));

  const goalLine =
    a.goal === "sell-products"
      ? "drive online sales"
      : a.goal === "leads"
      ? "generate qualified leads"
      : a.goal === "showcase"
      ? "build credibility and showcase your work"
      : a.goal === "personal-brand"
      ? "establish a strong personal brand"
      : a.goal === "bookings"
      ? "make bookings effortless"
      : a.goal === "donations"
      ? "tell your story and grow donations"
      : "help your business grow online";

  return {
    headline: `${cat.title} → ${pkg.name}`,
    reasoning: `Based on your business, the best fit is our ${pkg.name.toLowerCase()} package built around a ${cat.title.toLowerCase()}. It will ${goalLine}, in your timeline and budget.`,
    package: pkg,
    features: Array.from(featureLabels),
    timeline: timelineCopy,
    budgetRange: budgetCopy,
    demos,
  };
}

/* ---------- shortcut: quick-action business types ---------- */

export const QUICK_ACTIONS: { label: string; businessType: BusinessType }[] = [
  { label: "I need an E-Commerce Website", businessType: "ecommerce" },
  { label: "I own a Restaurant", businessType: "restaurant" },
  { label: "I run a Gym", businessType: "gym" },
  { label: "I need a Portfolio Website", businessType: "portfolio" },
  { label: "I run a Clinic", businessType: "clinic" },
  { label: "I run a Coaching / School", businessType: "education" },
  { label: "I'm a Real Estate Agent", businessType: "real-estate" },
  { label: "I have a SaaS Startup", businessType: "saas" },
  { label: "Just a Business Website", businessType: "business" },
];

/* ---------- common FAQ answers JAYDEN knows ---------- */

export const FAQ_ANSWERS: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["cost", "price", "pricing", "kitne", "kitna", "kharcha", "budget"],
    answer:
      "Our websites start from just ₹5,555 (Starter), ₹9,999 (Business) and ₹14,999 (E-Commerce). Tell me about your business and I'll suggest the right package.",
  },
  {
    keywords: ["time", "long", "days", "kitne din", "timeline", "delivery"],
    answer:
      "Most websites go live in around 10 days. Complex web apps may take 2–3 weeks. We confirm an exact timeline on the discovery call.",
  },
  {
    keywords: ["hosting", "host", "server"],
    answer:
      "Hosting is billed separately — we recommend the best, most cost-effective option for your project and set it up for you.",
  },
  {
    keywords: ["domain"],
    answer:
      "Domain cost is separate. If you don't have one yet, we'll help you pick and register the perfect one for your brand.",
  },
  {
    keywords: ["edit", "update", "change later", "myself"],
    answer:
      "Yes — we can set up an easy admin panel or CMS so you can update content, products and blog posts yourself any time.",
  },
  {
    keywords: ["own", "ownership", "license"],
    answer:
      "You own your website 100% after final payment — no lock-in, no monthly trap. The code and accounts are completely yours.",
  },
  {
    keywords: ["revision", "revise", "change", "iterations"],
    answer:
      "Every package includes 2 design revision rounds, and you'll see a live staging link before the final payment.",
  },
  {
    keywords: ["payment", "milestone", "advance", "installment"],
    answer:
      "Usually 50% advance to start and 50% on completion before launch. For larger projects we agree clear milestones upfront.",
  },
  {
    keywords: ["seo", "google", "rank", "ranking"],
    answer:
      "Every site is built SEO-friendly. We also offer an SEO Foundation package (from ₹4,999) — meta tags, schema, sitemap, technical audit and local SEO setup.",
  },
  {
    keywords: ["who", "founder", "shubham", "owner"],
    answer:
      "Mittal.website is founder-led by Shubham Mittal. You talk directly to the team — not a call center.",
  },
  {
    keywords: ["contact", "whatsapp", "call", "phone", "email"],
    answer:
      "You can reach us anytime on WhatsApp at +91 77019 03505 or email contact@mittaldev.website. I can also share your details with the team right here.",
  },
];

export function findFaqAnswer(text: string): string | null {
  const lower = text.toLowerCase();
  for (const f of FAQ_ANSWERS) {
    if (f.keywords.some((k) => lower.includes(k))) return f.answer;
  }
  return null;
}
