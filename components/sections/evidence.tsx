import { BarChart3, Users, DollarSign, CheckCircle, ArrowUpRight } from "lucide-react";

import type { CaseMetric } from "@/components/sections/types";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionBackground } from "@/components/ui/SectionBackground";

interface EvidenceSectionProps {
  metrics: CaseMetric[];
}

export function EvidenceSection({ metrics }: EvidenceSectionProps) {
  // Icons for different metric types
  const getMetricIcon = (metric: CaseMetric) => {
    if (metric.label.includes("jobs")) return Users;
    if (metric.label.includes("FDI") || metric.label.includes("$")) return DollarSign;
    return BarChart3;
  };

  return (
    <Section id="evidence" background="surface" className="relative overflow-hidden">
      <SectionBackground variant="evidence" />

      <div className="relative z-10">
        <div className="mb-16 text-center animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-6 dark:bg-emerald-900/20 dark:text-emerald-300">
            <CheckCircle className="w-4 h-4 mr-2" />
            Real Results
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-text-primary mb-6 leading-tight">
            Proven Results in <span className="text-gradient">Honduras</span>
          </h2>
          <p className="text-xl sm:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Próspera shows how transparent zones, private capital, and long-term insurance deliver
            measurable gains that counter authoritarian influence.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {metrics.map((metric, index) => {
            const IconComponent = getMetricIcon(metric);
            return (
              <Card
                key={metric.id}
                emphasis
                hover
                gradient
                className="group animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="space-y-4">
                  {/* Icon and trend indicator */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex items-center text-emerald-600 text-sm font-medium">
                      <ArrowUpRight className="w-4 h-4 mr-1" />
                      Growth
                    </div>
                  </div>

                  {/* Metric value */}
                  <div className="text-4xl font-serif font-bold text-gradient group-hover:scale-105 transition-transform duration-300">
                    {metric.label}
                  </div>

                  {/* Description */}
                  {metric.description && (
                    <p className="text-text-secondary text-base leading-relaxed group-hover:text-text-primary transition-colors duration-300">
                      {metric.description}
                    </p>
                  )}

                  {/* Citation */}
                  {metric.citationId && (
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium dark:bg-emerald-900/20 dark:text-emerald-300">
                      Source: {metric.citationId.replace("ref-", "").toUpperCase()}
                    </div>
                  )}
                </div>
              </Card>
            );
          })}

          {/* Why it matters card */}
          <Card
            hover
            glass
            className="group md:col-span-2 lg:col-span-1 animate-slide-up"
            style={{ animationDelay: `${metrics.length * 0.1}s` }}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-text-primary group-hover:text-gradient transition-all duration-300">
                  Why it matters
                </h3>
              </div>

              <ul className="space-y-4">
                {[
                  "Target employers secure finance without PRC guarantees.",
                  "Zones lock in rule-of-law commitments for 25 years.",
                  "Communities benefit from high-wage, formal employment pipelines.",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-text-secondary group-hover:text-text-primary transition-colors duration-300"
                  >
                    <div className="w-5 h-5 rounded-full bg-gradient-primary flex items-center justify-center mt-0.5 flex-shrink-0">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>

        {/* Bottom decorative accent */}
        <div className="mt-16 flex justify-center">
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
        </div>
      </div>
    </Section>
  );
}
