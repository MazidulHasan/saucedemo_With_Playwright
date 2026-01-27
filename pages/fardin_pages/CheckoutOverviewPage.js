import BasePage from '../BasePage.js';

/**
 * CheckoutOverviewPage - Page Object for SauceDemo Shopping Checkout: Overview Page
 * Handles all interactions with the checkout overview page
 */
export default class CheckoutOverviewPage extends BasePage {
    /**
     * Constructor
     * @param {import('@playwright/test').Page} page - Playwright page object
     */
    constructor(page) {
        super(page);

        // Define locators for cart page elements
        this.locators = {
            pageTitle : '.title',
            checkoutSummaryContainer : '.checkout_summary_container',
        };
    }


    /**
     * Verify user is on Checkout: Overview page
     * @returns {Promise<boolean>} True if on cart page
     */
    async isOnCheckoutOverviewPage() {
        const url = this.getCurrentURL();
        const onCheckoutOverviewPage = url.includes('checkout-step-two.html');

        if (onCheckoutOverviewPage) {
            this.logger.pass('User is on checkout overview page');
        } else {
            this.logger.warn('User is NOT on checkout overview page');
        }

        return onCheckoutOverviewPage;
    }

    /**
     * Verify checkout overview page is visible
     * @returns {Promise<boolean>} True if checkout overview page is visible
     */
    async verifyCheckoutOverviewPageVisible() {
        try {
            this.logger.step('Verifying checkout overview page is visible');

            // Wait for checkout summary container to be visible
            await this.waitForElement(this.locators.checkoutSummaryContainer, 10000);

            // Check if title is visible
            const titleVisible = await this.isVisible(this.locators.pageTitle);
            const checkoutSummaryContainerVisible = await this.isVisible(this.locators.checkoutSummaryContainer);

            if (titleVisible && checkoutSummaryContainerVisible) {
                this.logger.pass('Checkout overview page is visible and loaded');
                return true;
            } else {
                this.logger.fail('Checkout overview page elements not visible');
                return false;
            }

        } catch (error) {
            this.logger.fail(`Failed to verify checkout overview page: ${error.message}`);
            await this.takeScreenshot(`checkout-overview-page-verification-error-${Date.now()}`);
            throw error;
        }
    }

}
