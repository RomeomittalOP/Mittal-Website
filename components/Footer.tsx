import Image from "next/image";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { NAV_LINKS, BRAND } from "@/lib/data";

const socials = [
  { icon: MessageCircle, label: "WhatsApp", href: BRAND.whatsapp },
  { icon: Mail, label: "Email", href: `mailto:${BRAND.email}` },
  { icon: Phone, label: "Call", href: `tel:${BRAND.phone}` },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 pb-10 pt-16">
      <div className="container-px">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="max-w-sm">
            <Image
              src="/logo.png"
              alt="MITTAL.WEBSITE"
              width={150}
              height={150}
              className="h-auto w-[130px] rounded-lg"
            />
            <p className="mt-3 text-xs uppercase tracking-[0.25em] text-white/35">
              {BRAND.poweredBy}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/55">
              {BRAND.tagline} Websites, e-commerce stores and custom web apps built for growth.
            </p>
            <p className="mt-3 text-xs leading-relaxed text-white/40">
              Website development agency serving Delhi NCR — Delhi, Noida, Gurugram, Ghaziabad &amp;
              Faridabad — and clients across India.
            </p>

            <div className="mt-5 space-y-2 text-sm">
              <a
                href={`tel:${BRAND.phone}`}
                className="flex items-center gap-2 text-white/70 transition-colors hover:text-gold"
              >
                <Phone size={15} className="text-gold" />
                {BRAND.phoneDisplay}
              </a>
              <a
                href={`mailto:${BRAND.email}`}
                className="flex items-center gap-2 text-white/70 transition-colors hover:text-gold"
              >
                <Mail size={15} className="text-gold" />
                {BRAND.email}
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-6 md:items-end">
            <nav className="flex flex-wrap gap-x-6 gap-y-2 md:justify-end">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/55 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/60 transition-all hover:border-white/30 hover:text-white"
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} MITTAL.WEBSITE. All rights reserved.</p>
          <p>
            Built with Next.js, Tailwind &amp; Framer Motion ·{" "}
            <a href={`mailto:${BRAND.email}`} className="hover:text-white">
              {BRAND.email}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
