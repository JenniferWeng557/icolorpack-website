import urllib.request
import json

url = "https://liuxsukuieruhqwljdle.supabase.co/rest/v1"
service_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpdXhzdWt1aWVydWhxd2xqZGxlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDk3NzQ3OCwiZXhwIjoyMDk2NTUzNDc4fQ.5Lv6G30sIjL3mMt8vVWRNRXEmeSDnqx1HsCy6muyIqQ"

headers = {
    "apikey": service_key,
    "Authorization": f"Bearer {service_key}"
}

# Customer IDs to check
cids = ["7997f5b1-01ed-4e32-b98f-b5a13668f3a3", "dad91ac3-effb-4058-8789-2ab3a0b72d61"]

# We will check each table that could possibly reference customers
tables = ["orders", "follow_ups", "email_logs", "opportunities"]

for cid in cids:
    print(f"\nChecking references for customer: {cid}")
    for t in tables:
        # Check if table exists in REST path
        t_url = f"{url}/{t}?customer_id=eq.{cid}"
        req = urllib.request.Request(t_url, headers=headers)
        try:
            with urllib.request.urlopen(req) as resp:
                rows = json.loads(resp.read().decode('utf-8'))
                if len(rows) > 0:
                    print(f"  Table '{t}' has {len(rows)} rows referencing this customer.")
        except Exception as e:
            # Table might not exist or column might not exist
            pass
