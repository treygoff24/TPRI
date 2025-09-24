import { CTAButton } from "@/components/ui/cta-button";
import { SectionHeader } from "@/components/common/section-header";
import { SectionWrapper } from "@/components/common/section-wrapper";
import type { CompiledSection } from "@/lib/content";
import { cn } from "@/lib/utils";

export function ExecutiveSummarySection({ section }: { section: CompiledSection }) {
  const SectionContent = section.Content;
  const ctas = section.meta.ctas ?? [];

  return (
    <SectionWrapper id={section.meta.id} background={section.meta.background}>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-start">
        <div className="space-y-8">
          <SectionHeader
            title={section.meta.title}
            summary={section.meta.summary}
            actions={
              ctas.length
                ? ctas.map((cta) => (
                    <CTAButton
                      key={cta.id}
                      cta={cta}
                      className={cn(
                        "min-h-[3rem] justify-center sm:justify-start",
                        cta.variant === "secondary" && "bg-muted/80 text-foreground",
                      )}
                    />
                  ))
                : undefined
            }
          />
          <div className="prose max-w-none text-base leading-relaxed text-muted-foreground">
            <SectionContent />
          </div>
        </div>
        <div className="space-y-4 rounded-3xl border border-border/70 bg-background/80 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-foreground">Policy Leaders Get</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-x-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden />
              Long-horizon insurance matched to democratic strategic zones.
            </li>
            <li className="flex items-start gap-x-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden />
              Statutory recovery powers that deter coercive interference.
            </li>
            <li className="flex items-start gap-x-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden />
              Guardrails modeled on OECD partners to keep capital accountable.
            </li>
            <li className="flex items-start gap-x-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden />A briefing
              toolkit ready for congressional and executive stakeholders.
            </li>
          </ul>
        </div>
      </div>
    </SectionWrapper>
  );
}
