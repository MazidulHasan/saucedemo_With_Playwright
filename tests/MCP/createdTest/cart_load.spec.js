// spec: specs/cart-page-test-plan.md
// seed: tests/MCP/seed.spec.js

import { test, expect } from '../../fixtures/authFixture.js';

test.describe('Cart Page - Basic Operations', () => {
  test('Load Cart Page - UI Elements', async ({ authenticatedPage }) => {
    const { dashboardPage, cartPage, page } = authenticatedPage;

    // Navigate to cart page via dashboard
    await dashboardPage.clickCartIcon();

    // Verify we're on the cart page
    const onCart = await cartPage.isOnCartPage();
    expect(onCart).toBe(true);

    // Verify cart title
    const title = await cartPage.getCartPageTitle();
    expect(title).toBe('Your Cart');

    // Verify main UI elements
    await expect(page.getByText('Continue Shopping')).toBeVisible();
    await expect(page.getByText('Checkout')).toBeVisible();
    await expect(page.getByText('QTY')).toBeVisible();

    // Sanity: ensure cart list is present (may be empty)
    const itemCount = await cartPage.getCartItemCount();
    expect(typeof itemCount).toBe('number');
  });
});
