import os
import re

new_modal = """  <!-- MODAL INQUIRY -->
  <div id="inquiryModal" class="modal">
    <div class="modal-content">
      <span class="close-modal" >&times;</span>
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
          Free sample available · Reply within 2 hours
        </div>
      </div>
      <div class="modal-inner">
        <form name="iColorPacks Website" class="luxo-form" action="https://formspree.io/f/mkoeljdw" method="POST">
          <input type="hidden" name="_subject" value="New Inquiry from iColorPacks Website">
          <input type="hidden" name="_next" value="https://www.icolorpacks.com/thank-you">
          
          <div class="luxo-group">
            <label>Full Name *</label>
            <input type="text" name="name" placeholder="Enter your name" required>
          </div>
          <div class="luxo-group">
            <label>Email or WhatsApp *</label>
            <input type="text" name="contact" placeholder="Email or Phone (+1...)" required>
          </div>
          
          <div class="luxo-group">
            <label>Estimated Quantity *</label>
            <select name="quantity" required>
              <option value="">Select Quantity...</option>
              <option value="100-300">100 - 300 PCS</option>
              <option value="300-500">300 - 500 PCS</option>
              <option value="500-1000">500 - 1000 PCS</option>
              <option value="1000-3000">1000 - 3000 PCS</option>
              <option value="3000+">3000+ PCS</option>
            </select>
          </div>

          <div class="luxo-group">
            <label>Product Interest</label>
            <select name="product">
              <option value="Not Specified">Select box type...</option>
              <option value="Rigid Gift Box">Rigid Gift Box</option>
              <option value="Cake / Bakery Box">Cake / Bakery Box</option>
              <option value="Luxury Paper Bag">Luxury Paper Bag</option>
              <option value="Mailer Box">Mailer Box</option>
              <option value="Kraft Bag">Kraft Paper Bag</option>
            </select>
          </div>
          
          <div class="luxo-group full">
            <label>Project Details (Size, Color, Branding)</label>
            <textarea name="details" placeholder="Tell us about your project..." rows="3" style="width: 100%; background: var(--input-bg); border: 1px solid var(--border); border-radius: 8px; padding: 15px; color: #FFF; font-family: inherit; font-size: 14px;"></textarea>
          </div>
          
          <div class="luxo-group full">
            <label>Upload Logo / Reference (Optional)</label>
            <div class="luxo-file-upload" onclick="document.getElementById('file-upload').click()">
              <svg viewBox="0 0 24 24"><path d="M16.5,6V17.5A4,4 0 0,1 12.5,21.5A4,4 0 0,1 8.5,17.5V5A2.5,2.5 0 0,1 11,2.5A2.5,2.5 0 0,1 13.5,5V15.5A1,1 0 0,1 12.5,16.5A1,1 0 0,1 11.5,15.5V6H10V15.5A2.5,2.5 0 0,0 12.5,18A2.5,2.5 0 0,0 15,15.5V5A4,4 0 0,0 11,1A4,4 0 0,0 7,5V17.5A5.5,5.5 0 0,0 12.5,23A5.5,5.5 0 0,0 18,17.5V6H16.5Z" /></svg>
              <p>Click to upload PNG, AI, PDF · Max 10MB</p>
              <span id="file-name">No file selected</span>
              <input type="file" id="file-upload" name="attachment" class="hidden-file-input" onchange="updateFileName(this)">
            </div>
          </div>

          <button type="submit" class="btn-luxo-submit">Get My Free Quote</button>
        </form>
      </div>
    </div>
  </div>"""

modal_re = re.compile(r'<!-- MODAL INQUIRY -->.*?<div id="inquiryModal" class="modal">.*?</div>\s*</div>\s*</div>', re.DOTALL)
# Fallback for when comments are missing or slightly different
modal_re_alt = re.compile(r'<div id="inquiryModal" class="modal">.*?</div>\s*</div>\s*</div>', re.DOTALL)

def update_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = modal_re.sub(new_modal, content)
    if new_content == content:
        new_content = modal_re_alt.sub(new_modal, content)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated: {filepath}")

for root, dirs, files in os.walk('.'):
    if 'node_modules' in dirs:
        dirs.remove('node_modules')
    if '.git' in dirs:
        dirs.remove('.git')
    for file in files:
        if file.endswith('.html'):
            update_file(os.path.join(root, file))
