"use client";

import * as Tabs from "@radix-ui/react-tabs";

import type { HowItWorksStep } from "@/lib/content";
import { cn } from "@/lib/utils";

type ProgressiveContentProps = {
  steps: HowItWorksStep[];
};

export function ProgressiveContent({ steps }: ProgressiveContentProps) {
  if (!steps.length) return null;

  const defaultStep = steps[0]?.id ?? "overview";

  return (
    <Tabs.Root defaultValue={defaultStep} className="flex flex-col gap-y-8">
      <Tabs.List className="flex flex-wrap gap-2 rounded-full border border-border/60 bg-background/80 p-2 shadow-sm">
        {steps.map((step) => (
          <Tabs.Trigger
            key={step.id}
            value={step.id}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "data-[state=inactive]:text-muted-foreground",
              "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm",
            )}
          >
            {step.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {steps.map((step) => (
        <Tabs.Content
          key={step.id}
          value={step.id}
          className="rounded-3xl border border-border/60 bg-background/80 p-6 shadow-sm"
        >
          <step.Content />
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
