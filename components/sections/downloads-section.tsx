import { GlowCard } from "@/components/common/glow-card";
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
      <GlowCard
        className="rounded-[2.5rem] border-border/50 bg-gradient-to-br from-secondary/12 via-background/70 to-background/40"
        contentClassName="flex flex-col gap-y-12"
        glows={[
          "-top-16 -left-8 h-48 w-48 rounded-full bg-secondary/30",
          "bottom-[-18%] right-[-10%] h-60 w-60 rounded-full bg-primary/30",
        ]}
      >
        <SectionHeader
          title={section.meta.title}
          summary={section.meta.summary}
          summaryClassName="text-foreground/85"
          align="left"
        />
        <div className="prose max-w-prose text-sm text-foreground/75">
          <SectionContent />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {downloads.map((resource, index) => (
            <ResourceCard key={resource.id} resource={resource} index={index} />
          ))}
        </div>
      </GlowCard>
    </SectionWrapper>
  );
}
