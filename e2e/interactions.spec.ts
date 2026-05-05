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
  test("opens on certificate click, navigates with arrow, closes on Esc", async ({
    page,
  }) => {
    await page.goto("/certificates");

    // Click the first certificate card to open the MediaModal
    const firstCert = page.locator(".hub-card").first();
    await expect(firstCert).toBeVisible();
    await firstCert.click();

    // Modal surface visible
    const modal = page.locator(".modal-root");
    await expect(modal).toBeVisible();

    // Title bar shows the cert title (counter present too)
    await expect(modal.locator(".modal-topbar")).toBeVisible();

    // Arrow nav (desktop): if more than one cert, next button advances index.
    // The desktop counter span is the one visible on this 1280x720 viewport.
    const next = modal.locator(".media-modal-nav.next");
    const counter = modal.locator(".modal-topbar-counter.desktop-only");
    if (await next.count()) {
      const initialCounter = await counter.innerText();
      await next.click();
      await expect(counter).not.toHaveText(initialCounter);
    }

    // Esc closes the modal
    await page.keyboard.press("Escape");
    await expect(modal).toBeHidden();
  });
});
