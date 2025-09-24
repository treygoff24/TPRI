import { cn } from "@/lib/utils";

export type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  summary?: string;
  align?: "left" | "center";
  actions?: React.ReactNode;
};

export function SectionHeader({
  eyebrow,
  title,
  summary,
  align = "left",
  actions,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-y-6",
        align === "center" ? "items-center text-center" : "items-start",
      )}
    >
      <div
        className={cn(
          "flex w-full flex-col gap-y-4",
          align === "center" ? "items-center" : "items-start",
        )}
      >
        {eyebrow ? (
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">
            {eyebrow}
          </span>
        ) : null}
        <h2 className="text-balance font-heading text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
          {title}
        </h2>
        {summary ? (
          <p className="max-w-prose text-pretty text-lg text-muted-foreground">{summary}</p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
    </div>
  );
}
