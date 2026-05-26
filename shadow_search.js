function findInShadow(root, selector) {
  let found = Array.from(root.querySelectorAll(selector));
  root.querySelectorAll('*').forEach(el => {
    if (el.shadowRoot) {
      found = found.concat(findInShadow(el.shadowRoot, selector));
    }
  });
  return found;
}

const products = [];
const items = findInShadow(document, 'a');
items.forEach(a => {
  if (a.href.includes('/product-detail/') && a.innerText.length > 20) {
    const img = a.querySelector('img') || a.parentElement.querySelector('img');
    if (img && img.src.includes('alicdn.com')) {
      products.push({ name: a.innerText.trim(), image: img.src });
    }
  }
});
return products;
