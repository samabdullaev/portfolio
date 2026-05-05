import { test, expect } from "@playwright/test";

test.describe("About", () => {
  test("bio paragraphs, contributions bento, and hobbies render", async ({ page }) => {
    await page.goto("/about");

    await expect(page.getByRole("heading", { name: "About", level: 1 })).toBeVisible();

    // Bio: at least one paragraph rendered
    await expect(page.locator(".about-text").locator("p").first()).toBeVisible();

    // Profile photo loads
    const photo = page.locator(".about-photo img").first();
    await expect(photo).toBeVisible();
    expect(await photo.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBeGreaterThan(0);

    // Contributions bento — at least the LinkedIn slot (slot 'a')
    await expect(page.locator(".bento-c-a")).toBeVisible();
    await expect(page.locator(".bento-c-a")).toContainText("LinkedIn", { ignoreCase: true });

    // Hobbies pills — at least one
    await expect(page.locator(".hobby-pill").first()).toBeVisible();
  });

  test("expand button reveals hidden bio text", async ({ page }) => {
    await page.goto("/about");

    const firstExpand = page.locator(".expand-btn").first();
    await expect(firstExpand).toBeVisible();
    await firstExpand.click();

    // After clicking, the expand-content span should appear next to it
    await expect(page.locator(".expand-content").first()).toBeVisible();
  });
});
