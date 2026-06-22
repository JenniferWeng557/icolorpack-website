import urllib.request
import json

url = "https://liuxsukuieruhqwljdle.supabase.co/rest/v1"
service_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpdXhzdWt1aWVydWhxd2xqZGxlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDk3NzQ3OCwiZXhwIjoyMDk2NTUzNDc4fQ.5Lv6G30sIjL3mMt8vVWRNRXEmeSDnqx1HsCy6muyIqQ"

headers = {
    "apikey": service_key,
    "Authorization": f"Bearer {service_key}"
}

# Fetch customers with name "Chishin Europe GmbH" (or "Chishin Europe GmbH ")
req = urllib.request.Request(f"{url}/customers", headers=headers)
with urllib.request.urlopen(req) as resp:
    customers = json.loads(resp.read().decode('utf-8'))

for c in customers:
    cid = c['id']
    name = c['name']
    print(f"\nCustomer: {name} ({cid})")
    
    # Check follow_ups
    f_req = urllib.request.Request(f"{url}/follow_ups?customer_id=eq.{cid}", headers=headers)
    with urllib.request.urlopen(f_req) as f_resp:
        fus = json.loads(f_resp.read().decode('utf-8'))
        print(f"  Follow-ups count: {len(fus)}")
        
    # Check orders
    o_req = urllib.request.Request(f"{url}/orders?customer_id=eq.{cid}", headers=headers)
    with urllib.request.urlopen(o_req) as o_resp:
        orders = json.loads(o_resp.read().decode('utf-8'))
        print(f"  Orders count: {len(orders)}")
