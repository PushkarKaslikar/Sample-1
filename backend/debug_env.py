from dotenv import load_dotenv
import os
import requests

# Force reload
load_dotenv(override=True)

key = os.getenv("OPENROUTER_API_KEY")

print("--- DEBUG REPORT ---")
if not key:
    print("KEY STATUS: MISSING")
else:
    print(f"KEY STATUS: FOUND")
    print(f"Raw Length: {len(key)}")
    print(f"First 5 chars: '{key[:5]}'")
    print(f"Last 5 chars: '{key[-5:]}'")
    
    # Check for hidden chars
    print(f"Contains quotes? {'\"' in key or '\'' in key}")
    print(f"Contains newline? {'\\n' in key or '\\r' in key}")
    
    # Sanitize like main.py
    sanitized_key = key.strip().replace('"', '').replace("'", "")
    print(f"Sanitized Length: {len(sanitized_key)}")
    
    # Direct Test
    print("\nAttempting Direct Connection to OpenRouter with this key...")
    try:
        response = requests.get(
            "https://openrouter.ai/api/v1/auth/key",
            headers={"Authorization": f"Bearer {sanitized_key}"},
            timeout=10
        )
        print(f"OpenRouter Result: {response.status_code}")
        print(f"OpenRouter Body: {response.text}")
    except Exception as e:
        print(f"Verification Failed: {e}")

print("--------------------")
