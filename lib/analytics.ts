"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const GA4_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ?? process.env.GA4_MEASUREMENT_ID;

function analyticsDisabled() {
  if (typeof window === "undefined") return true;
  if (window.doNotTrack === "1" || navigator.doNotTrack === "1") return true;
  return !GA4_MEASUREMENT_ID;
}

export type AnalyticsEvent = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
};

export function trackEvent(event: AnalyticsEvent) {
  if (analyticsDisabled()) return;

  const payload = {
    event_category: event.category,
    event_label: event.label,
    value: event.value,
  };

  if (typeof window.gtag === "function") {
    window.gtag("event", event.action, payload);
  } else {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: event.action,
      ...payload,
    });
  }
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export function useRegisterAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (analyticsDisabled()) return;

    const url = pathname + (searchParams.size ? `?${searchParams.toString()}` : "");
    const sendPageView = () => {
      if (typeof window.gtag === "function") {
        window.gtag("event", "page_view", {
          page_path: url,
        });
      } else {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "page_view",
          page_path: url,
        });
      }
    };

    sendPageView();
  }, [pathname, searchParams]);
}
