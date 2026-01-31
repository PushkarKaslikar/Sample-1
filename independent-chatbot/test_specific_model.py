import urllib.request
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

key = "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"
url = "https://openrouter.ai/api/v1/chat/completions"

data = {
    "model": "google/gemini-2.0-flash-exp:free",
    "messages": [
        {"role": "user", "content": "Hi"}
    ]
}

headers = {
    "Authorization": f"Bearer {key}",
    "Content-Type": "application/json",
    "HTTP-Referer": "http://localhost:5173",
    "X-Title": "Mech Chatbot Standalone"
}

with open("test_result.txt", "w") as f:
    try:
        f.write(f"Testing model: {data['model']}\n")
        req = urllib.request.Request(url, data=json.dumps(data).encode(), headers=headers, method="POST")
        with urllib.request.urlopen(req, context=ctx) as response:
            f.write(f"Status: {response.status}\n")
            f.write(response.read().decode())
    except urllib.error.HTTPError as e:
        f.write(f"HTTPError: {e.code}\n")
        f.write(e.read().decode())
    except Exception as e:
        f.write(f"Exception: {e}\n")
