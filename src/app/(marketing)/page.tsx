import metricsData from "@/data/metrics.json";
import { MiniToc } from "@/components/common/mini-toc";
import { MiniTocProvider } from "@/components/common/mini-toc-provider";
import { HeroSection } from "@/components/sections/hero-section";
import { ParaguayCountdownSection } from "@/components/sections/paraguay-countdown-section";
import { ChinaExpansionSection } from "@/components/sections/china-expansion-section";
import type { SimpleMetric } from "@/components/sections/china-expansion-section";
import { ExecutiveSummarySection } from "@/components/sections/executive-summary-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { StrategicZonesSection } from "@/components/sections/strategic-zones-section";
import { CaseStudySection } from "@/components/sections/case-study-section";
import type { CaseMetric } from "@/components/sections/case-study-section";
import { ComparisonSection } from "@/components/sections/comparison-section";
import { FAQSection } from "@/components/sections/faq-section";
import { DownloadsSection } from "@/components/sections/downloads-section";
import { ContactSection } from "@/components/sections/contact-section";
import { loadAllContent } from "@/lib/content";

export const experimental_ppr = false;
export const dynamic = "force-dynamic";

export default async function MarketingPage() {
  const { sections, howItWorks, faqs, downloads, endorsements, metrics, timeline } =
    await loadAllContent();
  const sectionById = Object.fromEntries(
    sections.map((section) => [section.meta.id, section] as const),
  );

  const hero = sectionById["hero"];
  const countdown = sectionById["paraguay-countdown"];
  const problem = sectionById["china-expansion"];
  const executive = sectionById["executive-summary"];
  const howItWorksSection = sectionById["how-it-works"];
  const zones = sectionById["strategic-zones"];
  const caseStudy = sectionById["prospera-case-study"];
  const comparison = sectionById["tpri-vs-pri"];
  const faqIntro = sectionById["faq"];
  const downloadsSection = sectionById["downloads"];
  const contact = sectionById["contact"];

  const tocSections = sections
    .filter((section) => !["footer"].includes(section.meta.id))
    .map((section) => ({ id: section.meta.id, label: section.meta.title }));

  const heroMetrics = metrics;
  const chinaMetrics = metricsData.chinaExpansionStats as SimpleMetric[];
  const caseMetrics = metricsData.caseStudyMetrics as CaseMetric[];

  return (
    <MiniTocProvider sections={tocSections}>
      <div className="mx-auto flex w-full max-w-layout-2xl gap-12 px-4 py-10 md:px-6">
        <div className="flex-1 space-y-0">
          {hero ? <HeroSection section={hero} metrics={heroMetrics} /> : null}
          {countdown ? <ParaguayCountdownSection section={countdown} /> : null}
          {problem ? (
            <ChinaExpansionSection
              section={problem}
              timeline={timeline}
              keyMetrics={metrics}
              expansionMetrics={chinaMetrics}
            />
          ) : null}
          {executive ? <ExecutiveSummarySection section={executive} /> : null}
          {howItWorksSection ? (
            <HowItWorksSection section={howItWorksSection} steps={howItWorks} />
          ) : null}
          {zones ? <StrategicZonesSection section={zones} /> : null}
          {caseStudy ? (
            <CaseStudySection
              section={caseStudy}
              metrics={caseMetrics}
              endorsements={endorsements}
            />
          ) : null}
          {comparison ? <ComparisonSection section={comparison} keyMetrics={metrics} /> : null}
          {faqIntro ? <FAQSection section={faqIntro} faqs={faqs} /> : null}
          {downloadsSection ? (
            <DownloadsSection section={downloadsSection} downloads={downloads} />
          ) : null}
          {contact ? <ContactSection meta={contact.meta} content={<contact.Content />} /> : null}
        </div>
        <MiniToc />
      </div>
    </MiniTocProvider>
  );
}
