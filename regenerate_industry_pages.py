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
        "hero_img": "https://sc02.alicdn.com/kf/A74f18406b5eb4018aa0b1067a949c2b8l.png",
        "hero_h1": "Luxury Skincare & Beauty Solutions",
        "industry_name": "Cosmetics",
        "img1": "https://sc02.alicdn.com/kf/A8112e913dc724ef588fb9e98bbe04495B.png",
        "label1_h3": "Luxe Cream Box", "label1_p": "Rigid Construction | Gold Foil",
        "img2": "https://sc02.alicdn.com/kf/Ac5ea6ed7481f462681673a35c60d1bb3I.png",
        "label2_h3": "Serum Bottle Box", "label2_p": "Soft Touch | UV Spot",
        "img3": "https://sc02.alicdn.com/kf/A7da0b87976a14babbd19fa1f61b7b173y.png",
        "label3_h3": "Palette Collection", "label3_p": "Textured Paper | Precise Fit",
        "img4": "https://sc02.alicdn.com/kf/A5c422ba3c67c4da1a7c451d822aa1f139.png",
        "label4_h3": "Cosmetic Set", "label4_p": "Magnetic Closure | Ribbon"
    },
    {
        "files": ["custom-packaging-for-jewelry.html", "packaging-for-jewelry-brands.html"],
        "title": "Custom Jewelry Packaging Solutions",
        "description": "Elevate your jewelry brand with custom luxury packaging. From velvet-lined drawer boxes to foil-stamped gift bags.",
        "hero_img": "https://sc02.alicdn.com/kf/Aff9196c5a80543128e38374bc291ac88S.png",
        "hero_h1": "Premium Jewelry Solutions",
        "industry_name": "Jewelry",
        "img1": "https://sc02.alicdn.com/kf/Abff3bf740e904c5c8a520589ef92ececo.png",
        "label1_h3": "Velvet Ring Box", "label1_p": "Premium Suede | Gold Trim",
        "img2": "https://sc02.alicdn.com/kf/A7809d572f48443d5963f5a9e61230131q.png",
        "label2_h3": "Drawer Necklace Box", "label2_p": "Slide-out | Textured Finish",
        "img3": "https://sc02.alicdn.com/kf/Ac46e29da1abb4affad751541034b7a27c.png",
        "label3_h3": "Double Door Box", "label3_p": "Symmetrical | Luxury Presentation",
        "img4": "https://sc02.alicdn.com/kf/Afe6bf4743bf247fc9308ba51267b932ae.png",
        "label4_h3": "Jewelry Set Box", "label4_p": "Multi-insert | Unified Brand"
    },
    {
        "files": ["packaging-for-bakeries.html"],
        "title": "Artisan Bakery Packaging Solutions",
        "description": "Custom bakery boxes, cake boxes, and pastry packaging for artisan bakeries. High-quality food-grade materials.",
        "hero_img": "https://sc02.alicdn.com/kf/A1a2f051969fa4bd6b7f6f84041600029B.png",
        "hero_h1": "Artisan Bakery Packaging",
        "industry_name": "Bakery",
        "img1": "https://sc02.alicdn.com/kf/Af60ab40f87bf4d16bed24dbbf1cae568Y.png",
        "label1_h3": "Premium Cake Box", "label1_p": "Food Grade | Clear Window",
        "img2": "https://sc02.alicdn.com/kf/Af3242e9c7e214b9aa94211f96eb41e89v.png",
        "label2_h3": "Macaron Drawer Box", "label2_p": "Elegant Divider | Gold Stamp",
        "img3": "https://sc02.alicdn.com/kf/Af54194d49a304e789e7c5aced4e27ee3G.png",
        "label3_h3": "Cookie Collection", "label3_p": "Kraft Style | Eco-friendly",
        "img4": "https://sc02.alicdn.com/kf/A8f8f62e76dbb4bc8997150837c947ab4L.png",
        "label4_h3": "Bread Packaging", "label4_p": "Breathable | Custom Print"
    },
    {
        "files": ["custom-packaging-for-clothing-brands.html", "packaging-for-clothing-boutiques.html"],
        "title": "Fashion & Apparel Packaging Solutions",
        "description": "Luxury garment boxes, shipping mailers, and branded shopping bags for fashion brands. Premium unboxing for apparel.",
        "hero_img": "https://sc02.alicdn.com/kf/A44deae5ff5c846b3a12eb779b08818f0S.png",
        "hero_h1": "Fashion & Apparel Packaging",
        "industry_name": "Clothing",
        "img1": "https://sc02.alicdn.com/kf/A7a1acbfba3694d8f994d5a3498c971f7j.png",
        "label1_h3": "Matte Apparel Box", "label1_p": "Magnetic | Minimalist White",
        "img2": "https://sc02.alicdn.com/kf/A348d856d00f44e61a6069f24662d738eh.png",
        "label2_h3": "Luxury Scarf Box", "label2_p": "Drawer Style | Black Silk Insert",
        "img3": "https://sc02.alicdn.com/kf/A39f5a1fc389445248c6b3d5896e29036d.png",
        "label3_h3": "Premium E-com Mailer", "label3_p": "Corrugated | Inside Print",
        "img4": "https://sc02.alicdn.com/kf/Aa95881c2432d493ab3a65053a5e967a76.png",
        "label4_h3": "Branded Garment Bag", "label4_p": "High-GSM | Ribbon Handle"
    },
    {
        "files": ["packaging-for-candle-brands.html"],
        "title": "Premium Candle Packaging Solutions",
        "description": "Luxury candle boxes and gift packaging for candle brands. Heat-resistant materials and premium unboxing.",
        "hero_img": "https://sc02.alicdn.com/kf/A13fe854ba74c47fd9937e729005f73b1M.png",
        "hero_h1": "Premium Candle Packaging",
        "industry_name": "Candle",
        "img1": "https://sc02.alicdn.com/kf/A50835b0d47da4581817e77a634b2eec7p.png",
        "label1_h3": "Round Candle Tube", "label1_p": "Seamless | Gold Embossing",
        "img2": "https://sc02.alicdn.com/kf/A1bd216e071934e3c8d038f2ef9850af4c.png",
        "label2_h3": "White Candle Box", "label2_p": "Textured Paper | Clean Design",
        "img3": "https://sc02.alicdn.com/kf/Ae27da25e8abe48b0823835e7934f9a14w.png",
        "label3_h3": "Luxury Rigid Box", "label3_p": "Heavy Board | Custom Foam",
        "img4": "https://sc02.alicdn.com/kf/A2b1ad1cc693443ac8b8212660f7ad0afX.png",
        "label4_h3": "Gift Set Box", "label4_p": "Window Cut | Scent Protection"
    },
    {
        "files": ["custom-packaging-for-perfume.html", "packaging-for-perfume-brands.html"],
        "title": "Luxury Fragrance Packaging Solutions",
        "description": "High-end perfume boxes, fragrance packaging, and custom perfume gift sets. Premium finishes for luxury brands.",
        "hero_img": "https://sc02.alicdn.com/kf/A285ef35ca2d24d92ab8735d2de90a5d71.png",
        "hero_h1": "Luxury Fragrance Solutions",
        "industry_name": "Perfume",
        "img1": "https://sc02.alicdn.com/kf/A23fb7b78a0e347e9876028d65a0244d16.png",
        "label1_h3": "Minimalist Perfume Box", "label1_p": "Matte White | Debossed Logo",
        "img2": "https://sc02.alicdn.com/kf/A624fa7695ad14cb787b9da29f4f82e0eF.png",
        "label2_h3": "Textured Black Box", "label2_p": "Linen Paper | Gold Stamping",
        "img3": "https://sc02.alicdn.com/kf/Ab6e55940befe4e4bbfab3a2595493c54C.png",
        "label3_h3": "Classic Fragrance Box", "label3_p": "Standard Rigid | Satin Lining",
        "img4": "https://sc02.alicdn.com/kf/Ade7639c91ddd45e1b41d1bbeaf33a00aZ.png",
        "label4_h3": "Branded Perfume Bag", "label4_p": "Luxury Shopping Bag Style"
    },
    {
        "files": ["ddp-custom-packaging-supplier-china.html", "packaging-for-ecommerce-brands.html"],
        "title": "DDP E-commerce Packaging Solutions",
        "description": "Reliable DDP shipping and custom e-commerce packaging from China. Mailer boxes, easy-open boxes, and luxury subscription boxes.",
        "hero_img": "https://sc02.alicdn.com/kf/Aeffc91c419f740e18a8c559a2a69ab43S.png",
        "hero_h1": "DDP E-commerce Packaging",
        "industry_name": "E-commerce",
        "img1": "https://sc02.alicdn.com/kf/A7726b5a7f5284293a41ab9be8a8112c7n.png",
        "label1_h3": "White Tear-Strip Box", "label1_p": "Easy-Open | Self-Adhesive",
        "img2": "https://sc02.alicdn.com/kf/Ac763efc2d5344cab993c5a0960ca4ec4n.png",
        "label2_h3": "Custom Interior Print", "label2_p": "Kraft Mailer | Premium Branding",
        "img3": "https://sc02.alicdn.com/kf/Ae1409852c5dd468bae697953457aa407S.png",
        "label3_h3": "Luxury Subscription Box", "label3_p": "Matte Black | Gold Accents",
        "img4": "https://sc02.alicdn.com/kf/A91ee96afe3a8442ea2358c25edd073f01.png",
        "label4_h3": "Easy-Open Mailer", "label4_p": "Printed Corrugated | Secure Seal"
    },
    {
        "files": ["luxury-gift-boxes-with-logo.html", "packaging-for-gift-shops.html"],
        "title": "Luxury Gift Store Packaging Solutions",
        "description": "Custom luxury gift boxes with logo for boutique gift shops. Ribbon-tied boxes and premium shopping bags.",
        "hero_img": "https://sc02.alicdn.com/kf/Af666b4bc10a1495192bfe59cdbaa459co.png",
        "hero_h1": "Luxury Gift Shop Solutions",
        "industry_name": "Gift Shop",
        "img1": "https://sc02.alicdn.com/kf/A2caa7df891fe491ebb23a66a5645996fE.png",
        "label1_h3": "Boutique Bag Set", "label1_p": "Gold Accents | Ribbon Handle",
        "img2": "https://sc02.alicdn.com/kf/A7a2cd99d74c141aa962768b6705f88der.png",
        "label2_h3": "Magnetic Gift Box", "label2_p": "Collapsible | Luxury Texture",
        "img3": "https://sc02.alicdn.com/kf/A4b594c7726cd4b398ef4f8adcd1ace31A.png",
        "label3_h3": "Ribbon-Tied Box", "label3_p": "Elegant Bow | Soft Touch",
        "img4": "https://sc02.alicdn.com/kf/A93a7b8d72b4041c0afb2e49ebf0009a9B.png",
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
