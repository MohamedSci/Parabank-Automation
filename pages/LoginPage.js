class LoginPage {
    constructor(page) {
      this.page = page;
      this.usernameInput = page.locator('input[name="username"]');
      this.passwordInput = page.locator('input[name="password"]');
      this.loginButton = page.locator('input[type="submit"]');
      this.errorMessage = page.locator('p[class="error"]');
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
  