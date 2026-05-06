import { test, expect } from "@playwright/test";

test.describe("About", () => {
  test("bio paragraphs, contributions bento, and hobbies render", async ({ page }) => {
    await page.goto("/about");

    await expect(page.getByRole("heading", { name: "About", level: 1 })).toBeVisible();

    // Bio: at least one paragraph rendered
    await expect(page.getByTestId("about-text").locator("p").first()).toBeVisible();

    // Profile photo loads. next/image is async — poll naturalWidth so a
    // late-arriving image fetch doesn't false-fail the test.
    const photo = page.getByTestId("about-photo").locator("img").first();
    await expect(photo).toBeVisible();
    await expect
      .poll(() => photo.evaluate((el: HTMLImageElement) => el.naturalWidth))
      .toBeGreaterThan(0);

    // Contributions bento — at least the LinkedIn slot (slot 'a')
    const linkedInSlot = page.getByTestId("bento-a");
    await expect(linkedInSlot).toBeVisible();
    await expect(linkedInSlot).toContainText("LinkedIn", { ignoreCase: true });

    // Hobbies pills — at least one
    await expect(page.getByTestId("hobby").first()).toBeVisible();
  });

  test("expand button reveals hidden bio text", async ({ page }) => {
    await page.goto("/about");

    const firstExpand = page.getByTestId("expand-toggle").first();
    await expect(firstExpand).toBeVisible();
    await firstExpand.click();

    // After clicking, the expand-content span should appear next to it
    await expect(page.getByTestId("expand-content").first()).toBeVisible();
  });
});
