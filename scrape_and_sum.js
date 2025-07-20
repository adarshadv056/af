const { chromium } = require('playwright');

const urls = [
  'https://qa-sandbox.apps.ds.iitm.ac.in/seed4',
  'https://qa-sandbox.apps.ds.iitm.ac.in/seed5',
  'https://qa-sandbox.apps.ds.iitm.ac.in/seed6',
  'https://qa-sandbox.apps.ds.iitm.ac.in/seed7',
  'https://qa-sandbox.apps.ds.iitm.ac.in/seed8',
  'https://qa-sandbox.apps.ds.iitm.ac.in/seed9',
  'https://qa-sandbox.apps.ds.iitm.ac.in/seed10',
  'https://qa-sandbox.apps.ds.iitm.ac.in/seed11',
  'https://qa-sandbox.apps.ds.iitm.ac.in/seed12',
  'https://qa-sandbox.apps.ds.iitm.ac.in/seed13'
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let total = 0;

  for (const url of urls) {
    await page.goto(url);
    const numbers = await page.$$eval("table td", tds =>
      tds.map(td => parseInt(td.textContent.trim())).filter(n => !isNaN(n))
    );
    const sum = numbers.reduce((a, b) => a + b, 0);
    total += sum;
  }

  console.log("Total Sum:", total);
  await browser.close();
})();
console.log("Total Sum:", total);
