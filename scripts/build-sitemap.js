const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const tracked = execFileSync('git', ['ls-files', '*.html'], {
  cwd: root,
  encoding: 'utf8'
}).split(/\r?\n/).filter(Boolean)
  .filter((file) => !file.replace(/\\/g, '/').startsWith('public/'));

const urls = new Set();
for (const relativeFile of tracked) {
  const html = fs.readFileSync(path.join(root, relativeFile), 'utf8');
  const match = html.match(/<link\s+rel=["']canonical["']\s+href=["'](https:\/\/www\.icolorpacks\.com\/[^"]*)["']/i);
  if (match) urls.add(match[1]);
}

urls.add('https://www.icolorpacks.com/');
const ordered = Array.from(urls).sort((a, b) => {
  if (a.endsWith('/')) return -1;
  if (b.endsWith('/')) return 1;
  return a.localeCompare(b);
});

function escapeXml(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const lastmod = '2026-09-10';
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...ordered.map((url) => '  <url><loc>' + escapeXml(url) + '</loc><lastmod>' + lastmod + '</lastmod></url>'),
  '</urlset>',
  ''
].join('\n');

fs.writeFileSync(path.join(root, 'sitemap.xml'), sitemap, 'utf8');
fs.writeFileSync(path.join(root, 'public', 'sitemap.xml'), sitemap, 'utf8');
console.log('Built sitemap with ' + ordered.length + ' canonical URLs');
