"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

export type TocSection = {
  id: string;
  label: string;
};

type MiniTocContextValue = {
  sections: TocSection[];
  activeId: string | null;
};

const MiniTocContext = createContext<MiniTocContextValue | undefined>(undefined);

export function MiniTocProvider({
  sections,
  children,
}: {
  sections: TocSection[];
  children: React.ReactNode;
}) {
  const [activeId, setActiveId] = useState<string | null>(sections.at(0)?.id ?? null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!sections.length) return;

    const options: IntersectionObserverInit = {
      rootMargin: "-40% 0px -40% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    };

    const handler: IntersectionObserverCallback = (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => (a.target as HTMLElement).offsetTop - (b.target as HTMLElement).offsetTop);

      if (visible.length > 0) {
        const topEntry = visible[0];
        const id = topEntry.target.getAttribute("data-toc-id");
        if (id && id !== activeId) {
          setActiveId(id);
        }
        return;
      }

      // If nothing is intersecting, check the first section above viewport.
      const sortedEntries = [...entries].sort(
        (a, b) => (a.target as HTMLElement).offsetTop - (b.target as HTMLElement).offsetTop,
      );
      for (let i = sortedEntries.length - 1; i >= 0; i -= 1) {
        const id = sortedEntries[i].target.getAttribute("data-toc-id");
        if (id) {
          setActiveId(id);
          break;
        }
      }
    };

    const observer = new IntersectionObserver(handler, options);
    observerRef.current = observer;

    sections.forEach((section) => {
      const el = document.querySelector<HTMLElement>(`[data-toc-id="${section.id}"]`);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      observerRef.current = null;
    };
  }, [sections, activeId]);

  const value = useMemo<MiniTocContextValue>(() => ({ sections, activeId }), [sections, activeId]);

  return <MiniTocContext.Provider value={value}>{children}</MiniTocContext.Provider>;
}

export function useMiniToc() {
  const context = useContext(MiniTocContext);
  if (!context) throw new Error("useMiniToc must be used within MiniTocProvider");
  return context;
}
