import BasePage from '../BasePage.js';

/**
 * CheckoutPage - Page Object for SauceDemo Shopping Checkout Page
 * Handles all interactions with the shopping checkout page
 */
export default class CheckoutPage extends BasePage {
    /**
     * Constructor
     * @param {import('@playwright/test').Page} page - Playwright page object
     */
    constructor(page) {
        super(page);

        // Define locators for cart page elements
        this.locators = {
            pageTitle: '.title',
            firstNameInput : '#first-name',
            lastNameInput : '#last-name',
            postalCodeInput : '#postal-code',
            cancelButton : '#cancel',
            continueButton : '#continue',
            checkoutContainerInfo : '.checkout_info_container'
        };
    }


    /**
     * Verify user is on checkout page
     * @returns {Promise<boolean>} True if on cart page
     */
    async isOnCheckoutPage() {
        const url = this.getCurrentURL();
        const onCheckoutPage = url.includes('checkout-step-one.html');

        if (onCheckoutPage) {
            this.logger.pass('User is on checkout page');
        } else {
            this.logger.warn('User is NOT on checkout page');
        }

        return onCheckoutPage;
    }

    /**
     * Verify checkout page is visible
     * @returns {Promise<boolean>} True if cart page is visible
     */
    async verifyCheckoutPageVisible() {
        try {
            this.logger.step('Verifying checkout page is visible');

            // Wait for checkout list to be visible
            await this.waitForElement(this.locators.checkoutContainerInfo, 10000);

            // Check if title is visible
            const titleVisible = await this.isVisible(this.locators.pageTitle);
            const checkoutContainerInfoVisible = await this.isVisible(this.locators.checkoutContainerInfo);

            if (titleVisible && checkoutContainerInfoVisible) {
                this.logger.pass('Checkout page is visible and loaded');
                return true;
            } else {
                this.logger.fail('Checkout page elements not visible');
                return false;
            }

        } catch (error) {
            this.logger.fail(`Failed to verify checkout page: ${error.message}`);
            await this.takeScreenshot(`checkout-page-verification-error-${Date.now()}`);
            throw error;
        }
    }

    /**
     * Get checkout page title
     * @returns {Promise<string>} Checkout page title
     */
    async getCheckoutPageTitle() {
        try {
            const title = await this.getTextContent(this.locators.pageTitle);
            this.logger.info(`Checkout page title: ${title}`);
            return title;
        } catch (error) {
            this.logger.fail(`Failed to get checkout page title: ${error.message}`);
            throw error;
        }
    }

    /**
     * Enter firstname
     * @param {string} firstName - Username to enter
     */
    async enterFirstName(firstName) {
        await this.safeFill(this.locators.firstNameInput, firstName);
    }

    /**
     * Enter lastname
     * @param {string} lastName - Username to enter
     */
    async enterFirstName(lastName) {
        await this.safeFill(this.locators.lastNameInput, lastName);
    }

    /**
     * Enter postalcode
     * @param {string} postalCode - Username to enter
     */
    async enterFirstName(postalCode) {
        await this.safeFill(this.locators.postalCodeInput, postalCode);
    }

    /**
     * Click continue button
     */
    async clickContinueButton() {
        try {
            this.logger.step('Clicking continue button');
            await this.safeClick(this.locators.continueButton);
            this.logger.pass('Navigated to checkout overview page');
        } catch (error) {
            this.logger.fail(`Failed to click continue: ${error.message}`);
            throw error;
        }
    }


    /**
     * Click cancel button
     */
    async clickCancelButton() {
        try {
            this.logger.step('Clicking cancel button');
            await this.safeClick(this.locators.cancelButton);
            this.logger.pass('Navigated back to cart page');
        } catch (error) {
            this.logger.fail(`Failed to click cancel shopping: ${error.message}`);
            throw error;
        }
    }
    // TODO : Should a clear info method be implemented?
    // TODO : FIllCHECKOUTINFO method could be implemented for a more robust implementation
    //        AND IF NEEDED ACCORDING TO TASK


}
