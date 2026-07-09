# Cottonvalle 网页问号/乱码修复说明

你截图里的 `��` / `���` / `�` 不是正常问号，而是 **UTF-8 编码损坏后的替换字符**。一般是因为英文文案里用了特殊符号，比如 `–`、`—`、智能引号，保存或部署时没有按 UTF-8 处理。

## 最优修复方式

让 ACCIO 直接在所有 HTML 文件的 `<head>` 里确认有这一行，并且必须放在最前面：

```html
<meta charset="UTF-8">
```

然后把所有页面里的乱码直接替换掉：

```text
5��8oz Fabrics       → 5–8oz Fabrics
needs �� with        → needs — with
practical �� suitable → practical and suitable
```

建议进一步统一成 ASCII 安全写法，避免再次乱码：

```text
5-8oz Fabrics
needs, with flexible MOQ
practical and suitable
```

## 快速兜底修复方式

把 `encoding-fix.js` 上传到网站根目录，然后在所有页面 `</body>` 前加入：

```html
<script src="/encoding-fix.js"></script>
```

这个脚本会自动把页面上已经显示出来的乱码替换掉，适合快速上线修复。

## ACCIO 要做的检查

1. 所有 HTML 文件都用 UTF-8 保存。
2. 所有 HTML `<head>` 里都有 `<meta charset="UTF-8">`。
3. 不要把 Word / Claude / ChatGPT 复制出来的特殊破折号再次错误转码。
4. 首页 Hero 标签里的 `5��8oz Fabrics` 改成 `5-8oz Fabrics` 或 `5–8oz Fabrics`。
5. `/retail-brands` 页面里的 `practical �� suitable` 改成 `practical and suitable`。
