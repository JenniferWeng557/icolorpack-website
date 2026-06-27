import os
import re
import urllib.request
import urllib.error
from PIL import Image
from io import BytesIO
import hashlib
from concurrent.futures import ThreadPoolExecutor, as_completed
import glob

# Main folders to scan for HTML files
folders = [".", "public", "blog", "public/blog"]

html_files = []
for folder in folders:
    html_files.extend(glob.glob(os.path.join(folder, "*.html")))

# Ensure unique files and absolute paths
html_files = list(set([os.path.normpath(f) for f in html_files]))


# Ensure output directories exist
os.makedirs("images", exist_ok=True)
os.makedirs("public/images", exist_ok=True)

# Find all external image URLs matching sc01.alicdn.com, sc02.alicdn.com, or images.unsplash.com
# Now supports extensions like .png, .jpg, .jpeg, etc. by including '.' in the character class
url_pattern = re.compile(r'https?://(?:sc0[12]\.alicdn\.com/kf/[a-zA-Z0-9._-]+|images\.unsplash\.com/[a-zA-Z0-9_/%.\-?=&+]+)')

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

def get_filename_for_url(url):
    if "alicdn.com/kf/" in url:
        part = url.split("alicdn.com/kf/")[-1]
        name = os.path.splitext(part)[0]
        name = name.split("?")[0]
        return f"{name}.webp"
    elif "images.unsplash.com/" in url:
        h = hashlib.md5(url.encode('utf-8')).hexdigest()[:12]
        return f"unsplash_{h}.webp"
    else:
        h = hashlib.md5(url.encode('utf-8')).hexdigest()[:12]
        return f"img_{h}.webp"

def download_and_convert_image(url):
    filename = get_filename_for_url(url)
    local_path_root = os.path.join("images", filename)
    local_path_public = os.path.join("public/images", filename)
    
    # Check if we already have it
    if os.path.exists(local_path_root) and os.path.exists(local_path_public):
        return url, filename, "cached"
    
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=8.0) as response:
            img_data = response.read()
        
        img = Image.open(BytesIO(img_data))
        
        # Save as WebP
        if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
            img.save(local_path_root, "WEBP", quality=82, method=6)
            img.save(local_path_public, "WEBP", quality=82, method=6)
        else:
            img = img.convert("RGB")
            img.save(local_path_root, "WEBP", quality=82, method=6)
            img.save(local_path_public, "WEBP", quality=82, method=6)
        
        return url, filename, "downloaded"
    except Exception as e:
        return url, None, str(e)

# Collect all unique URLs from all files
all_urls = set()
for file_path in html_files:
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
        urls = url_pattern.findall(content)
        all_urls.update(urls)

all_urls = list(all_urls)
print(f"Found {len(all_urls)} unique external image URLs to process.")

# Process in parallel using a ThreadPoolExecutor
downloaded_mapping = {}
print("Starting parallel download and conversion...")
with ThreadPoolExecutor(max_workers=12) as executor:
    futures = {executor.submit(download_and_convert_image, url): url for url in all_urls}
    for future in as_completed(futures):
        url = futures[future]
        try:
            url, filename, status = future.result()
            if filename:
                downloaded_mapping[url] = filename
                print(f"[{status.upper()}] {url} -> {filename}")
            else:
                print(f"[FAILED] {url} - {status}")
        except Exception as e:
            print(f"[ERROR] {url} - {e}")

# Now update references in all HTML files
print("\nUpdating HTML files with local WebP references...")
for file_path in html_files:
    if not os.path.exists(file_path):
        continue
    
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    replaced_count = 0
    for url, filename in downloaded_mapping.items():
        if url in content:
            local_ref = f"images/{filename}"
            content = content.replace(url, local_ref)
            replaced_count += 1
            
    if replaced_count > 0:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated {file_path}: replaced {replaced_count} external links with local WebP")

print("\nAll done! Image formatting and compression to local WebP is fully complete!")
