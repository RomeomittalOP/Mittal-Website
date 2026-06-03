import type { Metadata, Viewport } from "next";
import { BRAND } from "@/lib/data";
import "./globals.css";

const siteUrl = "https://mittal.website";

export const metadata: Metadata = {
metadataBase: new URL(siteUrl),
title: {
default: "MITTAL® DIGITAL — Websites That Make Businesses Look Expensive",
template: "%s | MITTAL® DIGITAL",
},
description:
"Premium web development agency building websites, landing pages and custom web apps that help businesses attract customers, build trust and convert. Starting from ₹5,555.",
};

export const viewport: Viewport = {
themeColor: "#0A0A0B",
width: "device-width",
initialScale: 1,
};

export default function RootLayout({
children,
}: Readonly<{ children: React.ReactNode }>) {
const jsonLd = {
"@context": "https://schema.org",
"@type": "ProfessionalService",
name: "MITTAL® DIGITAL",
alternateName: "mittal.website",
description:
"Premium web development agency building websites, landing pages and custom web apps that help businesses attract customers and convert.",
url: siteUrl,
email: BRAND.email,
telephone: BRAND.phone,
priceRange: "₹₹",
areaServed: "IN",
slogan: BRAND.tagline,
contactPoint: {
"@type": "ContactPoint",
telephone: BRAND.phone,
email: BRAND.email,
contactType: "sales",
availableLanguage: ["English", "Hindi"],
},
sameAs: [BRAND.whatsapp],
};

return ( <html lang="en"> <body className="antialiased">
{children}
<script
type="application/ld+json"
dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/> </body> </html>
);
}
