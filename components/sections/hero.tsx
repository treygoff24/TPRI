import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionBackground } from "@/components/ui/SectionBackground";

export function HeroSection() {
  return (
    <Section id="hero" className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      <SectionBackground variant="hero" />

      <div className="relative z-10 text-center animate-fade-in">
        <h1 className="text-5xl sm:text-6xl lg:text-8xl font-serif font-bold text-text-primary mb-8 leading-tight">
          A Strategic Tool to Counter
          <span className="block text-gradient mt-4 text-shimmer">
            China&rsquo;s Economic Influence
          </span>
        </h1>

        <p className="text-2xl sm:text-3xl font-semibold text-text-secondary max-w-4xl mx-auto mb-6 leading-relaxed">
          Market-based development finance that mobilizes American private capital.
        </p>

        <p className="text-lg sm:text-xl text-text-muted max-w-3xl mx-auto mb-16 leading-relaxed">
          TPRI transforms American development finance by providing comprehensive, long-term
          political risk coverage backed by statutory guarantees and aggressive recovery mechanisms.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
          <Button asChild variant="gradient" size="lg" className="animate-scale-in">
            <Link href="#resources">View 2-Minute Brief</Link>
          </Button>
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="animate-scale-in"
            style={{ animationDelay: "0.1s" }}
          >
            <Link href="/downloads/tpri-legislative-outline.pdf">Download Full Proposal</Link>
          </Button>
        </div>

        {/* Enhanced stats section */}
        <div className="relative">
          {/* Gradient line separator */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-12" />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-4xl mx-auto">
            <div
              className="group animate-slide-up overflow-visible"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="text-5xl sm:text-6xl font-serif font-bold text-gradient mb-3 group-hover:scale-110 transition-transform duration-300 leading-tight py-2">
                25-99 yr
              </div>
              <div className="text-base font-medium text-text-secondary group-hover:text-primary transition-colors duration-300">
                Coverage Duration
              </div>
            </div>

            <div
              className="group animate-slide-up overflow-visible"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="text-5xl sm:text-6xl font-serif font-bold text-gradient mb-3 group-hover:scale-110 transition-transform duration-300 leading-tight py-2">
                3×
              </div>
              <div className="text-base font-medium text-text-secondary group-hover:text-primary transition-colors duration-300">
                Recovery Multiplier
              </div>
            </div>

            <div
              className="group animate-slide-up overflow-visible"
              style={{ animationDelay: "0.6s" }}
            >
              <div className="text-5xl sm:text-6xl font-serif font-bold text-gradient mb-3 group-hover:scale-110 transition-transform duration-300 leading-tight py-2">
                70%
              </div>
              <div className="text-base font-medium text-text-secondary group-hover:text-primary transition-colors duration-300">
                U.S. Ownership
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
