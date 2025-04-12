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

test("users should be able to update the cart items", async ({ page }) => {
  await page.goto("http://localhost:1234/");
  await expect(
    page.getByRole("heading", { name: "Premium Ergonomic Office Chair" })
  ).toBeVisible();
  await expect(page.locator("#main-page-quantity-span")).toHaveText("1");
  await page.getByRole("button", { name: "Add to cart" }).click();
  await expect(page.getByRole("heading", { name: "Your Cart" })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Your Cart" }).locator("span")
  ).toHaveText("1");
  await page.getByRole("button", { name: "+" }).first().click();
  await expect(
    page.getByRole("heading", { name: "Your Cart" }).locator("span")
  ).toHaveText("2");
  await page.getByRole("button", { name: "Continue Shopping" }).click();
  await expect(page.locator("#main-page-quantity-span")).toHaveText("1");
  await page.getByRole("button", { name: "Add to cart" }).click();
  await expect(
    page.getByRole("heading", { name: "Your Cart" }).locator("span")
  ).toHaveText("3");
  await page.getByRole("button", { name: "Continue Shopping" }).click();
  await page.getByRole("button", { name: "+" }).click();
  await expect(page.locator("#main-page-quantity-span")).toHaveText("2");
  await page.getByRole("button", { name: "Add to cart" }).click();
  await expect(
    page.getByRole("heading", { name: "Your Cart" }).locator("span")
  ).toHaveText("5");
  await page.getByRole("button", { name: "×" }).click();
  await expect(page.locator("#main-page-quantity-span")).toHaveText("2");
});

test("users should be able to remove items from the cart", async ({ page }) => {
  await page.goto("http://localhost:1234/");
  await expect(
    page.getByRole("heading", { name: "Premium Ergonomic Office Chair" })
  ).toBeVisible();
  await page.getByRole("button", { name: "Add to cart" }).click();
  await expect(page.getByRole("heading", { name: "Your Cart" })).toBeVisible();
  await expect(page.getByText("1").nth(1)).toBeVisible();
  await page.locator(".trash-can-btn").click();
  page.getByRole("paragraph", {
    name: "Your cart is empty. Add some products to see them here.",
  });
  await page.getByRole("button", { name: "Continue Shopping" }).click();
});

test("users should see a popup modal when the checkout button is clicked", async ({
  page,
}) => {
  await page.goto("http://localhost:1234/");
  await expect(
    page.getByRole("heading", { name: "Premium Ergonomic Office Chair" })
  ).toBeVisible();
  await page.getByRole("button", { name: "Add to cart" }).click();
  await page.getByRole("button", { name: "Checkout" }).click();
  await expect(page.getByText("Since this is a demo project")).toBeVisible();
  await page.getByRole("button", { name: "Close" }).click();
});
