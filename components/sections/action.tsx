import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";

export function ActionSection() {
  return (
    <Section id="action" background="surface">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-serif font-bold text-text-primary mb-4">Take Action</h2>
        <p className="text-xl text-text-secondary mb-10">
          Schedule a bipartisan briefing or request statutory language. Our coalition team is ready
          to support committees, caucuses, and private-sector partners.
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          <Card emphasis className="text-left">
            <h3 className="text-lg font-semibold text-text-primary">Congressional Briefing</h3>
            <p className="mt-2 text-sm text-text-secondary">
              30-minute presentation tailored for committee staff. Includes risk scenarios, cost
              controls, and scoring assumptions.
            </p>
            <Button asChild size="md" className="mt-4 w-full justify-center">
              <Link href="mailto:briefings@tpri.gov">Request Briefing</Link>
            </Button>
          </Card>
          <Card emphasis className="text-left">
            <h3 className="text-lg font-semibold text-text-primary">Coalition Partnership</h3>
            <p className="mt-2 text-sm text-text-secondary">
              Align chambers of commerce, insurers, and investors ready to deploy capital into
              certified zones.
            </p>
            <Button asChild variant="secondary" size="md" className="mt-4 w-full justify-center">
              <Link href="mailto:coalition@tpri.gov">Join the Coalition</Link>
            </Button>
          </Card>
        </div>
      </div>
    </Section>
  );
}
