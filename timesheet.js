const config = require('./config');
const puppeteer = require('puppeteer');

(async () => {
  // const browser = await puppeteer.launch({ headless: false, devtools: true });
  const browser = await puppeteer.launch({ headless: false });

  const pages = await browser.pages();
  const page = pages[0];
  // await page.setViewport({ width: 1024, height: 768 })

  await page.goto(config.INNOTAS_URL);

  await page.waitForSelector('title');
  const title = await page.title();
  console.info(`The title is: ${title}`);

  await page.focus('#userNameInput');
  await page.keyboard.type(config.username);

  await page.focus('#passwordInput');
  await page.keyboard.type(config.password);

  await page.click('#submitButton', { delay: 300 });

  await page.waitForSelector('a#button-1021');
  await page.click('a#button-1021');

  await page.waitForSelector('#projectnavigationview-1083_header');
  await page.click('a#button-1020');

  // await page.waitForSelector('#topicnavtreepanel-1082-body table:nth-child(2) a');
  // await page.click('#topicnavtreepanel-1082-body table:nth-child(2) a');
  await page.waitFor(1000);

  await page.waitForSelector('#ext-comp-1284-locked');
  await page.click('#ext-element-24 td');

  await page.waitForSelector('#ext-comp-1272-inputEl');
  await page.focus('#ext-comp-1272-inputEl');
  await page.keyboard.type('C7541');
  await page.waitFor(1000);
  await page.keyboard.press('Enter');

  await page.focus('#ext-comp-1273-inputEl');
  await page.keyboard.type('3.4');
  await page.waitFor(1000);
  await page.keyboard.press('Enter');

  await page.waitFor(1000);
  await page.click('a#button-1365');
  await page.waitFor(1000);

  for (let index = 2; index < 7; index++) {
    await page.click(`.x-grid:nth-child(3) td:nth-child(${index})`);
    await page.keyboard.type('8');
  }

  await page.waitFor(1000);
  await page.click('a#toolbar-1239-menu-trigger');
  await page.waitFor(1000);
  await page.click('a#menuitem-1378-itemEl');

  await page.waitFor(1000);
  await page.click('a#button-1384');

  // Holds the browser until we terminate the process explicitly, REMOVE this once it's stable
  await browser.waitForTarget(() => false);

  await browser.close();
})();