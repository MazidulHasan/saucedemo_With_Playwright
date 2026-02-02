export class CheckoutPage{
    constructor(page, firstName, lastName, zip){
        this.page = page;
        this.firstName = firstName;
        this.lastName = lastName;
        this.zip = zip;
    }

    async fill(){
        await this.page.getByRole('textbox', { name: 'First Name' }).fill(this.firstName);
        await this.page.getByRole('textbox', { name: 'Last Name' }).fill(this.lastName);
        await this.page.getByRole('textbox', { name: 'Zip/Postal Code' }).fill(this.zip);
    }

    async checkoutOverview(){
        await this.page.getByRole('button', { name: 'Continue' }).click();
    }
}