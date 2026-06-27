import os
import re

# High-fidelity SVG of the "iCP Open Box" pattern in Metallic Gold
METALLIC_ICP_LOGO = """<div class="logo-wrapper" style="display: flex; align-items: center; gap: 12px;">
          <svg width="40" height="40" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Box Flaps (Top) in varying gold shades for depth -->
            <path d="M60 35 L95 20 L60 5 L25 20 Z" fill="#E8C97A" opacity="0.9"/> <!-- Back Flap -->
            <path d="M25 20 L10 45 L45 60 L60 35 Z" fill="#C9A84C"/> <!-- Left Flap -->
            <path d="M95 20 L110 45 L75 60 L60 35 Z" fill="#C9A84C"/> <!-- Right Flap -->
            <path d="M45 60 L60 85 L75 60 L60 35 Z" fill="#DBC48E"/> <!-- Front Flap -->
            
            <!-- Body with iCP Integrated (Simplified for SVG clarity) -->
            <path d="M25 55 V95 L60 115 V75 Z" fill="#C9A84C"/> <!-- Left Body -->
            <path d="M95 55 V95 L60 115 V75 Z" fill="#A6893A"/> <!-- Right Body -->
            
            <!-- iCP Stylized (Metallic Overlay) -->
            <text x="32" y="98" font-family="Arial, sans-serif" font-weight="900" font-size="28" fill="#0D0D0D" style="letter-spacing:-1px;">iCP</text>
          </svg>
          <span style="font-family: 'Playfair Display', serif; font-weight: 700; font-size: 24px; color: #C9A84C; letter-spacing: 1px; text-transform: none;">iColorPacks</span>
        </div>"""

def apply_metallic_logo(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find any existing logo div or anchor and replace with the new metallic one
    # This targets the logo-wrapper we just created or previous versions
    new_content = re.sub(r'<div class="logo-wrapper".*?</div>\s*</div>', METALLIC_ICP_LOGO + "</div>", content, flags=re.DOTALL)
    
    # Fallback to catch simple logo tags if first replacement missed
    if new_content == content:
        new_content = re.sub(r'<a[^>]+class="logo"[^>]*>.*?</a>', f'<a href="index" class="logo">{METALLIC_ICP_LOGO}</a>', content, flags=re.IGNORECASE | re.DOTALL)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Metallic Logo Applied: {filepath}")

# Process all files
for root, dirs, files in os.walk('.'):
    if any(d in root for d in ['.git', 'node_modules', 'public']): continue
    for file in files:
        if file.endswith('.html'):
            apply_metallic_logo(os.path.join(root, file))
