import { test, expect } from "@playwright/test";

// Mobile-only visual baselines for the layouts most affected by the
// Tailwind migration's responsive work — the hero, the bento, and the
// card-grid horizontal-scroll-snap. Runs in the Pixel-7 chromium project
// per playwright.config.ts.

const routes = [
  { name: "mobile-home", path: "/" },
  { name: "mobile-about", path: "/about" },
  { name: "mobile-projects", path: "/projects" },
];

for (const { name, path } of routes) {
  test(`visual: ${name}`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    await page.evaluate(() => document.fonts.ready);

    await expect(page).toHaveScreenshot(`${name}.png`, {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });
}
