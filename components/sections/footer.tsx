"use client";

import Link from "next/link";

const QUICK_LINKS = [
  { href: "#hero", label: "Overview" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#downloads", label: "Downloads" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-muted/40">
      <div className="mx-auto flex w-full max-w-layout-2xl flex-col gap-y-8 px-4 py-12 md:flex-row md:items-center md:justify-between md:px-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            TPRI Coalition
          </p>
          <p className="mt-3 max-w-prose text-sm text-muted-foreground">
            Mobilizing American private capital to defend freedom-aligned markets through Total
            Political Risk Insurance and Strategic Economic Zones.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {QUICK_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-foreground">
              {link.label}
            </Link>
          ))}
          <a href="mailto:policy@tpri.org" className="hover:text-foreground">
            policy@tpri.org
          </a>
          <a href="tel:+12025550123" className="hover:text-foreground">
            (202) 555-0123
          </a>
        </div>
        <div className="flex flex-col items-start gap-y-3 text-xs text-muted-foreground/80">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-x-2 rounded-full border border-border/60 px-3 py-1 font-semibold text-muted-foreground hover:border-foreground"
          >
            Back to top
          </button>
          <span>© {new Date().getFullYear()} TPRI Initiative. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
