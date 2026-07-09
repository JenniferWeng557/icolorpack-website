# CottonValle 产品页 6 张图片替换包

用途：把 `/products` 页面 6 个产品卡片里的重复图片，替换成对应的 CottonValle 品牌图片。

## 图片对应关系

1. Custom Cotton Tote Bags  → `/assets/images/products/custom-cotton-tote-bags.webp`
2. Canvas Tote Bags → `/assets/images/products/canvas-tote-bags.webp`
3. Organic Cotton Bags → `/assets/images/products/organic-cotton-bags.webp`
4. Jute Bags → `/assets/images/products/jute-bags.webp`
5. Drawstring Bags → `/assets/images/products/drawstring-bags.webp`
6. Zip Pouches → `/assets/images/products/zip-pouches.webp`

## 部署方式 A：推荐，直接改源码

把 `assets/images/products/` 整个文件夹上传到网站项目根目录。

然后在 `/products` 页面中，把 6 个产品卡片的 `<img src="...">` 改成上面的对应路径。

示例：

```html
<img src="/assets/images/products/custom-cotton-tote-bags.webp" alt="Custom Cotton Tote Bags by CottonValle" loading="lazy" decoding="async">
```

图片比例是 4:3，卡片里建议 CSS 使用：

```css
.product-card img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  object-position: center;
  border-radius: 18px;
}
```

## 部署方式 B：快速热修复

如果 ACCIO 暂时不方便改产品卡片源码，可以：

1. 上传 `assets/images/products/` 到项目根目录。
2. 上传 `snippets/products-image-fix.js` 到网站根目录或 `/assets/js/`。
3. 在 `/products` 页面 `</body>` 前加入：

```html
<script src="/products-image-fix.js"></script>
```

这个脚本会根据卡片标题自动替换图片。

## 注意

- 不要再使用原来那张人物拿包的重复图。
- 不要压缩到太低质量，否则包身品牌文字会糊。
- 优先使用 `.webp`，如果部署系统不支持 WebP，再使用同名 `.png`。
