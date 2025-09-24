import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("home page passes automated accessibility checks", async ({ page }) => {
  await page.goto("/");

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .disableRules(["color-contrast"]) // handled via manual design review, reduces noise from SVGs.
    .analyze();

  expect(results.violations).toEqual([]);
});
