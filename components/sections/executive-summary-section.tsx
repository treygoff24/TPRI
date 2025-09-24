import { CTAButton } from "@/components/ui/cta-button";
import { SectionHeader } from "@/components/common/section-header";
import { SectionWrapper } from "@/components/common/section-wrapper";
import type { CompiledSection } from "@/lib/content";
import { cn } from "@/lib/utils";

export function ExecutiveSummarySection({ section }: { section: CompiledSection }) {
  const SectionContent = section.Content;
  const ctas = section.meta.ctas ?? [];

  return (
    <SectionWrapper id={section.meta.id} background={section.meta.background}>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-start">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-border/50 bg-gradient-to-br from-secondary/15 via-background/60 to-background/30 p-8 shadow-soft-lg backdrop-blur md:p-12 dark:border-white/8 dark:from-white/[0.08] dark:via-background/40 dark:to-primary/[0.18]">
          <div className="pointer-events-none absolute inset-0 opacity-80">
            <div className="absolute -top-24 -left-16 h-56 w-56 rounded-full bg-secondary/40 blur-[120px]" />
            <div className="absolute bottom-[-18%] right-[-10%] h-72 w-72 rounded-full bg-primary/35 blur-[140px]" />
          </div>
          <div className="relative flex flex-col gap-y-10">
            <SectionHeader
              title={section.meta.title}
              summary={section.meta.summary}
              summaryClassName="text-foreground/85 dark:text-foreground"
              actions={
                ctas.length
                  ? ctas.map((cta) => (
                      <CTAButton
                        key={cta.id}
                        cta={cta}
                        className={cn(
                          "min-h-[3rem] justify-center sm:justify-start",
                          cta.variant === "primary" &&
                            "shadow-[0_20px_45px_-30px_rgba(15,35,55,0.75)]",
                          cta.variant === "secondary" &&
                            "bg-muted/60 text-foreground shadow-[0_18px_35px_-28px_rgba(15,35,55,0.65)]",
                        )}
                      />
                    ))
                  : undefined
              }
            />
            <div
              className={cn(
                "prose max-w-none text-base leading-relaxed text-foreground/85",
                "prose-headings:font-semibold",
                "prose-h3:border-l-4 prose-h3:border-secondary/60 prose-h3:pl-6 prose-h3:text-[0.95rem] prose-h3:uppercase prose-h3:tracking-[0.28em]",
                "prose-p:mt-3 prose-p:text-foreground/90",
                "prose-ul:mt-6 prose-ul:space-y-2",
                "prose-li:marker:text-primary",
                "[&>h3]:mt-8 [&>h3:first-of-type]:mt-0",
                "dark:prose-invert dark:[--tw-prose-body:rgb(var(--color-foreground)/0.92)] dark:[--tw-prose-headings:rgb(var(--color-foreground))] dark:[--tw-prose-bold:rgb(var(--color-foreground))]",
              )}
            >
              <SectionContent />
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-[1.8rem] border border-border/60 bg-gradient-to-br from-background/40 via-background/60 to-background/40 p-8 shadow-soft-lg backdrop-blur dark:border-white/10 dark:from-white/[0.06] dark:to-secondary/[0.14]">
          <div className="pointer-events-none absolute inset-0 opacity-60">
            <div className="absolute -right-10 top-0 h-44 w-44 rounded-full bg-accent/40 blur-[80px]" />
            <div className="absolute -left-10 bottom-[-25%] h-52 w-52 rounded-full bg-primary/30 blur-[90px]" />
          </div>
          <div className="relative space-y-4">
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              Policy Leaders Get
            </h3>
            <ul className="space-y-4 text-sm text-foreground/80">
              <li className="flex items-start gap-x-3">
                <span
                  className="mt-1 h-2.5 w-2.5 rounded-full bg-gradient-to-tr from-primary to-secondary"
                  aria-hidden
                />
                Long-horizon insurance matched to democratic strategic zones.
              </li>
              <li className="flex items-start gap-x-3">
                <span
                  className="mt-1 h-2.5 w-2.5 rounded-full bg-gradient-to-tr from-primary to-secondary"
                  aria-hidden
                />
                Statutory recovery powers that deter coercive interference.
              </li>
              <li className="flex items-start gap-x-3">
                <span
                  className="mt-1 h-2.5 w-2.5 rounded-full bg-gradient-to-tr from-primary to-secondary"
                  aria-hidden
                />
                Guardrails modeled on OECD partners to keep capital accountable.
              </li>
              <li className="flex items-start gap-x-3">
                <span
                  className="mt-1 h-2.5 w-2.5 rounded-full bg-gradient-to-tr from-primary to-secondary"
                  aria-hidden
                />
                A briefing toolkit ready for congressional and executive stakeholders.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
