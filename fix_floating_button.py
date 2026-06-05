import os

wa_link = 'https://wa.me/8618058355198?text=Hello%20iColorPack,%20I%20just%20viewed%20your%20premium%20packaging%20collection%20and%20would%20like%20to%20discuss%20a%20custom%20project.%20Can%20we%20chat?'
modal_trigger = 'javascript:void(0)" onclick="toggleModal()'

def process_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Logic: 
    # 1. Any button with class 'floating-quote-container' should use modal_trigger
    # 2. Other buttons should use wa_link (they already do, but we ensure it)
    
    if 'class="floating-quote-container"' in content:
        # Replace the link specifically for the floating button
        # Search for: href="..." class="floating-quote-container"
        import re
        content = re.sub(r'href="[^"]+" class="floating-quote-container"', f'href="{modal_trigger}" class="floating-quote-container"', content)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

for root_dir in ['.', 'public']:
    if not os.path.exists(root_dir): continue
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.html'):
                process_file(os.path.join(root, file))

print("Floating button fixed across all pages.")
