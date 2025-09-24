import {
  BuildingIcon,
  HandshakeIcon,
  LandPlotIcon,
  ScaleIcon,
  ShieldCheckIcon,
} from "lucide-react";

import { GlowCard } from "@/components/common/glow-card";
import { SectionHeader } from "@/components/common/section-header";
import { SectionWrapper } from "@/components/common/section-wrapper";
import type { CompiledSection } from "@/lib/content";

const CALLOUTS = [
  {
    title: "Transparent taxation",
    description:
      "Zones publish fiscal policies and comply with OECD reporting. No secret deals, no shell games.",
  },
  {
    title: "Host nation partnership",
    description:
      "Compacts require joint governance boards with veto rights for the democratic host government.",
  },
];

const PILLARS = [
  {
    icon: ShieldCheckIcon,
    title: "National security vetting",
    description:
      "CFIUS-style review excludes adversary ownership and dual-use risks before certification.",
  },
  {
    icon: BuildingIcon,
    title: "Open market infrastructure",
    description:
      "Zones deploy modern infrastructure with competition requirements and open access pricing.",
  },
  {
    icon: HandshakeIcon,
    title: "Worker mobility guarantees",
    description: "Labor mobility, skills training, and collective bargaining rights are mandatory.",
  },
  {
    icon: LandPlotIcon,
    title: "Clean capital stack",
    description: "Transparent capital sourcing with AML/KYC compliance and continuous monitoring.",
  },
  {
    icon: ScaleIcon,
    title: "Democratic accountability",
    description:
      "Independent ombuds, public reporting, and congressional oversight keep zones aligned.",
  },
];

const COMPARISON = [
  {
    title: "Certified Strategic Zone",
    attributes: [
      "Joint U.S.-host governance",
      "Transparent fiscal and regulatory regime",
      "Labor and environmental safeguards embedded in statute",
      "Open bidding for infrastructure and utilities",
    ],
  },
  {
    title: "Authoritarian Special Zone",
    attributes: [
      "Opaque concessions favoring state-owned monopolies",
      "Debt-trap financing tied to political concessions",
      "Suppressed labor rights and minimal oversight",
      "Dual-use facilities with military intelligence access",
    ],
  },
];

export function StrategicZonesSection({ section }: { section: CompiledSection }) {
  const SectionContent = section.Content;

  return (
    <SectionWrapper id={section.meta.id} background={section.meta.background}>
      <GlowCard
        className="rounded-[2.5rem] border-border/50 bg-gradient-to-br from-secondary/12 via-background/70 to-background/40"
        contentClassName="flex flex-col gap-y-12"
        glows={[
          "-top-16 -left-10 h-48 w-48 rounded-full bg-secondary/35",
          "bottom-[-18%] right-[-12%] h-60 w-60 rounded-full bg-primary/30",
        ]}
      >
        <SectionHeader
          title={section.meta.title}
          summary={section.meta.summary}
          summaryClassName="text-foreground/85"
          align="left"
        />
        <div className="grid gap-6 md:grid-cols-2">
          {CALLOUTS.map((callout, index) => (
            <GlowCard
              key={callout.title}
              className="rounded-[1.8rem] border-border/60 bg-gradient-to-br from-background/50 via-background/70 to-background/45 p-6"
              contentClassName="space-y-3"
              glows={
                index % 2 === 0
                  ? ["-top-10 right-[-10%] h-36 w-36 rounded-full bg-secondary/30"]
                  : ["-bottom-12 left-[-12%] h-40 w-40 rounded-full bg-primary/25"]
              }
            >
              <h3 className="text-lg font-semibold text-foreground">{callout.title}</h3>
              <p className="text-sm text-foreground/70">{callout.description}</p>
            </GlowCard>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {PILLARS.map((pillar, index) => (
            <GlowCard
              key={pillar.title}
              className="rounded-[1.8rem] border-border/60 bg-gradient-to-br from-background/50 via-background/70 to-background/45 p-6"
              contentClassName="space-y-3"
              glows={
                index % 2 === 0
                  ? ["-top-8 right-[-12%] h-32 w-32 rounded-full bg-secondary/25"]
                  : ["-bottom-10 left-[-12%] h-36 w-36 rounded-full bg-primary/25"]
              }
            >
              <pillar.icon className="h-6 w-6 text-primary" aria-hidden />
              <h3 className="text-base font-semibold text-foreground">{pillar.title}</h3>
              <p className="text-sm text-foreground/70">{pillar.description}</p>
            </GlowCard>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {COMPARISON.map((item, index) => (
            <GlowCard
              key={item.title}
              className="rounded-[1.8rem] border-border/60 bg-gradient-to-br from-background/50 via-background/70 to-background/45 p-6"
              contentClassName="space-y-4"
              glows={
                index === 0
                  ? ["-top-12 right-[-10%] h-40 w-40 rounded-full bg-secondary/25"]
                  : ["-bottom-12 left-[-10%] h-40 w-40 rounded-full bg-primary/25"]
              }
            >
              <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
              <ul className="space-y-2 text-sm text-foreground/70">
                {item.attributes.map((attribute) => (
                  <li key={attribute} className="flex items-start gap-x-2">
                    <span
                      className="mt-1 h-2 w-2 rounded-full bg-gradient-to-tr from-primary to-secondary"
                      aria-hidden
                    />
                    <span>{attribute}</span>
                  </li>
                ))}
              </ul>
            </GlowCard>
          ))}
        </div>
        <div className="prose max-w-prose text-sm text-foreground/75">
          <SectionContent />
        </div>
      </GlowCard>
    </SectionWrapper>
  );
}
