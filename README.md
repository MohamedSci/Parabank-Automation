# Parabank-Automation

Here’s how you can build an advanced automation framework with Playwright for testing the **[Parabank Demo Application](https://parabank.parasoft.com/parabank/index.htm)**.

---

## **Step 1: Set Up the Project**

### **1. Initialize the Project**

Run the following commands:

```bash
mkdir parabank-automation
cd parabank-automation
npm init -y
npm install playwright @playwright/test
```

### **2. Create Folder Structure**

Organize the project as follows:

```
parabank-automation/
├── configs/            # Configuration files
├── fixtures/           # Test data
├── pages/              # Page Object Model (POM) classes
├── tests/              # Test scripts
├── utils/              # Utility functions
├── reports/            # Test reports
└── playwright.config.js
```

---

## **Step 2: Configure Playwright**

### **playwright.config.js**

```javascript
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  timeout: 30000,
  retries: 1,
  reporter: [['html', { outputFolder: 'reports' }]],
  use: {
    baseURL: 'https://parabank.parasoft.com/parabank',
    headless: true,
    screenshot: 'on',
    video: 'retain-on-failure',
  },
});
```

---

## **Step 3: Implement Page Object Model (POM)**

### **Login Page (`pages/LoginPage.js`)**

```javascript
class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('input[value="Log In"]');
    this.errorMessage = page.locator('.error');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }
}

module.exports = LoginPage;
```

### **Dashboard Page (`pages/DashboardPage.js`)**

```javascript
class DashboardPage {
  constructor(page) {
    this.page = page;
    this.accountOverviewTab = page.locator('a:has-text("Accounts Overview")');
    this.logoutButton = page.locator('a:has-text("Log Out")');
  }

  async isDashboardVisible() {
    return await this.accountOverviewTab.isVisible();
  }

  async logout() {
    await this.logoutButton.click();
  }
}

module.exports = DashboardPage;
```

---

## **Step 4: Write Utility Functions**

### **API Utility (`utils/apiUtils.js`)**

For backend validation or token fetching:

```javascript
const axios = require('axios');

async function getAuthToken(username, password) {
  const response = await axios.post('https://parabank.parasoft.com/parabank/login', {
    username,
    password,
  });
  return response.headers['set-cookie'];
}

module.exports = { getAuthToken };
```

---

## **Step 5: Add Test Data**

### **Test Data (`fixtures/testData.json`)**

```json
{
  "validCredentials": {
    "username": "john",
    "password": "demo"
  },
  "invalidCredentials": {
    "username": "invalidUser",
    "password": "wrongPass"
  }
}
```

---

## **Step 6: Write Test Cases**

### **Login Tests (`tests/login.spec.js`)**

```javascript
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const DashboardPage = require('../pages/DashboardPage');
const testData = require('../fixtures/testData.json');

test.describe('Login Tests', () => {
  test('should log in successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await page.goto('/');
    await loginPage.login(testData.validCredentials.username, testData.validCredentials.password);

    const isDashboardVisible = await dashboardPage.isDashboardVisible();
    expect(isDashboardVisible).toBe(true);
  });

  test('should show error message with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto('/');
    await loginPage.login(testData.invalidCredentials.username, testData.invalidCredentials.password);

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('The username and password could not be verified.');
  });
});
```

---

## **Step 7: Add Advanced Features**

### **1. Reporting**

Add HTML and Allure reports:

```bash
npm install allure-playwright
```

Update `playwright.config.js`:

```javascript
reporter: [['html'], ['allure-playwright']],
```

Generate reports:

```bash
npx playwright show-report
npx allure generate && allure open
```

---

### **2. Parallel Testing**

Enable parallel execution:

```javascript
projects: [
  { name: 'chromium', use: { browserName: 'chromium' } },
  { name: 'firefox', use: { browserName: 'firefox' } },
  { name: 'webkit', use: { browserName: 'webkit' } },
],
```

---

### **3. Mock Data**

Use API mocking to simulate responses for unavailable services:

```javascript
await page.route('**/accounts', route => {
  route.fulfill({
    status: 200,
    body: JSON.stringify([{ id: 12345, balance: 1000 }]),
  });
});
```

---

### **4. CI/CD Integration**

Add GitHub Actions Workflow:

```yaml
name: Playwright Tests

on:
  push:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 16

      - name: Install dependencies
        run: npm install

      - name: Run Playwright tests
        run: npx playwright test
```

---

### **5. Accessibility Testing**

Integrate Playwright Axe:

```bash
npm install @axe-core/playwright
```

Example:

```javascript
const { injectAxe, checkA11y } = require('@axe-core/playwright');

test('should check accessibility', async ({ page }) => {
  await page.goto('/');
  await injectAxe(page);
  await checkA11y(page);
});
```

---
