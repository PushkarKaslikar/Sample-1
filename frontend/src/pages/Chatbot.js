import React from 'react';
import { ExternalLink } from 'lucide-react';

const Chatbot = () => {
    // Use env var if available, otherwise fallback to localhost (for local dev)
    const chatbotUrl = process.env.REACT_APP_CHATBOT_URL || "http://localhost:5173/";

    return (
        <div className="flex h-screen bg-slate-900 overflow-hidden relative">
            {/* Embed the Standalone Chatbot Project */}
            <iframe
                src={chatbotUrl}
                title="Mech Chatbot"
                className="w-full h-full border-0"
                allow="microphone; clipboard-read; clipboard-write"
            />
        </div>
    );
};

export default Chatbot;
