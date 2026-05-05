import { test, expect } from "@playwright/test";

// Detail-page smoke: navigate from each hub to the first item, verify
// the detail page renders meaningful content and has no broken images.
// One representative per detail-page type (project / resource-category
// / travel / review).

test.describe("Detail pages", () => {
  test("project detail renders gallery + sections", async ({ page }) => {
    await page.goto("/projects");

    // First project card
    const firstCard = page.locator(".hub-card a, .hub-card").first();
    await expect(firstCard).toBeVisible();
    await firstCard.click();

    // URL should be /projects/{slug}
    await expect(page).toHaveURL(/\/projects\/[^/]+$/);

    // Detail components
    await expect(page.locator(".project-title")).toBeVisible();
    await expect(page.locator(".project-gallery")).toBeVisible();

    // At least the "about" section (every project has one)
    await expect(
      page.locator(".project-section-title").filter({ hasText: /about/i }),
    ).toBeVisible();

    // Back link works
    await page.locator(".project-back").click();
    await expect(page).toHaveURL(/\/projects$/);
  });

  test("travel destination detail renders gallery + content", async ({ page }) => {
    await page.goto("/travel");

    await page.locator(".hub-card a, .hub-card").first().click();
    await expect(page).toHaveURL(/\/travel\/[^/]+$/);

    await expect(page.locator(".project-title")).toBeVisible();
    await expect(page.locator(".project-gallery")).toBeVisible();
  });

  test("yearly review detail renders sections", async ({ page }) => {
    await page.goto("/reviews");

    await page.locator(".hub-card a, .hub-card").first().click();
    await expect(page).toHaveURL(/\/reviews\/[^/]+$/);

    await expect(page.locator(".project-title")).toContainText(/Yearly Review/i);
    await expect(page.locator(".project-section").first()).toBeVisible();
  });

  test("resource category detail renders item list", async ({ page }) => {
    // Resources hub has both external `resource` cards (link out) and
    // internal `resourceCategory` cards (have detail pages). Find one
    // that points at /resources/* — those are the categories.
    await page.goto("/resources");

    const internalLink = page
      .locator('.hub-card a[href^="/resources/"]')
      .first();
    await expect(internalLink).toBeVisible();
    await internalLink.click();

    await expect(page).toHaveURL(/\/resources\/[^/]+$/);
    await expect(page.locator(".project-title")).toBeVisible();
    await expect(page.locator(".resource-list li").first()).toBeVisible();
  });
});
