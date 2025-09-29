import type { ReactNode } from "react";

interface SectionBackgroundProps {
  variant?: "problem" | "solution" | "evidence" | "action" | "resources" | "hero";
  children?: ReactNode;
}

type BlobConfig = {
  position: string;
  color: string;
  size: string;
  animation?: string;
  delay?: string;
};

type BackgroundConfig = {
  gradient: string;
  blob1: BlobConfig;
  blob2: BlobConfig;
};

const backgroundConfigs: Record<string, BackgroundConfig> = {
  problem: {
    gradient:
      "from-red-50/30 via-transparent to-orange-50/30 dark:from-red-900/10 dark:to-orange-900/10",
    blob1: { position: "-top-20 -left-20", color: "bg-red-500/10", size: "w-40 h-40" },
    blob2: { position: "-bottom-20 -right-20", color: "bg-orange-500/10", size: "w-40 h-40" },
  },
  solution: {
    gradient:
      "from-green-50/30 via-transparent to-blue-50/30 dark:from-green-900/10 dark:to-blue-900/10",
    blob1: { position: "top-20 right-20", color: "bg-green-500/10", size: "w-32 h-32" },
    blob2: { position: "bottom-20 left-20", color: "bg-blue-500/10", size: "w-32 h-32" },
  },
  evidence: {
    gradient:
      "from-emerald-50/30 via-transparent to-teal-50/30 dark:from-emerald-900/10 dark:to-teal-900/10",
    blob1: { position: "top-32 right-32", color: "bg-emerald-500/10", size: "w-40 h-40" },
    blob2: { position: "bottom-32 left-32", color: "bg-teal-500/10", size: "w-40 h-40" },
  },
  action: {
    gradient:
      "from-amber-50/30 via-transparent to-orange-50/30 dark:from-amber-900/10 dark:to-orange-900/10",
    blob1: {
      position: "top-20 right-20",
      color: "bg-gradient-to-br from-amber-500/10 to-orange-500/10",
      size: "w-40 h-40",
      animation: "animate-float",
    },
    blob2: {
      position: "bottom-20 left-20",
      color: "bg-gradient-to-tr from-orange-500/10 to-red-500/10",
      size: "w-32 h-32",
      animation: "animate-float",
      delay: "3s",
    },
  },
  resources: {
    gradient:
      "from-indigo-50/30 via-transparent to-violet-50/30 dark:from-indigo-900/10 dark:to-violet-900/10",
    blob1: { position: "top-20 left-20", color: "bg-indigo-500/10", size: "w-32 h-32" },
    blob2: { position: "bottom-20 right-20", color: "bg-violet-500/10", size: "w-32 h-32" },
  },
  hero: {
    gradient:
      "from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900/20",
    blob1: {
      position: "-top-40 -right-40",
      color: "bg-gradient-to-br from-primary/20 to-purple-500/20",
      size: "w-80 h-80",
      animation: "animate-float",
    },
    blob2: {
      position: "-bottom-40 -left-40",
      color: "bg-gradient-to-tr from-accent/20 to-blue-500/20",
      size: "w-80 h-80",
      animation: "animate-float",
      delay: "2s",
    },
  },
};

export function SectionBackground({ variant = "problem", children }: SectionBackgroundProps) {
  const config = backgroundConfigs[variant];

  return (
    <>
      {/* Background gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient}`} />

      {/* Animated background blur blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute ${config.blob1.position} ${config.blob1.size} ${config.blob1.color} rounded-full blur-3xl ${config.blob1.animation || ""}`}
          style={config.blob1.delay ? { animationDelay: config.blob1.delay } : undefined}
        />
        <div
          className={`absolute ${config.blob2.position} ${config.blob2.size} ${config.blob2.color} rounded-full blur-3xl ${config.blob2.animation || ""}`}
          style={config.blob2.delay ? { animationDelay: config.blob2.delay } : undefined}
        />
      </div>

      {children}
    </>
  );
}
