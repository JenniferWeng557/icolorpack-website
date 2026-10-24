import json
import sys

# Extract HTML from browser_console output JSON
try:
    with open(sys.argv[1], 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # The output is prefixed with "[Result]\n"
    html = data['output']
    if html.startswith("[Result]\n"):
        html = html[len("[Result]\n"):]
    
    with open(sys.argv[2], 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Successfully saved to {sys.argv[2]}")
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
