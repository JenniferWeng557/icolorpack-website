import os
import re

# Mapping of specific pages to their unbranded hero images
mapping = {
    "packaging-for-cosmetics-brands.html": "https://sc02.alicdn.com/kf/A3e7f404a41c24e38a32422d28773c969U.png",
    "packaging-for-jewelry-brands.html": "https://sc02.alicdn.com/kf/Affe59e14aeab4230bc75914d99adfb6ai.png",
    "packaging-for-bakeries.html": "https://sc02.alicdn.com/kf/Abac909c6fcc24f6a91f74cd4ad5c528ah.png",
    "packaging-for-clothing-boutiques.html": "https://sc02.alicdn.com/kf/A979ec850605244d48c3467b7ec35c557c.png",
    "packaging-for-candle-brands.html": "https://sc02.alicdn.com/kf/A1ec674561c3e4fb6bd839b4093e6113aI.png",
    "packaging-for-perfume-brands.html": "https://sc02.alicdn.com/kf/A077f88f2338f43d5b0bf040f1dfeb28aY.png",
    "packaging-for-ecommerce-brands.html": "https://sc02.alicdn.com/kf/Ab6d3a598b4c04e10ab43199535d9f359q.png",
    "packaging-for-gift-shops.html": "https://sc02.alicdn.com/kf/Aa1322b2fb40748b9a6be1c53a30012c97.png",
    "custom-kraft-paper-bags.html": "https://sc02.alicdn.com/kf/Ae39832a2c9b24d42b58e6bc6ed219190c.png",
    "index.html": "https://sc02.alicdn.com/kf/Adbef99d20a1f492eaed6d3dec7e6679fI.png"
}

# General fallback unbranded hero image
general_hero = "https://sc02.alicdn.com/kf/Adbef99d20a1f492eaed6d3dec7e6679fI.png"

# Pattern to find any hero background image URL
bg_pattern = re.compile(r"background:\s*url\(['\"]?([^'\"\)]+)['\"]?\)")
hero_block_pattern = re.compile(r"\.hero\s*\{[^}]*background:[^}]*\}", re.DOTALL)

def update_hero(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Target image
    target_img = mapping.get(filename, general_hero)
    
    # Add cache buster
    target_img += "?v=20260626"
    
    # Replace in CSS
    def replace_bg(match):
        css = match.group(0)
        # Replace the URL inside the .hero block
        new_css = re.sub(r"url\(['\"]?([^'\"\)]+)['\"]?\)", f"url('{target_img}')", css)
        return new_css

    new_content = hero_block_pattern.sub(replace_bg, content)
    
    # Also check for inline styles if any (rare in this project but good for safety)
    new_content = re.sub(r"style=\"background-image:\s*url\(['\"]?([^'\"\)]+)['\"]?\)\"", f"style=\"background-image: url('{target_img}')\"", new_content)

    if new_content != content:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

for filename in os.listdir('.'):
    if filename.endswith('.html'):
        if update_hero(filename):
            print(f"Updated hero in {filename}")

# Also check subdirectories if any relevant html files
if os.path.exists('public'):
    for filename in os.listdir('public'):
        if filename.endswith('.html'):
            if update_hero(os.path.join('public', filename)):
                print(f"Updated hero in public/{filename}")
