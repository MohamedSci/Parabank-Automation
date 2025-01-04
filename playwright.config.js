const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    timeout: 30000,
    retries: 1,
    reporter: [['html', { outputFolder: 'reports' }], ['allure-playwright']],
    baseURL: "https://parabank.parasoft.com/parabank/login",
    use: {
        baseURL: 'https://parabank.parasoft.com/parabank',
        headless: true,
        screenshot: 'on',
        video: 'retain-on-failure',
    },
});
