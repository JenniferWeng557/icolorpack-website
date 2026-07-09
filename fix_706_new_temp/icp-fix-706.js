/* ================================================================
   iColorPacks 子页面一体化修复脚本  icp-subpage.js
   ----------------------------------------------------------------
   用法(每个子页面只需这一行,放在 </body> 之前):
     <script src="https://www.icolorpacks.com/icp-subpage.js"></script>
   一行搞定:手机汉堡菜单 + 图片破图兜底 + 邮箱按钮 + 表格横向滑动。
   桌面端(>768px)只做图片兜底,不改变任何排版。
   ⚠️ 请勿在首页 index.html 引入(首页已内置这些逻辑)。
   ================================================================ */
(function () {
  console.log('%c[iColorPacks] icp-fix v3 loaded', 'color:#C9A84C;font-weight:bold');
  /* 肉眼可见的版本角标:右下角绿色 v3,3秒后淡出。看到=新版已生效 */
  try {
    var badge = document.createElement('div');
    badge.textContent = 'v3 ✓';
    badge.style.cssText = 'position:fixed;right:8px;bottom:8px;z-index:2147483647;'
      + 'background:#25D366;color:#fff;font:600 12px/1 sans-serif;padding:6px 10px;'
      + 'border-radius:12px;opacity:.95;box-shadow:0 2px 8px rgba(0,0,0,.4);'
      + 'transition:opacity 1s ease 2.5s;';
    (document.body || document.documentElement).appendChild(badge);
    setTimeout(function(){ badge.style.opacity = '0'; }, 100);
    setTimeout(function(){ badge.remove(); }, 4000);
  } catch (e) {}
  var GOLD = '#C9A84C', DARK = '#0D0D14';
  var WA = 'https://wa.me/8618058355198';
  var MAIL = 'icolorpacks@gmail.com';

  /* ---------- 1. 注入样式 ---------- */
  var css = ''
    /* 隐藏此前误粘贴进子页面的无样式菜单块(蓝紫色链接堆) */
    + '.icp-mobile-nav-overlay,.icp-mobile-header,.icp-mobile-hero,'
    + '.icp-mobile-sticky-cta,.icp-sub-toggle,.icp-sub-menu{display:none!important;}'
    /* 汉堡按钮:默认隐藏,窄屏显示。层级高于页面原导航(通常z-index:1000) */
    + '#icpSB{display:none!important;}'
    + '@media(max-width:1024px){'
    + '#icpSB{display:flex!important;align-items:center;justify-content:center;position:fixed!important;'
    + 'top:14px;right:14px;z-index:2147483646;width:46px;height:46px;border:1px solid rgba(201,168,76,.6);'
    + 'border-radius:8px;background:rgba(13,13,20,.96);color:' + GOLD + ';font-size:24px;line-height:1;cursor:pointer;'
    + 'box-shadow:0 4px 14px rgba(0,0,0,.5);}'
    /* 窄屏强制隐藏页面原有导航链接和 Inquiry 按钮,避免与汉堡按钮重叠 */
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
    /* 表格横向滑动,不撑破页面 */
    + '@media(max-width:1024px){'
    + 'table{display:block;width:100%!important;overflow-x:auto;-webkit-overflow-scrolling:touch;}'
    + 'html,body{overflow-x:hidden!important;max-width:100vw!important;}'
    + 'img,video,iframe{max-width:100%!important;}'
    + '}'
    /* 邮箱浮动按钮 */
    + '#icpFE{position:fixed;bottom:22px;left:50%;transform:translateX(-50%);z-index:99997;'
    + 'width:52px;height:52px;background:' + GOLD + ';border-radius:50%;display:flex;'
    + 'align-items:center;justify-content:center;box-shadow:0 10px 25px rgba(201,168,76,.35);}'
    + '}'; /* end media */
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  /* ---------- 2. 注入汉堡按钮 + 菜单 ---------- */
  var B = 'https://www.icolorpacks.com/';
  var nav = document.createElement('div');
  nav.innerHTML =
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
  document.body.appendChild(nav);

  var SB = document.getElementById('icpSB'), SN = document.getElementById('icpSN');
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

  /* ---------- 3. 邮箱浮动按钮 ---------- */
  var fe = document.createElement('a');
  fe.id = 'icpFE'; fe.href = 'mailto:' + MAIL; fe.setAttribute('aria-label', 'Email Us');
  fe.innerHTML = '<svg viewBox="0 0 24 24" width="26" height="26"><path fill="' + DARK
    + '" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>';
  fe.onclick = function () {
    try {
      if (navigator.clipboard) navigator.clipboard.writeText(MAIL);
    } catch (e) {}
    var t = document.createElement('div');
    t.textContent = 'Email copied: ' + MAIL;
    t.style.cssText = 'position:fixed;left:50%;bottom:90px;transform:translateX(-50%);background:'
      + GOLD + ';color:#111;padding:10px 18px;border-radius:24px;font-size:14px;font-weight:600;'
      + 'z-index:100000;box-shadow:0 4px 16px rgba(0,0,0,.4);max-width:90vw;text-align:center;';
    document.body.appendChild(t); setTimeout(function () { t.remove(); }, 2500);
  };
  document.body.appendChild(fe);

  /* ---------- 4. 图片兜底(探针 + CDN 级联) ---------- */
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
  /* 探针:若服务器对缺失图返回占位图(HTTP200),主动全量切CDN */
  var probe = new Image();
  probe.onload = function () {
    document.querySelectorAll('img').forEach(function (el) {
      var m = (el.src || '').split('?')[0].match(/icolorpacks\.com\/images\/(A[A-Za-z0-9]{10,}\.(?:webp|png|jpg))$/);
      if (m) { el.dataset.t = '1'; el.src = HOSTS[0] + m[1]; }
    });
  };
  probe.src = B + 'images/icp-probe-404-' + Date.now() + '.webp';

  /* ---------- 5. 修复"问号图标":把 feature 图标里的 ? 换成 SVG ---------- */
  /* 这些图标原本是 emoji,被保存时转成了字面的 ? ;此处按标题就地重画为 SVG */
  var ICONS = {
    'FOOD GRADE SAFETY': 'cake', 'STRUCTURAL STRENGTH': 'shield', 'EASY ASSEMBLY': 'box',
    'PREMIUM UNBOXING': 'gift', 'CRUSH RESISTANCE': 'shield', 'BRAND PRECISION': 'target',
    'LUXURY PERCEPTION': 'gift', 'STRUCTURAL INTEGRITY': 'shield', 'FULL CUSTOMIZATION': 'box',
    'PREMIUM MATERIALS': 'cake', 'ECO FRIENDLY': 'leaf', 'ECO-FRIENDLY': 'leaf'
  };
  function svgPath(name) {
    var g = GOLD, p = {
      cake: '<path d="M12 6V3m-3 3V4m6 2V4"/><path d="M5 10c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v2H5z"/><path d="M4 12h16v7a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/><path d="M4 15c1.5 0 1.5 1.5 3 1.5s1.5-1.5 3-1.5 1.5 1.5 3 1.5 1.5-1.5 3-1.5"/>',
      shield: '<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/>',
      box: '<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',
      gift: '<path d="M4 9h16v11H4z"/><path d="M2 9h20v3H2zM12 9v11"/><path d="M12 9S10 4 7.5 4 5 7 7 9m5 0s2-5 4.5-5S19 7 17 9"/>',
      target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/>',
      leaf: '<path d="M11 20A7 7 0 0 1 4 13c0-6 8-9 15-9 0 7-3 15-9 15z"/><path d="M5 20c4-4 7-6 11-7"/>'
    };
    return '<svg viewBox="0 0 24 24" width="42" height="42" fill="none" stroke="' + g
      + '" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + (p[name] || p.box) + '</svg>';
  }
  function fixQmarks() {
    var all = document.querySelectorAll('div,span,p,i');
    for (var i = 0; i < all.length; i++) {
      var el = all[i];
      // 只处理内容正好是 ? 且没有子元素的小图标容器
      if (el.children.length === 0 && el.textContent.trim() === '?') {
        var fs = parseInt((window.getComputedStyle(el).fontSize || '0'), 10);
        if (fs >= 28) {  // 大字号 = 图标位,不是正文里的问号
          // 找相邻标题决定图标
          var title = '';
          var sib = el.nextElementSibling || (el.parentElement && el.parentElement.querySelector('h1,h2,h3,h4,h5'));
          if (sib) title = (sib.textContent || '').trim().toUpperCase();
          el.innerHTML = svgPath(ICONS[title] || 'box');
        }
      }
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fixQmarks);
  else fixQmarks();
  setTimeout(fixQmarks, 600);
})();
