"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { coalitionFormSchema, type CoalitionFormData } from "@/lib/forms";

type CoalitionFormStep = 1 | 2;

const clampStep = (value: number): CoalitionFormStep => (value <= 1 ? 1 : 2);

export function CoalitionForm() {
  const [step, setStep] = useState<CoalitionFormStep>(1);
  const [status, setStatus] = useState<"idle" | "success" | "error" | "submitting">("idle");
  const form = useForm<CoalitionFormData>({
    resolver: zodResolver(coalitionFormSchema),
    defaultValues: {
      organizationType: "policy",
      interest: "membership",
      timeline: "30days",
    },
  });

  const nextStep = () => setStep((prev) => clampStep(prev + 1));
  const prevStep = () => setStep((prev) => clampStep(prev - 1));

  const onSubmit = async (data: CoalitionFormData) => {
    setStatus("submitting");
    try {
      const response = await fetch("/api/coalition", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }
      trackEvent({ action: "coalition_submit", category: "conversion", label: data.interest });
      setStatus("success");
      form.reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <form className="flex flex-col gap-y-6" onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-muted-foreground">Step {step} of 2</p>
        <div className="flex gap-1">
          <span className={cn("h-2 w-8 rounded-full", step >= 1 ? "bg-primary" : "bg-muted")} />
          <span className={cn("h-2 w-8 rounded-full", step >= 2 ? "bg-primary" : "bg-muted")} />
        </div>
      </div>
      {step === 1 ? (
        <div className="grid gap-4">
          <label className="flex flex-col text-sm">
            <span className="font-semibold text-foreground">Full name</span>
            <input
              className="mt-2 rounded-full border border-border/60 bg-background px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              {...form.register("fullName")}
            />
            {form.formState.errors.fullName ? (
              <span className="mt-1 text-xs text-danger">
                {form.formState.errors.fullName.message}
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
            <span className="font-semibold text-foreground">Organization</span>
            <input
              className="mt-2 rounded-full border border-border/60 bg-background px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              {...form.register("organization")}
            />
            {form.formState.errors.organization ? (
              <span className="mt-1 text-xs text-danger">
                {form.formState.errors.organization.message}
              </span>
            ) : null}
          </label>
          <label className="flex flex-col text-sm">
            <span className="font-semibold text-foreground">Role/Title</span>
            <input
              className="mt-2 rounded-full border border-border/60 bg-background px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              {...form.register("role")}
            />
            {form.formState.errors.role ? (
              <span className="mt-1 text-xs text-danger">{form.formState.errors.role.message}</span>
            ) : null}
          </label>
          <label className="flex flex-col text-sm">
            <span className="font-semibold text-foreground">Organization type</span>
            <select
              className="mt-2 rounded-full border border-border/60 bg-background px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              {...form.register("organizationType")}
            >
              <option value="policy">Policy / Think Tank</option>
              <option value="business">Business Association</option>
              <option value="labor">Labor Organization</option>
              <option value="investment">Investment / Finance</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>
      ) : (
        <div className="grid gap-4">
          <label className="flex flex-col text-sm">
            <span className="font-semibold text-foreground">Primary interest</span>
            <select
              className="mt-2 rounded-full border border-border/60 bg-background px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              {...form.register("interest")}
            >
              <option value="briefing">Request congressional briefing</option>
              <option value="membership">Join coalition</option>
              <option value="intel">Receive intelligence updates</option>
              <option value="other">Other collaboration</option>
            </select>
          </label>
          <label className="flex flex-col text-sm">
            <span className="font-semibold text-foreground">Timeline</span>
            <select
              className="mt-2 rounded-full border border-border/60 bg-background px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              {...form.register("timeline")}
            >
              <option value="immediate">Immediate (next 2 weeks)</option>
              <option value="30days">Within 30 days</option>
              <option value="quarter">This quarter</option>
              <option value="research">Exploratory / research stage</option>
            </select>
          </label>
          <label className="flex flex-col text-sm">
            <span className="font-semibold text-foreground">Message (optional)</span>
            <textarea
              rows={4}
              className="mt-2 rounded-3xl border border-border/60 bg-background px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              {...form.register("message")}
            />
          </label>
        </div>
      )}
      <div className="flex justify-between">
        {step > 1 ? (
          <button
            type="button"
            className="rounded-full border border-border/60 px-4 py-2 text-sm font-semibold text-muted-foreground hover:border-foreground"
            onClick={prevStep}
          >
            Back
          </button>
        ) : (
          <span />
        )}
        {step < 2 ? (
          <button
            type="button"
            className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground hover:bg-secondary/90"
            onClick={async () => {
              const valid = await form.trigger(["fullName", "email", "organization", "role"]);
              if (valid) {
                nextStep();
              }
            }}
          >
            Continue
          </button>
        ) : (
          <button
            type="submit"
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Submitting…" : "Join the coalition"}
          </button>
        )}
      </div>
      {status === "success" ? (
        <p className="rounded-3xl bg-success/10 px-4 py-3 text-sm text-success">
          Thank you—our outreach team will follow up within 48 hours.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="rounded-3xl bg-danger/10 px-4 py-3 text-sm text-danger">
          Something went wrong. Please email coalition@tpri.org while we investigate.
        </p>
      ) : null}
    </form>
  );
}
