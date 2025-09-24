import { InteractiveMap } from "@/components/common/interactive-map";
import { SectionHeader } from "@/components/common/section-header";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { StatCard } from "@/components/common/stat-card";
import { Timeline } from "@/components/common/timeline";
import type { KeyMetrics, Stat, TimelineEvent } from "@/content/schema";
import type { CompiledSection } from "@/lib/content";
import type { MapData } from "@/lib/map";

type SimpleMetric = {
  id: string;
  label: string;
  value: number;
  format: "currency" | "number" | "multiple";
  citationId?: string;
};

function convertToStat(metric: SimpleMetric): Stat {
  const unit =
    metric.format === "currency" ? "$" : metric.format === "multiple" ? "x" : "raw";
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
  map,
  keyMetrics,
  expansionMetrics,
}: {
  section: CompiledSection;
  timeline: TimelineEvent[];
  map: MapData;
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
        <SectionHeader title={section.meta.title} summary={section.meta.summary} align="left" />
        <div className="prose max-w-prose text-base text-muted-foreground">
          <SectionContent />
        </div>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div className="flex flex-col gap-8">
            <h3 className="text-lg font-semibold text-foreground">Timeline of PRC Expansion</h3>
            <Timeline events={timeline} />
          </div>
          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-semibold text-foreground">Recognition Map</h3>
            <InteractiveMap features={map.features} recognition={map.recognition} />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
