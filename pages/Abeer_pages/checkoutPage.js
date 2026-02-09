export class CheckoutPage{
    constructor(page, firstName, lastName, zip){
        this.page = page;
        this.title = page.locator('//span[@class="title"]');
        this.firstName = firstName;
        this.lastName = lastName;
        this.zip = zip;
        this.firstNameField = page.getByRole('textbox', { name: 'First Name' });
        this.lastNameField = page.getByRole('textbox', { name: 'Last Name' })
        this.zipField = page.getByRole('textbox', { name: 'Zip/Postal Code' })
        this.continueButton = page.getByRole('button', { name: 'Continue' })
    }

    async fill(){
        await this.firstNameField.fill(this.firstName);
        await this.lastNameField.fill(this.lastName);
        await this.zipField.fill(this.zip);
    }

    async checkoutOverview(){
        await this.continueButton.click();
    }

    getTitle(){
        return this.title;
    }
}