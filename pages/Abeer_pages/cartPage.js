export class CartPage{
    constructor(page){
        this.page = page;
        this.title = page.locator('//span[@class="title"]');
        this.items = page.locator('//div[@class="cart_item_label"]');
        this.priceSelector = '//div[@class="inventory_item_price"]';
    }

    async checkout(){
        await this.page.getByRole('button', { name: 'Checkout'} ).click();
    }

    getTitle(){
        return this.title;
    }

    getItems(){
        return this.items;
    }

    getItem(item){
        return this.getItems().filter( { hasText : item } );
    }

    getItemPrice(item){
        return this.getItem(item).locator(this.priceSelector);
    }
}