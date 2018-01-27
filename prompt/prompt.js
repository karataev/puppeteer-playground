const prompt = require('prompt');
const puppeteer = require('puppeteer');
const Spinner = require('cli-spinner').Spinner;

async function takeScreenshot(url) {
  const spinner = new Spinner('fetching.. %s');
  spinner.setSpinnerString('|/-\\');
  spinner.start();

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  await page.screenshot({
    path: `screenshot.png`,
  });

  await browser.close();
  console.log('Done!');
  spinner.stop();
}

prompt.start();
prompt.get([
  {
    name: 'url',
    description: 'Enter url (ex: http://example.com)'
  }
], (err, result) => {
  console.log('url: ' + result.url);
  takeScreenshot(result.url);
});

