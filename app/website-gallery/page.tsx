import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Website Gallery — 100+ Demo Designs",
  description:
    "Browse 100+ Mittal-branded website demos across every industry — e-commerce, business, portfolio, restaurant, real estate, SaaS and more. Pick a design and we'll customise it for your business.",
  alternates: { canonical: "/website-gallery" },
};

export default function WebsiteGalleryPage() {
  return <GalleryClient />;
}
