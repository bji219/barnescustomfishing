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

  test("should display all gallery images", async ({ page }) => {
    await page.goto("/");
    const images = page.locator('img[alt="Custom fishing rod"]');
    await expect(images).toHaveCount(10);
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

    // Click the first image
    await page.locator('button:has(img[alt="Custom fishing rod"])').first().click();

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
