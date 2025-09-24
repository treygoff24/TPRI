"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/common/theme-toggle";

const NAV_LINKS = [
  { href: "#hero", label: "Overview" },
  { href: "#paraguay-countdown", label: "Countdown" },
  { href: "#china-expansion", label: "$137B Problem" },
  { href: "#executive-summary", label: "Executive Summary" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#strategic-zones", label: "Strategic Zones" },
  { href: "#prospera-case-study", label: "Case Study" },
  { href: "#tpri-vs-pri", label: "Comparison" },
  { href: "#faq", label: "FAQ" },
  { href: "#downloads", label: "Downloads" },
  { href: "#contact", label: "Contact" },
];

export function StickyHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const navLinks = useMemo(() => NAV_LINKS, []);

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 24);
    };
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-toc-id]"));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => (a.target as HTMLElement).offsetTop - (b.target as HTMLElement).offsetTop,
          );
        if (visible[0]) {
          setActiveId(visible[0].target.getAttribute("data-toc-id"));
        }
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border/60 backdrop-blur-xl transition-all",
        scrolled ? "bg-background/90 shadow-elevated" : "bg-background/60",
      )}
    >
      <div className="mx-auto w-full max-w-layout-2xl px-4 py-3 md:px-6">
        <div className="flex items-center justify-between gap-x-4">
          <Link
            href="#hero"
            className="flex items-center gap-x-2 rounded-full border border-transparent px-3 py-1 text-sm font-semibold uppercase tracking-[0.3em] text-foreground transition hover:border-border/60 hover:text-foreground"
          >
            TPRI
          </Link>
          <nav
            aria-label="Primary"
            className="hidden items-center gap-x-2 text-sm font-medium lg:flex"
          >
            {navLinks.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = activeId === id;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "whitespace-nowrap rounded-full px-3 py-1.5 transition",
                    isActive
                      ? "bg-primary/15 text-primary shadow-inner"
                      : "text-muted-foreground hover:bg-muted/40 hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-x-2">
            <Link
              href="#contact"
              className="group relative inline-flex items-center justify-center gap-x-2 overflow-hidden rounded-full px-4 py-2 text-sm font-semibold text-white shadow-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary opacity-90 transition duration-200 group-hover:opacity-100" />
              <span className="absolute inset-0 -z-10 translate-y-2 scale-105 bg-primary/40 blur-lg opacity-0 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100" />
              <span className="relative">Book Briefing</span>
            </Link>
            <ThemeToggle />
          </div>
        </div>
        <nav
          aria-label="Section shortlist"
          className="mt-3 flex items-center gap-x-2 overflow-x-auto pb-1 text-sm font-medium lg:hidden"
        >
          {navLinks.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = activeId === id;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "whitespace-nowrap rounded-full px-3 py-1.5",
                  isActive
                    ? "bg-primary/20 text-primary"
                    : "bg-muted/40 text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
