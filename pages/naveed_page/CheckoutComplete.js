import { expect } from '@playwright/test';

export default class CheckoutComplete{
    constructor (page){
        this.page = page;
        this.thankYou = page.locator('[data-test="complete-header"]');
        this.icon = page.locator('[data-test="pony-express"]');
        this.backBtn = page.locator('[data-test="back-to-products"]');
       
    }

    async checkoutCompletePage(th_text){
        await expect(this.thankYou).toContainText(th_text);
        await expect(this.icon).toBeVisible();
        await this.backBtn.click();
    }
}