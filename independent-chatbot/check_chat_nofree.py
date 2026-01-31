import urllib.request
import json

key = "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"
url = "https://openrouter.ai/api/v1/chat/completions"

data = {
    "model": "google/gemini-2.0-flash-exp", 
    "messages": [{"role": "user", "content": "Hello"}]
}
# NO :free suffix

headers = {
    "Authorization": f"Bearer {key}",
    "Content-Type": "application/json",
    "HTTP-Referer": "http://localhost:5173",
    "X-Title": "Mech Chatbot Standalone",
    "User-Agent": "Mozilla/5.0"
}

try:
    req = urllib.request.Request(url, data=json.dumps(data).encode(), headers=headers, method="POST")
    urllib.request.urlopen(req)
except urllib.error.HTTPError as e:
    body = e.read().decode()
    try:
        err = json.loads(body)
        print("MSG:", err.get('error', {}).get('message', 'NO_MESSAGE'))
        print("CODE:", err.get('error', {}).get('code', 'NO_CODE'))
    except:
        print("RAW:", body[:100])
except Exception as e:
    print(e)
