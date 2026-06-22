
import os

pages = [
    {"url": "custom-rigid-gift-boxes-wholesale", "title": "Custom Rigid Gift Boxes Wholesale Manufacturer in China | iColorPack", "keyword": "custom rigid gift boxes wholesale", "category": "Rigid Box"},
    {"url": "custom-magnetic-gift-boxes", "title": "Custom Magnetic Gift Boxes Manufacturer in China | iColorPack", "keyword": "custom magnetic gift boxes", "category": "Rigid Box"},
    {"url": "custom-drawer-gift-boxes", "title": "Custom Drawer Gift Boxes Wholesale Manufacturer | iColorPack", "keyword": "custom drawer gift boxes", "category": "Rigid Box"},
    {"url": "custom-lid-and-base-gift-boxes", "title": "Custom Lid and Base Gift Boxes Manufacturer | iColorPack", "keyword": "custom lid and base gift boxes", "category": "Rigid Box"},
    {"url": "luxury-gift-boxes-with-logo", "title": "Luxury Gift Boxes with Logo Wholesale | iColorPack", "keyword": "luxury gift boxes with logo", "category": "Rigid Box"},
    {"url": "custom-paper-bags-with-logo", "title": "Custom Paper Bags with Logo Manufacturer in China | iColorPack", "keyword": "custom paper bags with logo", "category": "Paper Bag"},
    {"url": "custom-luxury-shopping-bags", "title": "Custom Luxury Shopping Bags Wholesale Manufacturer | iColorPack", "keyword": "custom luxury shopping bags", "category": "Paper Bag"},
    {"url": "custom-kraft-paper-bags", "title": "Custom Kraft Paper Bags with Logo Wholesale | iColorPack", "keyword": "custom kraft paper bags", "category": "Kraft Bag"},
    {"url": "custom-bakery-boxes", "title": "Custom Bakery Boxes Wholesale Manufacturer | iColorPack", "keyword": "custom bakery boxes wholesale", "category": "Bakery Box"},
    {"url": "custom-cake-boxes-wholesale", "title": "Custom Cake Boxes Wholesale Manufacturer in China | iColorPack", "keyword": "custom cake boxes wholesale", "category": "Cake Box"},
    {"url": "custom-cupcake-boxes", "title": "Custom Cupcake Boxes Wholesale with Logo | iColorPack", "keyword": "custom cupcake boxes", "category": "Bakery Box"},
    {"url": "custom-mailer-boxes", "title": "Custom Mailer Boxes Manufacturer in China | iColorPack", "keyword": "custom mailer boxes", "category": "Mailer Box"},
    {"url": "custom-corrugated-mailer-boxes", "title": "Custom Corrugated Mailer Boxes Wholesale | iColorPack", "keyword": "custom corrugated mailer boxes", "category": "Mailer Box"},
    {"url": "custom-packaging-for-cosmetics", "title": "Custom Packaging for Cosmetics Brands | iColorPack", "keyword": "custom packaging for cosmetics", "category": "Cosmetic Packaging"},
    {"url": "custom-packaging-for-jewelry", "title": "Custom Packaging for Jewelry Brands | iColorPack", "keyword": "custom packaging for jewelry", "category": "Jewelry Packaging"},
    {"url": "custom-packaging-for-perfume", "title": "Custom Packaging for Perfume Brands | iColorPack", "keyword": "custom packaging for perfume", "category": "Perfume Packaging"},
    {"url": "custom-packaging-for-clothing-brands", "title": "Custom Packaging for Clothing Brands | iColorPack", "keyword": "custom packaging for clothing brands", "category": "Apparel Packaging"},
    {"url": "low-moq-custom-packaging-china", "title": "Low MOQ Custom Packaging Manufacturer in China | iColorPack", "keyword": "low MOQ custom packaging China", "category": "Custom Packaging"},
    {"url": "custom-packaging-manufacturer-china", "title": "Custom Packaging Manufacturer in China | iColorPack", "keyword": "custom packaging manufacturer China", "category": "Custom Packaging"},
    {"url": "ddp-custom-packaging-supplier-china", "title": "DDP Custom Packaging Supplier from China | iColorPack", "keyword": "DDP custom packaging supplier China", "category": "Custom Packaging"},
]

template = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <meta name="description" content="Order {keyword} from iColorPack, a China packaging manufacturer. Low MOQ, custom size, logo printing, free dieline support, fast sampling and global DDP shipping.">
    <meta name="keywords" content="{keyword}, custom packaging China, wholesale gift boxes, luxury packaging manufacturer">
    <link rel="canonical" href="https://www.icolorpacks.com/{url}.html" />
    <link rel="icon" type="image/png" href="images/Ac883bba6ae6a4f9dbf52bb335d605e8fj.webp">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap" rel="stylesheet">
    
    <style>
        :root {{
            --gold: #C9A84C; --gold-light: #E8C97A; --dark-bg: #0A0A0F; --card-bg: #12121A; --white: #FFFFFF; --text-muted: #8A8A9A;
            --border: rgba(255, 255, 255, 0.05); --input-bg: #1A1A24;
        }}
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        body {{ font-family: 'Inter', sans-serif; background: var(--dark-bg); color: var(--white); line-height: 1.8; }}
        
        /* NAVIGATION */
        nav {{
            position: fixed; top: 0; width: 100%; z-index: 1000;
            padding: 20px 8%; display: flex; align-items: center; justify-content: space-between;
            background: rgba(10, 10, 15, 0.95); backdrop-filter: blur(15px);
            border-bottom: 1px solid rgba(255,255,255,0.03);
        }}
        .logo {{ font-size: 20px; font-weight: 700; text-decoration: none; color: var(--white); letter-spacing: 3px; font-family: 'Montserrat', sans-serif; }}
        .nav-links {{ display: flex; gap: 40px; list-style: none; }}
        .nav-links a {{ text-decoration: none; color: var(--text-muted); font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; transition: 0.3s; }}
        .nav-links a:hover {{ color: var(--gold); }}
        .btn-quote-nav {{ 
            border: 1px solid var(--gold); color: var(--gold); padding: 8px 18px; 
            font-size: 10px; font-weight: 700; transition: 0.3s; text-decoration: none; 
            letter-spacing: 2px; display: inline-block; cursor: pointer;
        }}

        /* HERO */
        .hero {{
            height: 70vh; background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('images/A067a678b20f74de693ec3fb9b35d7cfe1.webp') center/cover no-repeat;
            display: flex; align-items: center; justify-content: center; text-align: center; padding: 0 10%; margin-top: 60px;
        }}
        .hero-content h1 {{ font-family: 'Montserrat', sans-serif; font-size: 48px; letter-spacing: 2px; margin-bottom: 20px; color: var(--white); }}
        .hero-content p {{ font-size: 18px; color: var(--gold); margin-bottom: 30px; font-weight: 500; letter-spacing: 1px; }}
        .btn-primary {{ background: var(--gold); color: var(--dark-bg); padding: 15px 40px; text-decoration: none; font-weight: 700; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; transition: 0.3s; }}

        /* SECTIONS */
        section {{ padding: 80px 10%; max-width: 1200px; margin: 0 auto; }}
        h2 {{ font-family: 'Montserrat', sans-serif; font-size: 32px; margin-bottom: 40px; color: var(--gold); text-align: center; letter-spacing: 1px; }}
        p {{ margin-bottom: 20px; color: #ccc; }}
        
        .specs-table {{ width: 100%; border-collapse: collapse; margin-bottom: 40px; border: 1px solid var(--border); }}
        .specs-table th, .specs-table td {{ padding: 15px; text-align: left; border: 1px solid var(--border); }}
        .specs-table th {{ background: rgba(201, 168, 76, 0.1); color: var(--gold); width: 30%; }}

        .features-grid {{ display: grid; grid-template-columns: repeat(2, 1fr); gap: 40px; }}
        .feature-item {{ background: var(--card-bg); padding: 30px; border: 1px solid var(--border); }}
        .feature-item h3 {{ color: var(--gold); margin-bottom: 15px; font-family: 'Montserrat', sans-serif; }}

        .faq-item {{ margin-bottom: 20px; border-bottom: 1px solid var(--border); padding-bottom: 20px; }}
        .faq-item h3 {{ font-size: 18px; color: var(--white); margin-bottom: 10px; cursor: pointer; }}
        .faq-item p {{ color: var(--text-muted); font-size: 15px; }}

        .case-study {{ background: #050508; padding: 40px; border: 1px solid var(--gold); border-radius: 8px; }}
        .case-study h3 {{ color: var(--gold); margin-bottom: 20px; }}

        footer {{ padding: 60px 8%; background: #050508; border-top: 1px solid var(--border); text-align: center; }}
        footer .logo {{ margin-bottom: 20px; display: block; }}
        footer p {{ font-size: 12px; color: var(--text-muted); }}

        /* Form styling from product-rigid-boxes.html */
        .luxo-form {{ display: grid; grid-template-columns: 1fr 1fr; gap: 20px; background: var(--card-bg); padding: 40px; border-radius: 12px; border: 1px solid var(--border); }}
        .luxo-group {{ display: flex; flex-direction: column; gap: 8px; }}
        .luxo-group.full {{ grid-column: span 2; }}
        .luxo-group label {{ font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; }}
        .luxo-group input, .luxo-group select, .luxo-group textarea {{
            background: #15151e; border: 1px solid rgba(255,255,255,0.05); border-radius: 8px;
            padding: 15px; color: var(--white); font-family: inherit; font-size: 14px; outline: none; transition: 0.3s;
        }}
        .btn-luxo-submit {{
            grid-column: span 2; padding: 20px; background: var(--gold); color: var(--dark-bg);
            border: none; border-radius: 8px; font-size: 14px; font-weight: 700; text-transform: uppercase;
            letter-spacing: 2px; cursor: pointer; transition: 0.3s; margin-top: 10px;
        }}
        
        @media (max-width: 768px) {{ .features-grid {{ grid-template-columns: 1fr; }} .luxo-form {{ grid-template-columns: 1fr; }} .luxo-group.full {{ grid-column: span 1; }} }}
    </style>
    
    <script type="application/ld+json">
    {{
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "{keyword}",
        "description": "Premium {keyword} by iColorPack. Fully customizable dimensions, printing, and finishing for luxury brands.",
        "brand": {{
            "@type": "Brand",
            "name": "iColorPack"
        }},
        "offers": {{
            "@type": "AggregateOffer",
            "priceCurrency": "USD",
            "lowPrice": "0.10",
            "highPrice": "5.00"
        }}
    }}
    </script>
</head>
<body>
    <nav>
        <a href="index.html" class="logo">iColorPack</a>
        <ul class="nav-links">
            <li><a href="index.html#products">Collection</a></li>
            <li><a href="product-rigid-boxes.html">Rigid Boxes</a></li>
            <li><a href="product-paper-bags.html">Paper Bags</a></li>
            <li><a href="product-cake-boxes.html">Cake Boxes</a></li>
            <li><a href="product-mailer-boxes.html">Mailer Boxes</a></li>
            <li><a href="blog.html">Blog</a></li>
        </ul>
        <a href="https://wa.me/8618058355198" class="btn-quote-nav">Inquiry</a>
    </nav>

    <header class="hero">
        <div class="hero-content">
            <h1>{title}</h1>
            <p>Direct Factory Prices | Low MOQ | Free Design Support | DDP Shipping</p>
            <a href="#inquiry" class="btn-primary">Get a Factory Quote</a>
        </div>
    </header>

    <section id="overview">
        <h2>Expert {keyword} Solutions</h2>
        <div style="max-width: 800px; margin: 0 auto;">
            <p>Welcome to iColorPack, your premier partner for <strong>{keyword}</strong>. With over 15 years of experience in the luxury packaging industry, we specialize in creating bespoke packaging solutions that not only protect your products but also elevate your brand identity. Our state-of-the-art manufacturing facility in Wenzhou, China, is equipped with the latest technology to ensure the highest quality standards for every order.</p>
            <p>Whether you are a startup looking for <strong>low MOQ custom packaging</strong> or an established brand requiring high-volume wholesale production, iColorPack offers the flexibility and expertise to meet your specific needs. Our {keyword} are designed with sustainability and elegance in mind, using premium materials and innovative finishing techniques.</p>
        </div>
    </section>

    <section id="specifications">
        <h2>Product Parameters</h2>
        <table class="specs-table">
            <tr><th>Material Options</th><td>{materials}</td></tr>
            <tr><th>Thickness</th><td>{thickness}</td></tr>
            <tr><th>Printing Techniques</th><td>CMYK Offset, Pantone, Soy Ink, Spot UV</td></tr>
            <tr><th>Surface Finishes</th><td>Matte/Gloss Lamination, Soft Touch, Foil Stamping, Embossing</td></tr>
            <tr><th>Dimensions</th><td>Fully Customized to Your Product Requirements</td></tr>
            <tr><th>MOQ</th><td>100 - 500 units (Depending on complexity)</td></tr>
            <tr><th>Sample Lead Time</th><td>3 - 5 Business Days</td></tr>
            <tr><th>Mass Production</th><td>12 - 18 Business Days</td></tr>
            <tr><th>Shipping Options</th><td>Sea, Air, Express, DDP (Door-to-Door Duty Paid)</td></tr>
        </table>
    </section>

    <section id="features">
        <h2>Why Choose Our {keyword}?</h2>
        <div class="features-grid">
            <div class="feature-item">
                <h3>Superior Structural Integrity</h3>
                <p>Our packaging is engineered for durability. We use high-density greyboard and premium kraft papers to ensure your products remain safe during transit while providing a premium unboxing experience for your customers.</p>
            </div>
            <div class="feature-item">
                <h3>Infinite Customization</h3>
                <p>From unique shapes to specialized inserts (foam, velvet, EVA), we offer endless possibilities to make your packaging stand out. Our design team provides free dieline support to help you visualize your concept.</p>
            </div>
            <div class="feature-item">
                <h3>Eco-Friendly Materials</h3>
                <p>iColorPack is committed to sustainability. We offer FSC-certified papers, recycled materials, and soy-based inks to help your brand reduce its environmental footprint without compromising on luxury.</p>
            </div>
            <div class="feature-item">
                <h3>Global Logistics Mastery</h3>
                <p>We take the headache out of importing. Our DDP shipping services mean we handle all customs, duties, and taxes, delivering your custom packaging directly to your warehouse or Amazon FBA center.</p>
            </div>
        </div>
    </section>

    <section id="process">
        <h2>Simple 6-Step Custom Process</h2>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; text-align: center;">
            <div><h4 style="color:var(--gold);">01. Inquiry</h4><p>Send us your size, quantity, and logo ideas.</p></div>
            <div><h4 style="color:var(--gold);">02. Quote</h4><p>Receive a detailed factory-direct price in 12h.</p></div>
            <div><h4 style="color:var(--gold);">03. Design</h4><p>We provide free dielines and artwork optimization.</p></div>
            <div><h4 style="color:var(--gold);">04. Sample</h4><p>Confirm quality with a 3D mockup or physical sample.</p></div>
            <div><h4 style="color:var(--gold);">05. Bulk</h4><p>High-speed production with 100% QC inspection.</p></div>
            <div><h4 style="color:var(--gold);">06. Delivery</h4><p>Global shipping with tracking and DDP options.</p></div>
        </div>
    </section>

    <section id="case-study">
        <div class="case-study">
            <h3>Success Story: {case_title}</h3>
            <p><strong>Customer Industry:</strong> {industry}</p>
            <p><strong>Challenge:</strong> The client needed high-end packaging that reflected their luxury brand positioning while maintaining a strict budget and timeline for a seasonal launch.</p>
            <p><strong>Solution:</strong> iColorPack developed a custom <strong>{keyword}</strong> using 1200g greyboard wrapped in specialty textured paper with gold foil accents. We optimized the structure to reduce shipping volume, saving 15% on logistics costs.</p>
            <p><strong>Result:</strong> "The packaging exceeded our expectations. The attention to detail in the foil stamping and the sturdy construction helped us achieve a 20% increase in perceived value." - <em>Luxury Brand Manager</em></p>
        </div>
    </section>

    <section id="faq">
        <h2>Frequently Asked Questions</h2>
        <div class="faq-item">
            <h3>1. What is the MOQ for {keyword}?</h3>
            <p>Our standard MOQ for custom orders is typically 500 pieces. However, for certain structures and startups, we can support orders starting at 100 units to help you grow your brand.</p>
        </div>
        <div class="faq-item">
            <h3>2. Can I get a sample before bulk production?</h3>
            <p>Absolutely. We offer two types of samples: a digital 3D mockup (free) and a physical pre-production sample. Physical samples usually take 3-5 days to produce.</p>
        </div>
        <div class="faq-item">
            <h3>3. Do you offer DDP shipping to the USA/UK/Europe?</h3>
            <p>Yes, we specialize in DDP (Delivered Duty Paid) shipping. This means we handle all shipping, customs clearance, and import duties. The price we quote is the final price to your door.</p>
        </div>
        <div class="faq-item">
            <h3>4. What file formats do you need for my logo?</h3>
            <p>For the best printing results, we require vector files such as AI, PDF, or EPS. High-resolution PSD or PNG files (300 DPI) may also work depending on the design.</p>
        </div>
        <div class="faq-item">
            <h3>5. How do I ensure the color is correct?</h3>
            <p>We use the Pantone Matching System (PMS) to ensure color accuracy. If you have a specific brand color, please provide the Pantone code, and we will match it precisely.</p>
        </div>
        <div class="faq-item">
            <h3>6. Can you help with the design if I only have a logo?</h3>
            <p>Yes! Our in-house design team can help you place your logo, choose colors, and suggest finishing touches to make your {keyword} truly unique.</p>
        </div>
    </section>

    <section id="inquiry">
        <h2>Request a Custom Quote</h2>
        <form class="luxo-form" action="https://formspree.io/f/mkoeljdw" method="POST">
            <div class="luxo-group"><label>Name *</label><input type="text" name="name" required></div>
            <div class="luxo-group"><label>Email *</label><input type="email" name="email" required></div>
            <div class="luxo-group"><label>Product Type</label><input type="text" name="product" value="{keyword}" readonly></div>
            <div class="luxo-group"><label>Quantity</label><input type="number" name="quantity" placeholder="e.g., 500"></div>
            <div class="luxo-group full"><label>Message / Requirements</label><textarea name="message" rows="5" placeholder="Size, color, finish, and any other details..."></textarea></div>
            <button type="submit" class="btn-luxo-submit">Get My Factory Quote</button>
        </form>
    </section>

    <section id="internal-links" style="border-top: 1px solid var(--border); padding-top: 40px; text-align: center;">
        <h3 style="color:var(--gold); margin-bottom: 20px;">Explore More Solutions</h3>
        <p>
            <a href="index.html" style="color:var(--white); margin: 0 15px;">Home</a> | 
            <a href="product-rigid-boxes.html" style="color:var(--white); margin: 0 15px;">Luxury Rigid Boxes</a> | 
            <a href="product-paper-bags.html" style="color:var(--white); margin: 0 15px;">Premium Paper Bags</a> | 
            <a href="product-cake-boxes.html" style="color:var(--white); margin: 0 15px;">Custom Cake Boxes</a> | 
            <a href="product-mailer-boxes.html" style="color:var(--white); margin: 0 15px;">E-commerce Mailers</a>
        </p>
        <p style="margin-top: 15px;">
            <a href="blog.html" style="color:var(--gold); margin: 0 15px;">Packaging Trends 2026</a> | 
            <a href="blog.html" style="color:var(--gold); margin: 0 15px;">Sustainable Material Guide</a> | 
            <a href="index.html#solutions" style="color:var(--gold); margin: 0 15px;">Cosmetic Solutions</a> | 
            <a href="index.html#solutions" style="color:var(--gold); margin: 0 15px;">Jewelry Packaging</a>
        </p>
    </section>

    <footer>
        <a href="index.html" class="logo">iColorPack</a>
        <p>&copy; 2026 iColorPack Packaging Solutions. All Rights Reserved.</p>
        <p>Address: Wenzhou, Zhejiang, China | WhatsApp: +86-18058355198</p>
    </footer>

    <script type="application/ld+json">
    {{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {{
                "@type": "Question",
                "name": "What is the MOQ for {keyword}?",
                "acceptedAnswer": {{
                    "@type": "Answer",
                    "text": "Our standard MOQ for custom orders is typically 500 pieces. However, for certain structures and startups, we can support orders starting at 100 units."
                }}
            }},
            {{
                "@type": "Question",
                "name": "Do you offer DDP shipping?",
                "acceptedAnswer": {{
                    "@type": "Answer",
                    "text": "Yes, we offer DDP (Delivered Duty Paid) shipping to the USA, UK, and Europe, handling all customs and duties for a hassle-free delivery."
                }}
            }}
        ]
    }}
    </script>
</body>
</html>"""

# Content Generation Helpers
def get_materials(category):
    if "Rigid" in category or "Packaging" in category:
        return "1200g/1500g Greyboard + Art Paper, Kraft Paper, or Specialty Paper"
    elif "Paper Bag" in category or "Kraft Bag" in category:
        return "250g - 350g Ivory Board, Brown/White Kraft Paper, Art Paper"
    elif "Box" in category:
        return "350g - 400g Ivory Board, Corrugated Board, Kraft Paper"
    return "Premium Paperboard, Kraft Paper, Corrugated Board"

def get_thickness(category):
    if "Rigid" in category:
        return "2.0mm - 3.0mm Rigid Board"
    elif "Paper Bag" in category:
        return "0.3mm - 0.5mm"
    return "Customizable from 250gsm to 1500gsm"

def get_case(category):
    cases = {
        "Rigid Box": ("Bespoke Magnetic Jewelry Box", "High-end Jewelry"),
        "Paper Bag": ("Luxury Fashion Shopping Bags", "Apparel Retail"),
        "Bakery Box": ("Custom Branding Macaron Boxes", "Gourmet Bakery"),
        "Cake Box": ("Wedding Cake Carrier Sets", "Events & Catering"),
        "Mailer Box": ("E-commerce Subscription Boxes", "Beauty & Wellness"),
        "Cosmetic Packaging": ("Premium Skincare Serum Box", "Cosmetics"),
        "Jewelry Packaging": ("Minimalist Earring Sliding Box", "Jewelry"),
        "Perfume Packaging": ("Embossed Perfume Collection Box", "Fragrance"),
        "Apparel Packaging": ("Sustainable Clothing Gift Boxes", "Fashion"),
        "Custom Packaging": ("Integrated Brand Packaging Suite", "Multi-industry")
    }
    return cases.get(category, ("Custom Brand Packaging Solution", "Retail & E-commerce"))

# Generate Pages
for p in pages:
    filename = p["url"] + ".html"
    materials = get_materials(p["category"])
    thickness = get_thickness(p["category"])
    case_title, industry = get_case(p["category"])
    
    # Adding more content to reach 1200-1800 words
    # I will inject a large block of text about manufacturing and quality
    long_content = f"""
    <section id="manufacturing-excellence">
        <h2>Manufacturing Excellence & Quality Control</h2>
        <div style="column-count: 2; column-gap: 40px;">
            <p>At iColorPack, our manufacturing process for <strong>{p['keyword']}</strong> is a blend of traditional craftsmanship and modern automation. Every piece of packaging starts with the careful selection of raw materials. We source our paper from FSC-certified forests, ensuring that your luxury packaging is as sustainable as it is beautiful. Our greyboard is selected for its stiffness and smoothness, providing the perfect base for high-end wraps.</p>
            <p>Our printing department utilizes Heidelberg 5-color offset presses, which deliver unmatched color precision and consistency. Whether you require a simple minimalist logo or a complex full-color pattern, our technicians ensure that every detail is crisp. We also offer specialty inks, including metallic Pantones and eco-friendly soy-based inks, to give your <strong>{p['keyword']}</strong> a unique edge in the market.</p>
            <p>Quality control is integrated into every stage of production. From the initial die-cutting to the final hand-gluing of rigid boxes, our QC team inspects samples at every 500 units. We check for color accuracy, lamination bonding, foil stamping alignment, and structural integrity. This rigorous process is why iColorPack is a trusted <strong>packaging manufacturer in China</strong> for global brands who cannot afford errors.</p>
            <p>In addition to quality, we focus on efficiency. Our factory's location in Wenzhou gives us access to a massive supply chain of specialty materials and high-speed logistics networks. This allows us to maintain a 12-18 day production cycle, even for large wholesale orders of <strong>{p['keyword']}</strong>. We understand that your product launch timelines are critical, and we are committed to meeting them every time.</p>
        </div>
    </section>
    
    <section id="finishing-details">
        <h2>Luxury Finishing Options for {p['keyword']}</h2>
        <p>The "finish" of your packaging is what defines the tactile experience for your customer. We offer a wide range of premium finishes to enhance your <strong>{p['keyword']}</strong>:</p>
        <ul style="list-style: none; display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
            <li><strong style="color:var(--gold);">Hot Foil Stamping:</strong> Available in Gold, Silver, Rose Gold, Holographic, and Matte colors. Perfect for making your logo "pop".</li>
            <li><strong style="color:var(--gold);">Embossing & Debossing:</strong> Create a 3D texture that customers can feel. Ideal for premium brand marks.</li>
            <li><strong style="color:var(--gold);">Spot UV & Raised UV:</strong> Add a high-gloss shine to specific areas of your design for a sophisticated contrast.</li>
            <li><strong style="color:var(--gold);">Soft Touch Lamination:</strong> Gives your packaging a velvet-like, peach-fuzz feel that exudes luxury.</li>
            <li><strong style="color:var(--gold);">Anti-Scratch Film:</strong> Essential for matte black or dark-colored packaging to prevent scuffs during handling.</li>
            <li><strong style="color:var(--gold);">Specialty Papers:</strong> Choose from linen texture, leatherette, pearlized, or glitter papers for a unique look.</li>
        </ul>
    </section>

    <section id="industry-applications">
        <h2>Industry-Specific {p['keyword']}</h2>
        <p>Our <strong>{p['keyword']}</strong> solutions are versatile and adapted for various high-growth industries:</p>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; text-align: center;">
            <div style="padding: 20px; border: 1px solid var(--border);"><strong>Beauty & Cosmetics</strong><br><small>Serum boxes, palette sets, gift sets.</small></div>
            <div style="padding: 20px; border: 1px solid var(--border);"><strong>Fashion & Apparel</strong><br><small>Luxury boutique bags, shirt boxes.</small></div>
            <div style="padding: 20px; border: 1px solid var(--border);"><strong>Jewelry & Watches</strong><br><small>Rigid velvet-lined boxes, pouch sets.</small></div>
            <div style="padding: 20px; border: 1px solid var(--border);"><strong>Gourmet Food</strong><br><small>Chocolate, macaron, and cake packaging.</small></div>
        </div>
    </section>
    """

    content = template.format(
        url=p["url"],
        title=p["title"],
        keyword=p["keyword"],
        materials=materials,
        thickness=thickness,
        case_title=case_title,
        industry=industry
    )
    
    # Injecting the long content before the FAQ section
    content = content.replace('<section id="faq">', long_content + '<section id="faq">')
    
    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)

print("Generated 20 SEO pages successfully.")
