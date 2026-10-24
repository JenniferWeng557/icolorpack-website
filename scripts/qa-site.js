const { chromium } = require('playwright');

const base = 'http://127.0.0.1:8892';
const pages = [
  '/index.html',
  '/product-paper-bags.html',
  '/packaging-for-ecommerce-brands.html',
  '/blog/2026-anti-counterfeiting-luxury-paper-gift-boxes.html'
];

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const results = [];

  for (const pathname of pages) {
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(base + pathname, { waitUntil: 'domcontentloaded' });
    const result = await page.evaluate(() => ({
      title: document.title,
      canonical: document.querySelector('link[rel="canonical"]')?.href || '',
      analytics: Boolean(document.querySelector('script[src="/icp-analytics.js"]')),
      inquiryForms: Array.from(document.forms).filter((form) => (form.action || '').includes('formspree.io/f/maeypklz')).length,
      honeypots: document.querySelectorAll('input[name="_gotcha"]').length,
      horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 2
    }));
    result.pathname = pathname;
    result.errors = errors;
    results.push(result);

    if (pathname === '/product-paper-bags.html') {
      await page.locator('#inquiry').scrollIntoViewIfNeeded();
      await page.screenshot({ path: 'qa-paper-bag-inquiry.png', fullPage: false });
    }
    await page.close();
  }

  await browser.close();
  console.log(JSON.stringify(results, null, 2));
  if (results.some((result) => !result.title || !result.analytics || result.horizontalOverflow || result.errors.length)) {
    process.exitCode = 1;
  }
})();
