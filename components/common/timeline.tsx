import type { TimelineEvent } from "@/content/schema";
import { formatDate } from "@/lib/utils";

export function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <ol className="relative flex overflow-x-auto pb-4 lg:grid lg:grid-cols-1 lg:gap-y-6 lg:overflow-visible">
      {events.map((event, index) => (
        <li
          key={event.id}
          className="relative flex min-w-[260px] flex-col gap-y-3 border-l border-foreground/20 pl-6 transition hover:bg-background/40 lg:min-w-0"
        >
          <span
            className="absolute -left-[10px] top-2 h-3.5 w-3.5 rounded-full border-2 border-background bg-gradient-to-br from-primary to-secondary"
            aria-hidden
          />
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-foreground/60">
            {formatDate(event.date)}
          </span>
          <h3 className="text-base font-semibold text-foreground">{event.title}</h3>
          <p className="text-sm text-foreground/70">{event.summary}</p>
          <p className="text-xs text-foreground/60">Impact: {event.impact}</p>
          <a
            href={event.sourceUrl}
            className="text-xs font-semibold text-primary underline decoration-dotted"
            target="_blank"
            rel="noreferrer"
          >
            Source
          </a>
          {index < events.length - 1 ? (
            <div
              className="absolute left-[-1px] top-[calc(100%+0.5rem)] hidden h-8 w-px bg-foreground/15 lg:block"
              aria-hidden
            />
          ) : null}
        </li>
      ))}
    </ol>
  );
}
