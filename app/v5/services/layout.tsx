import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — Website Development, E-Commerce, SEO & More",
  description:
    "Custom website development from ₹5,555. Business websites ₹9,999. E-commerce from ₹14,999. Brand growth ₹6,999/mo. SEO from ₹4,999. Fixed pricing, 10-day delivery, 100% ownership. Delhi NCR web design studio.",
  openGraph: {
    title: "Web Development Services — MITTAL.WEBSITE | From ₹5,555",
    description: "Starter ₹5,555 · Business ₹9,999 · E-Commerce from ₹14,999. Fixed pricing, custom design, 10-day delivery.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
