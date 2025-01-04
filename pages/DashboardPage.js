class DashboardPage {
    constructor(page) {
      this.page = page;
      this.accountOverviewTab = page.locator('h1:has-text("Accounts Overview")');
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
  