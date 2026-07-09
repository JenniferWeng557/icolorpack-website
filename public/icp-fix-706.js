(function () {
  var VER = 'v6-clean';
  console.log('%c[iColorPacks] icp-fix ' + VER + ' loaded - Email Icon Removed', 'color:#C9A84C;font-weight:bold');

  var GOLD = '#C9A84C', DARK = '#0D0D14';
  var B = 'https://www.icolorpacks.com/';

  /* ---------- 1. 注入样式 (移除所有邮箱图标样式) ---------- */
  var css = ''
    + '.icp-mobile-nav-overlay,.icp-mobile-header,.icp-mobile-hero,'
    + '.icp-mobile-sticky-cta,.icp-sub-toggle,.icp-sub-menu{display:none!important;}'
    + '#icpSB{display:none!important;}'
    + '@media(max-width:1024px){'
    + '#icpSB{display:flex!important;align-items:center;justify-content:center;position:fixed!important;'
    + 'top:14px;right:14px;z-index:2147483646;width:46px;height:46px;border:1px solid rgba(201,168,76,.6);'
    + 'border-radius:8px;background:rgba(13,13,20,.96);color:' + GOLD + ';font-size:24px;line-height:1;cursor:pointer;'
    + 'box-shadow:0 4px 14px rgba(0,0,0,.5);}'
    + '.nav-links{display:none!important;}'
    + 'nav .btn-quote-nav,nav .dropbtn{display:none!important;}'
    + '}'
    + '#icpSN{display:none;}#icpSN.on{display:block!important;position:fixed;inset:0;z-index:2147483647;'
    + 'background:rgba(10,10,15,.98);padding:64px 26px 40px;overflow-y:auto;}'
    + '#icpSN .x{position:absolute;top:16px;right:20px;color:#fff;font-size:34px;cursor:pointer;line-height:1;}'
    + '#icpSN ul{list-style:none;margin:0;padding:0;}#icpSN>ul>li{margin-bottom:20px;}'
    + '#icpSN a,#icpSN button{color:#fff;text-decoration:none;font-size:19px;font-weight:700;'
    + 'text-transform:uppercase;letter-spacing:2px;background:none;border:0;padding:0;cursor:pointer;'
    + 'font-family:inherit;display:flex;align-items:center;gap:10px;width:100%;}'
    + '#icpSN .ar{color:' + GOLD + ';font-size:14px;transition:transform .25s;}'
    + '#icpSN li.op .ar{transform:rotate(90deg);}'
    + '#icpSN .sub{list-style:none;margin:0;padding:0 0 0 16px;max-height:0;overflow:hidden;'
    + 'transition:max-height .3s;border-left:1px solid rgba(201,168,76,.35);}'
    + '#icpSN li.op .sub{max-height:520px;margin-top:14px;}'
    + '#icpSN .sub li{margin-bottom:14px;}#icpSN .sub a{font-size:15px;font-weight:500;color:#c9c9d4;letter-spacing:1px;}'
    + '@media(max-width:1024px){'
    + 'table{display:block;width:100%!important;overflow-x:auto;-webkit-overflow-scrolling:touch;}'
    + 'html,body{overflow-x:hidden!important;max-width:100vw!important;}'
    + 'img,video,iframe{max-width:100%!important;}'
    + '}'
    + '/* 强制隐藏任何可能的旧邮箱按钮残留 */'
    + '#icpFE,.icp-mobile-sticky-cta,.icp-m-footer,.floating-email,.email-float{display:none!important;}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  /* ---------- 2. 注入汉堡菜单 (仅保留核心导航) ---------- */
  var navContainer = document.createElement('div');
  navContainer.innerHTML =
    '<div id="icpSB">&#9776;</div>'
    + '<nav id="icpSN"><span class="x">&times;</span><ul>'
    + '<li><a href="' + B + 'index.html">Home</a></li>'
    + '<li><button type="button" class="tg">Products <span class="ar">&#9656;</span></button><ul class="sub">'
    + '<li><a href="' + B + 'product-rigid-boxes.html">Rigid Boxes</a></li>'
    + '<li><a href="' + B + 'product-paper-bags.html">Paper Bags</a></li>'
    + '<li><a href="' + B + 'product-cake-boxes.html">Cake Boxes</a></li>'
    + '<li><a href="' + B + 'product-mailer-boxes.html">Mailer Boxes</a></li>'
    + '<li><a href="' + B + 'product-kraft-bags.html">Kraft Bags</a></li></ul></li>'
    + '<li><button type="button" class="tg">Industries <span class="ar">&#9656;</span></button><ul class="sub">'
    + '<li><a href="' + B + 'packaging-for-cosmetics-brands.html">Cosmetics</a></li>'
    + '<li><a href="' + B + 'packaging-for-jewelry-brands.html">Jewelry</a></li>'
    + '<li><a href="' + B + 'packaging-for-bakeries.html">Bakery</a></li>'
    + '<li><a href="' + B + 'packaging-for-clothing-boutiques.html">Clothing</a></li>'
    + '<li><a href="' + B + 'packaging-for-candle-brands.html">Candle</a></li>'
    + '<li><a href="' + B + 'packaging-for-perfume-brands.html">Perfume</a></li>'
    + '<li><a href="' + B + 'packaging-for-ecommerce-brands.html">E-commerce</a></li>'
    + '<li><a href="' + B + 'packaging-for-gift-shops.html">Gift Shops</a></li></ul></li>'
    + '<li><a href="' + B + 'index.html#factory">Factory</a></li>'
    + '<li><a href="' + B + 'blog.html">Blog</a></li></ul></nav>';
  document.body.appendChild(navContainer);

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

  /* ---------- 3. 图片兜底 (CDN 级联) ---------- */
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

  /* ---------- 4. 修复问号图标 ---------- */
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
