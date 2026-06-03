import shutil
import os

if os.path.exists('public.zip'):
    os.remove('public.zip')

shutil.make_archive('public', 'zip', 'public')
print("Successfully created public.zip")
