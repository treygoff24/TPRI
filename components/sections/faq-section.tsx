import { FAQAccordion } from "@/components/common/faq-accordion";
import { GlowCard } from "@/components/common/glow-card";
import { SectionHeader } from "@/components/common/section-header";
import { SectionWrapper } from "@/components/common/section-wrapper";
import type { FAQItem } from "@/content/schema";
import type { CompiledSection } from "@/lib/content";

export function FAQSection({ section, faqs }: { section: CompiledSection; faqs: FAQItem[] }) {
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
        <FAQAccordion items={faqs} />
      </GlowCard>
    </SectionWrapper>
  );
}
