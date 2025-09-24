import type { Endorsement } from "@/content/schema";

export function EndorsementWall({ endorsements }: { endorsements: Endorsement[] }) {
  if (!endorsements.length) return null;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {endorsements.map((endorsement) => (
        <blockquote
          key={endorsement.id}
          className="rounded-3xl border border-border/60 bg-background/80 p-6 shadow-sm"
        >
          <p className="text-base leading-relaxed text-muted-foreground">“{endorsement.quote}”</p>
          <footer className="mt-4 text-sm font-semibold text-foreground">
            {endorsement.name}
            <div className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
              {endorsement.title}, {endorsement.organization}
            </div>
          </footer>
        </blockquote>
      ))}
    </div>
  );
}
