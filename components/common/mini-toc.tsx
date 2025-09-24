"use client";

import Link from "next/link";

import { GlowCard } from "@/components/common/glow-card";

import { useMiniToc } from "./mini-toc-provider";

export function MiniToc() {
  const { sections, activeId } = useMiniToc();

  if (!sections.length) return null;

  return (
    <nav
      aria-label="Section navigation"
      className="sticky top-28 hidden w-64 flex-shrink-0 lg:block"
    >
      <GlowCard
        className="rounded-[2rem] border-border/60 bg-gradient-to-br from-background/55 via-background/75 to-background/45 p-5"
        contentClassName="space-y-4"
        glows={[
          "-top-12 right-[-12%] h-36 w-36 rounded-full bg-secondary/25",
          "-bottom-12 left-[-12%] h-36 w-36 rounded-full bg-primary/25",
        ]}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-foreground/60">
          On This Page
        </p>
        <ul className="space-y-2 text-sm">
          {sections.map((section) => (
            <li key={section.id}>
              <Link
                href={`#${section.id}`}
                className={`block rounded-full px-3 py-2 text-foreground/65 transition ${
                  activeId === section.id
                    ? "bg-gradient-to-r from-primary/25 via-secondary/25 to-primary/25 font-semibold text-primary"
                    : "hover:bg-background/60 hover:text-foreground"
                }`}
              >
                {section.label}
              </Link>
            </li>
          ))}
        </ul>
      </GlowCard>
    </nav>
  );
}
