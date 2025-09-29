import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  emphasis?: boolean;
  hover?: boolean;
  glass?: boolean;
  gradient?: boolean;
  style?: CSSProperties;
}

export function Card({
  children,
  className,
  emphasis = false,
  hover = false,
  glass = false,
  gradient = false,
  style,
}: CardProps) {
  return (
    <div
      style={style}
      className={cn(
        "rounded-xl border transition-all duration-300",
        (hover || (emphasis && !glass)) && "relative overflow-hidden",
        // Base styles
        !glass && !emphasis && "border-border bg-surface p-6",
        // Emphasis variant - premium look
        emphasis && !glass && "border-border/50 bg-background shadow-lg p-8 dark:bg-surface",
        // Glass morphism variant
        glass && "glass p-6",
        // Gradient background
        gradient && "bg-gradient-card",
        // Hover effects
        hover && "hover-lift cursor-pointer group will-change-transform",
        hover && emphasis && "hover:shadow-premium hover:border-primary/30",
        hover && !emphasis && "hover:shadow-lg hover:border-primary/20",
        className,
      )}
    >
      {/* Gradient overlay for emphasis cards */}
      {emphasis && !glass && (
        <div className="absolute inset-0 bg-gradient-card opacity-30 pointer-events-none dark:opacity-50" />
      )}

      {/* Subtle shine effect on hover */}
      {hover && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-white/5 via-transparent to-transparent" />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
