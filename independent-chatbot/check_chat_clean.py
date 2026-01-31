import urllib.request
import json
import sys

key = "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"
url = "https://openrouter.ai/api/v1/chat/completions"

data = {
    "model": "meta-llama/llama-3.1-405b-instruct:free",
    "messages": [{"role": "user", "content": "Hello via Python"}]
}

headers = {
    "Authorization": f"Bearer {key}",
    "Content-Type": "application/json",
    "HTTP-Referer": "http://localhost:5173",
    "X-Title": "Mech Chatbot Standalone",
    "User-Agent": "Mozilla/5.0"
}

try:
    print(f"POSTing to {url}...")
    req = urllib.request.Request(url, data=json.dumps(data).encode(), headers=headers, method="POST")
    with urllib.request.urlopen(req) as response:
        print(f"Status: {response.status}")
        print(response.read().decode())

except urllib.error.HTTPError as e:
    print(f"HTTPError: {e.code}")
    body = e.read().decode()
    try:
        err_json = json.loads(body)
        print("ERROR MESSAGE:", err_json)
    except:
        print("RAW BODY:", body)
except Exception as e:
    print(f"Exception: {e}")
