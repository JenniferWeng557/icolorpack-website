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

  document.addEventListener('DOMContentLoaded', function () {
    window.gtag('event', 'page_context', {
      page_type: pageType(),
      page_path: window.location.pathname,
      event_category: 'engagement',
      non_interaction: true
    });

    Array.prototype.forEach.call(document.forms, function (form, index) {
      if (!formIsInquiry(form)) return;
      addHoneypot(form);

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

        fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        }).then(function (response) {
          if (!response.ok) throw new Error('Form submission failed');
          sessionStorage.setItem('icp_lead_completed', JSON.stringify({
            form_id: formLabel(form, index),
            page_type: pageType()
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
      } else if (/^mailto:/i.test(href)) {
        window.gtag('event', 'email_click', {
          contact_method: 'email',
          page_type: pageType(),
          transport_type: 'beacon'
        });
      }
    }, true);
  });
}());
