import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: Array<string | false | null | undefined>) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | Date, options?: Intl.DateTimeFormatOptions) {
  const date = typeof input === "string" ? new Date(input) : input;
  return new Intl.DateTimeFormat(
    "en-US",
    options ?? { year: "numeric", month: "short", day: "numeric" },
  ).format(date);
}

export function formatFileSize(label: string) {
  return label.replace(/\s+/g, " ").trim();
}
