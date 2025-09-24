"use client";

import { useEffect, useRef, useState } from "react";

import { GlowCard } from "@/components/common/glow-card";
import type { Stat } from "@/content/schema";
import { cn } from "@/lib/utils";

function formatValue(stat: Stat, value: number) {
  switch (stat.unit) {
    case "$":
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: value >= 1_000_000_000 ? "compact" : "standard",
        maximumFractionDigits: value >= 1_000_000 ? 1 : 2,
      }).format(value);
    case "%":
      return `${value.toFixed(1)}%`;
    case "x":
      return `${value.toFixed(1)}×`;
    default:
      return new Intl.NumberFormat("en-US").format(value);
  }
}

function useAnimatedNumber(target: number) {
  const [current, setCurrent] = useState(0);
  const prefersReducedMotion = useRef<boolean>(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (prefersReducedMotion.current || target === 0) {
      setCurrent(target);
      return;
    }

    let start: number | null = null;
    const duration = 1200;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min(1, (timestamp - start) / duration);
      setCurrent(target * progress);
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };

    let animationFrameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [target]);

  return current;
}

type StatCardProps = {
  stat: Stat;
  highlight?: boolean;
};

export function StatCard({ stat, highlight = false }: StatCardProps) {
  const animated = useAnimatedNumber(stat.value);
  const displayValue = formatValue(stat, animated);

  return (
    <GlowCard
      className={cn(
        "h-full rounded-[1.8rem] border-border/60 bg-gradient-to-br from-background/50 via-background/70 to-background/45 p-6 transition hover:-translate-y-1 hover:shadow-elevated",
        highlight &&
          "border-primary/60 bg-gradient-to-br from-primary/25 via-primary/15 to-background/40",
      )}
      contentClassName="flex h-full flex-col gap-y-3"
      glows={
        highlight
          ? [
              "-top-12 right-[-10%] h-40 w-40 rounded-full bg-primary/35",
              "-bottom-14 left-[-12%] h-40 w-40 rounded-full bg-secondary/30",
            ]
          : ["-top-10 right-[-12%] h-36 w-36 rounded-full bg-secondary/25"]
      }
    >
      <div className="text-xs font-semibold uppercase tracking-[0.35em] text-foreground/60">
        {stat.label}
      </div>
      <div className="mt-2 text-pretty text-4xl font-semibold leading-tight text-foreground tabular-nums">
        {stat.unit === "raw" ? Math.round(animated).toLocaleString() : displayValue}
      </div>
      {stat.tooltip ? <p className="text-sm text-foreground/70">{stat.tooltip}</p> : null}
    </GlowCard>
  );
}
