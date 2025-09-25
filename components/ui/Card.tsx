import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  emphasis?: boolean;
  hover?: boolean;
}

export function Card({ children, className, emphasis = false, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border",
        emphasis ? "bg-white shadow-lg p-8" : "bg-surface p-6",
        hover && "hover:shadow-md hover:border-primary/20 transition-shadow",
        className,
      )}
    >
      {children}
    </div>
  );
}
