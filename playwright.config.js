const { defineConfig } = require('@playwright/test');
const { defineBddConfig } = require('playwright-bdd');

module.exports = defineConfig({
  timeout: 30000,
  retries: 1,
  reporter: [['html', { outputFolder: 'reports' }], ['allure-playwright']],
  baseURL: 'https://parabank.parasoft.com/parabank',
  use: {
    headless: true,
    screenshot: 'on',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'Cucumber-BDD',
      testDir: './features',
      use: {
        baseURL: 'https://parabank.parasoft.com/parabank',
      },
    },
  ],
});

defineBddConfig({
  outputDir: 'features', // Directory where generated feature files will be stored
  stepDefinitionsDir: 'step-definitions', // Directory for your step definition files
  steps: "step-definitions/**/*.ts", // Glob pattern for step definition files
  features: "features/**/*.feature",
  featuresRoot: 'features', // Root directory for your feature files
  format: 'gherkin', // Format for feature files
});

// // module.exports = defineConfig({
// //   timeout: 30000, // Global timeout for each test
// //   retries: 1, // Retry on failure once
// //   reporter: [
// //     ['html', { outputFolder: 'reports' }], // HTML report
// //     ['allure-playwright'], // Allure report
// //   ],
// //   baseURL: "https://parabank.parasoft.com/parabank", // Base URL for tests
// //   use: {
// //     headless: true, // Run in headless mode
// //     screenshot: 'on', // Take screenshots on failure
// //     video: 'retain-on-failure', // Record videos for failed tests
// //   },

// //   projects: [
// //     {
// //       name: 'Cucumber-BDD',
// //       testDir: './features', // Path to feature files
// //       use: {
// //         baseURL: 'https://parabank.parasoft.com/parabank',
// //       },
// //     },
// //   ],

// //   // webServer: {
// //   //   command: 'npm run start', // Command to start the application (optional)
// //   //   port: 3000, // Port for the application
// //   //   reuseExistingServer: !process.env.CI, // Reuse server in local environments
// //   // },
// // });