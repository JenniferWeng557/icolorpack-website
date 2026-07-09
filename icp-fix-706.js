(function () {
  var VER = 'v5.2-final';
  console.log('%c[iColorPacks] icp-fix ' + VER + ' loaded', 'color:#C9A84C;font-weight:bold');

  var GOLD = '#C9A84C', DARK = '#0D0D14';
  var MAIL = 'icolorpacks@gmail.com';
  var B = 'https://www.icolorpacks.com/';

  /* ---------- 1. 注入样式 (包含电脑端强力隐藏) ---------- */
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
    + '#icpFE{position:fixed;bottom:22px;left:20px;z-index:99997;'
    + 'width:52px;height:52px;background:' + GOLD + ';border-radius:50%;display:flex;'
    + 'align-items:center;justify-content:center;box-shadow:0 10px 25px rgba(201,168,76,.35);}'
    + '@media(min-width:769px){'
    + '  #icpFE,.icp-mobile-sticky-cta,.icp-m-footer,.floating-email,.email-float,.email-floating{display:none!important;}'
    + '}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  /* ---------- 2. 注入汉堡菜单 ---------- */
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

  /* ---------- 3. 邮箱浮动按钮 (严防电脑端) ---------- */
  if (window.innerWidth <= 768) {
    var fe = document.createElement('a');
    fe.id = 'icpFE'; fe.href = 'mailto:' + MAIL; fe.setAttribute('aria-label', 'Email Us');
    fe.innerHTML = '<svg viewBox="0 0 24 24" width="26" height="26"><path fill="' + DARK
      + '" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>';
    fe.onclick = function () {
      try { if (navigator.clipboard) navigator.clipboard.writeText(MAIL); } catch (e) {}
      var t = document.createElement('div');
      t.textContent = 'Email copied: ' + MAIL;
      t.style.cssText = 'position:fixed;left:50%;bottom:90px;transform:translateX(-50%);background:'
        + GOLD + ';color:#111;padding:10px 18px;border-radius:24px;font-size:14px;font-weight:600;'
        + 'z-index:100000;box-shadow:0 4px 16px rgba(0,0,0,.4);max-width:90vw;text-align:center;';
      document.body.appendChild(t); setTimeout(function () { t.remove(); }, 2500);
    };
    document.body.appendChild(fe);
  }

  /* ---------- 4. 图片兜底 ---------- */
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
})();
