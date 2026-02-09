import { test, expect } from '@playwright/test';
import { ExcelToJson } from '../utils/Abeer_utils/excelToJson_abeer';
import { CommonHelper } from '../utils/Abeer_utils/helper/commonHelper';
import personalData from '../utils/Abeer_utils/personDetails.json' with {type : 'json'};
import { LoginPage } from '../pages/Abeer_pages/loginPage';
import { InventoryPage } from '../pages/Abeer_pages/inventoryPage';
import { CartPage } from '../pages/Abeer_pages/cartPage';
import { CheckoutPage } from '../pages/Abeer_pages/checkoutPage';
import { OverviewPage } from '../pages/Abeer_pages/overviewPage';
import { CompletionPage } from '../pages/Abeer_pages/completionPage';

test.describe('SauceDemo POM', async ()=> {
    test( 'Successful login', async ({ page })=> {
        const commonHelper = new CommonHelper();
        await page.goto('https://saucedemo.com');

        const excelToJson = new ExcelToJson();
        const loginCredentials = excelToJson.getLoginCredentials();
        const products = excelToJson.getProducts();

        const loginPage = new LoginPage(page, loginCredentials[0]);
        await loginPage.login();

        const inventoryPage = new InventoryPage(page);
        await expect( inventoryPage.getTitle() ).toHaveText('Products');

        const items = [];
        items.push(products[3].productName);

        for(const item of items){
            await expect( inventoryPage.getItemName(item) ).toBeTruthy();
        }

        const itemPrice = [];
        for(const item of items){
            await inventoryPage.addToCart(inventoryPage.getItem(item));
            await expect( inventoryPage.getItem(item).getByRole('button') ).toHaveText('Remove');
            itemPrice.push( await inventoryPage.getItemPrice(item) );
        }
        
        expect( inventoryPage.getCartAmount() ).toHaveText(items.length.toString());
        await inventoryPage.goToCart();

        const cartPage = new CartPage(page);

        await expect(cartPage.getTitle()).toHaveText('Your Cart');
        expect(cartPage.getItems()).toHaveCount(items.length);
        for(let i = 0; i < items.length; i++){
            await expect(cartPage.getItem(items[i])).toBeTruthy();
            await expect(cartPage.getItemPrice(items[i])).toHaveText(itemPrice[i]);
        }
        await cartPage.checkout();

        const checkoutPage = new CheckoutPage(page, personalData.firstName, personalData.lastName, personalData.zip);
        await expect(checkoutPage.getTitle()).toHaveText('Checkout: Your Information');
        await checkoutPage.fill();
        await checkoutPage.checkoutOverview();

        const overviewPage = new OverviewPage(page);
        await expect(overviewPage.getItems()).toHaveCount(items.length);
        for(let i = 0; i < items.length; i++){
            await expect(overviewPage.getItem(items[i])).toBeTruthy();
            await expect(overviewPage.getItemPrice(items[i])).toHaveText(itemPrice[i]);
        }
        const totalPrice = commonHelper.separatePrice(await overviewPage.getSubTotal());
        const sumOfPrices = commonHelper.sumPrice(itemPrice);
        await expect(totalPrice).toEqual(sumOfPrices);
        await overviewPage.finishCheckout();

        const completionPage = new CompletionPage(page);
        await expect(completionPage.getTitle()).toHaveText('Checkout: Complete!');

        await expect(completionPage.getHeader()).toHaveText('Thank you for your order!');
        await expect(completionPage.getImage()).toBeTruthy();

        await completionPage.goHome();

        await expect(inventoryPage.getTitle()).toHaveText('Products');
        await expect(inventoryPage.getCartAmount()).toBeTruthy();

    });

    test('Unsuccessful login', async ( {page} )=> {
        const commonHelper = new CommonHelper();
        await page.goto('https://saucedemo.com');

        const excelToJson = new ExcelToJson();
        const loginCredentials = excelToJson.getLoginCredentials();
        const products = excelToJson.getProducts();

        const loginPage = new LoginPage(page, loginCredentials[4]);
        expect(await loginPage.login()).toBeFalsy();
    })
});
