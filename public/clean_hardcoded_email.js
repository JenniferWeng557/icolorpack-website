const fs = require('fs');
const path = require('path');

const targetFiles = [
    'index.html',
    'public/index.html',
    'blog.html',
    'public/blog.html',
    'industry-solutions.html',
    'public/industry-solutions.html'
];

targetFiles.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    if (!fs.existsSync(filePath)) return;

    let html = fs.readFileSync(filePath, 'utf8');

    // 1. 物理删除硬编码的浮动邮件按钮 HTML (index.html 专用)
    html = html.replace(/<a[^>]*class="floating-email"[\s\S]*?<\/a>/g, '');

    // 2. 物理删除对应的 CSS 样式 (index.html 专用)
    html = html.replace(/\.floating-email\s*\{[\s\S]*?\}/g, '');
    // 处理带媒体查询的样式
    html = html.replace(/\.floating-email\s*\{[^}]*!important;[^}]*\}/g, '');

    // 3. 额外清理：如果其他子页面也有类似的 class 残留
    html = html.replace(/class="email-float"/g, 'class="hidden-email"');
    html = html.replace(/class="floating-email"/g, 'class="hidden-email"');

    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`Physically Cleaned Email Button from: ${file}`);
});
