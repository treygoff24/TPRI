import { SectionHeader } from "@/components/common/section-header";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { StatCard } from "@/components/common/stat-card";
import type { Stat } from "@/content/schema";
import type { CompiledSection } from "@/lib/content";

export type CaseMetric = {
  id: string;
  label: string;
  value: number;
  format: "currency" | "number";
  citationId?: string;
};

function toStat(metric: CaseMetric): Stat {
  return {
    id: metric.id,
    label: metric.label,
    value: metric.value,
    unit: metric.format === "currency" ? "$" : "raw",
    citationId: metric.citationId,
  };
}

export function CaseStudySection({
  section,
  metrics,
}: {
  section: CompiledSection;
  metrics: CaseMetric[];
}) {
  const SectionContent = section.Content;

  return (
    <SectionWrapper id={section.meta.id} background={section.meta.background}>
      <div className="flex flex-col gap-y-10">
        <SectionHeader title={section.meta.title} summary={section.meta.summary} align="left" />
        <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-center">
          <div className="prose max-w-prose text-base leading-relaxed text-muted-foreground">
            <SectionContent />
          </div>
          <div className="grid gap-4">
            {metrics.map((metric) => (
              <StatCard key={metric.id} stat={toStat(metric)} />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
