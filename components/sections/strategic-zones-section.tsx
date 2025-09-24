import {
  BuildingIcon,
  HandshakeIcon,
  LandPlotIcon,
  ScaleIcon,
  ShieldCheckIcon,
} from "lucide-react";

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
      <div className="flex flex-col gap-y-10">
        <SectionHeader title={section.meta.title} summary={section.meta.summary} align="left" />
        <div className="grid gap-6 md:grid-cols-2">
          {CALLOUTS.map((callout) => (
            <div
              key={callout.title}
              className="rounded-3xl border border-border/60 bg-background/80 p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-foreground">{callout.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{callout.description}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-3xl border border-border/60 bg-background/80 p-6 shadow-sm"
            >
              <pillar.icon className="h-6 w-6 text-primary" aria-hidden />
              <h3 className="mt-4 text-base font-semibold text-foreground">{pillar.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{pillar.description}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {COMPARISON.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-border/60 bg-background/80 p-6 shadow-sm"
            >
              <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {item.attributes.map((attribute) => (
                  <li key={attribute} className="flex items-start gap-x-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary/70" aria-hidden />
                    <span>{attribute}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="prose max-w-prose text-sm text-muted-foreground">
          <SectionContent />
        </div>
      </div>
    </SectionWrapper>
  );
}
