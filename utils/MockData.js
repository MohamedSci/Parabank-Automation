await page.route('**/accounts', route => {
    route.fulfill({
      status: 200,
      body: JSON.stringify([{ id: 12345, balance: 1000 }]),
    });
  });
  