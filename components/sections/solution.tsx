import { Shield, Building, Scale, Check, ArrowRight, TrendingUp } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionBackground } from "@/components/ui/SectionBackground";

export function SolutionSection() {
  return (
    <Section id="solution" className="relative overflow-hidden">
      <SectionBackground variant="hero" />

      <div className="relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6 dark:bg-green-900/20 dark:text-green-300">
            <Check className="w-4 h-4 mr-2" />
            Our Solution
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-text-primary mb-6 leading-tight">
            Insurance That <span className="text-gradient">Works</span>
          </h2>
          <p className="text-xl sm:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Three components that work together to mobilize private capital at scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <Card
            emphasis
            hover
            className="text-center group animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-primary flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
              <Shield className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-text-primary group-hover:text-gradient transition-all duration-300">
              Political Risk Insurance
            </h3>
            <p className="text-text-secondary leading-relaxed group-hover:text-text-primary transition-colors duration-300">
              25-year coverage for investments in certified zones, backed by a U.S. guarantee that
              keeps deals competitive with state-backed rivals.
            </p>
          </Card>

          <Card
            emphasis
            hover
            className="text-center group animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-accent flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
              <Building className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-text-primary group-hover:text-gradient transition-all duration-300">
              Strategic Economic Zones
            </h3>
            <p className="text-text-secondary leading-relaxed group-hover:text-text-primary transition-colors duration-300">
              Pre-vetted locations with transparent governance, OECD-compliant regulations, and
              security vetting.
            </p>
          </Card>

          <Card
            emphasis
            hover
            className="text-center group animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-hero flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
              <Scale className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-text-primary group-hover:text-gradient transition-all duration-300">
              Triple-Damages Recovery
            </h3>
            <p className="text-text-secondary leading-relaxed group-hover:text-text-primary transition-colors duration-300">
              Statutory recovery powers ensure bad actors face real consequences for interference.
            </p>
          </Card>
        </div>

        {/* Enhanced Investment Lifecycle */}
        <div className="relative">
          <div className="rounded-2xl bg-gradient-card border border-border/50 p-8 md:p-12 shadow-xl backdrop-blur-sm">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-serif font-bold text-text-primary mb-4">
                Investment <span className="text-gradient">Lifecycle</span>
              </h3>
              <p className="text-text-secondary max-w-2xl mx-auto">
                A streamlined process that transforms policy into prosperity
              </p>
            </div>

            <div className="relative">
              {/* Connecting flow line */}
              <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary opacity-30" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                {[
                  {
                    icon: Check,
                    label: "Zone Certification",
                    description: "Host nation meets transparency and security standards.",
                    color: "bg-gradient-primary",
                  },
                  {
                    icon: TrendingUp,
                    label: "Investment Flows",
                    description:
                      "Private capital flows with long-term coverage and predictable policy.",
                    color: "bg-gradient-accent",
                  },
                  {
                    icon: ArrowRight,
                    label: "Economic Growth",
                    description:
                      "Jobs and prosperity strengthen alliances without direct subsidies.",
                    color: "bg-gradient-hero",
                  },
                ].map((step, index) => (
                  <div key={step.label} className="relative text-center group">
                    {/* Step number and icon */}
                    <div
                      className={`relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${step.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <step.icon className="w-8 h-8" />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-white text-primary rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                        {index + 1}
                      </div>
                    </div>

                    {/* Arrow connector (hidden on mobile) */}
                    {index < 2 && (
                      <div className="hidden md:block absolute top-5 -right-6 text-primary/30">
                        <ArrowRight className="w-6 h-6" />
                      </div>
                    )}

                    {/* Content */}
                    <div className="font-semibold text-lg text-text-primary mb-2 group-hover:text-gradient transition-all duration-300">
                      {step.label}
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed group-hover:text-text-primary transition-colors duration-300">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
