import { defineConfig, devices } from '@playwright/test';
import { buildExcelProjects } from "./helpers/dataProjectBuilder.js";

/**
 * Playwright Configuration for SauceDemo Automation Framework
 * This configuration enables enterprise-level testing with screenshots, videos, and HTML reporting
 */
export default defineConfig({
    // Test directory
    testDir: './tests',

    // Maximum time one test can run for
    timeout: 30 * 1000,

    // Run tests in files in parallel
    fullyParallel: true,

    // Fail the build on CI if you accidentally left test.only in the source code
    forbidOnly: !!process.env.CI,

    // Retry on CI only
    retries: process.env.CI ? 2 : 0,

    // Opt out of parallel tests on CI
    workers: process.env.CI ? 1 : undefined,

    // Reporter to use
    reporter: [
        ['html', { outputFolder: 'reports', open: 'never' }],
        ['list'],
        ['json', { outputFile: 'reports/test-results.json' }]
    ],

    // Shared settings for all the projects below
    use: {
        // Base URL to use in actions like `await page.goto('/')`
        baseURL: 'https://www.saucedemo.com',

        // Collect trace when retrying the failed test
        trace: 'on-first-retry',

        // Screenshot on failure
        screenshot: 'only-on-failure',

        // Video recording for all tests
        video: 'retain-on-failure',

        // Viewport size
        viewport: { width: 1280, height: 720 },

        // Action timeout
        actionTimeout: 10 * 1000,

        // Navigation timeout
        navigationTimeout: 30 * 1000,
    },

    // Configure projects for major browsers
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                // Additional chromium-specific settings
                viewport: null,
                deviceScaleFactor: undefined,
                launchOptions: {
                    args: ['--start-maximized']
                }
            },
        },

        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },

        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },

        // Mobile viewports for responsive testing
        {
            name: 'Mobile Chrome',
            use: { ...devices['Pixel 5'] },
        },
        {
            name: 'Mobile Safari',
            use: { ...devices['iPhone 12'] },
        },
        ...buildExcelProjects()
    ],

    // Output folder for test artifacts
    outputDir: 'test-results/',
});
