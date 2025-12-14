import { test, expect } from '@playwright/test';
import { addShirt } from '../pageobjects/Addtocart';

test('Add product to cart', async ({ page }) => {
  const addproduct = new addShirt(page);

  await addproduct.openLoginPage();
  await addproduct.login('standard_user', 'secret_sauce');

  await addproduct.openPage();
  await addproduct.addToCart();
  await addproduct.openCart();

  await expect(page.locator('[data-test="inventory-item-name"]')).toContainText('Sauce Labs Bolt T-Shirt');
});
