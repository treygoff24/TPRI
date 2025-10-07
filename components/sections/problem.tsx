import { TrendingUp, Users, Clock } from "lucide-react";

import { InteractiveMap } from "@/components/common/interactive-map";
import { Section } from "@/components/ui/Section";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { StatCard } from "@/components/ui/StatCard";

export function ProblemSection() {
  return (
    <Section id="problem" className="relative overflow-hidden">
      <SectionBackground variant="hero" />

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
            number="$137B+"
            label="Chinese state investment"
            trend="Since 2005"
            description="Targeted at Latin American infrastructure, ports, and minerals"
            icon={<TrendingUp className="w-6 h-6" />}
            gradient
          />
          <StatCard
            number="7"
            label="Nations switched to Beijing"
            trend="Since 2000"
            description="Western Hemisphere countries, most recent: Honduras (2023)"
            icon={<Users className="w-6 h-6" />}
            gradient
          />
          <StatCard
            number="$3.6B"
            label="Peru's Chancay megaport"
            trend="60% Chinese ownership"
            description="Strategic Pacific gateway controlled by China's Cosco"
            icon={<Clock className="w-6 h-6" />}
            gradient
          />
        </div>

        {/* Map Section with Stats Panel */}
        <div className="relative">
          <div className="rounded-2xl border border-border/50 bg-white/80 backdrop-blur-sm p-8 shadow-xl hover:shadow-2xl transition-all duration-300 dark:bg-slate-800/80">
            {/* Premium header */}
            <div className="mb-8">
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-text-primary mb-2">
                Diplomatic Recognition in the Americas
              </h3>
              <p className="text-text-secondary">Real-time view of shifting diplomatic alliances</p>
            </div>

            {/* 2-Column Layout: Map + Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-8 items-start">
              {/* Map Column */}
              <div className="relative rounded-xl overflow-hidden lg:min-h-[600px] flex items-center w-full">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 rounded-xl" />
                <InteractiveMap height={600} className="w-full" />
              </div>

              {/* Stats Panel Column */}
              <div className="flex flex-col gap-4">
                <div className="mb-2">
                  <h4 className="text-lg font-semibold text-text-primary">The Diplomatic Shift</h4>
                  <p className="text-sm text-text-secondary">
                    Recognition at a glance across the Western Hemisphere
                  </p>
                </div>

                <StatCard
                  number="27"
                  label="Recognize the PRC (Beijing)"
                  description="Including former U.S. security partners"
                />

                <StatCard
                  number="7"
                  label="Recognize Taiwan (ROC)"
                  description="Down from 22 countries in 2016"
                />

                <StatCard
                  number="21"
                  label="Joined Belt & Road Initiative"
                  description="Latin America & Caribbean participants"
                />
              </div>
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
