"use client";

import * as Tabs from "@radix-ui/react-tabs";
import type { ComponentType, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ContentStep = {
  id: string;
  label: string;
  content: ReactNode;
};

type ComponentStep = {
  id: string;
  label: string;
  Content: ComponentType;
};

export type ProgressiveContentStep = ContentStep | ComponentStep;

type ProgressiveContentProps = {
  steps: ProgressiveContentStep[];
};

function isComponentStep(step: ProgressiveContentStep): step is ComponentStep {
  return typeof (step as ComponentStep).Content === "function";
}

export function ProgressiveContent({ steps }: ProgressiveContentProps) {
  if (!steps.length) return null;

  const defaultStep = steps[0]?.id ?? "overview";

  const resolvedSteps = steps.map<ContentStep>((step) => {
    if (isComponentStep(step)) {
      const StepComponent = step.Content;
      return {
        id: step.id,
        label: step.label,
        content: <StepComponent />,
      };
    }

    return step;
  });

  return (
    <Tabs.Root defaultValue={defaultStep} className="flex flex-col gap-y-8">
      <Tabs.List className="flex flex-wrap gap-2 rounded-full border border-border/60 bg-background/80 p-2 shadow-sm">
        {resolvedSteps.map((step) => (
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
      {resolvedSteps.map((step) => (
        <Tabs.Content
          key={step.id}
          value={step.id}
          className="rounded-3xl border border-border/60 bg-background/80 p-6 shadow-sm"
        >
          {step.content}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
