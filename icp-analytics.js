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
    var legacy = '.icp-floating-actions,.icp-floating-actions-left,.floating-whatsapp,.floating-quote-container,.floating-quote,.wa-float,.float-whatsapp,.whatsapp-float,.rollback-floating-quote,.icp-mobile-sticky-cta,.icp-m-footer,.icp-float-whatsapp,.icp-float-plus,.floating-wa';
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


// Scoped footer and inquiry repairs. No form submission or analytics changes.
(function () {
  'use strict';
  function start() {
    if (document.getElementById('icp-footer-inquiry-v3-style')) return;
    if(document.querySelector('.industry-guide')||/^\/packaging-for-/.test(location.pathname))document.documentElement.setAttribute('data-icp-industry-v3','true');
    var style = document.createElement('style');
    style.id = 'icp-footer-inquiry-v3-style';
    style.textContent = '#inquiryModal.modal.active,#inquiryModal.modal.is-active{display:flex!important;overflow-y:auto}' +
      '#inquiryModal .modal-content{max-height:calc(100dvh - 40px);overflow-y:auto}' +
      'html[data-icp-industry-v3] .luxo-form{grid-template-columns:repeat(2,minmax(0,1fr));box-sizing:border-box;max-width:100%}' +
      'html[data-icp-industry-v3] .luxo-form>*,html[data-icp-industry-v3] .luxo-form input,html[data-icp-industry-v3] .luxo-form textarea{min-width:0;max-width:100%;box-sizing:border-box}' +
      'html[data-icp-industry-v3] .luxo-form .btn-submit{grid-column:1/-1}' +
      '.icp-table-scroll-v3{overflow-x:auto;max-width:100%;min-width:0}' +
      '@media(max-width:768px){html[data-icp-industry-v3] .luxo-form{grid-template-columns:minmax(0,1fr)!important}html[data-icp-industry-v3] .luxo-form>.full{grid-column:1/-1!important}}' +
      '[data-icp-product-footer]{box-sizing:border-box;clear:both;color:#b8b8c4;max-width:1440px;text-align:left;margin:24px auto 0;padding:24px 0}' +
      '[data-icp-product-footer] h2,[data-icp-product-footer] h3,[data-icp-product-footer] h4{font-family:inherit!important;font-size:12px!important;line-height:1.5!important;color:#c9a84c!important;letter-spacing:1.5px!important;margin:0 0 14px!important;text-transform:uppercase}' +
      '.icp-footer-product-links-v3{display:flex;flex-wrap:wrap;gap:8px 24px;list-style:none!important;padding:0!important;margin:0!important}' +
      '.icp-footer-product-links-v3 li{list-style:none!important;padding:0!important;margin:0!important}' +
      '.icp-footer-product-links-v3 a{display:inline-block!important;font-size:13px!important;line-height:1.8!important;letter-spacing:0!important;text-transform:none!important;color:#b8b8c4!important;text-decoration:none!important;padding:0!important;overflow-wrap:anywhere}' +
      '.icp-footer-product-links-v3 a:hover{color:#e8c97a!important;text-decoration:underline!important}' +
      '[data-icp-back-top]{position:static!important;display:inline-block!important;width:auto!important;min-height:42px!important;margin:18px 0 0!important;padding:9px 16px!important;background:transparent!important;color:#c9a84c!important;border:1px solid #c9a84c!important;border-radius:4px!important;font:13px/1.5 Arial,sans-serif!important;letter-spacing:0!important;cursor:pointer!important}' +
      '[data-icp-back-top]:focus-visible,.icp-footer-product-links-v3 a:focus-visible{outline:2px solid #e8c97a;outline-offset:4px}' +
      '.icp-footer-home-slot-v3{margin:0!important;padding:0!important;clear:none!important}.icp-footer-home-slot-v3 .icp-footer-product-links-v3{flex-direction:column;gap:5px}' +
      '@media(max-width:768px){footer .footer-grid{grid-template-columns:minmax(0,1fr)!important;gap:28px!important}footer .footer-col{min-width:0!important;max-width:100%!important}footer .footer-links a{overflow-wrap:anywhere}}' +
      '@media(max-width:600px){[data-icp-product-footer]{padding:24px 16px}.icp-footer-home-slot-v3{padding:0!important}.icp-footer-product-links-v3{gap:8px 18px}}';
    document.head.appendChild(style);
    if(document.documentElement.hasAttribute('data-icp-industry-v3'))document.querySelectorAll('.seo-content table').forEach(function(table){if(table.closest('.industry-table-wrap,.icp-table-scroll-v3'))return;var wrap=document.createElement('div');wrap.className='icp-table-scroll-v3';wrap.setAttribute('role','region');wrap.setAttribute('aria-label','Scrollable packaging specifications');wrap.tabIndex=0;table.parentNode.insertBefore(wrap,table);wrap.appendChild(table);});
    var footer = document.querySelector('footer');
    if (!footer) { footer = document.createElement('footer'); footer.style.padding='32px 6% 110px';document.body.appendChild(footer); }
    if (!footer.querySelector('[data-icp-product-footer]')) {
      var categories=[['Rigid Gift Boxes','/product-rigid-boxes'],['Paper Bags','/product-paper-bags'],['Cake & Bakery Boxes','/product-cake-boxes'],['Mailer Boxes','/product-mailer-boxes'],['Kraft Paper Bags','/product-kraft-bags']];
      var groups=Array.prototype.slice.call(footer.querySelectorAll('.footer-col,.footer-column'));
      var existing=groups.find(function(group){return categories.filter(function(item){return Array.prototype.some.call(group.querySelectorAll('a[href]'),function(a){return new URL(a.href,location.href).pathname.replace(/\.html$/,'')===item[1];});}).length>=2;});
      var block=existing||document.createElement('div');block.setAttribute('data-icp-product-footer','true');
      var links=existing&&existing.querySelector('ul,.footer-links');
      if(!existing){var title=document.createElement('h2');title.textContent='Product Categories';block.appendChild(title);}
      if(!links){links=document.createElement('div');block.appendChild(links);}
      links.classList.add('icp-footer-product-links-v3');links.setAttribute('role','navigation');links.setAttribute('aria-label','Footer product categories');
      categories.forEach(function(item){var found=Array.prototype.some.call(links.querySelectorAll('a[href]'),function(a){return new URL(a.href,location.href).pathname.replace(/\.html$/,'')===item[1];});if(found)return;var a=document.createElement('a');a.href=item[1];a.textContent=item[0];if(links.tagName==='UL'){var li=document.createElement('li');li.appendChild(a);links.appendChild(li);}else links.appendChild(a);});
      var button=document.createElement('button');button.type='button';button.textContent='↑ Back to top';button.setAttribute('data-icp-back-top','true');button.setAttribute('aria-label','Back to top of page');button.addEventListener('click',function(){window.scrollTo({top:0,left:0,behavior:'instant'});});block.appendChild(button);
      if(!existing){var grid=footer.querySelector('.footer-grid');if(footer.id==='contact-info'&&grid&&grid.children.length===2){block.classList.add('icp-footer-home-slot-v3');grid.appendChild(block);}else{var copyright=footer.querySelector('.copyright');if(copyright&&copyright.parentElement===footer)footer.insertBefore(block,copyright);else footer.appendChild(block);}}
    }
    // Pages without an embedded form already link to /#inquiry. Open that existing home form on arrival.
    var homeUserDismissed=false;
    function openHomeInquiry(){
      if(homeUserDismissed)return;
      if(!/^\/(?:index(?:\.html)?)?$/.test(location.pathname)||location.hash!=='#inquiry')return;
      var homeModal=document.querySelector('#inquiryModal');if(!homeModal||!homeModal.querySelector('form'))return;
      homeModal.classList.add('active');homeModal.setAttribute('role','dialog');homeModal.setAttribute('aria-modal','true');homeModal.removeAttribute('aria-hidden');
      var field=homeModal.querySelector('form input:not([type="hidden"]):not([type="file"]),form textarea');if(field)field.focus({preventScroll:true});
    }
    openHomeInquiry();window.addEventListener('hashchange',openHomeInquiry);window.addEventListener('load',function(){setTimeout(openHomeInquiry,0);});
    if(/^\/(?:index(?:\.html)?)?$/.test(location.pathname)&&location.hash==='#inquiry')setTimeout(openHomeInquiry,80);
    // Capture only explicit inquiry controls, never a submit button or WhatsApp link.
    function closeInquiry(){var dialog=document.querySelector('#inquiryModal');if(!dialog)return;homeUserDismissed=true;if(document.activeElement&&dialog.contains(document.activeElement))document.activeElement.blur();dialog.classList.remove('active','is-active');dialog.style.removeProperty('display');dialog.setAttribute('aria-hidden','true');}
    document.querySelectorAll('#inquiryModal .close-modal').forEach(function(close){close.setAttribute('role','button');close.tabIndex=0;close.setAttribute('aria-label','Close inquiry form');});
    document.addEventListener('keydown',function(event){if(event.key==='Escape'){closeInquiry();}else if((event.key==='Enter'||event.key===' ')&&event.target.matches('#inquiryModal .close-modal')){event.preventDefault();closeInquiry();}});
    document.addEventListener('click',function(event){
      if(event.target.closest('#inquiryModal .close-modal')){event.preventDefault();event.stopImmediatePropagation();closeInquiry();return;}
      if(!document.documentElement.hasAttribute('data-icp-industry-v3'))return;
      var control=event.target.closest('a,button');if(!control||control.matches('[type="submit"],[data-icp-back-top]')||control.closest('form'))return;
      var href=control.getAttribute('href')||'',handler=control.getAttribute('onclick')||'';
      if(/wa\.me|whatsapp|mailto:/i.test(href))return;
      var explicit=control.matches('.icp-contact-quote,.btn-quote-nav,.icp-float-plus')||/toggleModal\s*\(/.test(handler)||href==='#inquiry'||href==='#quote';
      if(!explicit)return;
      var forms=Array.prototype.slice.call(document.forms).filter(function(form){return (form.getAttribute('action')||'').indexOf('formspree.io/f/maeypklz')!==-1;});
      var inline=forms.find(function(form){return !form.closest('.modal,[role="dialog"]');});
      var modal=document.querySelector('#inquiryModal');
      if(!inline&&!(modal&&modal.querySelector('form')))return;
      event.preventDefault();event.stopImmediatePropagation();
      var target=inline;
      if(inline){inline.hidden=false;if(getComputedStyle(inline).display==='none')inline.style.setProperty('display','grid','important');}
      else {modal.classList.add('active');modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');modal.removeAttribute('aria-hidden');target=modal.querySelector('form');}
      target.scrollIntoView({behavior:'instant',block:'center'});var field=target.querySelector('input:not([type="hidden"]):not([type="file"]),textarea,select');if(field)field.focus({preventScroll:true});
      var contact=document.querySelector('#icp-contact-review');if(contact)contact.setAttribute('data-suspended','true');
    },true);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
}());

(function(){function start(){if(document.querySelector(".industry-guide")||/^\/packaging-for-/.test(location.pathname))document.documentElement.setAttribute("data-icp-industry-v3","true");var s=document.createElement("style");s.id="icp-layout-v3";s.textContent="/* Frame-only corrections: source image bytes and article content are unchanged. */\n.home-product-media{aspect-ratio:1/1!important}\n.home-product-card,.home-product-body{min-width:0}\n.home-product-body h3,.home-product-use{overflow-wrap:break-word}\nhtml[data-icp-industry-v3] .section-container{box-sizing:border-box;width:calc(100% - 96px)!important;max-width:1600px!important;padding:64px 0!important;margin:0 auto!important}\nhtml[data-icp-industry-v3] .visual-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:32px!important;align-items:start!important}\nhtml[data-icp-industry-v3] .visual-grid>.grid-item{box-sizing:border-box;min-width:0!important;aspect-ratio:auto!important;height:auto!important;overflow:hidden!important;display:flex!important;flex-direction:column!important}\nhtml[data-icp-industry-v3] .grid-item>img{display:block!important;width:100%!important;height:auto!important;max-width:100%!important;object-fit:contain!important;transform:none!important;aspect-ratio:auto!important}\nhtml[data-icp-industry-v3] .item-label{position:static!important;inset:auto!important;box-sizing:border-box!important;width:100%!important;max-width:100%!important;padding:18px 22px!important;background:#111219!important;flex:1 1 auto!important}\nhtml[data-icp-industry-v3] .item-label h3,html[data-icp-industry-v3] .item-label p{white-space:normal!important;overflow-wrap:anywhere!important;max-width:100%!important;line-height:1.6!important;letter-spacing:1px!important}\nhtml[data-icp-industry-v3] .item-label h3{font-size:14px!important;margin:0 0 6px!important}\nhtml[data-icp-industry-v3] .item-label p{font-size:13px!important;margin:0!important}\nhtml[data-icp-industry-v3] .industry-block{box-sizing:border-box!important;padding:64px max(32px,6vw)!important}\nhtml[data-icp-industry-v3] .industry-wrap{max-width:1440px!important;width:100%!important;min-width:0!important}\nhtml[data-icp-industry-v3] .industry-wrap>*{min-width:0}\nhtml[data-icp-industry-v3] nav.icp-responsive-nav,html[data-icp-industry-v3] body>nav{box-sizing:border-box!important;max-width:100%!important}\n@media(max-width:768px){\n html[data-icp-industry-v3] .section-container{width:calc(100% - 32px)!important;padding:32px 0!important}\n html[data-icp-industry-v3] .visual-grid{grid-template-columns:minmax(0,1fr)!important;gap:22px!important}\n html[data-icp-industry-v3] .industry-block{padding:40px 16px!important}\n html[data-icp-industry-v3] .item-label{padding:16px!important}\n html[data-icp-industry-v3] nav.icp-responsive-nav,html[data-icp-industry-v3] body>nav{width:100%!important;padding-left:16px!important;padding-right:72px!important}\n html[data-icp-industry-v3] nav .logo-wrapper{min-width:0!important;max-width:100%!important;gap:8px!important}\n html[data-icp-industry-v3] nav .logo-wrapper>span:not(.icp-brand-slot-v2){font-size:19px!important;letter-spacing:1px!important}\n html[data-icp-industry-v3] nav>.btn-quote-nav{display:none!important}\n}\n";document.head.appendChild(s);}if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);else start();}());

(function(){
  'use strict';
  function applyPointReview(){
    if(document.getElementById('icp-point-review-v4'))return;
    var route=location.pathname.replace(/\.html$/,'').replace(/\/$/,'')||'/';
    var page=route==='/'||route==='/index'?'home':route==='/packaging-for-bakeries'?'bakery':route==='/packaging-for-clothing-boutiques'?'clothing':'';
    if(page)document.documentElement.setAttribute('data-point-page',page);
    var style=document.createElement('style');style.id='icp-point-review-v4';
    style.textContent="\nhtml[data-point-page=\"home\"] #reviews .section-title,html[data-point-page=\"home\"] #reviews .section-title em,html[data-point-page=\"home\"] #reviews .review-card h3{color:#e8c97a!important}\nhtml[data-point-page=\"bakery\"] #canneles .p-overlay{left:50%!important;right:auto!important;bottom:24px!important;transform:translateX(-50%)!important;width:calc(100% - 32px)!important;max-width:468px!important;box-sizing:border-box!important;padding:12px 16px!important;background:rgba(9,9,14,.82)!important}\nhtml[data-point-page=\"bakery\"] #canneles .p-title,html[data-point-page=\"bakery\"] #canneles .p-desc{max-width:100%!important;white-space:normal!important;overflow-wrap:anywhere!important;line-height:1.65!important;letter-spacing:1px!important}\nhtml[data-point-page=\"bakery\"] #canneles .p-desc{font-size:14px!important;letter-spacing:0!important}\nhtml[data-point-page=\"clothing\"] .visual-grid{align-items:stretch!important}\nhtml[data-point-page=\"clothing\"] [data-scarf-card-v4] .item-label{display:flex!important;flex-direction:column;justify-content:space-between;gap:8px}\nhtml[data-point-page=\"clothing\"] [data-scarf-card-v4] .scarf-detail-v4{font-size:14px!important;line-height:1.8!important;letter-spacing:0!important;color:#c6c6cf!important;margin:10px 0 0!important}\n.low-moq-photos-v4{margin:0 0 44px;padding:0}.low-moq-photos-v4 h2{margin:0 0 12px!important;font-size:28px!important;line-height:1.35!important}.low-moq-photos-v4>p{margin:0 0 22px!important}.low-moq-photo-grid-v4{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}.low-moq-photo-grid-v4 figure{margin:0;background:#111219;border:1px solid #ffffff18}.low-moq-photo-grid-v4 img{display:block;width:100%;height:auto;aspect-ratio:1/1;object-fit:contain}.low-moq-photo-grid-v4 figcaption{padding:12px 14px;color:#d8b44a;font-size:13px;line-height:1.6}\n@media(max-width:640px){.low-moq-photo-grid-v4{grid-template-columns:1fr}.low-moq-photos-v4 h2{font-size:24px!important}}\n"+`
.icp-unified-footer-v4{display:block!important;position:relative!important;box-sizing:border-box!important;width:100%!important;max-width:none!important;margin:0!important;padding:80px 24px 28px!important;background:#050508!important;color:#a8a8b5!important;text-align:left!important;border-top:1px solid #ffffff08!important;font-family:Arial,sans-serif!important}
.icp-unified-footer-v4 .footer-grid{display:grid!important;grid-template-columns:1.5fr 1fr 1fr!important;gap:60px!important;max-width:1200px!important;width:100%!important;margin:0 auto 60px!important;padding:0!important;box-sizing:border-box!important;align-items:start!important}
.icp-unified-footer-v4 .footer-col{min-width:0!important;text-align:left!important;margin:0!important;padding:0!important}
.icp-unified-footer-v4 .logo{display:inline-block!important;position:static!important;color:#fff!important;font-size:22px!important;font-weight:700!important;letter-spacing:3px!important;text-decoration:none!important;line-height:1.6!important}
.icp-unified-footer-v4 p{font-size:14px!important;line-height:1.8!important;margin:20px 0 0!important;color:#bbb!important}
.icp-unified-footer-v4 h4{font-family:Arial,sans-serif!important;font-size:13px!important;line-height:1.6!important;font-weight:700!important;letter-spacing:1.5px!important;text-transform:uppercase!important;color:#d8b44a!important;margin:0 0 16px!important}
.icp-unified-footer-v4 .footer-links{display:flex!important;flex-direction:column!important;gap:12px!important;list-style:none!important;margin:0!important;padding:0!important}
.icp-unified-footer-v4 .footer-links li{display:flex!important;align-items:baseline!important;gap:14px!important;list-style:none!important;margin:0!important;padding:0!important;line-height:1.8!important}
.icp-unified-footer-v4 .footer-links a{font-size:13px!important;line-height:1.8!important;text-decoration:none!important;color:#a8a8b5!important;overflow-wrap:anywhere!important}
.icp-unified-footer-v4 .footer-links a:hover{color:#e8c97a!important}
.icp-unified-footer-v4 .footer-icon{color:#d8b44a!important;font-size:15px!important;min-width:18px!important}
.icp-unified-footer-v4 [data-icp-back-top]{position:static!important;display:inline-block!important;width:auto!important;height:auto!important;padding:12px 16px!important;margin:20px 0 0!important;background:transparent!important;color:#d8b44a!important;border:1px solid #d8b44a!important;border-radius:4px!important;font:13px/1.4 Arial,sans-serif!important;cursor:pointer!important;transform:none!important}
.icp-unified-footer-v4 .copyright{max-width:1200px!important;width:100%!important;box-sizing:border-box!important;margin:0 auto!important;padding:30px 0 0!important;text-align:center!important;border-top:1px solid #ffffff08!important;font-size:11px!important;line-height:1.8!important;color:#60606c!important}
.icp-unified-footer-v4 .preserved-legal-v4{max-width:1200px;margin:0 auto 24px;display:flex;flex-wrap:wrap;gap:16px}.icp-unified-footer-v4 .preserved-legal-v4 a{color:#a8a8b5;font-size:12px}
.icp-unified-footer-v4 .footer-links a{display:inline!important;padding:0!important;margin:0!important;font-family:Arial,sans-serif!important}
.icp-unified-footer-v4 .footer-links li{min-height:0!important}
.icp-unified-footer-v4 .copyright{display:block!important;float:none!important}
.icp-unified-footer-v4 .footer-col>p>span{color:#d8b44a!important;font-family:Georgia,serif!important;font-style:italic!important;letter-spacing:normal!important}
@media(max-width:760px){.icp-unified-footer-v4{padding:48px 24px 100px!important}.icp-unified-footer-v4 .footer-grid{grid-template-columns:minmax(0,1fr)!important;gap:32px!important;margin-bottom:36px!important}}
`;
    document.head.appendChild(style);
    var previous=document.querySelector('footer'),legal=[];
    if(previous)previous.querySelectorAll('a[href]').forEach(function(a){if(/privacy|terms|legal|cookie/i.test(a.textContent+' '+a.getAttribute('href')))legal.push(a.cloneNode(true));});
    var template=document.createElement('template');template.innerHTML="<footer id=\"contact-info\">\r\n    <div class=\"footer-grid\">\r\n      <div class=\"footer-col\">\r\n        <a href=\"#\" class=\"logo\">iColorPacks</a>\r\n        <p style=\"font-size:14px; color:#BBB; margin-top:20px; line-height:1.8;\"><span style=\"color:var(--gold); font-family:'Playfair Display', serif; font-style:italic; font-size:16px;\">\"Packaging that Colors Your Life.\"</span><br>Custom rigid boxes, paper bags, bakery boxes, kraft bags and corrugated mailers.</p>\r\n      </div>\r\n      <div class=\"footer-col\">\r\n        <h4>Connect with Us</h4>\r\n        <ul class=\"footer-links\">\r\n          <li><span class=\"footer-icon\">&#9993;</span><a href=\"mailto:jennifer@icolorpacks.com\">jennifer@icolorpacks.com</a></li>\r\n          <li><span class=\"footer-icon\">&#128172;</span><a href=\"https://wa.me/8618058355198?text=Hello%20iColorPacks,%20I%20just%20viewed%20your%20premium%20packaging%20collection%20and%20would%20like%20to%20discuss%20a%20custom%20project.%20Can%20we%20chat?\">WhatsApp: +86 180 5835 5198</a></li>\r\n\r\n          <li><span class=\"footer-icon\">&#128205;</span><a href=\"#\">Wenzhou, Zhejiang, China</a></li>\r\n        </ul>\r\n      </div>\r\n\r\n    </div>\r\n    <div class=\"copyright\">&copy; 2026 iColorPacks &mdash; All Rights Reserved.</div>\r\n  </footer>";
    var footer=template.content.querySelector('footer');footer.classList.add('icp-unified-footer-v4');footer.setAttribute('data-unified-footer-v4','');
    if(previous&&previous.id)footer.id=previous.id;
    var col=document.createElement('div');col.className='footer-col';col.setAttribute('data-icp-product-footer','');
    col.innerHTML='<h4>Product Categories</h4><div role="navigation" aria-label="Footer product categories"><ul class="footer-links"><li><a href="/product-rigid-boxes">Rigid Gift Boxes</a></li><li><a href="/product-paper-bags">Paper Bags</a></li><li><a href="/product-cake-boxes">Cake &amp; Bakery Boxes</a></li><li><a href="/product-mailer-boxes">Mailer Boxes</a></li><li><a href="/product-kraft-bags">Kraft Paper Bags</a></li></ul></div><button type="button" data-icp-back-top aria-label="Back to top">↑ Back to top</button>';
    footer.querySelector('.footer-grid').appendChild(col);
    if(legal.length){var row=document.createElement('div');row.className='preserved-legal-v4';legal.forEach(function(a){row.appendChild(a);});footer.insertBefore(row,footer.querySelector('.copyright'));}
    if(previous)previous.replaceWith(footer);else document.body.appendChild(footer);
    footer.querySelector('[data-icp-back-top]').addEventListener('click',function(){window.scrollTo({top:0,left:0,behavior:'instant'});});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',applyPointReview);else applyPointReview();
})();

(function(){'use strict';const references=[{"from":"/","to":"/custom-magnetic-rigid-boxes","image":"/images/customer-selection-20261015-v2/collapsible-rigid-box-scene.png","title":"Magnetic Rigid Boxes","description":"Hidden-magnet closure for beauty, fragrance and premium gift sets.","id":"1d079b19ae04"},{"from":"/","to":"/product-rigid-boxes","image":"/images/customer-selection-20261015-v2/d3d69328-5371-4119-8875-7b25c80138b5.png","title":"Rigid Paper Boxes","description":"Rigid paper construction with a hinged lid for custom product presentation.","id":"c7d7f91156a1"},{"from":"/","to":"/custom-drawer-rigid-boxes","image":"/images/customer-selection-20261015-v2/4c2eb978-efc5-4c88-a2bf-d602e755846e.png","title":"Sliding Drawer Boxes","description":"Sleeve-and-tray opening for jewelry, fragrance and confectionery.","id":"b41729199acd"},{"from":"/","to":"/custom-shoulder-neck-rigid-boxes","image":"/images/style-shoulder-v2.webp","title":"Shoulder & Neck Boxes","description":"A precision inner shoulder creates a refined reveal and secure fit.","id":"ac2db05a413d"},{"from":"/","to":"/custom-ribbon-handle-paper-bags","image":"/images/customer-selection-20261015-v2/206e1398-dd1c-4c24-a384-ed9dac9e10f6.png","title":"Ribbon Handle Bags","description":"Soft ribbon handles for jewelry, cosmetics and gifting.","id":"256e8f53f1fe"},{"from":"/","to":"/product-paper-bags","image":"/images/customer-point-review-20261016/6d8a5ba2-7baa-42a6-8265-40f1219729eb.png","title":"Coordinated Bag & Box Sets","description":"Matching paper bags and gift boxes for a coordinated retail presentation.","id":"0104c91e99b2"},{"from":"/","to":"/custom-metallic-logo-paper-bags","image":"/images/home-showcase/metallic-chain-paper-bag.webp","title":"Metallic Logo Bags","description":"Gold, silver or holographic branding on specialty papers.","id":"38b34a410430"},{"from":"/","to":"/custom-grosgrain-ribbon-paper-bags","image":"/images/home-showcase/die-cut-ribbon-paper-bag.webp","title":"Grosgrain Ribbon Bags","description":"Textured ribbon handles and reinforced tops for premium retail.","id":"e5cbdbd1e17f"},{"from":"/","to":"/custom-cafe-flat-handle-paper-bags","image":"/images/product-pages/kraft-bags/cafe-yellow-takeaway-set-v1.webp","title":"Flat Handle Bags","description":"Fast-packing carry bags for cafés, food delivery and retail.","id":"a5aa150a8216"},{"from":"/","to":"/custom-bakery-kraft-paper-bags","image":"/images/home-showcase/bakery-die-cut-kraft-bag.webp","title":"Bakery Kraft Bags","description":"Grease-aware paper options for bread, pastries and baked goods.","id":"c2a086bf6bd9"},{"from":"/","to":"/custom-heavy-duty-kraft-shopping-bags","image":"/images/product-pages/kraft-bags/heavy-duty-shopping-bag-v2.webp","title":"Heavy-Duty Kraft Bags","description":"Reinforced handles and base for heavier retail purchases.","id":"cb84189a3105"},{"from":"/","to":"/custom-twisted-handle-kraft-paper-bags","image":"/images/product-pages/generated/twisted-handle-kraft-bags-v1.webp","title":"Twisted Handle Bags","description":"Brown or white kraft with recyclable twisted-paper handles.","id":"38adfa5d4e83"},{"from":"/","to":"/custom-window-cake-boxes","image":"/images/cake-grand-vision-window-v2.webp","title":"Window Cake Boxes","description":"Clear viewing panels for celebration cakes and premium desserts.","id":"153d1919a63c"},{"from":"/","to":"/packaging-for-bakeries","image":"/images/customer-selection-20261015-v2/2100e4fa-110b-4e18-ab24-856a7630bc65.png","title":"Cannelé & Pastry Boxes","description":"Folding pastry boxes for cannelés and small bakery assortments.","id":"426c4c12f560"},{"from":"/","to":"/custom-chocolate-gift-boxes","image":"/images/customer-selection-20261015-v2/44a28cc6-f345-46eb-8f06-5b1751c72af2.png","title":"Chocolate Gift Boxes","description":"Presentation boxes and fitted layouts for chocolate gift assortments.","id":"51f79acfefaf"},{"from":"/","to":"/custom-macaron-pastry-boxes","image":"/images/customer-selection-20261015-v2/b30aafce-37c3-486a-9339-d782c41b43bc.png","title":"Macaron & Pastry Boxes","description":"Partitioned boxes for macarons, chocolates and delicate pastries.","id":"8172916a68fc"},{"from":"/","to":"/custom-easy-open-kraft-mailer-boxes","image":"/images/product-pages/mailer/easy-open-kraft-mailer-v4.webp","title":"Easy-Open Kraft Mailers","description":"Natural corrugated mailers with clear locking and opening logic.","id":"197bb6b7e6fd"},{"from":"/","to":"/custom-inside-print-mailer-boxes","image":"/images/product-pages/mailer/inside-print-mailer-v4.webp","title":"Inside-Print Mailers","description":"Exterior restraint with a branded interior reveal.","id":"88b519117d74"},{"from":"/","to":"/custom-luxury-subscription-mailer-boxes","image":"/images/product-pages/mailer/luxury-subscription-mailer-v4.webp","title":"Subscription Mailers","description":"Repeatable premium unboxing for curated product programs.","id":"a0a6839db025"},{"from":"/","to":"/custom-tear-strip-mailer-boxes","image":"/images/product-pages/mailer/tear-strip-mailer-v4.webp","title":"Tear-Strip Mailers","description":"Clean opening with an optional second seal for returns.","id":"1d3e564ee832"},{"from":"/low-moq-custom-packaging-china","to":"/product-paper-bags","image":"/images/customer-point-review-20261016/71c6fa82-62c8-44c7-bb05-205d86c7a4ef.png","title":"Paper bag reference","description":"","id":"71dd7a7d3e3f"},{"from":"/low-moq-custom-packaging-china","to":"/custom-drawer-rigid-boxes","image":"/images/customer-point-review-20261016/4c2eb978-efc5-4c88-a2bf-d602e755846e.png","title":"Drawer box reference","description":"","id":"4ae0c0046ae7"},{"from":"/low-moq-custom-packaging-china","to":"/product-rigid-boxes","image":"/images/customer-point-review-20261016/7ce16fe6-57d7-4208-84b2-a208af964e01.png","title":"Collapsible box reference","description":"","id":"3c8248d9193d"},{"from":"/packaging-for-ecommerce-brands","to":"/custom-tear-strip-mailer-boxes","image":"/images/product-pages/mailer/tear-strip-mailer-v4.webp","title":"White Tear-Strip Box","description":"Easy-Open | Return Ready","id":"9e2b405b6578"},{"from":"/packaging-for-ecommerce-brands","to":"/custom-inside-print-mailer-boxes","image":"/images/product-pages/mailer/inside-print-mailer-v4.webp","title":"Custom Interior Print","description":"Kraft Mailer | Premium Branding","id":"bd4edfcbe8d4"},{"from":"/packaging-for-ecommerce-brands","to":"/custom-luxury-subscription-mailer-boxes","image":"/images/product-pages/mailer/luxury-subscription-mailer-v4.webp","title":"Luxury Subscription Box","description":"Matte Black | Gold Accents","id":"43ef3914a3c3"},{"from":"/packaging-for-ecommerce-brands","to":"/custom-easy-open-kraft-mailer-boxes","image":"/images/product-pages/mailer/easy-open-kraft-mailer-v4.webp","title":"Easy-Open Mailer","description":"Natural Corrugated | Secure Lock","id":"3a2cddfa7b2a"},{"from":"/product-cake-boxes","to":"/custom-window-cake-boxes","image":"/images/cake-grand-vision-window-v2.webp","title":"Grand Vision Window","description":"","id":"10d818f03714"},{"from":"/product-cake-boxes","to":"/custom-carry-handle-cake-boxes","image":"/images/product-pages/cake/pastry-carry-box-v1.webp","title":"Boutique Carry-All","description":"","id":"862a451e2b25"},{"from":"/product-cake-boxes","to":"/custom-tiered-wedding-cake-boxes","image":"/images/cake-majestic-tier-box-v2.webp","title":"Majestic Tier-Box","description":"","id":"fdbf6069cfb4"},{"from":"/product-kraft-bags","to":"/custom-bakery-kraft-paper-bags","image":"/images/product-pages/kraft-bags/bakery-kraft-bag-v2.webp","title":"Bakery & Deli Kraft Bag","description":"","id":"95c62a43aa9e"},{"from":"/product-kraft-bags","to":"/custom-cafe-flat-handle-paper-bags","image":"/images/product-pages/kraft-bags/cafe-yellow-takeaway-set-v1.webp","title":"Café Flat-Handle Takeaway","description":"","id":"73f2c0ca0fe0"},{"from":"/product-kraft-bags","to":"/custom-heavy-duty-kraft-shopping-bags","image":"/images/product-pages/kraft-bags/heavy-duty-shopping-bag-v2.webp","title":"Heavy-Duty Retail Kraft","description":"","id":"065089a37120"},{"from":"/product-mailer-boxes","to":"/custom-inside-print-mailer-boxes","image":"/images/product-pages/mailer/inside-print-mailer-v4.webp","title":"Full Canvas Mailer","description":"","id":"5a05ae3bd124"},{"from":"/product-mailer-boxes","to":"/custom-easy-open-kraft-mailer-boxes","image":"/images/product-pages/mailer/easy-open-kraft-mailer-v4.webp","title":"Natural Kraft Explorer","description":"","id":"0a49bb9ef01f"},{"from":"/product-mailer-boxes","to":"/custom-luxury-subscription-mailer-boxes","image":"/images/product-pages/mailer/luxury-subscription-mailer-v4.webp","title":"Sleek Obsidian Mailer","description":"","id":"60083272face"},{"from":"/product-paper-bags","to":"/custom-grosgrain-ribbon-paper-bags","image":"/images/product-pages/paper-bags/white-gold-ribbon-bag-v1.webp","title":"Grosgrain Ribbon Handles","description":"High-end 250gsm art paper with silk ribbon for a superior retail experience.","id":"19361886c913"},{"from":"/product-paper-bags","to":"/custom-matte-laminated-paper-bags","image":"/images/Af61649da05f94b1496aeb138fbe23dfcV.webp","title":"Matte Finish Elite Bags","description":"Scratch-resistant matte lamination with reinforced base for premium brands.","id":"8115c82a0356"},{"from":"/product-paper-bags","to":"/custom-metallic-logo-paper-bags","image":"/images/A0e494056f8b04efda7a9a29ceb409bb1n.webp","title":"Metallic Logo Bags","description":"Gold and silver foil stamping that catches the light and commands attention.","id":"b664ab1ba7a3"},{"from":"/product-rigid-boxes","to":"/custom-magnetic-rigid-boxes","image":"/images/Aebe742b7689d4074a1d6f9925f107ce3X.webp","title":"Signature Magnetic","description":"","id":"9a868fdce31b"},{"from":"/product-rigid-boxes","to":"/custom-drawer-rigid-boxes","image":"/images/A4b547f95ec0144a3a53d7e3e2fed8c542.webp","title":"Modern Drawer Box","description":"","id":"ecb7de55daf9"},{"from":"/product-rigid-boxes","to":"/custom-lid-and-base-rigid-boxes","image":"/images/Acb4f575a8b96448f80d24728daf0a6cbS.webp","title":"Traditional Two-Piece","description":"","id":"82437d16ca68"},{"from":"/product-rigid-boxes","to":"/custom-lid-and-base-rigid-boxes","image":"/images/style-lid-base-v4.webp","title":"Lid & Base Box","description":"The classic luxury standard. Top and bottom separate completely. Ideal for iPhones, high-end electronics, and gift sets.","id":"cadaab2f9b47"},{"from":"/product-rigid-boxes","to":"/custom-magnetic-rigid-boxes","image":"/images/style-magnetic-v4.webp","title":"Magnetic Closure","description":"Features hidden magnets for a satisfying 'click'. Premium choice for jewelry, perfume, and cosmetics.","id":"1d450e017f6b"},{"from":"/product-rigid-boxes","to":"/custom-drawer-rigid-boxes","image":"/images/style-drawer-v2.webp","title":"Sliding Drawer","description":"A modern, sleek opening mechanism. Perfect for boutique items, stationery, and small luxury goods.","id":"4fed0e6a9aaf"},{"from":"/product-rigid-boxes","to":"/custom-shoulder-neck-rigid-boxes","image":"/images/style-shoulder-v2.webp","title":"Shoulder & Neck","description":"Includes an internal 'neck' that holds the lid slightly apart for a layered, high-contrast look.","id":"3287eeb97fba"}];
function ready(){
 if(document.getElementById('icp-layout-v5'))return;
 const route=location.pathname.replace(/\.html$/,'').replace(/\/$/,'')||'/',html=document.documentElement;
 if(/^\/product-/.test(route))html.dataset.catalogV5='';
 if(document.querySelector('link[href*="product-detail.css"]'))html.dataset.detailV5='';
 if(route==='/packaging-for-cosmetics-brands')html.dataset.cosmeticsV5='';
 if(route==='/packaging-for-jewelry-brands')html.dataset.jewelryV5='';
 const style=document.createElement('style');style.id='icp-layout-v5';style.textContent=`
html[data-catalog-v5] .catalog-section,html[data-catalog-v5] .super-landing-content,html[data-catalog-v5] .section:not(.form-section){width:min(1600px,calc(100% - 96px))!important;max-width:1600px!important;padding:64px 0!important;margin-left:auto!important;margin-right:auto!important;box-sizing:border-box!important}
html[data-catalog-v5] .content-container{max-width:none!important;width:100%!important}
html[data-catalog-v5] .product-grid{grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:30px!important}
html[data-catalog-v5] .product-image{height:420px!important}
html[data-catalog-v5] .product-image img{width:100%!important;height:100%!important;object-fit:contain!important;transform:none!important}
html[data-catalog-v5] .product-info{padding:28px!important}
html[data-catalog-v5] .product-info h3{font-size:22px!important;line-height:1.4!important}
html[data-catalog-v5] .spec-row{font-size:16px!important;gap:16px!important;align-items:start!important}
html[data-catalog-v5] .spec-value{max-width:70%;text-align:right;overflow-wrap:break-word}
html[data-catalog-v5] .style-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:30px!important}
html[data-catalog-v5] .style-card{padding:0 0 26px!important;overflow:hidden!important;min-width:0!important}
html[data-catalog-v5] .style-card img{display:block!important;height:auto!important;aspect-ratio:1/1!important;width:100%!important;object-fit:contain!important;margin:0 0 24px!important}
html[data-catalog-v5] .style-card h3,html[data-catalog-v5] .style-card>p{margin-left:26px!important;margin-right:26px!important}
html[data-catalog-v5] .style-card>p,html[data-catalog-v5] .style-info p{font-size:17px!important;line-height:1.8!important;color:#bcbcc8!important}
html[data-catalog-v5] .section-header p{font-size:18px!important;max-width:900px!important;line-height:1.8!important}
html[data-catalog-v5] .btn-card-inquiry{font-size:14px!important}
html[data-catalog-v5] .super-landing-content h2{font-size:34px!important;line-height:1.3!important;margin-bottom:18px!important}
html[data-catalog-v5] .super-landing-content table th,html[data-catalog-v5] .super-landing-content table td,html[data-catalog-v5] .industry-item p,html[data-catalog-v5] .faq-item p{font-size:17px!important;line-height:1.8!important}
html[data-detail-v5] main .wrap{width:min(1600px,calc(100% - 96px))!important;max-width:1600px!important}
html[data-detail-v5] .hero-grid{gap:48px!important;grid-template-columns:1fr 1fr!important}
html[data-detail-v5] .hero-media img{object-fit:contain!important;aspect-ratio:1/1!important;background:#111219!important}
html[data-detail-v5] .lead{font-size:20px!important;line-height:1.8!important;max-width:none!important}
html[data-detail-v5] .feature p,html[data-detail-v5] .step p,html[data-detail-v5] .use p,html[data-detail-v5] .spec-table td,html[data-detail-v5] .spec-table th{font-size:16px!important;line-height:1.8!important}
html[data-detail-v5] .section-head{max-width:1050px!important}html[data-detail-v5] .section-head p,html[data-detail-v5] .copy p,html[data-detail-v5] .faq p{font-size:18px!important;line-height:1.8!important}
html[data-detail-v5] .proof strong{font-size:18px!important}html[data-detail-v5] .proof span{font-size:14px!important}
html[data-paper-intro-v5] .intro-section{max-width:1280px!important;width:calc(100% - 96px)!important;padding:58px 0 24px!important;text-align:left!important;display:grid!important;grid-template-columns:.9fr 1.1fr!important;gap:56px!important;align-items:start!important}
html[data-paper-intro-v5] .intro-section h2{font-size:clamp(32px,2.6vw,46px)!important;line-height:1.2!important;margin:0!important}
html[data-paper-intro-v5] .intro-section p{font-size:20px!important;line-height:1.9!important;color:#c2c2ce!important}
html[data-cosmetics-v5] .visual-grid{align-items:stretch!important}
html[data-cosmetics-v5] .cosmetics-fit-v5{margin-top:20px!important}
html[data-cosmetics-v5] .cosmetics-fit-v5 p,html[data-cosmetics-v5] .cosmetics-fit-v5 li{font-size:17px!important;line-height:1.85!important;letter-spacing:0!important;color:#c2c2ce!important}
html[data-cosmetics-v5] .cosmetics-fit-v5 ul{padding-left:20px!important;margin:16px 0 0!important}
html[data-cosmetics-v5] .cosmetics-fit-v5 li{margin:10px 0!important}
html[data-jewelry-v5] .seo-content{width:100%!important;max-width:1440px!important;padding:0!important;margin:0 auto 72px!important}
html[data-jewelry-v5] .seo-content h2{font-size:clamp(30px,2.8vw,46px)!important;line-height:1.25!important}
html[data-jewelry-v5] .seo-content p{font-size:18px!important;line-height:1.9!important;color:#c1bfca!important}
html[data-jewelry-v5] .seo-content th,html[data-jewelry-v5] .seo-content td{font-size:16px!important;line-height:1.7!important;padding:20px!important}
.product-category-nav a{display:inline-flex!important;align-items:center!important;gap:10px!important;color:#fff0b7!important;background:#242019!important;border:1px solid #b69a4e!important;font-size:15px!important;font-weight:700!important;padding:14px 20px!important;letter-spacing:1px!important}
.product-category-nav a:hover,.product-category-nav a:focus-visible{background:#e8c97a!important;color:#111219!important;outline:2px solid #fff0b7;outline-offset:3px}.product-category-nav .category-symbol-v5{font-size:22px;line-height:1}
.catalog-table-scroll-v5{display:block;width:100%;max-width:100%;overflow-x:auto}.catalog-table-scroll-v5 table{min-width:650px}
@media(max-width:760px){.catalog-secondary-grid-v5{grid-template-columns:minmax(0,1fr)!important}.catalog-secondary-grid-v5>*{min-width:0!important}}
.selected-product-v5{width:min(1600px,calc(100% - 96px));margin:48px auto;padding:32px;background:#111219;border:1px solid #c9a84c;display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;scroll-margin-top:110px}.selected-product-v5 img{display:block;width:100%;height:auto;max-height:700px;object-fit:contain}.selected-product-v5 h2{font:700 clamp(32px,3vw,52px)/1.2 Georgia,serif;color:#f7f3e8;margin:16px 0}.selected-product-v5 p{font-size:19px;line-height:1.8;color:#c6c6cf}.selected-product-v5 a{display:inline-block;padding:16px 24px;background:#e8c97a;color:#111219;text-decoration:none;font-weight:700}.selected-product-v5 .eyebrow{font-size:13px;color:#e8c97a}
@media(max-width:1000px){html[data-catalog-v5] .product-grid,html[data-catalog-v5] .style-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}html[data-detail-v5] .hero-grid{grid-template-columns:1fr!important}}
@media(max-width:760px){html[data-catalog-v5] .catalog-section,html[data-catalog-v5] .super-landing-content,html[data-catalog-v5] .section:not(.form-section),html[data-detail-v5] main .wrap{width:calc(100% - 32px)!important;padding-top:36px!important;padding-bottom:36px!important}html[data-catalog-v5] .product-grid,html[data-catalog-v5] .style-grid{grid-template-columns:minmax(0,1fr)!important}html[data-catalog-v5] .product-image,html[data-catalog-v5] .style-card img{height:auto!important;aspect-ratio:1/1!important}html[data-catalog-v5] .product-image img{height:auto!important;aspect-ratio:1/1!important}html[data-paper-intro-v5] .intro-section{width:calc(100% - 40px)!important;grid-template-columns:1fr!important;gap:22px!important}html[data-paper-intro-v5] .intro-section p{font-size:18px!important}html[data-detail-v5] .lead{font-size:18px!important}.selected-product-v5{width:calc(100% - 32px);grid-template-columns:1fr;padding:20px;gap:22px}.product-category-nav{gap:10px!important;flex-wrap:wrap!important}.product-category-nav a{font-size:13px!important;padding:12px 14px!important}}
`;
 document.head.appendChild(style);
 if(html.hasAttribute('data-catalog-v5'))document.querySelectorAll('table').forEach(t=>{if(t.closest('footer,form,.catalog-table-scroll-v5'))return;const box=document.createElement('div');box.className='catalog-table-scroll-v5';box.setAttribute('role','region');box.setAttribute('aria-label','Product specification table; scroll horizontally on small screens');box.tabIndex=0;t.before(box);box.append(t);});
 if(html.hasAttribute('data-catalog-v5'))document.querySelectorAll('div[style]').forEach(d=>{if(!d.closest('footer,form')&&/grid-template-columns:\s*repeat\(3,\s*1fr\)/.test(d.getAttribute('style')))d.classList.add('catalog-secondary-grid-v5');});
 if(route==='/product-paper-bags')html.dataset.paperIntroV5='';
 document.querySelectorAll('.product-category-nav a').forEach((a,i)=>{if(a.querySelector('.category-symbol-v5'))return;const span=document.createElement('span');span.className='category-symbol-v5';span.setAttribute('aria-hidden','true');span.textContent=['🎁','🛍️','🌿','🧁','📦'][i%5];a.prepend(span);});
 // Stable, auditable style IDs keep different references on one existing product URL distinct, including copied links/new tabs.
 references.filter(r=>r.from===route).forEach(r=>{document.querySelectorAll('a[href]').forEach(a=>{let u;try{u=new URL(a.href)}catch{return;}if(u.pathname.replace(/\.html$/,'')!==r.to||/inquiry|quote|factory/i.test(u.hash))return;const card=a.closest('.home-product-card,.product-card,.style-card,.industry-item,.grid-item,.p-card,figure')||(a.querySelector('img')?a:null);if(!card)return;const img=card.querySelector('img');if(!img)return;const imagePath=new URL(img.getAttribute('src'),location.href).pathname;if(imagePath!==r.image)return;u.hash='product-ref-'+r.id;a.href=u.pathname+u.search+u.hash;a.dataset.productReferenceV5=r.id;});});
 function showSelected(){const id=location.hash.match(/^#product-ref-([a-f0-9]+)$/)?.[1],r=references.find(x=>x.id===id&&x.to===route);if(!r)return;
 const hero=document.querySelector('main .hero-media');if(hero){const image=hero.querySelector('img');if(image){image.src=r.image;image.alt=r.title;image.removeAttribute('srcset');image.style.objectFit='contain';}const title=document.querySelector('main .hero h1');if(title)title.textContent=r.title;hero.dataset.selectedProductV5=r.id;return;}
 let panel=document.getElementById('selected-product-v5');if(!panel){panel=document.createElement('section');panel.id='selected-product-v5';panel.className='selected-product-v5';const after=document.querySelector('.category-banner,body>.hero');if(after)after.after(panel);else(document.querySelector('main')||document.body).prepend(panel);}panel.replaceChildren();const image=document.createElement('img');image.src=r.image;image.alt=r.title;image.dataset.selectedProductV5=r.id;const copy=document.createElement('div'),label=document.createElement('p');label.className='eyebrow';label.textContent='Your selected packaging reference';const title=document.createElement('h2');title.textContent=r.title;const detail=document.createElement('p');detail.textContent=r.description||'Share the dimensions, quantity and preferred finish for this packaging style.';const action=document.createElement('a');action.href='#inquiry';action.textContent='Inquire about this style';action.addEventListener('click',function(e){const trigger=document.querySelector('#icp-contact-review .icp-contact-quote');if(trigger){e.preventDefault();trigger.click();}});copy.append(label,title,detail,action);panel.append(image,copy);requestAnimationFrame(()=>panel.scrollIntoView({behavior:'instant',block:'start'}));
 }
 showSelected();window.addEventListener('hashchange',showSelected);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready);else ready();})();

(function(){'use strict';function apply(){if(document.getElementById('icp-five-points-v6'))return;const route=location.pathname.replace(/\.html$/,'').replace(/\/$/,'')||'/',html=document.documentElement;
const names={'/':'home','/product-paper-bags':'bags','/product-cake-boxes':'cake','/packaging-for-perfume-brands':'perfume','/low-moq-custom-packaging-china':'low'};if(!names[route])return;html.dataset.fivePointsV6=names[route];const s=document.createElement('style');s.id='icp-five-points-v6';s.textContent=`
html[data-five-points-v6="bags"] .styles-grid .style-card>img.style-img{display:block!important;width:100%!important;height:auto!important;aspect-ratio:4/3!important;object-fit:cover!important;object-position:center!important;margin:0!important;transform:none!important}
html[data-five-points-v6="cake"] .category-banner{background-image:linear-gradient(90deg,#15110d 0%,#15110d 38%,rgba(21,17,13,.9) 47%,rgba(21,17,13,0) 65%),url('/images/cake-grand-vision-window-v2.webp')!important;background-color:#15110d!important;background-size:100% 100%,auto 100%!important;background-position:center,right center!important;background-repeat:no-repeat!important}
html[data-five-points-v6="perfume"] .visual-grid{align-items:stretch!important}
html[data-five-points-v6="perfume"] .item-label p.discovery-copy-v6{font-size:18px!important;line-height:1.85!important;letter-spacing:0!important;text-transform:none!important;color:#c6c6cf!important;margin:18px 0 0!important}
html[data-five-points-v6="low"] .section-container{box-sizing:border-box!important;width:calc(100% - 96px)!important;max-width:1600px!important;padding:64px 0!important;margin:0 auto!important}
html[data-five-points-v6="low"] .seo-content{width:100%!important;max-width:1440px!important;padding:0!important;margin:0 auto 72px!important}
html[data-five-points-v6="low"] .seo-content h2,html[data-five-points-v6="low"] .low-moq-photos-v4 h2{font-size:clamp(30px,2.8vw,46px)!important;line-height:1.25!important}
html[data-five-points-v6="low"] .seo-content p{font-size:18px!important;line-height:1.9!important;color:#c1bfca!important}
html[data-five-points-v6="low"] .seo-content th,html[data-five-points-v6="low"] .seo-content td{font-size:16px!important;line-height:1.7!important;padding:20px!important}
html[data-five-points-v6="low"] .low-moq-photo-grid-v4{grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:30px!important}
html[data-five-points-v6="low"] .low-moq-photo-grid-v4 figcaption{font-size:18px!important;line-height:1.6!important;padding:18px 22px!important}
html[data-five-points-v6="low"] .low-table-scroll-v6{width:100%!important;max-width:100%!important;overflow-x:auto!important;display:block!important}
html[data-five-points-v6="low"] .low-table-scroll-v6 table{min-width:700px!important}
html[data-five-points-v6="home"] #navbar .nav-links>li>a{color:#e8c97a!important}
html[data-five-points-v6="home"] #navbar .nav-links>li>a:hover,html[data-five-points-v6="home"] #navbar .nav-links>li>a:focus-visible{color:#fff!important}
@media(max-width:768px){html[data-five-points-v6="low"] .section-container{width:calc(100% - 32px)!important;padding:32px 0!important}html[data-five-points-v6="low"] .low-moq-photo-grid-v4{grid-template-columns:minmax(0,1fr)!important;gap:22px!important}html[data-five-points-v6="cake"] .category-banner{background-size:100% 100%,auto 100%!important;background-position:center,65% center!important;background-image:linear-gradient(90deg,rgba(10,8,5,.75),rgba(10,8,5,.25)),url('/images/cake-grand-vision-window-v2.webp')!important}}
`;document.head.appendChild(s);if(names[route]==='low')document.querySelectorAll('.seo-content table').forEach(t=>{const box=document.createElement('div');box.className='low-table-scroll-v6';box.setAttribute('role','region');box.setAttribute('aria-label','Packaging cost table; scroll horizontally on small screens');box.tabIndex=0;t.before(box);box.appendChild(t);});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply);else apply();})();

(function(){function cakeBannerFinal(){if(location.pathname.replace(/\.html$/, "").replace(/\/$/, "")!=="/product-cake-boxes")return;var style=document.createElement("style");style.id="cake-banner-final-20261016";style.textContent="\n/* Final approved correction: continuous cake-banner photograph behind the live text. */\nhtml[data-five-points-v6=\"cake\"] .category-banner{background-image:linear-gradient(90deg,rgba(9,7,5,.58) 0%,rgba(9,7,5,.34) 42%,rgba(9,7,5,.05) 72%),url('/images/cake-banner-full-scene-20261016.png')!important;background-size:cover!important;background-position:center!important;background-repeat:no-repeat!important}\n@media(max-width:768px){html[data-five-points-v6=\"cake\"] .category-banner{background-image:linear-gradient(0deg,rgba(9,7,5,.75),rgba(9,7,5,.12) 65%),url('/images/cake-banner-full-scene-20261016.png')!important;background-size:cover!important;background-position:74% center!important}}\n";document.head.appendChild(style);}if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",cakeBannerFinal);else cakeBannerFinal();})();