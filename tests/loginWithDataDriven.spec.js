// tests/login.spec.js
import { createDataDrivenTests, expect } from "../utils/testFactory";
import { readExcelData } from "../utils/excelReaderSeq.js";

const testData = readExcelData("./utils/loginData.xlsx");
createDataDrivenTests("Login Tests - Group 1", testData, async ({ page, testData }) => {
  // Navigate to login page
  await page.goto("https://www.saucedemo.com");
  // Fill in credentials from Excel
  await page.fill("#user-name", testData.username);
  await page.fill("#password", testData.password);
  await page.click("#login-button");
  // Assert based on expected result
  if (testData.expectedResult === "success") {
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator(".title")).toHaveText("Products");
  } else if (testData.expectedResult === "error") {
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText(
      testData.errorMessage
    );
  }
});