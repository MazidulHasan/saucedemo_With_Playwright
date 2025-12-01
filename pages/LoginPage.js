import BasePage from './BasePage.js';

/**
 * LoginPage - Page Object for SauceDemo Login Page
 * Handles all interactions with the login page
 */
export default class LoginPage extends BasePage {
    /**
     * Constructor
     * @param {import('@playwright/test').Page} page - Playwright page object
     */
    constructor(page) {
        super(page);

        // Define locators for login page elements
        this.locators = {
            usernameInput: '#user-name',
            passwordInput: '#password',
            loginButton: '#login-button',
            errorMessage: '[data-test="error"]',
            errorButton: '.error-button',
            loginLogo: '.login_logo',
            botImage: '.bot_column'
        };
    }

    /**
     * Navigate to login page
     */
    async navigateToLoginPage() {
        await this.goto('/');
        await this.waitForElement(this.locators.loginLogo);
        this.logger.pass('Login page loaded successfully');
    }

    /**
     * Enter username
     * @param {string} username - Username to enter
     */
    async enterUsername(username) {
        await this.safeFill(this.locators.usernameInput, username);
    }

    /**
     * Enter password
     * @param {string} password - Password to enter
     */
    async enterPassword(password) {
        // Mask password in logs for security
        this.logger.step('Entering password');
        await this.page.locator(this.locators.passwordInput).fill(password);
        this.logger.pass('Password entered');
    }

    /**
     * Click login button
     */
    async clickLoginButton() {
        await this.safeClick(this.locators.loginButton);
    }

    /**
     * Perform complete login action
     * @param {string} username - Username
     * @param {string} password - Password
     */
    async doLogin(username, password) {
        this.logger.step(`Attempting login with username: ${username}`);

        try {
            await this.enterUsername(username);
            await this.enterPassword(password);
            await this.clickLoginButton();

            // Wait a moment for navigation or error message
            await this.page.waitForTimeout(1000);

            // Check if login was successful (no error message)
            const errorVisible = await this.isVisible(this.locators.errorMessage);

            if (errorVisible) {
                const errorText = await this.getTextContent(this.locators.errorMessage);
                this.logger.fail(`Login failed with error: ${errorText}`);
                throw new Error(`Login failed: ${errorText}`);
            } else {
                this.logger.pass(`Login successful for user: ${username}`);
            }

        } catch (error) {
            this.logger.fail(`Login process failed: ${error.message}`);
            await this.takeScreenshot(`login-failure-${username}-${Date.now()}`);
            throw error;
        }
    }

    /**
     * Get error message text
     * @returns {Promise<string>} Error message text
     */
    async getErrorMessage() {
        if (await this.isVisible(this.locators.errorMessage)) {
            return await this.getTextContent(this.locators.errorMessage);
        }
        return '';
    }

    /**
     * Check if error message is displayed
     * @returns {Promise<boolean>} True if error is visible
     */
    async isErrorDisplayed() {
        return await this.isVisible(this.locators.errorMessage);
    }

    /**
     * Clear login form
     */
    async clearLoginForm() {
        this.logger.step('Clearing login form');
        await this.page.locator(this.locators.usernameInput).clear();
        await this.page.locator(this.locators.passwordInput).clear();
        this.logger.pass('Login form cleared');
    }

    /**
     * Verify login page is displayed
     * @returns {Promise<boolean>} True if login page is displayed
     */
    async isLoginPageDisplayed() {
        const logoVisible = await this.isVisible(this.locators.loginLogo);
        const loginButtonVisible = await this.isVisible(this.locators.loginButton);
        return logoVisible && loginButtonVisible;
    }
}
