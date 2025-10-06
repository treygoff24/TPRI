import { NextResponse } from "next/server";

import { contactFormSchema, type ContactFormData } from "@/lib/forms";
import { logError } from "@/lib/logger";
import { rateLimit } from "@/lib/rate-limit";

const CRM_WEBHOOK_URL = process.env.CRM_WEBHOOK_URL;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "TPRI Coalition <no-reply@tpri.org>";

async function forwardToCrm(payload: ContactFormData) {
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
        type: "contact",
        receivedAt: new Date().toISOString(),
        payload,
      }),
    });

    if (!response.ok) {
      throw new Error(`CRM webhook failed with status ${response.status}`);
    }

    return { channel: "crm", status: "fulfilled" as const };
  } catch (error) {
    logError("CRM webhook call failed", error);
    return { channel: "crm", status: "rejected" as const };
  }
}

async function sendResendConfirmation(payload: ContactFormData) {
  if (!RESEND_API_KEY) {
    return { channel: "resend", status: "skipped" as const };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: RESEND_FROM_EMAIL,
        to: payload.email,
        subject: "TPRI team received your message",
        text: `Hi ${payload.name},\n\nThank you for contacting the Total Political Risk Insurance team. A policy specialist will review your note and follow up within one business day.\n\n– TPRI Coalition`,
      }),
    });

    if (!response.ok) {
      throw new Error(`Resend API failed with status ${response.status}`);
    }

    return { channel: "resend", status: "fulfilled" as const };
  } catch (error) {
    logError("Resend notification failed", error);
    return { channel: "resend", status: "rejected" as const };
  }
}

export async function POST(request: Request) {
  // Apply rate limiting
  const rateLimitResponse = rateLimit(request);
  if (rateLimitResponse) return rateLimitResponse;

  let payload: ContactFormData;

  try {
    const json = await request.json();
    payload = contactFormSchema.parse(json);
  } catch (error) {
    logError("Invalid contact payload", error);
    return NextResponse.json(
      {
        success: false,
        error: "Invalid payload.",
      },
      { status: 400 },
    );
  }

  const results = await Promise.all([forwardToCrm(payload), sendResendConfirmation(payload)]);
  const failures = results.filter((result) => result.status === "rejected");

  if (failures.length > 0) {
    return NextResponse.json(
      {
        success: false,
        error: "Unable to process contact request completely.",
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
