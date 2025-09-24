"use client";
import { useEffect, useMemo, useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon, SearchIcon } from "lucide-react";

import type { FAQItem } from "@/content/schema";
import { cn } from "@/lib/utils";

type Audience = "policymaker" | "advanced";

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [audience, setAudience] = useState<Audience>("policymaker");
  const [query, setQuery] = useState("");
  const [openItems, setOpenItems] = useState<string[]>([]);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const target = items.find((item) => item.id === hash);
    if (target) {
      setAudience(target.audience);
      setOpenItems([target.id]);
      document.getElementById(target.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (item.audience !== audience) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q);
    });
  }, [items, audience, query]);

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-4 md:flex-row md:items-center md:justify-between">
        <div className="inline-flex rounded-full border border-border/60 bg-background/70 p-1 shadow-inner">
          <button
            type="button"
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold transition",
              audience === "policymaker"
                ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-soft-lg"
                : "text-foreground/60",
            )}
            onClick={() => setAudience("policymaker")}
          >
            Policymaker FAQ
          </button>
          <button
            type="button"
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold transition",
              audience === "advanced"
                ? "bg-gradient-to-r from-secondary to-primary text-primary-foreground shadow-soft-lg"
                : "text-foreground/60",
            )}
            onClick={() => setAudience("advanced")}
          >
            Advanced FAQ
          </button>
        </div>
        <label className="relative inline-flex w-full max-w-sm items-center">
          <SearchIcon className="absolute left-3 h-4 w-4 text-foreground/60" aria-hidden />
          <input
            className="w-full rounded-full border border-border/50 bg-background/80 px-10 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Search questions..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </div>
      <Accordion.Root
        type="multiple"
        value={openItems}
        onValueChange={(values) => setOpenItems(Array.isArray(values) ? values : [values])}
        className="divide-y divide-border/50 rounded-[2rem] border border-border/60 bg-gradient-to-br from-background/55 via-background/75 to-background/45 shadow-soft-lg backdrop-blur"
      >
        {filteredItems.map((item) => (
          <Accordion.Item
            key={item.id}
            value={item.id}
            id={item.id}
            className="relative px-4 py-4 transition hover:bg-background/50 md:px-6"
          >
            <Accordion.Header>
              <Accordion.Trigger className="group flex w-full items-center justify-between gap-x-4 text-left">
                <span className="text-base font-semibold text-foreground">{item.question}</span>
                <ChevronDownIcon
                  className="h-4 w-4 text-foreground/60 transition-transform group-data-[state=open]:rotate-180"
                  aria-hidden
                />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="pt-3 text-sm text-foreground/70 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in">
              <p className="whitespace-pre-line leading-relaxed">{item.answer}</p>
            </Accordion.Content>
          </Accordion.Item>
        ))}
        {filteredItems.length === 0 ? (
          <p className="p-6 text-sm text-foreground/65">No questions match your filters.</p>
        ) : null}
      </Accordion.Root>
    </div>
  );
}
