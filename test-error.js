const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Log browser console
  page.on('console', msg => console.log('BROWSER_CONSOLE:', msg.text()));
  page.on('pageerror', error => console.error('BROWSER_ERROR:', error));

  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    
    // Find the select trigger
    console.log('Clicking the select trigger...');
    await page.click('button[role="combobox"]');
    
    // Wait for dropdown to be visible
    await page.waitForSelector('[role="listbox"]');
    
    // Click the QRIS option
    console.log('Selecting QRIS...');
    // We can use XPath or evaluate to click the specific option
    await page.evaluate(() => {
      const options = Array.from(document.querySelectorAll('[role="option"]'));
      const qrisOption = options.find(el => el.textContent.includes('QRIS'));
      if (qrisOption) qrisOption.click();
    });
    
    // Wait a bit to let the error happen (or not)
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Finished interaction.');
  } catch (err) {
    console.error('SCRIPT_ERROR:', err);
  } finally {
    await browser.close();
  }
})();
