"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { BRAND } from "@/lib/data";

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-[78] flex flex-col items-center gap-3">
      <AnimatePresence>
        {showTop && (
          <motion.button
            key="top"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 10 }}
            className="glass-strong flex h-11 w-11 items-center justify-center rounded-full text-gold transition-colors hover:border-gold/50"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      <a
        href={BRAND.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/30 transition-transform hover:scale-105"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40" />
        <svg viewBox="0 0 32 32" className="relative h-7 w-7 fill-white" aria-hidden>
          <path d="M16.003 3C9.38 3 4 8.38 4 15c0 2.114.553 4.17 1.605 5.99L4 29l8.2-1.57A11.93 11.93 0 0 0 16.003 27C22.626 27 28 21.62 28 15S22.626 3 16.003 3zm0 21.6c-1.79 0-3.54-.48-5.07-1.39l-.36-.21-4.86.93.93-4.74-.24-.38A9.56 9.56 0 0 1 6.4 15c0-5.29 4.31-9.6 9.603-9.6 5.29 0 9.597 4.31 9.597 9.6s-4.307 9.6-9.597 9.6zm5.27-7.19c-.29-.14-1.71-.84-1.97-.94-.26-.1-.45-.14-.64.14-.19.29-.74.94-.91 1.13-.17.19-.33.21-.62.07-.29-.14-1.22-.45-2.32-1.43-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.59.13-.13.29-.33.43-.5.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.55-.88-2.12-.23-.55-.47-.48-.64-.49l-.55-.01c-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.38s1.02 2.76 1.17 2.95c.14.19 2.01 3.07 4.87 4.31.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.12.55-.08 1.71-.7 1.95-1.37.24-.67.24-1.25.17-1.37-.07-.12-.26-.19-.55-.33z" />
        </svg>
      </a>
    </div>
  );
}
