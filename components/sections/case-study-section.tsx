import Image from "next/image";

import { GlowCard } from "@/components/common/glow-card";
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

function EndorsementCard({ endorsement, index }: { endorsement: Endorsement; index: number }) {
  return (
    <GlowCard
      className="h-full rounded-[1.8rem] border-border/60 bg-gradient-to-br from-background/55 via-background/75 to-background/45 p-6"
      contentClassName="flex h-full flex-col gap-y-4"
      glows={
        index % 2 === 0
          ? ["-top-10 right-[-10%] h-36 w-36 rounded-full bg-secondary/30"]
          : ["-bottom-12 left-[-12%] h-36 w-36 rounded-full bg-primary/25"]
      }
    >
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
      <div className="mt-auto text-sm text-foreground/70">
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
    </GlowCard>
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
      <GlowCard
        className="rounded-[2.5rem] border-border/50 bg-gradient-to-br from-secondary/12 via-background/70 to-background/40"
        contentClassName="flex flex-col gap-y-12"
        glows={[
          "-top-16 -left-10 h-52 w-52 rounded-full bg-secondary/30",
          "bottom-[-18%] right-[-12%] h-64 w-64 rounded-full bg-primary/30",
        ]}
      >
        <SectionHeader
          title={section.meta.title}
          summary={section.meta.summary}
          summaryClassName="text-foreground/85"
          align="left"
        />
        <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-start">
          <div className="space-y-10">
            <div className="prose max-w-prose text-base leading-relaxed text-foreground/80">
              <SectionContent />
            </div>
            {highlightEndorsements.length ? (
              <div className="grid gap-6 md:grid-cols-2">
                {highlightEndorsements.map((endorsement, index) => (
                  <EndorsementCard key={endorsement.id} endorsement={endorsement} index={index} />
                ))}
              </div>
            ) : null}
          </div>
          <div className="grid gap-6">
            {metrics.map((metric, index) => (
              <StatCard key={metric.id} stat={toStat(metric)} highlight={index === 0} />
            ))}
          </div>
        </div>
      </GlowCard>
    </SectionWrapper>
  );
}
