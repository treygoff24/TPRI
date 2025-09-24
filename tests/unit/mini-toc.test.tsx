import React from "react";
import { describe, expect, it } from "vitest";

import { MiniToc } from "@/components/common/mini-toc";
import { MiniTocProvider } from "@/components/common/mini-toc-provider";

import { render, screen } from "../utils/test-utils";

describe("MiniToc", () => {
  it("renders section links with active state", () => {
    render(
      <MiniTocProvider sections={[{ id: "hero", label: "Overview" }]}>
        <div>
          <div data-toc-id="hero" id="hero">
            Hero content
          </div>
          <MiniToc />
        </div>
      </MiniTocProvider>,
    );

    const link = screen.getByRole("link", { name: "Overview" });
    expect(link).toHaveAttribute("href", "#hero");
    expect(link.className).toContain("bg-primary");
  });
});
