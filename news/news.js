const puppeteer = require('puppeteer');

async function getTitles() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', request => {
    const blockedResources = ['image', 'script', 'stylesheet', 'font', 'media'];
    if (blockedResources.indexOf(request.resourceType()) > -1)
      request.abort();
    else
      request.continue();
  });

  await page.goto('http://lenta.ru');

  const titles = await page.evaluate(() => {
    const items1 = Array.from(document.querySelectorAll('.js-top-seven .item a'));
    const items2 = Array.from(document.querySelectorAll('.js-yellow-box .item a'));
    const items = [...items1, ...items2];
    return items.map(item => {
      let title = item.innerHTML.replace(/<time.*<\/time>/, '');
      title = title.replace(/&nbsp;/g, ' ');
      return title;
    });
  });

  console.log('Главные новости с lenta.ru');
  titles.forEach((title, i) => {
    console.log(`${i + 1}. ${title}`);
  });

  await browser.close();
}

getTitles();

