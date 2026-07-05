"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "About", href: "/v5/about" },
  { label: "Services", href: "/v5/services" },
  { label: "Work", href: "/v5/work" },
  { label: "Pricing", href: "/v5/pricing" },
  { label: "Contact", href: "/v5/contact" },
];

export default function V5Nav() {
  const path = usePathname();

  return (
    <nav className="v5-nav">
      <div className="v5-nav-inner">
        <Link href="/v5" className="v5-logo v5-sans">
          MITTAL<span style={{ color: "var(--accent)" }}>.</span>WEBSITE
        </Link>
        <div className="v5-nav-links v5-sans">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`v5-nav-link ${path === l.href ? "v5-nav-active" : ""}`}
            >
              {l.label}
            </Link>
          ))}
          <a href="https://wa.me/917701903505" className="v5-btn v5-btn-dark v5-nav-cta">
            Start a project
          </a>
        </div>
      </div>
    </nav>
  );
}
