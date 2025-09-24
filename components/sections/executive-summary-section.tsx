import { CTAButton } from "@/components/ui/cta-button";
import { SectionHeader } from "@/components/common/section-header";
import { SectionWrapper } from "@/components/common/section-wrapper";
import type { CTA } from "@/content/schema";
import type { CompiledSection } from "@/lib/content";

export function ExecutiveSummarySection({ section }: { section: CompiledSection }) {
  const SectionContent = section.Content;
  const ctas = section.meta.ctas ?? [];

  return (
    <SectionWrapper id={section.meta.id} background={section.meta.background}>
      <div className="flex flex-col gap-y-10">
        <SectionHeader title={section.meta.title} summary={section.meta.summary} align="left" />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="prose prose-sm max-w-none rounded-3xl border border-border/60 bg-background/80 p-6 shadow-sm prose-h3:mt-0 prose-h3:text-lg prose-h3:font-semibold prose-h3:text-foreground">
            <SectionContent />
          </div>
        </div>
        {ctas.length ? (
          <div className="flex flex-wrap items-center gap-3">
            {ctas.map((cta: CTA) => (
              <CTAButton key={cta.id} cta={cta} />
            ))}
          </div>
        ) : null}
      </div>
    </SectionWrapper>
  );
}
