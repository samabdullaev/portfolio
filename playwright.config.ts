import { defineConfig, devices } from "@playwright/test";

// Phase 9 baseline. Targets a local dev server at :3000. Reuses an
// existing server if one is already running (so tests don't fight the
// editor's dev session); spawns one otherwise. CI hookup deferred to
// Phase 14.
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "github" : "list",

  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 720 } },
      // Mobile-only specs run in their own project; skip here so the
      // burger menu (hidden by CSS at desktop breakpoints) doesn't get
      // hit with desktop-viewport assertions.
      testIgnore: /.*\.mobile\.spec\.ts$/,
    },
    {
      name: "mobile",
      // Mobile viewport on chromium — we test our own media queries,
      // not vendor browser quirks, so a real Safari (webkit) install
      // isn't needed. Pixel 7 ships with `defaultBrowserType: chromium`.
      use: { ...devices["Pixel 7"] },
      testMatch: /.*\.mobile\.spec\.ts$/,
    },
  ],

  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
