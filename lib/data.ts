import {
  Globe,
  Briefcase,
  ShoppingCart,
  Rocket,
  LayoutDashboard,
  Wand2,
  type LucideIcon,
} from "lucide-react";

export const BRAND = {
  name: "MITTAL® DIGITAL",
  poweredBy: "Powered by mittal.website",
  tagline: "Websites That Actually Grow Businesses.",
  email: "shubhammittal1204@gmail.com",
  phone: "+917701903505",
  phoneDisplay: "+91 77019 03505",
  whatsapp: "https://wa.me/917701903505",
  startingPrice: "₹5,555",
};

export const ASSURANCE =
  "Register your project — our team coordinates with you within 24 hours.";

export type NavLink = { label: string; href: string };

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Pricing", href: "#pricing" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export const TRUST_LOGOS: string[] = [
  "Veloura",
  "ACCD",
  "Omega",
  "Vriksh",
  "4 Knotts Stationery",
  "Solid State Lights",
  "ClearMyChallan",
];

export type Stat = { value: string; label: string };

export const STATS: Stat[] = [
  { value: "10+", label: "Projects Delivered" },
  { value: "100%", label: "Client Satisfaction" },
  { value: "10 Days", label: "Average Delivery" },
  { value: "Custom", label: "Tailored Solutions" },
];

export type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
};

export const SERVICES: Service[] = [
  {
    icon: Globe,
    title: "Business Websites",
    description:
      "Polished, fast-loading sites that make local businesses and startups look established and trustworthy from the first scroll.",
    features: ["Conversion-first layout", "Mobile perfect", "Lead capture", "Google-ready"],
  },
  {
    icon: Briefcase,
    title: "Portfolio Websites",
    description:
      "Standout personal brands for creators, freelancers and professionals who want their work to command premium attention.",
    features: ["Bespoke design", "Case study layouts", "Smooth animations", "Personal branding"],
  },
  {
    icon: ShoppingCart,
    title: "Ecommerce Websites",
    description:
      "Online stores engineered to sell — frictionless checkout, product storytelling and a buying experience customers trust.",
    features: ["Product catalog", "Secure checkout", "Payment gateways", "Inventory ready"],
  },
  {
    icon: Rocket,
    title: "Landing Pages",
    description:
      "High-converting landing pages built for ad campaigns and launches, tuned to turn clicks into qualified leads.",
    features: ["A/B ready", "Fast load", "Campaign tracking", "Persuasive copy"],
  },
  {
    icon: LayoutDashboard,
    title: "Web Applications",
    description:
      "Custom dashboards, portals and internal tools with authentication, databases and the workflows your business runs on.",
    features: ["Custom dashboards", "Auth & roles", "Database driven", "Scalable APIs"],
  },
  {
    icon: Wand2,
    title: "Website Redesign",
    description:
      "Transform outdated, slow websites into modern digital experiences that rebuild credibility and grow conversions.",
    features: ["Modern rebuild", "Speed boost", "SEO migration", "Brand refresh"],
  },
];

export type PricingTier = {
  name: string;
  price: string;
  priceNote?: string;
  highlight?: boolean;
  badge?: string;
  description: string;
  features: string[];
  cta: string;
};

export const PRICING: PricingTier[] = [
  {
    name: "Starter Website",
    price: "₹5,555",
    description: "The perfect launchpad for local businesses and new startups.",
    features: [
      "Responsive Design",
      "Up To 5 Pages",
      "Contact Form",
      "Modern UI",
      "Mobile Friendly",
    ],
    cta: "Get Started",
  },
  {
    name: "Business Pro",
    price: "₹11,999",
    highlight: true,
    badge: "Most Popular",
    description: "For growing brands ready to dominate their market online.",
    features: [
      "Everything in Starter",
      "Advanced UI",
      "SEO Setup",
      "Premium Animations",
      "Blog Integration",
      "Performance Optimization",
    ],
    cta: "Get Started",
  },
  {
    name: "Custom Solution",
    price: "Custom",
    priceNote: "Tailored pricing",
    description: "Full-scale web apps, portals and software built around you.",
    features: [
      "Custom Dashboard",
      "Authentication",
      "Database",
      "Admin Panel",
      "APIs & Integrations",
      "Complex Features",
    ],
    cta: "Request Quote",
  },
];

export type Project = {
  name: string;
  category: string;
  summary: string;
  tech: string[];
  gradient: string;
  initials: string;
};

export const PROJECTS: Project[] = [
  {
    name: "Veloura",
    category: "Luxury Brand Website",
    summary:
      "A refined, editorial web presence that positions Veloura as a premium lifestyle label and lifts brand perception.",
    tech: ["Next.js", "Framer Motion", "Tailwind"],
    gradient: "from-violet/40 to-electric/30",
    initials: "VL",
  },
  {
    name: "ACCD",
    category: "Professional Business Website",
    summary:
      "A credibility-first corporate site that communicates expertise and converts visitors into qualified enquiries.",
    tech: ["Next.js", "TypeScript", "SEO"],
    gradient: "from-electric/40 to-violet/30",
    initials: "AC",
  },
  {
    name: "Omega",
    category: "Corporate Presence",
    summary:
      "A bold corporate identity online — clear messaging, strong trust signals and a frictionless contact flow.",
    tech: ["React", "Tailwind", "CMS"],
    gradient: "from-gold/30 to-electric/30",
    initials: "OM",
  },
  {
    name: "Vriksh",
    category: "Environmental Initiative Platform",
    summary:
      "A mission-driven platform that tells an environmental story and drives community sign-ups and engagement.",
    tech: ["Next.js", "Framer Motion", "API"],
    gradient: "from-emerald-400/30 to-electric/30",
    initials: "VR",
  },
  {
    name: "4 Knotts Stationery",
    category: "Premium Stationery Brand",
    summary:
      "A tactile, product-forward brand site that showcases a premium stationery range and grows online sales.",
    tech: ["Ecommerce", "Tailwind", "Payments"],
    gradient: "from-gold/40 to-violet/30",
    initials: "4K",
  },
  {
    name: "Solid State Lights",
    category: "Industrial Product Website",
    summary:
      "A technical yet approachable product site for an LED lighting manufacturer, built to generate B2B leads.",
    tech: ["Next.js", "Node", "Admin"],
    gradient: "from-electric/40 to-gold/30",
    initials: "SS",
  },
  {
    name: "ClearMyChallan",
    category: "Traffic Challan Solution Platform",
    summary:
      "A utility-first web app that helps users resolve traffic challans quickly with a clean, reassuring UX.",
    tech: ["Web App", "Auth", "Database"],
    gradient: "from-violet/40 to-gold/30",
    initials: "CM",
  },
];

export type ProcessStep = { step: string; title: string; description: string };

export const PROCESS: ProcessStep[] = [
  { step: "01", title: "Discovery Call", description: "We learn your business, goals and audience." },
  { step: "02", title: "Planning & Strategy", description: "We map the structure, content and conversion path." },
  { step: "03", title: "Design Approval", description: "You review and sign off on a premium design direction." },
  { step: "04", title: "Development", description: "We build fast, responsive and pixel-perfect." },
  { step: "05", title: "Testing", description: "We test across devices, speed and SEO." },
  { step: "06", title: "Launch", description: "We deploy and hand over a website ready to grow." },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Our new website instantly made us look like the premium brand we always wanted to be. Enquiries jumped within the first week.",
    name: "Aarav Mehta",
    role: "Founder, Veloura",
    initials: "AM",
  },
  {
    quote:
      "They understood our business better than agencies charging 5x more. Clean, fast and delivered exactly on time.",
    name: "Priya Sharma",
    role: "Director, ACCD",
    initials: "PS",
  },
  {
    quote:
      "The redesign completely changed how clients perceive us. We finally have a website that matches our reputation.",
    name: "Rohan Kapoor",
    role: "CEO, Omega",
    initials: "RK",
  },
  {
    quote:
      "From the first call to launch, everything felt effortless. The attention to detail is genuinely world-class.",
    name: "Neha Verma",
    role: "Lead, Vriksh",
    initials: "NV",
  },
  {
    quote:
      "Our ecommerce sales grew noticeably after launch. The buying experience feels smooth and trustworthy.",
    name: "Karan Singh",
    role: "Owner, 4 Knotts Stationery",
    initials: "KS",
  },
  {
    quote:
      "They built us a custom platform that just works. Reliable, responsive and a real partner in our growth.",
    name: "Ananya Iyer",
    role: "Product Head, ClearMyChallan",
    initials: "AI",
  },
];

export type FAQItem = { question: string; answer: string };

export const FAQS: FAQItem[] = [
  {
    question: "How long does a website take?",
    answer:
      "Usually within 10 days depending on complexity. Simple sites can be faster, while custom web apps may take a little longer — we confirm an exact timeline on our discovery call.",
  },
  {
    question: "Do you provide hosting?",
    answer:
      "Hosting can be arranged separately based on your needs. We'll recommend the best, most cost-effective option and can set everything up for you.",
  },
  {
    question: "Do I need a domain?",
    answer:
      "Yes, a domain is required and its cost is separate. If you don't have one yet, we'll help you choose and register the perfect domain for your brand.",
  },
  {
    question: "Do you build custom systems?",
    answer:
      "Yes. We build custom dashboards, portals, authentication, databases and complex web applications tailored precisely to how your business operates.",
  },
  {
    question: "Can you redesign existing websites?",
    answer:
      "Absolutely. We specialise in transforming outdated, slow websites into modern, high-converting digital experiences while preserving your SEO.",
  },
];

export const BUDGET_RANGES = [
  "Under ₹10,000",
  "₹10,000 – ₹25,000",
  "₹25,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000+",
];
