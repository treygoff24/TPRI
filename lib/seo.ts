import type { Metadata } from "next";

const SITE_NAME = "Total Political Risk Insurance";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tpri.example.com";
const SITE_DESCRIPTION =
  "Total Political Risk Insurance mobilizes private capital with Strategic Economic Zones to counter China’s economic coercion.";

export function buildBaseMetadata(): Metadata {
  const titleTemplate = "%s · Total Political Risk Insurance";
  const defaultTitle = "Mobilize $3T of American Investment";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: defaultTitle,
      template: titleTemplate,
    },
    description: SITE_DESCRIPTION,
    applicationName: SITE_NAME,
    openGraph: {
      title: defaultTitle,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "/api/og",
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description: SITE_DESCRIPTION,
      creator: "@tpri_campaign",
    },
    alternates: {
      canonical: SITE_URL,
    },
    verification: {
      other: {
        "ga4-measurement-id": process.env.GA4_MEASUREMENT_ID ?? "",
      },
    },
  } satisfies Metadata;
}

export function buildGovernmentServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "GovernmentService",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    provider: {
      "@type": "GovernmentOrganization",
      name: "U.S. International Development Finance Corporation",
    },
    serviceType: "Political risk insurance",
    areaServed: {
      "@type": "Place",
      name: "Americas",
    },
    url: SITE_URL,
  };
}
