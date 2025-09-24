import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3000";
const shouldStartServer = !process.env.PLAYWRIGHT_BASE_URL;
if (shouldStartServer && !process.env.NEXT_PUBLIC_ENABLE_SW) {
  process.env.NEXT_PUBLIC_ENABLE_SW = "true";
}

export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: /.*a11y\.spec\.ts/,
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  webServer: shouldStartServer
    ? {
        command: "NEXT_PUBLIC_ENABLE_SW=true npm run dev -- --hostname 127.0.0.1 --port 3000",
        reuseExistingServer: !process.env.CI,
        port: 3000,
        timeout: 120_000,
      }
    : undefined,
  projects: [
    {
      name: "chromium-a11y",
      use: devices["Desktop Chrome"],
    },
  ],
});
