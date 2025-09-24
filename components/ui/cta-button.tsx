"use client";
import Link from "next/link";
import { useCallback } from "react";
import {
  ArrowRightIcon,
  BookOpenIcon,
  CalendarDaysIcon,
  DownloadIcon,
  MailIcon,
  UsersIcon,
} from "lucide-react";

import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import type { CTA } from "@/content/schema";

import { ButtonVariant } from "./button";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  arrow: ArrowRightIcon,
  download: DownloadIcon,
  calendar: CalendarDaysIcon,
  mail: MailIcon,
  users: UsersIcon,
  briefing: BookOpenIcon,
};

type CTAButtonProps = {
  cta: CTA;
  className?: string;
  onClick?: () => void;
};

const VARIANT_TO_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-accent text-accent-foreground hover:bg-accent/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
  outline: "border border-border hover:border-foreground",
  ghost: "hover:bg-muted/60",
};

export function CTAButton({ cta, className, onClick }: CTAButtonProps) {
  const Icon = cta.icon ? ICON_MAP[cta.icon] : undefined;
  const handleClick = useCallback(() => {
    trackEvent({ action: "cta_click", category: "engagement", label: cta.id });
    onClick?.();
  }, [cta.id, onClick]);

  const commonClasses = cn(
    "inline-flex items-center justify-center gap-x-2 rounded-full px-6 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    VARIANT_TO_CLASSES[cta.variant ?? "primary"],
    className,
  );

  if (cta.external) {
    return (
      <a
        href={cta.href}
        className={commonClasses}
        target="_blank"
        rel="noreferrer"
        onClick={handleClick}
      >
        <span>{cta.label}</span>
        {Icon ? <Icon className="h-4 w-4" aria-hidden /> : null}
      </a>
    );
  }

  return (
    <Link href={cta.href} className={commonClasses} onClick={handleClick} prefetch>
      <span>{cta.label}</span>
      {Icon ? <Icon className="h-4 w-4" aria-hidden /> : null}
    </Link>
  );
}
