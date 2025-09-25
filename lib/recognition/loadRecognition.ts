import { z } from "zod";

import type { CitationsIndex, RecognitionDataset, RecognitionEntry, StyleTokens } from "./types";

const recognitionEntrySchema: z.ZodType<RecognitionEntry> = z.object({
  isoAlpha3: z.string().min(3).max(3),
  name: z.string(),
  recognition: z.enum(["china", "taiwan"]),
  since: z.string().optional(),
  sinceYear: z.number().optional(),
  lastChangeEvent: z.string().optional(),
  notes: z.string().optional(),
  citationIds: z.array(z.string()).min(1),
});

const recognitionDatasetSchema: z.ZodType<RecognitionDataset> = z.object({
  version: z.string(),
  updated: z.string(),
  sourceIndex: z.string(),
  entries: z.array(recognitionEntrySchema),
});

const citationsIndexSchema = z.record(
  z.string(),
  z.object({
    title: z.string(),
    publisher: z.string(),
    url: z.string().url(),
    accessed: z.string().optional(),
    note: z.string().optional(),
  }),
);

const styleTokensSchema: z.ZodType<StyleTokens> = z.object({
  colors: z.object({
    china: z.string(),
    taiwan: z.string(),
    neutral: z.string(),
    hoverStroke: z.string(),
    ocean: z.string(),
  }),
});

async function fetchAndParse<T>(input: string, schema: z.ZodType<T>): Promise<T> {
  const response = await fetch(input);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${input}: ${response.status} ${response.statusText}`);
  }
  const json = await response.json();
  return schema.parse(json);
}

export async function loadRecognitionDataset(
  src = "/data/recognition.json",
): Promise<RecognitionDataset> {
  return fetchAndParse<RecognitionDataset>(src, recognitionDatasetSchema);
}

export async function loadCitations(src = "/data/citations.json"): Promise<CitationsIndex> {
  return fetchAndParse<CitationsIndex>(src, citationsIndexSchema);
}

export async function loadStyleTokens(src = "/data/style-tokens.json"): Promise<StyleTokens> {
  return fetchAndParse<StyleTokens>(src, styleTokensSchema);
}
