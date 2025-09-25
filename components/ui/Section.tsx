import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionBackground = "white" | "surface";
type SectionWidth = "default" | "narrow" | "wide" | "full";

interface SectionProps {
  children: ReactNode;
  className?: string;
  background?: SectionBackground;
  width?: SectionWidth;
  id?: string;
}

const widthMap: Record<SectionWidth, string> = {
  narrow: "max-w-4xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
  full: "max-w-full",
};

export function Section({
  children,
  className,
  background = "white",
  width = "default",
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8",
        background === "surface" ? "bg-surface" : "bg-background",
        className,
      )}
    >
      <div className={cn("mx-auto", widthMap[width])}>{children}</div>
    </section>
  );
}
