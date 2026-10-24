"""Check structured-data offer requirements, HTML metadata, and redirect targets."""
from html.parser import HTMLParser
from pathlib import Path
import json, re, subprocess

class Metadata(HTMLParser):
    def handle_starttag(self, tag, attrs):
        data = dict(attrs)
        if tag == 'meta' and data.get('name') == 'description':
            assert not set(data) - {'name', 'content'}, f'{self.path}: malformed description'

files = subprocess.check_output(['git', 'ls-files', '*.html'], text=True).splitlines()
services = blogs = checked = 0
for file in files:
    if file.startswith('public/') or '/snippets/' in file:
        continue
    checked += 1
    page = Path(file).read_text()
    parser = Metadata(); parser.path = file; parser.feed(page)
    blogs += file.startswith('blog/')
    for value in re.findall(r'<script[^>]*type=[\"\']application/ld\+json[\"\'][^>]*>(.*?)</script>', page, re.S):
        data = json.loads(value)
        roots = data if isinstance(data, list) else [data]
        for root in roots:
            for node in [root] + root.get('@graph', []):
                if node.get('@type') == 'Product':
                    assert node.get('review') or node.get('aggregateRating') or node.get('offers', {}).get('price') is not None or node.get('offers', {}).get('lowPrice') is not None, f'{file}: incomplete Product snippet'
                if node.get('@type') == 'Service' and node.get('@id', '').endswith('#custom-packaging-service'):
                    services += 1
                    assert node.get('provider') and node.get('serviceType') and node.get('url'), file
rules = {}
for line in Path('_redirects').read_text().splitlines():
    if not line.strip() or line.startswith('#'): continue
    source, target, code = line.split()[:3]
    assert source not in rules or rules[source] == target, f'Conflicting redirect: {source}'
    rules[source] = target
for source in rules:
    target = source; seen = set()
    while target in rules:
        assert target not in seen, f'Redirect cycle: {source}'
        seen.add(target); target = rules[target]
    if target.startswith('/') and '*' not in source:
        local = target.split('#')[0].split('?')[0].strip('/')
        assert not local or Path(local).exists() or Path(local + '.html').exists(), f'Missing target: {source} -> {target}'
for source, target in {'/custom-paper-bags-with-logo':'/product-paper-bags','/custom-cupcake-boxes':'/product-cake-boxes','/custom-mailer-boxes':'/product-mailer-boxes','/blog/product-paper-bags':'/product-paper-bags'}.items():
    assert rules[source] == target and rules[source + '.html'] == target
assert '/certifications.html' not in rules and '/xingye-website' not in rules, 'Do not redirect unrelated missing pages'
print(json.dumps({'checked_html': checked, 'blog_files_checked': blogs, 'service_nodes': services, 'redirect_rules': len(rules), 'errors': []}))
