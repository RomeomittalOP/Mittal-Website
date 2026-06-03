"use client";

import { Clock, Phone } from "lucide-react";
import { BRAND } from "@/lib/data";

export default function AnnouncementBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-[75] border-b border-gold/15 bg-[#0b0b0d]/85 backdrop-blur-md">
      <div className="container-px flex h-9 items-center justify-center gap-2 text-center text-[11px] font-medium tracking-wide text-white/70 sm:text-xs">
        <Clock size={13} className="hidden shrink-0 text-gold sm:block" />
        <span>
          <span className="gradient-text font-semibold">Register your project</span> — our team
          coordinates with you within 24 hours.
        </span>
        <a
          href={`tel:${BRAND.phone}`}
          className="ml-1 hidden items-center gap-1 font-semibold text-gold transition-colors hover:text-champagne md:inline-flex"
        >
          <Phone size={12} />
          {BRAND.phoneDisplay}
        </a>
      </div>
    </div>
  );
}
