import { CTAButton } from "@/components/ui/cta-button";
import { GlowCard } from "@/components/common/glow-card";
import { SectionHeader } from "@/components/common/section-header";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { StatCard } from "@/components/common/stat-card";
import type { CTA, KeyMetrics } from "@/content/schema";
import type { CompiledSection } from "@/lib/content";
import { cn } from "@/lib/utils";

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
      <GlowCard
        className="rounded-[3rem] border-border/50 bg-[radial-gradient(circle_at_top,_rgba(88,137,255,0.22),_transparent_55%),radial-gradient(circle_at_bottom_right,_rgba(244,202,120,0.24),_transparent_60%),linear-gradient(150deg,rgba(9,17,34,0.92)_0%,rgba(24,28,45,0.9)_55%,rgba(37,18,41,0.9)_100%)] md:p-14"
        contentClassName="grid gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-center"
        glows={[
          "-top-24 -left-20 h-64 w-64 rounded-full bg-secondary/45",
          "bottom-[-18%] right-[-6%] h-80 w-80 rounded-full bg-primary/40 blur-[160px]",
          "top-1/3 right-1/3 h-48 w-48 rounded-full bg-accent/25",
        ]}
      >
        <div className="flex flex-col gap-y-8">
          <SectionHeader
            title={section.meta.title}
            summary={section.meta.summary}
            summaryClassName="text-foreground/85"
            align="left"
          />
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
      </GlowCard>
    </SectionWrapper>
  );
}
