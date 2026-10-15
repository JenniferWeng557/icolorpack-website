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

