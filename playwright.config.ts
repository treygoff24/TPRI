import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3000";
const shouldStartServer = !process.env.PLAYWRIGHT_BASE_URL;
if (shouldStartServer && !process.env.NEXT_PUBLIC_ENABLE_SW) {
  process.env.NEXT_PUBLIC_ENABLE_SW = "true";
}

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  webServer: shouldStartServer
    ? {
        command: "NEXT_PUBLIC_ENABLE_SW=true npm run dev -- --hostname 127.0.0.1 --port 3000",
        reuseExistingServer: !process.env.CI,
        port: 3000,
        stdout: "pipe",
        stderr: "pipe",
        timeout: 120_000,
      }
    : undefined,
  projects: [
    {
      name: "chromium-desktop",
      use: devices["Desktop Chrome"],
    },
    {
      name: "chromium-mobile",
      use: {
        ...devices["Pixel 5"],
        viewport: { width: 393, height: 851 },
      },
    },
  ],
});
