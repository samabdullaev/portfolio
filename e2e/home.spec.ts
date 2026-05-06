import { test, expect } from "@playwright/test";

test.describe("Home", () => {
  test("renders hero with name, profile photo, and primary actions", async ({ page }) => {
    await page.goto("/");

    // Page-level identity
    await expect(page).toHaveTitle(/Sam Abdullaev/);

    // Hero name visible (heading)
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Profile photo loads (not a broken/empty image). next/image is async
    // — poll naturalWidth so a late-arriving fetch doesn't false-fail.
    const photo = page.getByTestId("hero-photo").locator("img").first();
    await expect(photo).toBeVisible();
    await expect
      .poll(() => photo.evaluate((el: HTMLImageElement) => el.naturalWidth))
      .toBeGreaterThan(0);

    // At least one social tile rendered
    await expect(page.getByTestId("hero-socials").locator("a").first()).toBeVisible();

    // Resume download link or CTA present
    const actions = page.getByTestId("hero-actions").locator("a");
    await expect(actions.first()).toBeVisible();
  });
});
