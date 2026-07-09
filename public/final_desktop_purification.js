const fs = require('fs');
const path = require('path');

const FORCED_DESKTOP_HIDE_CSS = `
  /* STRETCH: FORCE HIDE MOBILE ELEMENTS ON DESKTOP */
  @media (min-width: 769px) {
    .icp-mobile-sticky-cta,
    .icp-m-footer,
    .floating-email,
    .email-float,
    .email-floating,
    #icpFE,
    a[href^="mailto:"].floating-email,
    a[href^="mailto:"].email-float,
    .icp-mobile-sticky-cta a[href^="mailto:"],
    .icp-m-footer a[href^="mailto:"] {
      display: none !important;
    }
  }
`;

const dirs = ['.', 'public', 'deploy_ready'];

dirs.forEach(dir => {
    const dirPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(dirPath)) return;

    const files = fs.readdirSync(dirPath);
    files.forEach(file => {
        if (file.endsWith('.html')) {
            const filePath = path.join(dirPath, file);
            let html = fs.readFileSync(filePath, 'utf8');

            // 1. 注入强力隐藏样式
            if (!html.includes('FORCE HIDE MOBILE ELEMENTS ON DESKTOP')) {
                html = html.replace('</head>', `<style>${FORCED_DESKTOP_HIDE_CSS}</style>\n</head>`);
            }

            // 2. 物理检查：如果代码中还有硬编码的 floating-email 容器，直接删除
            html = html.replace(/<a[^>]*class="floating-email"[\s\S]*?<\/a>/g, '');
            html = html.replace(/<a[^>]*class="email-float"[\s\S]*?<\/a>/g, '');

            fs.writeFileSync(filePath, html, 'utf8');
            console.log(`Physically Purged Desktop Email Icons from: ${dir}/${file}`);
        }
    });
});
