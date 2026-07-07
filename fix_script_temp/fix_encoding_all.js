/* ============================================================
   iColorPacks 全站编码批量修复脚本  fix_encoding_all.js
   ------------------------------------------------------------
   作用:把网站根目录(及 public/)下所有 .html 文件里
   会因编码损坏而变成 ? / ◇◇ / �? 的特殊字符,统一替换成
   永不损坏的 HTML 实体码。只改 HTML 文本,不碰 CSS/JS 引号。
   用法:node fix_encoding_all.js
   ============================================================ */
const fs = require('fs');
const path = require('path');

// 需要替换的字符 → HTML实体(实体码是纯ASCII,任何编码都不会坏)
const MAP = [
  ['\u2192', '&rarr;'],   // → 右箭头
  ['\u2190', '&larr;'],   // ← 左箭头
  ['\u2014', '&mdash;'],  // — 长破折号
  ['\u2013', '&ndash;'],  // – 短破折号
  ['\u00B7', '&middot;'], // · 间隔号
  ['\u2022', '&bull;'],   // • 实心点
  ['\u25B8', '&#9656;'],  // ▸
  ['\u25B6', '&#9654;'],  // ▶
  ['\u25BC', '&#9660;'],  // ▼
  ['\u201C', '&ldquo;'],  // "
  ['\u201D', '&rdquo;'],  // "
  ['\u2018', '&lsquo;'],  // '
  ['\u2019', '&rsquo;'],  // '
  ['\u2026', '&hellip;'], // …
  ['\u00A9', '&copy;'],   // ©
  ['\u00D7', '&times;'],  // ×
  ['\u00B2', '&sup2;'],   // ²
  ['\u00B0', '&deg;'],    // °
  ['\u2605', '&#9733;'],  // ★
  ['\u2600', '&#9728;'],
  ['\uD83D\uDC8E', '&#128142;'], // 💎
  ['\uD83D\uDEE1\uFE0F', '&#128737;'], ['\uD83D\uDEE1', '&#128737;'], // 🛡️
  ['\uD83C\uDFA8', '&#127912;'], // 🎨
  ['\uD83D\uDC4B', '&#128075;'], // 👋
  ['\uD83D\uDCAC', '&#128172;'], // 💬
  ['\uD83D\uDCCD', '&#128205;'], // 📍
  ['\u2709\uFE0F', '&#9993;'], ['\u2709', '&#9993;'], // ✉
  ['\uFFFD?', '&middot; '],  // 已损坏的 �?
  ['\uFFFD', ''],            // 残留替换字符,删除
];

const DIRS = ['.', 'public'];
let changedTotal = 0, scanned = 0;

DIRS.forEach(dir => {
  let files;
  try { files = fs.readdirSync(dir); } catch (e) { console.log(`(skip dir ${dir}: not found)`); return; }
  files.filter(f => f.toLowerCase().endsWith('.html')).forEach(fileName => {
    const fp = path.join(dir, fileName);
    let buf = fs.readFileSync(fp);
    let txt = buf.toString('utf8').replace(/^\uFEFF/, '');
    const before = txt;
    let hits = [];
    MAP.forEach(([uni, ent]) => {
      const n = txt.split(uni).length - 1;
      if (n > 0) hits.push(`${JSON.stringify(uni)}x${n}`);
      txt = txt.split(uni).join(ent);
    });
    scanned++;
    if (txt !== before) {
      fs.writeFileSync(fp, '\uFEFF' + txt, 'utf8');
      console.log(`FIXED  ${dir}/${fileName}  ->  ${hits.join(', ')}`);
      changedTotal++;
    } else {
      console.log(`clean  ${dir}/${fileName}`);
    }
  });
});

console.log(`\n==== DONE ====  scanned ${scanned} html files, fixed ${changedTotal}.`);
console.log('IMPORTANT: now RE-DEPLOY (publish) all changed files to the live site,');
console.log('and always save as UTF-8 (never GBK/ANSI).');
