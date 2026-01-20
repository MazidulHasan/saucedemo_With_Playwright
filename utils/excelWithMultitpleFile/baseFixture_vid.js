import { test as base } from '@playwright/test';


import LoginPage from '../../pages/LoginPage.js';
import DashboardPage from '../../pages/DashboardPage.js';

export const myTest = base.extend({

    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
        await loginPage.doLogin("standard_user", "secret_sauce");
        await use(loginPage);
    },

    dashboardPage: async ({ loginPage }, use) => {
        const dashboardPage = new DashboardPage(loginPage.page);
        dashboardPage.verifyDashboardVisible();
        await use(dashboardPage);
    },
});
