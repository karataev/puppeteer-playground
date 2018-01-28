const puppeteer = require('puppeteer');


(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  console.log('Погода в Новосибирске');

  await page.setRequestInterception(true);
  page.on('request', request => {
    const blockedResources = ['image', 'script', 'stylesheet', 'font', 'media'];
    if (blockedResources.indexOf(request.resourceType()) > -1)
      request.abort();
    else
      request.continue();
  });

  await page.goto('http://pogoda.ngs.ru/');

  // await page.screenshot({
  //   path: 'weather-nsk.png'
  // });

  const temp = await page.evaluate(() => {
    const el = document.querySelector('.value__main');
    return el.innerHTML;
  });
  console.log(`Температура ${temp}°`);

  const tempFeelsLike = await page.evaluate(() => {
    const el = document.querySelector('.value-feels_like__number');
    return el.textContent;
  });
  console.log(`Ощущается как ${tempFeelsLike}`);

  await browser.close();
})();
