import { cn } from "@/lib/utils";

type ComparisonRow = {
  id: string;
  label: string;
  tpri: string;
  pri: string;
};

export function ComparisonTable({ rows }: { rows: ComparisonRow[] }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border/60 bg-background/80 shadow-sm">
      <table className="min-w-full divide-y divide-border/60 text-left text-sm">
        <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          <tr>
            <th className="px-4 py-4">Dimension</th>
            <th className="px-4 py-4 text-primary">TPRI + Strategic Zones</th>
            <th className="px-4 py-4">Traditional PRI</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60">
          {rows.map((row, index) => (
            <tr key={row.id} className={cn(index % 2 === 0 ? "bg-background" : "bg-muted/30")}>
              <th scope="row" className="px-4 py-4 font-semibold text-foreground">
                {row.label}
              </th>
              <td className="px-4 py-4 align-top text-sm text-primary">
                <p className="max-w-prose text-sm leading-relaxed">{row.tpri}</p>
              </td>
              <td className="px-4 py-4 align-top text-sm text-muted-foreground">
                <p className="max-w-prose leading-relaxed">{row.pri}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
