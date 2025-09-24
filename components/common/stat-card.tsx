"use client";

import { useEffect, useRef, useState } from "react";

import type { Stat } from "@/content/schema";
import { cn } from "@/lib/utils";

function formatValue(stat: Stat, value: number) {
  switch (stat.unit) {
    case "$":
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: value >= 1_000_000 ? 0 : 1,
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
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-border/60 bg-background/70 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-elevated",
        highlight &&
          "border-primary/60 bg-gradient-to-br from-primary/10 via-background to-background",
      )}
    >
      <div className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
        {stat.label}
      </div>
      <div className="mt-4 text-4xl font-semibold text-foreground">
        {stat.unit === "raw" ? Math.round(animated).toLocaleString() : displayValue}
      </div>
      {stat.tooltip ? <p className="mt-3 text-sm text-muted-foreground">{stat.tooltip}</p> : null}
    </div>
  );
}
