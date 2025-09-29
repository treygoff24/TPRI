"use client";

import clsx from "clsx";

import type { RecognitionKind, StyleTokens } from "@/lib/recognition/types";

const LABELS: Record<RecognitionKind, string> = {
  china: "Recognizes PRC (Beijing)",
  taiwan: "Recognizes ROC (Taiwan)",
};

const COLOR_KEYS: Record<RecognitionKind, keyof StyleTokens["colors"]> = {
  china: "china",
  taiwan: "taiwan",
};

type LegendProps = {
  colors: StyleTokens["colors"];
  active: Record<RecognitionKind, boolean>;
  onToggle: (kind: RecognitionKind) => void;
  className?: string;
};

export function Legend({ colors, active, onToggle, className }: LegendProps) {
  return (
    <div
      className={clsx(
        "flex flex-wrap items-center gap-2 text-[11px] text-text-secondary",
        className,
      )}
    >
      {(Object.keys(LABELS) as RecognitionKind[]).map((kind) => {
        const isActive = active[kind];
        const color = colors[COLOR_KEYS[kind]];
        return (
          <button
            key={kind}
            type="button"
            onClick={() => onToggle(kind)}
            className={clsx(
              "flex items-center gap-2 rounded-full border border-border/60 bg-surface/95 px-2.5 py-1 text-left shadow-sm backdrop-blur transition",
              "hover:border-primary/40 hover:text-text-primary",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-surface",
              isActive ? "opacity-100" : "opacity-75",
            )}
            aria-pressed={isActive}
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{
                backgroundColor: isActive ? color : "transparent",
                boxShadow: `0 0 0 ${isActive ? "1px" : "1.5px"} ${isActive ? color : colors.neutral}`,
              }}
              aria-hidden="true"
            />
            <span className="font-medium text-text-primary">{LABELS[kind]}</span>
          </button>
        );
      })}
    </div>
  );
}
