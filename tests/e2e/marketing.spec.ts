import { expect, test } from "@playwright/test";

test.describe("Marketing experience", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("hero highlights key message and CTAs", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /Unlock \$3 Trillion in/i })).toBeVisible();
    await expect(page.getByRole("link", { name: "View 2-Minute Brief" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Download Full Proposal" })).toBeVisible();
  });

  test("problem section surfaces strategic stats and map", async ({ page }) => {
    const problemSection = page.locator("section#problem");
    await expect(problemSection).toBeVisible();
    await expect(problemSection.getByText("$137B")).toBeVisible();
    await expect(problemSection.getByText("Diplomatic Recognition in the Americas")).toBeVisible();
    await expect(
      problemSection.locator('[data-testid="recognition-map"]'),
      "map renders",
    ).toBeVisible();
  });

  test("solution pillars outline the program", async ({ page }) => {
    const cards = page.locator("section#solution h3");
    await expect(cards).toHaveCount(3);
    await expect(cards.first()).toHaveText(/Political Risk Insurance/);
  });

  test("resources section lists downloadable briefs", async ({ page }) => {
    const resourceLinks = page.locator("section#resources a", { hasText: "Download PDF" });
    await expect(resourceLinks).toHaveCount(4);
    const hrefs = await resourceLinks.evaluateAll((anchors) =>
      anchors.map((anchor) => anchor.getAttribute("href")),
    );
    hrefs.forEach((href) => {
      expect(href).toMatch(/^\/downloads\//);
    });
  });

  test("action section exposes briefing contacts", async ({ page }) => {
    const actionSection = page.locator("section#action");
    await expect(actionSection).toBeVisible();
    await expect(actionSection.getByRole("link", { name: "Request Briefing" })).toHaveAttribute(
      "href",
      "mailto:briefings@tpri.gov",
    );
    await expect(actionSection.getByRole("link", { name: "Join the Coalition" })).toHaveAttribute(
      "href",
      "mailto:coalition@tpri.gov",
    );
  });
});
