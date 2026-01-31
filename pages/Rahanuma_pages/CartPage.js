export class CartPage {
  constructor(page) {
    this.page = page;
    this.productName = page.locator('.inventory_item_name');
    this.quantity = page.locator('.cart_quantity');
    this.checkoutBtn = page.locator('[data-test="checkout"]');
  }

  async verifyProduct(name) {
    await this.productName.filter({ hasText: name }).isVisible();
  }

  async verifyQuantity(qty) {
    await this.quantity.filter({ hasText: qty }).isVisible();
  }

  async checkout() {
    await this.checkoutBtn.click();
  }
}
