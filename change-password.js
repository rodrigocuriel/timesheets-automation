const config = require('./config');
const puppeteer = require('puppeteer');


(async () => {
    // const browser = await puppeteer.launch({ headless: false, devtools: true });
    const browser = await puppeteer.launch({ headless: false, ignoreHTTPSErrors: true });

    const pages = await browser.pages();
    const page = pages[0];
    // await page.setViewport({ width: 1024, height: 768 })

    await page.goto(`${config.PASSWORD_RESET_URL}`);

    await page.waitForSelector('#homepage');
    await page.click('#homepage > section > div:nth-child(3) > p:nth-child(4) > a', { delay: 300 });

    await page.waitForSelector('.user_inputs');
    await page.focus('#reactID');
    await page.keyboard.type(config.username);

    await page.click('#wizard_nav > p.wizardNav_rbutton.fl_right > a.button.small.gradient.continue.rnd5', { delay: 300 });

    await page.waitForSelector('.user_inputs');
    await page.focus('#txtADPass');
    await page.keyboard.type(config.password);

    await page.click('#continue_button', { delay: 300 });

    await page.waitForSelector('#PasswordRequirements');
    await page.focus('#OLDPASSWORD');
    await page.keyboard.press('Home');
    await page.keyboard.down('Shift');
    await page.keyboard.press('End');
    await page.keyboard.up('Shift');
    await page.keyboard.press('Backspace');
    await page.keyboard.type(config.password);

    await page.focus('#NEWPASSWORD');
    await page.keyboard.type(config.password);

    await page.focus('#CONFIRMPASSWORD');
    await page.keyboard.type(config.password);

    // await page.click('#wizard_nav > p.wizardNav_rbutton.fl_right > a.button.small.gradient.reset.rnd5');
    await page.click('#wizard_nav > p.wizardNav_lbutton.fl_left > a');
    // Holds the browser until we terminate the process explicitly, REMOVE this once it's stable
    // await browser.waitForTarget(() => false);

    await browser.close();
})();