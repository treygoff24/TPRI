import { ComparisonTable } from "@/components/common/comparison-table";
import { GlowCard } from "@/components/common/glow-card";
import { SectionHeader } from "@/components/common/section-header";
import { SectionWrapper } from "@/components/common/section-wrapper";
import comparisonRows from "@/data/comparison.json";
import type { KeyMetrics } from "@/content/schema";
import type { CompiledSection } from "@/lib/content";

export function ComparisonSection({
  section,
  keyMetrics,
}: {
  section: CompiledSection;
  keyMetrics: KeyMetrics;
}) {
  const SectionContent = section.Content;

  return (
    <SectionWrapper id={section.meta.id} background={section.meta.background}>
      <GlowCard
        className="rounded-[2.5rem] border-border/50 bg-gradient-to-br from-secondary/12 via-background/70 to-background/40"
        contentClassName="flex flex-col gap-y-12"
        glows={[
          "-top-16 -left-8 h-48 w-48 rounded-full bg-secondary/30",
          "bottom-[-18%] right-[-10%] h-60 w-60 rounded-full bg-primary/30",
        ]}
      >
        <SectionHeader
          title={section.meta.title}
          summary={section.meta.summary}
          summaryClassName="text-foreground/85"
          align="left"
        />
        <div className="prose max-w-prose text-sm text-foreground/75">
          <SectionContent />
        </div>
        <ComparisonTable rows={comparisonRows} />
        <GlowCard
          className="rounded-[2rem] border-primary/40 bg-gradient-to-br from-primary/20 via-primary/15 to-primary/10 p-6 text-sm"
          contentClassName="space-y-2"
          glows={[
            "-top-12 right-[-12%] h-48 w-48 rounded-full bg-accent/35",
            "-bottom-14 left-[-8%] h-44 w-44 rounded-full bg-secondary/35",
          ]}
        >
          <p className="text-sm font-semibold text-primary-foreground/80">Bottom line</p>
          <p className="text-sm text-primary-foreground">
            Every federal dollar backstopping TPRI mobilizes roughly{" "}
            {keyMetrics.federalLeverage.value.toFixed(1)}× private investment—an order of magnitude
            more than legacy political risk tools.
          </p>
        </GlowCard>
      </GlowCard>
    </SectionWrapper>
  );
}
