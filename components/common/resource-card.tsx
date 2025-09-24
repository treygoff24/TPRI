import Link from "next/link";

import { GlowCard } from "@/components/common/glow-card";
import type { DownloadResource } from "@/content/schema";
import { cn, formatDate, formatFileSize } from "@/lib/utils";

const TAG_THEMES = [
  "bg-gradient-to-r from-primary/25 to-secondary/25 text-foreground",
  "bg-gradient-to-r from-secondary/20 to-accent/30 text-foreground",
  "bg-gradient-to-r from-accent/25 to-primary/25 text-foreground",
  "bg-gradient-to-r from-muted/70 to-primary/10 text-foreground/80",
];

export function ResourceCard({
  resource,
  index = 0,
}: {
  resource: DownloadResource;
  index?: number;
}) {
  return (
    <GlowCard
      className="h-full rounded-[1.8rem] border-border/60 bg-gradient-to-br from-background/50 via-background/70 to-background/45 p-6"
      contentClassName="flex h-full flex-col gap-y-6"
      glows={
        index % 2 === 0
          ? ["-top-12 right-[-12%] h-40 w-40 rounded-full bg-secondary/30"]
          : ["-bottom-14 left-[-12%] h-40 w-40 rounded-full bg-primary/25"]
      }
      data-offline={resource.offline ? "true" : "false"}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-xl font-semibold text-foreground">{resource.title}</h3>
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/60">
          {formatDate(resource.updated)}
        </span>
      </div>
      <p className="text-sm text-foreground/70">{resource.description}</p>
      <div className="flex flex-wrap items-center gap-2">
        {resource.tags.slice(0, 4).map((tag, tagIndex) => (
          <span
            key={tag}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium",
              TAG_THEMES[tagIndex % TAG_THEMES.length],
            )}
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-auto flex items-center justify-between text-sm text-foreground/65">
        <span>{formatFileSize(resource.size)}</span>
        {resource.offline ? (
          <span className="inline-flex items-center gap-x-1 text-success">Offline ready</span>
        ) : null}
      </div>
      <Link
        href={resource.file}
        className="inline-flex items-center justify-center gap-x-2 rounded-full bg-gradient-to-r from-primary via-secondary to-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft-lg transition hover:brightness-110"
        prefetch={false}
      >
        Download
      </Link>
    </GlowCard>
  );
}
