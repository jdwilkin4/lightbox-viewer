import { test, expect } from "@playwright/test";

test("users should be able to navigate between product tabs", async ({
  page,
}) => {
  await page.goto("http://localhost:1234/");
  await expect(
    page.getByRole("tablist", { name: "Product Tabs" })
  ).toBeVisible();
  await expect(page.getByRole("tab", { name: "Description" })).toBeVisible();
  const sectionOneParagraphs = page.locator("#section-1 p");
  await expect(sectionOneParagraphs.nth(0)).toContainText(
    "Experience unparalleled comfort"
  );
  await expect(sectionOneParagraphs.nth(1)).toContainText(
    "The premium materials ensure durability"
  );
  await page.getByRole("tab", { name: "Specifications" }).click();
  const listItem1 = page.locator(
    ".spec-list li:nth-child(1) span:nth-child(1)"
  );
  const listItem2 = page.locator(
    ".spec-list li:nth-child(2) span:nth-child(1)"
  );
  await expect(listItem1).toContainText("Material");
  await expect(listItem2).toContainText("Dimensions");
  await page.getByRole("tab", { name: "Reviews" }).click();

  const review = page.locator(
    "#section-3 .review-container:nth-child(1) .review"
  );
  await expect(review).toContainText("This chair has completely");
});
