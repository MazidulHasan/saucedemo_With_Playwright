import { test, expect } from '@playwright/test';
import excelReader from '../utils/excelReader.js';
import LoginPage from '../pages/LoginPage.js'; 
import DashboardPage from '../pages/DashboardPage.js';
import CartPage from '../pages/CartPage.js';
import CheckoutInfo from '../pages/naveed_page/CheckoutInfo.js';
import CheckoutOverview from '../pages/naveed_page/CheckoutOverview.js';
import CheckoutComplete from '../pages/naveed_page/CheckoutComplete.js';


test('Product Order', async({page}) => {
    const login = new LoginPage(page);
    const dashBoadrd = new DashboardPage(page);
    const cartPg = new CartPage(page);
    const checkOutIn = new CheckoutInfo(page);
    const checkOutOver = new CheckoutOverview(page);
    const checkOutComp = new CheckoutComplete(page);
    const removeBtn = page.locator('[data-test="remove-sauce-labs-fleece-jacket"]');


    const loginData = excelReader.getLoginCredentials(0);
    const { username, password } = loginData;

    const productData = excelReader.getProductByIndex(3);
    const product = productData.productName;

    const data = "Dummy Data"
    const text = "Total: $53.99"
    const th_text = "Thank you for your order!";

    //Log in
    await login.navigateToLoginPage();
    await login.doLogin(username, password);
    await dashBoadrd.isOnDashboard();

    // Dashboard Page & add to cart
    await dashBoadrd.isProductDisplayed(product);
    await dashBoadrd.addProductToCartByName(product);
    await expect(removeBtn).toContainText('Remove');
    await dashBoadrd.verifyCartBadgeCount(1);
    await dashBoadrd.clickCartIcon();

    //Cart Page & checkout
    await cartPg.verifyCartPageVisible();
    await cartPg.getProductDetails(product);
    await cartPg.clickCheckout();

    //Checkout info page
    await checkOutIn.checkOutInformation(data);
    await checkOutIn.clickContinueBtn();

    //Checkout overview page
    await checkOutOver.getProductDetails(product);
    await checkOutOver.totalPrc(text);
    await checkOutOver.clickOnFinishBtn();

    //Checkout complete
    await checkOutComp.checkoutCompletePage(th_text);
    
    //Post conditions
    await dashBoadrd.verifyDashboardVisible();
    await dashBoadrd.verifyCartBadgeCount(0);

});