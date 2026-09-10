const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const files = execFileSync('git', ['ls-files', '*.html'], {
  cwd: root,
  encoding: 'utf8'
}).split(/\r?\n/).filter(Boolean);

function decodeLine(line) {
  if (line === '') return '';
  if (line[0] !== '"' || line[line.length - 1] !== '"') {
    throw new Error('quoted line is missing its boundary markers');
  }

  const parts = line.slice(1, -1).split('"');
  let result = '';
  for (let i = 0; i < parts.length; i += 1) {
    if (parts[i] !== '') {
      result += parts[i];
    } else if (parts[i + 1] === '') {
      result += '"';
      i += 1;
    }
  }
  return result.replace(/\uFFFD\?/g, '\u2014');
}

const repairs = [];
for (const relativeFile of files) {
  const filename = path.join(root, relativeFile);
  const input = fs.readFileSync(filename, 'utf8');
  if (input.includes('<html') || !input.includes('"<"h"t"m"l')) continue;

  const hadFinalNewline = /\r?\n$/.test(input);
  const lines = input.replace(/\r\n/g, '\n').split('\n');
  if (hadFinalNewline) lines.pop();

  let decodedLines;
  try {
    decodedLines = lines.map(decodeLine);
  } catch (error) {
    throw new Error(relativeFile + ': ' + error.message);
  }
  const output = decodedLines.join('\n') + (hadFinalNewline ? '\n' : '');
  if (!/^<!DOCTYPE html>/i.test(output.trimStart()) || !/<html\b/i.test(output) || !/<\/html>/i.test(output)) {
    throw new Error(relativeFile + ': decoded output failed HTML structure validation');
  }
  repairs.push({ filename, output });
}

for (const repair of repairs) fs.writeFileSync(repair.filename, repair.output, 'utf8');
console.log('Repaired ' + repairs.length + ' quoted HTML files');
