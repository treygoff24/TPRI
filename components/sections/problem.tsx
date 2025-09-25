import { InteractiveMap } from "@/components/common/interactive-map";
import { Section } from "@/components/ui/Section";
import { StatCard } from "@/components/ui/StatCard";

export function ProblemSection() {
  return (
    <Section id="problem" background="surface">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif font-bold text-text-primary mb-4">
          The Strategic Competition
        </h2>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto">
          China&apos;s state-backed investment strategy is reshaping global alliances faster than
          traditional diplomacy can respond.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <StatCard
          number="$137B"
          label="Chinese state investment"
          trend="↑ 42% since 2019"
          description="Concentrated in Latin American infrastructure and ports"
        />
        <StatCard
          number="9"
          label="Nations switched to Beijing"
          trend="Last 24 months"
          description="Including 3 former U.S. security partners"
        />
        <StatCard
          number="878"
          label="Days since Paraguay stood firm"
          trend="Last Taiwan ally in South America"
          description="Every day increases pressure from Beijing"
        />
      </div>
      <div className="rounded-xl border border-border bg-white p-8">
        <h3 className="text-2xl font-semibold mb-6 text-text-primary">
          Diplomatic Recognition in the Americas
        </h3>
        <InteractiveMap />
      </div>
    </Section>
  );
}
