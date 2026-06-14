"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Send, CheckCircle2, MessageCircle, Loader2 } from "lucide-react";
import { BRAND } from "@/lib/data";

type Props = {
  open: boolean;
  demoName: string;
  onClose: () => void;
};

type Status = "idle" | "loading" | "success" | "error";

export default function InquiryModal({ open, demoName, onClose }: Props) {
  const [status, setStatus] = useState<Status>("idle");

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  // Reset state when modal reopens with a different demo
  useEffect(() => {
    if (open) setStatus("idle");
  }, [open, demoName]);

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/35 outline-none transition-colors focus:border-white/40 focus:bg-white/[0.07]";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const payload = {
      name: data.name,
      phone: data.phone,
      email: data.email || `${data.phone}@whatsapp`,
      requirements: `Interested in demo: "${demoName}". Notes: ${data.notes || "(none)"}`,
      business: demoName,
    };
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/12 bg-[#0f0f12] p-6 shadow-2xl sm:p-8"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full p-2 text-white/55 transition-colors hover:bg-white/5 hover:text-white"
            >
              <X size={18} />
            </button>

            {status === "success" ? (
              <div className="flex flex-col items-center py-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 220, damping: 14 }}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-white"
                >
                  <CheckCircle2 size={34} className="text-black" />
                </motion.div>
                <h3 className="mt-5 font-display text-2xl font-semibold text-white">
                  Request received!
                </h3>
                <p className="mt-2 max-w-sm text-sm text-white/60">
                  We&apos;ll reach out within 24 hours about{" "}
                  <span className="font-semibold text-white">{demoName}</span> and customise it
                  for your business.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={BRAND.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost"
                  >
                    <MessageCircle size={16} />
                    Chat on WhatsApp
                  </a>
                  <button onClick={onClose} className="btn-primary">
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-white/45">
                    Get This Website
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-white">
                    {demoName}
                  </h3>
                  <p className="mt-1 text-sm text-white/55">
                    Tell us about your business — we&apos;ll customise this demo end-to-end and
                    coordinate within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                  <div>
                    <label className="mb-1.5 block text-xs text-white/55">
                      Your Name *
                    </label>
                    <input
                      name="name"
                      required
                      placeholder="Full name"
                      className={inputClass}
                    />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs text-white/55">
                        WhatsApp / Phone *
                      </label>
                      <input
                        name="phone"
                        required
                        placeholder="+91 …"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs text-white/55">
                        Email (optional)
                      </label>
                      <input
                        name="email"
                        type="email"
                        placeholder="you@email.com"
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs text-white/55">
                      Anything specific? (optional)
                    </label>
                    <textarea
                      name="notes"
                      rows={2}
                      placeholder="e.g. 8 product pages, online payments, English+Hindi…"
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-sm text-red-400">
                      Something went wrong. Please WhatsApp us at {BRAND.phoneDisplay}.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-primary mt-2 w-full disabled:opacity-70"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        Request This Website <Send size={16} />
                      </>
                    )}
                  </button>

                  <a
                    href={BRAND.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost mt-1 w-full"
                  >
                    <MessageCircle size={16} />
                    Or chat on WhatsApp
                  </a>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
