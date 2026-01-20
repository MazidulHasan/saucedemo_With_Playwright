import { test as base, expect } from "@playwright/test";

/**
 * multitest: generates multiple tests from Excel data
 * @param {string} title - group title, e.g., "Test Case Number 1"
 * @param {Array} testDataArray - array of data objects
 * @param {Function} fn - test function: ({ page, testData }) => {}
 */
export const multitest = (title, testDataArray, fn) => {
  const group = title.match(/\d+/)[0]; // "Test Case Number 1" → 1

  testDataArray.forEach((row) => {
    const currentCase = row.caseNo.toString();

    // Only run rows that belong to this group
    if (!currentCase.startsWith(group)) return;

    base(`${title} - ${currentCase}`, async ({ page }) => {
      await fn({ page, testData: row });
    });
  });
};

export { expect };
