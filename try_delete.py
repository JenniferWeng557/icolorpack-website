import urllib.request
import json

url = "https://liuxsukuieruhqwljdle.supabase.co/rest/v1"
service_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpdXhzdWt1aWVydWhxd2xqZGxlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDk3NzQ3OCwiZXhwIjoyMDk2NTUzNDc4fQ.5Lv6G30sIjL3mMt8vVWRNRXEmeSDnqx1HsCy6muyIqQ"

headers = {
    "apikey": service_key,
    "Authorization": f"Bearer {service_key}",
    "Content-Type": "application/json"
}

# Delete dad91ac3-effb-4058-8789-2ab3a0b72d61
cid = "dad91ac3-effb-4058-8789-2ab3a0b72d61"
req = urllib.request.Request(f"{url}/customers?id=eq.{cid}", headers=headers, method="DELETE")

try:
    with urllib.request.urlopen(req) as resp:
        print("Delete response status:", resp.getcode())
        print("Deleted Customer 2 successfully via service_role!")
except urllib.error.HTTPError as e:
    print("Delete failed with status:", e.code)
    print("Error body:", e.read().decode('utf-8'))
except Exception as e:
    print("Error:", e)
