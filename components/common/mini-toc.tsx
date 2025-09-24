"use client";

import Link from "next/link";

import { useMiniToc } from "./mini-toc-provider";

export function MiniToc() {
  const { sections, activeId } = useMiniToc();

  if (!sections.length) return null;

  return (
    <nav
      aria-label="Section navigation"
      className="sticky top-28 hidden w-64 flex-shrink-0 lg:block"
    >
      <div className="rounded-3xl border border-border/60 bg-background/80 p-4 shadow-sm backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          On This Page
        </p>
        <ul className="mt-4 space-y-2 text-sm">
          {sections.map((section) => (
            <li key={section.id}>
              <Link
                href={`#${section.id}`}
                className={`block rounded-full px-3 py-2 transition ${
                  activeId === section.id
                    ? "bg-primary/10 font-semibold text-primary"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }`}
              >
                {section.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
