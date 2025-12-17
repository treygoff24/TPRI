"use client";

import { useRegisterAnalytics } from "@/lib/analytics";

export function AnalyticsRegistrar() {
  useRegisterAnalytics();
  return null;
}
