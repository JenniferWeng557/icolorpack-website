const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const files = execFileSync('git', ['ls-files', 'blog/*.html', 'public/blog/*.html'], {
  cwd: root,
  encoding: 'utf8'
}).split(/\r?\n/).filter(Boolean);

let changed = 0;
for (const relativeFile of files) {
  const filename = path.join(root, relativeFile);
  const input = fs.readFileSync(filename, 'utf8');
  let output = input;
  if (output.includes('rel=""canonical""')) output = output.replace(/""/g, '"');
  output = output.replace(/\b([A-Za-z]+)\u2014(s|t|re|ve|ll|d|m)\b/g, '$1\u2019$2');
  const hadFinalNewline = /\r?\n$/.test(output);
  const outputLines = output.replace(/\r\n/g, '\n').split('\n');
  if (hadFinalNewline) outputLines.pop();
  output = outputLines.map((line) => line.trimEnd()).join('\n') + (hadFinalNewline ? '\n' : '');
  if (output === input) continue;
  if (!/<link\s+rel="canonical"\s+href="https:\/\/www\.icolorpacks\.com\/[^"]*">/i.test(output)) {
    throw new Error(relativeFile + ': canonical validation failed');
  }
  fs.writeFileSync(filename, output, 'utf8');
  changed += 1;
}

console.log('Normalized ' + changed + ' repaired HTML files');
