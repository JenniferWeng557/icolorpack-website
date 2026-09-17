const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const origin = 'https://www.icolorpacks.com';
const files = execFileSync('git', ['ls-files', '*.html'], { cwd: root, encoding: 'utf8' })
  .split(/\r?\n/).filter(Boolean)
  .filter((file) => !file.replace(/\\/g, '/').startsWith('public/'));

function attr(tag, name) {
  const match = tag.match(new RegExp('\\b' + name + '\\s*=\\s*(?:["\\\']([^"\\\']*)["\\\']|([^\\s>]+))', 'i'));
  return match ? (match[1] || match[2] || '') : '';
}

function canonicalPath(html) {
  for (const match of html.matchAll(/<link\b[^>]*>/gi)) {
    if (attr(match[0], 'rel').toLowerCase() !== 'canonical') continue;
    const href = attr(match[0], 'href');
    if (href.startsWith(origin)) return new URL(href).pathname;
  }
  return '';
}

const canonicalByFile = new Map();
for (const file of files) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  const canonical = canonicalPath(html);
  if (canonical) canonicalByFile.set(file.replace(/\\/g, '/'), canonical);
}

const aliases = new Map([
  ['/factory', '/#factory'],
  ['/factory.html', '/#factory'],
  ['/industries', '/industry-cases-2026'],
  ['/blog/index', '/blog'],
  ['/custom-paper-bags-with-logo', '/product-paper-bags'],
  ['/custom-corrugated-mailer-boxes', '/product-mailer-boxes'],
  ['/blog/2026-05-24-the-architecture-of-tactile-luxury.html', '/blog/the-architecture-of-tactile-luxury'],
  ['/blog/moving-billboard-paper-shopping-bags-r6.html', '/blog/moving-billboard-paper-shopping-bags']
]);

function targetFileFor(pathname) {
  if (pathname === '/') return 'index.html';
  const clean = pathname.replace(/^\//, '').replace(/\/$/, '');
  const candidates = [clean, clean + '.html', clean + '/index.html'];
  return candidates.find((candidate) => canonicalByFile.has(candidate)) || '';
}

let changedFiles = 0;
let changedLinks = 0;
for (const file of files) {
  const absolute = path.join(root, file);
  const original = fs.readFileSync(absolute, 'utf8');
  const baseUrl = origin + '/' + file.replace(/\\/g, '/');
  const updated = original.replace(/\bhref=(["'])([^"']+)\1/gi, (whole, quote, href) => {
    if (!href || /^(?:#|javascript:|mailto:|tel:|data:|https?:\/\/|\/\/)/i.test(href)) return whole;
    let normalizedHref = href;
    if (href === 'index') normalizedHref = '/';
    if (file.replace(/\\/g, '/').startsWith('blog/') && /^blog\//i.test(href)) normalizedHref = '/' + href;
    let resolved;
    try {
      resolved = new URL(normalizedHref, baseUrl);
    } catch (_) {
      return whole;
    }
    if (resolved.origin !== origin) return whole;
    const alias = aliases.get(resolved.pathname);
    if (alias) {
      changedLinks += 1;
      return 'href=' + quote + alias + resolved.search + resolved.hash + quote;
    }
    const targetFile = targetFileFor(resolved.pathname);
    if (!targetFile) return whole;
    const canonical = canonicalByFile.get(targetFile);
    const replacement = canonical + resolved.search + resolved.hash;
    if (replacement === href) return whole;
    changedLinks += 1;
    return 'href=' + quote + replacement + quote;
  });
  if (updated !== original) {
    fs.writeFileSync(absolute, updated, 'utf8');
    changedFiles += 1;
  }
}

console.log(JSON.stringify({ changedFiles, changedLinks }, null, 2));
