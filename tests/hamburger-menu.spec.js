import { test, expect } from "@playwright/test";

test("users should be able to open and close the hamburger menu", async ({
  page,
}) => {
  await page.setViewportSize({
    width: 640,
    height: 480,
  });
  await page.goto("http://localhost:1234/");
  const hamburgerBtn = page.locator(".hamburger-btn");
  await expect(hamburgerBtn).toBeVisible();
  await hamburgerBtn.click();
  const closeBtn = page.locator(".mobile-nav .close-btn");
  await expect(closeBtn).toBeVisible();
  await closeBtn.click();
});
