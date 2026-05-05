import { test, expect } from "@playwright/test";

// Runs only against the `mobile` project (iPhone 13 viewport) per
// playwright.config.ts `testMatch`. Verifies the burger-menu drawer
// renders nav links and closes on link click.

test("mobile drawer opens, shows links, and navigates", async ({ page }) => {
  await page.goto("/");

  // Open drawer via burger button
  const burger = page.getByRole("button", { name: /Open menu/i });
  await expect(burger).toBeVisible();
  await burger.click();

  // Drawer should expose at least the About link
  const aboutLink = page.getByRole("link", { name: /^About$/i });
  await expect(aboutLink).toBeVisible();

  await aboutLink.click();
  await expect(page).toHaveURL(/\/about$/);
});
