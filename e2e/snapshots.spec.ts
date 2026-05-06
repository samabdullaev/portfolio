import { test, expect } from "@playwright/test";

// Visual baselines for every route Phase 10 (Tailwind migration) will
// touch. Re-run with `npm run test:e2e:update` after intentional visual
// changes; otherwise any pixel diff fails the run.
//
// Caveat: pixel-perfect snapshots are machine-specific (font rendering,
// GPU). Treat these as a local-dev safety net; they're not yet wired to
// CI. Will revisit in Phase 14.
//
// Light-mode only — dark-mode tokens flow through the same CSS vars,
// so a regression in either typically shows up in both, and the theme
// toggle is exercised by interactions.spec.ts.

const hubs = [
  { name: "home", path: "/" },
  { name: "about", path: "/about" },
  { name: "projects", path: "/projects" },
  { name: "blog", path: "/blog" },
  { name: "journey", path: "/journey" },
  { name: "resources", path: "/resources" },
  { name: "certificates", path: "/certificates" },
  { name: "travel", path: "/travel" },
  { name: "reviews", path: "/reviews" },
  { name: "mentorship", path: "/mentorship" },
];

// next/image lazy-loads below-fold images, so a snapshot taken right
// after networkidle captures the page mid-load (top images filled,
// bottom blank). Scroll-to-bottom + scroll-back-to-top + networkidle
// triggers every IntersectionObserver and lets the resulting fetches
// settle, giving a deterministic baseline.
async function settle(page: import("@playwright/test").Page) {
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.evaluate(() => document.fonts.ready);
}

for (const { name, path } of hubs) {
  test(`visual: ${name}`, async ({ page }) => {
    await page.goto(path);
    await settle(page);

    await expect(page).toHaveScreenshot(`${name}.png`, {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });
}

// Detail pages — one representative per type. Slugs are discovered at
// runtime so the test doesn't need updating when Sanity content shifts.

const details = [
  { name: "detail-project", hubPath: "/projects" },
  { name: "detail-travel", hubPath: "/travel" },
  { name: "detail-review", hubPath: "/reviews" },
];

for (const { name, hubPath } of details) {
  test(`visual: ${name}`, async ({ page }) => {
    await page.goto(hubPath);
    await page.getByTestId("hub-card").first().click();
    await settle(page);

    await expect(page).toHaveScreenshot(`${name}.png`, {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });
}

// Resource categories live under /resources/<slug>; external `resource`
// items link out, so we filter for internal hrefs to land on a category
// detail page.
test("visual: detail-resource-category", async ({ page }) => {
  await page.goto("/resources");
  await page
    .getByTestId("hub-card")
    .filter({ has: page.locator('a[href^="/resources/"]') })
    .first()
    .click();
  await settle(page);

  await expect(page).toHaveScreenshot("detail-resource-category.png", {
    fullPage: true,
    maxDiffPixelRatio: 0.01,
  });
});
