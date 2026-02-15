export class CheckoutCompletePage {
  constructor(page) {
    this.page = page;
    this.completeMsg = page.locator('.complete-header');
    this.backHomeBtn = page.locator('[data-test="back-to-products"]');
  }

  async verifyOrderComplete() {
    await this.completeMsg.isVisible();
  }

  async backToHome() {
    await this.backHomeBtn.click();
  }
}
