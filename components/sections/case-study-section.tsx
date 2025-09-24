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
        <div className="grid gap-6 md:grid-cols-2">
          {BEFORE_AFTER.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-border/60 bg-background/80 p-6 shadow-sm"
            >
              <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {item.points.map((point) => (
                  <li key={point} className="flex items-start gap-x-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-secondary" aria-hidden />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
