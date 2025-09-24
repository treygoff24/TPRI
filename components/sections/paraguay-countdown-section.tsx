import { daysSince, getParaguayCountdown } from "@/lib/metrics";
import { cn, formatDate } from "@/lib/utils";
import { GlowCard } from "@/components/common/glow-card";
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
        <GlowCard
          className="rounded-[2.5rem] border-border/50 bg-gradient-to-br from-secondary/10 via-background/70 to-background/40"
          contentClassName="flex flex-col gap-y-8"
          glows={[
            "-top-16 -left-12 h-52 w-52 rounded-full bg-secondary/35",
            "bottom-[-20%] right-[-10%] h-64 w-64 rounded-full bg-primary/30",
          ]}
        >
          <SectionHeader
            title={section.meta.title}
            summary={section.meta.summary}
            summaryClassName="text-foreground/85"
            align="left"
          />
          <div className="prose max-w-prose text-base leading-relaxed text-foreground/85">
            <CountdownContent />
          </div>
        </GlowCard>
        <GlowCard
          className="rounded-[2rem] border-border/60 bg-gradient-to-br from-background/40 via-background/70 to-background/40"
          contentClassName="flex flex-col items-start gap-y-5"
          glows={[
            "-right-10 top-0 h-48 w-48 rounded-full bg-warning/30",
            "-left-10 bottom-[-20%] h-56 w-56 rounded-full bg-secondary/35",
          ]}
        >
          <span className="inline-flex items-center gap-x-2 text-xs font-semibold uppercase tracking-[0.35em] text-foreground/70">
            <span
              className={cn("h-2.5 w-2.5 rounded-full bg-warning/80", "motion-safe:animate-pulse")}
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
          <p className="text-sm text-foreground/70">
            Countdown reference:{" "}
            {formatDate(countdown.startDate, { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </GlowCard>
      </div>
    </SectionWrapper>
  );
}
