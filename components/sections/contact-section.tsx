"use client";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { CoalitionForm } from "@/components/common/coalition-form";
import { SectionHeader } from "@/components/common/section-header";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { trackEvent } from "@/lib/analytics";
import type { CompiledSection } from "@/lib/content";
import { contactFormSchema, type ContactFormData } from "@/lib/forms";

export function ContactSection({ section }: { section: CompiledSection }) {
  const SectionContent = section.Content;
  const form = useForm<ContactFormData>({ resolver: zodResolver(contactFormSchema) });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);

  const loadCalendly = () => {
    if (calendlyLoaded) return;
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => setCalendlyLoaded(true);
    script.onerror = () => setCalendlyLoaded(false);
    document.body.appendChild(script);
  };

  const onSubmit = async (data: ContactFormData) => {
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed");
      trackEvent({ action: "contact_submit", category: "conversion" });
      setStatus("success");
      form.reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  useEffect(() => {
    if (calendlyLoaded && window.Calendly) {
      window.Calendly.initBadgeWidget?.({
        url: process.env.NEXT_PUBLIC_CALENDLY_BOOKING_URL ?? "https://calendly.com/tpri/briefing",
        text: "Book a briefing",
        color: "#0A3161",
        textColor: "#ffffff",
      });
    }
  }, [calendlyLoaded]);

  return (
    <SectionWrapper id={section.meta.id} background={section.meta.background}>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="flex flex-col gap-y-8">
          <SectionHeader title={section.meta.title} summary={section.meta.summary} align="left" />
          <div className="prose max-w-prose text-sm text-muted-foreground">
            <SectionContent />
          </div>
          <div
            id="briefing"
            className="rounded-3xl border border-border/60 bg-background/80 p-6 shadow-sm"
          >
            <h3 className="text-base font-semibold text-foreground">General contact</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Send a secure note to the policy team. We respond within one business day.
            </p>
            <form
              className="mt-4 flex flex-col gap-y-4"
              onSubmit={form.handleSubmit(onSubmit)}
              noValidate
            >
              <label className="flex flex-col text-sm">
                <span className="font-semibold text-foreground">Name</span>
                <input
                  className="mt-2 rounded-full border border-border/60 bg-background px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  {...form.register("name")}
                />
                {form.formState.errors.name ? (
                  <span className="mt-1 text-xs text-danger">
                    {form.formState.errors.name.message}
                  </span>
                ) : null}
              </label>
              <label className="flex flex-col text-sm">
                <span className="font-semibold text-foreground">Email</span>
                <input
                  type="email"
                  className="mt-2 rounded-full border border-border/60 bg-background px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  {...form.register("email")}
                />
                {form.formState.errors.email ? (
                  <span className="mt-1 text-xs text-danger">
                    {form.formState.errors.email.message}
                  </span>
                ) : null}
              </label>
              <label className="flex flex-col text-sm">
                <span className="font-semibold text-foreground">Message</span>
                <textarea
                  rows={4}
                  className="mt-2 rounded-3xl border border-border/60 bg-background px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  {...form.register("message")}
                />
                {form.formState.errors.message ? (
                  <span className="mt-1 text-xs text-danger">
                    {form.formState.errors.message.message}
                  </span>
                ) : null}
              </label>
              <button
                type="submit"
                className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground hover:bg-secondary/90 disabled:opacity-60"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending…" : "Send message"}
              </button>
              {status === "success" ? (
                <p className="rounded-3xl bg-success/10 px-4 py-3 text-sm text-success">
                  Thank you — we will follow up shortly.
                </p>
              ) : null}
              {status === "error" ? (
                <p className="rounded-3xl bg-danger/10 px-4 py-3 text-sm text-danger">
                  Unable to send right now. Email policy@tpri.org instead.
                </p>
              ) : null}
            </form>
            <button
              type="button"
              className="mt-4 inline-flex items-center justify-center rounded-full border border-border/60 px-4 py-2 text-sm font-semibold text-muted-foreground hover:border-foreground"
              onClick={() => {
                loadCalendly();
                if (window.Calendly) {
                  window.Calendly.initPopupWidget({
                    url:
                      process.env.NEXT_PUBLIC_CALENDLY_BOOKING_URL ??
                      "https://calendly.com/tpri/briefing",
                  });
                }
              }}
            >
              Book a briefing via Calendly
            </button>
            <p className="mt-2 text-xs text-muted-foreground">
              If Calendly is blocked on your network, email{" "}
              <a href="mailto:briefings@tpri.org">briefings@tpri.org</a> to coordinate a briefing.
            </p>
          </div>
        </div>
        <div className="rounded-3xl border border-border/60 bg-background/80 p-6 shadow-sm">
          <h3 id="coalition" className="text-base font-semibold text-foreground">
            Join the coalition
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Align chambers of commerce, investors, and policy advocates under a single operating
            picture for TPRI.
          </p>
          <div id="briefing-form" className="mt-4">
            <CoalitionForm />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
      initBadgeWidget?: (options: {
        url: string;
        text: string;
        color: string;
        textColor: string;
      }) => void;
    };
  }
}
