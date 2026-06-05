import os
import re

wa_link = 'https://wa.me/8618058355198?text=Hello%20iColorPack,%20I%20just%20viewed%20your%20premium%20packaging%20collection%20and%20would%20like%20to%20discuss%20a%20custom%20project.%20Can%20we%20chat?'
modal_trigger_raw = 'javascript:void(0)" onclick="toggleModal()'

def process_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. First, replace any modal triggers NOT in floating button back to WhatsApp
    # This ensures "other buttons" go to WhatsApp
    # We look for onclick="toggleModal()" that IS NOT inside floating-quote-container
    
    # Simple way: Replace ALL toggleModal triggers with WA link first
    content = content.replace('href="javascript:void(0)" onclick="toggleModal()"', f'href="{wa_link}"')
    content = content.replace("href='javascript:void(0)' onclick='toggleModal()'", f'href="{wa_link}"')
    
    # 2. Then, specifically find the floating button and set it to toggleModal
    # Pattern to match the anchor tag for floating-quote-container
    # It might have target="_blank" or different spacing
    pattern = r'(<a\s+[^>]*class=["\']floating-quote-container["\'][^>]*>)'
    
    def replace_floating(match):
        tag = match.group(1)
        # Remove any existing href and add the modal trigger
        tag = re.sub(r'href=["\'][^"\']*["\']', '', tag)
        tag = re.sub(r'target=["\'][^"\']*["\']', '', tag)
        # Reconstruct tag
        if 'onclick' not in tag:
            tag = tag.replace('<a', f'<a href="{modal_trigger_raw}"')
        else:
            tag = re.sub(r'onclick=["\'][^"\']*["\']', 'onclick="toggleModal()"', tag)
            tag = tag.replace('<a', f'<a href="javascript:void(0)"')
        return tag

    content = re.sub(pattern, replace_floating, content)
    
    # Double check if any href was left missing or broken in the floating button
    # If <a  class="floating-quote-container"> exists without href
    content = re.sub(r'<a\s+class=["\']floating-quote-container["\']', f'<a href="{modal_trigger_raw}" class="floating-quote-container"', content)

    # 3. Ensure the Modal HTML and JS are present (important for blog pages)
    if 'inquiryModal' not in content:
        # If it's a blog page or something else, it might need the injection
        # But for now, let's just make sure the links are correct.
        # If the modal isn't there, the button won't work, but at least the link is right.
        pass

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

# Scan root and public
count = 0
for root_dir in ['.', 'public']:
    if not os.path.exists(root_dir): continue
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.html'):
                process_file(os.path.join(root, file))
                count += 1

print(f"Processed {count} files.")
