import urllib.request
import json

key = "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"
url = "https://openrouter.ai/api/v1/models"

try:
    print("Fetching models...")
    req = urllib.request.Request(url, headers={"Authorization": f"Bearer {key}", "User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as response:
        if response.status == 200:
            data = json.loads(response.read().decode())
            models = data.get("data", [])
            print(f"Found {len(models)} models.")
            
            print("\n--- GEMINI MODELS ---")
            for m in models:
                mid = m.get("id", "")
                if "gemini" in mid.lower():
                    print(mid)

            print("\n--- FREE MODELS (sample) ---")
            found_free = False
            for m in models:
                mid = m.get("id", "")
                if ":free" in mid:
                    print(mid)
                    found_free = True
            
            if not found_free:
                print("No models with ':free' suffix found.")
        else:
            print(f"Error: {response.status}")
            
except Exception as e:
    print(f"Exception: {e}")
