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

  function productGroup(path) {
    if (/kraft|cafe-flat-handle|bakery-kraft|twisted-handle/.test(path)) return 'kraft_paper_bags';
    if (/paper-bag|shopping-bag|ribbon-bag/.test(path)) return 'paper_bags';
    if (/cake|pastry|macaron|bakeries/.test(path)) return 'cake_boxes';
    if (/mailer/.test(path)) return 'mailer_boxes';
    if (/rigid|gift-box/.test(path)) return 'gift_boxes';
    return 'general_packaging';
  }

  function whatsappContext(link) {
    var card = link.closest('.home-product-card, .product-card, .style-card');
    var detail = card && card.querySelector('a[href^="/custom-"]');
    var heading = card && card.querySelector('h3, h4');
    var label = link.getAttribute('data-product-label') || (heading && heading.textContent.trim());
    var group = productGroup(detail ? detail.getAttribute('href') : window.location.pathname);
    var names = { paper_bags: 'Paper Bags', kraft_paper_bags: 'Kraft Paper Bags', cake_boxes: 'Cake Boxes', mailer_boxes: 'Mailer Boxes', gift_boxes: 'Gift Boxes', general_packaging: 'Custom Packaging' };
    return { product_group: group, product_label: label || names[group] };
  }

  function prepareWhatsAppLink(link) {
    // Preserve other phone numbers or third-party WhatsApp links.
    var url;
    try { url = new URL(link.href); } catch (ignore) { return; }
    if (!/^(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)$/i.test(url.hostname)) return;
    var phone = url.hostname === 'wa.me' ? url.pathname.slice(1) : url.searchParams.get('phone');
    if (phone !== '8618058355198') return;
    var context = whatsappContext(link);
    var path = window.location.pathname.replace(/\.html$/, '');
    if (path === '/index') path = '/';
    url.searchParams.set('text', 'Hello iColorPacks, I would like a quote for ' + context.product_label + '.\nQuantity: \nDelivery country: \nProduct size (if known): \nReference page: https://www.icolorpacks.com' + path);
    link.href = url.href;
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
    addHiddenField(form, 'product_group', productGroup(window.location.pathname));
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
    document.querySelectorAll('a[href]').forEach(prepareWhatsAppLink);
    // Legacy widgets add or replace contact links after page load.
    var linkObserver = new MutationObserver(function (changes) {
      changes.forEach(function (change) {
        change.addedNodes.forEach(function (node) {
          if (node.nodeType !== 1) return;
          if (node.matches('a[href]')) prepareWhatsAppLink(node);
          node.querySelectorAll('a[href]').forEach(prepareWhatsAppLink);
        });
      });
    });
    linkObserver.observe(document.body, { childList: true, subtree: true });
    window.gtag('event', 'page_context', {
      page_type: pageType(),
      product_group: productGroup(window.location.pathname),
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
        prepareWhatsAppLink(link);
        var context = whatsappContext(link);
        window.gtag('event', 'whatsapp_click', {
          contact_method: 'whatsapp',
          product_group: context.product_group,
          product_label: context.product_label,
          page_path: window.location.pathname,
          link_url: link.href.split('?')[0],
          link_text: (link.textContent || '').trim().slice(0, 100),
          page_type: pageType(),
          transport_type: 'beacon'
        });
        window.gtag('event', 'contact', {
          method: 'whatsapp',
          product_group: context.product_group,
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
