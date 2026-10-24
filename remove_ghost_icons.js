const fs = require('fs');
const path = require('path');

const targetFiles = [
    "index.html",
    "product-rigid-boxes.html",
    "product-paper-bags.html",
    "product-cake-boxes.html",
    "product-mailer-boxes.html",
    "product-kraft-bags.html",
    "industry-solutions.html",
    "packaging-for-cosmetics-brands.html",
    "packaging-for-clothing-boutiques.html",
    "packaging-for-jewelry-brands.html",
    "packaging-for-perfume-brands.html",
    "packaging-for-ecommerce-brands.html",
    "packaging-for-gift-shops.html",
    "packaging-for-bakeries.html",
    "packaging-for-candle-brands.html",
    "blog.html",
    "industry-cases-2026.html"
];

const dirs = ['.', 'public'];

// 定义需要从 HTML 中彻底删除的硬编码悬浮代码特征
const JUNK_PATTERNS = [
    /<a[^>]*class="floating-whatsapp"[\s\S]*?<\/a>/g,
    /<a[^>]*class="icp-m-float-wa"[\s\S]*?<\/a>/g,
    /<div[^>]*class="icp-m-float-plus"[\s\S]*?<\/div>/g,
    /<div[^>]*class="floating-quote"[\s\S]*?<\/div>/g,
    /<div[^>]*class="floating-quote-container"[\s\S]*?<\/div>/g,
    /<a[^>]*class="floating-quote-container"[\s\S]*?<\/a>/g,
    /<!-- SURGICAL MOBILE UI [\s\S]*?<\/script>/g,
    /<!-- FINAL MASTER MOBILE UI -->[\s\S]*?<script id="icp-m-logic">[\s\S]*?<\/script>/g
];

dirs.forEach(dir => {
    const dirPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(dirPath)) return;

    targetFiles.forEach(file => {
        const filePath = path.join(dirPath, file);
        if (!fs.existsSync(filePath)) return;

        let html = fs.readFileSync(filePath, 'utf8');
        let changed = false;

        JUNK_PATTERNS.forEach(p => {
            if (p.test(html)) {
                html = html.replace(p, '');
                changed = true;
            }
        });

        if (changed) {
            fs.writeFileSync(filePath, html, 'utf8');
            console.log(`Physically Purged Duplicates from: ${dir}/${file}`);
        }
    });
});

console.log("SURGICAL GHOST-REMOVAL COMPLETE.");
