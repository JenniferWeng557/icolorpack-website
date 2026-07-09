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
    "custom-packaging-for-cosmetics.html",
    "custom-packaging-for-jewelry.html",
    "packaging-for-bakeries.html",
    "custom-packaging-for-clothing-brands.html",
    "packaging-for-candle-brands.html",
    "custom-packaging-for-perfume.html",
    "blog.html",
    "industry-cases-2026.html"
];

const dirs = ['.', 'public'];

const junkPatterns = [
    /<a[^>]*class="floating-whatsapp"[\s\S]*?<\/a>/g,
    /<a[^>]*class="floating-quote-container"[\s\S]*?<\/a>/g,
    /<div[^>]*class="floating-quote"[\s\S]*?<\/div>/g,
    /<div[^>]*class="floating-quote-container"[\s\S]*?<\/div>/g,
    /<div[^>]*class="icp-mobile-sticky-cta"[\s\S]*?<\/div>/g,
    /<div[^>]*class="icp-m-footer"[\s\S]*?<\/div>/g,
    /<a[^>]*href="mailto:[^"]*"[^>]*class="is-secondary"[^>]*>[\s\S]*?<\/a>/g,
    /<a[^>]*class="wa-float"[\s\S]*?<\/a>/g,
    /<a[^>]*class="rollback-floating-quote"[\s\S]*?<\/a>/g,
    /<style>\.rollback-floating-quote[\s\S]*?<\/style>/g
];

dirs.forEach(dir => {
    targetFiles.forEach(file => {
        const filePath = path.join(process.cwd(), dir, file);
        if (fs.existsSync(filePath)) {
            let html = fs.readFileSync(filePath, 'utf8');
            let changed = false;

            // Remove junk components
            junkPatterns.forEach(pattern => {
                if (pattern.test(html)) {
                    html = html.replace(pattern, '');
                    changed = true;
                }
            });

            // Specific cleanup for Email Us buttons in mobile sections if they aren't caught
            html = html.replace(/<a[^>]*>Email Us<\/a>/gi, (match) => {
                if (match.includes('mailto:')) return '';
                return match;
            });

            if (changed) {
                fs.writeFileSync(filePath, html, 'utf8');
                console.log(`Cleaned up hardcoded buttons in: ${dir}/${file}`);
            }
        }
    });
});

console.log("HARDCODED BUTTON CLEANUP COMPLETE.");
