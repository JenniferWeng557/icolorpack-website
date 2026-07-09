# CottonValle Products Page Image Replacement

Please update the `/products` page product grid so each product category uses its own matching CottonValle branded image instead of the repeated lifestyle photo.

## Upload assets

Copy this folder into the project root:

```text
assets/images/products/
```

## Image mapping

- Custom Cotton Tote Bags: `/assets/images/products/custom-cotton-tote-bags.webp`
- Canvas Tote Bags: `/assets/images/products/canvas-tote-bags.webp`
- Organic Cotton Bags: `/assets/images/products/organic-cotton-bags.webp`
- Jute Bags: `/assets/images/products/jute-bags.webp`
- Drawstring Bags: `/assets/images/products/drawstring-bags.webp`
- Zip Pouches: `/assets/images/products/zip-pouches.webp`

## Required implementation

Replace the image `src` and `alt` for each corresponding product card. Keep the existing layout, spacing, card styling, links and copy unless needed.

Example:

```html
<img src="/assets/images/products/custom-cotton-tote-bags.webp" alt="Custom Cotton Tote Bags by CottonValle" loading="lazy" decoding="async">
```

Add or keep this CSS behavior:

```css
.product-card img,
.collection-card img,
.card img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  object-position: center;
  display: block;
  border-radius: 18px;
}
```

## Fallback quick fix

If direct source editing is slow, upload `snippets/products-image-fix.js` and load it before `</body>` on `/products`. Direct HTML replacement is still preferred.

## QA checklist

- `/products` shows six different category images.
- No repeated woman-holding-pouch image remains in the product grid.
- The six cards remain clickable and keep their existing target URLs.
- Images are not stretched or distorted.
- CottonValle branding is visible on all six images.
