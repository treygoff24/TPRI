"use client";

import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  asChild = false,
  type = "button",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

  const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary: "bg-primary text-white hover:bg-primary-dark",
    secondary: "border border-primary text-primary hover:bg-primary-light",
    ghost: "text-text-secondary hover:text-text-primary hover:bg-surface",
  };

  const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const Component = asChild ? Slot : "button";
  const componentProps = asChild ? props : { ...props, type };

  return (
    <Component
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...componentProps}
    >
      {children}
    </Component>
  );
}
