import os
import re

BUTTONS_HTML = """
    <!-- FORCED FLOATING BUTTONS BY ACCIO -->
    <style>
        .floating-whatsapp { position:fixed; bottom:40px; left:40px; z-index:9999; width:55px; height:55px; background:#25D366; border-radius:50%; display:flex !important; align-items:center; justify-content:center; box-shadow:0 10px 25px rgba(201,168,76,0.3); transition: 0.3s; }
        .floating-whatsapp:hover { transform: scale(1.1); }
        .floating-quote-container { position:fixed; bottom:40px; right:40px; z-index:9999; display:flex !important; align-items:center; cursor:pointer; }
        .floating-quote { width:55px; height:55px; background: linear-gradient(135deg, #C9A84C 0%, #E8C97A 100%); border-radius:50%; display:flex !important; align-items:center; justify-content:center; box-shadow:0 10px 25px rgba(201,168,76,0.3); }
        .floating-quote:hover { transform: scale(1.1) rotate(90deg); }
    </style>
    <a href="https://wa.me/8618058355198" class="floating-whatsapp" target="_blank">
        <svg viewBox="0 0 24 24" width="32" height="32"><path fill="white" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.672 1.433 5.662 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
    </a>
    <div class="floating-quote-container" onclick="window.location.href='https://wa.me/8618058355198'">
        <div class="floating-quote">
            <svg viewBox="0 0 24 24" width="28" height="28"><path fill="black" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
        </div>
    </div>
"""

ENGLISH_FAQ = """
    <section id="faq" class="faq">
        <div class="faq-container" style="max-width: 900px; margin: 0 auto; padding: 80px 0;">
            <h2 style="text-align: center; margin-bottom: 50px; font-size: 32px; color: #FFF;">5 FAQ: 5 Common Questions About Jewelry Packaging</h2>
            <div class="faq-item" style="border-bottom: 1px solid rgba(255,255,255,0.05); padding: 25px 0;">
                <details><summary style="list-style: none; cursor: pointer; display: flex; justify-content: space-between; font-weight: 600; color: #FFF;">Q1: Why does my jewelry box have a strong odor?</summary>
                <div style="padding-top: 15px; color: #8A8A9A;">Low-quality glue is the culprit. iColorPacks uses eco-friendly water-based glue to ensure odorless packaging that protects precious metals from corrosion.</div></details>
            </div>
            <div class="faq-item" style="border-bottom: 1px solid rgba(255,255,255,0.05); padding: 25px 0;">
                <details><summary style="list-style: none; cursor: pointer; display: flex; justify-content: space-between; font-weight: 600; color: #FFF;">Q2: Will the gold foil flake or peel off?</summary>
                <div style="padding-top: 15px; color: #8A8A9A;">We use imported Kurz foil. When correctly matched with paper texture and sufficient pressure, the foil provides exceptional adhesion and a premium finish.</div></details>
            </div>
            <div class="faq-item" style="border-bottom: 1px solid rgba(255,255,255,0.05); padding: 25px 0;">
                <details><summary style="list-style: none; cursor: pointer; display: flex; justify-content: space-between; font-weight: 600; color: #FFF;">Q3: Do you offer sustainable/eco-friendly options?</summary>
                <div style="padding-top: 15px; color: #8A8A9A;">Yes. We provide FSC-certified papers, plastic-free coatings, and soy-based ink printing to meet the highest environmental standards.</div></details>
            </div>
            <div class="faq-item" style="border-bottom: 1px solid rgba(255,255,255,0.05); padding: 25px 0;">
                <details><summary style="list-style: none; cursor: pointer; display: flex; justify-content: space-between; font-weight: 600; color: #FFF;">Q4: How do you prevent jewelry from oxidizing or tarnishing during storage and transit?</summary>
                <div style="padding-top: 15px; color: #8A8A9A;">iColorPacks uses premium Acid-free specialty paper and sulfur-free adhesives. This creates a pH-neutral storage environment that prevents metal oxidation and tarnishing at the source.</div></details>
            </div>
            <div class="faq-item" style="border-bottom: 1px solid rgba(255,255,255,0.05); padding: 25px 0;">
                <details><summary style="list-style: none; cursor: pointer; display: flex; justify-content: space-between; font-weight: 600; color: #FFF;">Q5: How do you ensure delicate items like necklaces don't tangle or get damaged?</summary>
                <div style="padding-top: 15px; color: #8A8A9A;">We provide custom-engineered flocked inserts or specialized cards with secure fastening slots. This keeps jewelry immovable and tangle-free, ensuring a perfect unboxing experience even after global shipping.</div></details>
            </div>
        </div>
    </section>
"""

def fix_all_pages():
    for root, dirs, files in os.walk('.'):
        for file in files:
            if file.endswith('.html') and '_raw' not in file:
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # 1. 删除旧按钮代码 (防止重复)
                content = re.sub(r'<!-- FORCED FLOATING BUTTONS.*?-->', '', content, flags=re.DOTALL)
                content = re.sub(r'class="floating-whatsapp".*?</a>', '', content, flags=re.DOTALL)
                content = re.sub(r'class="floating-quote-container".*?</div>\s*</div>', '', content, flags=re.DOTALL)
                
                # 2. 注入新按钮
                content = content.replace('</body>', BUTTONS_HTML + '\n</body>')
                
                # 3. 针对首页，补全 FAQ
                if file == 'index.html':
                    content = re.sub(r'<section id="faq".*?</section>', ENGLISH_FAQ, content, flags=re.DOTALL | re.IGNORECASE)
                
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(content)

fix_all_pages()
print("FULL-SITE UI BUTTONS AND CONTENT FORCED RESTORATION COMPLETE.")
