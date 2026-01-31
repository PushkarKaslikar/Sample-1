import json

try:
    with open("models_full.json", "rb") as f:
        data = json.load(f)
    
    models = data.get("data", [])
    print(f"Total models: {len(models)}")

    print("\n--- ALL GEMINI MODELS ---")
    gemini_count = 0
    for m in models:
        mid = m.get("id", "")
        if "gemini" in mid.lower():
            print(mid)
            gemini_count += 1
            
    if gemini_count == 0:
        print("No Gemini models found.")

    print("\n--- FREE MODELS (First 10) ---")
    count = 0
    for m in models:
        mid = m.get("id", "")
        if ":free" in mid:
            print(mid)
            count += 1
            if count >= 10: break

except Exception as e:
    print(f"Error: {e}")
