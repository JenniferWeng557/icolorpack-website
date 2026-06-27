import os
import re

LINK_MAP = {
    r'\b(rigid (gift )?boxes)\b': '../product-rigid-boxes.html',
    r'\b(gift boxes)\b': '../product-rigid-boxes.html',
    r'\b(paper bags)\b': '../product-paper-bags.html',
    r'\b(shopping bags)\b': '../product-paper-bags.html',
    r'\b(cake boxes)\b': '../product-cake-boxes.html',
    r'\b(bakery boxes)\b': '../product-cake-boxes.html',
    r'\b(mailer boxes)\b': '../product-mailer-boxes.html',
    r'\b(shipping boxes)\b': '../product-mailer-boxes.html',
    r'\b(kraft (paper )?bags)\b': '../product-kraft-bags.html'
}

def inject_links(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Avoid linking if already linked or in header/meta
    # We'll split the content into lines and only process lines that don't start with # or **
    lines = content.split('\n')
    new_lines = []
    
    linked_keywords = set()

    for line in lines:
        if line.startswith('#') or line.startswith('**') or line.strip() == '---':
            new_lines.append(line)
            continue
        
        # Process line
        processed_line = line
        for pattern, url in LINK_MAP.items():
            # Only link the first occurrence of each keyword category in the entire file
            if url in linked_keywords:
                continue
            
            # Search for pattern but NOT inside an existing link
            # This is tricky with regex. A simpler way is to check if it's already linked.
            if f']({url})' in processed_line:
                linked_keywords.add(url)
                continue

            match = re.search(pattern, processed_line, re.IGNORECASE)
            if match:
                # Wrap the match in a markdown link
                keyword = match.group(0)
                processed_line = re.sub(pattern, f'[{keyword}]({url})', processed_line, count=1, flags=re.IGNORECASE)
                linked_keywords.add(url)
        
        new_lines.append(processed_line)

    new_content = '\n'.join(new_lines)
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

def main():
    blog_dir = 'blog'
    count = 0
    for f in os.listdir(blog_dir):
        if f.endswith('.md'):
            if inject_links(os.path.join(blog_dir, f)):
                count += 1
                print(f"Updated links in {f}")
    print(f"Finished. Updated {count} files.")

if __name__ == "__main__":
    main()
