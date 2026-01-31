import requests
import json
import os

key = "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"

try:
    print("Fetching models...")
    response = requests.get(
        "https://openrouter.ai/api/v1/models",
        headers={"Authorization": f"Bearer {key}"}
    )
    
    if response.status_code == 200:
        data = response.json()
        models = data.get("data", [])
        print(f"Found {len(models)} models.")
        
        # Search for gemini or free models
        print("\n--- GEMINI MODELS ---")
        for m in models:
            mid = m.get("id", "")
            if "gemini" in mid.lower():
                print(mid)

        print("\n--- FREE MODELS (sample) ---")
        for m in models:
            mid = m.get("id", "")
            price = m.get("pricing", {})
            # simplistic check, often '0' or low
            if ":free" in mid:
                print(mid)
    else:
        print(f"Error: {response.status_code} - {response.text}")

except Exception as e:
    print(f"Exception: {e}")
