import os
import re

ROOT = os.path.dirname(os.path.abspath(__file__))
MARKER_BLOCK = re.compile(
    r'\s*<!-- FORCED FLOATING BUTTONS BY ACCIO -->.*?(?=\s*</body>)',
    re.IGNORECASE | re.DOTALL,
)
MENU_QUESTION = re.compile(
    r'(<div\s+class="menu-toggle"[^>]*>)\?(</div>)',
    re.IGNORECASE,
)

changed = []
for base, _, files in os.walk(ROOT):
    for name in files:
        if not name.lower().endswith('.html'):
            continue
        path = os.path.join(base, name)
        with open(path, 'r', encoding='utf-8') as source:
            original = source.read()

        updated = MARKER_BLOCK.sub('', original)
        if name.lower() == 'blog.html':
            updated = MENU_QUESTION.sub(r'\1&#9776;\2', updated)

        if updated != original:
            with open(path, 'w', encoding='utf-8', newline='') as target:
                target.write(updated)
            changed.append(os.path.relpath(path, ROOT))

print(f'Cleaned {len(changed)} HTML file(s).')
for path in changed:
    print(path)
