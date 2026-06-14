"use client";

import { useMemo, useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowUpRight, Eye, Loader2 } from "lucide-react";
import {
  CATEGORIES,
  INDUSTRY_FILTERS,
  GALLERY_ITEMS,
  type IndustryGroup,
} from "@/lib/showcase";
import DemoFrame from "@/components/showcase/DemoFrame";
import InquiryModal from "@/components/showcase/InquiryModal";

type Sort = "popular" | "newest" | "name";
const PAGE_SIZE = 12;

function GalleryInner() {
  const params = useSearchParams();
  const initialCategory = params.get("category") ?? "all";

  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState<"All" | IndustryGroup>("All");
  const [categorySlug, setCategorySlug] = useState<string>(initialCategory);
  const [sort, setSort] = useState<Sort>("popular");
  const [shown, setShown] = useState(PAGE_SIZE);
  const [modalFor, setModalFor] = useState<string | null>(null);

  // Filter + sort
  const filtered = useMemo(() => {
    let arr = [...GALLERY_ITEMS];
    if (industry !== "All") arr = arr.filter((g) => g.industry === industry);
    if (categorySlug !== "all") arr = arr.filter((g) => g.categorySlug === categorySlug);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      arr = arr.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.category.toLowerCase().includes(q) ||
          g.industry.toLowerCase().includes(q)
      );
    }
    if (sort === "popular") arr.sort((a, b) => b.popularity - a.popularity);
    if (sort === "newest") arr.sort((a, b) => +new Date(b.date) - +new Date(a.date));
    if (sort === "name") arr.sort((a, b) => a.title.localeCompare(b.title));
    return arr;
  }, [query, industry, categorySlug, sort]);

  // Reset pagination when filters change
  useEffect(() => {
    setShown(PAGE_SIZE);
  }, [query, industry, categorySlug, sort]);

  // Infinite scroll
  const sentinel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown((s) => Math.min(s + PAGE_SIZE, filtered.length));
        }
      },
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [filtered.length]);

  const visible = filtered.slice(0, shown);
  const hasMore = shown < filtered.length;

  return (
    <main className="pt-36 pb-24">
      <div className="container-px">
        {/* Hero */}
        <div className="max-w-3xl">
          <span className="eyebrow">Website Gallery</span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            100+ Website Demos, <span className="gradient-text">One Studio</span>
          </h1>
          <p className="mt-4 text-base leading-relaxed text-white/60">
            Every demo here is a Mittal-branded mockup showing what we can build for your
            business. Pick one closest to what you need — we&apos;ll customise it end-to-end
            and ship it in around 10 days.
          </p>
        </div>

        {/* Toolbar */}
        <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5">
          {/* Search */}
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-2.5">
            <Search size={16} className="text-white/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search demos — e.g. restaurant, store, portfolio…"
              className="w-full bg-transparent text-sm text-white placeholder-white/35 outline-none"
            />
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* Industry filter pills */}
            <div className="flex flex-wrap gap-1.5">
              {INDUSTRY_FILTERS.map((f) => {
                const active = industry === f;
                return (
                  <button
                    key={f}
                    onClick={() => setIndustry(f)}
                    className={`rounded-full border px-3 py-1 text-[11px] font-medium transition-all ${
                      active
                        ? "border-white/40 bg-white text-black"
                        : "border-white/10 bg-white/[0.03] text-white/60 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {f}
                  </button>
                );
              })}
            </div>

            {/* Sort + category */}
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={categorySlug}
                onChange={(e) => setCategorySlug(e.target.value)}
                className="rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-xs text-white/80 outline-none focus:border-white/40"
              >
                <option value="all" className="bg-[#0b0b0d]">
                  All Categories
                </option>
                {CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug} className="bg-[#0b0b0d]">
                    {c.title}
                  </option>
                ))}
              </select>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-xs text-white/80 outline-none focus:border-white/40"
              >
                <option value="popular" className="bg-[#0b0b0d]">
                  Sort: Popular
                </option>
                <option value="newest" className="bg-[#0b0b0d]">
                  Sort: Newest
                </option>
                <option value="name" className="bg-[#0b0b0d]">
                  Sort: Name (A–Z)
                </option>
              </select>
            </div>
          </div>

          <div className="text-xs text-white/40">
            Showing <span className="text-white/80">{visible.length}</span> of{" "}
            <span className="text-white/80">{filtered.length}</span> demos
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="mt-16 rounded-2xl border border-white/10 bg-white/[0.02] p-10 text-center text-white/60">
            No demos match your search. Try a different keyword or filter.
          </div>
        ) : (
          <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((item) => (
                <motion.article
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] transition-colors duration-500 hover:border-white/25"
                >
                  <div className="overflow-hidden">
                    <div className="transition-transform duration-700 group-hover:scale-[1.03]">
                      <DemoFrame
                        brand={item.title}
                        category={item.category}
                        gradient={item.gradient}
                        accent={item.accent}
                        variant={item.variant}
                      />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-base font-semibold text-white">
                        {item.title}
                      </h3>
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-white/55">
                        {item.industry}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-white/45">{item.category}</p>

                    <div className="mt-5 flex items-center justify-between gap-3 pt-0">
                      <button
                        onClick={() => setModalFor(item.title)}
                        className="inline-flex items-center gap-1 text-sm font-medium text-white/85 transition-colors hover:text-white"
                      >
                        <Eye size={14} />
                        View Demo
                      </button>
                      <button
                        onClick={() => setModalFor(item.title)}
                        className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-black transition-transform hover:-translate-y-0.5"
                      >
                        Get This
                        <ArrowUpRight size={13} />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Infinite-scroll sentinel + indicator */}
        {hasMore && (
          <div ref={sentinel} className="mt-10 flex items-center justify-center text-white/40">
            <Loader2 size={18} className="animate-spin" />
            <span className="ml-2 text-sm">Loading more demos…</span>
          </div>
        )}

        {/* Footer CTA */}
        <div className="mt-16 flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-10 text-center">
          <h3 className="font-display text-2xl font-semibold text-white">
            Found one that fits?
          </h3>
          <p className="max-w-xl text-sm text-white/60">
            Tell us which demo you liked and we&apos;ll customise it for your business —
            usually live within 10 days.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/#contact" className="btn-primary">
              Book Free Consultation
            </Link>
            <Link href="/" className="btn-ghost">
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      <InquiryModal
        open={!!modalFor}
        demoName={modalFor ?? ""}
        onClose={() => setModalFor(null)}
      />
    </main>
  );
}

export default function GalleryClient() {
  return (
    <Suspense fallback={<div className="pt-36" />}>
      <GalleryInner />
    </Suspense>
  );
}
