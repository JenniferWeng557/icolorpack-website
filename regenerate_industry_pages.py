import os

TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-MQY10GFCR8"></script>
    <script>window.dataLayer = window.dataLayer || []; function gtag(){{dataLayer.push(arguments);}} gtag('js', new Date()); gtag('config', 'G-MQY10GFCR8');</script>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>{title} | iColorPack</title>
    <meta name="description" content="{description}">
    <link rel="icon" type="image/png" href="images/Ac883bba6ae6a4f9dbf52bb335d605e8fj.webp">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,700;1,700&display=swap" rel="stylesheet">
    <style>
        :root {{
            --gold: #C9A84C; --dark-bg: #0A0A0F; --card-bg: #12121A; --white: #FFFFFF; --text-muted: #8A8A9A;
            --border: rgba(255, 255, 255, 0.12);
        }}
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        body {{ font-family: 'Montserrat', sans-serif; background: var(--dark-bg); color: var(--white); line-height: 1.6; overflow-x: hidden; }}
        
        nav {{
            position: fixed; top: 0; width: 100%; z-index: 1000;
            padding: 20px 8%; display: flex; align-items: center; justify-content: space-between;
            background: rgba(10, 10, 15, 0.95); backdrop-filter: blur(15px);
            border-bottom: 1px solid rgba(255,255,255,0.03);
        }}
        .logo {{ font-size: 20px; font-weight: 700; text-decoration: none; color: var(--white); letter-spacing: 3px; display: flex; align-items: center; }}
        .nav-links {{ display: flex; gap: 40px; list-style: none; }}
        .nav-links a {{ text-decoration: none; color: var(--text-muted); font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; transition: 0.3s; }}
        .nav-links a:hover {{ color: var(--gold); }}
        
        /* Dropdown Styles */
        .dropdown {{ position: relative; }}
        .dropdown-content {{
            display: none; position: absolute; background: #0D0D14; min-width: 220px;
            top: 100%; left: 0; border: 1px solid var(--border); padding: 10px 0;
            box-shadow: 0 10px 30px rgba(0,0,0,0.8);
        }}
        .dropdown-content a {{
            padding: 12px 25px !important; font-size: 11px !important; color: #8A8A9A !important;
            border-bottom: 1px solid rgba(255,255,255,0.03); display: block !important;
        }}
        .dropdown-content a:hover {{ background: rgba(201, 168, 76, 0.1) !important; color: var(--gold) !important; }}
        .dropdown:hover .dropdown-content {{ display: block; }}

        .hero {{
            height: 70vh; background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('{hero_img}') center/cover no-repeat;
            display: flex; align-items: center; justify-content: center; text-align: center; padding: 0 10%; margin-top: 60px;
        }}
        .hero h1 {{ font-family: 'Playfair Display', serif; font-size: 48px; letter-spacing: 2px; color: var(--white); }}
        .hero p {{ font-size: 14px; color: var(--gold); margin-bottom: 20px; font-weight: 600; text-transform: uppercase; letter-spacing: 4px; }}

        .gallery-container {{ padding: 100px 8%; }}
        .visual-grid {{ display: grid; grid-template-columns: repeat(2, 1fr); gap: 30px; }}
        .grid-item {{ position: relative; aspect-ratio: 1/1; overflow: hidden; background: var(--card-bg); border: 1px solid var(--border); }}
        .grid-item img {{ width: 100%; height: 100%; object-fit: cover; transition: 0.6s; }}
        .grid-item:hover img {{ transform: scale(1.05); }}
        .item-label {{
            position: absolute; bottom: 0; left: 0; right: 0; padding: 25px;
            background: rgba(0,0,0,0.8); text-align: left;
        }}
        .item-label h3 {{ font-size: 14px; color: var(--gold); text-transform: uppercase; margin-bottom: 5px; }}
        .item-label p {{ font-size: 11px; color: var(--white); opacity: 0.8; text-transform: uppercase; }}

        .form-section {{ padding: 100px 8%; background: #07070a; text-align: center; }}
        .luxo-form {{
            display: grid; grid-template-columns: 1fr 1fr; gap: 20px; max-width: 800px; margin: 40px auto;
            background: var(--card-bg); padding: 40px; border: 1px solid var(--border);
        }}
        .form-group {{ display: flex; flex-direction: column; gap: 8px; text-align: left; }}
        .full {{ grid-column: span 2; }}
        .form-group label {{ font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; }}
        .form-group input, .form-group textarea {{
            background: #15151e; border: 1px solid var(--border); padding: 15px; color: var(--white); outline: none;
        }}
        .btn-submit {{
            grid-column: span 2; padding: 20px; background: var(--gold); color: #000;
            font-weight: 700; text-transform: uppercase; border: none; cursor: pointer; transition: 0.3s;
        }}
        .btn-submit:hover {{ transform: translateY(-2px); }}

        footer {{ padding: 80px 8%; border-top: 1px solid var(--border); background: #050508; }}
        .footer-grid {{ display: grid; grid-template-columns: 1.5fr repeat(2, 1fr); gap: 60px; }}
        .footer-col h4 {{ color: var(--gold); margin-bottom: 20px; font-size: 12px; text-transform: uppercase; }}
        .footer-links {{ list-style: none; }}
        .footer-links li {{ margin-bottom: 12px; }}
        .footer-links a {{ color: var(--text-muted); text-decoration: none; font-size: 13px; }}

        @media (max-width: 768px) {{
            .visual-grid, .footer-grid, .luxo-form {{ grid-template-columns: 1fr; }}
            .full {{ grid-column: span 1; }}
            .hero h1 {{ font-size: 32px; }}
        }}
    </style>
</head>
<body>
    <nav>
        <a href="index" class="logo">
            <img src="images/Ac883bba6ae6a4f9dbf52bb335d605e8fj.webp" alt="Logo" style="height: 40px;">
            <span style="margin-left: 10px;">iColorPack</span>
        </a>
        <ul class="nav-links">
            <li><a href="index">Home</a></li>
            <li class="dropdown">
                <a href="javascript:void(0)">Products ▼</a>
                <div class="dropdown-content">
                    <a href="product-rigid-boxes">Rigid Boxes</a>
                    <a href="product-paper-bags">Paper Bags</a>
                    <a href="product-cake-boxes">Cake Boxes</a>
                    <a href="product-mailer-boxes">Mailer Boxes</a>
                </div>
            </li>
            <li class="dropdown">
                <a href="industry-cases-2026">Industries ▼</a>
                <div class="dropdown-content">
                    <a href="custom-packaging-for-cosmetics">Cosmetics</a>
                    <a href="custom-packaging-for-jewelry">Jewelry</a>
                    <a href="packaging-for-bakeries">Bakery</a>
                    <a href="custom-packaging-for-clothing-brands">Clothing</a>
                    <a href="packaging-for-candle-brands">Candle</a>
                    <a href="custom-packaging-for-perfume">Perfume</a>
                    <a href="ddp-custom-packaging-supplier-china">E-commerce</a>
                    <a href="luxury-gift-boxes-with-logo">Gift Shop</a>
                </div>
            </li>
            <li><a href="blog">Blog</a></li>
        </ul>
        <a href="https://wa.me/8618058355198" style="border: 1px solid var(--gold); color: var(--gold); padding: 8px 18px; text-decoration: none; font-size: 10px; font-weight: 700;">Inquiry</a>
    </nav>

    <div class="hero">
        <div class="hero-content">
            <p>Industry Excellence</p>
            <h1>{hero_h1}</h1>
        </div>
    </div>

    <div class="gallery-container">
        <div class="visual-grid">
            <div class="grid-item">
                <img src="{img1}" alt="Packaging 1">
                <div class="item-label">
                    <h3>{label1_h3}</h3>
                    <p>{label1_p}</p>
                </div>
            </div>
            <div class="grid-item">
                <img src="{img2}" alt="Packaging 2">
                <div class="item-label">
                    <h3>{label2_h3}</h3>
                    <p>{label2_p}</p>
                </div>
            </div>
            <div class="grid-item">
                <img src="{img3}" alt="Packaging 3">
                <div class="item-label">
                    <h3>{label3_h3}</h3>
                    <p>{label3_p}</p>
                </div>
            </div>
            <div class="grid-item">
                <img src="{img4}" alt="Packaging 4">
                <div class="item-label">
                    <h3>{label4_h3}</h3>
                    <p>{label4_p}</p>
                </div>
            </div>
        </div>
    </div>

    <section class="form-section">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 32px;">Request a Custom Quote</h2>
        <form class="luxo-form" action="https://formspree.io/f/mkoeljdw" method="POST">
            <div class="form-group"><label>Name *</label><input type="text" name="name" required></div>
            <div class="form-group"><label>Email *</label><input type="email" name="email" required></div>
            <div class="form-group full"><label>Industry</label><input type="text" name="industry" value="{industry_name}" readonly></div>
            <div class="form-group full"><label>Message</label><textarea name="message" rows="5" placeholder="Tell us about your project..."></textarea></div>
            <button type="submit" class="btn-submit">Get My Factory Quote</button>
        </form>
    </section>

    <footer>
        <div class="footer-grid">
            <div class="footer-col">
                <h4 style="font-size: 16px; margin-bottom: 15px;">iColorPack</h4>
                <p style="color: var(--text-muted); font-size: 13px;">Premium luxury packaging manufacturer. Quality and elegance in every box.</p>
            </div>
            <div class="footer-col">
                <h4>Solutions</h4>
                <ul class="footer-links">
                    <li><a href="product-rigid-boxes">Rigid Boxes</a></li>
                    <li><a href="product-paper-bags">Paper Bags</a></li>
                    <li><a href="product-cake-boxes">Cake Boxes</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Contact</h4>
                <ul class="footer-links">
                    <li><a href="mailto:Jennifer@wzicolor.com">Jennifer@wzicolor.com</a></li>
                    <li><a href="https://wa.me/8618058355198">+86-18058355198</a></li>
                </ul>
            </div>
        </div>
        <p style="text-align: center; margin-top: 40px; color: #555; font-size: 12px;">© 2026 iColorPack Solutions. All Rights Reserved.</p>
    </footer>
</body>
</html>"""

SECTORS = [
    {
        "files": ["custom-packaging-for-cosmetics.html", "packaging-for-cosmetics-brands.html"],
        "title": "Custom Cosmetics Packaging Solutions",
        "description": "Premium custom packaging for cosmetics brands. Luxury cosmetic boxes, skincare packaging, and branded paper bags.",
        "hero_img": "https://sc02.alicdn.com/kf/A3e7f404a41c24e38a32422d28773c969U.png",
        "hero_h1": "Luxury Skincare & Beauty Solutions",
        "industry_name": "Cosmetics",
        "img1": "https://s.alicdn.com/@sc04/kf/He312d0f9e1ba40feac67876fb1d7d54fX.jpg",
        "label1_h3": "Luxe Cream Box", "label1_p": "Rigid Construction | Gold Foil",
        "img2": "https://s.alicdn.com/@sc04/kf/Hf259b887b692474b863b9bfa3b4cc3bfj.jpg",
        "label2_h3": "Serum Bottle Box", "label2_p": "Soft Touch | UV Spot",
        "img3": "https://s.alicdn.com/@sc04/kf/H36ad5a779232427baa63fd27cd1198d0d.jpg",
        "label3_h3": "Palette Collection", "label3_p": "Textured Paper | Precise Fit",
        "img4": "https://s.alicdn.com/@sc04/kf/H7ef043f8dfd44062a8b91074c206c530X.png",
        "label4_h3": "Cosmetic Set", "label4_p": "Magnetic Closure | Ribbon"
    },
    {
        "files": ["custom-packaging-for-jewelry.html", "packaging-for-jewelry-brands.html"],
        "title": "Custom Jewelry Packaging Solutions",
        "description": "Elevate your jewelry brand with custom luxury packaging. From velvet-lined drawer boxes to foil-stamped gift bags.",
        "hero_img": "https://sc02.alicdn.com/kf/Affe59e14aeab4230bc75914d99adfb6ai.png",
        "hero_h1": "Premium Jewelry Solutions",
        "industry_name": "Jewelry",
        "img1": "https://s.alicdn.com/@sc04/kf/H5c793b053d2c4a4a9ba6d8098a6dfc9aN.jpg",
        "label1_h3": "Velvet Ring Box", "label1_p": "Premium Suede | Gold Trim",
        "img2": "https://s.alicdn.com/@sc04/kf/Hc8de1e9888c84c2eb7ce294a42ce28868.jpg",
        "label2_h3": "Drawer Necklace Box", "label2_p": "Slide-out | Textured Finish",
        "img3": "https://s.alicdn.com/@sc04/kf/Hab2ef299937246979bf3724b5fd34c844.jpg",
        "label3_h3": "Double Door Box", "label3_p": "Symmetrical | Luxury Presentation",
        "img4": "https://s.alicdn.com/@sc04/kf/H262402c4759e40e4bf1ac45f71e8c41aH.png",
        "label4_h3": "Jewelry Set Box", "label4_p": "Multi-insert | Unified Brand"
    },
    {
        "files": ["packaging-for-bakeries.html"],
        "title": "Artisan Bakery Packaging Solutions",
        "description": "Custom bakery boxes, cake boxes, and pastry packaging for artisan bakeries. High-quality food-grade materials.",
        "hero_img": "https://sc02.alicdn.com/kf/A3e7f404a41c24e38a32422d28773c969U.png",
        "hero_h1": "Artisan Bakery Packaging",
        "industry_name": "Bakery",
        "img1": "https://sc02.alicdn.com/kf/H9a34a87a6d8c4e4395c8f4989e7c510dU.jpg",
        "label1_h3": "Premium Cake Box", "label1_p": "Food Grade | Clear Window",
        "img2": "https://sc02.alicdn.com/kf/A3e7f404a41c24e38a32422d28773c969U.png",
        "label2_h3": "Macaron Drawer Box", "label2_p": "Elegant Divider | Gold Stamp",
        "img3": "https://sc02.alicdn.com/kf/H7ef043f8dfd44062a8b91074c206c530X.png",
        "label3_h3": "Cookie Collection", "label3_p": "Kraft Style | Eco-friendly",
        "img4": "https://sc02.alicdn.com/kf/Hd587e2d5fb63472f9e7129342c2201aeC.jpg",
        "label4_h3": "Bread Packaging", "label4_p": "Breathable | Custom Print"
    },
    {
        "files": ["custom-packaging-for-clothing-brands.html", "packaging-for-clothing-boutiques.html"],
        "title": "Fashion & Apparel Packaging Solutions",
        "description": "Luxury garment boxes, shipping mailers, and branded shopping bags for fashion brands. Premium unboxing for apparel.",
        "hero_img": "https://s.alicdn.com/@sc04/kf/H5254f5689502496c89aa640caf3ccb0fz.jpg",
        "hero_h1": "Fashion & Apparel Packaging",
        "industry_name": "Clothing",
        "img1": "https://s.alicdn.com/@sc04/kf/H9b030a5fc7d94d98a798f982158b55ce0.jpg",
        "label1_h3": "Matte Apparel Box", "label1_p": "Magnetic | Minimalist White",
        "img2": "https://s.alicdn.com/@sc04/kf/H3726328ca2704720abc4bac83e91c65af.jpg",
        "label2_h3": "Luxury Scarf Box", "label2_p": "Drawer Style | Black Silk Insert",
        "img3": "https://s.alicdn.com/@sc04/kf/Ha004176cc3534f268d58f2b9e658fdfbl.jpg",
        "label3_h3": "Premium E-com Mailer", "label3_p": "Corrugated | Inside Print",
        "img4": "https://s.alicdn.com/@sc04/kf/Hcdde4cccc10e4b3e91f39718b42199b96.jpg",
        "label4_h3": "Branded Garment Bag", "label4_p": "High-GSM | Ribbon Handle"
    },
    {
        "files": ["packaging-for-candle-brands.html"],
        "title": "Premium Candle Packaging Solutions",
        "description": "Luxury candle boxes and gift packaging for candle brands. Heat-resistant materials and premium unboxing.",
        "hero_img": "https://s.alicdn.com/@sc04/kf/He312d0f9e1ba40feac67876fb1d7d54fX.jpg",
        "hero_h1": "Premium Candle Packaging",
        "industry_name": "Candle",
        "img1": "https://s.alicdn.com/@sc04/kf/Hf259b887b692474b863b9bfa3b4cc3bfj.jpg",
        "label1_h3": "Round Candle Tube", "label1_p": "Seamless | Gold Embossing",
        "img2": "https://s.alicdn.com/@sc04/kf/H36ad5a779232427baa63fd27cd1198d0d.jpg",
        "label2_h3": "White Candle Box", "label2_p": "Textured Paper | Clean Design",
        "img3": "https://s.alicdn.com/@sc04/kf/H28f8c23de1fd443bad3983076da6c0a1Y.png",
        "label3_h3": "Luxury Rigid Box", "label3_p": "Heavy Board | Custom Foam",
        "img4": "https://s.alicdn.com/@sc04/kf/H8dcfbbcce72c4d7e99fb37d54bcf81b33.png",
        "label4_h3": "Gift Set Box", "label4_p": "Window Cut | Scent Protection"
    },
    {
        "files": ["custom-packaging-for-perfume.html", "packaging-for-perfume-brands.html"],
        "title": "Luxury Fragrance Packaging Solutions",
        "description": "High-end perfume boxes, fragrance packaging, and custom perfume gift sets. Premium finishes for luxury brands.",
        "hero_img": "https://s.alicdn.com/@sc04/kf/Hf297b45d72904c73bf987b1aa833ac35X.jpg",
        "hero_h1": "Luxury Fragrance Solutions",
        "industry_name": "Perfume",
        "img1": "https://s.alicdn.com/@sc04/kf/H7faaa003948a40599466ddcf59c06177N.jpg",
        "label1_h3": "Minimalist Perfume Box", "label1_p": "Matte White | Debossed Logo",
        "img2": "https://s.alicdn.com/@sc04/kf/Hfaf78d3ce47d43549b4e17904b9aabf20.png",
        "label2_h3": "Textured Black Box", "label2_p": "Linen Paper | Gold Stamping",
        "img3": "https://s.alicdn.com/@sc04/kf/H482db7b0a65d42e48124de0bddf502ecz.jpg",
        "label3_h3": "Classic Fragrance Box", "label3_p": "Standard Rigid | Satin Lining",
        "img4": "https://s.alicdn.com/@sc04/kf/Hcdde4cccc10e4b3e91f39718b42199b96.jpg",
        "label4_h3": "Branded Perfume Bag", "label4_p": "Luxury Shopping Bag Style"
    },
    {
        "files": ["ddp-custom-packaging-supplier-china.html", "packaging-for-ecommerce-brands.html"],
        "title": "DDP E-commerce Packaging Solutions",
        "description": "Reliable DDP shipping and custom e-commerce packaging from China. Mailer boxes, poly mailers, and shipping boxes.",
        "hero_img": "https://s.alicdn.com/@sc04/kf/Ha004176cc3534f268d58f2b9e658fdfbl.jpg",
        "hero_h1": "DDP E-commerce Packaging",
        "industry_name": "E-commerce",
        "img1": "https://s.alicdn.com/@sc04/kf/H9b030a5fc7d94d98a798f982158b55ce0.jpg",
        "label1_h3": "Premium Mailer Box", "label1_p": "Heavy Duty | White/Kraft",
        "img2": "https://s.alicdn.com/@sc04/kf/Hcdde4cccc10e4b3e91f39718b42199b96.jpg",
        "label2_h3": "Custom Shopping Bag", "label2_p": "Retail Ready | Durable",
        "img3": "https://s.alicdn.com/@sc04/kf/Hf297b45d72904c73bf987b1aa833ac35X.jpg",
        "label3_h3": "Subscription Box", "label3_p": "Vibrant Print | High Strength",
        "img4": "https://s.alicdn.com/@sc04/kf/H7faaa003948a40599466ddcf59c06177N.jpg",
        "label4_h3": "Shipping Mailer", "label4_p": "Poly/Paper Mix | Eco-friendly"
    },
    {
        "files": ["luxury-gift-boxes-with-logo.html", "packaging-for-gift-shops.html"],
        "title": "Luxury Gift Store Packaging Solutions",
        "description": "Custom luxury gift boxes with logo for boutique gift shops. Ribbon-tied boxes and premium shopping bags.",
        "hero_img": "https://s.alicdn.com/@sc04/kf/H4466e5c60ecd40c58416b262d1586df3B.jpg",
        "hero_h1": "Luxury Gift Shop Solutions",
        "industry_name": "Gift Shop",
        "img1": "https://s.alicdn.com/@sc04/kf/H7d3fc4913d8d4d0ca2396532675260c7P.jpg",
        "label1_h3": "Boutique Bag Set", "label1_p": "Gold Accents | Ribbon Handle",
        "img2": "https://s.alicdn.com/@sc04/kf/Hc55e8c6b428346869f786850367134d2S.jpg",
        "label2_h3": "Magnetic Gift Box", "label2_p": "Collapsible | Luxury Texture",
        "img3": "https://s.alicdn.com/@sc04/kf/H0f58f650b7f7499d9bfeb9d338bb2ad23.png",
        "label3_h3": "Ribbon-Tied Box", "label3_p": "Elegant Bow | Soft Touch",
        "img4": "https://s.alicdn.com/@sc04/kf/H1f2c9ded863f4252b04f1df81e90fe174.jpg",
        "label4_h3": "Pink Boutique Box", "label4_p": "Satin Lining | Chic Design"
    }
]

for sector in SECTORS:
    content = TEMPLATE.format(**sector)
    for filename in sector['files']:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        # Sync to public
        public_path = os.path.join('public', filename)
        with open(public_path, 'w', encoding='utf-8') as f:
            f.write(content)

print("Regenerated all 8 industry pages successfully.")
