import { fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { StickyHeader } from "@/components/common/sticky-header";

import { render, screen } from "../utils/test-utils";

describe("StickyHeader", () => {
  it("renders nav links and primary CTA", () => {
    render(<StickyHeader />);

    expect(screen.getByText("TPRI")).toBeInTheDocument();
    // Both desktop and mobile nav have these links, so use getAllByRole
    expect(screen.getAllByRole("link", { name: "The Problem" })).toHaveLength(2);
    expect(screen.getAllByRole("link", { name: "Take Action" })).toHaveLength(2);
  });

  it("toggles the mobile menu", () => {
    render(<StickyHeader />);
    const toggle = screen.getByRole("button", { name: /toggle navigation/i });

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
  });
});
