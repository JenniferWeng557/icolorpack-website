const fs = require('fs');
const path = require('path');

function getBlogFiles(dir) {
    if (!fs.existsSync(dir)) return [];
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getBlogFiles(fullPath));
        } else if (file.endsWith('.html')) {
            results.push(fullPath);
        }
    });
    return results;
}

const blogDirs = ['blog', 'public/blog'];
let blogFiles = [];
blogDirs.forEach(dir => {
    blogFiles = blogFiles.concat(getBlogFiles(dir));
});

blogFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('"@type": "Article"')) {
        console.log(`Skipping ${file}, already has Article schema.`);
        // return;
    }

    const titleMatch = content.match(/<title>(.*?)<\/title>/);
    const descMatch = content.match(/<meta name="description" content="(.*?)"/);
    const dateMatch = content.match(/<span class="post-date">(.*?)<\/span>/);
    
    let title = titleMatch ? titleMatch[1].replace(' — iColorPack', '') : 'Blog Post';
    title = title.replace(' | iColorPack', '');
    const desc = descMatch ? descMatch[1] : '';
    const date = dateMatch ? dateMatch[1] : '2026-06-22';
    
    const fileName = path.basename(file);
    const url = `https://www.icolorpacks.com/blog/${fileName}`;

    const schema = `
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "${title.replace(/"/g, '\\"')}",
    "description": "${desc.replace(/"/g, '\\"')}",
    "image": "https://www.icolorpacks.com/images/blog-default.jpg",
    "author": {
      "@type": "Organization",
      "name": "iColorPack"
    },
    "publisher": {
      "@type": "Organization",
      "name": "iColorPack",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.icolorpacks.com/images/Ac883bba6ae6a4f9dbf52bb335d605e8fj.webp"
      }
    },
    "datePublished": "${date}"
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.icolorpacks.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://www.icolorpacks.com/blog.html"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "${title.replace(/"/g, '\\"')}",
        "item": "${url}"
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
