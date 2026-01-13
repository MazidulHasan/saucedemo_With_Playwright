import { expect } from '@playwright/test';

export default class CheckoutComplete{
    constructor (page){
        this.page = page;
        this.thankYouMsg = page.locator('[data-test="complete-header"]');
        this.icon = page.locator('[data-test="pony-express"]');
        this.backBtn = page.locator('[data-test="back-to-products"]');
       
    }

    async checkoutCompletePage(success_Text){
        await expect(this.thankYouMsg).toContainText(success_Text);
        await expect(this.icon).toBeVisible();
        await this.backBtn.click();
    }
}