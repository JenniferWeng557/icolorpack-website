const fs = require('fs');
const path = require('path');

const cssLink = '<link rel="stylesheet" href="/icp-final-floating-fix.css?v=20260709">';
const jsScript = '<script src="/icp-final-floating-fix.js?v=20260709"></script>';

const targetFiles = [
    "index.html",
    "product-rigid-boxes.html",
    "product-paper-bags.html",
    "product-cake-boxes.html",
    "product-mailer-boxes.html",
    "product-kraft-bags.html",
    "industry-solutions.html",
    "custom-packaging-for-cosmetics.html",
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

dirs.forEach(dir => {
    targetFiles.forEach(file => {
        const filePath = path.join(process.cwd(), dir, file);
        if (!fs.existsSync(filePath)) return;

        let html = fs.readFileSync(filePath, 'utf8');
        
        // Inject CSS
        if (!html.includes('icp-final-floating-fix.css')) {
            html = html.replace('</head>', `${cssLink}\n</head>`);
        }
        
        // Inject JS
        if (!html.includes('icp-final-floating-fix.js')) {
            html = html.replace('</body>', `${jsScript}\n</body>`);
        }

        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`Updated: ${dir}/${file}`);
    });
});

// Also copy the CSS/JS to public dir
fs.copyFileSync('icp-final-floating-fix.css', 'public/icp-final-floating-fix.css');
fs.copyFileSync('icp-final-floating-fix.js', 'public/icp-final-floating-fix.js');

console.log("INJECTION COMPLETE.");
