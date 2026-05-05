import { test, expect } from "@playwright/test";

// FilterCardRow is URL-driven: clicking a chip updates `?paramName=slug`,
// the page re-fetches with a server-side filter, and the visible
// sections narrow to just the active filter. Test on the three hubs
// that wire it up to different param names.

test.describe("Filter cards", () => {
  test("Certificates: clicking an issuer chip updates URL and narrows the grid", async ({
    page,
  }) => {
    await page.goto("/certificates");

    const firstChip = page.locator(".filter-card").first();
    await expect(firstChip).toBeVisible();
    const chipName = (await firstChip.locator(".filter-card-name").innerText()).trim();

    await firstChip.click();

    await expect(page).toHaveURL(/\?issuer=/);
    // Filtered mode renders a single section header matching the issuer name
    await expect(
      page.locator(".section-header h2").filter({ hasText: chipName }),
    ).toBeVisible();
  });

  test("Projects: clicking a category chip updates URL and narrows visible sections", async ({
    page,
  }) => {
    await page.goto("/projects");

    const firstChip = page.locator(".filter-card").first();
    await expect(firstChip).toBeVisible();
    const chipName = (await firstChip.locator(".filter-card-name").innerText()).trim();

    await firstChip.click();
    await expect(page).toHaveURL(/\?category=/);

    // Only one category section should render in filtered mode
    const sectionHeadings = page.locator(".topic-section .section-header h2");
    await expect(sectionHeadings).toHaveCount(1);
    await expect(sectionHeadings.first()).toContainText(chipName);
  });

  test("Journey: clicking a year chip updates URL", async ({ page }) => {
    await page.goto("/journey");

    const firstChip = page.locator(".filter-card").first();
    await expect(firstChip).toBeVisible();
    await firstChip.click();

    await expect(page).toHaveURL(/\?year=/);
  });
});
