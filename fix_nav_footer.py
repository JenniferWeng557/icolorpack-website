import os
import re

NAV_HTML = """<nav id="navbar">
    <a href="index" class="logo">
      <div class="logo-wrapper" style="display: flex; align-items: center; gap: 12px;">
        <svg width="40" height="40" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M60 35 L95 20 L60 5 L25 20 Z" fill="#C9A84C" opacity="0.8"/>
          <path d="M25 20 L10 45 L45 60 L60 35 Z" fill="#E8C97A"/>
          <path d="M95 20 L110 45 L75 60 L60 35 Z" fill="#E8C97A"/>
          <path d="M60 35 L45 60 L60 85 L75 60 Z" fill="#000000"/>
          <path d="M25 55 V95 L60 115 V75 L45 60 Z" fill="#C9A84C"/>
          <path d="M95 55 V95 L60 115 V75 L75 60 Z" fill="#A6893A"/>
          <text x="32" y="98" font-family="Arial, sans-serif" font-weight="900" font-size="28" fill="#000" style="letter-spacing:-1px; opacity:0.8;">iCP</text>
        </svg>
        <span style="font-family: 'Playfair Display', serif; font-weight: 700; font-size: 24px; color: #C9A84C; letter-spacing: 1px; text-transform: none;">iColorPacks</span>
      </div>
    </a>
    <ul class="nav-links">
      <li><a href="index">Home</a></li>
      <li class="dropdown">
        <a href="product-rigid-boxes">Products <span class="arrow">▼</span></a>
        <div class="dropdown-content">
          <a href="product-rigid-boxes">Rigid Gift Boxes</a>
          <a href="product-cake-boxes">Cake & Bakery Boxes</a>
          <a href="product-paper-bags">Luxury Paper Bags</a>
          <a href="product-mailer-boxes">Mailer Boxes</a>
          <a href="product-kraft-bags">Kraft Paper Bags</a>
        </div>
      </li>
      <li><a href="industry-solutions">Solutions</a></li>
      <li><a href="case-studies">Case Studies</a></li>
      <li><a href="blog">Insights</a></li>
      <li><a onclick="toggleModal()" class="btn-quote-nav">Get Quote</a></li>
    </ul>
    <div class="menu-toggle" style="display:none; color:var(--white); font-size:24px; cursor:pointer;">☰</div>
</nav>"""

FOOTER_HTML = """<footer>
    <div class="footer-grid">
      <div class="footer-col">
        <div class="logo-wrapper" style="display: flex; align-items: center; gap: 12px; margin-bottom: 30px;">
          <svg width="30" height="30" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M60 35 L95 20 L60 5 L25 20 Z" fill="#C9A84C" opacity="0.8"/>
            <path d="M25 20 L10 45 L45 60 L60 35 Z" fill="#E8C97A"/>
            <path d="M95 20 L110 45 L75 60 L60 35 Z" fill="#E8C97A"/>
            <path d="M60 35 L45 60 L60 85 L75 60 Z" fill="#000000"/>
            <path d="M25 55 V95 L60 115 V75 L45 60 Z" fill="#C9A84C"/>
            <path d="M95 55 V95 L60 115 V75 L75 60 Z" fill="#A6893A"/>
            <text x="32" y="98" font-family="Arial, sans-serif" font-weight="900" font-size="28" fill="#000" style="letter-spacing:-1px; opacity:0.8;">iCP</text>
          </svg>
          <span style="font-family: 'Playfair Display', serif; font-weight: 700; font-size: 18px; color: #C9A84C;">iColorPacks</span>
        </div>
        <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 25px;">Premium B2B packaging solutions for global luxury brands. Direct from our Wenzhou facility to your doorstep.</p>
        <div class="footer-links">
          <li><a href="mailto:Jennifer@wzicolor.com">Jennifer@wzicolor.com</a></li>
          <li><a href="https://wa.me/8618058355198">WhatsApp: +86-18058355198</a></li>
        </div>
      </div>
      <div class="footer-col">
        <h4>Products</h4>
        <ul class="footer-links">
          <li><a href="product-rigid-boxes">Luxury Rigid Boxes</a></li>
          <li><a href="product-cake-boxes">Custom Cake Boxes</a></li>
          <li><a href="product-paper-bags">Premium Paper Bags</a></li>
          <li><a href="product-mailer-boxes">Mailer Boxes</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <ul class="footer-links">
          <li><a href="industry-solutions">Industry Solutions</a></li>
          <li><a href="case-studies">Success Stories</a></li>
          <li><a href="blog">Packaging Insights</a></li>
          <li><a href="sitemap.xml">Sitemap</a></li>
        </ul>
      </div>
    </div>
    <div style="text-align: center; margin-top: 60px; padding-top: 30px; border-top: 1px solid rgba(255,255,255,0.03); font-size: 11px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px;">
      © 2026 iColorPacks · Wenzhou iColor Packaging Co., Ltd. All Rights Reserved.
    </div>
</footer>"""

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Fix Navigation
    # The broken nav starts with <nav> and ends with </div></div> and maybe some junk
    # We will replace from <nav> until the first <section> or <header> or <div> that is NOT the logo
    # But it's easier to just find the broken pattern and replace it.
    
    # Let's try to find <nav> ... </div></div> and replace it with NAV_HTML
    # We use non-greedy matching .*?
    content = re.sub(r'<nav>.*?</svg>\s*<span.*?>iColorPacks</span>\s*</div></div>', NAV_HTML, content, flags=re.DOTALL)
    
    # Also handle the case where it might have a closing </nav> but is still broken
    content = re.sub(r'<nav id="navbar">.*?</nav>', NAV_HTML, content, flags=re.DOTALL)

    # Fix Footer
    # If footer exists, replace it. If not, insert before </body>
    if '<footer>' in content:
        content = re.sub(r'<footer>.*?</footer>', FOOTER_HTML, content, flags=re.DOTALL)
    elif '</body>' in content:
        content = content.replace('</body>', FOOTER_HTML + '\n</body>')

    # Remove duplicate </section> if it exists immediately after nav (caused by broken edit)
    content = content.replace(NAV_HTML + '\n  </section>', NAV_HTML)
    content = content.replace(NAV_HTML + '  </section>', NAV_HTML)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Fixed {filepath}")

def main():
    files = [f for f in os.listdir('.') if f.endswith('.html')]
    for f in files:
        fix_file(f)
    
    if os.path.exists('public'):
        for f in os.listdir('public'):
            if f.endswith('.html'):
                fix_file(os.path.join('public', f))

if __name__ == "__main__":
    main()
