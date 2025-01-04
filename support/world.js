const { setWorldConstructor } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

class World {
  constructor() {
    this.page = null;
    this.browser = null;
    this.context = null;
  }

  async init() {
    this.browser = await chromium.launch({ headless: true });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  async close() {
    await this.browser.close();
  }
}

setWorldConstructor(World);
