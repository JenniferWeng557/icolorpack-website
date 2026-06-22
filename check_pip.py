import os
import sys

print("Python executable:", sys.executable)
print("All env vars containing proxy or http (case-insensitive):")
for k, v in os.environ.items():
    if "proxy" in k.lower() or "http" in k.lower():
        print(f"  {k} = {v}")

# Check pip.ini locations
pip_ini_paths = [
    os.path.join(os.environ.get("APPDATA", ""), "pip", "pip.ini"),
    os.path.join(os.environ.get("USERPROFILE", ""), "pip", "pip.ini"),
    os.path.join(os.environ.get("PROGRAMDATA", ""), "pip", "pip.ini"),
]

for p in pip_ini_paths:
    if os.path.exists(p):
        print(f"Found pip.ini at: {p}")
        try:
            with open(p, "r", encoding="utf-8") as f:
                print(f.read())
        except Exception as e:
            print(f"Error reading {p}: {e}")
    else:
        print(f"No pip.ini at: {p}")
