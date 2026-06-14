/**
 * Website Showcase Library
 *
 * Every demo is a Mittal-branded mockup labelled "Demo by mittal.website".
 * These are NOT real client projects — they are sample demos to show what
 * we can build for businesses across industries.
 */

export type IndustryGroup =
  | "Business"
  | "E-Commerce"
  | "Portfolio"
  | "Education"
  | "Healthcare"
  | "Startup"
  | "Restaurant"
  | "Real Estate"
  | "Custom";

export type Category = {
  slug: string;
  title: string;
  description: string;
  brand: string; // demo brand name (always Mittal-prefixed)
  industries: IndustryGroup[];
  features: string[];
  // visual: each demo gets a deterministic gradient + accent for variety
  gradient: string;
  accent: string;
};

export const CATEGORIES: Category[] = [
  {
    slug: "e-commerce",
    title: "E-Commerce Website",
    description: "A complete online store that takes orders 24/7 and turns browsers into buyers.",
    brand: "Mittal Store",
    industries: ["E-Commerce", "Startup"],
    features: ["Product Catalog", "Cart & Checkout", "Payment Gateway", "Admin Panel"],
    gradient: "from-rose-500/30 via-fuchsia-500/20 to-indigo-500/30",
    accent: "#f472b6",
  },
  {
    slug: "business",
    title: "Business Website",
    description: "A credibility-first site that makes your business look established and serious.",
    brand: "Mittal Business Solutions",
    industries: ["Business"],
    features: ["About / Services", "Lead Forms", "WhatsApp Integration", "Local SEO"],
    gradient: "from-slate-400/30 via-zinc-500/20 to-slate-700/30",
    accent: "#cbd5e1",
  },
  {
    slug: "portfolio",
    title: "Portfolio Website",
    description: "A standout personal brand for creators, freelancers and professionals.",
    brand: "Mittal Portfolio",
    industries: ["Portfolio"],
    features: ["Case Studies", "Bio & CV", "Contact", "Premium Animations"],
    gradient: "from-amber-400/30 via-orange-500/20 to-rose-500/30",
    accent: "#fbbf24",
  },
  {
    slug: "restaurant",
    title: "Restaurant Website",
    description: "Beautiful menus, online table booking and direct WhatsApp orders.",
    brand: "Mittal Restaurant",
    industries: ["Restaurant", "Business"],
    features: ["Digital Menu", "Table Booking", "WhatsApp Orders", "Google Maps"],
    gradient: "from-red-500/30 via-orange-500/25 to-amber-400/30",
    accent: "#fb923c",
  },
  {
    slug: "real-estate",
    title: "Real Estate Website",
    description: "Listings, virtual tours and qualified buyer enquiries — built to close deals.",
    brand: "Mittal Realty",
    industries: ["Real Estate", "Business"],
    features: ["Property Listings", "Filters", "Enquiry Forms", "WhatsApp"],
    gradient: "from-emerald-500/30 via-teal-500/20 to-cyan-500/30",
    accent: "#34d399",
  },
  {
    slug: "gym-fitness",
    title: "Gym & Fitness Website",
    description: "Classes, trainers, memberships — and a frictionless way to sign people up.",
    brand: "Mittal Fitness",
    industries: ["Business", "Startup"],
    features: ["Class Schedule", "Membership Plans", "Trainer Profiles", "Online Sign-up"],
    gradient: "from-lime-400/30 via-emerald-500/20 to-teal-600/30",
    accent: "#a3e635",
  },
  {
    slug: "healthcare",
    title: "Healthcare / Clinic Website",
    description: "A trustworthy clinic site with doctor profiles and online appointment booking.",
    brand: "Mittal Healthcare",
    industries: ["Healthcare", "Business"],
    features: ["Doctor Profiles", "Online Booking", "Services", "Patient Reviews"],
    gradient: "from-sky-400/30 via-blue-500/20 to-indigo-500/30",
    accent: "#60a5fa",
  },
  {
    slug: "education",
    title: "Education Website",
    description: "Courses, batches and admissions — designed to convert visitors into students.",
    brand: "Mittal Education",
    industries: ["Education", "Business"],
    features: ["Courses", "Batches", "Admissions", "Student Portal"],
    gradient: "from-indigo-500/30 via-violet-500/20 to-fuchsia-500/30",
    accent: "#818cf8",
  },
  {
    slug: "travel",
    title: "Travel Website",
    description: "Packages, itineraries and quick enquiries that fill your booking calendar.",
    brand: "Mittal Travels",
    industries: ["Business", "E-Commerce"],
    features: ["Tour Packages", "Itineraries", "Enquiry Forms", "Gallery"],
    gradient: "from-cyan-400/30 via-sky-500/20 to-blue-600/30",
    accent: "#22d3ee",
  },
  {
    slug: "saas",
    title: "SaaS Website",
    description: "A modern product site for tech startups — built to drive sign-ups and demos.",
    brand: "Mittal SaaS",
    industries: ["Startup", "Custom"],
    features: ["Hero + Features", "Pricing", "Auth & Dashboard", "Stripe-Ready"],
    gradient: "from-violet-500/30 via-purple-500/20 to-fuchsia-600/30",
    accent: "#a78bfa",
  },
  {
    slug: "landing-page",
    title: "Landing Page",
    description: "A high-converting single page built around one campaign and one CTA.",
    brand: "Mittal Launch",
    industries: ["Startup", "Business"],
    features: ["Single Page", "Lead Form", "A/B Ready", "Fast Load"],
    gradient: "from-fuchsia-500/30 via-pink-500/20 to-rose-500/30",
    accent: "#e879f9",
  },
  {
    slug: "blog-news",
    title: "Blog / News Website",
    description: "A clean editorial platform for publishers, creators and media brands.",
    brand: "Mittal News",
    industries: ["Portfolio", "Business"],
    features: ["Categories", "Author Pages", "Search", "Newsletter"],
    gradient: "from-stone-400/30 via-neutral-500/20 to-stone-700/30",
    accent: "#d6d3d1",
  },
  {
    slug: "events",
    title: "Event Website",
    description: "Sell tickets, share schedules and grow your event audience effortlessly.",
    brand: "Mittal Events",
    industries: ["Business", "E-Commerce"],
    features: ["Event Schedule", "Tickets", "Speakers", "RSVP"],
    gradient: "from-yellow-400/30 via-amber-500/20 to-orange-600/30",
    accent: "#facc15",
  },
  {
    slug: "ngo",
    title: "NGO Website",
    description: "A mission-driven site that tells your story and converts visitors into donors.",
    brand: "Mittal NGO",
    industries: ["Business"],
    features: ["Mission & Stories", "Donations", "Volunteer Sign-up", "Reports"],
    gradient: "from-green-500/30 via-emerald-500/20 to-teal-600/30",
    accent: "#4ade80",
  },
  {
    slug: "custom-web-app",
    title: "Custom Web Application",
    description: "Dashboards, CRMs, portals and AI tools — fully custom-built for your workflow.",
    brand: "Mittal App",
    industries: ["Custom", "Startup"],
    features: ["Auth & Roles", "Dashboards", "APIs", "Database"],
    gradient: "from-blue-500/30 via-indigo-500/20 to-violet-700/30",
    accent: "#6366f1",
  },
];

export const INDUSTRY_FILTERS: ("All" | IndustryGroup)[] = [
  "All",
  "Business",
  "E-Commerce",
  "Portfolio",
  "Education",
  "Healthcare",
  "Startup",
  "Restaurant",
  "Real Estate",
  "Custom",
];

/* -----------------------------------------------------------
 * Gallery — 100+ Mittal-branded demo variants for /website-gallery
 * ----------------------------------------------------------- */

export type GalleryItem = {
  id: string; // unique demo id
  title: string; // brand title shown on the card
  category: string; // category title
  categorySlug: string;
  industry: IndustryGroup;
  description: string;
  variant: number; // visual style index for the mockup
  date: string; // ISO — used for "Newest" sort
  popularity: number; // 1-100 — used for "Popular" sort
  gradient: string;
  accent: string;
};

// Per-category demo brand suffixes for variety
const SUFFIXES: Record<string, string[]> = {
  "e-commerce": ["Store", "Bazaar", "Mart", "Shop", "Outlet", "Boutique", "Emporium"],
  business: ["Solutions", "Group", "Enterprises", "Industries", "Corp", "Co.", "Partners"],
  portfolio: ["Studio", "Works", "Folio", "Atelier", "Creates", "Design Co.", "Lab"],
  restaurant: ["Kitchen", "Diner", "Cafe", "Bistro", "Eatery", "Grill", "Treats"],
  "real-estate": ["Realty", "Estates", "Homes", "Properties", "Spaces", "Reside", "Habitat"],
  "gym-fitness": ["Fitness", "Gym", "Strength", "Athletic", "Pulse", "Power", "Studio"],
  healthcare: ["Healthcare", "Clinic", "Care", "Wellness", "Med", "Hospital", "Therapy"],
  education: ["Education", "Academy", "Institute", "School", "Tutors", "Learn", "Campus"],
  travel: ["Travels", "Holidays", "Voyages", "Trips", "Tours", "Explorer", "Journeys"],
  saas: ["SaaS", "Cloud", "Platform", "Workspace", "Suite", "Hub", "Pro"],
  "landing-page": ["Launch", "Pitch", "Promo", "Campaign", "Offer", "Reveal", "Boost"],
  "blog-news": ["News", "Daily", "Times", "Journal", "Post", "Tribune", "Voice"],
  events: ["Events", "Live", "Summit", "Conclave", "Expo", "Fest", "Meet"],
  ngo: ["NGO", "Foundation", "Trust", "Initiative", "Cause", "Outreach", "Hope"],
  "custom-web-app": ["App", "Tools", "CRM", "Dashboard", "Workspace", "AI", "Console"],
};

function makeGallery(): GalleryItem[] {
  const items: GalleryItem[] = [];
  const today = new Date("2026-06-14");
  let demoIndex = 0;

  CATEGORIES.forEach((cat) => {
    const suffixes = SUFFIXES[cat.slug] ?? ["Co."];
    // 7 demos per category → 15 × 7 = 105 demos total
    for (let i = 0; i < 7; i++) {
      const suffix = suffixes[i % suffixes.length];
      // Slight variation in brand names for visual variety
      const tag = i < suffixes.length ? "" : ` 0${i + 1}`;
      const title = `Mittal ${suffix}${tag}`;
      const ageDays = demoIndex * 3; // newer first overall
      const date = new Date(today.getTime() - ageDays * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10);

      items.push({
        id: `${cat.slug}-${i + 1}`,
        title,
        category: cat.title,
        categorySlug: cat.slug,
        industry: cat.industries[0],
        description: cat.description,
        variant: i % 5, // 5 visual mockup layouts
        date,
        popularity: 100 - ((demoIndex * 7) % 90),
        gradient: cat.gradient,
        accent: cat.accent,
      });
      demoIndex++;
    }
  });

  return items;
}

export const GALLERY_ITEMS: GalleryItem[] = makeGallery();
