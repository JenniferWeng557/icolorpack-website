const fs = require('fs');
const path = require('path');

const industryFiles = [
    'packaging-for-perfume-brands.html',
    'packaging-for-clothing-boutiques.html',
    'packaging-for-jewelry-brands.html',
    'packaging-for-cosmetics-brands.html',
    'packaging-for-bakeries.html',
    'packaging-for-candle-brands.html',
    'packaging-for-ecommerce-brands.html',
    'packaging-for-gift-shops.html'
];

industryFiles.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    const titleMatch = content.match(/<title>(.*?)<\/title>/);
    const descMatch = content.match(/<meta name="description" content="(.*?)"/);
    
    const title = titleMatch ? titleMatch[1].replace(' | iColorPack', '') : 'Industry Packaging Solution';
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
    "category": "Industry Solution",
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
        "name": "How does iColorPack support brands in the ${title.split(' ').pop()} industry?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We provide specialized packaging solutions tailored to the unique needs of the ${title.split(' ').pop()} industry, focusing on brand aesthetics, product protection, and premium unboxing experiences."
        }
      },
      {
        "@type": "Question",
        "name": "What custom options are available for industry-specific packaging?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer a wide range of materials (rigid board, kraft paper, corrugated), custom inserts (foam, velvet, paper), and high-end finishes like hot stamping and textured lamination."
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
