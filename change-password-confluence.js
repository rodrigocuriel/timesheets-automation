const config = require('./config');
const puppeteer = require('puppeteer');


(async () => {
  // const browser = await puppeteer.launch({ headless: false, devtools: true });
  const browser = await puppeteer.launch({ headless: false });

  const pages = await browser.pages();
  const page = pages[0];
  // await page.setViewport({ width: 1024, height: 768 })

await page.goto(`${config.CONFLUENCE_URL}/login.action`);
  
  await page.waitForSelector('#login-container h2');
  
  await page.focus('#os_username');
  await page.keyboard.type(config.username);
  
  await page.focus('#os_password');
  await page.keyboard.type(config.password);
  
  await page.click('#loginButton');
  
  await page.waitForSelector('#user-menu-link');
  await page.goto(`${config.CONFLUENCE_URL}/users/changemypassword.action`);
  
  await page.focus('#currentPassword');
  await page.keyboard.type(config.password);
  
  await page.focus('#newPassword');
  await page.keyboard.type(config.newPassword);
  
  await page.focus('#newPasswordConfirmation');
  await page.keyboard.type(config.newPassword);
  
  // await page.click('#confirm');
  await page.click('#cancel');
  // Holds the browser until we terminate the process explicitly, REMOVE this once it's stable
  // await browser.waitForTarget(() => false);

  await browser.close();
})();