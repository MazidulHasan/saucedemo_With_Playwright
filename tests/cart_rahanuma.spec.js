import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').dblclick();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').dblclick();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="primary-header"]')).toContainText('Swag Labs');
  await expect(page.locator('[data-test="item-1-title-link"] [data-test="inventory-item-name"]')).toContainText('Sauce Labs Bolt T-Shirt');
  await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.locator('[data-test="inventory-item-name"]')).toContainText('Sauce Labs Bolt T-Shirt');
  await expect(page.locator('[data-test="inventory-item-price"]')).toContainText('$15.99');
  await page.locator('[data-test="checkout"]').click();
});