const fs = require('fs');
const path = require('path');

const sourceDir = 'icon_fix_final_temp';
const targetDirs = ['.', 'public'];
const filesToReplace = [
    'product-cake-boxes.html',
    'product-kraft-bags.html',
    'product-mailer-boxes.html',
    'product-rigid-boxes.html'
];

filesToReplace.forEach(file => {
    const srcPath = path.join(sourceDir, file);
    if (!fs.existsSync(srcPath)) {
        console.error(`Source file not found: ${file}`);
        return;
    }

    // Read as buffer to keep it exactly as-is (binary safety)
    const content = fs.readFileSync(srcPath);

    targetDirs.forEach(dir => {
        const destPath = path.join(process.cwd(), dir, file);
        // Ensure parent directory exists (especially for public/)
        if (!fs.existsSync(path.dirname(destPath))) {
            fs.mkdirSync(path.dirname(destPath), { recursive: true });
        }
        fs.writeFileSync(destPath, content);
        console.log(`Physically Replaced (As-Is): ${dir}/${file} (${content.length} bytes)`);
    });
});

console.log("ICON HARDENING REPLACEMENT PREPARED.");
