export type RecognitionKind = "china" | "taiwan";

export interface RecognitionEntry {
  isoAlpha3: string;
  name: string;
  recognition: RecognitionKind;
  since?: string;
  sinceYear?: number;
  lastChangeEvent?: string;
  notes?: string;
  citationIds: string[];
}

export interface RecognitionDataset {
  version: string;
  updated: string;
  sourceIndex: string;
  entries: RecognitionEntry[];
}

export interface Citation {
  title: string;
  publisher: string;
  url: string;
  accessed?: string;
  note?: string;
}

export type CitationsIndex = Record<string, Citation>;

export interface StyleTokens {
  colors: {
    china: string;
    taiwan: string;
    neutral: string;
    hoverStroke: string;
    ocean: string;
  };
}
