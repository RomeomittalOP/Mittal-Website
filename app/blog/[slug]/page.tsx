import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";
import { POSTS, getPost } from "@/lib/posts";
import { BRAND } from "@/lib/data";

const siteUrl = "https://mittaldev.website";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `${siteUrl}/blog/${post.slug}`,
      publishedTime: post.date,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "en-IN",
    author: { "@type": "Organization", name: "MITTAL.WEBSITE" },
    publisher: { "@type": "Organization", name: "MITTAL.WEBSITE" },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
  };

  return (
    <main className="pt-36 pb-24">
      <article className="container-px mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-white/55 transition-colors hover:text-white"
        >
          <ArrowLeft size={15} />
          All articles
        </Link>

        <div className="mt-6 flex items-center gap-2 text-xs text-white/45">
          <span>{formatDate(post.date)}</span>
          <span className="h-1 w-1 rounded-full bg-white/30" />
          <span>{post.readTime}</span>
        </div>

        <h1 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-white/65">{post.description}</p>

        <div className="mt-10 space-y-5">
          {post.content.map((block, i) => {
            if (block.type === "h2") {
              return (
                <h2 key={i} className="mt-10 font-display text-2xl font-semibold text-white">
                  {block.text}
                </h2>
              );
            }
            if (block.type === "ul") {
              return (
                <ul key={i} className="space-y-2 pl-1">
                  {block.items.map((item) => (
                    <li key={item} className="flex gap-2.5 text-white/70">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} className="text-base leading-relaxed text-white/70">
                {block.text}
              </p>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl glass-strong p-7 text-center">
          <h3 className="font-display text-xl font-semibold">Ready to get your website made?</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-white/60">
            Premium websites from ₹5,555 — free consultation, delivered within 10 days.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link href="/#contact" className="btn-primary group">
              Get Free Consultation
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={BRAND.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
          </div>
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
