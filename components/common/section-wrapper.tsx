import { cn } from "@/lib/utils";

type SectionBackground = "default" | "muted" | "brand";

type SectionWrapperProps = {
  id: string;
  background?: SectionBackground;
  children: React.ReactNode;
};

const BACKGROUND_CLASSES: Record<SectionBackground, string> = {
  default: "bg-background",
  muted: "bg-muted/60",
  brand:
    "bg-gradient-to-b from-background via-sky-100/40 to-background dark:from-background dark:via-primary/20",
};

export function SectionWrapper({ id, background = "default", children }: SectionWrapperProps) {
  return (
    <section
      id={id}
      data-toc-id={id}
      className={cn(
        BACKGROUND_CLASSES[background],
        "relative scroll-mt-24 border-t border-border/60 first:border-t-0",
      )}
    >
      <div className="mx-auto flex w-full max-w-layout-2xl flex-col gap-y-10 px-4 py-20 md:px-6 lg:py-24">
        {children}
      </div>
    </section>
  );
}
