import urllib.request
import json

key = "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"
url = "https://openrouter.ai/api/v1/models"

try:
    print("Fetching models...")
    req = urllib.request.Request(url, headers={"Authorization": f"Bearer {key}", "User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as response:
        if response.status == 200:
            data = response.read()
            with open("models_full.json", "wb") as f:
                f.write(data)
            print("Saved models_full.json")
            
            # Print specifically valid Gemini models to stdout for quick check
            j = json.loads(data)
            print("\nSUGGESTED MODELS:")
            for m in j.get("data", []):
                mid = m.get("id", "")
                if "gemini" in mid.lower() and ":free" in mid:
                    print(mid)
        else:
            print(f"Error: {response.status}")
            
except Exception as e:
    print(f"Exception: {e}")
