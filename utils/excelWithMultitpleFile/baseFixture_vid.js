import { test as base } from '@playwright/test';


import LoginPage from '../../pages/LoginPage.js';
import DashboardPage from '../../pages/DashboardPage.js';

export const myTest = base.extend({

    loginPage: async ({ page }, use) => {
        console.log("login 1");
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
        await loginPage.doLogin("standard_user", "secret_sauce");
        await use(loginPage);
        console.log("login 2");
    },

    dashboardPage: async ({ loginPage }, use) => {
        console.log("login 3");
        const dashboardPage = new DashboardPage(loginPage.page);
        dashboardPage.verifyDashboardVisible();
        await use(dashboardPage);
        console.log("login 4");
    },
});
