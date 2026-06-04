import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { BRAND, FAQS } from "@/lib/data";
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

const siteUrl = "https://mittaldev.website";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Website Development Agency in Delhi NCR — MITTAL.WEBSITE | From ₹5,555",
    template: "%s | MITTAL.WEBSITE",
  },
  description:
    "Want to get a website made in Delhi NCR? MITTAL.WEBSITE is a premium web development agency building business websites, landing pages & web apps that convert. Starting from ₹5,555 — free consultation, delivered in 10 days. Serving Delhi, Noida, Gurugram, Ghaziabad, Faridabad & all of India.",
  keywords: [
    "website banwani hai",
    "website kaise banwaye",
    "website banane wale",
    "website development agency Delhi NCR",
    "website designer in Delhi",
    "website development company Noida",
    "website development Gurugram",
    "web development company Delhi NCR",
    "website banwani hai Delhi",
    "get a website made",
    "affordable website design India",
    "business website design",
    "small business website",
    "ecommerce website development",
    "landing page design",
    "custom web application",
    "web developer for hire Delhi NCR",
    "website design price India",
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
  alternates: { canonical: "/" },
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
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "MITTAL® DIGITAL",
        alternateName: "mittal.website",
        url: siteUrl,
        slogan: BRAND.tagline,
        email: BRAND.email,
        telephone: BRAND.phone,
        sameAs: [BRAND.whatsapp],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "MITTAL® DIGITAL",
        inLanguage: "en-IN",
        publisher: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#service`,
        name: "MITTAL® DIGITAL",
        description:
          "Premium web development agency building websites, landing pages and custom web apps that help businesses attract customers and convert.",
        url: siteUrl,
        email: BRAND.email,
        telephone: BRAND.phone,
        priceRange: "₹₹",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Delhi",
          addressRegion: "Delhi NCR",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Delhi" },
          { "@type": "City", name: "Noida" },
          { "@type": "City", name: "Gurugram" },
          { "@type": "City", name: "Ghaziabad" },
          { "@type": "City", name: "Faridabad" },
          { "@type": "Country", name: "India" },
        ],
        founder: { "@type": "Person", name: "Shubham Mittal" },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: BRAND.phone,
          email: BRAND.email,
          contactType: "sales",
          availableLanguage: ["English", "Hindi"],
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/#faq`,
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
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
