const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const testData = require('../fixtures/testData.json');

Given('I am logged in', async function () {
  await this.init();
  await this.page.goto("https://parabank.parasoft.com/parabank/login");
  await this.page.locator('input[name="username"]').fill(testData.validCredentials.username);
  await this.page.locator('input[name="password"]').fill(testData.validCredentials.password);
  await this.page.locator('input[type="submit"]').click();
  expect(await this.page.locator('a:has-text("Log Out")')).toBeVisible();
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
  const confirmation = await this.page.locator("h1.title:has-text('Account Opened!')");
  expect(confirmation).toBeVisible();
});