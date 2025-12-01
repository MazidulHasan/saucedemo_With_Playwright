import { test, expect } from './fixtures/authFixture.js';
import excelReader from '../utils/excelReader.js';
import logger from '../helpers/logger.js';

test.describe('Shopping Cart Functionality @smoke', () => {

    test('should add product to cart and verify badge count', async ({ authenticatedPage }) => {
        const { dashboardPage } = authenticatedPage;

        // Get product from Excel
        const product = excelReader.getProductByName('Sauce Labs Bolt T-Shirt');
        expect(product).not.toBeNull();

        logger.step(`Test Case: Add "${product.productName}" to cart`);

        // Verify we are on dashboard
        await expect(dashboardPage.page).toHaveURL(/inventory\.html/);

        // Add product to cart
        await dashboardPage.addProductToCartByName(product.productName);

        // Verify badge count is 1
        const countMatches = await dashboardPage.verifyCartBadgeCount(1);
        expect(countMatches).toBe(true);
    });

    test('should display product in cart page', async ({ authenticatedPage }) => {
        const { dashboardPage, cartPage } = authenticatedPage;

        // Get product from Excel
        const product = excelReader.getProductByName('Sauce Labs Bolt T-Shirt');

        logger.step(`Test Case: Verify "${product.productName}" in cart page`);

        // Add product to cart
        await dashboardPage.addProductToCartByName(product.productName);

        // Navigate to cart
        await dashboardPage.clickCartIcon();

        // Verify we are on cart page
        const onCartPage = await cartPage.isOnCartPage();
        expect(onCartPage).toBe(true);

        // Verify page title
        const title = await cartPage.getCartPageTitle();
        expect(title).toBe('Your Cart');

        // Verify product is in cart
        const isProductInCart = await cartPage.isProductInCart(product.productName);
        expect(isProductInCart).toBe(true);

        // Verify product details
        const details = await cartPage.getProductDetails(product.productName);
        expect(details.price).toBe(product.price);
    });

    test('should add multiple products to cart', async ({ authenticatedPage }) => {
        const { dashboardPage, cartPage } = authenticatedPage;

        // Get products from Excel
        const product1 = excelReader.getProductByName('Sauce Labs Bolt T-Shirt');
        const product2 = excelReader.getProductByName('Sauce Labs Backpack');

        logger.step('Test Case: Add multiple products to cart');

        // Add products
        await dashboardPage.addProductToCartByName(product1.productName);
        await dashboardPage.addProductToCartByName(product2.productName);

        // Verify badge count is 2
        await dashboardPage.verifyCartBadgeCount(2);

        // Navigate to cart
        await dashboardPage.clickCartIcon();

        // Verify both products in cart
        expect(await cartPage.isProductInCart(product1.productName)).toBe(true);
        expect(await cartPage.isProductInCart(product2.productName)).toBe(true);

        // Verify total count
        const count = await cartPage.getCartItemCount();
        expect(count).toBe(2);
    });
});
