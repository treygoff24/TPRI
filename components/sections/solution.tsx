import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";

export function SolutionSection() {
  return (
    <Section id="solution">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif font-bold text-text-primary mb-4">
          Our Solution: Insurance That Works
        </h2>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto">
          Three components that work together to mobilize private capital at scale.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card emphasis className="text-center">
          <div className="text-5xl mb-4" role="img" aria-label="Shield">
            🛡️
          </div>
          <h3 className="text-xl font-semibold mb-3 text-text-primary">Political Risk Insurance</h3>
          <p className="text-text-secondary">
            25-year coverage for investments in certified zones, backed by a U.S. guarantee that
            keeps deals competitive with state-backed rivals.
          </p>
        </Card>
        <Card emphasis className="text-center">
          <div className="text-5xl mb-4" role="img" aria-label="Construction">
            🏗️
          </div>
          <h3 className="text-xl font-semibold mb-3 text-text-primary">Strategic Economic Zones</h3>
          <p className="text-text-secondary">
            Pre-vetted locations with transparent governance, OECD-compliant regulations, and
            security vetting.
          </p>
        </Card>
        <Card emphasis className="text-center">
          <div className="text-5xl mb-4" role="img" aria-label="Scale">
            ⚖️
          </div>
          <h3 className="text-xl font-semibold mb-3 text-text-primary">Triple-Damages Recovery</h3>
          <p className="text-text-secondary">
            Statutory recovery powers ensure bad actors face real consequences for interference.
          </p>
        </Card>
      </div>
      <div className="mt-16 rounded-xl bg-surface p-8">
        <h3 className="text-2xl font-semibold mb-6 text-center text-text-primary">
          Investment Lifecycle
        </h3>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {["Zone Certification", "Investment Flows", "Economic Growth"].map((label, index) => (
            <div key={label} className="flex-1 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white text-lg font-semibold">
                {index + 1}
              </div>
              <div className="font-medium text-text-primary">{label}</div>
              <p className="mt-1 text-sm text-text-secondary">
                {index === 0 && "Host nation meets transparency and security standards."}
                {index === 1 &&
                  "Private capital flows with long-term coverage and predictable policy."}
                {index === 2 &&
                  "Jobs and prosperity strengthen alliances without direct subsidies."}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
