import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — Transparent Fixed Pricing for Web Development",
  description:
    "Starter Website ₹5,555 (market ~₹15K). Business Website ₹9,999 (market ~₹30K). E-Commerce from ₹14,999 (market ~₹50K). Fixed pricing, no hidden charges, 50/50 payment, 100% ownership. MITTAL.WEBSITE Delhi NCR.",
  openGraph: {
    title: "Web Development Pricing — MITTAL.WEBSITE | Honest & Fixed",
    description: "From ₹5,555. Fixed pricing against market rates. No hidden charges. Full ownership.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
