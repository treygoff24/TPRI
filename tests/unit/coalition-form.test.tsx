import React from "react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CoalitionForm } from "@/components/common/coalition-form";

import { render, screen, waitFor } from "../utils/test-utils";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("CoalitionForm", () => {
  it("submits multi-step form data", async () => {
    const fetchMock = vi
      .spyOn(global, "fetch")
      .mockResolvedValue({ ok: true, json: async () => ({ success: true }) } as Response);

    const user = userEvent.setup();
    render(<CoalitionForm />);

    await user.type(screen.getByLabelText("Full name"), "Jane Staffer");
    await user.type(screen.getByLabelText("Email"), "jane@example.com");
    await user.type(screen.getByLabelText("Organization"), "House Foreign Affairs");
    await user.type(screen.getByLabelText("Role/Title"), "Legislative Director");

    await user.click(screen.getByRole("button", { name: "Continue" }));

    await user.selectOptions(await screen.findByLabelText("Primary interest"), "briefing");
    await user.selectOptions(screen.getByLabelText("Timeline"), "immediate");
    await user.type(
      screen.getByLabelText("Message (optional)"),
      "Interested in coalition briefing.",
    );

    await user.click(screen.getByRole("button", { name: "Join the coalition" }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

    const requestPayload = JSON.parse(fetchMock.mock.calls[0][1]?.body as string);
    expect(requestPayload).toMatchObject({
      fullName: "Jane Staffer",
      email: "jane@example.com",
      organization: "House Foreign Affairs",
      role: "Legislative Director",
      interest: "briefing",
      timeline: "immediate",
      message: "Interested in coalition briefing.",
    });

    expect(await screen.findByText(/Thank you/)).toBeInTheDocument();
  });
});
