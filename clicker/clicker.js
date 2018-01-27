const puppeteer = require('puppeteer');

async function start() {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.setViewport({
    width: 1280,
    height: 800,
  });

  await page.goto('https://cookie.riimu.net/speed/');

  let counter = 0;
  function doClick() {
    page.click('#virtualCookie');
    counter++;
    if (counter < 1000) setTimeout(doClick, 10);
  }

  doClick();
  // await browser.close();
}

start();