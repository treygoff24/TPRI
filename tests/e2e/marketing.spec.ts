import { expect, test } from "@playwright/test";

const PARAGUAY_REFERENCE = new Date("2023-05-01T00:00:00Z");

async function mockFormEndpoints(page: import("@playwright/test").Page) {
  await page.route("**/api/contact", async (route) => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true }),
    });
  });

  await page.route("**/api/coalition", async (route) => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true }),
    });
  });
}

test.describe("Marketing experience", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("hero renders key calls to action", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Total Political Risk Insurance/i }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Book a Congressional Briefing" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Download Staff Backgrounder Kit" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Join the TPRI Coalition" })).toBeVisible();
  });

  test("Paraguay countdown is within one day of real value", async ({ page }) => {
    const text = await page.getByTestId("paraguay-countdown-value").textContent();
    const days = Number((text ?? "").trim());
    const expected = Math.floor((Date.now() - PARAGUAY_REFERENCE.getTime()) / 86_400_000);
    expect(Number.isFinite(days)).toBe(true);
    expect(Math.abs(days - expected)).toBeLessThanOrEqual(1);
  });

  test("timeline and map content visible", async ({ page }) => {
    await expect(page.locator("section#china-expansion")).toBeVisible();
    await expect(page.locator("section#china-expansion svg")).toBeVisible();
    await expect(page.locator('section#china-expansion [role="tabpanel"]')).toHaveCount(3);

    // Mini TOC hidden on narrow viewports by design.
    if (!/mobile/i.test(test.info().project.name)) {
      await expect(page.locator('nav[aria-label="Section navigation"]')).toBeVisible();
    }
  });

  test("downloads list is populated and offline manifest exposes assets", async ({ page }) => {
    const downloadButtons = page.locator('section#downloads a:has-text("Download")');
    await expect(downloadButtons).toHaveCount(4);

    const manifest = await page.evaluate(async () => {
      const response = await fetch("/api/offline-manifest");
      return response.json();
    });

    expect(Array.isArray(manifest.downloads)).toBe(true);
    expect(manifest.downloads.length).toBeGreaterThanOrEqual(4);
    manifest.downloads.forEach((path: string) => expect(path).toMatch(/^\/downloads\//));
  });

  test("contact form submits successfully with mocked CRM hook", async ({ page }) => {
    await mockFormEndpoints(page);

    await page.getByRole("button", { name: "Book a TPRI Briefing" }).click();
    await page.getByLabel("Name").fill("Ava Analyst");
    await page.getByLabel(/^Email$/).fill("ava@example.com");
    await page.getByLabel("Message").fill("Interested in budget scoring details.");
    await page.getByRole("button", { name: "Send message" }).click();

    await expect(page.getByText(/Thank you — we will follow up shortly/i)).toBeVisible();
  });

  test("coalition form submits with mocked response", async ({ page }) => {
    await mockFormEndpoints(page);

    await page.getByRole("button", { name: "Join the coalition" }).scrollIntoViewIfNeeded();
    await page.getByLabel("Full name").fill("Jordan Chief of Staff");
    await page.getByLabel("Email").fill("jordan@example.com");
    await page.getByLabel("Organization").fill("Senate Foreign Relations");
    await page.getByLabel("Role/Title").fill("Chief of Staff");
    await page.getByLabel("Organization type").selectOption("policy");
    await page.getByRole("button", { name: "Continue" }).click();

    await page.getByLabel("Primary interest").selectOption("briefing");
    await page.getByLabel("Timeline").selectOption("immediate");
    await page.getByLabel("Message (optional)").fill("Need coalition onboarding toolkit.");
    await page.getByRole("button", { name: "Join the coalition" }).click();

    await expect(page.getByText(/Thank you—our outreach team will follow up/i)).toBeVisible();
  });

  test("dark mode toggle persists preference after reload", async ({ page }) => {
    await page.getByRole("button", { name: "Toggle color theme" }).click();
    await expect(page.locator("html")).toHaveClass(/dark/);
    await page.reload();
    await expect(page.locator("html")).toHaveClass(/dark/);
  });

  test("service worker registers when enabled for tests", async ({ page }) => {
    const shouldVerifySw =
      process.env.NEXT_PUBLIC_ENABLE_SW === "true" || !!process.env.PLAYWRIGHT_BASE_URL;
    test.skip(!shouldVerifySw, "Service worker disabled in this environment");

    await page.waitForFunction(() => navigator.serviceWorker?.controller !== null, null, {
      timeout: 10_000,
    });
    const cachesInfo = await page.evaluate(async () => {
      const keys = await caches.keys();
      return keys;
    });
    expect(Array.isArray(cachesInfo)).toBe(true);
  });
});
