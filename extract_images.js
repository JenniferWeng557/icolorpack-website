(() => {
  const products = Array.from(document.querySelectorAll('.product-item, .list-item, .item-main')).map(item => {
    const link = item.querySelector('a');
    const img = item.querySelector('img');
    return {
      title: link ? link.textContent.trim() : '',
      url: link ? link.href : '',
      imgUrl: img ? img.src : ''
    };
  });
  return products;
})()