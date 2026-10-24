const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const siteOrigin = 'https://www.icolorpacks.com';
const trackedHtml = execFileSync('git', ['ls-files', '*.html'], {
  cwd: root,
  encoding: 'utf8'
}).split(/\r?\n/).filter(Boolean)
  .filter((file) => {
    const normalized = file.replace(/\\/g, '/');
    return !normalized.startsWith('public/') && !normalized.includes('/snippets/');
  });

const redirectRules = new Map();
const redirectFile = path.join(root, '_redirects');
if (fs.existsSync(redirectFile)) {
  for (const line of fs.readFileSync(redirectFile, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const [source, target, status] = trimmed.split(/\s+/);
    if (source && target && status === '301') redirectRules.set(source, target);
  }
}

function pagePath(relativeFile) {
  const normalized = relativeFile.replace(/\\/g, '/');
  if (normalized === 'index.html') return '/';
  return '/' + normalized.replace(/\.html$/i, '');
}

function firstMatch(html, regex) {
  const match = html.match(regex);
  return match ? match[1].trim() : '';
}

function attributeValue(tag, name) {
  const match = tag.match(new RegExp('\\b' + name + '\\s*=\\s*(?:["\\\']([^"\\\']*)["\\\']|([^\\s>]+))', 'i'));
  return match ? (match[1] || match[2] || '').trim() : '';
}

function metaContent(html, name) {
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    if (attributeValue(match[0], 'name').toLowerCase() === name.toLowerCase()) {
      return attributeValue(match[0], 'content');
    }
  }
  return '';
}

function canonicalHref(html) {
  for (const match of html.matchAll(/<link\b[^>]*>/gi)) {
    if (attributeValue(match[0], 'rel').toLowerCase() === 'canonical') {
      return attributeValue(match[0], 'href');
    }
  }
  return '';
}

const pages = trackedHtml.map((file) => {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  const canonical = canonicalHref(html);
  const canonicalCount = Array.from(html.matchAll(/<link\b[^>]*>/gi))
    .filter((match) => attributeValue(match[0], 'rel').toLowerCase() === 'canonical').length;
  const robots = metaContent(html, 'robots');
  const title = firstMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const description = metaContent(html, 'description');
  const h1Count = (html.match(/<h1\b/gi) || []).length;
  const wordCount = html.replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z0-9#]+;/gi, ' ')
    .trim().split(/\s+/).filter(Boolean).length;
  return {
    file,
    path: pagePath(file),
    canonical,
    canonicalCount,
    robots,
    title,
    description,
    h1Count,
    wordCount
  };
});

const canonicalOwners = new Map();
for (const page of pages) {
  if (!page.canonical) continue;
  const list = canonicalOwners.get(page.canonical) || [];
  list.push(page.file);
  canonicalOwners.set(page.canonical, list);
}

const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const sitemapUrls = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g), (match) => match[1]);
const expectedFiles = new Map();
for (const page of pages) {
  expectedFiles.set(siteOrigin + page.path, page);
  if (page.canonical) expectedFiles.set(page.canonical, page);
}
const redirectedFiles = new Set(pages.filter((page) => redirectRules.has(page.path) || redirectRules.has('/' + page.file.replace(/\\/g, '/'))).map((page) => page.file));
const validInternalPaths = new Set(['/']);
for (const page of pages) {
  validInternalPaths.add(page.path.replace(/\/$/, '') || '/');
  validInternalPaths.add(('/' + page.file.replace(/\\/g, '/')).replace(/\/$/, '') || '/');
  if (page.canonical) validInternalPaths.add(new URL(page.canonical).pathname.replace(/\/$/, '') || '/');
}
for (const [source, target] of redirectRules) {
  validInternalPaths.add(source.replace(/\/$/, '') || '/');
  if (target.startsWith('/')) validInternalPaths.add(target.replace(/\/$/, '') || '/');
}

const brokenInternalLinks = [];
const invalidJsonLd = [];
for (const page of pages) {
  if (redirectedFiles.has(page.file)) continue;
  const html = fs.readFileSync(path.join(root, page.file), 'utf8');
  const base = siteOrigin + '/' + page.file.replace(/\\/g, '/');
  for (const match of html.matchAll(/<a\b[^>]*>/gi)) {
    const href = attributeValue(match[0], 'href');
    if (!href || /^(?:#|javascript:|mailto:|tel:|data:)/i.test(href)) continue;
    let resolved;
    try {
      resolved = new URL(href, base);
    } catch (_) {
      continue;
    }
    if (resolved.origin !== siteOrigin) continue;
    const target = resolved.pathname.replace(/\/$/, '') || '/';
    if (!validInternalPaths.has(target)) brokenInternalLinks.push({ file: page.file, href, target });
  }
  for (const match of html.matchAll(/<script\b[^>]*type\s*=\s*(?:["']application\/ld\+json["']|application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      JSON.parse(match[1].trim());
    } catch (error) {
      invalidJsonLd.push({ file: page.file, error: error.message });
    }
  }
}

const report = {
  totals: {
    trackedHtml: pages.length,
    sitemapUrls: sitemapUrls.length,
    indexablePages: pages.filter((page) => !/noindex/i.test(page.robots)).length,
    noindexPages: pages.filter((page) => /noindex/i.test(page.robots)).length
  },
  missingCanonical: pages.filter((page) => !page.canonical && !/noindex/i.test(page.robots) && !redirectedFiles.has(page.file)).map((page) => page.file),
  multipleCanonicalTags: pages.filter((page) => page.canonicalCount > 1)
    .map((page) => ({ file: page.file, canonicalCount: page.canonicalCount })),
  nonSelfCanonical: pages.filter((page) => page.canonical && page.canonical !== siteOrigin + page.path && !redirectedFiles.has(page.file))
    .map((page) => ({ file: page.file, expected: siteOrigin + page.path, actual: page.canonical })),
  duplicateCanonical: Array.from(canonicalOwners.entries())
    .map(([canonical, files]) => ({ canonical, files: files.filter((file) => !redirectedFiles.has(file)) }))
    .filter((item) => item.files.length > 1),
  missingDescription: pages.filter((page) => !page.description && !/noindex/i.test(page.robots) && !redirectedFiles.has(page.file)).map((page) => page.file),
  invalidH1: pages.filter((page) => !/noindex/i.test(page.robots) && !redirectedFiles.has(page.file) && page.h1Count !== 1)
    .map((page) => ({ file: page.file, h1Count: page.h1Count })),
  missingAnalytics: pages.filter((page) => {
    if (/noindex/i.test(page.robots) || redirectedFiles.has(page.file)) return false;
    const html = fs.readFileSync(path.join(root, page.file), 'utf8');
    return !/<script\b[^>]*src=["']\/icp-analytics\.js["'][^>]*>/i.test(html);
  }).map((page) => page.file),
  inquiryPagesWithoutAnalytics: pages.filter((page) => {
    if (redirectedFiles.has(page.file)) return false;
    const html = fs.readFileSync(path.join(root, page.file), 'utf8');
    return /formspree\.io\/f\/maeypklz/i.test(html)
      && !/<script\b[^>]*src=["']\/icp-analytics\.js["'][^>]*>/i.test(html);
  }).map((page) => page.file),
  thinIndexable: pages.filter((page) => !/noindex/i.test(page.robots) && !redirectedFiles.has(page.file) && page.wordCount < 250)
    .map((page) => ({ file: page.file, wordCount: page.wordCount })),
  sitemapMissingLocalTarget: sitemapUrls.filter((url) => !expectedFiles.has(url)),
  indexableMissingFromSitemap: pages.filter((page) => !/noindex/i.test(page.robots) && !redirectedFiles.has(page.file) && page.canonical === siteOrigin + page.path && !sitemapUrls.includes(page.canonical))
    .map((page) => page.file),
  noindexInSitemap: pages.filter((page) => /noindex/i.test(page.robots) && page.canonical && sitemapUrls.includes(page.canonical))
    .map((page) => page.file),
  htmlVariantsWithoutRedirect: pages.filter((page) => {
    if (/noindex/i.test(page.robots) || redirectedFiles.has(page.file) || page.file === 'index.html') return false;
    const legacyPath = '/' + page.file.replace(/\\/g, '/');
    return page.canonical && new URL(page.canonical).pathname !== legacyPath && !redirectRules.has(legacyPath);
  }).map((page) => ({ file: page.file, target: new URL(page.canonical).pathname })),
  brokenInternalLinks,
  invalidJsonLd
};

console.log(JSON.stringify(report, null, 2));

const hasCriticalIssues = report.missingCanonical.length
  || report.multipleCanonicalTags.length
  || report.duplicateCanonical.length
  || report.sitemapMissingLocalTarget.length
  || report.noindexInSitemap.length
  || report.htmlVariantsWithoutRedirect.length
  || report.brokenInternalLinks.length
  || report.invalidJsonLd.length
  || report.missingAnalytics.length
  || report.inquiryPagesWithoutAnalytics.length;
if (hasCriticalIssues) process.exitCode = 1;
