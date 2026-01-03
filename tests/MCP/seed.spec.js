import { test, expect } from '../fixtures/authFixture.js';
import excelReader from '../../utils/excelReader.js';
import logger from '../../helpers/logger.js';

test.describe('Shopping Cart Functionality with login @smoke', () => {
    test('should display product in cart page', async ({ authenticatedPage }) => {
        const { dashboardPage, cartPage } = authenticatedPage;
        // adde the comment resolver 1

        // Get product from Excel
        const product = excelReader.getProductByName('Sauce Labs Bolt T-Shirt');

        logger.step(`Test Case: Verify "${product.productName}" in cart page`);
        // adde the comment resolver2
        
        // Add product to cart
        await dashboardPage.addProductToCartByName(product.productName);

        // Navigate to cart
        await dashboardPage.clickCartIcon();
        
    });
});
