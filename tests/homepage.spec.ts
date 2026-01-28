import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should display the brand name in header", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Barnes Custom Fishing" })).toBeVisible();
  });

  test("should display hero section", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("Custom Tuna Rods");
    await expect(page.getByText("Handcrafted in New Jersey")).toBeVisible();
  });

  test("should display gallery images", async ({ page }) => {
    await page.goto("/");
    // Wait for loading to complete (images appear after client-side fetch)
    const firstImage = page.locator('button:has(img)').first();
    await expect(firstImage).toBeVisible({ timeout: 10000 });
    // Should have at least 1 image (could be 6 from Instagram or 10 from fallback)
    const images = page.locator('button:has(img)');
    const count = await images.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test("should have navigation links", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Products" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Our Story" })).toBeVisible();
  });

  test("should have Instagram link", async ({ page }) => {
    await page.goto("/");
    const instagramLink = page.locator('a[href*="instagram.com/barnescustomfishing"]').first();
    await expect(instagramLink).toBeVisible();
    await expect(instagramLink).toHaveAttribute("target", "_blank");
  });

  test("should open lightbox when clicking an image", async ({ page }) => {
    await page.goto("/");

    // Wait for images to load, then click the first one
    const firstImageButton = page.locator('button:has(img)').first();
    await expect(firstImageButton).toBeVisible({ timeout: 10000 });
    await firstImageButton.click();

    // Lightbox should be visible
    const lightbox = page.locator(".fixed.inset-0");
    await expect(lightbox).toBeVisible();

    // Close button should be visible
    const closeButton = page.locator('button[aria-label="Close"]');
    await expect(closeButton).toBeVisible();

    // Click close button
    await closeButton.click();
    await expect(lightbox).not.toBeVisible();
  });

  test("should have Our Story section", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#our-story h2")).toContainText("Our Story");
  });
});
