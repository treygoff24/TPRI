"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "The Problem", href: "#problem" },
  { label: "Our Solution", href: "#solution" },
  { label: "Evidence", href: "#evidence" },
  { label: "Resources", href: "#resources" },
];

export function StickyHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobileMenu = () => setMobileOpen((open) => !open);
  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border bg-white/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#hero" className="text-2xl font-serif font-bold text-primary">
            TPRI
          </a>
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-text-secondary transition-colors hover:text-primary"
              >
                {item.label}
              </a>
            ))}
            <Button asChild variant="primary" size="sm">
              <a href="#action">Take Action</a>
            </Button>
          </div>
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-text-primary hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            <span className="sr-only">Toggle navigation</span>
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                d="M4 6h16M4 12h16M4 18h16"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div
          id="mobile-nav"
          className={cn("md:hidden flex-col gap-4 pb-4", mobileOpen ? "flex" : "hidden")}
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMobileMenu}
              className="text-base font-medium text-text-primary"
            >
              {item.label}
            </a>
          ))}
          <Button asChild variant="primary" size="md" className="w-full">
            <a href="#action" onClick={closeMobileMenu}>
              Take Action
            </a>
          </Button>
        </div>
      </nav>
    </header>
  );
}
