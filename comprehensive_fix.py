import os
import re

wa_link = "https://wa.me/8618058355198?text=Hello%20iColorPack%2C%20I%20just%20viewed%20your%20premium%20packaging%20collection%20and%20would%20like%20to%20discuss%20a%20custom%20project.%20Can%20we%20chat%3F"

def fix_file(path):
    try:
        with open(path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        # Replace common variations of contact links with WhatsApp
        new_content = re.sub(r'https?://(?:www\.)?icolorpacks\.com/#contact', wa_link, content)
        new_content = re.sub(r'index\.html#contact', wa_link, new_content)
        new_content = re.sub(r'#contact-info', wa_link, new_content)
        new_content = re.sub(r'#inquiry', wa_link, new_content)
        
        if content != new_content:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Fixed: {path}")
    except Exception as e:
        print(f"Error fixing {path}: {e}")

for root, dirs, files in os.walk('.'):
    if '.accio' in root or '.wrangler' in root:
        continue
    for file in files:
        if file.endswith(('.html', '.md', '.js')):
            fix_file(os.path.join(root, file))

# Re-zip public folder
# Note: I'll use bash for zipping to preserve structure
