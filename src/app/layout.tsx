import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import type { ReactNode } from "react";

import { fontVariables } from "@/app/fonts";
import { Providers } from "@/components/common/providers";
import { StickyHeader } from "@/components/common/sticky-header";
import { Footer } from "@/components/sections/footer";
import { buildBaseMetadata, buildGovernmentServiceJsonLd } from "@/lib/seo";

import "@/styles/global.css";
import "@/styles/theme.css";

export async function generateMetadata(): Promise<Metadata> {
  return buildBaseMetadata();
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const jsonLd = buildGovernmentServiceJsonLd();
  const analyticsId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ?? process.env.GA4_MEASUREMENT_ID;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontVariables} bg-background text-text-primary antialiased`}>
        <Suspense fallback={null}>
          <Providers>
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>
            <StickyHeader />
            <div className="relative">
              <main id="main-content" className="flex min-h-screen flex-col">
                {children}
              </main>
              <Footer />
            </div>
            {analyticsId ? (
              <>
                <Script
                  src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`}
                  strategy="afterInteractive"
                />
                <Script
                  id="tpri-gtag"
                  strategy="afterInteractive"
                  dangerouslySetInnerHTML={{
                    __html:
                      `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}\n` +
                      `gtag('js', new Date());\n` +
                      `window.gtag = gtag;\n` +
                      `gtag('config', '${analyticsId}', { anonymize_ip: true });`,
                  }}
                />
              </>
            ) : null}
            <Script
              id="tpri-jsonld"
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
