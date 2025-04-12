import { test, expect } from "@playwright/test";

test("users should be able to favorite the current product", async ({
  page,
}) => {
  await page.goto("http://localhost:1234/");
  await expect(
    page.getByRole("button", { name: "Add to Wishlist" })
  ).toBeVisible();
  await expect(page.locator(".heart-icon")).toHaveAttribute("fill", "none");
  await page.getByRole("button", { name: "Add to Wishlist" }).click();
  await expect(page.locator(".heart-icon")).toHaveAttribute("fill", "#a40d0d");
});

test("users should be able to unfavorite the current product", async ({
  page,
}) => {
  await page.goto("http://localhost:1234/");
  await expect(
    page.getByRole("button", { name: "Add to Wishlist" })
  ).toBeVisible();
  await expect(page.locator(".heart-icon")).toHaveAttribute("fill", "none");
  await page.getByRole("button", { name: "Add to Wishlist" }).click();
  await expect(page.locator(".heart-icon")).toHaveAttribute("fill", "#a40d0d");
  await page.getByRole("button", { name: "Add to Wishlist" }).click();
  await expect(page.locator(".heart-icon")).toHaveAttribute("fill", "none");
});
