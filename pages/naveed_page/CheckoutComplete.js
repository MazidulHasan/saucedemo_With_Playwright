import BasePage from '../BasePage.js';

export default class CheckoutOverview extends BasePage {
    constructor(page) {
        super(page);

        this.locators = {
            totalPrice: '.summary_total_label',
            finishBtn: '#finish',
            cartItem: '.cart_item',
            cartItemName: '.inventory_item_name',
            cartItemDescription: '.inventory_item_desc',
            cartItemPrice: '.inventory_item_price',
            cartQuantity: '.cart_quantity',
        };
    }

    async totalPrc(text){
        const rawPrice = await this.page.locator(this.locators.totalPrice).innerText();

        const matches = rawPrice.includes(text);

        
        if (matches) {
            this.logger.pass(`Expected Total Price: ${text}`);
        } else {
            this.logger.fail(`Total price mismatched. Expected: ${rawPrice}`);
        }

        return matches;
    }

    async clickOnFinishBtn(){
        await this.page.locator(this.locators.finishBtn).click();
    }

    async getProductDetails(productName) {
        try {
            this.logger.step(`Getting details for product "${productName}"`);

            // Find the cart item containing this product
            const cartItem = this.page.locator(this.locators.cartItem)
                .filter({ has: this.page.locator(this.locators.cartItemName, { hasText: productName }) });

            // Get product details
            const name = await cartItem.locator(this.locators.cartItemName).textContent();
            const description = await cartItem.locator(this.locators.cartItemDescription).textContent();
            const price = await cartItem.locator(this.locators.cartItemPrice).textContent();
            const quantity = await cartItem.locator(this.locators.cartQuantity).textContent();

            const details = {
                name: name?.trim(),
                description: description?.trim(),
                price: price?.trim(),
                quantity: quantity?.trim()
            };

            this.logger.pass(`Retrieved details for "${productName}"`);
            this.logger.info(`Details: ${JSON.stringify(details)}`);

            return details;

        } catch (error) {
            this.logger.fail(`Failed to get product details: ${error.message}`);
            throw error;
        }
    }
}