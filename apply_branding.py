import os
import re

# New Brand Theme Definitions
NEW_FONTS_LINK = '<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">'

NEW_VARS = """    :root {
      --gold: #C9A84C;
      --gold-light: #E8C97A;
      --champagne: #DBC48E;
      --dark-bg: #0D0D0D;
      --card-bg: #151515;
      --white: #F5F5F5;
      --text-muted: #999999;
      --border: rgba(201, 168, 76, 0.15);
      --input-bg: #1A1A1A;
    }"""

def apply_brand_theme(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update Fonts Link
    content = re.sub(r'<link href="https://fonts\.googleapis\.com/css2\?family=[^"]+" rel="stylesheet">', NEW_FONTS_LINK, content)

    # 2. Update CSS Variables in :root
    content = re.sub(r':root\s*{[^}]+}', NEW_VARS, content)

    # 3. Update Font Families
    # Body font
    content = re.sub(r"font-family:\s*'Inter',[^;]+;", "font-family: 'DM Sans', sans-serif;", content)
    content = re.sub(r"font-family:\s*'DM Sans',[^;]+;", "font-family: 'DM Sans', sans-serif;", content) # Ensure consistent
    
    # Heading font
    content = re.sub(r"h1,\s*h2,\s*h3,\s*h4\s*{[^}]+}", r"h1, h2, h3, h4 { font-family: 'Playfair Display', serif; letter-spacing: 0.5px; text-transform: none; font-weight: 700; }", content)
    
    # Specialized overrides (like .logo, .banner-content h1, etc.)
    content = re.sub(r"font-family:\s*'Montserrat',[^;]+;", "font-family: 'Playfair Display', serif;", content)
    
    # Handle the 'em' tag within headings
    content = re.sub(r"em\s*{[^}]+}", r"em { font-style: italic; color: var(--gold); }", content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Branded: {filepath}")

# Target key pages
target_files = [
    'index.html',
    'product-rigid-boxes.html',
    'product-paper-bags.html',
    'product-cake-boxes.html',
    'product-mailer-boxes.html'
]

for filename in target_files:
    if os.path.exists(filename):
        apply_brand_theme(filename)
    else:
        print(f"Skipped (Not Found): {filename}")
