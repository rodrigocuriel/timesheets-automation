const config = require('./config');
const puppeteer = require('puppeteer');


(async () => {
  // const browser = await puppeteer.launch({ headless: false, devtools: true });
  const browser = await puppeteer.launch({ headless: false });

  const pages = await browser.pages();
  const page = pages[0];
  // await page.setViewport({ width: 1024, height: 768 })

  await page.goto(config.JIRA_URL);

  await page.waitForSelector('#login-form-username');

  await page.focus('#login-form-username');
  await page.keyboard.type(config.username);

  await page.focus('#login-form-password');
  await page.keyboard.type(config.password);

  await page.click('#login', { delay: 300 });

  await page.waitForSelector('#header-details-user-fullname');
  await page.goto(`${config.JIRA_URL}/secure/ChangePassword!default.jspa?username=${config.username.toLocaleLowerCase()}`);

  await page.focus('#change-password-current-password');
  await page.keyboard.type(config.password);

  await page.focus('#change-password-new-password');
  await page.keyboard.type(config.newPassword);

  await page.focus('#change-password-confirm-password');
  await page.keyboard.type(config.newPassword);

  // await page.click('#change-password-confirm');
  await page.click('#change-password-cancel');
  // Holds the browser until we terminate the process explicitly, REMOVE this once it's stable
  // await browser.waitForTarget(() => false);

  await browser.close();
})();