import Link from "next/link";

import type { ResourceItem } from "@/components/sections/types";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";

interface ResourcesSectionProps {
  resources: ResourceItem[];
}

export function ResourcesSection({ resources }: ResourcesSectionProps) {
  return (
    <Section id="resources">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-serif font-bold text-text-primary mb-4">
          Resources for Policymakers
        </h2>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto">
          Download briefings and legislative tools to move the Total Political Risk Insurance Act
          forward this session.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {resources.map((resource) => (
          <Card key={resource.id} hover>
            <div className="flex h-full flex-col justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-text-primary">{resource.title}</h3>
                <p className="mt-2 text-text-secondary text-sm">{resource.description}</p>
              </div>
              <Link
                href={resource.file}
                className="text-sm font-medium text-primary hover:text-primary-dark"
              >
                Download PDF →
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
