import { ProgressiveContent } from "@/components/common/progressive-content";
import { SectionHeader } from "@/components/common/section-header";
import { SectionWrapper } from "@/components/common/section-wrapper";
import type { CompiledSection, HowItWorksStep } from "@/lib/content";

function FlowDiagram() {
  return (
    <svg
      role="img"
      aria-labelledby="how-it-works-diagram"
      viewBox="0 0 600 220"
      className="max-w-full"
    >
      <title id="how-it-works-diagram">TPRI coverage lifecycle diagram</title>
      <rect
        x="20"
        y="40"
        width="160"
        height="80"
        rx="16"
        className="fill-secondary/20 stroke-secondary"
      />
      <text x="100" y="90" textAnchor="middle" className="fill-secondary text-sm font-semibold">
        Investor applies
      </text>
      <rect
        x="220"
        y="40"
        width="160"
        height="80"
        rx="16"
        className="fill-primary/20 stroke-primary"
      />
      <text x="300" y="74" textAnchor="middle" className="fill-primary text-sm font-semibold">
        Zone compact
      </text>
      <text x="300" y="94" textAnchor="middle" className="fill-primary text-xs">
        Standards, audits, oversight
      </text>
      <rect
        x="420"
        y="40"
        width="160"
        height="80"
        rx="16"
        className="fill-accent/20 stroke-accent"
      />
      <text x="500" y="74" textAnchor="middle" className="fill-accent text-sm font-semibold">
        Coverage issued
      </text>
      <text x="500" y="94" textAnchor="middle" className="fill-accent text-xs">
        25–99 year umbrella policy
      </text>
      <path d="M180 80 H220" className="stroke-border" markerEnd="url(#arrow)" />
      <path d="M380 80 H420" className="stroke-border" markerEnd="url(#arrow)" />
      <rect
        x="220"
        y="140"
        width="160"
        height="60"
        rx="16"
        className="fill-danger/10 stroke-danger"
      />
      <text x="300" y="173" textAnchor="middle" className="fill-danger text-sm font-semibold">
        Coercion event handled
      </text>
      <path d="M300 120 V140" className="stroke-border" markerEnd="url(#arrow)" />
      <defs>
        <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" className="fill-border" />
        </marker>
      </defs>
    </svg>
  );
}

export function HowItWorksSection({
  section,
  steps,
}: {
  section: CompiledSection;
  steps: HowItWorksStep[];
}) {
  const SectionContent = section.Content;

  return (
    <SectionWrapper id={section.meta.id} background={section.meta.background}>
      <div className="flex flex-col gap-y-10">
        <SectionHeader title={section.meta.title} summary={section.meta.summary} align="left" />
        <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-start">
          <div className="space-y-6">
            <ProgressiveContent steps={steps} />
          </div>
          <div className="flex flex-col gap-y-6 rounded-3xl border border-border/60 bg-background/80 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground">Coverage Lifecycle</h3>
            <p className="text-sm text-muted-foreground">
              TPRI pairs zone certification with mandatory recovery. Investors join the umbrella
              policy, deploy capital, and receive immediate payouts if authoritarian interference
              occurs. Recovery teams then pursue triple damages against the aggressor.
            </p>
            <FlowDiagram />
          </div>
        </div>
        <div className="prose max-w-prose text-sm text-muted-foreground">
          <SectionContent />
        </div>
      </div>
    </SectionWrapper>
  );
}
