import requests
import os
from dotenv import load_dotenv
import json

load_dotenv()
api_key = os.getenv("OPENROUTER_API_KEY")

if not api_key:
    print("No API Key found")
    exit()

api_key = api_key.strip().replace('"', '').replace("'", "")

try:
    response = requests.get(
        "https://openrouter.ai/api/v1/models",
        headers={"Authorization": f"Bearer {api_key}"}
    )
    
    if response.status_code == 200:
        data = response.json()
        all_ids = [m['id'] for m in data['data']]
        free_models = [mid for mid in all_ids if 'free' in mid]
        
        print("\n--- FREE MODELS FOUND ---")
        for m in free_models:
            print(m)
        print("-------------------------")
        
        if not free_models:
            print("No models with 'free' in ID found. Dumping first 5 IDs:")
            print(all_ids[:5])
            
    else:
        print(f"Error: {response.status_code} - {response.text}")
except Exception as e:
    print(f"Exception: {e}")
