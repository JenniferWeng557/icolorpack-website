import os
import re

mapping = {
    "cosmetics": ("https://sc02.alicdn.com/kf/A3e7f404a41c24e38a32422d28773c969U.png", "Luxury Skincare & Beauty Solutions", "Premium Cosmetics Packaging"),
    "jewelry": ("https://sc02.alicdn.com/kf/Affe59e14aeab4230bc75914d99adfb6ai.png", "Luxury Fine Jewelry Packaging", "Premium Jewelry Solutions"),
    "bakeries": ("https://sc02.alicdn.com/kf/Abac909c6fcc24f6a91f74cd4ad5c528ah.png", "Custom Bakery & Food Packaging", "Premium Bakery Solutions"),
    "clothing": ("https://sc02.alicdn.com/kf/A979ec850605244d48c3467b7ec35c557c.png", "Luxury Fashion Retail Solutions", "Premium Clothing Packaging"),
    "candle": ("https://sc02.alicdn.com/kf/A1ec674561c3e4fb6bd839b4093e6113aI.png", "Luxury Scented Candle Solutions", "Premium Candle Packaging"),
    "perfume": ("https://sc02.alicdn.com/kf/A077f88f2338f43d5b0bf040f1dfeb28aY.png", "Luxury Fragrance & Perfume Solutions", "Premium Perfume Packaging"),
    "ecommerce": ("https://sc02.alicdn.com/kf/Ab6d3a598b4c04e10ab43199535d9f359q.png", "Durable E-commerce Shipping Solutions", "Premium E-commerce Packaging"),
    "gift-shops": ("https://sc02.alicdn.com/kf/Aa1322b2fb40748b9a6be1c53a30012c97.png", "Luxury Gift Shop & Retail Solutions", "Premium Gift Shop Packaging"),
}

new_css = """    .hero {{
        height: 70vh; background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('{img}') center/cover no-repeat;
        display: flex; align-items: center; justify-content: center; text-align: center; padding: 0 10%; margin-top: 60px;
    }}
    .hero-content h1 {{ font-family: 'Playfair Display', serif; font-size: 48px; letter-spacing: 2px; margin-bottom: 20px; color: var(--white); }}
    .hero-content p {{ font-size: 14px; color: var(--gold); margin-bottom: 30px; font-weight: 600; letter-spacing: 4px; text-transform: uppercase; }}

    .gallery-container {{ padding: 80px 8% 100px; }}"""

new_html = """  <section class="hero">
    <div class="hero-content">
      <p>{sub}</p>
      <h1>{title}</h1>
    </div>
  </section>"""

def update_file(filepath, img, sub, title):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace CSS block
    content = re.sub(
        r'    \.section-header \{ padding: 140px 8% 40px; text-align: center; \}\s+\.section-header p \{ color: var\(--gold\); font-size: 13px; letter-spacing: 5px; text-transform: uppercase; font-weight: 600; margin-bottom: 15px; \}\s+\.section-header h1 \{ font-family: \'Playfair Display\', serif; font-size: 42px; letter-spacing: 2px; \}\s+\.gallery-container \{ padding: 0 8% 100px; \}',
        new_css.format(img=img),
        content,
        flags=re.MULTILINE | re.DOTALL
    )
    
    # Replace HTML block
    content = re.sub(
        r'  <div class="section-header">\s+<p>.*?</p>\s+<h1>.*?</h1>\s+</div>',
        new_html.format(sub=sub, title=title),
        content,
        flags=re.MULTILINE | re.DOTALL
    )
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for filename in os.listdir('.'):
    if filename.startswith('packaging-for-') and filename.endswith('.html'):
        key = None
        for k in mapping:
            if k in filename:
                key = k
                break
        if key:
            img, sub, title = mapping[key]
            update_file(filename, img, sub, title)
            print(f"Updated {filename}")
