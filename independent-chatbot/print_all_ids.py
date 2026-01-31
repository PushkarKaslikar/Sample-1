import json

try:
    with open("models_full.json", "rb") as f:
        data = json.load(f)
    
    with open("all_ids.txt", "w") as f_out:
        for m in data.get("data", []):
            mid = m.get("id")
            if mid:
                f_out.write(mid + "\n")
    print("Ids written to all_ids.txt")

except Exception as e:
    print(f"Error: {e}")
