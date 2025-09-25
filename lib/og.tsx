import type { ReactElement } from "react";

export type OgSection = {
  id: string;
  title: string;
  summary: string;
};

export const OG_SECTIONS: OgSection[] = [
  {
    id: "hero",
    title: "Unlock $3 Trillion in American Investment",
    summary: "Private capital beats state control and keeps allies aligned with the United States.",
  },
  {
    id: "problem",
    title: "The Strategic Competition",
    summary:
      "China’s state-backed financing is locking in ports, minerals, and influence across the Americas.",
  },
  {
    id: "solution",
    title: "Our Solution: Insurance That Works",
    summary:
      "Political risk insurance, certified zones, and triple-damages recovery unlock private capital.",
  },
  {
    id: "evidence",
    title: "Proven Results in Honduras",
    summary:
      "Próspera demonstrates how transparent zones and long-term coverage deliver real outcomes.",
  },
  {
    id: "resources",
    title: "Resources for Policymakers",
    summary: "Briefings, legislative text, and coalition tools ready for immediate distribution.",
  },
  {
    id: "footer",
    title: "Build the American Alternative",
    summary:
      "Private capital keeps the hemisphere free, prosperous, and aligned with American values.",
  },
  {
    id: "action",
    title: "Take Action",
    summary: "Schedule briefings or coordinate coalition outreach with one inbox.",
  },
];

export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;

export function resolveOgSection(sectionId: string | null): OgSection | undefined {
  if (!sectionId) return undefined;
  return OG_SECTIONS.find((section) => section.id === sectionId);
}

export function renderOgImage(section?: OgSection): ReactElement {
  const title = section?.title ?? "Unlock $3 Trillion in American Investment";
  const summary =
    section?.summary ??
    "Political risk insurance plus certified zones unlock private capital and counter authoritarian financing.";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(135deg, #f8fafb 0%, #ffffff 60%, #e6f0ff 100%)",
        color: "#0a0f14",
        padding: "48px",
        position: "relative",
        fontFamily: "Playfair Display, " + "Georgia, serif",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "0",
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(0,102,255,0.08), transparent 55%), radial-gradient(circle at 75% 25%, rgba(0,212,170,0.08), transparent 45%)",
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
              fontSize: "18px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "rgba(10, 15, 20, 0.55)",
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            TPRI Coalition
          </span>
          <h1 style={{ fontSize: "60px", lineHeight: 1.05, margin: 0 }}>{title}</h1>
          <p
            style={{
              fontSize: "24px",
              lineHeight: 1.3,
              margin: 0,
              color: "rgba(10, 15, 20, 0.72)",
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            {summary}
          </p>
        </div>
        <div
          style={{
            alignSelf: "flex-start",
            padding: "10px 18px",
            borderRadius: "9999px",
            border: "1px solid rgba(0, 102, 255, 0.15)",
            fontSize: "18px",
            fontFamily: "Inter, system-ui, sans-serif",
            background: "rgba(230, 240, 255, 0.6)",
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
          fontSize: "20px",
          color: "rgba(10, 15, 20, 0.62)",
        }}
      >
        <span>Mobilize private capital. Defend democratic markets.</span>
        <span>{new Date().getFullYear()} · tpri.org</span>
      </div>
    </div>
  );
}
