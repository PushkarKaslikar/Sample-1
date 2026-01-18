import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

# Load .env explicitly
load_dotenv()

url = os.getenv("DATABASE_URL")
if not url:
    print("Error: DATABASE_URL not found in .env")
    exit(1)

# Fix for postgres://
if url.startswith("postgres://"):
    url = url.replace("postgres://", "postgresql://", 1)

print(f"Testing connection to: {url.split('@')[1]}") # Hide credentials

try:
    engine = create_engine(url)
    with engine.connect() as conn:
        result = conn.execute(text("SELECT 1"))
        print(f"Connection Successful! Result: {result.fetchone()}")
except Exception as e:
    print(f"Connection Failed: {e}")
