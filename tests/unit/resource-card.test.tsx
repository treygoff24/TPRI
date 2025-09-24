import React from "react";
import { describe, expect, it } from "vitest";

import { ResourceCard } from "@/components/common/resource-card";
import type { DownloadResource } from "@/content/schema";

import { render, screen } from "../utils/test-utils";

const resource: DownloadResource = {
  id: "staff-backgrounder",
  title: "Staff Backgrounder",
  description: "Quick overview for staff.",
  file: "/downloads/backgrounder.pdf",
  audience: ["policymakers"],
  tags: ["policy"],
  size: "2 MB",
  updated: new Date("2024-10-01"),
  offline: true,
  hero: false,
  citationIds: [],
};

describe("ResourceCard", () => {
  it("marks offline-ready resources and renders metadata", () => {
    render(<ResourceCard resource={resource} />);

    const article = screen.getByRole("article");
    expect(article).toHaveAttribute("data-offline", "true");
    expect(screen.getByText("Offline ready")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Download" })).toHaveAttribute(
      "href",
      "/downloads/backgrounder.pdf",
    );
  });
});
