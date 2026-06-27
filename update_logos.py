import os
import re

# Precise SVG Logo Definition
LOGO_HTML = """<div class="logo-wrapper" style="display: flex; align-items: center; gap: 12px;">
          <svg width="34" height="34" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 0 5px rgba(201,168,76,0.3));">
            <path d="M50 5 L90 25 V75 L50 95 L10 75 V25 L50 5Z" stroke="#C9A84C" stroke-width="6" stroke-linejoin="round"/>
            <path d="M50 50 V95 M50 50 L90 25 M50 50 L10 25" stroke="#C9A84C" stroke-width="2" stroke-dasharray="4 4" opacity="0.6"/>
            <circle cx="50" cy="35" r="6" fill="#C9A84C"/>
          </svg>
          <span style="font-family: 'Playfair Display', serif; font-weight: 700; font-size: 24px; color: #FFF; letter-spacing: 1px; text-transform: none;">iColorPacks</span>
        </div>"""

def update_logo(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern for various text-only logo versions (case insensitive)
    # Target <a ... class="logo">...</a>
    new_content = re.sub(r'<a[^>]+class="logo"[^>]*>.*?</a>', f'<a href="index" class="logo">{LOGO_HTML}</a>', content, flags=re.IGNORECASE | re.DOTALL)
    
    # Target footer/simple logo divs
    new_content = re.sub(r'<div[^>]+class="logo"[^>]*>.*?</div>', f'<div class="logo">{LOGO_HTML}</div>', new_content, flags=re.IGNORECASE | re.DOTALL)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Logo Updated: {filepath}")

# Update all HTML files in project and public
for root, dirs, files in os.walk('.'):
    if any(d in root for d in ['.git', 'node_modules']): continue
    for file in files:
        if file.endswith('.html'):
            update_logo(os.path.join(root, file))
