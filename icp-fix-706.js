(function () {
  var VER = 'v7.0-unified';
  console.log('%c[iColorPacks] icp-fix ' + VER + ' loaded - Unified Floating Icons', 'color:#C9A84C;font-weight:bold');

  var GOLD = '#C9A84C', DARK = '#0D0D14';
  var B = 'https://www.icolorpacks.com/';

  /* ---------- 1. 注入统一样式 (CSS) ---------- */
  var unifiedCss = `
    /* iColorPacks unified floating actions */
    .icp-floating-actions {
      position: fixed;
      left: 42px;
      bottom: 34px;
      z-index: 9000;
      display: flex;
      align-items: center;
      gap: 16px;
      pointer-events: none;
    }
    .icp-floating-actions a,
    .icp-floating-actions button {
      pointer-events: auto;
    }
    .icp-float-whatsapp,
    .icp-float-plus {
      width: 62px;
      height: 62px;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: 0;
      text-decoration: none;
      cursor: pointer;
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.32);
      transition: transform 0.2s;
    }
    .icp-float-whatsapp:active, .icp-float-plus:active { transform: scale(0.9); }
    .icp-float-whatsapp {
      background: #25d366;
    }
    .icp-float-whatsapp svg {
      width: 34px;
      height: 34px;
      fill: #ffffff;
    }
    .icp-float-plus {
      position: fixed;
      right: 44px;
      bottom: 34px;
      background: #d9b957;
      color: #050508;
      font-size: 42px;
      line-height: 1;
      font-weight: 400;
    }
    /* Hide ALL old/conflicting floating elements */
    .floating-email, .email-float, .email-floating, .icp-email, .icp-float-email,
    .icp-mobile-sticky-cta, .icp-m-footer, .floating-whatsapp, .floating-quote-container,
    .floating-quote, .wa-float, .rollback-floating-quote,
    a[href^="mailto:"].floating-email, a[href^="mailto:"].email-float,
    a[href^="mailto:"].email-floating, .icp-mobile-sticky-cta a[href^="mailto:"],
    .icp-m-footer a[href^="mailto:"] {
      display: none !important;
    }
    @media (max-width: 768px) {
      .icp-floating-actions {
        left: 22px;
        bottom: 22px;
        gap: 12px;
      }
      .icp-float-whatsapp,
      .icp-float-plus {
        width: 58px;
        height: 58px;
      }
      .icp-float-whatsapp svg {
        width: 32px;
        height: 32px;
      }
      .icp-float-plus {
        right: 24px;
        bottom: 22px;
        font-size: 40px;
      }
    }
    /* Hamburger Menu Styles */
    #icpSB{display:none!important;}
    @media(max-width:1024px){
      #icpSB{display:flex!important;align-items:center;justify-content:center;position:fixed!important;top:14px;right:14px;z-index:2147483646;width:46px;height:46px;border:1px solid rgba(201,168,76,.6);border-radius:8px;background:rgba(13,13,20,.96);color:#C9A84C;font-size:24px;line-height:1;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.5);}
      .nav-links{display:none!important;}
      nav .btn-quote-nav,nav .dropbtn{display:none!important;}
    }
    #icpSN{display:none;}#icpSN.on{display:block!important;position:fixed;inset:0;z-index:2147483647;background:rgba(10,10,15,.98);padding:64px 26px 40px;overflow-y:auto;}
    #icpSN .x{position:absolute;top:16px;right:20px;color:#fff;font-size:34px;cursor:pointer;line-height:1;}
    #icpSN ul{list-style:none;margin:0;padding:0;}#icpSN>ul>li{margin-bottom:20px;}
    #icpSN a,#icpSN button{color:#fff;text-decoration:none;font-size:19px;font-weight:700;text-transform:uppercase;letter-spacing:2px;background:none;border:0;padding:0;cursor:pointer;font-family:inherit;display:flex;align-items:center;gap:10px;width:100%;}
    #icpSN .ar{color:#C9A84C;font-size:14px;transition:transform .25s;}
    #icpSN li.op .ar{transform:rotate(90deg); appearance:none;}
    #icpSN .sub{list-style:none;margin:0;padding:0 0 0 16px;max-height:0;overflow:hidden;transition:max-height .3s;border-left:1px solid rgba(201,168,76,.35);}
    #icpSN li.op .sub{max-height:520px;margin-top:14px;}
    #icpSN .sub li{margin-bottom:14px;}#icpSN .sub a{font-size:15px;font-weight:500;color:#c9c9d4;letter-spacing:1px;}
  `;
  var st = document.createElement('style'); st.textContent = unifiedCss; document.head.appendChild(st);

  /* ---------- 2. 注入统一 HTML 组件 ---------- */
  var unifiedHtml = `
    <div class="icp-floating-actions" aria-label="Quick contact actions">
      <a
        class="icp-float-whatsapp"
        href="https://wa.me/8618058355198?text=Hello%20iColorPacks%2C%20I%20would%20like%20to%20request%20a%20custom%20packaging%20quote."
        target="_blank"
        rel="noopener"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884M20.463 3.488A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.672 1.433 5.662 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
      </a>
      <button
        class="icp-float-plus"
        type="button"
        aria-label="Open inquiry form"
        onclick="if (typeof toggleModal === 'function') { toggleModal(); } else { window.location.href='https://wa.me/8618058355198'; }"
      >
        +
      </button>
    </div>
    <div id="icpSB">&#9776;</div>
    <nav id="icpSN"><span class="x">&times;</span><ul>
      <li><a href="${B}index.html">Home</a></li>
      <li><button type="button" class="tg">Products <span class="ar">&#9656;</span></button><ul class="sub">
        <li><a href="${B}product-rigid-boxes.html">Rigid Boxes</a></li>
        <li><a href="${B}product-paper-bags.html">Paper Bags</a></li>
        <li><a href="${B}product-cake-boxes.html">Cake Boxes</a></li>
        <li><a href="${B}product-mailer-boxes.html">Mailer Boxes</a></li>
        <li><a href="${B}product-kraft-bags.html">Kraft Bags</a></li></ul></li>
      <li><button type="button" class="tg">Industries <span class="ar">&#9656;</span></button><ul class="sub">
        <li><a href="${B}packaging-for-cosmetics-brands.html">Cosmetics</a></li>
        <li><a href="${B}packaging-for-jewelry-brands.html">Jewelry</a></li>
        <li><a href="${B}packaging-for-bakeries.html">Bakery</a></li>
        <li><a href="${B}packaging-for-clothing-boutiques.html">Clothing</a></li>
        <li><a href="${B}packaging-for-candle-brands.html">Candle</a></li>
        <li><a href="${B}packaging-for-perfume-brands.html">Perfume</a></li>
        <li><a href="${B}packaging-for-ecommerce-brands.html">E-commerce</a></li>
        <li><a href="${B}packaging-for-gift-shops.html">Gift Shops</a></li></ul></li>
      <li><a href="${B}index.html#factory">Factory</a></li>
      <li><a href="${B}blog.html">Blog</a></li></ul></nav>
  `;
  var container = document.createElement('div');
  container.innerHTML = unifiedHtml;
  document.body.appendChild(container);

  /* ---------- 3. 菜单交互逻辑 ---------- */
  var SB = document.getElementById('icpSB'), SN = document.getElementById('icpSN');
  if (SB && SN) {
    function toggle() {
      SN.classList.toggle('on');
      if (!SN.classList.contains('on')) SN.querySelectorAll('li.op').forEach(function (l) { l.classList.remove('op'); });
    }
    SB.onclick = toggle;
    SN.querySelector('.x').onclick = toggle;
    SN.querySelectorAll('.tg').forEach(function (btn) {
      btn.onclick = function () {
        var li = btn.parentElement, was = li.classList.contains('op');
        SN.querySelectorAll('li.op').forEach(function (l) { l.classList.remove('op'); });
        if (!was) li.classList.add('op');
      };
    });
  }

  /* ---------- 4. 图片兜底 (CDN 级联) ---------- */
  var HOSTS = ['https://sc01.alicdn.com/kf/', 'https://sc02.alicdn.com/kf/', 'https://sc04.alicdn.com/kf/'];
  function fileOf(src) { var m = (src || '').split('?')[0].match(/(A[A-Za-z0-9]{10,}\.(?:webp|png|jpg))$/); return m ? m[1] : null; }
  document.addEventListener('error', function (e) {
    var el = e.target;
    if (!el || el.tagName !== 'IMG' || el.dataset.d) return;
    var f = fileOf(el.src); if (!f) { el.dataset.d = '1'; return; }
    var n = parseInt(el.dataset.t || '0', 10);
    if (n < HOSTS.length) { el.dataset.t = (n + 1) + ''; el.src = HOSTS[n] + f; }
    else { el.dataset.d = '1'; }
  }, true);

  /* ---------- 5. 修复问号图标 ---------- */
  var ICONS = {
    'FOOD GRADE SAFETY': 'cake', 'STRUCTURAL STRENGTH': 'shield', 'EASY ASSEMBLY': 'box',
    'PREMIUM UNBOXING': 'gift', 'CRUSH RESISTANCE': 'shield', 'BRAND PRECISION': 'target',
    'LUXURY PERCEPTION': 'gift', 'STRUCTURAL INTEGRITY': 'shield', 'FULL CUSTOMIZATION': 'box'
  };
  function featureSVG(name) {
    var p = {
      cake: '<path d="M12 6V3m-3 3V4m6 2V4"/><path d="M5 10c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v2H5z"/><path d="M4 12h16v7a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/><path d="M4 15c1.5 0 1.5 1.5 3 1.5s1.5-1.5 3-1.5 1.5 1.5 3 1.5 1.5-1.5 3-1.5"/>',
      shield: '<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/>',
      box: '<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>'
    };
    return '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="' + GOLD
      + '" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + (p[name] || p.box) + '</svg>';
  }
  function fixQ() {
    var walk = document.createTreeWalker(document.body || document.documentElement, NodeFilter.SHOW_TEXT, null, false);
    var node;
    while (node = walk.nextNode()) {
      var t = node.textContent;
      if (/^[?\uFFFD]+$/.test(t.trim())) {
        var el = node.parentElement; if (!el || el.tagName === 'SCRIPT' || el.tagName === 'STYLE') continue;
        var fs = parseInt(window.getComputedStyle(el).fontSize, 10);
        if (fs >= 28) {
          var title = ''; var next = el.nextElementSibling;
          if (next && /^H[1-6]$/.test(next.tagName)) title = next.textContent.trim().toUpperCase();
          el.innerHTML = featureSVG(ICONS[title] || 'box');
        }
      }
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fixQ);
  else fixQ();
  setTimeout(fixQ, 500);
})();
