import { test } from '@playwright/test';
import { LoginPage } from '../pages/Rahanuma_pages/loginPage.js';
import { InventoryPage } from '../pages/Rahanuma_pages/InventoryPage.js';
import { CartPage } from '../pages/Rahanuma_pages/CartPage.js';
import { CheckoutInfoPage } from '../pages/Rahanuma_pages/CheckoutInfoPage.js';
import { CheckoutOverviewPage } from '../pages/Rahanuma_pages/CheckoutOverviewPage.js';
import { CheckoutCompletePage } from '../pages/Rahanuma_pages/CheckoutCompletePage.js';
import ExcelReader from '../utils/excelReader.js';
import Logger from '../helpers/logger.js';

// Get login credentials from Excel
const credentials = ExcelReader.getLoginCredentials(0);
const { username, password } = credentials;

test('Complete order flow for Sauce Labs Fleece Jacket using Excel login', async ({ page }) => {

  // Page object initialization
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutInfoPage = new CheckoutInfoPage(page);
  const checkoutOverviewPage = new CheckoutOverviewPage(page);
  const checkoutCompletePage = new CheckoutCompletePage(page);

  // 1. Navigate to application & login
  Logger.step('1. Navigate to application & login');
  await loginPage.open();
  Logger.info(`Logging in with: ${username} / ${password}`);
  await loginPage.login(username, password);

  // 2. Verify product on inventory & add to cart
  Logger.step('2. Verify product on inventory & add to cart');
  await inventoryPage.verifyProductVisible();
  await inventoryPage.addProductToCart();
  await inventoryPage.verifyCartCount('1');
  await inventoryPage.goToCart();

  // 3. Verify cart details
  Logger.step('3. Verify cart details');
  await cartPage.verifyProduct('Sauce Labs Fleece Jacket');
  await cartPage.verifyQuantity('1');
  await cartPage.checkout();

  // 4. Fill checkout information
  Logger.step('4. Fill checkout information');
  await checkoutInfoPage.fillInfo('Test', 'User', '1234');

  // 5. Verify checkout overview details
  Logger.step('5. Verify checkout overview details');
  await checkoutOverviewPage.verifyProductName('Sauce Labs Fleece Jacket');
  await checkoutOverviewPage.verifyQuantity('1');
  await checkoutOverviewPage.verifyPrice('$49.99');
  await checkoutOverviewPage.verifyItemTotal('Item total: $49.99');

  // 6. Finish order
  Logger.step('6. Finish order');
  await checkoutOverviewPage.clickFinish();

  // 7. Verify order completion & go back home
  Logger.step('7. Verify order completion & go back home');
  await checkoutCompletePage.verifyOrderComplete();
  await checkoutCompletePage.backToHome();
});
