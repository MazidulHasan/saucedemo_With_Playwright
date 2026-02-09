export class OverviewPage{
    constructor(page){
        this.page = page;
        this.finishButton = page.getByRole('button', { name: 'Finish' });
        this.items = page.locator('//div[@class="cart_item"]');
        this.priceSelector = '//div[@class="inventory_item_price"]';
    }

    async finishCheckout(){
        await this.finishButton.click();
    }

    getItems(){
        return this.items;
    }

    getItem(item){
        return this.getItems().filter({ hasText: item });
    }

    getItemPrice(item){
        return this.getItem(item).locator(this.priceSelector);
    }

    getSubTotal(){
        return this.page.locator('//div[@class="summary_subtotal_label"]').innerText();
    }
}