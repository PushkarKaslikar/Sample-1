import React from 'react';
import { ExternalLink } from 'lucide-react';

const Chatbot = () => {
    return (
        <div className="flex h-[calc(100vh-64px)] bg-slate-900 mt-16 overflow-hidden relative">
            {/* Embed the Standalone Chatbot Project */}
            <iframe
                src={process.env.REACT_APP_CHATBOT_URL || "http://localhost:5173/"}
                title="Mech Chatbot"
                className="w-full h-full border-0"
                allow="microphone; clipboard-read; clipboard-write"
            />

        </div>
    );
};

export default Chatbot;
