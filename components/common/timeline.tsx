import type { TimelineEvent } from "@/content/schema";
import { formatDate } from "@/lib/utils";

export function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <ol className="relative flex overflow-x-auto pb-4 lg:grid lg:grid-cols-1 lg:gap-y-6 lg:overflow-visible">
      {events.map((event, index) => (
        <li
          key={event.id}
          className="relative flex min-w-[260px] flex-col gap-y-3 border-l border-border/50 pl-6 lg:min-w-0"
        >
          <span
            className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-background bg-primary"
            aria-hidden
          />
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            {formatDate(event.date)}
          </span>
          <h3 className="text-base font-semibold text-foreground">{event.title}</h3>
          <p className="text-sm text-muted-foreground">{event.summary}</p>
          <p className="text-xs text-muted-foreground/80">Impact: {event.impact}</p>
          <a
            href={event.sourceUrl}
            className="text-xs font-semibold text-primary underline"
            target="_blank"
            rel="noreferrer"
          >
            Source
          </a>
          {index < events.length - 1 ? (
            <div
              className="absolute left-[-1px] top-[calc(100%+0.5rem)] hidden h-8 w-px bg-border/40 lg:block"
              aria-hidden
            />
          ) : null}
        </li>
      ))}
    </ol>
  );
}
