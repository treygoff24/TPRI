import { ResourceCard } from "@/components/common/resource-card";
import { SectionHeader } from "@/components/common/section-header";
import { SectionWrapper } from "@/components/common/section-wrapper";
import type { DownloadResource } from "@/content/schema";
import type { CompiledSection } from "@/lib/content";

export function DownloadsSection({
  section,
  downloads,
}: {
  section: CompiledSection;
  downloads: DownloadResource[];
}) {
  const SectionContent = section.Content;

  return (
    <SectionWrapper id={section.meta.id} background={section.meta.background}>
      <div className="flex flex-col gap-y-10">
        <SectionHeader title={section.meta.title} summary={section.meta.summary} align="left" />
        <div className="prose max-w-prose text-sm text-muted-foreground">
          <SectionContent />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {downloads.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
