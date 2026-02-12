// utils/testFactory.js
import { test as base, expect } from "@playwright/test";

/**
 * Creates multiple Playwright tests from Excel data
 * @param {string} groupTitle - Test group name, e.g., "Login Tests - Group 1"
 * @param {Array} testDataArray - Array of test data from Excel
 * @param {Function} testFunction - The test implementation
 */
export const createDataDrivenTests = (groupTitle, testDataArray, testFunction) => {
  // Extract the group number from title
  // "Login Tests - Group 1" → "1"
  const groupMatch = groupTitle.match(/\d+/);
  
  if (!groupMatch) {
    throw new Error(`Group title must contain a number: "${groupTitle}"`);
  }
  
  const groupNumber = groupMatch[0];
  testDataArray.forEach((rowData) => {
    const currentCaseNumber = rowData.caseNo.toString();
    // Filter: only run test cases belonging to this group
    if (!currentCaseNumber.startsWith(groupNumber)) {
      return;
    }
    // Create a Playwright test for each matching row
    base(`${groupTitle} - Case ${currentCaseNumber}`, async ({ page }) => {
      await testFunction({ page, testData: rowData });
    });
  });
};
export { expect };