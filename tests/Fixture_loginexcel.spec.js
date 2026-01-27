import { multitest, expect } from "../utils/excelWithMultitpleFile/multiTest.js";
import { readExcel } from "../utils/excelWithMultitpleFile/excelReader.js";
import path from "path";






// Read Excel inside spec
const excelData = readExcel(path.join(process.cwd(), "testdata", "loginData.xlsx"), "Sheet1");

// test.describe('Shopping Cart Functionality with login @smoke', () => {
// Generate tests dynamically for group 1
multitest("Test Case Number 1", excelData, async ({ page, testData }) => {

  await page.goto("https://www.saucedemo.com/");

  await page.fill("#user-name", testData.username);
  await page.fill("#password", testData.password);
  await page.click("#login-button");

  if (testData.expected === "success") {
    await expect(page).toHaveURL("/inventory.html");
  } else {
    await expect(page.locator("[data-test='error']")).toBeVisible();
  }
});

// });

