import { expect } from '@playwright/test';
import { myTest } from '../utils/excelWithMultitpleFile/baseFixture_vid.js';

myTest.describe('Dashboard Page Tests', () => {

    myTest('Login and verify Dashboard Page Title', async ({ dashboardPage}) => {
        // verify dashboardPage page title
        const dashboardPagetitle = await dashboardPage.verifyDashboardVisible();
        expect(dashboardPagetitle).toBe(true);
    });

    myTest('Login and prooduct count', async ({ dashboardPage}) => {
        // verify product count on dashboard page
        const productCount = await dashboardPage.getProductCount();
        console.log(productCount);
        expect(productCount).toBe(6);
    });

    myTest('Login and verify cart', async ({ dashboardPage}) => {
        // verify product count on dashboard page
        const productCount = await dashboardPage.isShoppingCartVisible();
        expect(productCount).toBe(true);
    });


});