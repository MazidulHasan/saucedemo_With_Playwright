import { multitest, expect } from "../utils/excelWithMultitpleFile/multiTest.js";
import { readExcel } from "../utils/excelWithMultitpleFile/excelReader.js";
import path from "path";






// Read Excel inside spec
const excelData = readExcel(path.join(process.cwd(), "testdata", "loginData.xlsx"), "Sheet1");

test.describe('Shopping Cart Functionality with login @smoke', () => {
// Generate tests dynamically for group 1
multitest("Test Case Number 1", excelData, async ({ page, testData }) => {

  await page.goto("https://www.saucedemo.com/");

  await page.fill("#user-name", testData.username);
  await page.fill("#password", testData.password);
  await page.click("#login-button");

  if (testData.expected === "success") {
    await expect(page).toHaveURL("/inventory.html");
  } else {
    await expect(page.locator("[data-test='error']")).toBeVisible();
  }
});

});



















import { test } from './fixtures/authFixture.js';
import excelReader from '../utils/excelReader.js';
import logger from '../helpers/logger.js';

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
});
