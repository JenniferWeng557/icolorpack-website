const fs = require('fs');
const path = require('path');

const productFiles = [
    'product-rigid-boxes.html',
    'product-cake-boxes.html',
    'product-kraft-bags.html',
    'product-paper-bags.html',
    'product-mailer-boxes.html',
    'custom-cupcake-boxes.html',
    'custom-mailer-boxes.html',
    'custom-corrugated-mailer-boxes.html',
    'custom-paper-bags-with-logo.html',
    'custom-drawer-gift-boxes.html',
    'custom-kraft-paper-bags.html',
    'custom-lid-and-base-gift-boxes.html',
    'custom-packaging-for-jewelry.html',
    'custom-luxury-shopping-bags.html',
    'custom-packaging-for-perfume.html',
    'custom-cake-boxes-wholesale.html',
    'custom-bakery-boxes.html',
    'custom-magnetic-gift-boxes.html',
    'custom-rigid-gift-boxes-wholesale.html',
    'custom-packaging-manufacturer-china.html',
    'custom-packaging-for-clothing-brands.html',
    'custom-packaging-for-cosmetics.html',
    'public/product-mailer-boxes.html',
    'public/product-paper-bags.html',
    'public/product-rigid-boxes.html',
    'public/product-cake-boxes.html',
    'public/product-kraft-bags.html'
];

productFiles.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('application/ld+json') && content.includes('"@type": "Product"')) {
        console.log(`Skipping ${file}, already has Product schema.`);
        // return; // We might want to update it if it's incomplete
    }

    const titleMatch = content.match(/<title>(.*?)<\/title>/);
    const descMatch = content.match(/<meta name="description" content="(.*?)"/);
    
    const title = titleMatch ? titleMatch[1].replace(' | iColorPack', '') : 'Custom Packaging';
    const desc = descMatch ? descMatch[1] : '';
    const fileName = path.basename(file);
    const url = `https://www.icolorpacks.com/${fileName}`;

    const schema = `
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "${title}",
    "brand": {
      "@type": "Brand",
      "name": "iColorPack"
    },
    "description": "${desc}",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": "${url}"
    }
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the MOQ for ${title}?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our typical MOQ for ${title} starts at 500 units, depending on the specifications. We also support smaller quantities for high-end custom projects."
        }
      },
      {
        "@type": "Question",
        "name": "Can I get a custom sample before bulk production?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we provide physical samples or 3D digital mockups to ensure the design, material, and printing meet your expectations before starting bulk manufacturing."
        }
      }
    ]
  }
  </script>
`;

    if (content.includes('</head>')) {
        content = content.replace('</head>', schema + '</head>');
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    }
});
