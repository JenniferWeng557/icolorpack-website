(function () {
  'use strict';

  var measurementId = 'G-MQY10GFCR8';
  var formEndpoint = 'formspree.io/f/maeypklz';

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

  if (!document.querySelector('script[data-icp-ga4]')) {
    var gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
    gaScript.setAttribute('data-icp-ga4', 'true');
    document.head.appendChild(gaScript);
  }

  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    send_page_view: true,
    transport_type: 'beacon'
  });

  function pageType() {
    var path = window.location.pathname;
    if (path === '/' || path === '/index.html') return 'home';
    if (path.indexOf('/product-') === 0) return 'product_category';
    if (path.indexOf('/custom-') === 0) return 'product_detail';
    if (path.indexOf('/packaging-for-') === 0) return 'industry';
    if (path.indexOf('/blog/') === 0) return 'article';
    if (path === '/blog' || path === '/blog.html') return 'blog_index';
    return 'resource';
  }

  function formLabel(form, index) {
    return form.getAttribute('name') || form.getAttribute('id') || ('form_' + (index + 1));
  }

  function formIsInquiry(form) {
    return (form.getAttribute('action') || '').indexOf(formEndpoint) !== -1;
  }

  function addHoneypot(form) {
    if (form.querySelector('input[name="_gotcha"]')) return;
    var wrapper = document.createElement('div');
    wrapper.setAttribute('aria-hidden', 'true');
    wrapper.style.cssText = 'position:absolute!important;left:-10000px!important;width:1px!important;height:1px!important;overflow:hidden!important;';
    var input = document.createElement('input');
    input.type = 'text';
    input.name = '_gotcha';
    input.tabIndex = -1;
    input.autocomplete = 'off';
    wrapper.appendChild(input);
    form.appendChild(wrapper);
  }

  function addHiddenField(form, name, value) {
    if (!value || form.querySelector('input[name="' + name + '"]')) return;
    var input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    form.appendChild(input);
  }

  function addLeadContext(form) {
    var params = new URLSearchParams(window.location.search);
    addHiddenField(form, 'source_page', window.location.href);
    addHiddenField(form, 'source_path', window.location.pathname);
    addHiddenField(form, 'source_referrer', document.referrer);
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(function (name) {
      addHiddenField(form, name, params.get(name));
    });
  }

  // This form's current plan does not support file uploads. Keep inquiries
  // sendable and explain the separate attachment channel before submission.
  function replaceUnsupportedUploads(form) {
    Array.prototype.forEach.call(form.querySelectorAll('input[type="file"]'), function (input) {
      var upload = input.closest('.luxo-file-upload');
      var group = input.closest('.luxo-group, .form-group');
      input.disabled = true;
      input.remove();
      var notice = document.createElement('div');
      notice.setAttribute('data-attachment-alternative', 'true');
      notice.style.cssText = 'font-size:13px;line-height:1.7;color:#b8b8c4;';
      var message = document.createElement('p');
      message.textContent = 'Submit your request first. Then send your logo or reference files via WhatsApp or email, using the same name and contact details.';
      notice.appendChild(message);
      var wa = document.createElement('a');
      wa.href = 'https://wa.me/8618058355198';
      wa.target = '_blank';
      wa.rel = 'noopener';
      wa.textContent = 'Send files on WhatsApp';
      wa.style.color = '#c9a84c';
      notice.appendChild(wa);
      notice.appendChild(document.createTextNode(' or '));
      var email = document.createElement('a');
      email.href = 'mailto:jennifer@icolorpacks.com?subject=Packaging%20inquiry%20attachments';
      email.textContent = 'Email files';
      email.style.color = '#c9a84c';
      notice.appendChild(email);
      var label = group && group.querySelector('label');
      if (label) label.textContent = 'Logo / reference files — send separately';
      if (upload) upload.replaceWith(notice);
      else form.appendChild(notice);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    window.gtag('event', 'page_context', {
      page_type: pageType(),
      page_path: window.location.pathname,
      event_category: 'engagement',
      non_interaction: true
    });

    if (window.location.pathname === '/thank-you' || window.location.pathname === '/thank-you.html') {
      var completedLead = sessionStorage.getItem('icp_lead_completed');
      if (completedLead) {
        try {
          var leadContext = JSON.parse(completedLead);
          window.gtag('event', 'generate_lead', {
            lead_source: 'website_form',
            form_id: leadContext.form_id,
            page_type: leadContext.page_type,
            source_path: leadContext.page_path,
            page_path: window.location.pathname,
            transport_type: 'beacon'
          });
        } catch (ignore) {
          window.gtag('event', 'generate_lead', {
            lead_source: 'website_form',
            page_path: window.location.pathname,
            transport_type: 'beacon'
          });
        }
        sessionStorage.removeItem('icp_lead_completed');
      }
    }

    Array.prototype.forEach.call(document.forms, function (form, index) {
      if (!formIsInquiry(form)) return;
      addHoneypot(form);
      addLeadContext(form);
      replaceUnsupportedUploads(form);

      Array.prototype.forEach.call(form.querySelectorAll('input[type="file"]'), function (input) {
        input.addEventListener('change', function () {
          if (!input.files || !input.files.length) return;
          window.gtag('event', 'file_upload', {
            form_id: formLabel(form, index),
            file_count: input.files.length,
            page_type: pageType(),
            page_path: window.location.pathname
          });
        });
      });

      var started = false;
      form.addEventListener('focusin', function () {
        if (started) return;
        started = true;
        window.gtag('event', 'form_start', {
          form_id: formLabel(form, index),
          form_destination: form.getAttribute('action'),
          page_type: pageType()
        });
      });

      form.addEventListener('submit', function (event) {
        event.preventDefault();

        var submitButton = form.querySelector('[type="submit"]');
        var originalText = submitButton ? submitButton.textContent : '';
        var status = form.querySelector('[data-form-status]');
        if (!status) {
          status = document.createElement('p');
          status.setAttribute('data-form-status', 'true');
          status.setAttribute('role', 'status');
          status.style.cssText = 'grid-column:1/-1;margin:12px 0 0;color:#c9a84c;font-size:14px;';
          form.appendChild(status);
        }

        if (submitButton) {
          submitButton.disabled = true;
          submitButton.textContent = 'Sending...';
        }
        status.textContent = '';

        var submission = new FormData(form);
        // Also omit empty file entries or file controls injected after load.
        var fileFields = [];
        submission.forEach(function (value, name) {
          if (typeof File !== 'undefined' && value instanceof File) fileFields.push(name);
        });
        fileFields.forEach(function (name) { submission.delete(name); });
        fetch(form.action, {
          method: 'POST',
          body: submission,
          headers: { Accept: 'application/json' }
        }).then(function (response) {
          if (!response.ok) throw new Error('Form submission failed');
          window.gtag('event', 'form_submit', {
            form_id: formLabel(form, index),
            form_destination: form.getAttribute('action'),
            page_type: pageType(),
            page_path: window.location.pathname,
            transport_type: 'beacon'
          });
          sessionStorage.setItem('icp_lead_completed', JSON.stringify({
            form_id: formLabel(form, index),
            page_type: pageType(),
            page_path: window.location.pathname
          }));
          window.location.assign('/thank-you');
        }).catch(function () {
          status.textContent = 'Your message could not be sent. Please try again or contact us on WhatsApp.';
          if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
          }
        });
      });
    });

    document.addEventListener('click', function (event) {
      var link = event.target.closest && event.target.closest('a[href]');
      if (!link) return;
      var href = link.getAttribute('href') || '';

      if (/^(https?:\/\/)?(wa\.me\/|api\.whatsapp\.com\/|web\.whatsapp\.com\/)/i.test(href)) {
        window.gtag('event', 'whatsapp_click', {
          contact_method: 'whatsapp',
          link_url: link.href,
          link_text: (link.textContent || '').trim().slice(0, 100),
          page_type: pageType(),
          transport_type: 'beacon'
        });
        window.gtag('event', 'contact', {
          method: 'whatsapp',
          page_type: pageType(),
          page_path: window.location.pathname,
          transport_type: 'beacon'
        });
      } else if (/^mailto:/i.test(href)) {
        window.gtag('event', 'email_click', {
          contact_method: 'email',
          page_type: pageType(),
          transport_type: 'beacon'
        });
        window.gtag('event', 'contact', {
          method: 'email',
          page_type: pageType(),
          page_path: window.location.pathname,
          transport_type: 'beacon'
        });
      } else if (href === '#inquiry' || href === '/#inquiry' || /(^|\s)(quote|inquiry)(\s|$)/i.test(link.className || '')) {
        window.gtag('event', 'quote_click', {
          link_text: (link.textContent || '').trim().slice(0, 100),
          page_type: pageType(),
          page_path: window.location.pathname,
          transport_type: 'beacon'
        });
      }
    }, true);
  });
}());

// Approved logo-only update, 2026-10-15. Existing form and analytics code above is preserved.
(function () {
  'use strict';
  function start() {
    if (document.getElementById('icp-logo-review-style')) return;
    var style = document.createElement('style');
    style.id = 'icp-logo-review-style';
    style.textContent = '.icp-review-logo-slot{position:relative;display:inline-block;flex-shrink:0;vertical-align:middle}.icp-review-logo-crop{position:absolute;display:block;width:40px;height:40px;left:50%;top:50%;transform:translate(-50%,-50%);overflow:hidden}.icp-review-logo-crop .icp-review-logo-image{position:absolute!important;width:136px!important;height:136px!important;max-width:none!important;left:-48px!important;top:-39.36px!important;margin:0!important;object-fit:fill!important}.logo-wrapper[data-icp-logo-review] > span:not(.icp-review-logo-slot){font-family:Montserrat,sans-serif!important;color:#fff!important;font-size:20px!important;letter-spacing:3px!important;font-weight:700!important}@media(max-width:768px){.icp-review-logo-crop{width:34px;height:34px}.icp-review-logo-crop .icp-review-logo-image{width:115.6px!important;height:115.6px!important;left:-40.8px!important;top:-33.46px!important}.logo-wrapper[data-icp-logo-review] > span:not(.icp-review-logo-slot){font-size:19px!important;letter-spacing:1px!important}}';
    document.head.appendChild(style);
    document.querySelectorAll('nav a.logo, nav a.logo-wrapper, header a.brand, header a.icp-mobile-logo-text').forEach(function (brand) {
      if (brand.closest('footer')) return;
      var image = brand.querySelector('img');
      var oldSvg = brand.querySelector('svg');
      if (!image && oldSvg) {
        var size = getComputedStyle(oldSvg);
        image = document.createElement('img');
        image.src = '/images/A94ddad755cf74f0d93ee51ab0229ac3ac.webp';
        image.alt = 'iColorPacks logo';
        image.style.width = size.width;
        image.style.height = size.height;
        if (oldSvg.classList.contains('icp-mobile-logo-img')) image.className = 'icp-mobile-logo-img';
        oldSvg.replaceWith(image);
      }
      if (!image) return;
      var computed = getComputedStyle(image);
      var slot = document.createElement('span');
      slot.className = 'icp-review-logo-slot';
      slot.style.width = computed.width;
      slot.style.height = computed.height;
      slot.style.marginLeft = computed.marginLeft;
      slot.style.marginRight = computed.marginRight;
      var crop = document.createElement('span');
      crop.className = 'icp-review-logo-crop';
      image.replaceWith(slot);
      slot.appendChild(crop);
      crop.appendChild(image);
      image.src = '/images/A94ddad755cf74f0d93ee51ab0229ac3ac.webp';
      brand.setAttribute('data-icp-logo-review', 'true');
      image.classList.add('icp-review-logo-image');
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
}());


// Unified approved logo and floating contact controls. 2026-10-15.
(function () {
  'use strict';
  if (window.icpUnifiedBrandV2) return;
  window.icpUnifiedBrandV2 = true;
  var source = '/images/A94ddad755cf74f0d93ee51ab0229ac3ac.webp';
  var selectors = 'nav a.logo,nav a.logo-wrapper,header a.brand,header a.icp-mobile-logo-text';
  function start() {
    // Keep the legacy guard: older preview scripts must not replace this mark.
    var legacyStyle = document.getElementById('icp-logo-review-style');
    if (!legacyStyle) { legacyStyle = document.createElement('style'); legacyStyle.id = 'icp-logo-review-style'; document.head.appendChild(legacyStyle); }
    legacyStyle.textContent = '';
    var style = document.createElement('style');style.id = 'icp-unified-brand-v2-style';
    style.textContent = '[data-icp-brand-v2]{display:inline-flex!important;align-items:center!important;white-space:nowrap!important}' +
      '.icp-brand-slot-v2{display:inline-block!important;position:relative!important;flex:none!important;width:40px!important;height:40px!important;margin:0 12px 0 0!important;vertical-align:middle!important}' +
      '.icp-brand-crop-v2{display:block!important;position:absolute!important;left:50%!important;top:50%!important;transform:translate(-50%,-50%)!important;overflow:hidden!important;width:40px!important;height:40px!important}' +
      '.icp-brand-crop-v2>img{display:block!important;position:absolute!important;left:-48px!important;top:-39.36px!important;width:136px!important;height:136px!important;max-width:none!important;max-height:none!important;margin:0!important;padding:0!important;object-fit:fill!important;transform:none!important;border:0!important;border-radius:0!important}' +
      '.logo-wrapper[data-icp-brand-v2]>span:not(.icp-brand-slot-v2){font-family:Montserrat,Arial,sans-serif!important;font-size:20px!important;font-weight:700!important;color:#fff!important;letter-spacing:3px!important}' +
      '.icp-brand-fallback-v2{position:fixed;top:0;left:0;width:100%;height:80px;display:flex;align-items:center;padding:0 8%;background:#0a0a0f;z-index:1000;border-bottom:1px solid #ffffff0d}.icp-brand-fallback-v2>.brand{color:#fff;text-decoration:none;font-size:20px;font-weight:700;letter-spacing:3px}' +
      '@media(max-width:768px){.icp-brand-slot-v2{width:32px!important;height:32px!important;margin-right:8px!important}.icp-brand-crop-v2{width:34px!important;height:34px!important}.icp-brand-crop-v2>img{width:115.6px!important;height:115.6px!important;left:-40.8px!important;top:-33.46px!important}.logo-wrapper[data-icp-brand-v2]>span:not(.icp-brand-slot-v2){font-size:19px!important;letter-spacing:1px!important}}';
    document.head.appendChild(style);
    if (/^\/blog\/custom-gift-boxes-wholesale-guide(?:\.html)?\/?$/.test(location.pathname) && !document.querySelector(selectors)) {
      var header=document.createElement('header');header.className='icp-brand-fallback-v2';
      var link=document.createElement('a');link.className='brand';link.href='/';link.textContent='iColorPacks';header.appendChild(link);document.body.insertBefore(header,document.body.firstChild);
    }
    function refresh() {
      document.querySelectorAll(selectors).forEach(function (brand) {
        if (brand.closest('footer') || brand.hasAttribute('data-icp-brand-v2')) return;
        var old = brand.querySelector('.icp-review-logo-slot,img,svg');
        var slot = document.createElement('span');slot.className='icp-brand-slot-v2';slot.setAttribute('aria-hidden','true');
        var crop = document.createElement('span');crop.className='icp-brand-crop-v2';
        var image = document.createElement('img');image.src=source;image.alt='';image.width=136;image.height=136;
        crop.appendChild(image);slot.appendChild(crop);
        if (old) old.replaceWith(slot);else brand.insertBefore(slot,brand.firstChild);
        brand.setAttribute('data-icp-brand-v2','true');
        if (!brand.hasAttribute('aria-label')) brand.setAttribute('aria-label','iColorPacks home');
      });
    }
    refresh();
    // Covers delayed legacy/mobile header injection without changing links or copy.
    new MutationObserver(refresh).observe(document.body,{childList:true,subtree:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
}());

(function () {
  'use strict';
  function start() {
    if (document.getElementById('icp-contact-review')) return;
    var home = /^\/(?:index(?:\.html)?)?$/.test(location.pathname);
    var legacy = '.icp-floating-actions,.icp-floating-actions-left,.floating-whatsapp,.floating-quote-container,.floating-quote,.wa-float,.float-whatsapp,.whatsapp-float,.rollback-floating-quote,.icp-mobile-sticky-cta,.icp-m-footer,.icp-float-whatsapp,.icp-float-plus';
    var originalWA = document.querySelector('.icp-float-whatsapp[href],.float-whatsapp[href],.floating-whatsapp[href],.wa-float[href]');
    var waURL = originalWA ? originalWA.href : 'https://wa.me/8618058355198?text=Hello%20iColorPacks%2C%20I%20would%20like%20to%20request%20a%20custom%20packaging%20quote.';
    var modal = document.querySelector('#inquiryModal');
    var inlineForm = Array.prototype.find.call(document.forms, function (form) {
      return (form.getAttribute('action') || '').indexOf('formspree.io/f/maeypklz') !== -1 && !form.closest('.modal,[role="dialog"]');
    });
    var style = document.createElement('style');
    style.id = 'icp-contact-review-style';
    style.textContent = legacy.split(',').map(function (selector) { return 'html[data-icp-contact-review] ' + selector; }).join(',') + '{display:none!important}' +
      '#icp-contact-review{font-family:Arial,sans-serif;z-index:10000;pointer-events:none}' +
      '#icp-contact-review a{box-sizing:border-box;pointer-events:auto;display:flex;align-items:center;justify-content:center;text-decoration:none!important;border:0;font-weight:700;line-height:1.2;letter-spacing:0;text-transform:none;cursor:pointer}' +
      '#icp-contact-review[data-suspended="true"]{display:none!important}' +
      '#icp-contact-review a:focus-visible{outline:3px solid #fff;outline-offset:4px}' +
      '#icp-contact-review .icp-contact-wa{background:#20cd68;color:#07150b}' +
      '#icp-contact-review .icp-contact-quote{background:#d5b455;color:#111}' +
      '#icp-contact-review:not(.icp-contact-home){position:fixed;right:24px;bottom:max(24px,env(safe-area-inset-bottom));display:flex;gap:10px;padding:8px;border:1px solid rgba(213,180,85,.4);border-radius:40px;background:#111116;box-shadow:0 5px 24px #0005}' +
      '#icp-contact-review:not(.icp-contact-home) a{min-width:108px;min-height:46px;padding:0 18px;border-radius:30px;font-size:14px}' +
      '#icp-contact-review .icp-contact-glyph{width:32px;height:32px;fill:#fff}' +
      '#icp-contact-review.icp-contact-home>a{position:fixed;bottom:40px;width:60px;height:60px;border-radius:50%;box-shadow:0 8px 24px #0005}' +
      '#icp-contact-review.icp-contact-home>.icp-contact-wa{right:40px}' +
      '#icp-contact-review.icp-contact-home>.icp-contact-quote{left:40px;font-size:38px}' +
      '#icp-contact-review .icp-contact-tip{position:absolute;white-space:nowrap;border-radius:18px;padding:10px 15px;font-size:14px;background:inherit;color:inherit;opacity:0;visibility:hidden;pointer-events:none;transition:opacity .15s}' +
      '#icp-contact-review .icp-contact-wa .icp-contact-tip{right:75px}' +
      '#icp-contact-review .icp-contact-quote .icp-contact-tip{left:75px}' +
      '#icp-contact-review a:hover .icp-contact-tip,#icp-contact-review a:focus-visible .icp-contact-tip{opacity:1;visibility:visible}' +
      '#icp-contact-review .icp-contact-mobile-label{display:none}' +
      '@media(max-width:768px){#icp-contact-review:not(.icp-contact-home){right:16px;bottom:max(16px,env(safe-area-inset-bottom));padding:7px;gap:8px}#icp-contact-review:not(.icp-contact-home) a{min-width:104px;min-height:46px;padding:0 15px}#icp-contact-review.icp-contact-home>a{bottom:38px;width:54px;height:54px}#icp-contact-review.icp-contact-home>.icp-contact-wa{right:20px}#icp-contact-review.icp-contact-home>.icp-contact-quote{left:20px}#icp-contact-review .icp-contact-tip{display:none}#icp-contact-review .icp-contact-mobile-label{display:block;position:absolute;top:60px;font-size:11px;white-space:nowrap;line-height:14px;color:#fff;text-shadow:0 1px 3px #000}}';
    document.head.appendChild(style);
    var root = document.createElement('div');
    root.id = 'icp-contact-review';
    if (home) root.className = 'icp-contact-home';
    root.setAttribute('role', 'group');
    root.setAttribute('aria-label', 'Contact iColorPacks');
    var wa = document.createElement('a');
    wa.className = 'icp-contact-wa';
    wa.href = waURL;wa.target = '_blank';wa.rel = 'noopener';
    wa.setAttribute('aria-label', home ? 'Get a free quote on WhatsApp' : 'Chat on WhatsApp');
    var quote = document.createElement('a');
    quote.className = 'icp-contact-quote quote';
    quote.href = modal || inlineForm ? '#inquiry' : '/#inquiry';
    quote.setAttribute('aria-label', home ? 'Customize your packaging' : 'Get a quote using the inquiry form');
    if (home) {
      var icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      icon.setAttribute('viewBox', '0 0 24 24');icon.classList.add('icp-contact-glyph');icon.setAttribute('aria-hidden', 'true');
      var shape = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      shape.setAttribute('d','M12 2a10 10 0 0 0-8.7 15l-1.4 5 5.2-1.4A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4-1.1l-.4-.2-3 .8.8-2.9-.3-.4A8 8 0 1 1 12 20zm4.6-5.9c-.3-.2-1.7-.9-2-.9-.3-.1-.4-.2-.6.1l-.8 1c-.1.2-.3.2-.6.1-1.5-.6-2.5-1.6-3.2-2.9-.2-.3 0-.4.1-.6l.5-.6c.1-.2.1-.4 0-.6l-.8-1.9c-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.5.1-.7.3-.7.7-1 1.4-1 2.2 0 1.3.9 2.6 1.1 2.8.1.2 1.8 2.9 4.5 4 .6.3 1.1.4 1.5.5.6.2 1.2.2 1.7.1.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.2-1.2-.1-.2-.2-.3-.4-.4z');
      icon.appendChild(shape);wa.appendChild(icon);
      function label(parent,text,cls){var span=document.createElement('span');span.className=cls;span.textContent=text;parent.appendChild(span);}
      label(wa,'Get a free quote!','icp-contact-tip');label(wa,'WhatsApp','icp-contact-mobile-label');
      quote.appendChild(document.createTextNode('+'));
      label(quote,'Customize your packaging!','icp-contact-tip');label(quote,'Customize','icp-contact-mobile-label');
    } else {wa.textContent='WhatsApp';quote.textContent='Get Quote';}
    root.appendChild(wa);root.appendChild(quote);document.body.appendChild(root);
    document.documentElement.setAttribute('data-icp-contact-review','true');
    function visible(el){return el && getComputedStyle(el).display !== 'none' && getComputedStyle(el).visibility !== 'hidden' && el.getClientRects().length;}
    function suspend(){
      var open=Array.prototype.some.call(document.querySelectorAll('#inquiryModal,.modal,[role="dialog"]'),visible);
      var focused=document.activeElement;
      var editing=focused && /^(INPUT|TEXTAREA|SELECT)$/.test(focused.tagName) && focused.closest('form');
      root.setAttribute('data-suspended',open||editing?'true':'false');
    }
    quote.addEventListener('click',function(event){
      if(modal && modal.querySelector('form') && typeof window.toggleModal==='function'){
        event.preventDefault();if(!visible(modal))window.toggleModal();suspend();return;
      }
      if(inlineForm){event.preventDefault();inlineForm.scrollIntoView({behavior:'auto',block:'center'});var first=inlineForm.querySelector('input:not([type="hidden"]),textarea,select');if(first)first.focus({preventScroll:true});suspend();}
    });
    // Preserve an existing product-specific floating WhatsApp message even if
    // a legacy component finishes loading after this review script.
    function keepOriginalMessage(){
      var candidate=document.querySelector('.icp-float-whatsapp[href],.float-whatsapp[href],.floating-whatsapp[href],.wa-float[href]');
      if(candidate && wa.href!==candidate.href)wa.href=candidate.href;
      suspend();
    }
    document.addEventListener('focusin',suspend);document.addEventListener('focusout',function(){setTimeout(suspend,0);});
    new MutationObserver(keepOriginalMessage).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class','style']});
    keepOriginalMessage();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
}());

