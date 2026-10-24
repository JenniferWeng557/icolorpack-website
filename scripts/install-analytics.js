const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const htmlFiles = execFileSync('git', ['ls-files', '*.html'], {
  cwd: root,
  encoding: 'utf8'
}).split(/\r?\n/).filter(Boolean);

const oldTag = /\s*<!-- Google tag \(gtag\.js\) -->\s*<script async src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-MQY10GFCR8"><\/script>\s*<script>\s*window\.dataLayer = window\.dataLayer \|\| \[\];\s*function gtag\(\)\{dataLayer\.push\(arguments\);\}\s*gtag\('js', new Date\(\)\);\s*gtag\('config', 'G-MQY10GFCR8'\);\s*<\/script>\s*/g;

let changed = 0;
for (const relativeFile of htmlFiles) {
  const filename = path.join(root, relativeFile);
  let html = fs.readFileSync(filename, 'utf8');
  const original = html;

  html = html.replace(oldTag, '\n');

  if (!html.includes('src="/icp-analytics.js"') && /<head(?:\s[^>]*)?>/i.test(html)) {
    html = html.replace(/<head(?:\s[^>]*)?>/i, function (head) {
      return head + '\n<script src="/icp-analytics.js" defer></script>';
    });
  }

  if (html !== original) {
    fs.writeFileSync(filename, html, 'utf8');
    changed += 1;
  }
}

fs.copyFileSync(path.join(root, 'icp-analytics.js'), path.join(root, 'public', 'icp-analytics.js'));
console.log('Updated ' + changed + ' tracked HTML files and synchronized public/icp-analytics.js');
