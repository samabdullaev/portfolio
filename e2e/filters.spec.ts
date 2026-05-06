import { test, expect } from "@playwright/test";

// FilterCardRow is URL-driven: clicking a chip updates `?paramName=slug`,
// the page re-fetches with a server-side filter, and the visible
// sections narrow to just the active filter. Test on the three hubs
// that wire it up to different param names.

test.describe("Filter cards", () => {
  test("Certificates: clicking an issuer chip updates URL", async ({ page }) => {
    await page.goto("/certificates");

    const firstChip = page.getByRole("tab").first();
    await expect(firstChip).toBeVisible();
    await firstChip.click();

    await expect(page).toHaveURL(/\?issuer=/);
    // After filtering, at least one section heading should be visible
    await expect(page.getByRole("heading", { level: 2 }).first()).toBeVisible();
  });

  test("Projects: clicking a category chip narrows to one section", async ({ page }) => {
    await page.goto("/projects");

    const firstChip = page.getByRole("tab").first();
    await firstChip.click();
    await expect(page).toHaveURL(/\?category=/);

    // Filtered mode renders exactly one category section
    await expect(page.getByRole("heading", { level: 2 })).toHaveCount(1);
  });

  test("Journey: clicking a year chip updates URL", async ({ page }) => {
    await page.goto("/journey");

    const firstChip = page.getByRole("tab").first();
    await firstChip.click();
    await expect(page).toHaveURL(/\?year=/);
  });
});
