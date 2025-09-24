import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Please provide your name."),
  email: z.string().email("Use a valid email address."),
  message: z.string().min(10, "Add at least a sentence so we can route your request."),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const coalitionFormSchema = z.object({
  fullName: z.string().min(2, "Let us know who you are."),
  email: z.string().email("Use a valid email address."),
  organization: z.string().min(2, "Organization is required."),
  organizationType: z.enum(["policy", "business", "labor", "investment", "other"]),
  role: z.string().min(2, "Tell us your role or title."),
  interest: z.enum(["briefing", "membership", "intel", "other"]),
  timeline: z.enum(["immediate", "30days", "quarter", "research"]),
  message: z.string().optional(),
});

export type CoalitionFormData = z.infer<typeof coalitionFormSchema>;
