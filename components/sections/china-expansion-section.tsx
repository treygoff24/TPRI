import { InteractiveMap } from "@/components/common/interactive-map";
import { GlowCard } from "@/components/common/glow-card";
import { SectionHeader } from "@/components/common/section-header";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { StatCard } from "@/components/common/stat-card";
import { Timeline } from "@/components/common/timeline";
import type { KeyMetrics, Stat, TimelineEvent } from "@/content/schema";
import type { CompiledSection } from "@/lib/content";

export type SimpleMetric = {
  id: string;
  label: string;
  value: number;
  format: "currency" | "number" | "multiple";
  citationId?: string;
};

function convertToStat(metric: SimpleMetric): Stat {
  const unit = metric.format === "currency" ? "$" : metric.format === "multiple" ? "x" : "raw";
  return {
    id: metric.id,
    label: metric.label,
    value: metric.value,
    unit,
    tooltip: metric.citationId ? `Source: ${metric.citationId}` : undefined,
    citationId: metric.citationId,
  } satisfies Stat;
}

export function ChinaExpansionSection({
  section,
  timeline,
  keyMetrics,
  expansionMetrics,
}: {
  section: CompiledSection;
  timeline: TimelineEvent[];
  keyMetrics: KeyMetrics;
  expansionMetrics: SimpleMetric[];
}) {
  const SectionContent = section.Content;
  const stats: Stat[] = [
    convertToStat(expansionMetrics[0]),
    convertToStat(expansionMetrics[1]),
    keyMetrics.geopoliticalCost,
  ];

  return (
    <SectionWrapper id={section.meta.id} background={section.meta.background}>
      <div className="flex flex-col gap-y-12">
        <GlowCard
          className="rounded-[2.5rem] border-border/50 bg-gradient-to-br from-secondary/10 via-background/70 to-background/35"
          contentClassName="flex flex-col gap-y-8"
          glows={[
            "-top-16 -left-12 h-52 w-52 rounded-full bg-secondary/35",
            "bottom-[-18%] right-[-12%] h-64 w-64 rounded-full bg-primary/30",
          ]}
        >
          <SectionHeader
            title={section.meta.title}
            summary={section.meta.summary}
            summaryClassName="text-foreground/85"
            align="left"
          />
          <div className="prose max-w-prose text-base leading-relaxed text-foreground/85 prose-strong:text-accent prose-p:text-foreground/85 prose-li:text-foreground/80 marker:text-accent">
            <SectionContent />
          </div>
        </GlowCard>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <GlowCard
            className="rounded-[2.2rem] border-border/60 bg-gradient-to-br from-background/50 via-background/70 to-background/40"
            contentClassName="flex flex-col gap-y-6"
            glows={[
              "-left-10 top-0 h-48 w-48 rounded-full bg-secondary/30",
              "-right-10 bottom-[-20%] h-56 w-56 rounded-full bg-primary/30",
            ]}
          >
            <h3 className="text-lg font-semibold text-foreground">Timeline of PRC Expansion</h3>
            <Timeline events={timeline} />
          </GlowCard>
          <GlowCard
            className="rounded-[2.2rem] border-border/60 bg-gradient-to-br from-background/45 via-background/70 to-background/40"
            contentClassName="flex flex-col gap-y-6"
            glows={[
              "-right-12 top-0 h-52 w-52 rounded-full bg-accent/30",
              "-left-12 bottom-[-25%] h-60 w-60 rounded-full bg-primary/25",
            ]}
          >
            <h3 className="text-lg font-semibold text-foreground">Recognition Map</h3>
            <InteractiveMap />
          </GlowCard>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} highlight={index === 0} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
