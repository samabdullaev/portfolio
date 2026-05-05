import { test, expect } from "@playwright/test";

// Visual baselines for the routes that take the heaviest CSS load and
// will get migrated to Tailwind in Phase 10. Re-run with
// `npm run test:e2e:update` after intentional visual changes; otherwise
// any pixel diff fails the run.
//
// Caveat: pixel-perfect snapshots are machine-specific (font rendering,
// GPU). Treat these as a local-dev safety net; they're not yet wired to
// CI. Will revisit in Phase 14 when CI is set up.

const routes = [
  { name: "home", path: "/" },
  { name: "about", path: "/about" },
  { name: "projects", path: "/projects" },
  { name: "certificates", path: "/certificates" },
  { name: "blog", path: "/blog" },
];

for (const { name, path } of routes) {
  test(`visual: ${name}`, async ({ page }) => {
    await page.goto(path);

    // Settle: wait for fonts to load + any LCP image to paint, so
    // baselines aren't captured mid-render.
    await page.waitForLoadState("networkidle");
    await page.evaluate(() => document.fonts.ready);

    await expect(page).toHaveScreenshot(`${name}.png`, {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });
}
