import os

wa_link = 'https://wa.me/8618058355198?text=Hello%20iColorPack,%20I%20just%20viewed%20your%20premium%20packaging%20collection%20and%20would%20like%20to%20discuss%20a%20custom%20project.%20Can%20we%20chat?'
modal_trigger = 'javascript:void(0)" onclick="toggleModal()'

def process_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We want to keep the floating-quote-container as toggleModal
    # But change other toggleModal calls back to wa_link
    
    # 1. Identify the floating button part to protect it
    floating_marker = 'class="floating-quote-container"'
    if floating_marker in content:
        parts = content.split(floating_marker)
        # The modal trigger usually comes just before class="floating-quote-container"
        # <a href="javascript:void(0)" onclick="toggleModal()" class="floating-quote-container">
        
        new_parts = []
        for i in range(len(parts) - 1):
            part = parts[i]
            # Replace modal_trigger in this part (which contains other buttons)
            part = part.replace(modal_trigger, wa_link)
            new_parts.append(part)
        
        # Add the last part
        new_parts.append(parts[-1])
        content = floating_marker.join(new_parts)
    else:
        # If no floating button, just revert all (unlikely given previous mass_fix)
        content = content.replace(modal_trigger, wa_link)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

# Process root and public
for root_dir in ['.', 'public']:
    if not os.path.exists(root_dir): continue
    for root, dirs, files in os.walk(root_dir):
        if 'blog' in root: continue # Blog pages might be different, let's handle them later or skip
        for file in files:
            if file.endswith('.html'):
                process_file(os.path.join(root, file))

print("Revert completed for main pages.")
