import requests
import os
from dotenv import load_dotenv

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
        
        # Filter for free or low cost if needed, but let's dump all 'free' ones first
        free_models = [m['id'] for m in data['data'] if 'free' in m['id']]
        
        with open("available_models.txt", "w", encoding="utf-8") as f:
            for m in free_models:
                f.write(m + "\n")
                
        print(f"Saved {len(free_models)} free models to available_models.txt")
    else:
        print(f"Error: {response.status_code} - {response.text}")
except Exception as e:
    print(f"Exception: {e}")
