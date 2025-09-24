import { daysSince, getParaguayCountdown } from "@/lib/metrics";
import { cn, formatDate } from "@/lib/utils";
import { SectionHeader } from "@/components/common/section-header";
import { SectionWrapper } from "@/components/common/section-wrapper";
import type { CompiledSection } from "@/lib/content";

export function ParaguayCountdownSection({ section }: { section: CompiledSection }) {
  const CountdownContent = section.Content;
  const countdown = getParaguayCountdown();
  const days = daysSince(countdown.startDate);

  return (
    <SectionWrapper id={section.meta.id} background={section.meta.background}>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-center">
        <div className="flex flex-col gap-y-6">
          <SectionHeader title={section.meta.title} summary={section.meta.summary} align="left" />
          <div className="prose max-w-prose text-base leading-relaxed text-muted-foreground">
            <CountdownContent />
          </div>
        </div>
        <div className="flex flex-col items-start gap-y-4 rounded-3xl border border-border/60 bg-background/80 p-8 shadow-sm">
          <span className="inline-flex items-center gap-x-2 text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            <span
              className={cn("h-2.5 w-2.5 rounded-full bg-warning", "motion-safe:animate-pulse")}
              aria-hidden
            />
            Days since reaffirmation
          </span>
          <p
            className="text-6xl font-semibold text-secondary"
            data-testid="paraguay-countdown-value"
          >
            {days}
          </p>
          <p className="text-sm text-muted-foreground">
            Countdown reference:{" "}
            {formatDate(countdown.startDate, { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
