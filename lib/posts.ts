export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO date
  readTime: string;
  keywords: string[];
  content: PostBlock[];
};

export const POSTS: Post[] = [
  {
    slug: "website-banwani-hai-guide",
    title: "Website Banwani Hai? Here's Exactly How to Get Started in 2026",
    description:
      "Thinking 'website banwani hai' but don't know where to begin? This simple 2026 guide explains the steps, costs and what to look for when getting a website made in India.",
    date: "2026-05-20",
    readTime: "5 min read",
    keywords: ["website banwani hai", "get a website made", "website kaise banwaye"],
    content: [
      {
        type: "p",
        text: "If you've been telling yourself \"website banwani hai\" for months but keep putting it off, you're not alone. Most business owners overthink it. The truth is, getting a professional website made in 2026 is simpler, faster and more affordable than ever — if you follow the right steps.",
      },
      { type: "h2", text: "Step 1 — Get clear on your goal" },
      {
        type: "p",
        text: "Before anything, decide what the website should DO for you: get more leads, take online orders, build credibility, or showcase your work. A good agency will plan the entire site around that single goal so it actually grows your business instead of just sitting there.",
      },
      { type: "h2", text: "Step 2 — Choose the right type of website" },
      {
        type: "ul",
        items: [
          "Business website — for local businesses, startups and service providers",
          "Landing page — for ads and marketing campaigns",
          "Ecommerce store — to sell products online",
          "Web app / portal — for custom systems, dashboards and logins",
        ],
      },
      { type: "h2", text: "Step 3 — Understand the cost" },
      {
        type: "p",
        text: "In India, a clean professional website can start from as little as ₹5,555, while a more advanced business site is around ₹9,999 and e-commerce stores from ₹14,999. Price mainly depends on the number of pages, design complexity, and features like SEO, payments or custom integrations. Always ask for a clear, fixed quote upfront — no hidden charges.",
      },
      { type: "h2", text: "Step 4 — Register your project and let the team handle it" },
      {
        type: "p",
        text: "Once you've picked a team, the rest is easy. At MITTAL.WEBSITE, you simply register your project, our team coordinates with you within 24 hours, and your premium website is usually delivered within 10 days — design, development, testing and launch included.",
      },
      {
        type: "p",
        text: "Ready to stop saying \"website banwani hai\" and actually get it done? Book a free consultation and we'll map out the perfect website for your business.",
      },
    ],
  },
  {
    slug: "website-cost-in-india-2026",
    title: "How Much Does a Website Cost in India in 2026?",
    description:
      "A clear, no-jargon breakdown of website pricing in India in 2026 — from ₹5,555 starter sites to business websites, e-commerce stores and custom web apps — and what actually affects the cost.",
    date: "2026-05-26",
    readTime: "6 min read",
    keywords: ["website cost in india", "website design price", "how much does a website cost"],
    content: [
      {
        type: "p",
        text: "\"How much does a website cost?\" is the first question every business owner asks — and the honest answer is: it depends on what you need. Here's a transparent breakdown of real website pricing in India in 2026.",
      },
      { type: "h2", text: "Starter & business websites — ₹5,555 to ₹9,999" },
      {
        type: "p",
        text: "Perfect for new businesses, professionals, manufacturers and local brands. You get a clean, responsive design, lead-generation setup, WhatsApp integration, contact forms and an SEO-friendly structure — everything you need to look established and start getting enquiries, at a fraction of typical agency rates.",
      },
      { type: "h2", text: "E-commerce websites — from ₹14,999" },
      {
        type: "p",
        text: "For product businesses that want to sell online: a full product catalog, filters, shopping cart, payment gateway integration and an admin panel — a complete store that takes orders 24/7.",
      },
      { type: "h2", text: "Custom web apps & software — custom pricing" },
      {
        type: "p",
        text: "Dashboards, CRMs, automation, authentication and complex features are priced based on scope. These are quoted after a discovery call so you only pay for what you actually need.",
      },
      { type: "h2", text: "What affects the final price?" },
      {
        type: "ul",
        items: [
          "Number of pages and overall design complexity",
          "Custom features (payments, logins, integrations, APIs)",
          "SEO, performance and animation work",
          "Domain, hosting and third-party services (usually billed separately)",
        ],
      },
      {
        type: "p",
        text: "The smartest move is to get a fixed, written quote before any work starts. At MITTAL.WEBSITE we share clear pricing on a free consultation — no surprises, no hidden charges.",
      },
    ],
  },
  {
    slug: "why-business-needs-website-delhi-ncr",
    title: "Why Every Business in Delhi NCR Needs a Website in 2026",
    description:
      "If your Delhi NCR business still relies only on Instagram or word of mouth, you're losing customers. Here's why a professional website is non-negotiable in 2026.",
    date: "2026-06-01",
    readTime: "5 min read",
    keywords: [
      "website for business delhi ncr",
      "website development delhi",
      "small business website",
    ],
    content: [
      {
        type: "p",
        text: "Delhi NCR is one of the most competitive markets in India. Whether you run a restaurant in Noida, a clinic in Gurugram or a startup in Delhi, your customers are searching online before they decide. If you don't show up with a professional website, your competitor does.",
      },
      { type: "h2", text: "1. People judge you in seconds" },
      {
        type: "p",
        text: "A clean, premium website instantly signals that you're serious and trustworthy. A weak or missing online presence does the opposite — no matter how good your actual product or service is.",
      },
      { type: "h2", text: "2. Social media isn't enough" },
      {
        type: "p",
        text: "Instagram and WhatsApp are great, but you don't own them and they aren't built to convert. A website works 24/7, ranks on Google, captures leads, and turns visitors into paying customers — automatically.",
      },
      { type: "h2", text: "3. Google is where buying decisions start" },
      {
        type: "p",
        text: "When someone searches \"best [your service] near me\" in Delhi NCR, a well-built, SEO-optimized website helps you appear and win that customer. No website means you're invisible at the exact moment people are ready to buy.",
      },
      { type: "h2", text: "4. It pays for itself" },
      {
        type: "p",
        text: "A professional website is not an expense — it's a lead-generating asset. Even a few extra customers a month easily cover the one-time cost of building it.",
      },
      {
        type: "p",
        text: "Based in Delhi NCR and ready to grow online? MITTAL.WEBSITE builds premium websites for businesses across Delhi, Noida, Gurugram, Ghaziabad and Faridabad — starting from just ₹5,555. Book a free consultation today.",
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
