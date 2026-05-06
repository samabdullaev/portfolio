import { test, expect } from "@playwright/test";

// Each hub page must: render its heading, render at least one card or
// filter chip, and have no broken thumbnail images. These are the
// happy-path smoke tests that the Tailwind migration must not regress.

const hubs = [
  { path: "/projects", heading: "Projects" },
  { path: "/blog", heading: "Blog" },
  { path: "/journey", heading: /Journey/i },
  { path: "/resources", heading: "Resources" },
  { path: "/certificates", heading: "Certificates" },
  { path: "/travel", heading: "Travel" },
  { path: "/reviews", heading: /Yearly Reviews/i },
  { path: "/mentorship", heading: "Mentorship" },
];

for (const { path, heading } of hubs) {
  test(`hub: ${path} renders heading + content`, async ({ page }) => {
    await page.goto(path);

    await expect(page.getByRole("heading", { name: heading, level: 1 })).toBeVisible();

    // Either a card or filter chip exists with at least one item.
    const cardCount = await page.getByTestId("hub-card").count();
    const chipCount = await page.getByRole("tab").count();
    expect(cardCount + chipCount).toBeGreaterThan(0);

    // No broken images. next/image lazy-loads below-fold images, so
    // scroll to the bottom first to trigger every IntersectionObserver,
    // then wait for the network to settle before checking. Filter to
    // images that actually attempted a load (currentSrc set) — lazy
    // images that never came into view have naturalWidth=0 by design.
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForLoadState("networkidle");
    const broken = await page.evaluate(() =>
      [...document.images].filter((img) => img.currentSrc && img.naturalWidth === 0).length,
    );
    expect(broken).toBe(0);
  });
}
