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

    // Either a card grid (card-grid-filtered or always-visible) or filter
    // row exists with at least one item.
    const anyCardOrChip = page
      .locator(".hub-card, .filter-card, .card-grid-filtered > *")
      .first();
    await expect(anyCardOrChip).toBeVisible();

    // No broken images on this page (anything in src that resolved to a
    // 0-naturalWidth image is broken). Empty or absent <img> = OK.
    const broken = await page.evaluate(() =>
      [...document.images].filter((img) => img.src && img.naturalWidth === 0).length,
    );
    expect(broken).toBe(0);
  });
}
