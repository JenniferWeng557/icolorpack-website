import os
import re

def update_html_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Add style
    style_pattern = re.compile(r'(<style[^>]*>)', re.IGNORECASE)
    style_match = style_pattern.search(content)
    if style_match:
        style_rule = "\n        .dropdown:hover .dropdown-content { display: block !important; }\n"
        if style_rule not in content:
            content = content.replace(style_match.group(1), style_match.group(1) + style_rule)
    else:
        # If no style tag, add one in head
        head_pattern = re.compile(r'(</head>)', re.IGNORECASE)
        head_match = head_pattern.search(content)
        if head_match:
            style_block = "<style>\n        .dropdown:hover .dropdown-content { display: block !important; }\n    </style>\n"
            content = content.replace(head_match.group(1), style_block + head_match.group(1))

    # 2. Add FAQ link after BLOG
    # BLOG link might be uppercase or lowercase, and might have different spacing
    blog_pattern = re.compile(r'(<li>\s*<a[^>]*href=["\'][^"]*blog\.html[^>]*>.*?BLOG.*?</a>\s*</li>)', re.IGNORECASE | re.DOTALL)
    faq_link = '\n            <li><a href="faq.html">FAQ</a></li>'
    if 'href="faq.html"' not in content:
        content = blog_pattern.sub(r'\1' + faq_link, content)

    # 3. Before </body>: Add <div id="icpFE"></div><script src="icp-final-floating-fix.js?v=20260709"></script>
    # Note: it might already have the script, but maybe not the div.
    script_part = '<script src="icp-final-floating-fix.js?v=20260709"></script>'
    div_part = '<div id="icpFE"></div>'
    target_pattern = re.compile(r'(</body>)', re.IGNORECASE)
    
    # Check if the fix is already there (partially or fully)
    if script_part in content:
        if div_part not in content:
            content = content.replace(script_part, div_part + script_part)
    elif 'icp-final-floating-fix.js' in content:
        # Update existing version if necessary
        content = re.sub(r'<script src="[^"]*icp-final-floating-fix\.js[^"]*"></script>', div_part + script_part, content)
    else:
        content = target_pattern.sub(div_part + script_part + r'\1', content)

    # 4. Ensure all links end with .html
    # This is tricky. We only want to target internal links that don't have an extension or have a wrong one.
    # The user says "Ensure all links end with .html".
    # I'll target local hrefs that don't end in .html, .css, .js, .png, etc.
    # But usually this refers to navigation links.
    # Let's target href="something" where something is a filename without extension.
    
    def link_replacer(match):
        link = match.group(1)
        if link.startswith('http') or link.startswith('https') or link.startswith('mailto') or link.startswith('tel') or link.startswith('javascript') or link.startswith('#'):
            return f'href="{link}"'
        
        # Check for anchors
        parts = link.split('#')
        base = parts[0]
        anchor = '#' + parts[1] if len(parts) > 1 else ''
        
        if base and not os.path.splitext(base)[1]:
            return f'href="{base}.html{anchor}"'
        return f'href="{link}"'

    content = re.sub(r'href=["\']([^"\']+)["\']', link_replacer, content)

    # Special case: product-cake-boxes.html
    if os.path.basename(filepath) == 'product-cake-boxes.html':
        # Banner
        banner_pattern = re.compile(r"background:\s*url\(['\"]([^'\" ]+)['\"]\)", re.IGNORECASE)
        content = banner_pattern.sub("background: url('images/cake-boxes-banner-2026.png')", content, count=1)
        
        # 3 correct cake box images
        # We'll use specific ones that are known to be good
        cake_images = [
            "images/Ad0e285c6c65b45c89ff12c12f3581396V.webp",
            "images/A021e1d0985554e1ebb806f7c3c66082au.webp",
            "images/A7f3536f52b594e88909e095717803d217.webp"
        ]
        
        img_pattern = re.compile(r'<div class="product-image"><img src="([^"]+)"', re.IGNORECASE)
        matches = list(img_pattern.finditer(content))
        for i, match in enumerate(matches[:3]):
            content = content.replace(match.group(1), cake_images[i])

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    for root, dirs, files in os.walk('.'):
        if 'node_modules' in dirs:
            dirs.remove('node_modules')
        if '.git' in dirs:
            dirs.remove('.git')
        
        for file in files:
            if file.endswith('.html'):
                filepath = os.path.join(root, file)
                print(f"Updating {filepath}...")
                update_html_file(filepath)

if __name__ == "__main__":
    main()
