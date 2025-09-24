import { afterEach, describe, expect, it, vi } from "vitest";

import { daysSince, formatCurrency, formatCompactValue, formatNumber } from "@/lib/metrics";

afterEach(() => {
  vi.useRealTimers();
});

describe("metrics helpers", () => {
  it("computes days since a specific date", () => {
    vi.setSystemTime(new Date("2024-01-31T00:00:00Z"));
    expect(daysSince("2024-01-01")).toBe(30);
  });

  it("formats currency with compact digits", () => {
    expect(formatCurrency(1200000000)).toBe("$1,200,000,000");
  });

  it("formats compact values and plain numbers", () => {
    expect(formatCompactValue(137000000000)).toBe("137B");
    expect(formatNumber(92000000000)).toBe("92,000,000,000");
  });
});
