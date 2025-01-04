const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const DashboardPage = require('../pages/DashboardPage');
const testData = require('../fixtures/testData.json');
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test.describe('Login Tests', () => {
  test('should log in successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    // await page.goto(`${process.env.BASE_URL}/login`);
    await page.goto("https://parabank.parasoft.com/parabank/login");
    await loginPage.login(testData.validCredentials.username, testData.validCredentials.password);

    const isDashboardVisible = await dashboardPage.isDashboardVisible();
    expect(isDashboardVisible).toBe(true);
    await page.context().storageState({ path: authFile });
  });

  test('should show error message with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    // await page.goto(`${process.env.BASE_URL}/login`);
    await page.goto("https://parabank.parasoft.com/parabank/login");
    await loginPage.login(testData.invalidCredentials.username, testData.invalidCredentials.password);

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('The username and password could not be verified.');
  });
});
