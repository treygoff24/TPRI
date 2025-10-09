import type { ReactNode } from "react";

interface SectionBackgroundProps {
  variant?: "problem" | "solution" | "evidence" | "action" | "resources" | "hero";
  children?: ReactNode;
}

type BackgroundConfig = {
  gradient: string;
};

const backgroundConfigs: Record<string, BackgroundConfig> = {
  problem: {
    gradient:
      "from-red-50/30 via-transparent to-orange-50/30 dark:from-red-900/10 dark:to-orange-900/10",
  },
  solution: {
    gradient:
      "from-green-50/30 via-transparent to-blue-50/30 dark:from-green-900/10 dark:to-blue-900/10",
  },
  evidence: {
    gradient:
      "from-emerald-50/30 via-transparent to-teal-50/30 dark:from-emerald-900/10 dark:to-teal-900/10",
  },
  action: {
    gradient:
      "from-amber-50/30 via-transparent to-orange-50/30 dark:from-amber-900/10 dark:to-orange-900/10",
  },
  resources: {
    gradient:
      "from-indigo-50/30 via-transparent to-violet-50/30 dark:from-indigo-900/10 dark:to-violet-900/10",
  },
  hero: {
    gradient:
      "from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900/20",
  },
};

export function SectionBackground({ variant = "problem", children }: SectionBackgroundProps) {
  const config = backgroundConfigs[variant];

  return (
    <>
      {/* Background gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient}`} />

      {children}
    </>
  );
}
