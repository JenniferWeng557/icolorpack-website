import sys

path = 'packaging-for-clothing-boutiques-split.html'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace PRODUCTS nav item block
old_products = '''            <li>
<a href="product-rigid-boxes.html">PRODUCTS <span style="font-size: 8px; margin-left: 5px; vertical-align: middle; opacity: 0.8;">\ufffd?/span>
</a>
</li>'''

# Try to find what exactly is there
if 'PRODUCTS' in content:
    start = content.find('<li>\n<a href=\"product-rigid-boxes.html\">PRODUCTS')
    end = content.find('</li>', start) + 5
    old_products = content[start:end]

new_products = '''            <li class="dropdown">
                <a href="javascript:void(0)" class="dropbtn">PRODUCTS <span style="font-size: 8px; margin-left: 5px; vertical-align: middle; opacity: 0.8;">&#9660;</span></a>
                <div class="dropdown-content">
                    <a href="product-rigid-boxes.html">Rigid Boxes</a>
                    <a href="product-paper-bags.html">Paper Bags</a>
                    <a href="product-cake-boxes.html">Cake Boxes</a>
                    <a href="product-mailer-boxes.html">Mailer Boxes</a>
                    <a href="product-kraft-bags.html">Kraft Bags</a>
                </div>
            </li>'''

content = content.replace(old_products, new_products)

# Replace INDUSTRIES nav item block
if 'INDUSTRIES' in content:
    start = content.find('<li>\n<a href=\"industry-cases-2026.html\">INDUSTRIES')
    end = content.find('</li>', start) + 5
    old_industries = content[start:end]

new_industries = '''            <li class="dropdown">
                <a href="industry-cases-2026.html" class="dropbtn">INDUSTRIES <span style="font-size: 8px; margin-left: 5px; vertical-align: middle; opacity: 0.8;">&#9660;</span></a>
                <div class="dropdown-content">
                    <a href="packaging-for-cosmetics-brands.html">Cosmetics</a>
                    <a href="packaging-for-jewelry-brands.html">Jewelry</a>
                    <a href="packaging-for-bakeries.html">Bakery</a>
                    <a href="packaging-for-clothing-boutiques.html">Clothing</a>
                    <a href="packaging-for-candle-brands.html">Candle</a>
                    <a href="packaging-for-perfume-brands.html">Perfume</a>
                </div>
            </li>'''

content = content.replace(old_industries, new_industries)

# Fix encoding issues/junk
content = content.replace('\ufffd?', '&#9660;')

with open('packaging-for-clothing-boutiques.html', 'w', encoding='utf-8') as f:
    f.write(content)
