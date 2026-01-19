import { test as base, expect } from "@playwright/test";

export const multitest = (title, fn) => {

  base(title, async ({ testData, ...fixtures }) => {

    // Extract group number from title
    // "Test Case Number 1" → 1
    const group = title.match(/\d+/)[0];
    const currentCase = testData.caseNo.toString();

    // Only run if:
    // 1     → 1
    // 1.1   → 1
    // 1.2   → 1
    if (!currentCase.startsWith(group)) {
      base.skip(true, `Skipping case ${currentCase}, not in group ${group}`);
    }

    await fn({ testData, ...fixtures });
  });
};

export { expect };
