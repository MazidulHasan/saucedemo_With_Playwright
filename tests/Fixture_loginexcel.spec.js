import { multitest, expect } from "../utils/fixtures/data.fixture";

multitest("Test Case Number 1", async ({ page, testData }) => {

  await page.goto("https://www.saucedemo.com/");

  await page.fill("#user-name", testData.username);
  await page.fill("#password", testData.password);
  await page.click("#login-button");

  if (testData.expected === "success") {
    await expect(page).toHaveURL(/inventory.html/);
  } else {
    await expect(page.locator("[data-test='error']")).toBeVisible();
  }
});
