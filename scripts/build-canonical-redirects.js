const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const origin = 'https://www.icolorpacks.com';
const redirectPath = path.join(root, '_redirects');
const begin = '# BEGIN GENERATED CANONICAL REDIRECTS';
const end = '# END GENERATED CANONICAL REDIRECTS';

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

const files = execFileSync('git', ['ls-files', '*.html'], { cwd: root, encoding: 'utf8' })
  .split(/\r?\n/).filter(Boolean)
  .filter((file) => {
    const normalized = file.replace(/\\/g, '/');
    return !normalized.startsWith('public/') && !normalized.includes('/snippets/') && normalized !== '404.html';
  });

const rules = new Set();
for (const file of files) {
  const normalized = file.replace(/\\/g, '/');
  if (normalized === 'index.html') continue;
  const canonical = canonicalPath(fs.readFileSync(path.join(root, file), 'utf8'));
  if (!canonical) continue;
  const filePath = '/' + normalized;
  const cleanPath = filePath.replace(/\.html$/i, '');
  if (filePath !== canonical) rules.add(filePath + '  ' + canonical + '  301');
  if (cleanPath !== canonical) rules.add(cleanPath + '  ' + canonical + '  301');
}

const existing = fs.readFileSync(redirectPath, 'utf8');
const blockPattern = new RegExp('\\n?' + begin + '[\\s\\S]*?' + end + '\\n?', 'm');
const manual = existing.replace(blockPattern, '\n').trimEnd();
const manualSources = new Set();
for (const line of manual.split(/\r?\n/)) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  manualSources.add(trimmed.split(/\s+/)[0]);
}
const generatedRules = Array.from(rules).filter((rule) => !manualSources.has(rule.split(/\s+/)[0])).sort();
const generated = [begin, ...generatedRules, end].join('\n');
fs.writeFileSync(redirectPath, manual + '\n\n' + generated + '\n', 'utf8');
console.log('Built ' + generatedRules.length + ' canonical redirect rules');
