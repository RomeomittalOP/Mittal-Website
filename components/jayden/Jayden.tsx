"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Send,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  Loader2,
  Eye,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { BRAND } from "@/lib/data";
import {
  QUICK_ACTIONS,
  recommendFromAnswers,
  findFaqAnswer,
  type Answers,
  type BusinessType,
  type Feature,
  type Goal,
  type Recommendation,
  type Timeline,
  type Budget,
} from "@/lib/ai/jayden";

/* ---------- types ---------- */

type Step =
  | "welcome"
  | "ask-goal"
  | "ask-has-website"
  | "ask-features"
  | "ask-timeline"
  | "ask-budget"
  | "recommend"
  | "collect-lead"
  | "submitted"
  | "free-chat";

type Msg = {
  id: string;
  from: "jayden" | "user";
  text?: string;
  node?: React.ReactNode;
};

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

/* ---------- main ---------- */

export default function Jayden() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("welcome");
  const [answers, setAnswers] = useState<Answers>({ features: [] });
  const [rec, setRec] = useState<Recommendation | null>(null);
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "intro",
      from: "jayden",
      text:
        "Hey 👋 I'm JAYDEN, Mittal.website's AI consultant. Tell me about your business — I'll figure out the right kind of website, features, timeline and budget range for you in under a minute.",
    },
  ]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "error">("idle");
  const scroller = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scroller.current?.scrollTo({
      top: scroller.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250);
  }, [open]);

  const pushUser = (text: string) =>
    setMessages((m) => [...m, { id: id(), from: "user", text }]);
  const pushJayden = (payload: Pick<Msg, "text" | "node">) =>
    setMessages((m) => [...m, { id: id(), from: "jayden", ...payload }]);

  const sayWithTyping = async (delay = 600, payload: Pick<Msg, "text" | "node">) => {
    setTyping(true);
    await new Promise((r) => setTimeout(r, delay));
    setTyping(false);
    pushJayden(payload);
  };

  /* ---------- flow handlers ---------- */

  const startWith = async (businessType: BusinessType, label: string) => {
    pushUser(label);
    setAnswers((a) => ({ ...a, businessType }));
    setStep("ask-goal");
    await sayWithTyping(550, {
      text:
        "Got it. What's the main goal you want this website to hit? Pick the closest one — I'll tailor everything around it.",
    });
  };

  const chooseGoal = async (g: Goal, label: string) => {
    pushUser(label);
    setAnswers((a) => ({ ...a, goal: g }));
    setStep("ask-has-website");
    await sayWithTyping(500, { text: "Do you already have a website?" });
  };

  const chooseHasWebsite = async (has: boolean) => {
    pushUser(has ? "Yes, I have one" : "No, I need a new one");
    setAnswers((a) => ({ ...a, hasWebsite: has }));
    setStep("ask-features");
    await sayWithTyping(500, {
      text:
        "Which features do you want? Pick all that apply — skip if you're not sure yet.",
    });
  };

  const toggleFeature = (f: Feature) => {
    setAnswers((a) => {
      const cur = a.features ?? [];
      return {
        ...a,
        features: cur.includes(f) ? cur.filter((x) => x !== f) : [...cur, f],
      };
    });
  };

  const confirmFeatures = async () => {
    const sel = answers.features ?? [];
    pushUser(sel.length ? `Features: ${sel.join(", ")}` : "Skip features for now");
    setStep("ask-timeline");
    await sayWithTyping(500, { text: "When do you want to go live?" });
  };

  const chooseTimeline = async (t: Timeline, label: string) => {
    pushUser(label);
    setAnswers((a) => ({ ...a, timeline: t }));
    setStep("ask-budget");
    await sayWithTyping(500, {
      text:
        "And approximately what's your budget? This just helps me recommend the right tier.",
    });
  };

  const chooseBudget = async (b: Budget, label: string) => {
    pushUser(label);
    const finalAnswers = { ...answers, budget: b };
    setAnswers(finalAnswers);
    setStep("recommend");
    setTyping(true);
    await new Promise((r) => setTimeout(r, 900));
    setTyping(false);

    const recommendation = recommendFromAnswers(finalAnswers);
    setRec(recommendation);
    pushJayden({ node: <RecommendationCard rec={recommendation} /> });
    await sayWithTyping(700, {
      text:
        "Want me to share your details with the team? They'll reach out within 24 hours and start your project.",
    });
    setStep("collect-lead");
  };

  /* ---------- lead form ---------- */

  const submitLead = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitState("loading");
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "");
    const phone = String(fd.get("phone") ?? "");
    const business = String(fd.get("business") ?? "");
    pushUser(`${name} · ${phone}${business ? ` · ${business}` : ""}`);

    const summary = rec
      ? `JAYDEN Recommendation: ${rec.headline}. Features: ${rec.features.join(", ")}. Timeline: ${rec.timeline}. Budget: ${rec.budgetRange}.`
      : "Lead from JAYDEN.";

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email: `${phone}@whatsapp`,
          business,
          requirements: summary,
          budget: answers.budget ?? "",
        }),
      });
      if (!res.ok) throw new Error("failed");
      setSubmitState("idle");
      setStep("submitted");
      await sayWithTyping(450, {
        node: (
          <div className="flex items-start gap-2 rounded-xl border border-white/15 bg-white/[0.05] p-3">
            <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-white" />
            <div className="text-sm leading-relaxed text-white/85">
              <span className="font-semibold">All set, {name.split(" ")[0]}!</span> Our
              team will reach out within 24 hours. Anything else I can answer?
            </div>
          </div>
        ),
      });
      setStep("free-chat");
    } catch {
      setSubmitState("error");
    }
  };

  /* ---------- free chat / FAQ ---------- */

  const sendFree = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const t = text.trim();
    if (!t) return;
    pushUser(t);
    setText("");
    setTyping(true);
    await new Promise((r) => setTimeout(r, 550));
    setTyping(false);
    const ans = findFaqAnswer(t);
    if (ans) {
      pushJayden({ text: ans });
    } else {
      pushJayden({
        text:
          "Honestly that one's better answered on a 5-minute chat — easiest is to WhatsApp +91 77019 03505. Want me to share your details so the team pings you?",
      });
      if (step === "free-chat" || step === "submitted") {
        await new Promise((r) => setTimeout(r, 250));
        pushJayden({ node: <FinalCTAs /> });
      }
    }
  };

  const reset = () => {
    setAnswers({ features: [] });
    setRec(null);
    setStep("welcome");
    setSubmitState("idle");
    setMessages([
      {
        id: "intro",
        from: "jayden",
        text: "Restarting our chat — tell me about your business and I'll guide you again.",
      },
    ]);
  };

  /* ---------- step-specific quick replies ---------- */

  const QuickReplies = () => {
    if (step === "welcome") {
      return (
        <ChipGroup>
          {QUICK_ACTIONS.map((q) => (
            <Chip key={q.businessType} onClick={() => startWith(q.businessType, q.label)}>
              {q.label}
            </Chip>
          ))}
        </ChipGroup>
      );
    }
    if (step === "ask-goal") {
      const goals: { v: Goal; l: string }[] = [
        { v: "sell-products", l: "Sell products" },
        { v: "leads", l: "Generate leads" },
        { v: "showcase", l: "Showcase services" },
        { v: "personal-brand", l: "Build personal brand" },
        { v: "bookings", l: "Online bookings" },
        { v: "donations", l: "Drive donations" },
      ];
      return (
        <ChipGroup>
          {goals.map((g) => (
            <Chip key={g.v} onClick={() => chooseGoal(g.v, g.l)}>
              {g.l}
            </Chip>
          ))}
        </ChipGroup>
      );
    }
    if (step === "ask-has-website") {
      return (
        <ChipGroup>
          <Chip onClick={() => chooseHasWebsite(true)}>Yes, I have one</Chip>
          <Chip onClick={() => chooseHasWebsite(false)}>No, I need a new one</Chip>
        </ChipGroup>
      );
    }
    if (step === "ask-features") {
      const feats: { v: Feature; l: string }[] = [
        { v: "payment", l: "Payment Gateway" },
        { v: "booking", l: "Booking System" },
        { v: "admin", l: "Admin Panel" },
        { v: "catalog", l: "Product Catalog" },
        { v: "whatsapp", l: "WhatsApp Integration" },
        { v: "blog", l: "Blog" },
        { v: "auth", l: "User Login" },
        { v: "seo", l: "SEO Foundation" },
      ];
      const selected = answers.features ?? [];
      return (
        <div className="space-y-3">
          <ChipGroup>
            {feats.map((f) => {
              const active = selected.includes(f.v);
              return (
                <Chip key={f.v} active={active} onClick={() => toggleFeature(f.v)}>
                  {active ? "✓ " : ""}
                  {f.l}
                </Chip>
              );
            })}
          </ChipGroup>
          <button
            onClick={confirmFeatures}
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-black"
          >
            Continue <ArrowRight size={13} />
          </button>
        </div>
      );
    }
    if (step === "ask-timeline") {
      const times: { v: Timeline; l: string }[] = [
        { v: "asap", l: "ASAP" },
        { v: "10-days", l: "Around 10 days" },
        { v: "2-3-weeks", l: "2–3 weeks" },
        { v: "flexible", l: "Flexible" },
      ];
      return (
        <ChipGroup>
          {times.map((t) => (
            <Chip key={t.v} onClick={() => chooseTimeline(t.v, t.l)}>
              {t.l}
            </Chip>
          ))}
        </ChipGroup>
      );
    }
    if (step === "ask-budget") {
      const buds: { v: Budget; l: string }[] = [
        { v: "under-10k", l: "Under ₹10,000" },
        { v: "10-25k", l: "₹10,000 – ₹25,000" },
        { v: "25-50k", l: "₹25,000 – ₹50,000" },
        { v: "50-100k", l: "₹50,000 – ₹1,00,000" },
        { v: "100k+", l: "₹1,00,000+" },
        { v: "custom", l: "Not sure yet" },
      ];
      return (
        <ChipGroup>
          {buds.map((b) => (
            <Chip key={b.v} onClick={() => chooseBudget(b.v, b.l)}>
              {b.l}
            </Chip>
          ))}
        </ChipGroup>
      );
    }
    return null;
  };

  /* ---------- render ---------- */

  return (
    <>
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

              {/* Messages */}
              <div
                ref={scroller}
                className="relative flex-1 space-y-3 overflow-y-auto px-4 py-4"
              >
                {messages.map((m) => (
                  <MessageBubble key={m.id} msg={m} />
                ))}

                {typing && <TypingIndicator />}

                {!typing && step !== "collect-lead" && step !== "submitted" && (
                  <div className="pt-1">
                    <QuickReplies />
                  </div>
                )}

                {step === "collect-lead" && !typing && (
                  <form onSubmit={submitLead} className="space-y-2 pt-1">
                    <input
                      name="name"
                      required
                      placeholder="Your name"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder-white/35 outline-none focus:border-white/40"
                    />
                    <input
                      name="phone"
                      required
                      placeholder="WhatsApp / Phone (+91 …)"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder-white/35 outline-none focus:border-white/40"
                    />
                    <input
                      name="business"
                      placeholder="Business name (optional)"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder-white/35 outline-none focus:border-white/40"
                    />
                    {submitState === "error" && (
                      <p className="text-xs text-red-400">
                        Couldn&apos;t send — WhatsApp {BRAND.phoneDisplay}.
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={submitState === "loading"}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white py-2.5 text-sm font-semibold text-black disabled:opacity-70"
                    >
                      {submitState === "loading" ? (
                        <>
                          <Loader2 size={14} className="animate-spin" /> Sending…
                        </>
                      ) : (
                        <>
                          Share with the team <Send size={14} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Composer (free-form questions) */}
              <form
                onSubmit={sendFree}
                className="flex items-center gap-2 border-t border-white/10 bg-[#0a0a0c] px-3 py-2.5"
              >
                <input
                  ref={inputRef}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Ask anything — pricing, timeline, features…"
                  className="flex-1 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white placeholder-white/35 outline-none focus:border-white/40"
                />
                <button
                  type="submit"
                  aria-label="Send"
                  className="rounded-full bg-white p-2 text-black transition-transform hover:-translate-y-0.5"
                >
                  <Send size={15} />
                </button>
              </form>

              {/* Footer */}
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

function MessageBubble({ msg }: { msg: Msg }) {
  const fromJ = msg.from === "jayden";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
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
        {msg.node ? msg.node : msg.text}
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

function ChipGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap gap-1.5">{children}</div>;
}

function Chip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-[12px] font-medium transition-all ${
        active
          ? "border-white/40 bg-white text-black"
          : "border-white/15 bg-white/[0.04] text-white/85 hover:border-white/40 hover:bg-white/[0.07]"
      }`}
    >
      {children}
    </button>
  );
}

function RecommendationCard({ rec }: { rec: Recommendation }) {
  return (
    <div className="space-y-3">
      <div className="text-xs font-medium uppercase tracking-[0.18em] text-white/50">
        Recommended Solution
      </div>
      <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-4">
        <div className="font-display text-base font-semibold text-white">{rec.headline}</div>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-white/65">{rec.reasoning}</p>

        <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
          <Cell label="Package" value={rec.package.name} />
          <Cell label="Starting" value={rec.package.price} />
          <Cell label="Timeline" value={rec.timeline} />
          <Cell label="Budget" value={rec.budgetRange} />
        </div>

        <div className="mt-3">
          <div className="text-[11px] font-medium uppercase tracking-wider text-white/45">
            Features
          </div>
          <div className="mt-1.5 flex flex-wrap gap-1">
            {rec.features.map((f) => (
              <span
                key={f}
                className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10.5px] text-white/75"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>

      {rec.demos.length > 0 && (
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-3">
          <div className="text-[11px] font-medium uppercase tracking-wider text-white/45">
            Demos to inspire you
          </div>
          <div className="mt-2 space-y-1.5">
            {rec.demos.map((d) => (
              <Link
                key={d.id}
                href={`/website-gallery?category=${d.slug}`}
                className="group flex items-center justify-between gap-2 rounded-xl border border-white/8 bg-white/[0.025] px-3 py-2 text-[12px] text-white/85 transition-colors hover:border-white/25 hover:bg-white/[0.05]"
              >
                <span className="truncate">
                  <span className="font-semibold">{d.title}</span>{" "}
                  <span className="text-white/45">· {d.category}</span>
                </span>
                <Eye size={13} className="shrink-0 text-white/60 group-hover:text-white" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/8 bg-white/[0.03] p-2">
      <div className="text-[10px] font-medium uppercase tracking-wider text-white/45">
        {label}
      </div>
      <div className="mt-0.5 text-[12px] font-semibold text-white">{value}</div>
    </div>
  );
}

function FinalCTAs() {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/#contact"
        className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[12px] font-semibold text-black"
      >
        Book Consultation
      </Link>
      <a
        href={BRAND.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-[12px] font-medium text-white/85 hover:border-white/40"
      >
        <MessageCircle size={12} /> WhatsApp
      </a>
    </div>
  );
}
