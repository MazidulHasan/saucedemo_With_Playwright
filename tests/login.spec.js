import { test, expect } from './fixtures/authFixture.js';

/**
 * Login Test Suite for SauceDemo
 * Tests login functionality with different user types
 * Uses custom fixtures for authentication and Excel-driven test data
 */

test.describe('Login Tests @smoke', () => {

    /**
     * Test: Successful login with valid credentials
     * Follows AAA pattern: Arrange → Act → Assert
     */
    test('should login successfully with valid credentials', async ({ loginPage, dashboardPage, login }) => {
        // ARRANGE
        // Fixtures are already initialized (loginPage, dashboardPage)
        // Login function is provided by fixture

        // ACT
        // Perform login using credentials from Excel (index 0 = standard_user)
        await login(0);

        // ASSERT
        // Verify dashboard page is visible
        const isDashboardVisible = await dashboardPage.verifyDashboardVisible();
        expect(isDashboardVisible).toBeTruthy();

        // Verify dashboard title
        const dashboardTitle = await dashboardPage.getDashboardTitle();
        expect(dashboardTitle).toBe('Products');

        // Verify user is on correct URL
        const isOnDashboard = await dashboardPage.isOnDashboard();
        expect(isOnDashboard).toBeTruthy();

        // Verify products are displayed
        const productCount = await dashboardPage.getProductCount();
        expect(productCount).toBeGreaterThan(0);
    });

    /**
     * Test: Login with locked out user
     * Verifies error handling for locked accounts
     */
    test('should show error for locked out user', async ({ loginPage, login }) => {
        // ARRANGE
        // Using locked_out_user credentials (index 1)

        // ACT & ASSERT
        // Expect login to fail with error
        await expect(async () => {
            await login(1); // locked_out_user
        }).rejects.toThrow();

        // Verify error message is displayed
        const isErrorDisplayed = await loginPage.isErrorDisplayed();
        expect(isErrorDisplayed).toBeTruthy();

        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('locked out');
    });

    /**
     * Test: Login with invalid credentials
     * Verifies error handling for wrong username/password
     */
    test('should show error for invalid credentials', async ({ loginPage, login }) => {
        // ARRANGE
        // Using invalid credentials (index 4)

        // ACT & ASSERT
        // Expect login to fail
        await expect(async () => {
            await login(4); // invalid_user
        }).rejects.toThrow();

        // Verify error message is displayed
        const isErrorDisplayed = await loginPage.isErrorDisplayed();
        expect(isErrorDisplayed).toBeTruthy();

        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Username and password do not match');
    });

    /**
     * Test: Verify login page elements
     * Ensures all required elements are present
     */
    test('should display all login page elements', async ({ loginPage }) => {
        // ARRANGE
        await loginPage.navigateToLoginPage();

        // ACT & ASSERT
        const isLoginPageDisplayed = await loginPage.isLoginPageDisplayed();
        expect(isLoginPageDisplayed).toBeTruthy();
    });

    /**
     * Test: Complete user flow - Login and Logout
     * Tests full authentication cycle
     */
    test('should login and logout successfully', async ({ loginPage, dashboardPage, login }) => {
        // ARRANGE & ACT
        await login(0); // Login with standard_user

        // ASSERT - Verify login successful
        const isDashboardVisible = await dashboardPage.verifyDashboardVisible();
        expect(isDashboardVisible).toBeTruthy();

        // ACT - Logout
        await dashboardPage.logout();

        // ASSERT - Verify back on login page
        const isLoginPageDisplayed = await loginPage.isLoginPageDisplayed();
        expect(isLoginPageDisplayed).toBeTruthy();
    });

    /**
     * Test: Using authenticatedPage fixture
     * Demonstrates auto-login fixture usage
     */
    test('should use authenticated page fixture', async ({ authenticatedPage }) => {
        // ARRANGE
        // authenticatedPage fixture automatically logs in
        const { dashboardPage } = authenticatedPage;

        // ACT & ASSERT
        // Verify we're already logged in
        const isOnDashboard = await dashboardPage.isOnDashboard();
        expect(isOnDashboard).toBeTruthy();

        // Verify products are visible
        const productNames = await dashboardPage.getAllProductNames();
        expect(productNames.length).toBeGreaterThan(0);
    });
});
