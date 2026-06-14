"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Send,
  CheckCircle2,
  RefreshCw,
  Loader2,
  MessageCircle,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { BRAND } from "@/lib/data";

/* ---------- types ---------- */

type Role = "user" | "assistant";
type Msg = { id: string; role: Role; content: string; streaming?: boolean };

const QUICK_STARTERS = [
  "I own a Restaurant",
  "I run a Gym",
  "I have an Online Store",
  "I run a Clinic",
  "I run a Coaching / School",
  "I'm a Real Estate Agent",
  "I have a SaaS Startup",
  "Just a Business Website",
  "Tell me your pricing",
];

const INTRO: Msg = {
  id: "intro",
  role: "assistant",
  content:
    "Hey 👋 I'm JAYDEN, Mittal.website's AI consultant. Tell me about your business — what you do, who buys from you, what you want the website to do — and I'll figure out exactly what you need.",
};

/* ---------- helpers ---------- */

const id = () => Math.random().toString(36).slice(2);

const Avatar = ({ size = 26 }: { size?: number }) => (
  <span
    className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-full shadow-[0_0_22px_-4px_rgba(255,255,255,0.45)] ring-1 ring-white/20"
    style={{ width: size, height: size }}
  >
    <Image
      src="/jayden.png"
      alt="JAYDEN — AI Website Consultant"
      width={size * 2}
      height={size * 2}
      className="h-full w-full object-cover"
      priority={size >= 32}
    />
  </span>
);

/** Tiny markdown-ish renderer: bold (**x**), italic (_x_), newlines */
function renderInline(text: string) {
  const parts: React.ReactNode[] = [];
  let i = 0;
  const re = /(\*\*([^*]+)\*\*|_([^_]+)_)/g;
  let m: RegExpExecArray | null;
  let last = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[2]) parts.push(<strong key={i++}>{m[2]}</strong>);
    else if (m[3]) parts.push(<em key={i++}>{m[3]}</em>);
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

function renderMessage(text: string) {
  // Render paragraphs (split on blank lines) with inline formatting + soft line breaks
  return text.split(/\n{2,}/).map((para, pi) => (
    <p key={pi} className={pi === 0 ? "" : "mt-2"}>
      {para.split("\n").map((line, li) => (
        <span key={li}>
          {li > 0 && <br />}
          {renderInline(line)}
        </span>
      ))}
    </p>
  ));
}

/* ---------- main component ---------- */

export default function Jayden() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([INTRO]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "ok" | "error">(
    "idle"
  );

  const scroller = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    scroller.current?.scrollTo({
      top: scroller.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, busy]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250);
  }, [open]);

  /* ---------- send a turn to the LLM (streaming) ---------- */

  async function sendTurn(userText: string) {
    if (busy) return;
    const trimmed = userText.trim();
    if (!trimmed) return;

    const userMsg: Msg = { id: id(), role: "user", content: trimmed };
    const assistantId = id();
    const placeholder: Msg = {
      id: assistantId,
      role: "assistant",
      content: "",
      streaming: true,
    };

    // Build the messages we'll send (history without the intro greeting + this new user turn)
    const history = messages
      .filter((m) => m.id !== "intro")
      .map((m) => ({ role: m.role, content: m.content }));

    setMessages((m) => [...m, userMsg, placeholder]);
    setBusy(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/jayden", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...history, { role: "user", content: trimmed }],
        }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        const j = await res.json().catch(() => ({}));
        const errMsg =
          j?.error ||
          "Something glitched — easiest is to WhatsApp the team at +91 77019 03505.";
        setMessages((m) =>
          m.map((x) =>
            x.id === assistantId
              ? { ...x, content: errMsg, streaming: false }
              : x
          )
        );
        setBusy(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        setMessages((m) =>
          m.map((x) =>
            x.id === assistantId ? { ...x, content: buf, streaming: true } : x
          )
        );
      }
      setMessages((m) =>
        m.map((x) =>
          x.id === assistantId ? { ...x, content: buf, streaming: false } : x
        )
      );
    } catch {
      setMessages((m) =>
        m.map((x) =>
          x.id === assistantId
            ? {
                ...x,
                content:
                  "Connection dropped. Try again, or WhatsApp +91 77019 03505 — the team replies fast.",
                streaming: false,
              }
            : x
        )
      );
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  }

  const onChip = (label: string) => sendTurn(label);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const t = input;
    setInput("");
    sendTurn(t);
  };

  const reset = () => {
    abortRef.current?.abort();
    setMessages([INTRO]);
    setBusy(false);
    setShowLeadForm(false);
    setSubmitState("idle");
  };

  /* ---------- lead form (submits the full transcript) ---------- */

  const submitLead = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitState("loading");
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "");
    const phone = String(fd.get("phone") ?? "");
    const business = String(fd.get("business") ?? "");

    const transcript = messages
      .filter((m) => m.id !== "intro")
      .map((m) => `[${m.role === "user" ? "USER" : "JAYDEN"}] ${m.content}`)
      .join("\n\n");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email: `${phone}@whatsapp`,
          business,
          requirements: `Lead from JAYDEN chat.\n\n${transcript || "(no chat yet)"}`,
        }),
      });
      if (!res.ok) throw new Error("failed");
      setSubmitState("ok");
      setMessages((m) => [
        ...m,
        {
          id: id(),
          role: "assistant",
          content: `Done, ${name.split(" ")[0] || "friend"}. The team will reach out within 24 hours. Meanwhile feel free to keep asking me anything 👋`,
        },
      ]);
      setTimeout(() => setShowLeadForm(false), 1200);
    } catch {
      setSubmitState("error");
    }
  };

  /* ---------- render ---------- */

  const showStarters = messages.length === 1 && !busy;

  return (
    <>
      {/* Floating launcher */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="launcher"
            initial={{ opacity: 0, scale: 0.85, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 14 }}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setOpen(true)}
            className="group fixed bottom-5 right-5 z-[81] flex items-center gap-3 rounded-full border border-white/15 bg-[#101013]/90 py-2 pl-2 pr-4 shadow-[0_18px_50px_-10px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all hover:border-white/30 sm:bottom-24"
            aria-label="Open JAYDEN — AI Website Consultant"
          >
            <span className="absolute -inset-px -z-10 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.18),transparent_70%)] opacity-70" />
            <span className="relative">
              <Avatar size={36} />
              <span className="absolute -right-0 -top-0 h-2.5 w-2.5 rounded-full border-2 border-[#101013] bg-emerald-400" />
            </span>
            <span className="hidden flex-col items-start text-left sm:flex">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/45">
                Need a Website?
              </span>
              <span className="text-sm font-semibold text-white">Ask JAYDEN</span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-[81] bg-black/40 backdrop-blur-[2px] sm:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              key="panel"
              role="dialog"
              aria-label="JAYDEN AI Website Consultant"
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed bottom-0 left-0 right-0 z-[82] mx-auto flex h-[88vh] w-full flex-col overflow-hidden rounded-t-3xl border border-white/12 bg-[#0d0d10]/95 shadow-[0_30px_80px_-10px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:bottom-5 sm:left-auto sm:right-5 sm:h-[640px] sm:max-h-[80vh] sm:w-[400px] sm:rounded-3xl"
            >
              <div className="pointer-events-none absolute -top-20 right-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

              {/* Header */}
              <div className="relative flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3.5">
                <div className="flex items-center gap-3">
                  <Avatar size={36} />
                  <div className="leading-tight">
                    <div className="flex items-center gap-1.5">
                      <span className="font-display text-base font-semibold text-white">
                        JAYDEN
                      </span>
                      <span className="rounded-full bg-emerald-400/15 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-emerald-300">
                        AI · Live
                      </span>
                    </div>
                    <div className="text-[11px] text-white/50">
                      Your AI Website Consultant
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setShowLeadForm((v) => !v)}
                    title="Connect with team"
                    className="rounded-full p-2 text-white/55 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <UserPlus size={15} />
                  </button>
                  <button
                    onClick={reset}
                    title="Restart chat"
                    className="rounded-full p-2 text-white/55 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <RefreshCw size={15} />
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                    className="rounded-full p-2 text-white/55 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <X size={17} />
                  </button>
                </div>
              </div>

              {/* Lead form (collapsible) */}
              <AnimatePresence>
                {showLeadForm && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-b border-white/10 bg-white/[0.025]"
                  >
                    {submitState === "ok" ? (
                      <div className="flex items-center gap-2 px-4 py-3 text-sm text-white/85">
                        <CheckCircle2 size={16} className="text-emerald-400" />
                        Sent. Team will reach out within 24 hours.
                      </div>
                    ) : (
                      <form
                        onSubmit={submitLead}
                        className="space-y-2 p-3 text-sm"
                      >
                        <div className="text-[11px] uppercase tracking-[0.18em] text-white/45">
                          Connect with the team
                        </div>
                        <input
                          name="name"
                          required
                          placeholder="Your name"
                          className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white placeholder-white/35 outline-none focus:border-white/40"
                        />
                        <input
                          name="phone"
                          required
                          placeholder="WhatsApp / Phone (+91 …)"
                          className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white placeholder-white/35 outline-none focus:border-white/40"
                        />
                        <input
                          name="business"
                          placeholder="Business name (optional)"
                          className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white placeholder-white/35 outline-none focus:border-white/40"
                        />
                        {submitState === "error" && (
                          <p className="text-xs text-red-400">
                            Couldn&apos;t send — WhatsApp {BRAND.phoneDisplay}.
                          </p>
                        )}
                        <button
                          type="submit"
                          disabled={submitState === "loading"}
                          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white py-2 text-sm font-semibold text-black disabled:opacity-70"
                        >
                          {submitState === "loading" ? (
                            <>
                              <Loader2 size={14} className="animate-spin" /> Sending…
                            </>
                          ) : (
                            <>Share with the team</>
                          )}
                        </button>
                      </form>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Messages */}
              <div
                ref={scroller}
                className="relative flex-1 space-y-3 overflow-y-auto px-4 py-4"
              >
                {messages.map((m) => (
                  <Bubble key={m.id} msg={m} />
                ))}

                {busy &&
                  !messages[messages.length - 1]?.streaming && <TypingIndicator />}

                {showStarters && (
                  <div className="pt-2">
                    <div className="mb-2 text-[10.5px] font-medium uppercase tracking-[0.18em] text-white/40">
                      Or pick a quick start
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {QUICK_STARTERS.map((q) => (
                        <button
                          key={q}
                          onClick={() => onChip(q)}
                          className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-[12px] font-medium text-white/85 transition-all hover:border-white/40 hover:bg-white/[0.07]"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Composer */}
              <form
                onSubmit={onSubmit}
                className="flex items-center gap-2 border-t border-white/10 bg-[#0a0a0c] px-3 py-2.5"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    busy
                      ? "JAYDEN is thinking…"
                      : "Tell JAYDEN about your business…"
                  }
                  disabled={busy}
                  className="flex-1 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white placeholder-white/35 outline-none focus:border-white/40 disabled:opacity-60"
                />
                <button
                  type="submit"
                  aria-label="Send"
                  disabled={busy || !input.trim()}
                  className="rounded-full bg-white p-2 text-black transition-transform hover:-translate-y-0.5 disabled:opacity-50"
                >
                  {busy ? (
                    <Loader2 size={15} className="animate-spin" />
                  ) : (
                    <Send size={15} />
                  )}
                </button>
              </form>

              {/* Footer micro-CTAs */}
              <div className="flex items-center justify-between gap-2 border-t border-white/8 bg-[#08080a] px-3 py-2 text-[11px] text-white/45">
                <span>Powered by Mittal.website</span>
                <div className="flex items-center gap-2">
                  <Link href="/website-gallery" className="hover:text-white">
                    View Demos
                  </Link>
                  <span className="text-white/15">·</span>
                  <a
                    href={BRAND.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-white"
                  >
                    <MessageCircle size={11} /> WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------- subcomponents ---------- */

function Bubble({ msg }: { msg: Msg }) {
  const fromJ = msg.role === "assistant";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      className={`flex gap-2 ${fromJ ? "" : "justify-end"}`}
    >
      {fromJ && <Avatar size={24} />}
      <div
        className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
          fromJ
            ? "rounded-tl-md border border-white/8 bg-white/[0.04] text-white/90"
            : "rounded-tr-md bg-white text-black"
        }`}
      >
        {msg.content ? (
          renderMessage(msg.content)
        ) : (
          <span className="inline-flex items-center gap-1.5 text-white/55">
            <Loader2 size={12} className="animate-spin" /> thinking…
          </span>
        )}
        {msg.streaming && msg.content && (
          <span className="ml-0.5 inline-block h-3 w-[2px] translate-y-0.5 animate-pulse bg-white/70" />
        )}
      </div>
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2">
      <Avatar size={24} />
      <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-md border border-white/8 bg-white/[0.04] px-3.5 py-3">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block h-1.5 w-1.5 rounded-full bg-white/55"
            animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  );
}
