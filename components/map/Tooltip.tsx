"use client";

import clsx from "clsx";

import type { RecognitionKind, StyleTokens } from "@/lib/recognition/types";

type TooltipData = {
  isoAlpha3: string;
  name: string;
  recognition: RecognitionKind;
  since?: string;
  sinceYear?: number;
  citationUrl?: string;
  citationLabel?: string;
  position: { x: number; y: number };
  pinned: boolean;
};

type TooltipProps = {
  data: TooltipData | null;
  colors: StyleTokens["colors"];
};

function formatDate({ since, sinceYear }: { since?: string; sinceYear?: number }): string | null {
  if (since)
    return new Date(since).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  if (sinceYear) return sinceYear.toString();
  return null;
}

export function Tooltip({ data, colors }: TooltipProps) {
  if (!data) return null;
  const { name, recognition, citationUrl, citationLabel, position, pinned } = data;
  const sinceValue = formatDate(data);
  const status =
    recognition === "china"
      ? "Recognizes the People’s Republic of China"
      : "Recognizes the Republic of China (Taiwan)";
  const accent = recognition === "china" ? colors.china : colors.taiwan;

  return (
    <div
      className={clsx(
        "pointer-events-none absolute z-[3] w-60 max-w-[95vw] rounded-2xl border border-border/60 bg-background/95 p-4 text-xs text-foreground shadow-soft-lg backdrop-blur",
        pinned ? "ring-2 ring-accent/60" : null,
      )}
      style={{
        left: position.x,
        top: position.y,
        borderTopColor: accent,
        borderTopWidth: "3px",
        borderTopStyle: "solid",
      }}
      role="status"
      aria-live="polite"
    >
      <p className="text-sm font-semibold text-foreground">{name}</p>
      <p className="mt-1 text-foreground/80">{status}</p>
      {sinceValue ? <p className="mt-1 text-foreground/70">Since {sinceValue}</p> : null}
      {citationUrl ? (
        <p className="mt-2">
          <a
            href={citationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-accent hover:underline"
          >
            {citationLabel ?? "View source"}
          </a>
        </p>
      ) : null}
      <span className="sr-only">
        {pinned ? "Pinned" : "Hover"} tooltip for {name}
      </span>
    </div>
  );
}

export type { TooltipData };
