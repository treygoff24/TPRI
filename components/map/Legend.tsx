"use client";

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
};

export function Legend({ colors, active, onToggle }: LegendProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs text-text-secondary">
      {(Object.keys(LABELS) as RecognitionKind[]).map((kind) => {
        const isActive = active[kind];
        const color = colors[COLOR_KEYS[kind]];
        return (
          <button
            key={kind}
            type="button"
            onClick={() => onToggle(kind)}
            className="flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-left transition hover:border-primary/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            aria-pressed={isActive}
          >
            <span
              className="h-3 w-3 rounded-full"
              style={{
                backgroundColor: isActive ? color : "transparent",
                boxShadow: `0 0 0 1px ${isActive ? color : colors.neutral}`,
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
