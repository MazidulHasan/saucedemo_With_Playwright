import { test, expect } from '../fixtures/authFixture.js';
import excelReader from '../../utils/excelReader.js';
import logger from '../../helpers/logger.js';
import BasePage from '../../pages/BasePage.js';
import LoginPage from '../../pages/LoginPage.js';
import DashboardPage from '../../pages/DashboardPage.js';
import CartPage from '../../pages/CartPage.js';

test.describe('Complete Order and Verfiy Workflow', () => {
    test('should complete an order and verify', async ({ page }) => {

        const login = new LoginPage(page);
        // Step 1 : Navigate to the application
        // const url = 'https://www.saucedemo.com/';
        // goto the website using the url
        // await page.goto(url);
        // goto(url);
        await login.navigateToLoginPage();

        // Expect : Login Page is Displayed
        // const title = 'Swag Labs';
        // Expect a title "to contain" a string.
        // await expect(page.getByText(title)).toBeVisible();
        const isLoginPageDisplayed = await login.isLoginPageDisplayed();
        expect(isLoginPageDisplayed).toBeTruthy();


        // Step 2 : Login to application
        const username = 'standard_user';
        const password = 'secret_sauce';

        // Enter a valid user name
        await login.enterUsername(username);
        //await page.getByPlaceholder('Username').fill(username);

        // Enter a valid password
        //await page.getByPlaceholder('Password').fill(password);
        await login.enterPassword(password);

        // Click the Login button.
        // await page.getByRole('button', { name: 'Login' }).click();
        await login.clickLoginButton();


        // login.doLogin(username, password);

        // Expect : User redirected to inventory (dashboard) page
        // Assert that the "Products" title is visible to confirm successful login
        // await expect(page.locator('span', { hasText: 'Products' })).toBeVisible();
        const dashboardPage = new DashboardPage(page);
        const isDashboardVisible = await dashboardPage.verifyDashboardVisible();
        expect(isDashboardVisible).toBeTruthy();
        
        const isOnDashboard = await dashboardPage.isOnDashboard();
        expect(isOnDashboard).toBeTruthy();


        // Step 3 : verify product availability on inventory page

        // Verify products are displayed
        const productCount = await dashboardPage.getProductCount();
        expect(productCount).toBeGreaterThan(0);
        
        // Expect : Product is visible in the product list
        // dashboard.isProductDisplayed(productName);
        
        const productName = "Sauce Labs Fleece Jacket";
        const isProductDisplayed = await dashboardPage.isProductDisplayed(productName);
        expect(isProductDisplayed).toBeTruthy();


        // locate the product
        // -->> for this task item "Sauce Labs Fleece Jacket" 
        //const itemName = 'Sauce Labs Backpack';
        // const item = page.locator('.inventory_item_description').filter({
        //     has: page.locator('.inventory_item_name', { hasText: itemName })
        // });

        const previousCartBadgeCount =  await dashboardPage.getCartBadgeCount();
        // step 4 : add product to cart
        // await item.getByRole('button', { name: 'Add to cart' }).click();
        await dashboardPage.addProductToCartByName(productName);

        // Expect : Button changes to remove

        // Expect : product is added to the cart
        
        // Step 5 : verify cart badge increment
        const isBadgeCountExpected = await dashboardPage.verifyCartBadgeCount(previousCartBadgeCount + 1);
        // expect : cart badge count increase to 1
        // await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
        expect(isBadgeCountExpected).toBeTruthy();


        // const cartItem = page.locator('.cart_item').filter({
        //     has: page.locator('.inventory_item_name', { hasText: itemName })
        // });

        // Step 6 : Navigate to cart page 
        // click on the cart icon
        await dashboardPage.clickCartIcon();

        // expect : user is redirected to cart page
        const cartPage = new CartPage(page);
        const isOnCartPage = await cartPage.isOnCartPage();
        expect(isOnCartPage).toBeTruthy();

        // Step 7 : verify product details on cart page
        const isCartPageVisible = await cartPage.verifyCartPageVisible();
        expect(isCartPageVisible).toBeTruthy();

        const isCartNotEmpty = await cartPage.getCartItemCount();
        expect(isCartNotEmpty).toBeTruthy();
        
        const isProductInCart = await cartPage.isProductInCart(productName);
        expect(isProductInCart).toBeTruthy();

        // verify product name : Sauce Labs Fleece Jacket
        // verify quantity 1
        // ** verify product price matches inventory page

        const productDetails = await cartPage.getProductDetails(productName);
        console.log(productDetails.name);
        console.log(productDetails.price);
        console.log(productDetails.quantity);


        // Expect : correct product details are displayed

        // Step 8 : Proceed to checkout
        // click checkout button
        await cartPage.clickCheckout();

        // Expect : User is redirected to Checkout: Your Information page

        // Step 9 : fill checkout information

        // enter first name -- dummy data
        // enter last name -- dummy data
        // enter postal code -- dummy data

        // click Continue

        // Expect : User is redirected to Checkout: Overview page

        // Step 10 : verify checkout overview details

        // verify product name
        // verify quantity and price
        // verify item total is correct

        // Expect all checkout details are correct

        // Step 11 : complete the order
        // click finish button

        // Expect : User is redirected to Checkout Complete page

        // Step 12 : verify order completion page

        // verify confirmation message (e.g., “Thank you for your order!”)

        // verify order confirmation icon/image is displayed

        // Expect : Order is successfully completed

        // Step 13 : Navigate back to dashboard

        // click Back to Home button

        // Expect : User is redirected to inventory (Dashboard) page

        // Post conditions
        // Cart is cleared
        // user is on inventory page
    });


});
