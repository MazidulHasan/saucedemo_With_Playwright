export default class CheckoutInfo{
    constructor (page){
        this.page = page;
        this.firstName = page.locator('[data-test="firstName"]');
        this.lastName = page.locator('[data-test="lastName"]');
        this.postCode = page.locator('[data-test="postalCode"]');
        this.continueBtn = page.locator('[data-test="continue"]');
    }

    async checkOutInformation(data){
        await this.firstName.fill(data);
        await this.lastName.fill(data);
        await this.postCode.fill(data);
    }

    async clickContinueBtn(){
        await this.continueBtn.click();
    }
}