const puppeteer = require('puppeteer');


(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  console.log('Погода в Новосибирске');
  await page.goto('http://pogoda.ngs.ru/');

  // await page.screenshot({
  //   path: 'weather-nsk.png'
  // });

  const value = await page.evaluate(() => {
    const elements = document.querySelectorAll('.value__main');
    return elements[0].innerHTML;
  });

  console.log(value);

  await browser.close();
})();
