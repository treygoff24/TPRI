import type { ReactElement } from "react";

export type OgSection = {
  id: string;
  title: string;
  summary: string;
};

export const OG_SECTIONS: OgSection[] = [
  {
    id: "hero",
    title: "Total Political Risk Insurance",
    summary: "Mobilize $3T of American investment to counter China without new taxpayer spending.",
  },
  {
    id: "paraguay-countdown",
    title: "The Countdown Since Paraguay Chose the United States",
    summary:
      "Paraguay is the last South American ally of Taiwan—every day of inaction invites new pressure from Beijing.",
  },
  {
    id: "china-expansion",
    title: "The $137 Billion Problem",
    summary:
      "China’s state-backed investments in the Americas outpace the United States by more than 4-to-1.",
  },
  {
    id: "executive-summary",
    title: "Executive Summary for Policymakers",
    summary:
      "What TPRI is, how it works, why it is urgent, and the safeguards that keep it accountable.",
  },
  {
    id: "how-it-works",
    title: "How TPRI Works",
    summary: "Three layers of understanding—from a 30-second overview to a technical deep dive.",
  },
  {
    id: "strategic-zones",
    title: "Strategic Economic Zones — Built for American Interests",
    summary:
      "Certified zones partner with the United States to accelerate investment while locking out authoritarian influence.",
  },
  {
    id: "prospera-case-study",
    title: "Case Study — Próspera Proves the Model",
    summary:
      "Honduras already demonstrates how TPRI-ready zones attract clean investment and community support.",
  },
  {
    id: "tpri-vs-pri",
    title: "TPRI Makes Political Risk Insurance Work for American Business",
    summary:
      "Traditional PRI tools are too short-term and too narrow—TPRI delivers 10-20× more mobilized capital.",
  },
  {
    id: "faq",
    title: "Questions from Policymakers",
    summary:
      "Straightforward answers for fiscal conservatives, national security hawks, and progressive reformers alike.",
  },
  {
    id: "downloads",
    title: "Downloads & Resources",
    summary:
      "Staff-ready briefs, model legislation, and coalition materials optimized for offline access.",
  },
  {
    id: "contact",
    title: "Briefings & Coalition Support",
    summary: "Book a confidential briefing or join the coalition advancing TPRI legislation.",
  },
  {
    id: "footer",
    title: "Build the American Alternative",
    summary:
      "Mobilize a trillion dollars of clean capital and lock in democratic norms across the Americas.",
  },
];

export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;

export function resolveOgSection(sectionId: string | null): OgSection | undefined {
  if (!sectionId) return undefined;
  return OG_SECTIONS.find((section) => section.id === sectionId);
}

export function renderOgImage(section?: OgSection): ReactElement {
  const title = section?.title ?? "Total Political Risk Insurance";
  const summary =
    section?.summary ??
    "Mobilize $3T of American investment with Strategic Economic Zones to out-compete authoritarian influence.";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(135deg, #061225 0%, #0A3161 55%, #B21E2E 100%)",
        color: "#F8FAFC",
        padding: "56px",
        position: "relative",
        fontFamily: "Source Serif 4, Georgia, serif",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "0",
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08), transparent 55%), radial-gradient(circle at 80% 15%, rgba(239,178,66,0.18), transparent 50%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "70%" }}>
          <span
            style={{
              fontSize: "20px",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "rgba(248,250,252,0.72)",
            }}
          >
            TPRI Coalition
          </span>
          <h1 style={{ fontSize: "64px", lineHeight: 1.05, margin: 0 }}>{title}</h1>
          <p
            style={{
              fontSize: "28px",
              lineHeight: 1.3,
              margin: 0,
              color: "rgba(248,250,252,0.82)",
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            {summary}
          </p>
        </div>
        <div
          style={{
            alignSelf: "flex-start",
            padding: "12px 20px",
            borderRadius: "9999px",
            border: "1px solid rgba(248,250,252,0.35)",
            fontSize: "20px",
            fontFamily: "Inter, system-ui, sans-serif",
            background: "rgba(6,18,37,0.35)",
          }}
        >
          {section ? `Section · ${section.id}` : "Campaign Overview"}
        </div>
      </div>
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: "22px",
          color: "rgba(248,250,252,0.78)",
        }}
      >
        <span>Mobilize private capital. Defend democratic markets.</span>
        <span>{new Date().getFullYear()} · tpri.org</span>
      </div>
    </div>
  );
}
