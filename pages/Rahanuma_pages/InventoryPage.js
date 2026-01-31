import { expect } from '@playwright/test';

export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.product = page.locator('.inventory_item_name', {
      hasText: 'Sauce Labs Fleece Jacket'
    });
    this.addToCartBtn = page.locator(
      '[data-test="add-to-cart-sauce-labs-fleece-jacket"]'
    );
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartIcon = page.locator('.shopping_cart_link');
  }

  async verifyProductVisible() {
    await this.product.isVisible();
  }

  async addProductToCart() {
    await this.addToCartBtn.click();
  }

  async verifyCartCount(count) {
    await expect(this.cartBadge).toHaveText(count);
  }

  async goToCart() {
    await this.cartIcon.click();
  }
}
