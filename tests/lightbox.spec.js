import { test, expect } from "@playwright/test";

// TODO: finish lightbox tests. Needs to test for specific changes in the images.

test("users should be able to click on the featured image to open the lightbox", async ({
  page,
}) => {
  await page.goto("http://localhost:1234/");
  await page.locator("#office-chair-1").click();
  page.locator("div").filter({ hasText: "× ⇦ ⇨" }).getByRole("img");
  await page.getByRole("button", { name: "×" }).click();
});

test("users should be able to open the lightbox and cycle through the different images", async ({
  page,
}) => {
  await page.goto("http://localhost:1234/");
  await page.locator("#office-chair-1").click();
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
