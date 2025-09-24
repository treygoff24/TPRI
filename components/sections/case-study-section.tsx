import Image from "next/image";

import { SectionHeader } from "@/components/common/section-header";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { StatCard } from "@/components/common/stat-card";
import type { Stat, Endorsement } from "@/content/schema";
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

function EndorsementCard({ endorsement }: { endorsement: Endorsement }) {
  return (
    <article className="flex h-full flex-col gap-y-4 rounded-3xl border border-border/60 bg-background/85 p-6 shadow-sm">
      {endorsement.logo ? (
        <Image
          src={endorsement.logo}
          alt={`${endorsement.organization} logo`}
          width={160}
          height={32}
          className="h-8 w-auto"
          loading="lazy"
        />
      ) : null}
      <p className="text-base font-medium text-foreground/90">“{endorsement.quote}”</p>
      <div className="mt-auto text-sm text-muted-foreground">
        <p className="font-semibold text-foreground">{endorsement.name}</p>
        <p>
          {endorsement.title}
          {endorsement.organization ? ` · ${endorsement.organization}` : null}
        </p>
        {endorsement.url ? (
          <a
            href={endorsement.url}
            className="mt-2 inline-flex text-xs font-semibold text-primary underline decoration-dotted"
            target="_blank"
            rel="noreferrer"
          >
            View profile
          </a>
        ) : null}
      </div>
    </article>
  );
}

export function CaseStudySection({
  section,
  metrics,
  endorsements,
}: {
  section: CompiledSection;
  metrics: CaseMetric[];
  endorsements: Endorsement[];
}) {
  const SectionContent = section.Content;
  const highlightEndorsements = endorsements.slice(0, 3);

  return (
    <SectionWrapper id={section.meta.id} background={section.meta.background}>
      <div className="flex flex-col gap-y-12">
        <SectionHeader title={section.meta.title} summary={section.meta.summary} align="left" />
        <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-start">
          <div className="space-y-10">
            <div className="prose max-w-prose text-base leading-relaxed text-muted-foreground">
              <SectionContent />
            </div>
            {highlightEndorsements.length ? (
              <div className="grid gap-6 md:grid-cols-2">
                {highlightEndorsements.map((endorsement) => (
                  <EndorsementCard key={endorsement.id} endorsement={endorsement} />
                ))}
              </div>
            ) : null}
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
