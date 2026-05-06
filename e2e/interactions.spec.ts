import { test, expect } from "@playwright/test";

test.describe("Theme toggle", () => {
  test("toggles between light and dark and persists across reload", async ({
    page,
  }) => {
    await page.goto("/");

    const html = page.locator("html");
    const initial = await html.getAttribute("data-theme");

    await page.getByRole("button", { name: /Toggle dark mode/i }).click();
    const toggled = await html.getAttribute("data-theme");
    expect(toggled).not.toBe(initial);

    // Reload — preference must survive (localStorage)
    await page.reload();
    const afterReload = await page.locator("html").getAttribute("data-theme");
    expect(afterReload).toBe(toggled);
  });
});

test.describe("MediaModal", () => {
  test("opens on certificate click and closes on Esc", async ({ page }) => {
    await page.goto("/certificates");

    // Click the first certificate card to open the MediaModal
    await page.getByTestId("hub-card").first().click();

    // Modal opens (role=dialog, aria-modal)
    const modal = page.getByRole("dialog");
    await expect(modal).toBeVisible();

    // Esc closes the modal
    await page.keyboard.press("Escape");
    await expect(modal).toBeHidden();
  });
});
