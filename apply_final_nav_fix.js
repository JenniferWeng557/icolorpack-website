const fs = require('fs');
const path = require('path');

const ARROW = ' <span style="font-size: 8px; margin-left: 5px; vertical-align: middle; opacity: 0.8;">▼</span>';

const TARGET_FILES = [
    "index.html", "product-rigid-boxes.html", "product-paper-bags.html", "product-cake-boxes.html", "product-mailer-boxes.html", "product-kraft-bags.html",
    "industry-solutions.html", "packaging-for-cosmetics-brands.html", "packaging-for-jewelry-brands.html", "packaging-for-bakeries.html",
    "packaging-for-clothing-boutiques.html", "packaging-for-candle-brands.html", "packaging-for-perfume-brands.html", "blog.html"
];

TARGET_FILES.forEach(file => {
    if (!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');

    // 1. 强制补齐三角标
    if (!html.includes('▼')) {
        html = html.replace(/PRODUCTS(\s*<\/a>)/i, `PRODUCTS${ARROW}$1`);
        html = html.replace(/INDUSTRIES(\s*<\/a>)/i, `INDUSTRIES${ARROW}$1`);
    }

    // 2. 强制 INSIGHTS -> BLOG
    html = html.replace(/>(\s*)INSIGHTS(\s*)<\/a>/gi, '>$1BLOG$2</a>');
    html = html.replace(/href="insights\.html"/gi, 'href="blog.html"');

    // 3. 强制确保左下角有绿色 WhatsApp (带金边阴影)
    if (!html.includes('floating-whatsapp')) {
        const wa = `<a href="https://wa.me/8618058355198" class="floating-whatsapp" target="_blank" style="position:fixed; bottom:40px; left:40px; z-index:9000; width:55px; height:55px; background:#25D366; border-radius:50%; display:flex !important; align-items:center; justify-content:center; box-shadow:0 10px 25px rgba(201,168,76,0.3);"><svg viewBox="0 0 24 24" width="32" height="32"><path fill="white" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.672 1.433 5.662 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg></a>`;
        html = html.replace('</body>', `${wa}\n</body>`);
    }

    fs.writeFileSync(file, html, 'utf8');
    
    // 同步到 public
    if (fs.existsSync('public')) {
        fs.writeFileSync(path.join('public', file), html, 'utf8');
    }
});

console.log("FINAL NAVIGATION & ICON FIX COMPLETE.");
