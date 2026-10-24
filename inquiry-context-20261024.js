/* Inquiry attribution: runs before legacy UI handlers and never sends a message. */
(function () {
  'use strict';
  var PHONE = '8618058355198';
  var KEY = 'icp_pending_inquiry_v1';
  function clean(value) { return String(value || '').replace(/\s+/g, ' ').trim().slice(0, 220); }
  function page() {
    var canonical = document.querySelector('link[rel="canonical"]');
    return {title: clean(document.querySelector('h1') && document.querySelector('h1').textContent) || clean(document.title), url: canonical ? canonical.href : location.origin + location.pathname};
  }
  function whatsApp(a) {
    try { var u = new URL(a.href, location.href); return (u.hostname === 'wa.me' && u.pathname.replace(/\//g, '') === PHONE) || (u.hostname === 'api.whatsapp.com' && u.searchParams.get('phone') === PHONE); } catch (_) { return false; }
  }
  function context(control) {
    var p = page(), product = '', scope;
    if (control) {
      scope = control.closest('.home-product-card,.stock-example-grid figure,.product-card,.p-card,.grid-item,.gallery-card,.style-card,.kraft-card,.selected-product-v5,[data-icp-rfq-assist]');
      if (scope && scope.getAttribute('data-rfq-product')) product = clean(scope.getAttribute('data-rfq-product'));
      if (scope && !product) product = clean((scope.querySelector('h2,h3,h4,.p-title,.product-title,figcaption strong,.item-label h3') || {}).textContent);
      if (!product && control.closest('#stock-magnetic-boxes')) product = 'Stock foldable magnetic gift boxes';
    }
    return {page_title:p.title, source_page:p.url, source_product:product || p.title, inquiry_entry:clean(control && (control.getAttribute('data-inquiry-entry') || control.getAttribute('aria-label') || control.textContent)) || 'Inquiry form'};
  }
  function remember(c) { c.destination_page = page().url; try { sessionStorage.setItem(KEY, JSON.stringify(c)); } catch (_) {} }
  function pending() {
    try {
      var c = JSON.parse(sessionStorage.getItem(KEY));
      if (!c) return null;
      if (c.source_page === page().url) return c;
      // Carry another page's source only for an explicit inbound inquiry handoff.
      var inbound = new URLSearchParams(location.search).get('inquiry_source');
      if (location.hash === '#inquiry' && inbound === c.source_page && new URL(inbound).origin === location.origin) return c;
    } catch (_) {}
    return null;
  }
  function setField(form, name, value) {
    var input = form.querySelector('input[name="' + name + '"]');
    if (!input) { input = document.createElement('input'); input.type = 'hidden'; input.name = name; form.appendChild(input); }
    input.value = value;
  }
  function stamp(form, c) {
    if ((form.getAttribute('action') || '').indexOf('formspree.io/f/maeypklz') === -1) return;
    c = c || pending() || context(null);
    setField(form, '_subject', 'iColorPacks inquiry: ' + c.source_product);
    setField(form, 'source_page', c.source_page);
    setField(form, 'source_path', new URL(c.source_page).pathname);
    setField(form, 'source_title', c.page_title);
    setField(form, 'source_product', c.source_product);
    setField(form, 'inquiry_entry', c.inquiry_entry);
    setField(form, 'inquiry_form', form.getAttribute('name') || form.id || 'Packaging inquiry');
    setField(form, 'inquiry_context', 'Product: ' + c.source_product + '\nPage: ' + c.page_title + '\nSource: ' + c.source_page + '\nEntry: ' + c.inquiry_entry);
    var summary = form.querySelector('[data-inquiry-source-summary]');
    if (!summary) {
      summary = document.createElement('p'); summary.setAttribute('data-inquiry-source-summary', 'true');
      summary.style.cssText = 'grid-column:1/-1;margin:0 0 16px;padding:12px;border:1px solid #c9a84c66;border-radius:6px;color:#ead598;font:13px/1.6 Arial,sans-serif;text-transform:none;letter-spacing:normal;overflow-wrap:anywhere;';
      form.insertBefore(summary, form.firstChild);
    }
    summary.textContent = 'Inquiry about: ' + c.source_product + ' · Source: ' + c.source_page;
    form.setAttribute('data-inquiry-context-version', '20261024');
  }
  function enrich(a, c) {
    var u = new URL(a.href, location.href);
    var text = u.searchParams.get('text') || 'Hello Jennifer, I would like a packaging quotation.';
    text = text.split('\n\nWebsite inquiry details:')[0];
    // Static source metadata is a fallback; replace it with the live clicked-product context.
    text = text.split('\n\nWebsite source:')[0];
    text += '\n\nWebsite inquiry details:\nProduct: ' + c.source_product + '\nPage: ' + c.page_title + '\nSource: ' + c.source_page + '\nEntry: ' + c.inquiry_entry;
    u.searchParams.set('text', text);
    a.href = u.toString();
    a.setAttribute('data-inquiry-entry', c.inquiry_entry);
    a.setAttribute('data-inquiry-source-ready', 'true');
  }
  function isInquiry(control) {
    var href = control.getAttribute('href') || '', handler = control.getAttribute('onclick') || '';
    return /#(?:inquiry|quote)$/.test(href) || /toggleModal\s*\(/.test(handler) || control.matches('.icp-contact-quote,.icp-float-plus,.btn-quote-nav,[data-inquiry-trigger]');
  }
  function handle(event) {
    var control = event.target && event.target.closest && event.target.closest('a,button');
    if (!control) return;
    if (control.tagName === 'A' && whatsApp(control)) { enrich(control, context(control)); return; }
    if (!isInquiry(control) || control.matches('[type="submit"]')) return;
    var c = event.isTrusted === false && pending() ? pending() : context(control); remember(c);
    document.querySelectorAll('form[action*="formspree.io/f/maeypklz"]').forEach(function (form) { stamp(form, c); });
    // Preserve origin when an entry routes to the homepage inquiry form.
    var href = control.getAttribute('href') || '';
    if (href.charAt(0) === '/' && /#inquiry$/.test(href)) {
      var u = new URL(href, location.href); u.searchParams.set('inquiry_product', c.source_product); u.searchParams.set('inquiry_source', c.source_page); u.searchParams.set('inquiry_entry', c.inquiry_entry); control.href = u.toString();
    }
  }
  // Window capture runs before document capture and target handlers in legacy components.
  ['pointerdown', 'click', 'auxclick', 'contextmenu', 'focusin'].forEach(function (name) { window.addEventListener(name, handle, true); });
  window.addEventListener('keydown', function(event) { if(event.key === 'Enter' || event.key === ' ') handle(event); }, true);
  window.addEventListener('change', function(event) { var field = event.target; if(!field || !field.matches('select[name="product"],select[name="product_type"]') || !field.value || /not specified/i.test(field.value)) return; var c = context(field); c.source_product = clean(field.options[field.selectedIndex].textContent); remember(c); stamp(field.form, c); }, true);
  window.addEventListener('submit', function(event) { stamp(event.target); }, true);
  function initialize() {
    var params = new URLSearchParams(location.search), origin;
    try { origin = new URL(params.get('inquiry_source')); } catch (_) {}
    if (origin && origin.origin === location.origin && params.get('inquiry_product')) remember({source_page:origin.origin + origin.pathname, page_title:params.get('inquiry_product'), source_product:params.get('inquiry_product'), inquiry_entry:params.get('inquiry_entry') || 'Product page inquiry'});
    document.querySelectorAll('a[href]').forEach(function(a) { if(whatsApp(a)) enrich(a, context(a)); });
    document.querySelectorAll('form[action*="formspree.io/f/maeypklz"]').forEach(function(form) { stamp(form); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize); else initialize();
  // Legacy components create their controls on load. Refresh hrefs once after they finish.
  window.addEventListener('load', initialize);
}());
