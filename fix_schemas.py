import os
import re
import json

def fix_schema(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find all JSON-LD scripts
    scripts = re.findall(r'<script type="application/ld\+json">(.*?)</script>', content, re.DOTALL)
    
    modified = False
    new_content = content
    
    for script_text in scripts:
        try:
            data = json.loads(script_text.strip())
            if data.get('@type') == 'Product':
                # This is a main product schema
                needs_update = False
                
                if 'sku' not in data:
                    slug = os.path.basename(filepath).replace('.html', '').replace('product-', '')
                    data['sku'] = f"ICP-{slug.upper()}-01"
                    needs_update = True
                
                if 'offers' in data:
                    offers = data['offers']
                    if offers.get('@type') == 'Offer':
                        if 'price' not in offers:
                            offers['price'] = "0.50" # Placeholder low price
                            needs_update = True
                        if 'priceCurrency' not in offers:
                            offers['priceCurrency'] = "USD"
                            needs_update = True
                
                if needs_update:
                    new_script = json.dumps(data, indent=2)
                    new_content = new_content.replace(script_text, f"\n  {new_script}\n  ")
                    modified = True
        except Exception as e:
            print(f"Error parsing JSON in {filepath}: {e}")
            continue

    if modified:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

def main():
    files = [
        'product-rigid-boxes.html',
        'product-paper-bags.html',
        'product-cake-boxes.html',
        'product-mailer-boxes.html',
        'product-kraft-bags.html'
    ]
    for f in files:
        if os.path.exists(f):
            if fix_schema(f):
                print(f"Fixed schema in {f}")

if __name__ == "__main__":
    main()
