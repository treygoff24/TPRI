import { fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { StickyHeader } from "@/components/common/sticky-header";

import { render, screen } from "../utils/test-utils";

describe("StickyHeader", () => {
  it("renders nav links and primary CTA", () => {
    render(<StickyHeader />);

    expect(screen.getByText("TPRI")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "The Problem" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Take Action" })).toBeInTheDocument();
  });

  it("toggles the mobile menu", () => {
    render(<StickyHeader />);
    const toggle = screen.getByRole("button", { name: /toggle navigation/i });

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
  });
});
