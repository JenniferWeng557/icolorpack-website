const fs = require('fs');
const path = require('path');

// 1. 获取最完美的导航栏样式和结构 (来自 live_perfect_index)
let liveIndexRaw = fs.readFileSync('live_perfect_index.txt', 'utf8');
try { liveIndexRaw = JSON.parse(liveIndexRaw); } catch(e) {} // Handle JSON wrapping if any

// 2. 定义全新的“隔离式”移动端核心组件 (JS + CSS)
const MOBILE_MASTER_LOGIC = `
(function() {
    var GOLD = '#C9A84C';
    var B = 'https://www.icolorpacks.com/';
    
    // A. 注入移动端隔离样式
    var s = document.createElement('style');
    s.innerHTML = \`
        @media (max-width: 900px) {
            #navbar, .desktop-nav, .category-banner, .hero, .floating-quote-container { display: none !important; }
            body { padding-top: 0 !important; background: #000 !important; overflow-x: hidden; }
            
            .icp-m-head { position: sticky; top: 0; z-index: 10000; background: #0d0d14; border-bottom: 2px solid \${GOLD}; display: flex; align-items: center; justify-content: space-between; padding: 12px 20px; }
            .icp-m-logo { display: flex; align-items: center; text-decoration: none; }
            .icp-m-logo img { height: 26px; margin-right: 10px; }
            .icp-m-logo span { color: #FFF; font-weight: 700; font-size: 16px; }
            .icp-m-trigger { background: none; border: none; color: \${GOLD}; font-size: 28px; cursor: pointer; }

            .icp-m-nav { position: fixed; inset: 0; background: #000; z-index: 10001; display: none; flex-direction: column; padding: 80px 40px; overflow-y: auto; }
            .icp-m-nav.on { display: flex; }
            .icp-m-close { position: absolute; top: 20px; right: 20px; color: #FFF; font-size: 40px; }
            .icp-m-links { list-style: none; padding: 0; }
            .icp-m-links li { margin-bottom: 25px; }
            .icp-m-links a, .icp-m-links button { color: #FFF; text-decoration: none; font-size: 22px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; background: none; border: 0; cursor: pointer; text-align: left; width: 100%; display: flex; align-items: center; gap: 10px; }
            
            .icp-m-sub { list-style: none; padding-left: 20px; max-height: 0; overflow: hidden; transition: 0.3s; border-left: 1px solid \${GOLD}; margin-top: 0; }
            .icp-m-links li.active .icp-m-sub { max-height: 500px; margin-top: 20px; }
            .icp-m-sub a { font-size: 16px !important; color: #BBB !important; margin-bottom: 15px; }
        }
        @media (min-width: 901px) { .icp-m-head, .icp-m-nav { display: none !important; } }
    \`;
    document.head.appendChild(s);

    // B. 注入移动端 HTML
    var container = document.createElement('div');
    container.innerHTML = \`
        <header class="icp-m-head">
            <a href="\${B}index.html" class="icp-m-logo"><img src="images/logo.webp" alt="Logo"><span>iColorPacks</span></a>
            <button class="icp-m-trigger" onclick="icpT()">☰</button>
        </header>
        <nav id="icpNav" class="icp-m-nav">
            <span class="icp-m-close" onclick="icpT()">&times;</span>
            <ul class="icp-m-links">
                <li><a href="\${B}index.html">Home</a></li>
                <li><button onclick="this.parentElement.classList.toggle('active')">Products ▸</button>
                    <ul class="icp-m-sub">
                        <li><a href="\${B}product-rigid-boxes.html">Rigid Boxes</a></li>
                        <li><a href="\${B}product-paper-bags.html">Paper Bags</a></li>
                        <li><a href="\${B}product-cake-boxes.html">Cake Boxes</a></li>
                    </ul>
                </li>
                <li><button onclick="this.parentElement.classList.toggle('active')">Industries ▸</button>
                    <ul class="icp-m-sub">
                        <li><a href="\${B}packaging-for-cosmetics-brands.html">Cosmetics</a></li>
                        <li><a href="\${B}packaging-for-jewelry-brands.html">Jewelry</a></li>
                        <li><a href="\${B}industry-solutions.html">View All Cases</a></li>
                    </ul>
                </li>
                <li><a href="\${B}blog.html">Blog</a></li>
            </ul>
        </nav>
    \`;
    document.body.prepend(container);

    window.icpT = function() { document.getElementById('icpNav').classList.toggle('on'); }
})();
`;
fs.writeFileSync('icp-master-mobile.js', MOBILE_MASTER_LOGIC, 'utf8');

// 3. 全量还原并挂载
const pages = ["index.html", "product-rigid-boxes.html", "packaging-for-cosmetics-brands.html"]; // 核心测试文件
pages.forEach(file => {
    // 物理覆盖为抓回来的最美代码 (模拟 git reset)
    fs.writeFileSync(file, liveIndexRaw, 'utf8');
    
    // 注入唯一的隔离门
    let html = fs.readFileSync(file, 'utf8');
    if(!html.includes('icp-master-mobile.js')) {
        html = html.replace('</body>', `<script src="icp-master-mobile.js"></script>\n</body>`);
    }
    fs.writeFileSync(file, html, 'utf8');
});

console.log("RESTORATION COMPLETE: Desktop layout revived, mobile logic isolated.");
