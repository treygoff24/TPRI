export type CaseMetric = {
  id: string;
  label: string;
  value: number;
  format: "currency" | "number";
  description?: string;
  citationId?: string;
};

export type ResourceItem = {
  id: string;
  title: string;
  description: string;
  file: string;
};
