import { FAQAccordion } from "@/components/common/faq-accordion";
import { SectionHeader } from "@/components/common/section-header";
import { SectionWrapper } from "@/components/common/section-wrapper";
import type { FAQItem } from "@/content/schema";
import type { CompiledSection } from "@/lib/content";

export function FAQSection({ section, faqs }: { section: CompiledSection; faqs: FAQItem[] }) {
  const SectionContent = section.Content;

  return (
    <SectionWrapper id={section.meta.id} background={section.meta.background}>
      <div className="flex flex-col gap-y-10">
        <SectionHeader title={section.meta.title} summary={section.meta.summary} align="left" />
        <div className="prose max-w-prose text-sm text-muted-foreground">
          <SectionContent />
        </div>
        <FAQAccordion items={faqs} />
      </div>
    </SectionWrapper>
  );
}
