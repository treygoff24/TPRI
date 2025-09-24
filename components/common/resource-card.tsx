import Link from "next/link";

import type { DownloadResource } from "@/content/schema";
import { formatDate, formatFileSize } from "@/lib/utils";

const TAG_COLORS = [
  "bg-primary/10 text-primary",
  "bg-secondary/10 text-secondary",
  "bg-accent/10 text-accent",
  "bg-muted/70 text-muted-foreground",
];

export function ResourceCard({ resource }: { resource: DownloadResource }) {
  return (
    <article
      className="group flex flex-col gap-y-6 rounded-3xl border border-border/60 bg-background/80 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-elevated"
      data-offline={resource.offline ? "true" : "false"}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-xl font-semibold text-foreground">{resource.title}</h3>
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          {formatDate(resource.updated)}
        </span>
      </div>
      <p className="text-sm text-muted-foreground">{resource.description}</p>
      <div className="flex flex-wrap items-center gap-2">
        {resource.tags.slice(0, 4).map((tag, index) => (
          <span
            key={tag}
            className={`rounded-full px-3 py-1 text-xs font-medium ${TAG_COLORS[index % TAG_COLORS.length]}`}
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-auto flex items-center justify-between text-sm text-muted-foreground">
        <span>{formatFileSize(resource.size)}</span>
        {resource.offline ? (
          <span className="inline-flex items-center gap-x-1 text-success">Offline ready</span>
        ) : null}
      </div>
      <Link
        href={resource.file}
        className="inline-flex items-center justify-center gap-x-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
        prefetch={false}
      >
        Download
      </Link>
    </article>
  );
}
