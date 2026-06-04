import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { BRAND } from "@/lib/data";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const siteUrl = "https://mittal.website";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MITTAL® DIGITAL — Websites That Make Businesses Look Expensive",
    template: "%s | MITTAL® DIGITAL",
  },
  description:
    "Premium web development agency building websites, landing pages and custom web apps that help businesses attract customers, build trust and convert. Starting from ₹5,555.",
  keywords: [
    "web development agency",
    "website design India",
    "premium website",
    "landing page design",
    "ecommerce website",
    "custom web application",
    "MITTAL DIGITAL",
    "mittal.website",
  ],
  authors: [{ name: "MITTAL® DIGITAL" }],
  creator: "MITTAL® DIGITAL",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "MITTAL® DIGITAL",
    title: "MITTAL® DIGITAL — Websites That Make Businesses Look Expensive",
    description:
      "Premium websites, landing pages and custom web apps built for growth. Designed to convert. Starting from ₹5,555.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MITTAL® DIGITAL — Websites That Make Businesses Look Expensive",
    description:
      "Premium websites, landing pages and custom web apps built for growth. Designed to convert.",
  },
  robots: { index: true, follow: true },
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

  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
