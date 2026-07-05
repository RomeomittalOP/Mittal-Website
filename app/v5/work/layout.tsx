import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work — Portfolio & Case Studies",
  description:
    "See our work — custom websites built for real businesses. Solid State Lights, ClearMyChallan, and 100+ industry demos across 15 categories. Every project designed from scratch by MITTAL.WEBSITE.",
  openGraph: {
    title: "Our Work — MITTAL.WEBSITE Portfolio & Case Studies",
    description: "Custom websites for real businesses. Browse case studies and 100+ industry demos.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
