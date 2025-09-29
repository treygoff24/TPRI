"use client";

import { Slot } from "@radix-ui/react-slot";
import { Children, cloneElement, isValidElement } from "react";
import type { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "gradient";
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
    "relative inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 overflow-hidden group will-change-transform";

  const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary:
      "bg-primary text-white hover:bg-primary-dark hover:scale-105 active:scale-95 shadow-lg hover:shadow-premium",
    secondary:
      "border-2 border-primary text-primary hover:bg-primary-light hover:scale-105 active:scale-95 shadow-md hover:shadow-lg md:backdrop-blur-sm",
    ghost:
      "text-text-secondary hover:text-primary hover:bg-surface hover:scale-105 active:scale-95",
    gradient:
      "bg-gradient-primary text-white hover:scale-105 active:scale-95 shadow-lg hover:shadow-premium",
  };

  const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg font-semibold",
  };

  const componentClassName = cn(baseStyles, variants[variant], sizes[size], className);

  const renderLayers = () => (
    <>
      {/* Shine effect overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] duration-700"
        aria-hidden="true"
      />
    </>
  );

  if (asChild) {
    const child = Children.only(children) as ReactElement<{ children?: ReactNode }> | null;
    if (!isValidElement(child)) {
      return (
        <button {...props} className={componentClassName} type={type}>
          {renderLayers()}
          <span className="relative z-10 flex items-center justify-center">{children}</span>
        </button>
      );
    }

    const childWithLayers = cloneElement(child, {
      children: (
        <>
          {renderLayers()}
          <span className="relative z-10 flex items-center justify-center">
            {child.props.children}
          </span>
        </>
      ),
    });

    return (
      <Slot {...props} className={componentClassName}>
        {childWithLayers}
      </Slot>
    );
  }

  return (
    <button {...props} className={componentClassName} type={type}>
      {renderLayers()}
      <span className="relative z-10 flex items-center justify-center">{children}</span>
    </button>
  );
}
