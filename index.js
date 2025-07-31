require('dotenv/config');
const { chromium } = require('playwright-core');

const run = async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-gpu'
    ]
  });

  const page = await browser.newPage();
  await page.goto('https://github.com/microsoft/playwright');
  const title = await page.title();
  console.log(`Page title: ${title}`);

  await browser.close();
};

run().catch(console.error);
