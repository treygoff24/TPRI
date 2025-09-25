import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export function HeroSection() {
  return (
    <Section id="hero" className="min-h-screen flex items-center pt-24">
      <div className="text-center">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-text-primary mb-6">
          Unlock $3 Trillion in
          <span className="block text-primary mt-2">American Investment</span>
        </h1>
        <p className="text-xl sm:text-2xl text-text-secondary max-w-3xl mx-auto mb-4">
          Private capital beats state control.
        </p>
        <p className="text-lg text-text-muted max-w-2xl mx-auto mb-12">
          A bipartisan insurance framework that mobilizes American investment to counter
          authoritarian influence without taxpayer subsidies.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="primary" size="lg">
            <Link href="#resources">View 2-Minute Brief</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/downloads/tpri-legislative-outline.pdf">Download Full Proposal</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-24 pt-12 border-t border-border">
          <div>
            <div className="text-3xl font-bold text-primary">$92B</div>
            <div className="text-sm text-text-secondary">Annual Mobilization</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">15x</div>
            <div className="text-sm text-text-secondary">Federal Leverage</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">25 yr</div>
            <div className="text-sm text-text-secondary">Coverage Period</div>
          </div>
        </div>
      </div>
    </Section>
  );
}
