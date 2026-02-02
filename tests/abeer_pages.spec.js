import { test, expect } from '@playwright/test';
import { ExcelToJson } from '../utils/Abeer_utils/excelToJson_abeer';
import { CommonHelper } from '../utils/Abeer_utils/commonHelper';
import personalData from '../utils/Abeer_utils/personDetails.json' with {type : 'json'};
import { LoginPage } from '../pages/Abeer_pages/loginPage';
import { InventoryPage } from '../pages/Abeer_pages/inventoryPage';
import { CartPage } from '../pages/Abeer_pages/cartPage';
import { CheckoutPage } from '../pages/Abeer_pages/checkoutPage';
import { OverviewPage } from '../pages/Abeer_pages/overviewPage';


test(
    'SauceDemo POM',
    async ({ page })=> {
        const commonHelper = new CommonHelper();
        await page.goto('https://saucedemo.com');

        const excelToJson = new ExcelToJson();
        const loginCredentials = excelToJson.getLoginCredentials();
        const products = excelToJson.getProducts();

        const loginPage = new LoginPage(page, loginCredentials[0]);
        await loginPage.login();
        await expect(page.locator('//span[@class="title"]')).toHaveText('Products');

        const items = [];
        items.push(products[3].productName);
        for(const item of items){
            await expect(page.locator('//div[@class="inventory_item_name "]').filter({ hasText : item })).toBeTruthy();
        }

        const inventoryPage = new InventoryPage(page);
        var itemsLocation = page.locator('//div[@class="inventory_item_description"]');
        const itemPrice = [];
        for(const item of items){
            var itemLocation = itemsLocation.filter({ hasText: item });
            await inventoryPage.addToCart(itemLocation);
            await expect(itemLocation.getByRole('button')).toHaveText('Remove');
            itemPrice.push(await itemLocation.locator('//div[@class="inventory_item_price"]').innerText());
        }
        
        expect(page.locator('//a[@class="shopping_cart_link"]')).toHaveText(items.length.toString());
        await inventoryPage.goToCart();

        await expect(page.locator('//span[@class="title"]')).toHaveText('Your Cart');
        expect(page.locator('//div[@class="inventory_item_name"]')).toHaveCount(items.length);
        for(let i = 0; i < items.length; i++){
            var location = page.locator('//div[@class="cart_item_label"]').filter( {hasText : items[i]} );
            await expect(location).toBeTruthy();
            await expect(location.locator('//div[@class="inventory_item_price"]')).toHaveText(itemPrice[i]);
        }

        const cartPage = new CartPage(page);
        await cartPage.checkout();
        await expect(page.locator('//span[@class="title"]')).toHaveText('Checkout: Your Information');

        const checkoutPage = new CheckoutPage(page, personalData.firstName, personalData.lastName, personalData.zip);
        await checkoutPage.fill();
        await checkoutPage.checkoutOverview();

        itemsLocation = page.locator('//div[@class="cart_item"]');
        await expect(itemsLocation).toHaveCount(items.length);
        for(let i = 0; i < items.length; i++){
            var itemLocation = itemsLocation.filter({ hasText: items[i] });
            await expect(itemsLocation).toBeTruthy();
            await expect(itemsLocation.locator('//div[@class="inventory_item_price"]')).toHaveText(itemPrice[i]);
        }
        await expect(commonHelper.separatePrice(await page.locator('//div[@class="summary_subtotal_label"]').innerText())).toEqual(commonHelper.sumPrice(itemPrice));
        const overviewPage = new OverviewPage(page);
        await overviewPage.finishCheckout();

        await expect(page.locator('//span[@class="title"]')).toHaveText('Checkout: Complete!');

        await expect(page.locator('//h2[@class="complete-header"]')).toHaveText('Thank you for your order!');
        await expect(page.locator('//img[@class="pony_express"]')).toBeTruthy();

        await page.getByRole('button', { name: 'Back Home' }).click();

        await expect(page.locator('//span[@class="title"]')).toHaveText('Products');
        await expect(page.locator('//span[@class="shopping_cart_badge"]')).toBeTruthy();

    });