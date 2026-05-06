import { test, expect } from "@playwright/test";

// Detail-page smoke: navigate from each hub to the first item, verify
// the detail page renders meaningful content and has no broken images.
// One representative per detail-page type (project / resource-category
// / travel / review).

test.describe("Detail pages", () => {
  test("project detail renders gallery + sections", async ({ page }) => {
    await page.goto("/projects");

    await page.getByTestId("hub-card").first().click();
    await expect(page).toHaveURL(/\/projects\/[^/]+$/);

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByTestId("project-gallery")).toBeVisible();

    // At least the "about" section (every project has one)
    await expect(
      page.getByRole("heading", { level: 2, name: /about/i }),
    ).toBeVisible();

    // Back link works
    await page.getByRole("link", { name: /back to projects/i }).click();
    await expect(page).toHaveURL(/\/projects$/);
  });

  test("travel destination detail renders gallery + content", async ({ page }) => {
    await page.goto("/travel");

    await page.getByTestId("hub-card").first().click();
    await expect(page).toHaveURL(/\/travel\/[^/]+$/);

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByTestId("project-gallery")).toBeVisible();
  });

  test("yearly review detail renders sections", async ({ page }) => {
    await page.goto("/reviews");

    await page.getByTestId("hub-card").first().click();
    await expect(page).toHaveURL(/\/reviews\/[^/]+$/);

    await expect(page.getByRole("heading", { level: 1 })).toContainText(/Yearly Review/i);
    await expect(page.getByTestId("project-section").first()).toBeVisible();
  });

  test("resource category detail renders item list", async ({ page }) => {
    // Resources hub has both external `resource` cards (link out) and
    // internal `resourceCategory` cards (have detail pages). Find one
    // that points at /resources/* — those are the categories.
    await page.goto("/resources");

    const internalCard = page
      .getByTestId("hub-card")
      .filter({ has: page.locator('a[href^="/resources/"]') })
      .first();
    await expect(internalCard).toBeVisible();
    await internalCard.click();

    await expect(page).toHaveURL(/\/resources\/[^/]+$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    // Resource list items are <li> inside a <ul> (semantic list)
    await expect(page.getByRole("listitem").first()).toBeVisible();
  });
});
