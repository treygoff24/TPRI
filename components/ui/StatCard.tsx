import type { ReactNode } from "react";

import { Card } from "./Card";

interface StatCardProps {
  number: string;
  label: string;
  trend?: string;
  description?: string | ReactNode;
}

export function StatCard({ number, label, trend, description }: StatCardProps) {
  return (
    <Card>
      <div className="space-y-2">
        <div className="text-4xl font-serif font-bold text-primary">{number}</div>
        <div className="text-text-primary font-medium">{label}</div>
        {trend && <div className="text-sm text-accent font-medium">{trend}</div>}
        {description && <p className="text-sm text-text-secondary mt-3">{description}</p>}
      </div>
    </Card>
  );
}
