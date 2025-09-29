"use client";

import { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";

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
  const [scrolled, setScrolled] = useState(false);

  const toggleMobileMenu = () => setMobileOpen((open) => !open);
  const closeMobileMenu = () => setMobileOpen(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{ zIndex: "var(--z-sticky)" }}
      className={cn(
        "fixed top-0 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/50 bg-white/80 md:backdrop-blur-xl shadow-lg dark:bg-slate-900/80"
          : "border-b border-transparent bg-white/60 md:backdrop-blur-sm dark:bg-slate-900/60",
      )}
    >
      {/* Premium gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <nav className="mx-auto flex max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo with enhanced styling */}
          <a
            href="#hero"
            className="group flex items-center gap-2 text-2xl font-serif font-bold transition-all duration-300 text-primary"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
              <span className="text-sm font-bold">T</span>
            </div>
            <span className="group-hover:text-gradient transition-all duration-300">TPRI</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative px-4 py-2 text-sm font-medium text-text-secondary transition-all duration-300 hover:text-primary rounded-lg hover:bg-primary/5"
              >
                {item.label}
                {/* Hover underline effect */}
                <div className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-gradient-primary transition-all duration-300 group-hover:left-4 group-hover:w-8" />
              </a>
            ))}

            {/* Enhanced CTA button */}
            <div className="ml-4">
              <Button asChild variant="gradient" size="sm" className="group">
                <a href="#action" className="flex items-center">
                  <Zap className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                  Take Action
                </a>
              </Button>
            </div>
          </div>

          {/* Mobile menu button with enhanced styling */}
          <button
            type="button"
            onClick={toggleMobileMenu}
            className={cn(
              "md:hidden inline-flex items-center justify-center rounded-xl p-2 transition-all duration-300",
              "text-text-primary hover:bg-primary/10 hover:text-primary",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
              scrolled && "bg-surface/50",
            )}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            <span className="sr-only">Toggle navigation</span>
            <div className="relative w-6 h-6">
              <Menu
                className={cn(
                  "absolute inset-0 w-6 h-6 transition-all duration-300",
                  mobileOpen ? "opacity-0 rotate-180" : "opacity-100 rotate-0",
                )}
              />
              <X
                className={cn(
                  "absolute inset-0 w-6 h-6 transition-all duration-300",
                  mobileOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-180",
                )}
              />
            </div>
          </button>
        </div>

        {/* Enhanced mobile navigation */}
        <div
          id="mobile-nav"
          className={cn(
            "md:hidden transition-all duration-300 overflow-hidden",
            mobileOpen ? "max-h-96 opacity-100 pb-6" : "max-h-0 opacity-0 pb-0",
          )}
        >
          <div className="flex flex-col gap-2">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className={cn(
                  "group relative px-4 py-3 text-base font-medium text-text-primary transition-all duration-300",
                  "hover:text-primary hover:bg-primary/5 rounded-lg",
                  "animate-slide-up",
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  {item.label}
                  <div className="w-2 h-2 rounded-full bg-primary/20 group-hover:bg-primary transition-colors duration-300" />
                </div>
              </a>
            ))}

            {/* Mobile CTA */}
            <div className="mt-4 px-4">
              <Button
                asChild
                variant="gradient"
                size="lg"
                className="w-full group animate-scale-in"
                style={{ animationDelay: "0.4s" }}
              >
                <a
                  href="#action"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center"
                >
                  <Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                  Take Action
                </a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom gradient line */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 h-px transition-opacity duration-300",
          scrolled
            ? "opacity-100 bg-gradient-to-r from-transparent via-border to-transparent"
            : "opacity-0",
        )}
      />
    </header>
  );
}
