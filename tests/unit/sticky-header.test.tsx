import React, { act } from "react";
import { describe, expect, it } from "vitest";

import { StickyHeader } from "@/components/common/sticky-header";

import { render, screen, waitFor } from "../utils/test-utils";

function setScrollY(value: number) {
  Object.defineProperty(window, "scrollY", {
    configurable: true,
    writable: true,
    value,
  });
  window.dispatchEvent(new Event("scroll"));
}

describe("StickyHeader", () => {
  it("renders navigation with call to action", () => {
    render(<StickyHeader />);

    expect(screen.getByText("TPRI")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Book Briefing" })).toBeInTheDocument();
  });

  it("toggles scrolled styling based on window scroll position", async () => {
    const { container } = render(<StickyHeader />);
    const header = container.querySelector("header");
    expect(header).toBeTruthy();

    setScrollY(0);
    expect(header!.className).not.toContain("shadow-elevated");

    await act(async () => {
      setScrollY(180);
    });

    await waitFor(() => expect(header!.className).toContain("shadow-elevated"));
  });
});
