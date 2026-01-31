export class CheckoutOverviewPage {
  constructor(page) {
    this.page = page;

    this.productName = page.locator('.inventory_item_name');
    this.quantity = page.locator('.cart_quantity');
    this.itemPrice = page.locator('.inventory_item_price');

    this.itemTotal = page.locator('.summary_subtotal_label');
    this.finishBtn = page.locator('[data-test="finish"]');
  }

  async verifyProductName(name) {
    await this.productName.filter({ hasText: name }).isVisible();
  }

  async verifyQuantity(expectedQty) {
    await this.quantity.filter({ hasText: expectedQty }).isVisible();
  }

  async verifyPrice(expectedPrice) {
    await this.itemPrice.filter({ hasText: expectedPrice }).isVisible();
  }

  async verifyItemTotal(expectedTotal) {
    await this.itemTotal.filter({ hasText: expectedTotal }).isVisible();
  }

  async clickFinish() {
    await this.finishBtn.click();
  }
}
