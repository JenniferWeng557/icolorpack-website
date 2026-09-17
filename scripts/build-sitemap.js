const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const tracked = execFileSync('git', ['ls-files', '*.html'], {
  cwd: root,
  encoding: 'utf8'
}).split(/\r?\n/).filter(Boolean)
  .filter((file) => {
    const normalized = file.replace(/\\/g, '/');
    return !normalized.startsWith('public/') && !normalized.includes('/snippets/');
  });

const redirectFile = path.join(root, '_redirects');
const redirectTargets = new Map();
if (fs.existsSync(redirectFile)) {
  for (const line of fs.readFileSync(redirectFile, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const [source, target, status] = trimmed.split(/\s+/);
    if (source && target && status === '301') redirectTargets.set(source.replace(/\/$/, '') || '/', target);
  }
}

function attributeValue(tag, name) {
  const match = tag.match(new RegExp('\\b' + name + '\\s*=\\s*(?:["\\\']([^"\\\']*)["\\\']|([^\\s>]+))', 'i'));
  return match ? (match[1] || match[2] || '').trim() : '';
}

function canonicalHref(html) {
  for (const match of html.matchAll(/<link\b[^>]*>/gi)) {
    if (attributeValue(match[0], 'rel').toLowerCase() === 'canonical') {
      return attributeValue(match[0], 'href');
    }
  }
  return '';
}

function metaRobots(html) {
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    if (attributeValue(match[0], 'name').toLowerCase() === 'robots') {
      return attributeValue(match[0], 'content');
    }
  }
  return '';
}

const urls = new Set();
const sourceFileByUrl = new Map();
for (const relativeFile of tracked) {
  const html = fs.readFileSync(path.join(root, relativeFile), 'utf8');
  if (/noindex/i.test(metaRobots(html))) continue;
  const filePath = '/' + relativeFile.replace(/\\/g, '/');
  const cleanFilePath = filePath.replace(/\.html$/i, '');
  const canonical = canonicalHref(html);
  if (!canonical || !canonical.startsWith('https://www.icolorpacks.com/')) continue;
  const canonicalPath = new URL(canonical).pathname.replace(/\/$/, '') || '/';
  const fileRedirectTarget = redirectTargets.get(filePath);
  const cleanRedirectTarget = redirectTargets.get(cleanFilePath);
  if ((fileRedirectTarget && fileRedirectTarget !== canonicalPath)
    || (cleanRedirectTarget && cleanRedirectTarget !== canonicalPath)) continue;
  urls.add(canonical);
  if (!sourceFileByUrl.has(canonical)) sourceFileByUrl.set(canonical, relativeFile);
}

urls.add('https://www.icolorpacks.com/');
sourceFileByUrl.set('https://www.icolorpacks.com/', 'index.html');
const ordered = Array.from(urls).sort((a, b) => {
  if (a.endsWith('/')) return -1;
  if (b.endsWith('/')) return 1;
  return a.localeCompare(b);
});

function escapeXml(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function lastModified(relativeFile) {
  try {
    const value = execFileSync('git', ['log', '-1', '--format=%cs', '--', relativeFile], {
      cwd: root,
      encoding: 'utf8'
    }).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  } catch (_) {
    // Fall through to the file date for new files.
  }
  return fs.statSync(path.join(root, relativeFile)).mtime.toISOString().slice(0, 10);
}

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...ordered.map((url) => '  <url><loc>' + escapeXml(url) + '</loc><lastmod>' + lastModified(sourceFileByUrl.get(url)) + '</lastmod></url>'),
  '</urlset>',
  ''
].join('\n');

fs.writeFileSync(path.join(root, 'sitemap.xml'), sitemap, 'utf8');
fs.writeFileSync(path.join(root, 'public', 'sitemap.xml'), sitemap, 'utf8');
console.log('Built sitemap with ' + ordered.length + ' canonical URLs');
