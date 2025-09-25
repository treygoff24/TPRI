import metricsData from "@/data/metrics.json";
import { ActionSection } from "@/components/sections/action";
import { EvidenceSection } from "@/components/sections/evidence";
import { HeroSection } from "@/components/sections/hero";
import { ProblemSection } from "@/components/sections/problem";
import { ResourcesSection } from "@/components/sections/resources";
import { SolutionSection } from "@/components/sections/solution";
import type { CaseMetric, ResourceItem } from "@/components/sections/types";
import { loadDownloads } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const downloads = await loadDownloads();
  const resources: ResourceItem[] = downloads.slice(0, 4).map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    file: item.file,
  }));

  const caseMetrics: CaseMetric[] = metricsData.caseStudyMetrics.map((metric) => ({
    id: metric.id,
    label: metric.label,
    value: metric.value,
    format: metric.format === "currency" ? "currency" : "number",
    description: metric.description,
    citationId: metric.citationId,
  }));

  return (
    <main className="min-h-screen bg-background text-text-primary">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <EvidenceSection metrics={caseMetrics} />
      <ResourcesSection resources={resources} />
      <ActionSection />
    </main>
  );
}
