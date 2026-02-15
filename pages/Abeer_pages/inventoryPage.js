export class InventoryPage{
    constructor(page){
        this.page = page;
        this.title = page.locator('//span[@class="title"]');
        this.cartLink = page.locator('//a[@class="shopping_cart_link"]')
        this.itemCard = page.locator('//div[@class="inventory_item_description"]');
        this.itemName = page.locator('//div[@class="inventory_item_name "]');
        this.priceSelector = '//div[@class="inventory_item_price"]';
    }

    async addToCart(itemLocation){
        await itemLocation.getByRole('button').click();
    }

    async goToCart(){
        await this.cartLink.click();
    }

    getTitle(){
        return this.title;
    }

    getItem(item){
        return this.itemCard.filter({ hasText: item });
    }

    getItemName(item){
        return this.itemName.filter({ hasText : item });
    }

    getItemPrice(item){
        // itemCard =  ;
        return this.getItem(item).locator(this.priceSelector).innerText();
    }

    getCartAmount(){
        return this.cartLink;
    }

}