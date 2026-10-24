const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const base = 'http://127.0.0.1:8892';

async function fillFirstInquiry(page) {
  const form = page.locator('form[action*="formspree.io/f/maeypklz"]').first();
  await form.locator('[name="name"]').fill('QA Test');
  await form.locator('[name="contact"]').fill('qa@example.com');
  const quantity = form.locator('[name="quantity"]');
  if (await quantity.count()) await quantity.selectOption({ index: 1 });
  await form.locator('[type="submit"]').click();
  return form;
}

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });

  const successContext = await browser.newContext();
  const successPage = await successContext.newPage();
  await successPage.route(base + '/thank-you', (route) => route.fulfill({
    status: 200,
    contentType: 'text/html',
    body: fs.readFileSync(path.resolve(__dirname, '..', 'thank-you.html'), 'utf8')
  }));
  await successPage.route('https://formspree.io/**', (route) => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: '{"ok":true}'
  }));
  await successPage.goto(base + '/index.html', { waitUntil: 'domcontentloaded' });
  await fillFirstInquiry(successPage);
  await successPage.waitForURL(base + '/thank-you');
  const leadEvents = await successPage.evaluate(() => (window.dataLayer || []).filter((item) => item && item[0] === 'event' && item[1] === 'generate_lead').length);
  if (leadEvents !== 1) throw new Error('Expected one generate_lead event after confirmed success; got ' + leadEvents);
  await successContext.close();

  const failureContext = await browser.newContext();
  const failurePage = await failureContext.newPage();
  await failurePage.route('https://formspree.io/**', (route) => route.fulfill({
    status: 500,
    contentType: 'application/json',
    body: '{"error":"test failure"}'
  }));
  await failurePage.goto(base + '/index.html', { waitUntil: 'domcontentloaded' });
  const failureForm = await fillFirstInquiry(failurePage);
  await failureForm.locator('[data-form-status]').waitFor({ state: 'visible' });
  const failureState = await failurePage.evaluate(() => ({
    path: location.pathname,
    message: document.querySelector('form[action*="formspree.io"] [data-form-status]')?.textContent || '',
    leadEvents: (window.dataLayer || []).filter((item) => item && item[0] === 'event' && item[1] === 'generate_lead').length,
    disabled: document.querySelector('form[action*="formspree.io"] [type="submit"]')?.disabled
  }));
  if (failureState.path !== '/index.html' || failureState.leadEvents !== 0 || failureState.disabled || !failureState.message) {
    throw new Error('Failure flow did not recover correctly: ' + JSON.stringify(failureState));
  }
  await failureContext.close();
  await browser.close();
  console.log(JSON.stringify({ success: true, leadEvents, failureState }, null, 2));
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
