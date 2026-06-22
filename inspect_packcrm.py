import os

project_path = r"C:\Users\uu\.accio\accounts\1747554937\agents\DID-F456DA-2B0D4C\project\PackCRM\packcrm"

def list_files(startpath):
    print("Tree structure:")
    for root, dirs, files in os.walk(startpath):
        # Ignore node_modules and .git
        if 'node_modules' in dirs:
            dirs.remove('node_modules')
        if '.git' in dirs:
            dirs.remove('.git')
        if '.next' in dirs:
            dirs.remove('.next')
            
        level = root.replace(startpath, '').count(os.sep)
        indent = ' ' * 4 * (level)
        print(f'{indent}[DIR] {os.path.basename(root)}/')
        subindent = ' ' * 4 * (level + 1)
        for f in files:
            print(f'{subindent}{f}')

list_files(project_path)

# Let's inspect .env.example or equivalent
env_ex_path = os.path.join(project_path, ".env.example")
if os.path.exists(env_ex_path):
    print("\n--- .env.example content ---")
    with open(env_ex_path, "r", encoding="utf-8") as f:
        print(f.read())
else:
    print("\n.env.example not found")

# Check if there is a supabase schema file
supabase_dir = os.path.join(project_path, "supabase")
if os.path.exists(supabase_dir):
    print(f"\nSupabase directory contents: {os.listdir(supabase_dir)}")
    schema_sql_path = os.path.join(supabase_dir, "schema.sql")
    if os.path.exists(schema_sql_path):
        print(f"schema.sql found! Size: {os.path.getsize(schema_sql_path)} bytes")
