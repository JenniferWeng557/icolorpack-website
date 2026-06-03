import os
import re

patterns = [
    (r'8613758855557', '8618058355198'),
    (r'8618358592551', '8618058355198'),
    (r'137 5885 5557', '180 5835 5198'),
    (r'183 5859 2551', '180 5835 5198'),
    (r'href="[^"]*#(contact|inquiry)"', 'href="https://wa.me/8618058355198?text=Hello%20iColorPack%2C%20I%20just%20viewed%20your%20premium%20packaging%20collection%20and%20would%20like%20to%20discuss%20a%20custom%20project.%20Can%20we%20chat%3F" target="_blank"'),
    (r'href="javascript:void\(0\)" onclick="toggleModal\(\)"', 'href="https://wa.me/8618058355198?text=Hello%20iColorPack%2C%20I%20just%20viewed%20your%20premium%20packaging%20collection%20and%20would%20like%20to%20discuss%20a%20custom%20project.%20Can%20we%20chat%3F" target="_blank"'),
    (r'onclick="trackInquiry\([^)]*\);?\s*toggleModal\(\);?"', ''),
]

def fix_file(path):
    try:
        with open(path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        new_content = content
        for pattern, replacement in patterns:
            new_content = re.sub(pattern, replacement, new_content)
        
        if new_content != content:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Fixed: {path}")
    except Exception as e:
        print(f"Error fixing {path}: {e}")

for root, dirs, files in os.walk('.'):
    # Skip .accio and .wrangler
    if '.accio' in root or '.wrangler' in root:
        continue
    for file in files:
        if file.endswith(('.html', '.js', '.md')):
            fix_file(os.path.join(root, file))
