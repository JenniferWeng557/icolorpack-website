import os

def check_files():
    corrupted = []
    for root, dirs, files in os.walk('.'):
        for f in files:
            if f.endswith('.html'):
                path = os.path.join(root, f)
                with open(path, 'r', encoding='utf-8', errors='ignore') as file:
                    content = file.read()
                    if content.count('</html>') > 1:
                        corrupted.append(path)
    return corrupted

if __name__ == "__main__":
    corrupted = check_files()
    if corrupted:
        print("Corrupted files found:")
        for c in corrupted:
            print(c)
    else:
        print("No corrupted files found.")
