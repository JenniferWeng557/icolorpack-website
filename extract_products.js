(() => {
  const products = [];
  const items = document.querySelectorAll('.product-item, .component-product-list .item, .icbu-shop-product-list .product-item');
  
  items.forEach(item => {
    const titleEl = item.querySelector('.title, .product-title, a[title]');
    const imgEl = item.querySelector('img');
    
    if (titleEl && imgEl) {
      products.push({
        name: titleEl.innerText || titleEl.getAttribute('title'),
        image: imgEl.src
      });
    }
  });

  // If the above selectors didn't work, try a more generic approach for Alibaba shop pages
  if (products.length < 5) {
    const allLinks = document.querySelectorAll('a');
    allLinks.forEach(link => {
      const img = link.querySelector('img');
      const title = link.innerText.trim();
      if (img && title.length > 10) {
        products.push({
          name: title,
          image: img.src
        });
      }
    });
  }

  return products;
})()