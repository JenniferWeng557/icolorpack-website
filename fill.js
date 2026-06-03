(async () => {
  const content = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>iColorPack — Custom Gift Boxes & Luxury Packaging Wholesale Factory</title>
  <link rel="icon" type="image/png" href="https://sc02.alicdn.com/kf/Ac883bba6ae6a4f9dbf52bb335d605e8fj.png">
  <meta name="description" content="Direct from Wenzhou's leading factory. iColorPack provides custom gift boxes, luxury shopping bags, and premium rigid packaging wholesale. OEM/ODM services for global brands.">
  <meta name="keywords" content="custom gift boxes, luxury gift packaging, rigid boxes wholesale, magnetic gift boxes, premium cardboard boxes, custom paper bags, luxury shopping bags, boutique gift bags, packaging box manufacturer China, Wenzhou packaging factory">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap" rel="stylesheet">
  <style>
    :root {
      --gold: #C9A84C;
      --gold-light: #E8C97A;
      --champagne: #DBC48E;
      --dark-bg: #0A0A0F;
      --card-bg: #12121A;
      --white: #FFFFFF;
      --text-muted: #8A8A9A;
      --border: rgba(255, 255, 255, 0.05);
      --input-bg: #1A1A24;
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { font-family: 'Inter', sans-serif; background: var(--dark-bg); color: var(--white); line-height: 1.6; }
    
    h1, h2, h3, h4 { font-family: 'Montserrat', sans-serif; letter-spacing: 2px; text-transform: uppercase; }
    em { font-family: 'Playfair Display', serif; text-transform: none; letter-spacing: 0; }

    /* NAVIGATION */
    nav {
      position: fixed; top: 0; width: 100%; z-index: 1000;
      padding: 25px 8%; display: flex; align-items: center; justify-content: space-between;
      transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      background: rgba(10, 10, 15, 0.2); backdrop-filter: blur(15px);
      border-bottom: 1px solid rgba(255,255,255,0.03);
    }
    nav.scrolled { padding: 15px 8%; background: rgba(10, 10, 15, 0.95); }
    .logo { font-size: 20px; font-weight: 700; text-decoration: none; color: var(--white); letter-spacing: 3px; display: flex; align-items: center; }
    .nav-links { display: flex; gap: 40px; list-style: none; }
    .nav-links a { text-decoration: none; color: var(--text-muted); font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; transition: 0.3s; }
    .nav-links a:hover { color: var(--gold); }
    .btn-quote-nav { 
      border: 1px solid var(--gold); color: var(--gold); padding: 8px 18px; 
      font-size: 10px; font-weight: 700; transition: 0.3s; text-decoration: none; 
      letter-spacing: 2px; display: inline-block; cursor: pointer;
    }
    .btn-quote-nav:hover { background: var(--gold); color: var(--dark-bg); }

    /* HERO */
    .hero {
      height: 100vh; background: url('https://sc02.alicdn.com/kf/A067a678b20f74de693ec3fb9b35d7cfe1.png') center/cover no-repeat;
      display: flex; align-items: center; justify-content: flex-start; padding: 0 12%; position: relative;
    }
    .hero::before { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(10, 10, 15, 0.9) 0%, rgba(10, 10, 15, 0.4) 100%); z-index: 0; }
    .hero-content { position: relative; z-index: 1; max-width: 800px; padding: 0 40px; }
    .hero-content h1 { font-size: 56px; line-height: 1.25; margin-bottom: 30px; font-weight: 300; letter-spacing: 0.5px; }
    .hero-content h1 b { font-weight: 700; display: block; margin-top: 8px; letter-spacing: 1.5px; text-transform: uppercase; }
    .hero-content p { font-size: 16px; color: var(--text-muted); margin-bottom: 40px; max-width: 500px; letter-spacing: 0.5px; }
    .btn-primary { background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%); color: var(--dark-bg); padding: 18px 45px; text-decoration: none; font-weight: 700; font-size: 12px; letter-spacing: 2px; box-shadow: 0 10px 30px rgba(201,168,76,0.2); transition: 0.3s; cursor: pointer; border: none; }
    .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 15px 40px rgba(201,168,76,0.3); }

    /* STATS BAR */
    .stats-bar { background: #050508; padding: 60px 10%; border-bottom: 1px solid rgba(255,255,255,0.02); }
    .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px 20px; text-align: center; max-width: 1400px; margin: 0 auto; }
    .stat-item { position: relative; }
    .stat-item::after { content: ''; position: absolute; right: -10px; top: 20%; height: 60%; width: 1px; background: rgba(201, 168, 76, 0.1); }
    .stat-item:nth-child(3n)::after { display: none; }
    .stat-item h2 { color: var(--gold); font-size: 32px; font-weight: 300; margin-bottom: 5px; letter-spacing: 1px; }
    .stat-item p { font-size: 10px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 3px; font-weight: 500; }

    /* SECTIONS */
    section { padding: 80px 10%; max-width: 1600px; margin: 0 auto; }
    .section-label { color: var(--gold); font-size: 11px; font-weight: 700; letter-spacing: 5px; display: block; margin-bottom: 20px; text-transform: uppercase; }
    .section-title { font-size: 38px; margin-bottom: 50px; font-weight: 400; line-height: 1.2; letter-spacing: 1px; }

    /* BRAND STORY */
    .story-container { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
    .story-image img { width: 100%; height: 500px; object-fit: cover; border: 1px solid rgba(255,255,255,0.05); }

    /* PRODUCT GRID */
    .product-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }
    .product-card { position: relative; overflow: hidden; background: var(--card-bg); border: 1px solid rgba(255,255,255,0.03); padding-bottom: 30px; transition: 0.5s cubic-bezier(0.4, 0, 0.2, 1); display: flex; flex-direction: column; }
    .product-img-container { position: relative; height: 320px; overflow: hidden; background: #07070a; margin-bottom: 25px; flex-shrink: 0; }
    .product-img-container img { width: 100%; height: 100%; object-fit: contain; transition: 0.8s cubic-bezier(0.4, 0, 0.2, 1); padding: 30px; }
    .product-img-container img.scene-img { position: absolute; top: 0; left: 0; opacity: 0; object-fit: cover; padding: 0; transform: scale(1.1); }
    .product-card:hover { transform: translateY(-10px); border-color: var(--gold); }
    .product-card:hover .main-img { opacity: 0; transform: scale(0.9); }
    .product-card:hover .scene-img { opacity: 1; transform: scale(1); }
    .product-info { padding: 0 30px; text-align: center; }
    .product-info h3 { font-size: 18px; margin-bottom: 12px; color: var(--white); }
    .product-info p { font-size: 13px; color: var(--text-muted); margin-bottom: 25px; line-height: 1.5; }
    .product-cta { font-size: 11px; font-weight: 700; color: var(--gold); text-decoration: none; border-bottom: 1px solid var(--gold); padding-bottom: 4px; transition: 0.3s; cursor: pointer; }

    /* REVIEWS 3x2 Grid */
    .reviews { background: #050508; padding: 60px 10%; }
    .reviews-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width: 1400px; margin: 0 auto; }
    .review-card { background: #0d0d14; border: 1px solid rgba(255,255,255,0.02); padding: 30px; min-height: 280px; display: flex; flex-direction: column; justify-content: space-between; }
    .stars { color: var(--gold); margin-bottom: 15px; font-size: 10px; letter-spacing: 2px; }
    .reviewer-meta { display: flex; align-items: center; gap: 15px; }
    .reviewer-img { width: 42px; height: 42px; border-radius: 50%; border: 1px solid var(--gold); padding: 2px; }
    .reviewer-info h4 { font-size: 12px; color: var(--white); margin-bottom: 2px; }
    .reviewer-info p { font-size: 10px; color: var(--text-muted); }

    /* FAQ */
    .faq { background: #07070a; padding: 60px 10%; border-top: 1px solid rgba(255,255,255,0.02); }
    .faq-container { max-width: 900px; margin: 0 auto; }
    .faq-item { border-bottom: 1px solid rgba(255,255,255,0.05); padding: 20px 0; }
    .faq-item summary { list-style: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; color: var(--white); font-size: 16px; font-weight: 500; }
    .faq-item summary::after { content: '+'; color: var(--gold); font-size: 20px; }
    .faq-item details[open] summary::after { content: '−'; }
    .faq-content { padding-top: 15px; color: var(--text-muted); font-size: 14px; line-height: 1.6; }

    /* FOOTER */
    footer { padding: 80px 10% 40px; background: #050508; border-top: 1px solid rgba(255,255,255,0.03); }
    .footer-grid { display: grid; grid-template-columns: 1.5fr repeat(2, 1fr); gap: 60px; max-width: 1400px; margin: 0 auto; }
    .footer-col h4 { color: var(--gold); font-size: 12px; margin-bottom: 30px; text-transform: uppercase; letter-spacing: 2px; }
    .footer-links { list-style: none; }
    .footer-links li { margin-bottom: 15px; display: flex; align-items: center; gap: 12px; }
    .footer-links a { color: var(--text-muted); text-decoration: none; font-size: 13px; transition: 0.3s; }
    .footer-links a:hover { color: var(--gold); }
    .footer-icon { color: var(--gold); font-size: 16px; width: 20px; text-align: center; }
    .copyright { text-align: center; margin-top: 60px; font-size: 11px; color: #444; border-top: 1px solid rgba(255,255,255,0.02); padding-top: 30px; }

    /* MODAL */
    .modal {
      display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.95);
      z-index: 3000; align-items: center; justify-content: center; padding: 20px;
      backdrop-filter: blur(10px);
    }
    .modal.active { display: flex; }
    .modal-content {
      background: #0d0d14; width: 100%; max-width: 850px; max-height: 90vh;
      overflow-y: auto; border: 1px solid var(--border); border-radius: 12px; 
      padding: 0; position: relative;
    }
    .modal-inner { padding: 40px 50px; }
    .close-modal { position: absolute; top: 20px; right: 25px; color: var(--text-muted); font-size: 30px; cursor: pointer; z-index: 10; }
    
    .consultant-bar { 
      background: rgba(255,255,255,0.03); padding: 20px 50px; 
      display: flex; align-items: center; justify-content: space-between;
      border-bottom: 1px solid var(--border);
    }
    .consultant-info-mini { display: flex; align-items: center; gap: 15px; }
    .consultant-avatar-mini { 
      width: 50px; height: 50px; border-radius: 50%; 
      background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%);
      display: flex; align-items: center; justify-content: center; font-weight: 700; color: #000;
    }
    .consultant-text h4 { font-size: 14px; color: var(--white); margin-bottom: 2px; }
    .consultant-text p { font-size: 11px; color: var(--text-muted); }
    .online-status { display: flex; align-items: center; gap: 8px; font-size: 11px; color: #25D366; }
    .status-dot { width: 8px; height: 8px; background: #25D366; border-radius: 50%; box-shadow: 0 0 10px #25D366; }

    .inquiry-section-title { 
      font-size: 12px; color: var(--text-muted); text-transform: uppercase; 
      letter-spacing: 2px; margin: 30px 0 20px; display: flex; align-items: center; gap: 10px;
    }
    .inquiry-section-title span { color: var(--gold); }
    
    .luxo-form { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .luxo-group { display: flex; flex-direction: column; gap: 8px; }
    .luxo-group.full { grid-column: span 2; }
    .luxo-group label { font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; }
    .luxo-group input, .luxo-group select, .luxo-group textarea {
      background: var(--input-bg); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px;
      padding: 15px; color: var(--white); font-family: inherit; font-size: 14px;
      outline: none; transition: 0.3s;
    }
    .luxo-group input:focus, .luxo-group select:focus, .luxo-group textarea:focus { border-color: var(--gold); background: #1f1f2b; }
    
    .request-types { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; grid-column: span 2; margin-top: 10px; }
    .type-option { 
      background: var(--input-bg); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px;
      padding: 15px; cursor: pointer; display: flex; align-items: center; gap: 12px; transition: 0.3s;
    }
    .type-option:hover { border-color: var(--gold); }
    .type-option input { display: none; }
    .type-option .radio-circle { width: 18px; height: 18px; border: 2px solid var(--text-muted); border-radius: 50%; position: relative; }
    .type-option input:checked + .radio-circle { border-color: var(--gold); }
    .type-option input:checked + .radio-circle::after { content: ''; position: absolute; inset: 3px; background: var(--gold); border-radius: 50%; }
    .type-option span { font-size: 12px; font-weight: 600; color: var(--white); }

    .btn-luxo-submit {
      grid-column: span 2; background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%);
      color: var(--dark-bg); padding: 20px; border: none; border-radius: 8px;
      font-weight: 800; font-size: 14px; letter-spacing: 2px; text-transform: uppercase;
      cursor: pointer; transition: 0.3s; margin-top: 20px; box-shadow: 0 10px 30px rgba(201,168,76,0.2);
    }
    .btn-luxo-submit:hover { transform: translateY(-2px); box-shadow: 0 15px 40px rgba(201,168,76,0.3); }

    /* WIDGETS */
    .floating-whatsapp {
      position: fixed; bottom: 40px; left: 40px; z-index: 2000;
      width: 55px; height: 55px; background: #25D366; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 10px 25px rgba(37, 211, 102, 0.3); transition: 0.3s ease;
    }
    .floating-whatsapp:hover { transform: scale(1.1); }

    /* FLOATING QUOTE BUTTON */
    .floating-quote-container {
      position: fixed; bottom: 40px; right: 40px; z-index: 2000;
      display: flex; align-items: center; flex-direction: row-reverse;
      cursor: pointer;
    }
    .floating-quote {
      width: 55px; height: 55px; 
      background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%);
      border-radius: 50%; display: flex; align-items: center; justify-content: center;
      box-shadow: 0 10px 25px rgba(201, 168, 76, 0.3);
      transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .floating-quote svg { width: 28px; height: 28px; fill: var(--dark-bg); }
    .quote-tooltip {
      position: absolute; right: 70px; background: var(--white); color: var(--dark-bg);
      padding: 10px 20px; border-radius: 30px; font-size: 13px; font-weight: 700;
      white-space: nowrap; opacity: 0; transform: translateX(20px);
      pointer-events: none; transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 10px 20px rgba(0,0,0,0.4);
    }
    .floating-quote-container:hover .quote-tooltip { opacity: 1; transform: translateX(0); }
    .floating-quote-container:hover .floating-quote { transform: scale(1.1) rotate(90deg); }

    @media (max-width: 1100px) {
      .product-grid, .reviews-grid { grid-template-columns: repeat(2, 1fr); }
      .story-container, .footer-grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 768px) {
      .product-grid, .reviews-grid { grid-template-columns: 1fr; }
      .hero-content h1 { font-size: 38px; }
      .nav-links { display: none; }
      .luxo-form, .request-types { grid-template-columns: 1fr; }
      .luxo-group.full, .btn-luxo-submit { grid-column: span 1; }
      .consultant-bar { padding: 20px; }
      .modal-inner { padding: 30px 20px; }
    }
    /* WIDGETS */
    .floating-whatsapp {
      position: fixed; bottom: 40px; left: 40px; z-index: 2000;
      width: 55px; height: 55px; background: #25D366; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 10px 25px rgba(37, 211, 102, 0.3); transition: 0.3s ease;
    }
    .floating-whatsapp:hover { transform: scale(1.1); }

    .floating-quote-container {
      position: fixed; bottom: 40px; right: 40px; z-index: 2000;
      display: flex; align-items: center; flex-direction: row-reverse;
      cursor: pointer;
      text-decoration: none;
    }
    .floating-quote {
      width: 55px; height: 55px; 
      background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%);
      border-radius: 50%; display: flex; align-items: center; justify-content: center;
      box-shadow: 0 10px 25px rgba(201, 168, 76, 0.3);
      transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .floating-quote svg { width: 28px; height: 28px; fill: var(--dark-bg); }
    .quote-tooltip {
      position: absolute; right: 70px; background: var(--white); color: var(--dark-bg);
      padding: 10px 20px; border-radius: 30px; font-size: 13px; font-weight: 700;
      white-space: nowrap; opacity: 0; transform: translateX(20px);
      pointer-events: none; transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 10px 20px rgba(0,0,0,0.4);
    }
    .floating-quote-container:hover .quote-tooltip { opacity: 1; transform: translateX(0); }
    .floating-quote-container:hover .floating-quote { transform: scale(1.1) rotate(90deg); }
  </style>
</head>
<body>

  <nav id="navbar">
    <a href="#" class="logo">
      <img src="https://sc02.alicdn.com/kf/Ac883bba6ae6a4f9dbf52bb335d605e8fj.png" alt="iColorPack Logo" style="height: 45px; width: auto; vertical-align: middle;">
      <span style="vertical-align: middle; margin-left: 10px;">iColorPack</span>
    </a>
    <ul class="nav-links">
      <li><a href="#products">Collection</a></li>
      <li><a href="#story">Story</a></li>
      <li><a href="blog.html">Blog</a></li>
      <li><a href="#reviews">Reviews</a></li>
      <li><a href="https://wa.me/8618058355198?text=Hello%20iColorPack%2C%20I%20just%20viewed%20your%20premium%20packaging%20collection%20and%20would%20like%20to%20discuss%20a%20custom%20project.%20Can%20we%20chat%3F">Contact</a></li>
    </ul>
    <a href="https://wa.me/8618058355198?text=Hello%20iColorPack%2C%20I%20just%20viewed%20your%20premium%20packaging%20collection%20and%20would%20like%20to%20discuss%20a%20custom%20project.%20Can%20we%20chat%3F" target="_blank" class="btn-quote-nav">Inquiry</a>
  </nav>

  <!-- HERO -->
  <section class="hero">
    <div class="hero-content">
      <span class="section-label">Luxury Packaging Manufacturer & Wholesale Factory</span>
      <h1>Premium Custom Gift Boxes<b>& Branded Shopping Bags.</b></h1>
      <p>Direct-factory sourcing of high-end rigid boxes and eco-friendly carrier bags. iColorPack: Your Wenzhou partner for premium B2B packaging solutions.</p>
      <div class="hero-btns">
        <a href="https://wa.me/8618058355198?text=Hello%20iColorPack%2C%20I%20just%20viewed%20your%20premium%20packaging%20collection%20and%20would%20like%20to%20discuss%20a%20custom%20project.%20Can%20we%20chat%3F" target="_blank" class="btn-primary" style="display:inline-block; text-align:center;">Get Custom Quote</a>
      </div>
    </div>
  </section>

  <!-- STATS BAR -->
  <div class="stats-bar">
    <div class="stats-grid">
      <div class="stat-item"><h2>15+ Years</h2><p>Manufacturing Legacy</p></div>
      <div class="stat-item"><h2>2,000+</h2><p>Strategic Brand Partners</p></div>
      <div class="stat-item"><h2>100 Units</h2><p>Agile Small-Batch MOQ</p></div>
      <div class="stat-item"><h2>15 Days</h2><p>Rapid Production Cycle</p></div>
      <div class="stat-item"><h2>50M+</h2><p>Annual Packaging Output</p></div>
      <div class="stat-item"><h2>50+ Nations</h2><p>Global Delivery Footprint</p></div>
    </div>
  </div>

  <!-- BRAND STORY -->
  <section id="story" class="brand-story">
    <div class="story-container">
      <div class="story-content">
        <span class="section-label">Luxury Rigid Box Factory</span>
        <h2 class="section-title">A Legacy of <em>High-End Packaging.</em></h2>
        <p>Wenzhou iColorPack Co., Ltd. is a leading packaging box manufacturer in China with over 15 years of expertise. Based in Wenzhou's industrial hub, we specialize in luxury rigid gift boxes and premium custom paper bags.</p>
        <p>Our commitment to "Packaging that Colors Your Life" drives our OEM/ODM services, merging traditional craftsmanship with modern innovation for brands worldwide.</p>
      </div>
      <div class="story-image">
        <img src="https://sc02.alicdn.com/kf/A35342ae8624b428aae4ec271ab601bd2V.png" alt="iColorPack Luxury Packaging Collection - Custom Gift Boxes and Branded Bags">
      </div>
    </div>
  </section>

  <!-- PRODUCTS (3x2 Grid) -->
  <section id="products">
    <span class="section-label">Custom Collection</span>
    <h2 class="section-title">Wholesale <em>Gift Packaging</em> Solutions.</h2>
    <div class="product-grid">
      <!-- 1. Rigid Gift Boxes -->
      <div class="product-card">
        <div class="product-img-container">
          <img src="https://sc02.alicdn.com/kf/A84e494555ed746a3b3a3294089547cbdT.png" class="main-img" alt="Custom Rigid Gift Boxes Wholesale" loading="lazy">
          <img src="https://sc02.alicdn.com/kf/Aeb34aad7e0b247f7bb262ca8275cad39k.png" class="scene-img" alt="Magnetic Gift Box Display in Boutique" loading="lazy">
        </div>
        <div class="product-info">
          <h3>Custom Rigid Boxes</h3>
          <p>Hand-crafted luxury magnetic gift boxes with gold foil and premium textured finishes.</p>
          <a href="https://wa.me/8618058355198?text=Hello%20iColorPack%2C%20I%20just%20viewed%20your%20premium%20packaging%20collection%20and%20would%20like%20to%20discuss%20a%20custom%20project.%20Can%20we%20chat%3F" target="_blank" class="product-cta">Customize Deal →</a>
        </div>
      </div>
      <!-- 2. Cake Boxes -->
      <div class="product-card">
        <div class="product-img-container">
          <img src="https://sc02.alicdn.com/kf/Ab80f893ebc174dd18d97c620dce1b7502.png" class="main-img" alt="Custom Bakery Packaging & Cake Boxes Wholesale" loading="lazy">
          <img src="https://sc02.alicdn.com/kf/Ab38c886d05bc45b68aa0117b6798bde2G.png" class="scene-img" alt="Premium Cake Box Presentation in Patisserie" loading="lazy">
        </div>
        <div class="product-info">
          <h3>Bakery & Cake Boxes</h3>
          <p>Elegant and sturdy custom bakery boxes for premium confectionery and artisan cakes.</p>
          <a href="https://wa.me/8618058355198?text=Hello%20iColorPack%2C%20I%20just%20viewed%20your%20premium%20packaging%20collection%20and%20would%20like%20to%20discuss%20a%20custom%20project.%20Can%20we%20chat%3F" target="_blank" class="product-cta">Customize Deal →</a>
        </div>
      </div>
      <!-- 3. Cardboard Bags -->
      <div class="product-card">
        <div class="product-img-container">
          <img src="https://sc02.alicdn.com/kf/A75adbb5f71cf499fa1953190bacd3e4dv.png" class="main-img" alt="Luxury Cardboard Shopping Bags with Logo" loading="lazy">
          <img src="https://sc02.alicdn.com/kf/Ad55f95c0e2154ba09ff130ffbc184a8dm.png" class="scene-img" alt="Boutique Shopping Bag at Fashion Checkout" loading="lazy">
        </div>
        <div class="product-info">
          <h3>Boutique Cardboard Bags</h3>
          <p>Premium ivory board carrier bags for high-end retail, available in custom sizes and finishes.</p>
          <a href="https://wa.me/8618058355198?text=Hello%20iColorPack%2C%20I%20just%20viewed%20your%20premium%20packaging%20collection%20and%20would%20like%20to%20discuss%20a%20custom%20project.%20Can%20we%20chat%3F" target="_blank" class="product-cta">Customize Deal →</a>
        </div>
      </div>
      <!-- 4. Kraft Paper Bags -->
      <div class="product-card">
        <div class="product-img-container">
          <img src="https://sc02.alicdn.com/kf/A21f00885566b4d36be8e474585c575d2n.png" class="main-img" alt="Custom Kraft Paper Bags with Twisted Handles" loading="lazy">
          <img src="https://sc02.alicdn.com/kf/Ad978f85f1c4e4056a233636592003c401.png" class="scene-img" alt="Eco-friendly Packaging in Sustainable Store" loading="lazy">
        </div>
        <div class="product-info">
          <h3>Sustainable Kraft Bags</h3>
          <p>Eco-friendly kraft paper solutions with twisted or flat handles for conscious brands.</p>
          <a href="https://wa.me/8618058355198?text=Hello%20iColorPack%2C%20I%20just%20viewed%20your%20premium%20packaging%20collection%20and%20would%20like%20to%20discuss%20a%20custom%20project.%20Can%20we%20chat%3F" target="_blank" class="product-cta">Customize Deal →</a>
        </div>
      </div>
      <!-- 5. Mailer Boxes -->
      <div class="product-card">
        <div class="product-img-container">
          <img src="https://sc02.alicdn.com/kf/Aa6549925e5104a37bd7d1a58ba582eb7t.png" class="main-img" alt="Custom Corrugated Mailer Boxes for E-commerce" loading="lazy">
          <img src="https://sc02.alicdn.com/kf/A6f98f683109a4785981775f0a05a0ce8c.png" class="scene-img" alt="E-commerce Unboxing Experience with Branded Mailer" loading="lazy">
        </div>
        <div class="product-info">
          <h3>Branded Mailer Boxes</h3>
          <p>Durable corrugated shipping solutions designed for a premium e-commerce unboxing experience.</p>
          <a href="https://wa.me/8618058355198?text=Hello%20iColorPack%2C%20I%20just%20viewed%20your%20premium%20packaging%20collection%20and%20would%20like%20to%20discuss%20a%20custom%20project.%20Can%20we%20chat%3F" target="_blank" class="product-cta">Customize Deal →</a>
        </div>
      </div>
      <!-- 6. Custom Packaging -->
      <div class="product-card">
        <div class="product-img-container">
          <img src="https://sc02.alicdn.com/kf/A600e129e160e4708817478027732d847F.png" class="main-img" alt="Full Range Custom Packaging Solutions" loading="lazy">
          <img src="https://sc02.alicdn.com/kf/A72a7288bc92c42d38eb52924151767677.png" class="scene-img" alt="Packaging Design Concept Workshop" loading="lazy">
        </div>
        <div class="product-info">
          <h3>Bespoke Solutions</h3>
          <p>Unique shapes, sizes, and innovative materials tailored to your specific product needs.</p>
          <a href="https://wa.me/8618058355198?text=Hello%20iColorPack%2C%20I%20just%20viewed%20your%20premium%20packaging%20collection%20and%20would%20like%20to%20discuss%20a%20custom%20project.%20Can%20we%20chat%3F" target="_blank" class="product-cta">Customize Deal →</a>
        </div>
      </div>
    </div>
  </section>

  <!-- REVIEWS (3x2 Grid) -->
  <section id="reviews" class="reviews">
    <span class="section-label">Global Trust</span>
    <h2 class="section-title">Verified <em>Client</em> Feedback.</h2>
    <div class="reviews-grid">
      <!-- 1 -->
      <div class="review-card">
        <div class="stars">★★★★★</div>
        <p>"Exceptional quality on our magnetic boxes. The gold foil is crisp and the structure is solid. Jennifer's team handled our OEM requirements perfectly."</p>
        <div class="reviewer-meta">
          <div class="reviewer-img" style="background: #222;"></div>
          <div class="reviewer-info"><h4>Marcus L.</h4><p>Luxury Watch Brand, UK</p></div>
        </div>
      </div>
      <!-- 2 -->
      <div class="review-card">
        <div class="stars">★★★★★</div>
        <p>"Best wholesale partner in Wenzhou. Their cake boxes are food-safe and beautifully designed. Our customers love the unboxing experience."</p>
        <div class="reviewer-meta">
          <div class="reviewer-img" style="background: #222;"></div>
          <div class="reviewer-info"><h4>Sophie R.</h4><p>Artisan Bakery Chain, France</p></div>
        </div>
      </div>
      <!-- 3 -->
      <div class="review-card">
        <div class="stars">★★★★★</div>
        <p>"We switched to iColorPack for our boutique shopping bags. The paper quality is superior and the delivery to New York was ahead of schedule."</p>
        <div class="reviewer-meta">
          <div class="reviewer-img" style="background: #222;"></div>
          <div class="reviewer-info"><h4>David K.</h4><p>Fashion House, USA</p></div>
        </div>
      </div>
      <!-- 4 -->
      <div class="review-card">
        <div class="stars">★★★★★</div>
        <p>"Low MOQ options helped our startup test premium packaging. Professional communication and very helpful design advice."</p>
        <div class="reviewer-meta">
          <div class="reviewer-img" style="background: #222;"></div>
          <div class="reviewer-info"><h4>Elena M.</h4><p>Cosmetics Startup, Italy</p></div>
        </div>
      </div>
      <!-- 5 -->
      <div class="review-card">
        <div class="stars">★★★★★</div>
        <p>"The corrugated mailers are incredibly durable. Zero damage reports since we started using iColorPack's shipping boxes."</p>
        <div class="reviewer-meta">
          <div class="reviewer-img" style="background: #222;"></div>
          <div class="reviewer-info"><h4>James T.</h4><p>E-commerce Director, Australia</p></div>
        </div>
      </div>
      <!-- 6 -->
      <div class="review-card">
        <div class="stars">★★★★★</div>
        <p>"High-end finish at a competitive wholesale price. Their factory capacity is impressive and quality control is top-notch."</p>
        <div class="reviewer-meta">
          <div class="reviewer-img" style="background: #222;"></div>
          <div class="reviewer-info"><h4>Lina W.</h4><p>Procurement Manager, Germany</p></div>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ Section -->
  <section class="faq">
    <span class="section-label">Common Inquiries</span>
    <h2 class="section-title">Wholesale <em>FAQ.</em></h2>
    <div class="faq-container">
      <div class="faq-item">
        <details>
          <summary>What is your Minimum Order Quantity (MOQ)?</summary>
          <div class="faq-content">Our standard MOQ starts at 500 units for custom rigid boxes and 1,000 units for paper bags. However, we offer agile small-batch options starting at 100 units for specific styles to help brands scale.</div>
        </details>
      </div>
      <div class="faq-item">
        <details>
          <summary>Can I get a physical sample before bulk production?</summary>
          <div class="faq-content">Yes. We provide digital 3D mockups within 24 hours. Physical pre-production samples typically take 3-5 days. Sample costs are often refundable upon bulk order confirmation.</div>
        </details>
      </div>
      <div class="faq-item">
        <details>
          <summary>Do you offer global shipping?</summary>
          <div class="faq-content">We deliver to over 50 countries. We offer various shipping methods including Express (Air), Sea Freight (DDP/CIF/FOB), and Railway options to balance cost and speed.</div>
        </details>
      </div>
      <div class="faq-item">
        <details>
          <summary>Are your packaging materials sustainable?</summary>
          <div class="faq-content">We prioritize eco-friendly solutions, including FSC-certified papers, recycled cardboard, and biodegradable coatings. We can provide certification documentation upon request.</div>
        </details>
      </div>
    </div>
  </section>

  <section id="contact-info" style="text-align: center; border-top: 1px solid rgba(255,255,255,0.03);">
    <h2 class="section-title">Start Your <em>Wholesale</em> Journey.</h2>
    <p style="color: var(--text-muted); margin-bottom: 40px;">Expert consultants are ready to bring your brand vision to life.</p>
    <a href="https://wa.me/8618058355198?text=Hello%20iColorPack%2C%20I%20just%20viewed%20your%20premium%20packaging%20collection%20and%20would%20like%20to%20discuss%20a%20custom%20project.%20Can%20we%20chat%3F" target="_blank" class="btn-primary" style="display:inline-block; text-align:center;">Request Pricing & Mockup</a>
  </section>

  <footer>
    <div class="footer-grid">
      <div class="footer-col">
        <h4 style="color: var(--white); font-size: 16px;">iColorPack</h4>
        <p style="color: var(--text-muted); font-size: 13px; margin-bottom: 25px; line-height: 1.6;">Your premium partner for custom gift boxes and luxury paper bags. Direct from Wenzhou's industrial heart to your doorstep.</p>
        <div style="display: flex; gap: 15px;">
          <a href="#" class="footer-icon">FB</a>
          <a href="#" class="footer-icon">IG</a>
          <a href="#" class="footer-icon">LI</a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Product Range</h4>
        <ul class="footer-links">
          <li><a href="#">Rigid Gift Boxes</a></li>
          <li><a href="#">Custom Cake Boxes</a></li>
          <li><a href="#">Boutique Paper Bags</a></li>
          <li><a href="#">Corrugated Mailers</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact Experts</h4>
        <ul class="footer-links">
          <li><span class="footer-icon">📍</span> <a href="#">Wenzhou, Zhejiang, China</a></li>
          <li><span class="footer-icon">📧</span> <a href="mailto:sales@icolorpacks.com">sales@icolorpacks.com</a></li>
          <li><span class="footer-icon">💬</span> <a href="https://wa.me/8618058355198?text=Hello%20iColorPack%2C%20I%20just%20viewed%20your%20premium%20packaging%20collection%20and%20would%20like%20to%20discuss%20a%20custom%20project.%20Can%20we%20chat%3F">+86 180 5835 5198</a></li>
          <li><span class="footer-icon">🕒</span> <a href="#">Mon-Sat: 9AM - 9PM (CST)</a></li>
        </ul>
      </div>
    </div>
    <div class="copyright">
      &copy; 2026 iColorPack Packaging Co., Ltd. All Rights Reserved. | <a href="/sitemap.xml" style="color: #444; text-decoration: none;">Sitemap</a>
    </div>
  </footer>

  <!-- WHATSAPP WIDGET -->
  <a href="https://wa.me/8618058355198?text=Hello%20iColorPack%2C%20I%20just%20viewed%20your%20premium%20packaging%20collection%20and%20would%20like%20to%20discuss%20a%20custom%20project.%20Can%20we%20chat%3F" class="floating-whatsapp" target="_blank">
    <svg viewBox="0 0 32 32" style="width: 32px; height: 32px; fill: white;"><path d="M16 0c-8.837 0-16 7.163-16 16 0 2.825.737 5.48 2.032 7.787l-2.032 7.413 7.585-1.99c2.21 1.22 4.745 1.923 7.415 1.923 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29.333c-2.35 0-4.577-.617-6.525-1.698l-.468-.26-4.475 1.175 1.2-4.38-.288-.458c-1.185-1.89-1.812-4.095-1.812-6.378 0-6.617 5.383-12 12-12s12 5.383 12 12-5.383 12-12 12zM22.587 18.96c-.36-.18-2.127-1.047-2.457-1.167s-.57-.18-.81.18c-.24.36-.927 1.167-1.137 1.407s-.42.27-.78.09c-.36-.18-1.52-.56-2.893-1.787-1.067-.953-1.787-2.13-1.997-2.49s-.023-.557.157-.733c.163-.16.36-.42.54-.63s.24-.36.36-.6.06-.45-.03-.63c-.09-.18-.81-1.95-1.11-2.67-.293-.703-.593-.607-.81-.62-.21-.013-.45-.013-.69-.013s-.63.09-.96.45c-.33.36-1.26 1.23-1.26 3s1.29 3.48 1.47 3.72c.18.24 2.537 3.873 6.147 5.43.857.37 1.527.59 2.05.757.86.273 1.643.233 2.26.143.69-.103 2.127-.87 2.427-1.71.3-.84.3-1.56.21-1.71s-.33-.24-.69-.42z"/></svg>
  </a>

  <!-- FLOATING QUOTE BUTTON -->
  <a href="https://wa.me/8618058355198?text=Hello%20iColorPack%2C%20I%20just%20viewed%20your%20premium%20packaging%20collection%20and%20would%20like%20to%20discuss%20a%20custom%20project.%20Can%20we%20chat%3F" target="_blank" class="floating-quote-container">
    <div class="quote-tooltip">Create Your Own Package Now!</div>
    <div class="floating-quote">
      <svg viewBox="0 0 24 24"><path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>
    </div>
  </a>

  <!-- MODAL INQUIRY -->
  <div id="inquiryModal" class="modal">
    <div class="modal-content">
      <span class="close-modal" onclick="toggleModal()">&times;</span>
      <div class="consultant-bar">
        <div class="consultant-info-mini">
          <div class="consultant-avatar-mini">J</div>
          <div class="consultant-text">
            <h4>Jennifer</h4>
            <p>Packaging Solution Expert</p>
          </div>
        </div>
        <div class="online-status">
          <div class="status-dot"></div>
          Online Now · 2000+ Cases Solved
        </div>
      </div>
      <div class="modal-inner">
        <form class="luxo-form" action="https://formspree.io/f/mkoeljdw" method="POST">
          <div class="inquiry-section-title"><span>①</span> Contact Information</div>
          <div class="luxo-group"><label>Your Name *</label><input type="text" name="name" placeholder="John Smith" required></div>
          <div class="luxo-group"><label>Company Name</label><input type="text" name="company" placeholder="Your Brand / Company"></div>
          <div class="luxo-group"><label>Email Address *</label><input type="email" name="email" placeholder="john@company.com" required></div>
          <div class="luxo-group"><label>WhatsApp / Phone</label><input type="text" name="whatsapp" placeholder="+1 234 567 8900"></div>
          <div class="luxo-group"><label>Target Market / Country</label><select name="market"><option value="">Where do you sell?</option><option value="USA">USA / North America</option><option value="Europe">Europe</option><option value="UK">United Kingdom</option><option value="Australia">Australia</option><option value="Other">Other Global Markets</option></select></div>
          <div class="luxo-group"><label>Do you have existing design files?</label><select name="has_design"><option value="No">No, I need design support</option><option value="Yes">Yes, ready for print</option><option value="Draft">Just a rough concept</option></select></div>
          <div class="inquiry-section-title"><span>②</span> Product Requirements</div>
          <div class="luxo-group"><label>Product Category</label><select name="product"><option value="Rigid Gift Box">Rigid Gift Box</option><option value="Cake Box">Cake Box</option><option value="Cardboard Bag">Cardboard Bag</option><option value="Kraft Bag">Kraft Paper Bag</option><option value="Mailer Box">Mailer Box</option><option value="Custom">Custom Solution</option></select></div>
          <div class="luxo-group"><label>Est. Quantity</label><input type="number" name="quantity" placeholder="Min. 100 units"></div>
          <div class="luxo-group full"><label>What do you need today? *</label><div class="request-types"><label class="type-option"><input type="radio" name="request_type" value="Quote + Mockup" checked><div class="radio-circle"></div><span>Price Quote + Free 3D Mockup (24h)</span></label><label class="type-option"><input type="radio" name="request_type" value="Physical Sample"><div class="radio-circle"></div><span>48h Physical Sample (Express)</span></label></div></div>
          <button type="submit" class="btn-luxo-submit">Get a Free Quote</button>
        </form>
      </div>
    </div>
  </div>

  <script>
    function trackInquiry(category) {
      console.log('Inquiry initiated for:', category);
      // Example: window.gtag('event', 'inquiry_click', { 'product_category': category });
    }

    function toggleModal() { 
      const modal = document.getElementById('inquiryModal');
      modal.classList.toggle('active');
    }
    window.onclick = function(event) { 
      const modal = document.getElementById('inquiryModal');
      if (event.target == modal) toggleModal(); 
    }
    window.onscroll = function() { 
      const nav = document.getElementById('navbar');
      if (window.scrollY > 50) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
  </script>
</body>
</html>`;
  
  const editor = document.querySelector('div.cm-content');
  if (editor) {
    // CodeMirror 6 way to set content:
    // This is tricky without the view object.
    // However, for GitHub, we can try to find the hidden textarea and set its value,
    // then dispatch an input event.
    const textarea = document.querySelector('textarea.react-code-text-area');
    if (textarea) {
      textarea.value = content;
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      textarea.dispatchEvent(new Event('change', { bubbles: true }));
      return "Success via textarea";
    }
    
    // Fallback: use execCommand (deprecated but might work for simple contenteditable)
    editor.focus();
    document.execCommand('selectAll', false, null);
    document.execCommand('delete', false, null);
    document.execCommand('insertText', false, content);
    return "Success via insertText";
  }
  return "Editor not found";
})()