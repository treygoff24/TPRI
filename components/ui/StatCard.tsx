import type { ReactNode } from "react";

import { Card } from "./Card";

interface StatCardProps {
  number: string;
  label: string;
  trend?: string;
  description?: string | ReactNode;
  icon?: ReactNode;
  gradient?: boolean;
}

export function StatCard({
  number,
  label,
  trend,
  description,
  icon,
  gradient = false,
}: StatCardProps) {
  return (
    <Card hover gradient={gradient} className="group relative">
      <div className="space-y-3">
        {/* Icon */}
        {icon && (
          <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        )}

        {/* Number with gradient effect */}
        <div
          className={`text-4xl font-serif font-bold transition-all duration-300 ${
            gradient ? "text-gradient" : "text-primary group-hover:text-gradient"
          }`}
        >
          {number}
        </div>

        {/* Label */}
        <div className="text-text-primary font-semibold text-lg group-hover:text-primary transition-colors duration-300">
          {label}
        </div>

        {/* Trend with enhanced styling */}
        {trend && (
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 text-accent font-medium text-sm border border-accent/20">
            <span className="w-2 h-2 bg-accent rounded-full mr-2 animate-pulse" />
            {trend}
          </div>
        )}

        {/* Description */}
        {description && (
          <p className="text-sm text-text-secondary mt-3 leading-relaxed group-hover:text-text-primary transition-colors duration-300">
            {description}
          </p>
        )}
      </div>

      {/* Subtle border glow on hover */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 pointer-events-none" />
    </Card>
  );
}
