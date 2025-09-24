"use client";

import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";

import { useRegisterAnalytics } from "@/lib/analytics";

function ServiceWorkerRegistrar() {
  useEffect(() => {
    const shouldRegister =
      process.env.NODE_ENV === "production" || process.env.NEXT_PUBLIC_ENABLE_SW === "true";
    if (!shouldRegister) return;
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker.register("/sw.js").catch((error) => {
      console.error("Service worker registration failed", error);
    });
  }, []);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  useRegisterAnalytics();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ServiceWorkerRegistrar />
      {children}
      <Analytics />
    </ThemeProvider>
  );
}
