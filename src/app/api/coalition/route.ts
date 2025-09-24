import { NextResponse } from "next/server";

import { coalitionFormSchema, type CoalitionFormData } from "@/lib/forms";

const CRM_WEBHOOK_URL = process.env.CRM_WEBHOOK_URL;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "TPRI Coalition <no-reply@tpri.org>";
const COALITION_ALERT_EMAIL = process.env.COALITION_ALERT_EMAIL;

async function forwardToCrm(payload: CoalitionFormData) {
  if (!CRM_WEBHOOK_URL) {
    return { channel: "crm", status: "skipped" as const };
  }

  try {
    const response = await fetch(CRM_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "coalition",
        receivedAt: new Date().toISOString(),
        payload,
      }),
    });

    if (!response.ok) {
      throw new Error(`CRM webhook failed with status ${response.status}`);
    }

    return { channel: "crm", status: "fulfilled" as const };
  } catch (error) {
    console.error("CRM webhook call failed", error);
    return { channel: "crm", status: "rejected" as const };
  }
}

async function sendResendWorkflow(payload: CoalitionFormData) {
  if (!RESEND_API_KEY) {
    return { channel: "resend", status: "skipped" as const };
  }

  try {
    const acknowledgement = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: RESEND_FROM_EMAIL,
        to: payload.email,
        subject: "TPRI coalition request received",
        text: `Hi ${payload.fullName},\n\nThanks for raising your hand to join the Total Political Risk Insurance coalition. Our team will follow up within two business days with next steps tailored to ${payload.organization}.\n\n– TPRI Coalition`,
      }),
    });

    if (!acknowledgement.ok) {
      throw new Error(`Resend acknowledgement failed with status ${acknowledgement.status}`);
    }

    if (COALITION_ALERT_EMAIL) {
      const alert = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: RESEND_FROM_EMAIL,
          to: COALITION_ALERT_EMAIL,
          subject: "New TPRI coalition inquiry",
          text: `Coalition lead: ${payload.fullName} (${payload.organization})\nRole: ${payload.role}\nType: ${payload.organizationType}\nInterest: ${payload.interest}\nTimeline: ${payload.timeline}\nEmail: ${payload.email}\n\nMessage:\n${payload.message ?? "(none)"}`,
        }),
      });

      if (!alert.ok) {
        throw new Error(`Resend alert failed with status ${alert.status}`);
      }
    }

    return { channel: "resend", status: "fulfilled" as const };
  } catch (error) {
    console.error("Resend coalition notification failed", error);
    return { channel: "resend", status: "rejected" as const };
  }
}

export async function POST(request: Request) {
  let payload: CoalitionFormData;

  try {
    const json = await request.json();
    payload = coalitionFormSchema.parse(json);
  } catch (error) {
    console.error("Invalid coalition payload", error);
    return NextResponse.json(
      {
        success: false,
        error: "Invalid payload.",
      },
      { status: 400 },
    );
  }

  const results = await Promise.all([forwardToCrm(payload), sendResendWorkflow(payload)]);
  const failures = results.filter((result) => result.status === "rejected");

  if (failures.length > 0) {
    return NextResponse.json(
      {
        success: false,
        error: "Unable to process coalition request completely.",
        channels: results,
      },
      { status: 502 },
    );
  }

  return NextResponse.json(
    {
      success: true,
      channels: results,
    },
    { status: 200 },
  );
}

export const dynamic = "force-dynamic";
