import requests
import json

key = "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"

try:
    print(f"Testing Key: {key[:15]}...")
    resp = requests.get(
        "https://openrouter.ai/api/v1/auth/key",
        headers={"Authorization": f"Bearer {key}"}
    )
    
    print(f"Status Code: {resp.status_code}")
    print(f"Response: {resp.text}")
    
    if resp.status_code == 200:
        print("SUCCESS: Key is valid!")
    else:
        print("FAILURE: Key rejected.")
        
except Exception as e:
    print(f"Error: {e}")
