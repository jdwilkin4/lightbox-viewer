import { test, expect } from "@playwright/test";

test("users should be able to open and close the cart", async ({ page }) => {
  await page.goto("http://localhost:1234/");
  await expect(
    page.getByRole("heading", { name: "Premium Ergonomic Office Chair" })
  ).toBeVisible();
  await page.locator(".cart-icon").click();
  page.getByRole("paragraph", {
    name: "Your cart is empty. Add some products to see them here.",
  });
  await page.getByRole("button", { name: "×" }).click();
  await expect(
    page.getByRole("heading", { name: "Premium Ergonomic Office Chair" })
  ).toBeVisible();
  await page.locator(".cart-icon").click();
  page.getByRole("paragraph", {
    name: "Your cart is empty. Add some products to see them here.",
  });
  await page.getByRole("button", { name: "Continue Shopping" }).click();
  await expect(
    page.getByRole("heading", { name: "Premium Ergonomic Office Chair" })
  ).toBeVisible();
});

test("users should be able to add an item to the cart", async ({ page }) => {
  await page.goto("http://localhost:1234/");
  await expect(
    page.getByRole("heading", { name: "Premium Ergonomic Office Chair" })
  ).toBeVisible();
  await page.locator("#cart-icon").click();
  await expect(page.getByText("Your cart is empty. Add some")).toBeVisible();
  await page.getByRole("button", { name: "Continue Shopping" }).click();
  await expect(page.getByRole("main").getByText("- 1 +")).toBeVisible();
  await page.getByRole("button", { name: "Add to cart" }).click();
  await expect(page.getByRole("heading", { name: "Your Cart" })).toBeVisible();
  await expect(page.getByText("$299").first()).toBeVisible();
  await page.getByRole("button", { name: "Continue Shopping" }).click();
  await expect(
    page.getByRole("heading", { name: "Premium Ergonomic Office Chair" })
  ).toBeVisible();
});

test("users should be able to update the cart items", async ({ page }) => {});

test("users should be able to remove items from the cart", async ({
  page,
}) => {});

test("users should see a popup modal when the checkout button is clicked", async ({
  page,
}) => {});
