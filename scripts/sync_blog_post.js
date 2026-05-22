const fs = require('fs');
const path = require('path');

const markdownFile = process.argv[2];
if (!markdownFile) {
    console.error('Please provide a markdown file path.');
    process.exit(1);
}

const content = fs.readFileSync(markdownFile, 'utf-8');

// Simple parser for Title, Meta Description, and Date
const titleMatch = content.match(/^# (.*)/m);
const metaMatch = content.match(/\*\*Meta Description:\*\* (.*)/);
const dateMatch = path.basename(markdownFile).match(/^(\d{4}-\d{2}-\d{2})/);

const title = titleMatch ? titleMatch[1] : 'Untitled Post';
const description = metaMatch ? metaMatch[1] : '';
const dateStr = dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0];
const formattedDate = new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

const slug = path.basename(markdownFile, '.md').replace(/^\d{4}-\d{2}-\d{2}-/, '');
const htmlFile = `public/blog/${slug}.html`;

// Convert Markdown-ish content to simple HTML (basic support)
let bodyHtml = content
    .replace(/^# (.*)/m, '') // Remove title
    .replace(/\*\*Meta Description:\*\* .*/, '') // Remove meta
    .replace(/---/, '') // Remove separator
    .replace(/^## (.*)/gm, '<h3>$1</h3>')
    .replace(/^\* (.*)/gm, '<li>$1</li>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
    .split('\n')
    .map(line => line.trim() ? (line.startsWith('<') ? line : `<p>${line}</p>`) : '')
    .join('\n');

const template = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${title} — iColorPack</title>
  <meta name="description" content="${description}">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,600&display=swap" rel="stylesheet">
  <style>
    *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
    :root{
      --gold:#C9A84C; --gold2:#E8C97A; --dark:#0D0D0D; --dark2:#161412; --white:#FFFDF8; --text:#1A1612; --muted:#8A7D6A;
    }
    body{font-family:'DM Sans',sans-serif;background:var(--white);color:var(--text);line-height:1.7}
    nav{
      position:fixed;top:0;left:0;right:0;z-index:200; padding:22px 64px;
      display:flex;align-items:center;justify-content:space-between;
      background:rgba(13,13,13,.97);box-shadow:0 1px 0 rgba(201,168,76,.15);
    }
    .logo{ font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:600; color:var(--white);text-decoration:none; }
    .logo .logo-i{color:var(--gold2);font-style:italic;font-weight:700;font-size:32px}
    .logo .logo-color{color:var(--gold);font-weight:700}
    nav ul{list-style:none;display:flex;gap:40px}
    nav ul a{color:rgba(255,255,255,.7);text-decoration:none;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;transition:color .2s}
    nav ul a:hover{color:var(--gold2)}
    .post-hero{ padding:180px 64px 80px; background:var(--dark2); text-align:center; }
    .post-hero h1{ font-family:'Playfair Display',serif; font-size:clamp(32px,5vw,56px); color:var(--white); margin-bottom:24px; line-height:1.2; }
    .post-date{ color:var(--gold); font-size:12px; letter-spacing:3px; text-transform:uppercase; font-weight:600; margin-bottom:16px; display:block; }
    article{ max-width:800px; margin:80px auto; padding:0 32px; font-size:18px; }
    article h3{ font-family:'Playfair Display',serif; font-size:28px; margin:48px 0 24px; color:var(--dark); }
    article p{ margin-bottom:24px; }
    article li{ margin-left:24px; margin-bottom:12px; }
    footer{background:var(--dark);padding:60px 64px; text-align:center; color:rgba(255,255,255,.2); font-size:12px;}
    @media(max-width:768px){ nav{padding:20px} nav ul{display:none} .post-hero{padding:140px 24px 60px} article{margin:40px auto} }
  </style>
</head>
<body>
  <nav>
    <a href="../index.html" class="logo"><span class="logo-i">i</span><span class="logo-color">Color</span><span class="logo-pack">Pack</span></a>
    <ul>
      <li><a href="../index.html#products">Products</a></li>
      <li><a href="../blog.html">Blog</a></li>
      <li><a href="../index.html#contact">Get a Quote</a></li>
    </ul>
  </nav>

  <header class="post-hero">
    <span class="post-date">${formattedDate}</span>
    <h1>${title}</h1>
  </header>

  <article>
    ${bodyHtml}
  </article>

  <footer>
    &copy; 2026 iColorPack. All rights reserved.
  </footer>
</body>
</html>`;

fs.writeFileSync(htmlFile, template);
console.log(`Generated: ${htmlFile}`);

// Update public/blog.html
let blogIndex = fs.readFileSync('public/blog.html', 'utf-8');
const newCard = `
    <article class="blog-card">
      <div class="post-date">${formattedDate}</div>
      <h2>${title}</h2>
      <p>${description}</p>
      <a href="blog/${slug}.html" class="read-more">Read Article</a>
    </article>
`;

// Insert after <!-- Posts will be listed here -->
if (blogIndex.includes(title)) {
    console.log('Post already in index.');
} else {
    blogIndex = blogIndex.replace('<!-- Posts will be listed here -->', `<!-- Posts will be listed here -->${newCard}`);
    fs.writeFileSync('public/blog.html', blogIndex);
    console.log('Updated: public/blog.html');
}
