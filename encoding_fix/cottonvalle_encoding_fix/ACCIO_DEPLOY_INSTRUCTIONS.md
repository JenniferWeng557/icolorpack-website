# Cottonvalle Encoding Fix for Mojibake Characters

Issue: The live site displays replacement characters such as `�`, `��`, and `���` in places where punctuation or ranges should appear. This is an encoding/mojibake issue caused by non-UTF-8 handling of special characters.

## Required fixes

1. Ensure every HTML file includes this near the top of `<head>`:

```html
<meta charset="UTF-8">
```

2. Save every HTML/CSS/JS file as UTF-8.

3. Replace broken characters in source copy:

```text
5��8oz Fabrics        -> 5-8oz Fabrics or 5–8oz Fabrics
needs �� with         -> needs — with or needs, with
practical �� suitable -> practical and suitable
```

Recommended safer copy:

```text
5-8oz Fabrics
Reusable cotton, canvas and jute bags made to your size, fabric weight and branding needs, with flexible MOQ, sampling support and reliable bulk production for retail, gifting and promotional projects.
Clean, natural, warm and practical, suitable for Western retail and gifting buyers.
```

4. Optional emergency fallback: upload `encoding-fix.js` to the site root and add before closing body tag on all pages:

```html
<script src="/encoding-fix.js"></script>
```

This script is a front-end cleanup fallback only. The permanent fix is correcting the source encoding and text.
