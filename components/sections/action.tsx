import Link from "next/link";
import { Calendar, Users, ArrowRight, Zap, Clock, Shield } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionBackground } from "@/components/ui/SectionBackground";

export function ActionSection() {
  return (
    <Section id="action" className="relative overflow-hidden">
      <SectionBackground variant="hero" />

      <div className="relative z-10">
        <div className="mx-auto max-w-5xl text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-medium mb-6 dark:bg-amber-900/20 dark:text-amber-300">
            <Zap className="w-4 h-4 mr-2" />
            Ready to Act
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-text-primary mb-6 leading-tight">
            Take <span className="text-gradient">Action</span>
          </h2>
          <p className="text-xl sm:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Schedule a bipartisan briefing or request statutory language. Our coalition team is
            ready to support committees, caucuses, and private-sector partners.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 max-w-4xl mx-auto mb-16">
          {/* Congressional Briefing Card */}
          <Card
            emphasis
            hover
            className="group relative text-left animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-serif font-bold text-text-primary group-hover:text-gradient transition-all duration-300">
                    Congressional Briefing
                  </h3>
                  <div className="flex items-center text-primary text-sm font-medium mt-1">
                    <Clock className="w-4 h-4 mr-1" />
                    30 minutes
                  </div>
                </div>
              </div>

              {/* Content */}
              <p className="text-text-secondary leading-relaxed group-hover:text-text-primary transition-colors duration-300">
                Tailored presentation for committee staff. Includes risk scenarios, cost controls,
                and scoring assumptions with actionable next steps.
              </p>

              {/* Features */}
              <div className="space-y-2">
                {["Risk scenario modeling", "Cost-benefit analysis", "Implementation timeline"].map(
                  (feature, index) => (
                    <div
                      key={index}
                      className="flex items-center text-sm text-text-secondary group-hover:text-text-primary transition-colors duration-300"
                    >
                      <Shield className="w-4 h-4 mr-2 text-primary" />
                      {feature}
                    </div>
                  ),
                )}
              </div>

              {/* CTA */}
              <Button asChild variant="gradient" size="lg" className="w-full group/btn">
                <Link href="mailto:briefings@tpri.gov">
                  <span>Request Briefing</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </div>
          </Card>

          {/* Coalition Partnership Card */}
          <Card
            emphasis
            hover
            className="group relative text-left animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-accent flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-serif font-bold text-text-primary group-hover:text-gradient transition-all duration-300">
                    Coalition Partnership
                  </h3>
                  <div className="flex items-center text-accent text-sm font-medium mt-1">
                    <Users className="w-4 h-4 mr-1" />
                    Multi-sector
                  </div>
                </div>
              </div>

              {/* Content */}
              <p className="text-text-secondary leading-relaxed group-hover:text-text-primary transition-colors duration-300">
                Align chambers of commerce, insurers, and investors ready to deploy capital into
                certified zones with bipartisan support.
              </p>

              {/* Features */}
              <div className="space-y-2">
                {[
                  "Industry stakeholder network",
                  "Policy advocacy coordination",
                  "Capital deployment readiness",
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center text-sm text-text-secondary group-hover:text-text-primary transition-colors duration-300"
                  >
                    <Shield className="w-4 h-4 mr-2 text-accent" />
                    {feature}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="w-full group/btn border-accent text-accent hover:bg-accent hover:text-white"
              >
                <Link href="mailto:coalition@tpri.gov">
                  <span>Join the Coalition</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </div>
          </Card>
        </div>

        {/* Bottom urgency banner */}
        <div className="max-w-4xl mx-auto">
          <div
            className="relative overflow-hidden rounded-2xl bg-gradient-hero p-8 text-center text-white animate-scale-in"
            style={{ animationDelay: "0.4s" }}
          >
            {/* Animated background pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 animate-shimmer" />

            <div className="relative z-10">
              <h3 className="text-2xl font-serif font-bold mb-2">Time-Sensitive Opportunity</h3>
              <p className="text-white/90 max-w-2xl mx-auto mb-6">
                Current legislative window provides unique bipartisan momentum. Early engagement
                ensures maximum policy impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white/20 border-white/30 text-white hover:bg-white hover:text-primary backdrop-blur-sm"
                >
                  Schedule Today
                </Button>
                <Button variant="ghost" size="lg" className="text-white hover:bg-white/20">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
