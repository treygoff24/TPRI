import { ComparisonTable } from "@/components/common/comparison-table";
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
      <div className="flex flex-col gap-y-10">
        <SectionHeader title={section.meta.title} summary={section.meta.summary} align="left" />
        <div className="prose max-w-prose text-sm text-muted-foreground">
          <SectionContent />
        </div>
        <ComparisonTable rows={comparisonRows} />
        <div className="rounded-3xl border border-primary/40 bg-primary/10 p-6 text-sm text-primary">
          <p className="font-semibold">Bottom line</p>
          <p className="mt-2 text-primary">
            Every federal dollar backstopping TPRI mobilizes roughly{" "}
            {keyMetrics.federalLeverage.value.toFixed(1)}× private investment—an order of magnitude
            more than legacy political risk tools.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
