// spec: specs/cart-page-test-plan.md
// seed: tests/MCP/seed.spec.js

import { test, expect } from './fixtures/authFixture.js';

test.describe('Cart Page - Basic Operations', () => {
  test('Cart Badge and Item Count Accuracy', async ({ authenticatedPage }) => {
    const { dashboardPage, cartPage } = authenticatedPage;

    // 1. From a fresh session, add two different products to the cart (using inventory page).
    await dashboardPage.addProductToCartByName('Sauce Labs Bolt T-Shirt');
    await dashboardPage.addProductToCartByName('Sauce Labs Backpack');

    // 2. Open the cart page and verify number of item rows and cart badge value.
    const badgeMatchesTwo = await dashboardPage.verifyCartBadgeCount(2);
    expect(badgeMatchesTwo).toBe(true);

    await dashboardPage.clickCartIcon();

    // Verify two item rows present
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(2);

    // Verify both product names are present in the cart
    expect(await cartPage.isProductInCart('Sauce Labs Bolt T-Shirt')).toBe(true);
    expect(await cartPage.isProductInCart('Sauce Labs Backpack')).toBe(true);

    // 3. Remove one of the items and verify the badge and rows update correctly.
    await cartPage.removeProductFromCart('Sauce Labs Backpack');

    // Verify badge updates to 1
    const badgeMatchesOne = await dashboardPage.verifyCartBadgeCount(1);
    expect(badgeMatchesOne).toBe(true);

    // Verify only remaining item exists
    const newCount = await cartPage.getCartItemCount();
    expect(newCount).toBe(1);
    expect(await cartPage.isProductInCart('Sauce Labs Bolt T-Shirt')).toBe(true);
    expect(await cartPage.isProductInCart('Sauce Labs Backpack')).toBe(false);
  });
});
