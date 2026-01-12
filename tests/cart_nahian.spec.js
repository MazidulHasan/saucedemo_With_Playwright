import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js'; 
import DashboardPage from '../Nahian_pages/nahianDashboardPage.js';
import CartPage from '../pages/CartPage.js';


test.describe('POM-Task Tests', () => {

    let login;
    let dashboard;
    let cart;

    test.beforeEach(async ({page}) => {
        login = new LoginPage(page);
        dashboard = new DashboardPage(page);
        cart = new CartPage(page);
    });

    test('Navigate To Application', async() => {
        
        await login.navigateToLoginPage();
        const isLoginPageDisplayed = await login.isLoginPageDisplayed();
        expect(isLoginPageDisplayed).toBeTruthy();
    });

    test('Login to Application', async() =>{
        await login.navigateToLoginPage();
        await login.enterUsername('standard_user');
        await login.enterPassword('secret_sauce');
        await login.clickLoginButton();
        
        const isDashboardVisible = await dashboard.verifyDashboardVisible();
        expect(isDashboardVisible).toBeTruthy();

    });

    test('Verify Product Availability on Inventory Page', async() =>{
        
        await login.navigateToLoginPage();
        await login.doLogin('standard_user', 'secret_sauce');
        const isDashboardVisible = await dashboard.verifyDashboardVisible();
        if(isDashboardVisible){
            const isProductDisplayed = await dashboard.isProductDisplayed('Sauce Labs Fleece Jacket');
            expect(isProductDisplayed).toBeTruthy();
        }else{
            expect(isDashboardVisible).toBeTruthy();
        }
    });

    test('Add Product to Cart', async() =>{

        const productName = 'Sauce Labs Fleece Jacket';
        await login.navigateToLoginPage();
        await login.doLogin('standard_user', 'secret_sauce');

        await dashboard.addProductToCartByName(productName);
        const isRemoveSwitched = await dashboard.addToCartSwitchedToRemove(productName);
        expect(isRemoveSwitched).toBeTruthy();

        await dashboard.clickCartIcon();
        const isProductInCart = await cart.isProductInCart(productName);
        expect(isProductInCart).toBeTruthy();
    });

    test('Verify Cart Badge Increment', async() =>{

        const productName = 'Sauce Labs Fleece Jacket';
        await login.navigateToLoginPage();
        await login.doLogin('standard_user', 'secret_sauce');

        const before_count = await dashboard.getCartBadgeCount();
        await dashboard.addProductToCartByName(productName);
        const after_count = await dashboard.getCartBadgeCount();

        let count_bool = false;
        if((after_count - before_count) == 1) count_bool = true;
        expect(count_bool).toBeTruthy();
    });

    test('Navigate to Cart Page', async() =>{

        await login.navigateToLoginPage();
        await login.doLogin('standard_user', 'secret_sauce');

        await dashboard.clickCartIcon();
        const isCartPageVisible = await cart.verifyCartPageVisible();
        expect(isCartPageVisible).toBeTruthy();
    });

    test('Verify Product Details on Cart Page', async() =>{

        const productName = 'Sauce Labs Fleece Jacket';
        await login.navigateToLoginPage();
        await login.doLogin('standard_user', 'secret_sauce');
        const dashboardPrice = await dashboard.getProductPrice(productName);
        await dashboard.addProductToCartByName(productName);

        await dashboard.clickCartIcon();

        const cartProductDetails = await cart.getProductDetails(productName);
        expect(cartProductDetails.name).toBe(productName);
        expect(cartProductDetails.quantity).toBe('1');
        const cartProductPrice = cartProductDetails.price;
        expect(cartProductPrice).toBe(dashboardPrice)

    });

    test('Proceed to Checkout', async() =>{

        const productName = 'Sauce Labs Fleece Jacket';
        await login.navigateToLoginPage();
        await login.doLogin('standard_user', 'secret_sauce');
        const dashboardPrice = await dashboard.getProductPrice(productName);
        await dashboard.addProductToCartByName(productName);
        await dashboard.clickCartIcon();
        await cart.clickCheckout();
        

    });




});