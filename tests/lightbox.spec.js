import { test, expect } from "@playwright/test";

test("users should be able to click on the featured image to open the lightbox", async ({
  page,
}) => {
  await page.goto("http://localhost:1234/");
  const firstOfficeChairImg = page.locator("#office-chair-1");
  await expect(firstOfficeChairImg).toBeVisible();
  await firstOfficeChairImg.click();
  page.locator("div").filter({ hasText: "× ⇦ ⇨" }).getByRole("img");
  await page.getByRole("button", { name: "×" }).click();
});

test("users should be able to open the lightbox and cycle through the different images", async ({
  page,
}) => {
  await page.goto("http://localhost:1234/");
  const firstOfficeChairImg = page.locator("#office-chair-1");
  await expect(firstOfficeChairImg).toBeVisible();
  await firstOfficeChairImg.click();
  await page
    .locator("div")
    .filter({ hasText: "× ⇦ ⇨" })
    .getByRole("img")
    .click();
  await page.getByRole("button", { name: "⇨" }).click();
  await page
    .locator("div")
    .filter({ hasText: "× ⇦ ⇨" })
    .getByRole("img")
    .click();
  await page.getByRole("button", { name: "⇨" }).click();
  await page
    .locator("div")
    .filter({ hasText: "× ⇦ ⇨" })
    .getByRole("img")
    .click();
  await page.getByRole("button", { name: "⇦" }).click();
  await page
    .locator("div")
    .filter({ hasText: "× ⇦ ⇨" })
    .getByRole("img")
    .click();
  await page.getByRole("button", { name: "×" }).click();
});
