import BasePage from '../pages/BasePage.js';

/**
 * CheckoutPage - Page Object for SauceDemo Checkout flow
 */
export default class CheckoutPage extends BasePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);

        this.locators = {
            pageTitle: '.title',
            checkoutInfoForm: '#checkout_info_container',
            checkoutSummaryForm: '#checkout_summary_container',
            firstNameInput: '#first-name',
            lastNameInput: '#last-name',
            postalCodeInput: '#postal-code',
            continueButton: '#continue',
            finishButton: '#finish',
            cancelButton: '#cancel',
            completeHeader: '.complete-header',
            continueShoppingButton: '#continue-shopping',
            cartItemName: '.inventory_item_name',
            cartItemDescription: '.inventory_item_desc',
            cartItemPrice: '.inventory_item_price',
            cartQuantity: '.cart_quantity',
            summarySubtotal: '.summary_subtotal_label',
            summaryTax: '.summary_tax_label',
            summaryTotal: '.summary_total_label'
        };
    }

    /**
     * Fills out the checkout information form and continues
     */
    
    async verifyCheckOutInfoPageVisible() {
        try {
            await this.waitForElement(this.locators.checkoutInfoForm, 10000);
            const titleVisible = await this.isVisible(this.locators.pageTitle);
            if (titleVisible) {
                this.logger.pass('Checkout: Your Information page is visible and loaded');
                return true;
            } else {
                this.logger.fail('Checkout: Your Information page is NOT visible and loaded');
                return false;
            }
        } catch (error) {
            this.logger.fail(`Failed to view checkout info form: ${error.message}`);
            throw error;
        }
    }
    
    async fillInformation(firstName, lastName, postalCode) {
        try {
            this.logger.step(`Filling checkout information for ${firstName} ${lastName}`);
            await this.page.fill(this.locators.firstNameInput, firstName);
            await this.page.fill(this.locators.lastNameInput, lastName);
            await this.page.fill(this.locators.postalCodeInput, postalCode);
            await this.safeClick(this.locators.continueButton);
            this.logger.pass('Checkout information submitted');
        } catch (error) {
            this.logger.fail(`Failed to fill checkout info: ${error.message}`);
            throw error;
        }
    }

    async verifySummaryFormVisible(){
        try {
            await this.waitForElement(this.locators.checkoutSummaryForm, 10000);
            const titleVisible = await this.isVisible(this.locators.pageTitle);
            if (titleVisible) {
                this.logger.pass('Checkout: Overview page is visible and loaded');
                return true;
            } else {
                this.logger.fail('Checkout: Overview page is NOT visible and loaded');
                return false;
            }
        } catch (error) {
            this.logger.fail(`Failed to reach summary: ${error.message}`);
            throw error;
        }

    }

    async verifySummaryDetails(){
        try {
            await this.waitForElement(this.locators.checkoutSummaryForm, 10000);
            const titleVisible = await this.isVisible(this.locators.pageTitle);
            if (titleVisible) {
                this.logger.pass('Checkout: Overview page is visible and loaded');
                return true;
            } else {
                this.logger.fail('Checkout: Overview page is NOT visible and loaded');
                return false;
            }
        } catch (error) {
            this.logger.fail(`Failed to reach summary: ${error.message}`);
            throw error;
        }

    }



    /**
     * Completes the purchase by clicking the Finish button
     */
    async clickFinish() {
        try {
            this.logger.step('Clicking Finish button on Overview page');
            await this.safeClick(this.locators.finishButton);
            this.logger.pass('Purchase completed');
        } catch (error) {
            this.logger.fail(`Failed to finish checkout: ${error.message}`);
            throw error;
        }
    }

    /**
     * Verifies if the order was successful
     * @returns {Promise<boolean>}
     */
    async isOrderComplete() {
        const message = await this.getTextContent(this.locators.completeHeader);
        const isComplete = message === 'Thank you for your order!';
        if (isComplete) this.logger.pass('Order completion verified');
        return isComplete;
    }

    /**
     * Gets total price from the overview page
     * @returns {Promise<string>} e.g. "Total: $53.99"
     */
    async getTotalPrice() {
        return await this.getTextContent(this.locators.summaryTotal);
    }
}