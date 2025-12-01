import { test as base } from '@playwright/test';
import LoginPage from '../../pages/LoginPage.js';
import DashboardPage from '../../pages/DashboardPage.js';
import CartPage from '../../pages/CartPage.js';
import excelReader from '../../utils/excelReader.js';
import logger from '../../helpers/logger.js';

/**
 * Authentication Fixture
 * Extends Playwright's base test with custom fixtures for login functionality
 * Provides loginPage, dashboardPage, cartPage, and login() method
 */

// Extend base test with custom fixtures
export const test = base.extend({
    /**
     * LoginPage fixture
     * Provides an instance of LoginPage for each test
     */
    loginPage: async ({ page }, use) => {
        logger.info('Initializing LoginPage fixture');
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    /**
     * DashboardPage fixture
     * Provides an instance of DashboardPage for each test
     */
    dashboardPage: async ({ page }, use) => {
        logger.info('Initializing DashboardPage fixture');
        const dashboardPage = new DashboardPage(page);
        await use(dashboardPage);
    },

    /**
     * CartPage fixture
     * Provides an instance of CartPage for each test
     */
    cartPage: async ({ page }, use) => {
        logger.info('Initializing CartPage fixture');
        const cartPage = new CartPage(page);
        await use(cartPage);
    },

    /**
     * Login fixture
     * Performs complete login flow using credentials from Excel
     * @param {number} credentialIndex - Index of credentials to use from Excel (default: 0)
     */
    login: async ({ page, loginPage, dashboardPage }, use) => {
        // Create a login function that can be called in tests
        const performLogin = async (credentialIndex = 0) => {
            try {
                logger.step('=== Starting Login Process ===');

                // Read credentials from Excel
                logger.step(`Reading credentials from Excel (index: ${credentialIndex})`);
                const credentials = excelReader.getLoginCredentials(credentialIndex);

                logger.info(`Using credentials: ${credentials.username} - ${credentials.description}`);

                // Navigate to login page
                await loginPage.navigateToLoginPage();

                // Perform login
                await loginPage.doLogin(credentials.username, credentials.password);

                logger.pass('=== Login Process Completed Successfully ===');

                return { loginPage, dashboardPage, credentials };

            } catch (error) {
                logger.fail(`Login fixture failed: ${error.message}`);
                throw error;
            }
        };

        // Provide the login function to tests
        await use(performLogin);
    },

    /**
     * Authenticated page fixture
     * Automatically logs in before the test and provides authenticated pages
     */
    authenticatedPage: async ({ page, loginPage, dashboardPage, cartPage }, use) => {
        try {
            logger.step('=== Auto-login for authenticated page ===');

            // Read default credentials (first row)
            const credentials = excelReader.getLoginCredentials(0);

            // Navigate and login
            await loginPage.navigateToLoginPage();
            await loginPage.doLogin(credentials.username, credentials.password);

            // Verify dashboard is visible
            await dashboardPage.verifyDashboardVisible();

            logger.pass('=== Auto-login completed ===');

            // Provide authenticated pages to test
            await use({ loginPage, dashboardPage, cartPage, page });

        } catch (error) {
            logger.fail(`Auto-login failed: ${error.message}`);
            throw error;
        }
    }
});

// Export expect from Playwright
export { expect } from '@playwright/test';
