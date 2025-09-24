import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type GlowCardProps = {
  children: ReactNode;
  contentClassName?: string;
  glows?: string[];
} & HTMLAttributes<HTMLDivElement>;

export function GlowCard({
  children,
  className,
  contentClassName,
  glows = [],
  ...rest
}: GlowCardProps) {
  return (
    <div
      {...rest}
      className={cn(
        "relative isolate overflow-hidden rounded-[2rem] border border-border/60 bg-background/70 p-8 shadow-soft-lg backdrop-blur dark:border-white/10",
        className,
      )}
    >
      {glows.length ? (
        <div className="pointer-events-none absolute inset-0">
          {glows.map((glow, index) => (
            <div key={index} className={cn("absolute opacity-80 blur-[120px]", glow)} aria-hidden />
          ))}
        </div>
      ) : null}
      <div className={cn("relative", contentClassName)}>{children}</div>
    </div>
  );
}
