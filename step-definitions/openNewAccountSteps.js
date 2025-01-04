const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const DashboardPage = require('../pages/DashboardPage');

Given('I am logged in', async function () {
    const loginPage = new LoginPage(this.page);
    const dashboardPage = new DashboardPage(this.page);
    await this.page.goto(`${process.env.BASE_URL}/login`);
    await this.page.goto(`${process.env.BASE_URL}/login`);

    await loginPage.login(testData.validCredentials.username, testData.validCredentials.password);

    const isDashboardVisible = await dashboardPage.isDashboardVisible();
    expect(isDashboardVisible).toBe(true);
    await page.context().storageState({ path: authFile });
});

When('I navigate to the Open New Account page', async function () {
    await this.page.click('a:has-text("Open New Account")');
});

When('I select {string} as the account type', async function (accountType) {
    await this.page.selectOption('select#type', accountType);
});

When('I choose an existing account {string} as the funding account', async function (fundingAccount) {
    await this.page.selectOption('select#fromAccountId', fundingAccount);
});

When('I submit the request', async function () {
    await this.page.click('input[value="Open New Account"]');
});

Then('I should see a confirmation with the new account number', async function () {
    const confirmation = await this.page.locator("h1.title:has-text('Account Opened!')")
    expect(confirmation).not.toBeVisible();
});