"use client";

import { forwardRef } from "react";

import { cn } from "@/lib/utils";

const VARIANT_STYLES = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
  outline: "border border-border hover:border-foreground",
  ghost: "hover:bg-muted/60",
} as const;

const SIZE_STYLES = {
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
} as const;

export type ButtonVariant = keyof typeof VARIANT_STYLES;
export type ButtonSize = keyof typeof SIZE_STYLES;

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", fullWidth = false, className, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-x-2 rounded-full font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
        VARIANT_STYLES[variant],
        SIZE_STYLES[size],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    />
  );
});
