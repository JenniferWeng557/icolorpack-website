const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const tracked = execFileSync('git', ['ls-files', '*.html'], {
  cwd: root,
  encoding: 'utf8'
}).split(/\r?\n/).filter(Boolean)
  .filter((file) => !file.replace(/\\/g, '/').startsWith('public/'));

const redirectFile = path.join(root, '_redirects');
const redirectedPaths = new Set();
if (fs.existsSync(redirectFile)) {
  for (const line of fs.readFileSync(redirectFile, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const source = trimmed.split(/\s+/)[0];
    if (source) redirectedPaths.add(source.replace(/\/$/, '') || '/');
  }
}

const urls = new Set();
for (const relativeFile of tracked) {
  const html = fs.readFileSync(path.join(root, relativeFile), 'utf8');
  if (/<meta\s+name=["']robots["']\s+content=["'][^"']*noindex/i.test(html)) continue;
  const match = html.match(/<link\s+rel=["']canonical["']\s+href=["'](https:\/\/www\.icolorpacks\.com\/[^"]*)["']/i);
  if (match) {
    const canonicalPath = new URL(match[1]).pathname.replace(/\/$/, '') || '/';
    if (!redirectedPaths.has(canonicalPath)) urls.add(match[1]);
  }
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

const lastmod = new Date().toISOString().slice(0, 10);
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
