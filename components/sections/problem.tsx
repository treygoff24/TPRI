import { TrendingUp, Users, Clock } from "lucide-react";

import { InteractiveMap } from "@/components/common/interactive-map";
import { Section } from "@/components/ui/Section";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { StatCard } from "@/components/ui/StatCard";

export function ProblemSection() {
  return (
    <Section id="problem" background="surface" className="relative overflow-hidden">
      <SectionBackground variant="problem" />

      <div className="relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm font-medium mb-6 dark:bg-red-900/20 dark:text-red-300">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse" />
            Critical Challenge
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-text-primary mb-6 leading-tight">
            The Strategic <span className="text-gradient">Competition</span>
          </h2>
          <p className="text-xl sm:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            China&apos;s state-backed investment strategy is reshaping global alliances faster than
            traditional diplomacy can respond.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <StatCard
            number="$137B"
            label="Chinese state investment"
            trend="↑ 42% since 2019"
            description="Concentrated in Latin American infrastructure and ports"
            icon={<TrendingUp className="w-6 h-6" />}
            gradient
          />
          <StatCard
            number="9"
            label="Nations switched to Beijing"
            trend="Last 24 months"
            description="Including 3 former U.S. security partners"
            icon={<Users className="w-6 h-6" />}
            gradient
          />
          <StatCard
            number="878"
            label="Days since Paraguay stood firm"
            trend="Last Taiwan ally in South America"
            description="Every day increases pressure from Beijing"
            icon={<Clock className="w-6 h-6" />}
            gradient
          />
        </div>

        {/* Enhanced map container */}
        <div className="relative">
          <div className="rounded-2xl border border-border/50 bg-white/80 backdrop-blur-sm p-8 shadow-xl hover:shadow-2xl transition-all duration-300 dark:bg-slate-800/80">
            {/* Premium header */}
            <div className="mb-8">
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-text-primary mb-2">
                Diplomatic Recognition in the Americas
              </h3>
              <p className="text-text-secondary">Real-time view of shifting diplomatic alliances</p>
            </div>

            {/* Map with subtle border glow */}
            <div className="relative rounded-xl overflow-hidden">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 rounded-xl" />
              <InteractiveMap />
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-primary rounded-full opacity-20" />
          <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-accent rounded-full opacity-30" />
        </div>
      </div>
    </Section>
  );
}
