import zipfile
import os

zip_path = r"D:\产品图片\网图\PackCRM_网页版客户管理系统.zip"
extract_path = r"C:\Users\uu\.accio\accounts\1747554937\agents\DID-F456DA-2B0D4C\project\PackCRM"

print(f"Extracting {zip_path} to {extract_path}...")
os.makedirs(extract_path, exist_ok=True)

try:
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(extract_path)
    print("Extraction completed successfully!")
    
    # List top level files/directories in extract_path
    print("\nContents of extracted directory:")
    for item in os.listdir(extract_path):
        item_path = os.path.join(extract_path, item)
        if os.path.isdir(item_path):
            print(f"  [DIR]  {item}/")
        else:
            print(f"  [FILE] {item}")
except Exception as e:
    print("Error during extraction:", e)
