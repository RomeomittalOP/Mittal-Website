import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Founder-Led Web Design Studio",
  description:
    "Meet Shubham Mittal, founder of MITTAL.WEBSITE — a boutique web design studio in Delhi NCR. Custom websites designed from scratch, honest pricing, direct founder communication. No templates, no middlemen.",
  openGraph: {
    title: "About MITTAL.WEBSITE — Founder-Led Web Design Studio Delhi NCR",
    description: "Boutique web design studio by Shubham Mittal. Custom websites, honest pricing, founder-led.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
