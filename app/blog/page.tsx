import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { POSTS } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog — Web Design, Development & Growth Tips",
  description:
    "Practical guides on getting a website made, website costs in India, SEO and growing your business online — from the team at MITTAL.WEBSITE, Delhi NCR.",
  alternates: { canonical: "/blog" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function BlogIndex() {
  const posts = [...POSTS].sort((a, b) => +new Date(b.date) - +new Date(a.date));

  return (
    <main className="pt-36 pb-24">
      <div className="container-px">
        <span className="eyebrow">The Blog</span>
        <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          Web Design, Development &amp; <span className="gradient-text">Growth Tips</span>
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/60">
          Honest, practical guides to help your business win online — from getting your first
          website made to ranking on Google in Delhi NCR.
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card-glow group flex h-full flex-col"
            >
              <div className="flex items-center gap-2 text-xs text-white/45">
                <span>{formatDate(post.date)}</span>
                <span className="h-1 w-1 rounded-full bg-white/30" />
                <span>{post.readTime}</span>
              </div>
              <h2 className="mt-3 font-display text-xl font-semibold leading-snug">
                {post.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">
                {post.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-white/80 transition-colors group-hover:text-white">
                Read article
                <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
