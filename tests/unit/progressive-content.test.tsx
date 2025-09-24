import React from "react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ProgressiveContent } from "@/components/common/progressive-content";
import type { HowItWorksStep } from "@/lib/content";

import { render, screen } from "../utils/test-utils";

function createStep(id: string, label: string, text: string): HowItWorksStep {
  const Component = () => <p>{text}</p>;
  return {
    id,
    label,
    Content: Component,
  };
}

describe("ProgressiveContent", () => {
  it("renders steps and switches content when tabs change", async () => {
    const steps: HowItWorksStep[] = [
      createStep("quick", "Quick Take", "Fast summary"),
      createStep("full", "Full Explanation", "Detailed overview"),
      createStep("deep", "Technical Deep Dive", "All the details"),
    ];

    const user = userEvent.setup();
    render(<ProgressiveContent steps={steps} />);

    expect(screen.getByText("Fast summary")).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Quick Take" })).toHaveAttribute("data-state", "active");

    await user.click(screen.getByRole("tab", { name: "Full Explanation" }));
    expect(await screen.findByText("Detailed overview", {}, { timeout: 500 })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Full Explanation" })).toHaveAttribute(
      "data-state",
      "active",
    );
  });
});
