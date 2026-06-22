import urllib.request
import json

url = "https://liuxsukuieruhqwljdle.supabase.co/rest/v1/"
service_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpdXhzdWt1aWVydWhxd2xqZGxlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDk3NzQ3OCwiZXhwIjoyMDk2NTUzNDc4fQ.5Lv6G30sIjL3mMt8vVWRNRXEmeSDnqx1HsCy6muyIqQ"

headers = {
    "apikey": service_key,
    "Authorization": f"Bearer {service_key}"
}

req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode('utf-8'))
        # Let's print paths
        paths = list(data.get("paths", {}).keys())
        print("Paths available in REST API:")
        for p in paths:
            print(p)
except Exception as e:
    print("Error:", e)
