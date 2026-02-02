export class InventoryPage{
    constructor(page){
        this.page = page;
    }

    async addToCart(itemLocation){
        await itemLocation.getByRole('button').click();
    }

    async goToCart(){
        await this.page.locator('//a[@class="shopping_cart_link"]').click();
    }
}