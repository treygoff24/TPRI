import { CTAButton } from "@/components/ui/cta-button";
import { SectionHeader } from "@/components/common/section-header";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { StatCard } from "@/components/common/stat-card";
import type { CTA, KeyMetrics } from "@/content/schema";
import type { CompiledSection } from "@/lib/content";
import { cn } from "@/lib/utils";

function HeroGradient() {
  return (
    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(140deg,rgba(16,28,48,0.95)_0%,rgba(27,19,48,0.95)_52%,rgba(38,16,40,0.95)_100%)]" />
  );
}

export function HeroSection({
  section,
  metrics,
}: {
  section: CompiledSection;
  metrics: KeyMetrics;
}) {
  const HeroContent = section.Content;
  const ctas = section.meta.ctas ?? [];
  const stats = [metrics.opportunitySize, metrics.annualMobilization, metrics.federalLeverage];
  const primaryCtas = ctas.slice(0, 2);
  const secondaryCtas = ctas.slice(2);

  return (
    <SectionWrapper id={section.meta.id} background="brand">
      <div className="relative overflow-hidden rounded-3xl border border-border/40 bg-[#10192d] p-8 shadow-elevated md:p-10">
        <HeroGradient />
        <div className="relative grid gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-center">
          <div className="flex flex-col gap-y-8">
            <SectionHeader title={section.meta.title} summary={section.meta.summary} align="left" />
            <div className="prose prose-invert max-w-prose text-base leading-relaxed text-foreground/90">
              <HeroContent />
            </div>
            <div className="flex flex-col gap-3">
              {primaryCtas.length ? (
                <div
                  className={cn(
                    "grid gap-3",
                    primaryCtas.length > 1 ? "sm:grid-cols-2 sm:max-w-xl" : "sm:max-w-xs",
                  )}
                >
                  {primaryCtas.map((cta: CTA) => {
                    const adjustedCta =
                      cta.id === "book-briefing" ? { ...cta, label: "Request Briefing" } : cta;
                    return (
                      <CTAButton
                        key={cta.id}
                        cta={adjustedCta}
                        className={cn(
                          "w-full min-h-[3rem] justify-center sm:justify-start",
                          cta.id === "book-briefing" &&
                            "bg-[linear-gradient(135deg,#ff6b6b_0%,#f97362_45%,#fbbf24_100%)] text-slate-950 shadow-lg hover:brightness-105",
                          cta.id === "download-kit" && "bg-muted/80 text-foreground",
                        )}
                      />
                    );
                  })}
                </div>
              ) : null}
              {secondaryCtas.length ? (
                <div className="flex flex-wrap gap-3">
                  {secondaryCtas.map((cta: CTA) => {
                    const adjustedCta =
                      cta.id === "book-briefing" ? { ...cta, label: "Request Briefing" } : cta;
                    return (
                      <CTAButton
                        key={cta.id}
                        cta={adjustedCta}
                        className="min-h-[3rem] justify-center sm:justify-start"
                      />
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>
          <div className="grid gap-4">
            {stats.map((stat, index) => (
              <StatCard key={stat.id} stat={stat} highlight={index === 0} />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
