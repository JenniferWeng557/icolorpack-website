import os
import re

# Refined SVG: Open Box with ALL BLACK interior (the "opening")
BLACK_INTERIOR_LOGO = """<div class="logo-wrapper" style="display: flex; align-items: center; gap: 12px;">
          <svg width="40" height="40" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Box Flaps (Top) - Metallic Gold -->
            <path d="M60 35 L95 20 L60 5 L25 20 Z" fill="#C9A84C" opacity="0.8"/> <!-- Back Flap -->
            <path d="M25 20 L10 45 L45 60 L60 35 Z" fill="#E8C97A"/> <!-- Left Flap -->
            <path d="M95 20 L110 45 L75 60 L60 35 Z" fill="#E8C97A"/> <!-- Right Flap -->
            
            <!-- THE OPENING (Interior) - ALL BLACK -->
            <path d="M60 35 L45 60 L60 85 L75 60 Z" fill="#000000"/> 
            
            <!-- Body Panels - Metallic Gold -->
            <path d="M25 55 V95 L60 115 V75 L45 60 Z" fill="#C9A84C"/> <!-- Left Front Panel -->
            <path d="M95 55 V95 L60 115 V75 L75 60 Z" fill="#A6893A"/> <!-- Right Front Panel -->
            
            <!-- iCP Stylized Text -->
            <text x="32" y="98" font-family="Arial, sans-serif" font-weight="900" font-size="28" fill="#000" style="letter-spacing:-1px; opacity:0.8;">iCP</text>
          </svg>
          <span style="font-family: 'Playfair Display', serif; font-weight: 700; font-size: 24px; color: #C9A84C; letter-spacing: 1px; text-transform: none;">iColorPacks</span>
        </div>"""

def apply_black_opening_logo(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the previous metallic logo wrapper and replace it
    new_content = re.sub(r'<div class="logo-wrapper".*?</div>\s*</div>', BLACK_INTERIOR_LOGO + "</div>", content, flags=re.DOTALL)
    
    # Standard replacement for safety
    if new_content == content:
        new_content = re.sub(r'<a[^>]+class="logo"[^>]*>.*?</a>', f'<a href="index" class="logo">{BLACK_INTERIOR_LOGO}</a>', content, flags=re.IGNORECASE | re.DOTALL)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Logo Fixed (Black Interior): {filepath}")

# Process all files
for root, dirs, files in os.walk('.'):
    if any(d in root for d in ['.git', 'node_modules', 'public']): continue
    for file in files:
        if file.endswith('.html'):
            apply_black_opening_logo(os.path.join(root, file))
