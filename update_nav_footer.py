import os
import re

# Define the new navigation and footer templates with a placeholder for root path
NAV_TEMPLATE = """
    <nav>
        <a href="{root}index" class="logo">
            <img src="https://sc02.alicdn.com/kf/A94ddad755cf74f0d93ee51ab0229ac3ac.png" alt="iColorPack Logo" style="height: 40px; width: auto; vertical-align: middle;">
            <span style="vertical-align: middle; margin-left: 10px;">iColorPack</span>
        </a>
        <div class="menu-toggle" style="display: none; color: white; font-size: 24px; cursor: pointer;">☰</div>
        <ul class="nav-links">
            <li><a href="{root}index">Home</a></li>
            <li class="dropdown">
                <a href="javascript:void(0)" class="dropbtn">Products <span class="arrow">▼</span></a>
                <div class="dropdown-content">
                    <a href="{root}product-rigid-boxes">Rigid Boxes</a>
                    <a href="{root}product-paper-bags">Paper Bags</a>
                    <a href="{root}product-cake-boxes">Cake Boxes</a>
                    <a href="{root}product-mailer-boxes">Mailer Boxes</a>
                    <a href="{root}custom-kraft-paper-bags">Kraft Bags</a>
                </div>
            </li>
            <li class="dropdown">
                <a href="{root}industry-cases-2026" class="dropbtn">Industries <span class="arrow">▼</span></a>
                <div class="dropdown-content">
                    <a href="{root}industry-cases-2026" style="font-weight: 700; color: #C9A84C !important;">View All Industries</a>
                    <a href="{root}custom-packaging-for-cosmetics">Cosmetics</a>
                    <a href="{root}custom-packaging-for-jewelry">Jewelry</a>
                    <a href="{root}packaging-for-bakeries">Bakery</a>
                    <a href="{root}custom-packaging-for-clothing-brands">Clothing</a>
                    <a href="{root}packaging-for-candle-brands">Candle</a>
                    <a href="{root}custom-packaging-for-perfume">Perfume</a>
                    <a href="{root}ddp-custom-packaging-supplier-china">E-commerce</a>
                    <a href="{root}luxury-gift-boxes-with-logo">Gift Shop</a>
                </div>
            </li>
            <li><a href="{root}index#factory">Factory</a></li>
            <li><a href="{root}blog">Blog</a></li>
        </ul>
        <a href="https://wa.me/8618058355198" class="btn-quote-nav">Inquiry</a>
    </nav>
"""

FOOTER_TEMPLATE = """
    <footer>
        <div class="footer-grid">
            <div class="footer-col" style="text-align: left;">
                <a href="{root}index" class="logo">iColorPack</a>
                <p style="margin-top: 20px; color: #8A8A9A; font-size: 13px;">Premium luxury packaging manufacturer based in Wenzhou, China. Specializing in custom gift boxes, shopping bags, and bakery packaging.</p>
            </div>
            <div class="footer-col" style="text-align: left;">
                <h4 style="color: #C9A84C; font-size: 12px; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 2px;">Products</h4>
                <ul class="footer-links" style="list-style: none; padding: 0;">
                    <li><a href="{root}product-rigid-boxes" style="color: #8A8A9A; text-decoration: none; font-size: 13px; line-height: 2;">Rigid Gift Boxes</a></li>
                    <li><a href="{root}product-paper-bags" style="color: #8A8A9A; text-decoration: none; font-size: 13px; line-height: 2;">Luxury Paper Bags</a></li>
                    <li><a href="{root}product-cake-boxes" style="color: #8A8A9A; text-decoration: none; font-size: 13px; line-height: 2;">Custom Cake Boxes</a></li>
                    <li><a href="{root}product-mailer-boxes" style="color: #8A8A9A; text-decoration: none; font-size: 13px; line-height: 2;">Mailer Boxes</a></li>
                    <li><a href="{root}custom-kraft-paper-bags" style="color: #8A8A9A; text-decoration: none; font-size: 13px; line-height: 2;">Kraft Paper Bags</a></li>
                </ul>
            </div>
            <div class="footer-col" style="text-align: left;">
                <h4 style="color: #C9A84C; font-size: 12px; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 2px;">Contact Us</h4>
                <ul class="footer-links" style="list-style: none; padding: 0;">
                    <li style="color: #8A8A9A; font-size: 13px; line-height: 2;">Email: <a href="mailto:Jennifer@wzicolor.com" style="color: #C9A84C; text-decoration: none;">Jennifer@wzicolor.com</a></li>
                    <li style="color: #8A8A9A; font-size: 13px; line-height: 2;">WhatsApp: <a href="https://wa.me/8618058355198" style="color: #C9A84C; text-decoration: none;">+86-18058355198</a></li>
                    <li style="color: #8A8A9A; font-size: 13px; line-height: 2;">Address: Wenzhou, Zhejiang, China</li>
                </ul>
            </div>
        </div>
        <div class="copyright" style="margin-top: 50px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.05); font-size: 12px; color: #555;">
            <p>&copy; 2026 iColorPack Packaging Solutions. All Rights Reserved.</p>
        </div>
    </footer>
"""

DROPDOWN_CSS = """
        /* Navigation Dropdowns */
        .nav-links li.dropdown { position: relative; }
        .dropdown-content {
            display: none; position: absolute; background: #0D0D14;
            min-width: 220px; box-shadow: 0 10px 30px rgba(0,0,0,0.8);
            z-index: 1001; top: 100%; left: 0; border: 1px solid rgba(255,255,255,0.08);
            padding: 10px 0;
        }
        .dropdown-content a {
            color: #8A8A9A !important; padding: 12px 25px !important; text-decoration: none !important;
            display: block !important; font-size: 11px !important; text-transform: uppercase !important; letter-spacing: 1.5px !important;
            border-bottom: 1px solid rgba(255,255,255,0.03) !important; transition: 0.3s !important;
            text-align: left !important; line-height: 1.2 !important;
        }
        .dropdown-content a:last-child { border-bottom: none !important; }
        .dropdown-content a:hover { background: rgba(201, 168, 76, 0.1) !important; color: #C9A84C !important; padding-left: 30px !important; }
        .dropdown:hover .dropdown-content { display: block; }
        .arrow { font-size: 8px; margin-left: 8px; vertical-align: middle; opacity: 0.7; }

        .footer-grid { display: grid; grid-template-columns: 1.5fr repeat(2, 1fr); gap: 60px; max-width: 1200px; margin: 0 auto; }
        
        @media (max-width: 992px) {
            .menu-toggle { display: block !important; }
            .nav-links { 
                display: none; position: absolute; top: 100%; left: 0; width: 100%; 
                background: #0A0A0F; flex-direction: column; padding: 20px; 
                border-bottom: 1px solid rgba(255,255,255,0.1); 
            }
            .nav-links.active { display: flex !important; }
            .nav-links li { margin: 10px 0; width: 100%; }
            .dropdown-content { position: static; box-shadow: none; border: none; padding-left: 20px; display: none; background: transparent; }
            .dropdown.active .dropdown-content { display: block; }
        }
        @media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr; gap: 40px; } }
"""

MOBILE_MENU_JS = """
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const menuToggle = document.querySelector('.menu-toggle');
            const navLinks = document.querySelector('.nav-links');
            const dropdowns = document.querySelectorAll('.nav-links .dropdown');

            if (menuToggle && navLinks) {
                menuToggle.addEventListener('click', function() {
                    navLinks.classList.toggle('active');
                });
            }

            dropdowns.forEach(dropdown => {
                const btn = dropdown.querySelector('.dropbtn');
                btn.addEventListener('click', function(e) {
                    if (window.innerWidth <= 992) {
                        e.preventDefault();
                        dropdown.classList.toggle('active');
                    }
                });
            });

            // Close menu on click outside
            document.addEventListener('click', function(e) {
                if (navLinks && navLinks.classList.contains('active') && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                    navLinks.classList.remove('active');
                }
            });
        });
    </script>
"""

def update_file(file_path):
    print(f"Updating {file_path}...")
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Determine root path
    rel_path = os.path.relpath(file_path, os.getcwd())
    depth = rel_path.count(os.sep)
    root = "../" * depth

    # Replace Nav
    nav_html = NAV_TEMPLATE.replace("{root}", root)
    content = re.sub(r'<nav>.*?</nav>', nav_html, content, flags=re.DOTALL)
    content = re.sub(r'<nav id="navbar">.*?</nav>', nav_html, content, flags=re.DOTALL)

    # Replace Footer
    footer_html = FOOTER_TEMPLATE.replace("{root}", root)
    content = re.sub(r'<footer>.*?</footer>', footer_html, content, flags=re.DOTALL)

    # Add Dropdown CSS if not present or replace old
    if 'Navigation Dropdowns' in content:
        # Replace existing dropdown CSS block
        content = re.sub(r'/\* Navigation Dropdowns \*/.*?(?=\s*</style>)', DROPDOWN_CSS.strip(), content, flags=re.DOTALL)
    else:
        if '</style>' in content:
            content = content.replace('</style>', DROPDOWN_CSS + '\n    </style>')
        else:
            if '</head>' in content:
                content = content.replace('</head>', f'<style>{DROPDOWN_CSS}</style>\n</head>')

    # Add Mobile Menu JS if not present
    if 'menuToggle.addEventListener' not in content:
        if '</body>' in content:
            content = content.replace('</body>', MOBILE_MENU_JS + '\n</body>')

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    html_files = []
    # Root HTML files
    for f in os.listdir('.'):
        if f.endswith('.html'):
            html_files.append(f)
    
    # blog/ HTML files
    if os.path.exists('blog'):
        for f in os.listdir('blog'):
            if f.endswith('.html'):
                html_files.append(os.path.join('blog', f))
                
    # Also check 'public/' and 'public/blog/' if they exist
    if os.path.exists('public'):
        for f in os.listdir('public'):
            if f.endswith('.html'):
                html_files.append(os.path.join('public', f))
        if os.path.exists('public/blog'):
            for f in os.listdir('public/blog'):
                if f.endswith('.html'):
                    html_files.append(os.path.join('public/blog', f))

    # Remove duplicates and filtered files
    html_files = list(set(html_files))
    exclude = ['full_code.html', 'iColorPack_精美排版清单_Word专用.html', 'verify_images', 'part1.html', 'part2.html']
    html_files = [f for f in html_files if not any(x in f for x in exclude)]

    for f in html_files:
        try:
            update_file(f)
        except Exception as e:
            print(f"Error updating {f}: {e}")

if __name__ == "__main__":
    main()
