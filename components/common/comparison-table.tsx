import { GlowCard } from "@/components/common/glow-card";
import { cn } from "@/lib/utils";

type ComparisonRow = {
  id: string;
  label: string;
  tpri: string;
  pri: string;
};

export function ComparisonTable({ rows }: { rows: ComparisonRow[] }) {
  return (
    <GlowCard
      className="overflow-hidden rounded-[2rem] border-border/60 bg-gradient-to-br from-background/50 via-background/70 to-background/45 p-0"
      contentClassName="overflow-hidden"
      glows={[
        "-top-12 right-[-12%] h-48 w-48 rounded-full bg-secondary/30",
        "-bottom-14 left-[-12%] h-48 w-48 rounded-full bg-primary/25",
      ]}
    >
      <table className="min-w-full divide-y divide-border/50 text-left text-sm">
        <thead className="bg-gradient-to-r from-secondary/25 via-background/80 to-background/60 text-xs font-semibold uppercase tracking-[0.35em] text-foreground/65">
          <tr>
            <th className="px-6 py-4">Dimension</th>
            <th className="px-6 py-4 text-primary">TPRI + Strategic Zones</th>
            <th className="px-6 py-4">Traditional PRI</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={row.id}
              className={cn(
                "border-t border-border/30",
                index % 2 === 0 ? "bg-background/40" : "bg-background/20",
              )}
            >
              <th scope="row" className="px-6 py-5 font-semibold text-foreground">
                {row.label}
              </th>
              <td className="px-6 py-5 align-top text-sm text-primary">
                <p className="max-w-prose leading-relaxed">{row.tpri}</p>
              </td>
              <td className="px-6 py-5 align-top text-sm text-foreground/70">
                <p className="max-w-prose leading-relaxed">{row.pri}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </GlowCard>
  );
}
