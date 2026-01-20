import { multitest, expect } from "../utils/fixtures/data.fixture.js";
import { readExcel } from "../utils/fixtures/excelReader.js";
import path from "path";

// Read Excel inside spec
const excelData = readExcel(path.join(process.cwd(), "testdata", "loginData.xlsx"), "Sheet1");

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
