const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  timeout: 30000, // Global timeout for each test
  retries: 1, // Retry on failure once
  reporter: [
    ['html', { outputFolder: 'reports' }], // HTML report
    ['allure-playwright'], // Allure report
  ],
  baseURL: "https://parabank.parasoft.com/parabank", // Base URL for tests
  use: {
    headless: true, // Run in headless mode
    screenshot: 'on', // Take screenshots on failure
    video: 'retain-on-failure', // Record videos for failed tests
  },

  projects: [
    {
      name: 'Cucumber-BDD',
      testDir: './features', // Path to feature files
      use: {
        baseURL: 'https://parabank.parasoft.com/parabank',
      },
    },
  ],

  webServer: {
    command: 'npm run start', // Command to start the application (optional)
    port: 3000, // Port for the application
    reuseExistingServer: !process.env.CI, // Reuse server in local environments
  },
});