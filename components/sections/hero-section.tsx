import { CTAButton } from "@/components/ui/cta-button";
import { SectionHeader } from "@/components/common/section-header";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { StatCard } from "@/components/common/stat-card";
import type { CTA, KeyMetrics } from "@/content/schema";
import type { CompiledSection } from "@/lib/content";

function HeroGradient() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-secondary/20" />
      <svg
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-64 w-full opacity-40 motion-safe:animate-wave"
        style={{ backgroundSize: "200% 100%" }}
      >
        <defs>
          <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(10,49,97,0.6)" />
            <stop offset="50%" stopColor="rgba(179,25,66,0.45)" />
            <stop offset="100%" stopColor="rgba(201,162,39,0.4)" />
          </linearGradient>
        </defs>
        <rect fill="url(#wave-gradient)" width="100%" height="100%" />
      </svg>
    </div>
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

  return (
    <SectionWrapper id={section.meta.id} background="brand">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-secondary/20 via-background to-background p-10 shadow-elevated">
        <HeroGradient />
        <div className="relative grid gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-center">
          <div className="flex flex-col gap-y-8">
            <SectionHeader title={section.meta.title} summary={section.meta.summary} align="left" />
            <div className="prose prose-invert max-w-prose text-base leading-relaxed text-foreground/90">
              <HeroContent />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {ctas.map((cta: CTA) => (
                <CTAButton key={cta.id} cta={cta} />
              ))}
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
