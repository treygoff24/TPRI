import type { CaseMetric } from "@/components/sections/types";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";

interface EvidenceSectionProps {
  metrics: CaseMetric[];
}

export function EvidenceSection({ metrics }: EvidenceSectionProps) {
  return (
    <Section id="evidence" background="surface">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-serif font-bold text-text-primary mb-4">
          Proven Results in Honduras
        </h2>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto">
          Próspera shows how transparent zones, private capital, and long-term insurance deliver
          measurable gains that counter authoritarian influence.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {metrics.map((metric) => (
          <Card key={metric.id} emphasis>
            <div className="space-y-3">
              <div className="text-3xl font-serif font-bold text-primary">{metric.label}</div>
              {metric.description ? (
                <p className="text-text-secondary text-base">{metric.description}</p>
              ) : null}
              {metric.citationId ? (
                <p className="text-sm text-text-muted">
                  Source: {metric.citationId.replace("ref-", "").toUpperCase()}
                </p>
              ) : null}
            </div>
          </Card>
        ))}
        <Card>
          <h3 className="text-2xl font-semibold text-text-primary mb-4">Why it matters</h3>
          <ul className="space-y-3 text-text-secondary">
            <li>Target employers secure finance without PRC guarantees.</li>
            <li>Zones lock in rule-of-law commitments for 25 years.</li>
            <li>Communities benefit from high-wage, formal employment pipelines.</li>
          </ul>
        </Card>
      </div>
    </Section>
  );
}
