import json

try:
    with open("models_full.json", "rb") as f:
        data = json.load(f)
    
    models = data.get("data", [])
    print(f"Total models in list: {len(models)}")

    print("\n--- AVAILABLE FREE MODELS ---")
    free_models = []
    for m in models:
        mid = m.get("id", "")
        if ":free" in mid:
            free_models.append(mid)
            
    # Sort for readability
    free_models.sort()
    
    for fm in free_models:
        print(fm)

    if not free_models:
        print("CRITICAL: No free models found in the list!")

except Exception as e:
    print(f"Error: {e}")
