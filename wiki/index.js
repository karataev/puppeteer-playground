const puppeteer = require('puppeteer');

async function navigate(page, url) {
  await page.goto(url);

  const links = await page.evaluate(() => {
    function filterLink(link) {
      if (!link.title || !link.href) return false;

      const stops = [
        'править',
        'википедия',
        'commons:',
        'файл',
        'редактировать',
        'увеличить',
        'страница отсутствует',
        'просмотр этого шаблона',
        'категория:',
        'служебная:',
      ];
      const titleLower = link.title.toLowerCase();
      return !stops.some(stop => titleLower.includes(stop));
    }

    let uniq = arr => [...new Set(arr)];

    const nodes = document.querySelectorAll('#content a');

    return Array
      .from(nodes)
      .filter(filterLink)
      .map(item => {
        return {
          title: item.title,
          href: item.href,
        }
      })
  });

  return links;
}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let href = 'https://ru.wikipedia.org/wiki/вселенная';
  for (let i = 0; i < 10; i++) {
    let items = await navigate(page, href);
    // console.log(items);
    let index = Math.round(Math.random() * items.length);
    let item = items[index];
    href = item.href;
    console.log('item', item);
  }

  await browser.close();
})();
