const defaultLocale = "en-US";

export function daysSince(date: string | Date): number {
  const target = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diff = now.getTime() - target.getTime();
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat(defaultLocale, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value >= 1000000000 ? 0 : 1,
  }).format(value);
}

export function formatCompactValue(value: number) {
  const formatter = new Intl.NumberFormat(defaultLocale, {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
  });
  return formatter.format(value);
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat(defaultLocale).format(value);
}

export type CountdownDescriptor = {
  label: string;
  startDate: string;
};

export function getParaguayCountdown(): CountdownDescriptor {
  return {
    label: "Days since Paraguay reaffirmed Taiwan alliance",
    startDate: "2023-05-01",
  };
}
