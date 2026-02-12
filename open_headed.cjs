const { chromium } = require('playwright');

(async () => {
    // Launching with headless: false to show the browser window to the user
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    console.log('Navigating to https://www.saucedemo.com/ in headed mode...');
    await page.goto('https://www.saucedemo.com/');

    console.log('Browser is open. I will wait for 30 seconds so you can see it.');
    console.log('You can close the window manually or it will close automatically in 30s.');

    // Wait for 30 seconds to allow the user to see/interact
    await page.waitForTimeout(30000);

    await browser.close();
    console.log('Browser closed.');
})();
