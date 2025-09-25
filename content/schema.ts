import { z } from "zod";

export const ctaSchema = z.object({
  id: z.string(),
  label: z.string(),
  href: z.string(),
  variant: z.enum(["primary", "secondary", "outline", "ghost"]).default("primary"),
  icon: z.string().optional(),
  external: z.boolean().default(false),
});

export const sectionFrontmatterSchema = z.object({
  id: z.string(),
  order: z.number().int().nonnegative(),
  title: z.string(),
  eyebrow: z.string().optional(),
  summary: z.string().optional(),
  background: z.enum(["default", "surface"]).default("default"),
  ctas: z.array(ctaSchema).optional(),
});

export const statSchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.number(),
  unit: z.enum(["$", "%", "x", "raw"]).default("raw"),
  tooltip: z.string().optional(),
  citationId: z.string().optional(),
});

export const faqSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
  audience: z.enum(["policymaker", "advanced"]),
  category: z.string(),
  related: z.array(z.string()).default([]),
  citationIds: z.array(z.string()).default([]),
});

export const downloadSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  file: z.string(),
  audience: z.array(z.string()).nonempty(),
  tags: z.array(z.string()).default([]),
  size: z.string(),
  updated: z.coerce.date(),
  offline: z.boolean().default(true),
  hero: z.boolean().default(false),
  citationIds: z.array(z.string()).default([]),
});

export const endorsementSchema = z.object({
  id: z.string(),
  name: z.string(),
  title: z.string(),
  organization: z.string(),
  quote: z.string(),
  logo: z.string().optional(),
  url: z.string().url().optional(),
});

export const keyMetricsSchema = z.object({
  opportunitySize: statSchema,
  annualMobilization: statSchema,
  federalLeverage: statSchema,
  geopoliticalCost: statSchema,
});

export const timelineEventSchema = z.object({
  id: z.string(),
  date: z.coerce.date(),
  title: z.string(),
  summary: z.string(),
  impact: z.string(),
  sourceUrl: z.string().url(),
});

export const recognitionSchema = z.object({
  isoCode: z.string().length(2),
  country: z.string(),
  status: z.enum(["recognizes-taiwan", "recognizes-china"]),
  changeDate: z.coerce.date().optional(),
  citationId: z.string().optional(),
});

export const contentBundleSchema = z.object({
  sections: z.array(sectionFrontmatterSchema),
  faqs: z.array(faqSchema),
  downloads: z.array(downloadSchema),
  endorsements: z.array(endorsementSchema),
  stats: keyMetricsSchema,
  timeline: z.array(timelineEventSchema),
  recognition: z.array(recognitionSchema),
});

export type CTA = z.infer<typeof ctaSchema>;
export type SectionFrontmatter = z.infer<typeof sectionFrontmatterSchema>;
export type Stat = z.infer<typeof statSchema>;
export type FAQItem = z.infer<typeof faqSchema>;
export type DownloadResource = z.infer<typeof downloadSchema>;
export type Endorsement = z.infer<typeof endorsementSchema>;
export type KeyMetrics = z.infer<typeof keyMetricsSchema>;
export type TimelineEvent = z.infer<typeof timelineEventSchema>;
export type RecognitionRecord = z.infer<typeof recognitionSchema>;
