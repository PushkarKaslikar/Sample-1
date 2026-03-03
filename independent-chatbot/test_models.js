import fs from 'fs';

// Read .env file directly to simple parse it
const envFile = fs.readFileSync('.env', 'utf8');
let apiKey = null;
envFile.split('\n').forEach(line => {
    if (line.startsWith('VITE_GEMINI_API_KEY=')) {
        apiKey = line.split('=')[1].trim();
    }
});

if (!apiKey) {
    console.error("No API key found in .env");
    process.exit(1);
}

async function listModels() {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();
        console.log(JSON.stringify(data, null, 2));
    } catch (e) {
        console.error("Error listing models:", e);
    }
}

listModels();
