"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

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
      className={`sticky top-0 z-40 border-b border-border/60 backdrop-blur transition-all ${
        scrolled ? "bg-background/85 shadow-elevated" : "bg-background/70"
      }`}
    >
      <div className="mx-auto flex max-w-layout-2xl items-center justify-between gap-x-6 px-4 py-3 md:px-6">
        <Link href="#hero" className="text-sm font-semibold uppercase tracking-[0.3em]">
          TPRI
        </Link>
        <nav className="hidden items-center gap-x-4 text-sm font-medium lg:flex">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-3 py-1 transition",
                activeId && item.href.replace("#", "") === activeId
                  ? "bg-primary/15 text-primary"
                  : "text-foreground/70 hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-x-3">
          <Link
            href="#contact"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Book Briefing
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
